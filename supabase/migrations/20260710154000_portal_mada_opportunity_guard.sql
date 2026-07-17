create or replace function private.portal_guard_opportunity_write()
returns trigger
language plpgsql
security invoker
set search_path = public, private, auth, pg_temp
as $$
begin
  if auth.uid() is null or private.portal_is_manager(new.organization_id) then return new; end if;
  if not private.portal_is_member(new.organization_id) or new.sdr_user_id <> auth.uid() then
    raise exception 'A SDR só pode salvar oportunidades próprias' using errcode = '42501';
  end if;
  if tg_op = 'INSERT' then
    if new.approved_amount_cents is not null or new.approval_status not in ('draft', 'pending_approval') then
      raise exception 'Status inicial de oportunidade inválido' using errcode = '42501';
    end if;
    return new;
  end if;
  if new.organization_id <> old.organization_id or new.sdr_user_id <> old.sdr_user_id then
    raise exception 'Responsável e organização não podem ser alterados pela SDR' using errcode = '42501';
  end if;
  if new.approved_amount_cents is distinct from old.approved_amount_cents then
    raise exception 'Valor aprovado só pode ser alterado pelo gestor' using errcode = '42501';
  end if;
  if not (
    (old.approval_status = 'draft' and new.approval_status in ('draft', 'pending_approval', 'cancelled'))
    or (old.approval_status = 'needs_information' and new.approval_status in ('needs_information', 'pending_approval', 'cancelled'))
    or (old.approval_status = new.approval_status)
  ) then
    raise exception 'Transição de aprovação não permitida para SDR' using errcode = '42501';
  end if;
  if old.approval_status not in ('draft', 'needs_information') and (
    new.suggested_amount_cents is distinct from old.suggested_amount_cents
    or new.payment_plan is distinct from old.payment_plan
  ) then
    raise exception 'Condição enviada ou aprovada não pode ser alterada pela SDR' using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists portal_guard_opportunity_write on public.opportunities;
create trigger portal_guard_opportunity_write
before insert or update on public.opportunities
for each row execute function private.portal_guard_opportunity_write();
