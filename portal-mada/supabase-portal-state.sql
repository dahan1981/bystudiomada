create table if not exists public.portal_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portal_state enable row level security;

create table if not exists public.portal_attachments (
  id text primary key,
  filename text not null,
  mime_type text not null,
  size_bytes integer not null,
  data bytea not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.portal_attachments enable row level security;

-- O portal acessa estas tabelas somente pelas funcoes server-side da Vercel.
-- Nenhum dado ou anexo deve ficar disponivel diretamente pela Data API.
revoke all on public.portal_state from anon, authenticated;
revoke all on public.portal_attachments from anon, authenticated;
