create extension if not exists pgcrypto with schema extensions;
create schema if not exists private;

do $$ begin
  create type public.portal_member_role as enum ('admin_manager', 'sdr');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.portal_workspace_kind as enum ('production', 'training');
exception when duplicate_object then null;
end $$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  workspace_kind public.portal_workspace_kind not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  legacy_id text unique,
  display_name text not null,
  email text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  role public.portal_member_role not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  slug text not null,
  name text not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  workflow_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sdr_user_id uuid references public.profiles(user_id) on delete set null,
  legacy_sdr_id text,
  client_name text not null,
  brand_name text not null,
  crm_status text not null default 'lead_mapped',
  approval_status text not null default 'draft',
  suggested_amount_cents bigint not null default 0 check (suggested_amount_cents >= 0),
  approved_amount_cents bigint check (approved_amount_cents is null or approved_amount_cents >= 0),
  payment_plan text not null default '50_50' check (payment_plan in ('50_50', '100')),
  next_action text,
  next_action_date date,
  archived_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1 check (version > 0),
  created_by uuid references public.profiles(user_id) on delete set null,
  updated_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists opportunities_org_status_idx on public.opportunities(organization_id, approval_status);
create index if not exists opportunities_sdr_idx on public.opportunities(sdr_user_id, archived_at);

