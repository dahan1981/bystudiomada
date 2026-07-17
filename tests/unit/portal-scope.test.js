const test = require("node:test");
const assert = require("node:assert/strict");
const { applyMutationSet, mergeStateForUser, visibleStateForUser } = require("../../lib/portal-scope");

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

test("SDR cannot alter or restore a manager-rejected opportunity", () => {
  const source = state();
  source.opportunities[0] = {
    ...source.opportunities[0],
    status: "rejected",
    terminalRejection: true,
    archivedAt: "2026-07-15T12:00:00.000Z",
    clientName: "Cliente bloqueado",
  };
  const incoming = visibleStateForUser(source, { id: "sdr-a", role: "sdr" });
  incoming.opportunities[0].status = "draft";
  incoming.opportunities[0].archivedAt = null;
  incoming.opportunities[0].clientName = "Cliente alterado";
  const merged = mergeStateForUser(source, incoming, { id: "sdr-a", role: "sdr" });
  const opportunity = merged.opportunities.find((item) => item.id === "opp-a");
  assert.equal(opportunity.status, "rejected");
  assert.equal(opportunity.archivedAt, "2026-07-15T12:00:00.000Z");
  assert.equal(opportunity.clientName, "Cliente bloqueado");
});

test("mutation set preserves unrelated records changed by another manager", () => {
  const current = state();
  current.opportunities[1].suggestedAmountCents = 250_000;
  const staleIncoming = state();
  staleIncoming.opportunities[0].suggestedAmountCents = 150_000;
  const result = applyMutationSet(current, staleIncoming, { opportunities: ["opp-a"] });
  assert.equal(result.opportunities.find((item) => item.id === "opp-a").suggestedAmountCents, 150_000);
  assert.equal(result.opportunities.find((item) => item.id === "opp-b").suggestedAmountCents, 250_000);
});
