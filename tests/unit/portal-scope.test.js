const test = require("node:test");
const assert = require("node:assert/strict");
const { mergeStateForUser, visibleStateForUser } = require("../../lib/portal-scope");

function state() {
  return {
    users: [{ id: "manager", role: "admin_manager" }, { id: "sdr-a", role: "sdr" }, { id: "sdr-b", role: "sdr" }],
    services: [],
    opportunities: [
      { id: "opp-a", sdrId: "sdr-a", status: "draft", suggestedAmountCents: 100_000 },
      { id: "opp-b", sdrId: "sdr-b", status: "draft", suggestedAmountCents: 200_000 },
    ],
    approvalRequests: [], conditions: [], contracts: [], payments: [], commissions: [], payoutBatches: [], projects: [], files: [], notifications: [], auditLogs: [],
  };
}

test("SDR can only see her own opportunity", () => {
  const visible = visibleStateForUser(state(), { id: "sdr-a", role: "sdr" });
  assert.deepEqual(visible.opportunities.map((item) => item.id), ["opp-a"]);
});

test("SDR cannot reassign an opportunity or force an approved state", () => {
  const source = state();
  const incoming = visibleStateForUser(source, { id: "sdr-a", role: "sdr" });
  incoming.opportunities[0].sdrId = "sdr-b";
  incoming.opportunities[0].status = "commercial_condition_approved";
  const merged = mergeStateForUser(source, incoming, { id: "sdr-a", role: "sdr" });
  const opportunity = merged.opportunities.find((item) => item.id === "opp-a");
  assert.equal(opportunity.sdrId, "sdr-a");
  assert.equal(opportunity.status, "draft");
});
