create or replace function private.portal_is_member(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select auth.uid() is not null and exists (
    select 1 from public.organization_members membership
    join public.profiles profile on profile.user_id = membership.user_id
    where membership.organization_id = p_organization_id
      and membership.user_id = auth.uid()
      and membership.active
      and profile.active
  );
$$;

create or replace function private.portal_is_manager(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select auth.uid() is not null and exists (
    select 1 from public.organization_members membership
    join public.profiles profile on profile.user_id = membership.user_id
    where membership.organization_id = p_organization_id
      and membership.user_id = auth.uid()
      and membership.role = 'admin_manager'
      and membership.active
      and profile.active
  );
$$;

create or replace function private.portal_can_access_opportunity(p_opportunity_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select auth.uid() is not null and exists (
    select 1 from public.opportunities opportunity
    where opportunity.id = p_opportunity_id
      and (
        private.portal_is_manager(opportunity.organization_id)
        or (private.portal_is_member(opportunity.organization_id) and opportunity.sdr_user_id = auth.uid())
      )
  );
$$;

create or replace function private.portal_can_view_profile(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select auth.uid() = p_user_id or exists (
    select 1
    from public.organization_members manager_membership
    join public.organization_members target_membership
      on target_membership.organization_id = manager_membership.organization_id
    where manager_membership.user_id = auth.uid()
      and manager_membership.role = 'admin_manager'
      and manager_membership.active
      and target_membership.user_id = p_user_id
      and target_membership.active
  );
$$;

create or replace function private.portal_can_access_storage_object(p_storage_path text)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select auth.uid() is not null and exists (
    select 1 from public.files file
    where file.storage_path = p_storage_path
      and (
        private.portal_is_manager(file.organization_id)
        or file.delegated_sdr_id = auth.uid()
        or (file.opportunity_id is not null and private.portal_can_access_opportunity(file.opportunity_id))
        or (file.contract_id is not null and exists (
          select 1 from public.contracts contract
          where contract.id = file.contract_id
            and private.portal_can_access_opportunity(contract.opportunity_id)
        ))
      )
  );
$$;

revoke all on function private.portal_is_member(uuid) from public;
revoke all on function private.portal_is_manager(uuid) from public;
revoke all on function private.portal_can_access_opportunity(uuid) from public;
revoke all on function private.portal_can_view_profile(uuid) from public;
revoke all on function private.portal_can_access_storage_object(text) from public;
grant execute on function private.portal_is_member(uuid) to authenticated;
grant execute on function private.portal_is_manager(uuid) to authenticated;
grant execute on function private.portal_can_access_opportunity(uuid) to authenticated;
grant execute on function private.portal_can_view_profile(uuid) to authenticated;
grant execute on function private.portal_can_access_storage_object(text) to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.services enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_services enable row level security;
alter table public.approval_requests enable row level security;
alter table public.condition_versions enable row level security;
alter table public.contracts enable row level security;
alter table public.customer_payments enable row level security;
alter table public.commissions enable row level security;
alter table public.payout_batches enable row level security;
alter table public.payout_batch_items enable row level security;
alter table public.projects enable row level security;
alter table public.project_stages enable row level security;
alter table public.files enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists portal_organizations_select on public.organizations;
create policy portal_organizations_select on public.organizations for select to authenticated
using (private.portal_is_member(id));

drop policy if exists portal_profiles_select on public.profiles;
create policy portal_profiles_select on public.profiles for select to authenticated
using (private.portal_can_view_profile(user_id));

drop policy if exists portal_members_select on public.organization_members;
create policy portal_members_select on public.organization_members for select to authenticated
using (user_id = auth.uid() or private.portal_is_manager(organization_id));

drop policy if exists portal_services_select on public.services;
create policy portal_services_select on public.services for select to authenticated
using (private.portal_is_member(organization_id));
drop policy if exists portal_services_manager_insert on public.services;
create policy portal_services_manager_insert on public.services for insert to authenticated
with check (private.portal_is_manager(organization_id));
drop policy if exists portal_services_manager_update on public.services;
create policy portal_services_manager_update on public.services for update to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_opportunities_select on public.opportunities;
create policy portal_opportunities_select on public.opportunities for select to authenticated
using (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()));
drop policy if exists portal_opportunities_insert on public.opportunities;
create policy portal_opportunities_insert on public.opportunities for insert to authenticated
with check (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()));
drop policy if exists portal_opportunities_update on public.opportunities;
create policy portal_opportunities_update on public.opportunities for update to authenticated
using (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()))
with check (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()));

