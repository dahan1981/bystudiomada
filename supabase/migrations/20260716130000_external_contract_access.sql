-- External contracts do not have an opportunity. Keep them visible only to
-- managers or to the SDR explicitly assigned in the contract payload.
drop policy if exists portal_contracts_select on public.contracts;
create policy portal_contracts_select on public.contracts for select to authenticated
using (
  private.portal_is_manager(organization_id)
  or private.portal_can_access_opportunity(opportunity_id)
  or (
    (payload->>'recordMode') = 'external'
    and (payload->>'sdrId') = auth.uid()::text
  )
);

drop policy if exists portal_payments_select on public.customer_payments;
create policy portal_payments_select on public.customer_payments for select to authenticated
using (
  private.portal_is_manager(organization_id)
  or exists (
    select 1 from public.contracts contract
    where contract.id = contract_id
      and (
        private.portal_can_access_opportunity(contract.opportunity_id)
        or (
          (contract.payload->>'recordMode') = 'external'
          and (contract.payload->>'sdrId') = auth.uid()::text
        )
      )
  )
);
