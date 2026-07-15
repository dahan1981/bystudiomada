const crypto = require("crypto");
const { Pool } = require("pg");

const serviceSlugs = {
  "srv-consultoria-estrategica": "consultoria-estrategica",
  "srv-planejamento-conteudo": "planejamento-conteudo",
  "srv-gestao-rede": "gestao-rede",
  "srv-estrutura-perfil": "estruturacao-perfil",
  "srv-landing-page": "landing-page",
  "srv-site-institucional": "sites",
  "srv-ecommerce": "ecommerce",
  "srv-identidade": "identidade-visual",
  "srv-pack-posts": "posts",
  "srv-design-grafico": "design-grafico",
  "srv-roteirizacao-videos": "roteirizacao-video",
  "srv-edicao-videos": "edicao-video",
  "srv-captacao-conteudo": "captacao-conteudo",
  "srv-storymake": "storymake",
  "srv-branding": "branding",
  "srv-planejamento-evento": "planejamento-evento",
  "srv-social": "roteirizacao-video",
  "srv-campanha": "design-grafico",
  "srv-perfil-planejamento": "planejamento-conteudo",
  "srv-planejamento-roteiros": "roteirizacao-video",
  "srv-posts": "posts",
};

function timestamp(value) {
  const date = new Date(value || Date.now());
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("begin");
    const stateResult = await client.query("select data, updated_at from public.portal_state where id = 'portal-mada-main'");
    const state = stateResult.rows[0]?.data || {};
    const stateUpdatedAt = stateResult.rows[0]?.updated_at || null;
    const organizationResult = await client.query("select id from public.organizations where slug = 'mada-operacao'");
    const organizationId = organizationResult.rows[0]?.id;
    if (!organizationId) throw new Error("Mada Operação organization is missing");

    for (const user of state.users || []) {
      await client.query(`
        insert into private.portal_legacy_users (legacy_id, display_name, email, role, active, payload, updated_at)
        values ($1, $2, $3, $4, $5, $6::jsonb, now())
        on conflict (legacy_id) do update set
          display_name = excluded.display_name, email = excluded.email, role = excluded.role,
          active = excluded.active, payload = excluded.payload, updated_at = now()
      `, [user.id, user.name || user.email, String(user.email || "").toLowerCase(), user.role || "sdr", user.active !== false, JSON.stringify(user)]);
    }

    const servicesResult = await client.query("select id, slug from public.services where organization_id = $1", [organizationId]);
    const serviceBySlug = new Map(servicesResult.rows.map((service) => [service.slug, service.id]));
    const opportunityIds = new Map();

    for (const opportunity of state.opportunities || []) {
      const existing = await client.query("select id from public.opportunities where legacy_id = $1", [opportunity.id]);
      const opportunityId = existing.rows[0]?.id || crypto.randomUUID();
      opportunityIds.set(opportunity.id, opportunityId);
      const paymentPlan = String(opportunity.requestedConditions || opportunity.suggestedPaymentTerms || "").includes("100") ? "100" : "50_50";
      const createdAt = timestamp(opportunity.createdAt);
      const updatedAt = timestamp(opportunity.updatedAt || opportunity.createdAt);
      const payload = { ...opportunity, id: opportunityId, legacyId: opportunity.id };

      await client.query(`
        insert into public.opportunities (
          id, legacy_id, organization_id, legacy_sdr_id, client_name, brand_name,
          crm_status, approval_status, suggested_amount_cents, approved_amount_cents,
          payment_plan, next_action, next_action_date, archived_at, payload, version,
          created_at, updated_at
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15::jsonb,1,$16,$17)
        on conflict (legacy_id) do update set
          client_name = excluded.client_name, brand_name = excluded.brand_name,
          crm_status = excluded.crm_status, approval_status = excluded.approval_status,
          suggested_amount_cents = excluded.suggested_amount_cents,
          approved_amount_cents = excluded.approved_amount_cents,
          payment_plan = excluded.payment_plan, next_action = excluded.next_action,
          next_action_date = excluded.next_action_date, archived_at = excluded.archived_at,
          payload = excluded.payload, updated_at = excluded.updated_at
      `, [
        opportunityId, opportunity.id, organizationId, opportunity.sdrId || null,
        opportunity.clientName || "Cliente sem nome", opportunity.brandName || opportunity.clientName || "Marca sem nome",
        opportunity.crmStatus || "lead_mapped", opportunity.status || "draft",
        Number(opportunity.suggestedAmountCents || 0), opportunity.approvedAmountCents == null ? null : Number(opportunity.approvedAmountCents),
        paymentPlan, opportunity.nextAction || null, opportunity.nextActionDate || null,
        opportunity.status === "cancelled" ? updatedAt : null, JSON.stringify(payload), createdAt, updatedAt,
      ]);

      await client.query("delete from public.opportunity_services where opportunity_id = $1", [opportunityId]);
      const legacyServiceIds = [...new Set([...(opportunity.serviceIds || []), opportunity.serviceId].filter(Boolean))];
      for (const legacyServiceId of legacyServiceIds) {
        const serviceId = serviceBySlug.get(serviceSlugs[legacyServiceId]);
        if (!serviceId) continue;
        await client.query(
          "insert into public.opportunity_services (opportunity_id, service_id) values ($1, $2) on conflict do nothing",
          [opportunityId, serviceId],
        );
      }
    }

    for (const log of state.auditLogs || []) {
      const entityId = opportunityIds.get(log.entityId) || null;
      await client.query(`
        insert into public.audit_logs (legacy_id, organization_id, action, entity_type, entity_id, metadata, created_at)
        values ($1,$2,$3,$4,$5,$6::jsonb,$7)
        on conflict (legacy_id) do nothing
      `, [log.id, organizationId, log.action || "legacy_event", log.entityType || "legacy", entityId, JSON.stringify({ ...(log.metadata || {}), legacyActorId: log.actorUserId || log.actorId }), timestamp(log.createdAt)]);
    }

    const checksum = crypto.createHash("sha256").update(JSON.stringify(state)).digest("hex");
    const counts = {
      users: (state.users || []).length,
      opportunities: (state.opportunities || []).length,
      auditLogs: (state.auditLogs || []).length,
    };
    const priorImport = await client.query("select 1 from private.portal_legacy_imports where source_checksum = $1", [checksum]);
    if (!priorImport.rowCount) {
      await client.query(
        "insert into private.portal_legacy_imports (source_state_updated_at, source_checksum, imported_counts) values ($1,$2,$3::jsonb)",
        [stateUpdatedAt, checksum, JSON.stringify(counts)],
      );
    }
    await client.query("commit");
    process.stdout.write(JSON.stringify({ organizationId, counts, checksum }, null, 2));
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
