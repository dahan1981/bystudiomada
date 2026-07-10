const { readState, updateState, withClient } = require("../lib/portal-db");
const { getSessionUser, isSameOrigin } = require("../lib/portal-security");
const { mergeStateForUser, visibleStateForUser } = require("../lib/portal-scope");

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
    if (request.method === "GET") {
      const row = await withClient((client) => readState(client));
      const user = getSessionUser(request, row?.data || {});
      if (!user) {
        response.status(401).json({ error: "Authentication required" });
        return;
      }
      response.status(200).json({
        data: visibleStateForUser(row?.data || {}, user),
        updated_at: row?.updated_at || null,
      });
      return;
    }

    const payload = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    let visibleData;
    const row = await updateState((current, updatedAt) => {
      const user = getSessionUser(request, current);
      if (!user) {
        const error = new Error("Authentication required");
        error.statusCode = 401;
        throw error;
      }
      if (user.role === "admin_manager" && payload.updatedAt && updatedAt && new Date(payload.updatedAt).getTime() !== new Date(updatedAt).getTime()) {
        const error = new Error("Os dados foram atualizados por outra conta. Recarregue e tente novamente.");
        error.statusCode = 409;
        throw error;
      }
      const merged = mergeStateForUser(current, payload.data || {}, user);
      visibleData = visibleStateForUser(merged, user);
      return merged;
    });
    response.status(200).json({ data: visibleData, updated_at: row.updated_at });
  } catch (error) {
    response.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "Supabase persistence unavailable",
      detail: error.statusCode ? undefined : error.message,
    });
  }
};
