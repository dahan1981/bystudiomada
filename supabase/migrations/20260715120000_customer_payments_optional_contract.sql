begin;

alter table public.customer_payments
  alter column contract_id drop not null;

comment on column public.customer_payments.contract_id is
  'Optional CRM contract link. Null identifies a manager-only manual payment record.';

commit;
