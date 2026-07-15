begin;

update public.opportunities opportunity
set archived_at = coalesce(opportunity.archived_at, opportunity.updated_at, now()),
    next_action = null,
    next_action_date = null,
    payload = coalesce(opportunity.payload, '{}'::jsonb) || jsonb_build_object(
      'terminalRejection', true,
      'archivedFromStatus', 'rejected',
      'archivedAt', coalesce(opportunity.archived_at, opportunity.updated_at, now()),
      'rejectionReason', coalesce(
        (
          select request.reason
          from public.approval_requests request
          where request.opportunity_id = opportunity.id and request.status = 'rejected'
          order by request.reviewed_at desc nulls last, request.created_at desc
          limit 1
        ),
        opportunity.payload ->> 'rejectionReason',
        'Condicao recusada pelo gestor.'
      )
    )
where opportunity.approval_status = 'rejected';

create or replace function private.portal_guard_terminal_rejection()
returns trigger
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
declare
  rejection_reason text;
begin
  if old.approval_status = 'rejected' then
    raise exception 'Uma oportunidade recusada pelo gestor nao pode ser alterada ou restaurada' using errcode = '42501';
  end if;

  if new.approval_status = 'rejected' then
    select request.reason into rejection_reason
    from public.approval_requests request
    where request.opportunity_id = new.id and request.status = 'rejected'
    order by request.reviewed_at desc nulls last, request.created_at desc
    limit 1;

    new.archived_at := coalesce(new.archived_at, now());
    new.next_action := null;
    new.next_action_date := null;
    new.payload := coalesce(new.payload, '{}'::jsonb) || jsonb_build_object(
      'terminalRejection', true,
      'archivedFromStatus', 'rejected',
      'archivedAt', new.archived_at,
      'rejectionReason', coalesce(nullif(btrim(rejection_reason), ''), 'Condicao recusada pelo gestor.'),
      'notes', coalesce(nullif(btrim(rejection_reason), ''), 'Condicao recusada pelo gestor.')
    );
  end if;

  return new;
end;
$$;

drop trigger if exists portal_00_guard_terminal_rejection on public.opportunities;
create trigger portal_00_guard_terminal_rejection
before update on public.opportunities
for each row execute function private.portal_guard_terminal_rejection();

revoke all on function private.portal_guard_terminal_rejection() from public;

commit;
