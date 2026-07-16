const crypto = require("crypto");

function requestId(request) {
  return String(request.headers?.["x-vercel-id"] || request.headers?.["x-request-id"] || crypto.randomUUID());
}

function requireManagerMfa(session) {
  if (session?.user?.role !== "admin_manager") return;
  if (session.user.mfaCurrentLevel === "aal2") return;
  const error = new Error("Confirme a verificação em duas etapas para continuar.");
  error.statusCode = 403;
  error.code = "MFA_REQUIRED";
  throw error;
}

function sendApiError(request, response, error, fallback, options = {}) {
  const id = requestId(request);
  const statusCode = Number(error?.statusCode || 500);
  const expose = statusCode < 500 || options.expose === true;
  console.error(options.context || "Portal API error", {
    requestId: id,
    statusCode,
    code: error?.code,
    message: error?.message,
  });
  response.status(statusCode).json({
    error: expose ? String(error?.message || fallback) : fallback,
    code: error?.code || undefined,
    requestId: id,
  });
}

module.exports = {
  requireManagerMfa,
  sendApiError,
};
