create table if not exists private.portal_legacy_users (
  legacy_id text primary key,
  display_name text not null,
  email text not null,
  role text not null,
  active boolean not null default true,
  migrated_user_id uuid references auth.users(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists private.portal_legacy_imports (
  id uuid primary key default gen_random_uuid(),
  source_state_updated_at timestamptz,
  source_checksum text not null,
  imported_counts jsonb not null,
  imported_at timestamptz not null default now()
);

revoke all on private.portal_legacy_users from public, anon, authenticated;
revoke all on private.portal_legacy_imports from public, anon, authenticated;