create table if not exists public.opportunity_services (
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (opportunity_id, service_id)
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  requested_by uuid references public.profiles(user_id) on delete set null,
  reviewed_by uuid references public.profiles(user_id) on delete set null,
  status text not null default 'pending',
  reason text,
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.condition_versions (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  amount_cents bigint not null check (amount_cents >= 0),
  discount_percent numeric(5,2) not null default 0 check (discount_percent between 0 and 100),
  payment_plan text not null check (payment_plan in ('50_50', '100')),
  scope text,
  reason text,
  is_active boolean not null default true,
  approved_by uuid references public.profiles(user_id) on delete set null,
  approved_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb,
  unique (opportunity_id, version_number)
);

create sequence if not exists public.portal_contract_number_seq start 1;

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  condition_version_id uuid references public.condition_versions(id) on delete set null,
  contract_number text not null unique,
  status text not null default 'proposal_planning',
  amount_cents bigint not null default 0 check (amount_cents >= 0),
  payment_plan text not null default '50_50' check (payment_plan in ('50_50', '100')),
  payment_terms text,
  proposal_storage_path text,
  contract_link text,
  signed_at timestamptz,
  sale_validated_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1 check (version > 0),
  created_by uuid references public.profiles(user_id) on delete set null,
  updated_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contracts_org_status_idx on public.contracts(organization_id, status);
create index if not exists contracts_opportunity_idx on public.contracts(opportunity_id);

create table if not exists public.customer_payments (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  amount_cents bigint not null check (amount_cents > 0),
  payment_type text not null default 'contract_payment',
  method text,
  reference text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  due_date date,
  paid_at timestamptz,
  confirmed_by uuid references public.profiles(user_id) on delete set null,
  receipt_storage_path text,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_contract_idx on public.customer_payments(contract_id, status);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  payment_id uuid references public.customer_payments(id) on delete set null,
  sdr_user_id uuid references public.profiles(user_id) on delete restrict,
  rate_bps integer not null check (rate_bps in (500, 1000)),
  base_cents bigint not null check (base_cents > 0),
  amount_cents bigint not null check (amount_cents > 0),
  status text not null default 'available' check (status in ('available', 'batched', 'paid', 'cancelled')),
  notes text,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payout_batches (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sdr_user_id uuid not null references public.profiles(user_id) on delete restrict,
  sequence_number integer not null,
  total_amount_cents bigint not null default 0 check (total_amount_cents >= 0),
  status text not null default 'batched' check (status in ('batched', 'paid', 'cancelled')),
  receipt_storage_path text,
  paid_at timestamptz,
  paid_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, sdr_user_id, sequence_number)
);

create table if not exists public.payout_batch_items (
  batch_id uuid not null references public.payout_batches(id) on delete cascade,
  commission_id uuid not null unique references public.commissions(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (batch_id, commission_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete set null,
  sdr_user_id uuid references public.profiles(user_id) on delete set null,
  manager_user_id uuid references public.profiles(user_id) on delete set null,
  name text not null,
  status text not null default 'planning' check (status in ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
  starts_at timestamptz,
  target_end_at date,
  current_stage_id uuid,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_stages (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  sequence_number integer not null,
  name text not null,
  status text not null default 'locked' check (status in ('locked', 'ready', 'in_progress', 'review', 'approved', 'completed', 'skipped', 'cancelled')),
  responsible_user_id uuid references public.profiles(user_id) on delete set null,
  due_at date,
  started_at timestamptz,
  completed_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, sequence_number)
);

alter table public.projects drop constraint if exists projects_current_stage_id_fkey;
alter table public.projects add constraint projects_current_stage_id_fkey foreign key (current_stage_id) references public.project_stages(id) on delete set null;

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category text not null,
  display_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  opportunity_id uuid references public.opportunities(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete cascade,
  payment_id uuid references public.customer_payments(id) on delete cascade,
  payout_batch_id uuid references public.payout_batches(id) on delete cascade,
  delegated_sdr_id uuid references public.profiles(user_id) on delete set null,
  notes text,
  uploaded_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  recipient_user_id uuid references public.profiles(user_id) on delete cascade,
  recipient_role public.portal_member_role,
  created_by uuid references public.profiles(user_id) on delete set null,
  kind text not null default 'info',
  title text not null,
  message text not null,
  entity_type text,
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (recipient_user_id is not null or recipient_role is not null)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid references public.profiles(user_id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_org_created_idx on public.audit_logs(organization_id, created_at desc);
create index if not exists notifications_recipient_idx on public.notifications(recipient_user_id, read_at, created_at desc);

create or replace function private.portal_set_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'organizations','profiles','organization_members','services','opportunities','contracts',
    'customer_payments','commissions','payout_batches','projects','project_stages'
  ] loop
    execute format('drop trigger if exists portal_set_updated_at on public.%I', table_name);
    execute format('create trigger portal_set_updated_at before update on public.%I for each row execute function private.portal_set_updated_at()', table_name);
  end loop;
end $$;

insert into public.organizations (slug, name, workspace_kind)
values
  ('mada-operacao', 'Mada Operação', 'production'),
  ('mada-treinamento', 'Mada Treinamento', 'training')
on conflict (slug) do update set name = excluded.name, workspace_kind = excluded.workspace_kind, active = true;

with service_seed(slug, name, sort_order) as (
  values
    ('consultoria-estrategica', 'Consultoria Estratégica', 10),
    ('planejamento-conteudo', 'Planejamento de conteúdo', 20),
    ('gestao-rede', 'Gestão de Rede', 30),
    ('estruturacao-perfil', 'Estruturação de Perfil', 40),
    ('landing-page', 'Landing Page', 50),
    ('sites', 'Sites', 60),
    ('ecommerce', 'E-commerce', 70),
    ('identidade-visual', 'Identidade Visual', 80),
    ('posts', 'Posts', 90),
    ('design-grafico', 'Design Gráfico', 100),
    ('roteirizacao-video', 'Roteirização de vídeo', 110),
    ('edicao-video', 'Edição de vídeo', 120),
    ('captacao-conteudo', 'Captação de Conteúdo', 130),
    ('storymake', 'Storymake', 140),
    ('branding', 'Branding', 150),
    ('planejamento-evento', 'Planejamento de Evento', 160)
)
insert into public.services (organization_id, slug, name, sort_order, workflow_name)
select organization.id, service_seed.slug, service_seed.name, service_seed.sort_order, service_seed.name
from public.organizations organization
cross join service_seed
where organization.slug in ('mada-operacao', 'mada-treinamento')
on conflict (organization_id, slug) do update set name = excluded.name, sort_order = excluded.sort_order, active = true;
