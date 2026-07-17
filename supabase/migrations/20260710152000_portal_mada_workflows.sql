create or replace function public.portal_request_approval(
  p_opportunity_id uuid,
  p_expected_version integer
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
declare
  opportunity public.opportunities%rowtype;
  request_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode = '28000'; end if;

  select * into opportunity from public.opportunities where id = p_opportunity_id for update;
  if not found then raise exception 'Oportunidade não encontrada' using errcode = 'P0002'; end if;
  if not (private.portal_is_manager(opportunity.organization_id) or opportunity.sdr_user_id = auth.uid()) then
    raise exception 'Acesso negado' using errcode = '42501';
  end if;
  if opportunity.version <> p_expected_version then raise exception 'VERSION_CONFLICT' using errcode = '40001'; end if;
  if opportunity.approval_status not in ('draft', 'needs_information') then
    raise exception 'A oportunidade não pode ser enviada neste status';
  end if;
  if btrim(opportunity.client_name) = '' or opportunity.suggested_amount_cents <= 0 then
    raise exception 'Preencha cliente e valor proposto antes de pedir aprovação';
  end if;
  if not exists (select 1 from public.opportunity_services where opportunity_id = opportunity.id) then
    raise exception 'Selecione pelo menos um serviço antes de pedir aprovação';
  end if;

  update public.opportunities
  set approval_status = 'pending_approval', updated_by = auth.uid(), version = version + 1
  where id = opportunity.id;

  insert into public.approval_requests (organization_id, opportunity_id, requested_by, status)
  values (opportunity.organization_id, opportunity.id, auth.uid(), 'pending')
  returning id into request_id;

  insert into public.notifications (organization_id, recipient_user_id, created_by, kind, title, message, entity_type, entity_id)
  select opportunity.organization_id, membership.user_id, auth.uid(), 'approval', 'Nova aprovação',
    'Uma oportunidade foi enviada para aprovação.', 'opportunity', opportunity.id
  from public.organization_members membership
  where membership.organization_id = opportunity.organization_id
    and membership.role = 'admin_manager' and membership.active;

  insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
  values (opportunity.organization_id, auth.uid(), 'opportunity_submitted', 'opportunity', opportunity.id, jsonb_build_object('request_id', request_id));

  return jsonb_build_object('opportunity_id', opportunity.id, 'request_id', request_id, 'status', 'pending_approval');
end;
$$;

create or replace function public.portal_review_opportunity(
  p_opportunity_id uuid,
  p_action text,
  p_amount_cents bigint default null,
  p_reason text default null,
  p_expected_version integer default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
declare
  opportunity public.opportunities%rowtype;
  condition_id uuid;
  contract_id uuid;
  v_project_id uuid;
  v_stage_id uuid;
  final_amount bigint;
  condition_number integer;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode = '28000'; end if;
  select * into opportunity from public.opportunities where id = p_opportunity_id for update;
  if not found then raise exception 'Oportunidade não encontrada' using errcode = 'P0002'; end if;
  if not private.portal_is_manager(opportunity.organization_id) then raise exception 'Apenas o gestor pode revisar' using errcode = '42501'; end if;
  if p_expected_version is not null and opportunity.version <> p_expected_version then raise exception 'VERSION_CONFLICT' using errcode = '40001'; end if;
  if opportunity.approval_status <> 'pending_approval' then raise exception 'A oportunidade não está aguardando aprovação'; end if;
  if p_action not in ('approved', 'approved_with_changes', 'needs_information', 'rejected') then raise exception 'Ação de aprovação inválida'; end if;

  update public.approval_requests
  set status = p_action, reason = nullif(btrim(p_reason), ''), reviewed_by = auth.uid(), reviewed_at = now()
  where id = (
    select id from public.approval_requests
    where opportunity_id = opportunity.id and status = 'pending'
    order by requested_at desc limit 1
  );

  if p_action in ('needs_information', 'rejected') then
    update public.opportunities
    set approval_status = case when p_action = 'needs_information' then 'needs_information' else 'rejected' end,
      updated_by = auth.uid(), version = version + 1
    where id = opportunity.id;

    if opportunity.sdr_user_id is not null then
      insert into public.notifications (organization_id, recipient_user_id, created_by, kind, title, message, entity_type, entity_id)
      values (opportunity.organization_id, opportunity.sdr_user_id, auth.uid(), 'approval',
        case when p_action = 'needs_information' then 'Informações solicitadas' else 'Condição recusada' end,
        coalesce(nullif(btrim(p_reason), ''), 'Consulte a oportunidade para os detalhes.'), 'opportunity', opportunity.id);
    end if;

    insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
    values (opportunity.organization_id, auth.uid(), 'opportunity_' || p_action, 'opportunity', opportunity.id, jsonb_build_object('reason', p_reason));
    return jsonb_build_object('opportunity_id', opportunity.id, 'status', p_action);
  end if;

  final_amount := case when p_action = 'approved_with_changes' then p_amount_cents else opportunity.suggested_amount_cents end;
  if final_amount is null or final_amount <= 0 then raise exception 'Informe um valor aprovado válido'; end if;

  update public.condition_versions set is_active = false where opportunity_id = opportunity.id and is_active;
  select coalesce(max(version_number), 0) + 1 into condition_number from public.condition_versions where opportunity_id = opportunity.id;
  insert into public.condition_versions (
    organization_id, opportunity_id, version_number, amount_cents, payment_plan, scope, reason, approved_by, payload
  ) values (
    opportunity.organization_id, opportunity.id, condition_number, final_amount, opportunity.payment_plan,
    opportunity.payload ->> 'scopeSuggested', nullif(btrim(p_reason), ''), auth.uid(),
    jsonb_build_object('source', p_action)
  ) returning id into condition_id;

  update public.opportunities
  set approval_status = 'commercial_condition_approved', approved_amount_cents = final_amount,
    updated_by = auth.uid(), version = version + 1
  where id = opportunity.id;

  select id into contract_id from public.contracts where opportunity_id = opportunity.id order by created_at desc limit 1;
  if contract_id is null then
    insert into public.contracts (
      organization_id, opportunity_id, condition_version_id, contract_number, status,
      amount_cents, payment_plan, payment_terms, created_by, updated_by
    ) values (
      opportunity.organization_id, opportunity.id, condition_id,
      'MADA-' || lpad(nextval('public.portal_contract_number_seq')::text, 5, '0'),
      'proposal_planning', final_amount, opportunity.payment_plan,
      case when opportunity.payment_plan = '100' then '100% à vista' else '50% entrada + 50% entrega' end,
      auth.uid(), auth.uid()
    ) returning id into contract_id;
  end if;

  select id into v_project_id from public.projects where opportunity_id = opportunity.id order by created_at desc limit 1;
  if v_project_id is null then
    insert into public.projects (
      organization_id, opportunity_id, contract_id, sdr_user_id, manager_user_id,
      name, status, starts_at, target_end_at, payload
    ) values (
      opportunity.organization_id, opportunity.id, contract_id, opportunity.sdr_user_id, auth.uid(),
      opportunity.brand_name || ' - Projeto', 'planning', now(), current_date + 60,
      jsonb_build_object('condition_version_id', condition_id, 'contract_amount_cents', final_amount)
    ) returning id into v_project_id;

    insert into public.project_stages (organization_id, project_id, sequence_number, name, status, responsible_user_id, due_at)
    select opportunity.organization_id, v_project_id, item.ordinality::integer, item.name,
      case when item.ordinality = 1 then 'ready' else 'locked' end,
      auth.uid(), current_date + (item.ordinality::integer * 7)
    from unnest(array[
      'Briefing', 'Onboarding', 'Reunião de kickoff', 'Pesquisa e diagnóstico',
      'Planejamento e estratégia', 'Produção', 'Revisão', 'Entrega final'
    ]) with ordinality as item(name, ordinality);

    select project_stage.id into v_stage_id
    from public.project_stages project_stage
    where project_stage.project_id = v_project_id
    order by project_stage.sequence_number limit 1;
    update public.projects set current_stage_id = v_stage_id where id = v_project_id;
  end if;

  if opportunity.sdr_user_id is not null then
    insert into public.notifications (organization_id, recipient_user_id, created_by, kind, title, message, entity_type, entity_id)
    values (opportunity.organization_id, opportunity.sdr_user_id, auth.uid(), 'approval', 'Condição aprovada',
      'A condição foi aprovada e o contrato está em planejamento.', 'opportunity', opportunity.id);
  end if;

  insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
  values (opportunity.organization_id, auth.uid(), 'opportunity_approved', 'opportunity', opportunity.id,
    jsonb_build_object('condition_id', condition_id, 'contract_id', contract_id, 'project_id', v_project_id, 'amount_cents', final_amount));

  return jsonb_build_object(
    'opportunity_id', opportunity.id, 'status', 'commercial_condition_approved',
    'condition_id', condition_id, 'contract_id', contract_id, 'project_id', v_project_id
  );
end;
$$;

create or replace function public.portal_update_project_stage(
  p_stage_id uuid,
  p_status text,
  p_expected_version integer
)
returns jsonb
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
declare
  stage public.project_stages%rowtype;
  project public.projects%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode = '28000'; end if;
  if p_status not in ('locked', 'ready', 'in_progress', 'review', 'approved', 'completed', 'skipped', 'cancelled') then
    raise exception 'Status de etapa inválido';
  end if;
  select * into stage from public.project_stages where id = p_stage_id for update;
  if not found then raise exception 'Etapa não encontrada' using errcode = 'P0002'; end if;
  select * into project from public.projects where id = stage.project_id;
  if not (private.portal_is_manager(stage.organization_id) or private.portal_can_access_opportunity(project.opportunity_id)) then
    raise exception 'Acesso negado' using errcode = '42501';
  end if;
  if stage.version <> p_expected_version then raise exception 'VERSION_CONFLICT' using errcode = '40001'; end if;

  update public.project_stages set status = p_status, version = version + 1,
    started_at = case when p_status = 'in_progress' then coalesce(started_at, now()) else started_at end,
    completed_at = case when p_status in ('approved', 'completed', 'skipped', 'cancelled') then now() else null end
  where id = stage.id;
  update public.projects set current_stage_id = stage.id, version = version + 1 where id = project.id;
  insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
  values (stage.organization_id, auth.uid(), 'project_stage_status_changed', 'project_stage', stage.id, jsonb_build_object('status', p_status));
  return jsonb_build_object('stage_id', stage.id, 'status', p_status);
end;
$$;

create or replace function public.portal_mark_notification_read(p_notification_id uuid)
returns void
language sql
security invoker
set search_path = public, auth, pg_temp
as $$
  update public.notifications set read_at = now()
  where id = p_notification_id and recipient_user_id = auth.uid();
$$;

revoke all on function public.portal_request_approval(uuid, integer) from public;
revoke all on function public.portal_review_opportunity(uuid, text, bigint, text, integer) from public;
revoke all on function public.portal_update_project_stage(uuid, text, integer) from public;
revoke all on function public.portal_mark_notification_read(uuid) from public;
grant execute on function public.portal_request_approval(uuid, integer) to authenticated;
grant execute on function public.portal_review_opportunity(uuid, text, bigint, text, integer) to authenticated;
grant execute on function public.portal_update_project_stage(uuid, text, integer) to authenticated;
grant execute on function public.portal_mark_notification_read(uuid) to authenticated;
