const crypto = require("crypto");
const { updateState } = require("../lib/portal-db");
const {
  getSessionUser,
  hashPassword,
  isSameOrigin,
  normalizeEmail,
  publicUser,
  validatePassword,
} = require("../lib/portal-security");

function bodyOf(request) {
  return typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
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
    const body = bodyOf(request);
    let resultUser;
    await updateState((state) => {
      const manager = getSessionUser(request, state);
      if (!manager || manager.role !== "admin_manager") {
        const error = new Error("Apenas o gestor pode administrar contas.");
        error.statusCode = 403;
        throw error;
      }

      state.users = state.users || [];
      if (body.action === "create") {
        const name = String(body.name || "").trim();
        const email = normalizeEmail(body.email);
        if (!name || !email) {
          const error = new Error("Informe nome e e-mail da SDR.");
          error.statusCode = 400;
          throw error;
        }
        if (state.users.some((item) => normalizeEmail(item.email) === email)) {
          const error = new Error("Já existe uma conta com este e-mail.");
          error.statusCode = 409;
          throw error;
        }
        resultUser = {
          id: `usr_${crypto.randomUUID()}`,
          name,
          email,
          role: "sdr",
          active: true,
          createdAt: new Date().toISOString(),
          createdBy: manager.id,
          ...hashPassword(validatePassword(body.password)),
        };
        state.users.push(resultUser);
        return state;
      }

      const user = state.users.find((item) => item.id === body.userId);
      if (!user) {
        const error = new Error("Conta não encontrada.");
        error.statusCode = 404;
        throw error;
      }
      if (body.action === "reset_password") {
        Object.assign(user, hashPassword(validatePassword(body.password)), { passwordChangedAt: new Date().toISOString() });
      } else if (body.action === "toggle_active") {
        if (user.role === "admin_manager") {
          const error = new Error("A conta principal do gestor não pode ser desativada.");
          error.statusCode = 400;
          throw error;
        }
        user.active = body.active !== false;
      } else {
        const error = new Error("Ação inválida.");
        error.statusCode = 400;
        throw error;
      }
      resultUser = user;
      return state;
    });
    response.status(200).json({ user: publicUser(resultUser) });
  } catch (error) {
    response.status(error.statusCode || 500).json({ error: error.statusCode ? error.message : "User management unavailable", detail: error.statusCode ? undefined : error.message });
  }
};
