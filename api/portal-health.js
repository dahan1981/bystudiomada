const { withClient } = require("../lib/portal-db");

const EXPECTED_MIGRATION = "20260716101000";

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ status: "error" });
    return;
  }
  const startedAt = Date.now();
  try {
    const check = await withClient(async (client) => {
      const result = await client.query(`
        select
          (select count(*)::int from public.organizations where active) as organizations,
          (select count(*)::int from private.portal_migrations) as migrations,
          (select version from private.portal_migrations order by version desc limit 1) as latest_migration,
          (select count(*)::int from private.notification_email_deliveries where status = 'failed' and attempt_count >= 5) as dead_email_deliveries,
          exists(select 1 from storage.buckets where id = 'portal-documents' and not public) as private_bucket
      `);
      return result.rows[0];
    });
    const migrationsReady = String(check.latest_migration || "") === EXPECTED_MIGRATION;
    const emailsReady = Number(check.dead_email_deliveries || 0) === 0;
    const ready = Boolean(check.private_bucket && migrationsReady && emailsReady);
    response.status(ready ? 200 : 503).json({
      status: ready ? "ok" : "degraded",
      database: "ok",
      storage: check.private_bucket ? "ok" : "missing",
      organizations: check.organizations,
      migrations: migrationsReady ? "ok" : "pending",
      notifications: emailsReady ? "ok" : "attention",
      latencyMs: Date.now() - startedAt,
    });
  } catch {
    response.status(503).json({ status: "error", database: "unavailable", latencyMs: Date.now() - startedAt });
  }
};
