const { getPortalSession, isSameOrigin } = require("../lib/portal-auth-session");
const { createPublicClient } = require("../lib/supabase-server");

function bodyOf(request) {
  return typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
}

function workflowError(error) {
  const code = String(error?.code || "");
  const message = String(error?.message || "Não foi possível concluir o fluxo.");
  const result = new Error(message.replace(/^.*?:\s*/, ""));
  result.statusCode = code === "42501" ? 403 : code === "28000" ? 401 : code === "40001" ? 409 : 400;
  return result;
}

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!isSameOrigin(request)) {
    response.status(403).json({ error: "Invalid request origin" });
    return;
  }

  try {
    const session = await getPortalSession(request, response);
    if (!session) {
      response.status(401).json({ error: "Authentication required" });
      return;
    }
    const body = bodyOf(request);
    const opportunityId = String(body.opportunityId || "");
    const supabase = createPublicClient(session.accessToken);
    let result;

    if (body.action === "request_approval") {
      result = await supabase.rpc("portal_request_approval", {
        p_opportunity_id: opportunityId,
        p_expected_version: Number(body.expectedVersion || 1),
      });
    } else if (body.action === "review_opportunity") {
      result = await supabase.rpc("portal_review_opportunity", {
        p_opportunity_id: opportunityId,
        p_action: String(body.reviewAction || ""),
        p_amount_cents: body.amountCents == null ? null : Number(body.amountCents),
        p_reason: body.reason ? String(body.reason) : null,
        p_expected_version: body.expectedVersion == null ? null : Number(body.expectedVersion),
      });
    } else if (body.action === "update_project_stage") {
      result = await supabase.rpc("portal_update_project_stage", {
        p_stage_id: String(body.stageId || ""),
        p_status: String(body.status || ""),
        p_expected_version: Number(body.expectedVersion || 1),
      });
    } else if (body.action === "mark_notification_read") {
      result = await supabase.rpc("portal_mark_notification_read", {
        p_notification_id: String(body.notificationId || ""),
      });
    } else {
      response.status(400).json({ error: "Ação de fluxo inválida." });
      return;
    }

    if (result.error) throw workflowError(result.error);
    response.status(200).json({ data: result.data ?? null });
  } catch (error) {
    response.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "Workflow persistence unavailable",
      detail: error.statusCode ? undefined : error.message,
    });
  }
};
