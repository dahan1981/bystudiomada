begin;

alter table public.payout_batches
  add column if not exists version integer not null default 1;

create table if not exists public.notification_reads (
  notification_id uuid not null references public.notifications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (notification_id, user_id)
);

alter table public.notification_reads enable row level security;
drop policy if exists portal_notification_reads_select on public.notification_reads;
create policy portal_notification_reads_select on public.notification_reads
  for select to authenticated using (user_id = auth.uid());
drop policy if exists portal_notification_reads_write on public.notification_reads;
create policy portal_notification_reads_write on public.notification_reads
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists portal_notification_reads_update on public.notification_reads;
create policy portal_notification_reads_update on public.notification_reads
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update on public.notification_reads to authenticated;

create index if not exists idx_notification_reads_user on public.notification_reads(user_id, read_at desc);
create index if not exists idx_approval_requests_opportunity on public.approval_requests(opportunity_id, status, requested_at desc);
create index if not exists idx_approval_requests_org on public.approval_requests(organization_id, status, requested_at desc);
create index if not exists idx_condition_versions_opportunity on public.condition_versions(opportunity_id, is_active, version_number desc);
create index if not exists idx_contracts_opportunity on public.contracts(opportunity_id, created_at desc);
create index if not exists idx_payments_contract on public.customer_payments(contract_id, status, paid_at desc);
create index if not exists idx_commissions_sdr on public.commissions(sdr_user_id, status, created_at desc);
create index if not exists idx_commissions_payment on public.commissions(payment_id);
create index if not exists idx_batches_sdr on public.payout_batches(sdr_user_id, status, created_at desc);
create index if not exists idx_batch_items_commission on public.payout_batch_items(commission_id);
create index if not exists idx_projects_opportunity on public.projects(opportunity_id, status, created_at desc);
create index if not exists idx_projects_sdr on public.projects(sdr_user_id, status, created_at desc);
create index if not exists idx_project_stages_project on public.project_stages(project_id, sequence_number);
create index if not exists idx_files_opportunity on public.files(opportunity_id, created_at desc);
create index if not exists idx_files_contract on public.files(contract_id, created_at desc);
create index if not exists idx_files_payment on public.files(payment_id, created_at desc);
create index if not exists idx_files_delegated_sdr on public.files(delegated_sdr_id, created_at desc);
create index if not exists idx_notifications_recipient on public.notifications(recipient_user_id, created_at desc);
create index if not exists idx_notifications_role on public.notifications(organization_id, recipient_role, created_at desc);

create or replace function public.portal_mark_notification_read(p_notification_id uuid)
returns void
language plpgsql
security invoker
set search_path = public, auth, pg_temp
as $$
begin
  if not exists (
    select 1 from public.notifications notification
    where notification.id = p_notification_id
      and (notification.recipient_user_id = auth.uid()
        or notification.recipient_role = (select membership.role from public.organization_members membership where membership.user_id = auth.uid() and membership.organization_id = notification.organization_id and membership.active))
  ) then
    raise exception 'Notificação não encontrada' using errcode = 'P0002';
  end if;
  insert into public.notification_reads (notification_id, user_id, read_at)
  values (p_notification_id, auth.uid(), now())
  on conflict (notification_id, user_id) do update set read_at = excluded.read_at;
end;
$$;

commit;
