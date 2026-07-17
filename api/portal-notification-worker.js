const { withClient } = require("../lib/portal-db");
const { dispatchPortalNotificationEmails } = require("../lib/portal-email");

module.exports = async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  const expected = process.env.CRON_SECRET;
  const authorization = String(request.headers?.authorization || "");
  if (expected && authorization !== `Bearer ${expected}`) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const organizations = await withClient((client) => client.query("select id from public.organizations where active"));
    const result = { sent: 0, failed: 0, organizations: organizations.rowCount };
    for (const organization of organizations.rows) {
      const dispatched = await dispatchPortalNotificationEmails(organization.id, { limit: 30 });
      result.sent += dispatched.sent;
      result.failed += dispatched.failed;
    }
    response.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error("Portal notification worker failed", { message: error.message });
    response.status(500).json({ error: "Notification worker unavailable" });
  }
};
