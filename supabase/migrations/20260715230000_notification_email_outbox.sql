begin;

create table if not exists private.notification_email_deliveries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  notification_id uuid not null references public.notifications(id) on delete cascade,
  recipient_user_id uuid not null references public.profiles(user_id) on delete cascade,
  recipient_email text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  provider_message_id text,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (notification_id, recipient_user_id)
);

create index if not exists notification_email_delivery_queue_idx
  on private.notification_email_deliveries (organization_id, status, next_attempt_at, created_at);

create or replace function private.portal_enrich_notification()
returns trigger
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
declare
  client_name text;
  actor_name text;
  original_message text;
begin
  if lower(coalesce(new.entity_type, '')) <> 'opportunity' or new.entity_id is null then
    return new;
  end if;

  select opportunity.client_name into client_name
  from public.opportunities opportunity
  where opportunity.id = new.entity_id;

  select profile.display_name into actor_name
  from public.profiles profile
  where profile.user_id = new.created_by;

  original_message := nullif(btrim(new.message), '');
  client_name := coalesce(nullif(btrim(client_name), ''), 'uma oportunidade');
  actor_name := coalesce(nullif(btrim(actor_name), ''), 'a equipe Mada');

  if new.title = 'Nova aprovação' then
    new.title := 'Nova condição aguardando aprovação';
    new.message := format('A condição comercial de %s foi enviada para sua aprovação por %s.', client_name, actor_name);
  elsif new.title = 'Informações solicitadas' then
    new.message := format('O gestor %s pediu novas informações sobre %s. %s', actor_name, client_name, coalesce(original_message, 'Consulte os detalhes no portal.'));
  elsif new.title = 'Condição recusada' then
    new.message := format('A condição comercial de %s foi recusada por %s. Motivo: %s', client_name, actor_name, coalesce(original_message, 'Consulte os detalhes no portal.'));
  elsif new.title = 'Condição aprovada' then
    new.message := format('A condição comercial de %s foi aprovada por %s. O contrato e o projeto já estão disponíveis no portal.', client_name, actor_name);
  end if;

  return new;
end;
$$;

create or replace function private.portal_enqueue_notification_email()
returns trigger
language plpgsql
security definer
set search_path = public, private, auth, pg_temp
as $$
begin
  insert into private.notification_email_deliveries (
    organization_id,
    notification_id,
    recipient_user_id,
    recipient_email
  )
  select
    new.organization_id,
    new.id,
    profile.user_id,
    lower(btrim(profile.email))
  from public.organization_members membership
  join public.profiles profile on profile.user_id = membership.user_id
  where membership.organization_id = new.organization_id
    and membership.active
    and profile.active
    and profile.email like '%@%'
    and profile.user_id is distinct from new.created_by
    and (
      (new.recipient_user_id is not null and profile.user_id = new.recipient_user_id)
      or
      (new.recipient_user_id is null and new.recipient_role is not null and membership.role = new.recipient_role)
    )
  on conflict (notification_id, recipient_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists portal_00_enrich_notification on public.notifications;
create trigger portal_00_enrich_notification
before insert on public.notifications
for each row execute function private.portal_enrich_notification();

drop trigger if exists portal_enqueue_notification_email on public.notifications;
create trigger portal_enqueue_notification_email
after insert on public.notifications
for each row execute function private.portal_enqueue_notification_email();

revoke all on table private.notification_email_deliveries from public;
revoke all on function private.portal_enrich_notification() from public;
revoke all on function private.portal_enqueue_notification_email() from public;

commit;
