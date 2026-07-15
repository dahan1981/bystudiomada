const test = require("node:test");
const assert = require("node:assert/strict");
const { commissionWarnings, expectedCommissionCents, normalizePaymentPlan } = require("../../lib/portal-domain");

test("normalizes the two supported payment plans", () => {
  assert.equal(normalizePaymentPlan("50% entrada + 50% entrega"), "50_50");
  assert.equal(normalizePaymentPlan("À vista / 100%"), "100");
});

test("calculates 5% and 10% over the declared base", () => {
  assert.equal(expectedCommissionCents(100_000, 500), 5_000);
  assert.equal(expectedCommissionCents(100_000, 1000), 10_000);
});

test("warns when a fully paid contract is recorded with a single 5% commission", () => {
  const warnings = commissionWarnings({
    contractAmountCents: 100_000,
    confirmedCents: 100_000,
    baseCents: 100_000,
    rateBps: 500,
    amountCents: 5_000,
  });
  assert(warnings.some((warning) => warning.includes("10%")));
});
