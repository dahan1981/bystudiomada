function normalizePaymentPlan(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "100" || normalized.includes("vista") || normalized.includes("100") ? "100" : "50_50";
}

function expectedCommissionCents(baseCents, rateBps) {
  const base = Number(baseCents || 0);
  const rate = Number(rateBps || 0);
  if (base <= 0 || ![500, 1000].includes(rate)) return 0;
  return Math.round(base * rate / 10_000);
}

function commissionWarnings({ contractAmountCents, confirmedCents, baseCents, rateBps, amountCents }) {
  const warnings = [];
  const expected = expectedCommissionCents(baseCents, rateBps);
  if (Number(amountCents || 0) !== expected) warnings.push("O valor informado difere da taxa aplicada à base.");
  if (Number(baseCents || 0) !== Number(contractAmountCents || 0)) warnings.push("A base difere do valor total do contrato.");
  if (Number(confirmedCents || 0) > Number(contractAmountCents || 0)) warnings.push("Os pagamentos confirmados excedem a receita contratada.");
  if (Number(rateBps) === 500 && Number(confirmedCents || 0) >= Number(contractAmountCents || 0)) {
    warnings.push("O cliente já quitou o contrato; confirme se a comissão deveria ser 10% em um único lançamento.");
  }
  return warnings;
}

module.exports = { commissionWarnings, expectedCommissionCents, normalizePaymentPlan };