drop policy if exists portal_opportunity_services_select on public.opportunity_services;
create policy portal_opportunity_services_select on public.opportunity_services for select to authenticated
using (private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_opportunity_services_insert on public.opportunity_services;
create policy portal_opportunity_services_insert on public.opportunity_services for insert to authenticated
with check (private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_opportunity_services_delete on public.opportunity_services;
create policy portal_opportunity_services_delete on public.opportunity_services for delete to authenticated
using (private.portal_can_access_opportunity(opportunity_id));

drop policy if exists portal_approval_select on public.approval_requests;
create policy portal_approval_select on public.approval_requests for select to authenticated
using (private.portal_is_manager(organization_id) or private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_approval_manager_write on public.approval_requests;
create policy portal_approval_manager_write on public.approval_requests for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_conditions_select on public.condition_versions;
create policy portal_conditions_select on public.condition_versions for select to authenticated
using (private.portal_is_manager(organization_id) or private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_conditions_manager_write on public.condition_versions;
create policy portal_conditions_manager_write on public.condition_versions for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_contracts_select on public.contracts;
create policy portal_contracts_select on public.contracts for select to authenticated
using (private.portal_is_manager(organization_id) or private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_contracts_manager_write on public.contracts;
create policy portal_contracts_manager_write on public.contracts for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_payments_select on public.customer_payments;
create policy portal_payments_select on public.customer_payments for select to authenticated
using (private.portal_is_manager(organization_id) or exists (
  select 1 from public.contracts contract where contract.id = contract_id and private.portal_can_access_opportunity(contract.opportunity_id)
));
drop policy if exists portal_payments_manager_write on public.customer_payments;
create policy portal_payments_manager_write on public.customer_payments for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_commissions_select on public.commissions;
create policy portal_commissions_select on public.commissions for select to authenticated
using (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()));
drop policy if exists portal_commissions_manager_write on public.commissions;
create policy portal_commissions_manager_write on public.commissions for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_batches_select on public.payout_batches;
create policy portal_batches_select on public.payout_batches for select to authenticated
using (private.portal_is_manager(organization_id) or (private.portal_is_member(organization_id) and sdr_user_id = auth.uid()));
drop policy if exists portal_batches_manager_write on public.payout_batches;
create policy portal_batches_manager_write on public.payout_batches for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_batch_items_select on public.payout_batch_items;
create policy portal_batch_items_select on public.payout_batch_items for select to authenticated
using (exists (
  select 1 from public.payout_batches batch where batch.id = batch_id
    and (private.portal_is_manager(batch.organization_id) or batch.sdr_user_id = auth.uid())
));
drop policy if exists portal_batch_items_manager_write on public.payout_batch_items;
create policy portal_batch_items_manager_write on public.payout_batch_items for all to authenticated
using (exists (select 1 from public.payout_batches batch where batch.id = batch_id and private.portal_is_manager(batch.organization_id)))
with check (exists (select 1 from public.payout_batches batch where batch.id = batch_id and private.portal_is_manager(batch.organization_id)));

drop policy if exists portal_projects_select on public.projects;
create policy portal_projects_select on public.projects for select to authenticated
using (private.portal_is_manager(organization_id) or private.portal_can_access_opportunity(opportunity_id));
drop policy if exists portal_projects_manager_write on public.projects;
create policy portal_projects_manager_write on public.projects for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_stages_select on public.project_stages;
create policy portal_stages_select on public.project_stages for select to authenticated
using (private.portal_is_manager(organization_id) or exists (
  select 1 from public.projects project where project.id = project_id and private.portal_can_access_opportunity(project.opportunity_id)
));
drop policy if exists portal_stages_manager_write on public.project_stages;
create policy portal_stages_manager_write on public.project_stages for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_files_select on public.files;
create policy portal_files_select on public.files for select to authenticated
using (private.portal_can_access_storage_object(storage_path));
drop policy if exists portal_files_manager_write on public.files;
create policy portal_files_manager_write on public.files for all to authenticated
using (private.portal_is_manager(organization_id)) with check (private.portal_is_manager(organization_id));

drop policy if exists portal_notifications_select on public.notifications;
create policy portal_notifications_select on public.notifications for select to authenticated
using (
  private.portal_is_member(organization_id)
  and (recipient_user_id = auth.uid() or recipient_role = (
    select membership.role from public.organization_members membership
    where membership.organization_id = notifications.organization_id and membership.user_id = auth.uid() and membership.active
  ))
);
drop policy if exists portal_notifications_update on public.notifications;
create policy portal_notifications_update on public.notifications for update to authenticated
using (recipient_user_id = auth.uid()) with check (recipient_user_id = auth.uid());

drop policy if exists portal_audit_manager_select on public.audit_logs;
create policy portal_audit_manager_select on public.audit_logs for select to authenticated
using (private.portal_is_manager(organization_id));

grant usage on schema public to authenticated;
grant select on public.organizations, public.profiles, public.organization_members, public.services,
  public.opportunities, public.opportunity_services, public.approval_requests, public.condition_versions,
  public.contracts, public.customer_payments, public.commissions, public.payout_batches,
  public.payout_batch_items, public.projects, public.project_stages, public.files,
  public.notifications, public.audit_logs to authenticated;
grant insert, update on public.opportunities to authenticated;
grant insert, delete on public.opportunity_services to authenticated;
grant insert, update, delete on public.services, public.approval_requests, public.condition_versions,
  public.contracts, public.customer_payments, public.commissions, public.payout_batches,
  public.payout_batch_items, public.projects, public.project_stages, public.files to authenticated;
grant update on public.notifications to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portal-documents',
  'portal-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists portal_storage_select on storage.objects;
create policy portal_storage_select on storage.objects for select to authenticated
using (bucket_id = 'portal-documents' and private.portal_can_access_storage_object(name));

drop policy if exists portal_storage_insert on storage.objects;
create policy portal_storage_insert on storage.objects for insert to authenticated
with check (
  bucket_id = 'portal-documents'
  and array_length(storage.foldername(name), 1) >= 1
  and private.portal_is_manager(((storage.foldername(name))[1])::uuid)
);

drop policy if exists portal_storage_update on storage.objects;
create policy portal_storage_update on storage.objects for update to authenticated
using (bucket_id = 'portal-documents' and private.portal_can_access_storage_object(name))
with check (
  bucket_id = 'portal-documents'
  and array_length(storage.foldername(name), 1) >= 1
  and private.portal_is_manager(((storage.foldername(name))[1])::uuid)
);

drop policy if exists portal_storage_delete on storage.objects;
create policy portal_storage_delete on storage.objects for delete to authenticated
using (
  bucket_id = 'portal-documents'
  and array_length(storage.foldername(name), 1) >= 1
  and private.portal_is_manager(((storage.foldername(name))[1])::uuid)
);
