begin;

alter table private.notification_email_deliveries
  add column if not exists provider_status text,
  add column if not exists delivered_at timestamptz,
  add column if not exists bounced_at timestamptz;

create index if not exists notification_email_delivery_provider_idx
  on private.notification_email_deliveries(provider_message_id)
  where provider_message_id is not null;

commit;
