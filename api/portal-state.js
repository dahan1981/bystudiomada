const { getPortalSession, isSameOrigin } = require("../lib/portal-auth-session");
const { withClient } = require("../lib/portal-db");
const { dispatchPortalNotificationEmails } = require("../lib/portal-email");
const { readRelationalState, writeRelationalState } = require("../lib/portal-relational");

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  if (!["GET", "PUT"].includes(request.method)) {
    response.setHeader("Allow", "GET, PUT");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (request.method === "PUT" && !isSameOrigin(request)) {
    response.status(403).json({ error: "Invalid request origin" });
    return;
  }

  try {
    const session = await getPortalSession(request, response);
    if (!session) {
      response.status(401).json({ error: "Authentication required" });
      return;
    }
    if (request.method === "GET") {
      const data = await withClient((client) => readRelationalState(client, session));
      response.status(200).json({ data, workspace: data.activeWorkspace });
      return;
    }

    const payload = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const data = await withClient((client) => writeRelationalState(client, payload.data || {}, session));
    await dispatchPortalNotificationEmails(session.user.organizationId).catch((error) => {
      console.error("Portal notification dispatch unavailable", { message: error.message });
    });
    response.status(200).json({ data, workspace: data.activeWorkspace });
  } catch (error) {
    response.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "Portal persistence unavailable",
      detail: error.statusCode ? undefined : error.message,
    });
  }
};
