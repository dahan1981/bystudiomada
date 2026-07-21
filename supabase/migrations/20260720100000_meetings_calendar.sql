create table if not exists public.meetings (
  id uuid primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  created_by uuid not null references auth.users(id),
  sdr_user_id uuid references auth.users(id),
  brand_name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  manager_user_ids jsonb not null default '[]'::jsonb,
  status text not null default 'scheduled' check (status in ('scheduled','confirmed','completed','rescheduled','cancelled','no_show')),
  meeting_link text,
  context text not null default '',
  notes text not null default '',
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint meetings_time_range check (ends_at > starts_at)
);

create index if not exists meetings_org_time_idx on public.meetings(organization_id, starts_at, ends_at);
create index if not exists meetings_opportunity_idx on public.meetings(opportunity_id);
alter table public.meetings enable row level security;

drop policy if exists portal_meetings_select on public.meetings;
create policy portal_meetings_select on public.meetings for select to authenticated
using (
  private.portal_is_manager(organization_id)
  or created_by = auth.uid()
  or sdr_user_id = auth.uid()
  or (manager_user_ids ? auth.uid()::text)
);

drop policy if exists portal_meetings_manager_write on public.meetings;
create policy portal_meetings_manager_write on public.meetings for all to authenticated
using (private.portal_is_manager(organization_id))
with check (private.portal_is_manager(organization_id));

drop policy if exists portal_meetings_sdr_insert on public.meetings;
create policy portal_meetings_sdr_insert on public.meetings for insert to authenticated
with check (private.portal_is_member(organization_id) and created_by = auth.uid() and sdr_user_id = auth.uid());

drop policy if exists portal_meetings_sdr_update on public.meetings;
create policy portal_meetings_sdr_update on public.meetings for update to authenticated
using (created_by = auth.uid() or sdr_user_id = auth.uid())
with check (created_by = auth.uid() or sdr_user_id = auth.uid());
