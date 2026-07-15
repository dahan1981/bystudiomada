const { withClient } = require("../lib/portal-db");

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
          exists(select 1 from storage.buckets where id = 'portal-documents' and not public) as private_bucket
      `);
      return result.rows[0];
    });
    response.status(check.private_bucket ? 200 : 503).json({
      status: check.private_bucket ? "ok" : "degraded",
      database: "ok",
      storage: check.private_bucket ? "ok" : "missing",
      organizations: check.organizations,
      migrations: check.migrations,
      latencyMs: Date.now() - startedAt,
    });
  } catch {
    response.status(503).json({ status: "error", database: "unavailable", latencyMs: Date.now() - startedAt });
  }
};
