const { readState, updateState, withClient } = require("../lib/portal-db");
const {
  clearSessionCookie,
  getSessionUser,
  hashPassword,
  isSameOrigin,
  normalizeEmail,
  publicUser,
  setSessionCookie,
  validatePassword,
  verifyPassword,
} = require("../lib/portal-security");

const INITIAL_MANAGER_CREDENTIAL = {
  passwordSalt: "d6864463b594495bb24558332bd823dc",
  passwordHash: "7fd494260180d94ae9ed9c60124047441bd20424c7a3f1ab76cd522ffddf69adb390719b556046c4371bcbedbe02ce3aa5ffb7564653d514b5f2330a2c63dac6",
};

function bodyOf(request) {
  return typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
}

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");

  if (!["GET", "POST"].includes(request.method)) {
    response.setHeader("Allow", "GET, POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (request.method === "POST" && !isSameOrigin(request)) {
    response.status(403).json({ error: "Invalid request origin" });
    return;
  }

  try {
    if (request.method === "GET") {
      const row = await withClient((client) => readState(client));
      const user = getSessionUser(request, row?.data || {});
      response.status(user ? 200 : 401).json({ user: publicUser(user) });
      return;
    }

    const body = bodyOf(request);
    if (body.action === "logout") {
      clearSessionCookie(request, response);
      response.status(200).json({ ok: true });
      return;
    }

    if (body.action === "change_password") {
      let sessionUser;
      await updateState((state) => {
        const user = getSessionUser(request, state);
        if (!user) {
          const error = new Error("Authentication required");
          error.statusCode = 401;
          throw error;
        }
        if (!verifyPassword(body.currentPassword, user)) {
          const error = new Error("Senha atual incorreta.");
          error.statusCode = 400;
          throw error;
        }
        Object.assign(user, hashPassword(validatePassword(body.newPassword)), { passwordChangedAt: new Date().toISOString() });
        sessionUser = user;
        return state;
      });
      setSessionCookie(request, response, sessionUser);
      response.status(200).json({ user: publicUser(sessionUser) });
      return;
    }

    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    let authenticatedUser;
    await updateState((state) => {
      state.users = state.users || [];
      if (!state.users.some((item) => item.role === "admin_manager")) {
        state.users.push({
          id: "usr-admin",
          name: "Joao Dahan",
          email: "gestor@bystudiomada.com.br",
          role: "admin_manager",
          active: true,
          createdAt: new Date().toISOString(),
          ...INITIAL_MANAGER_CREDENTIAL,
        });
      }
      const user = (state.users || []).find((item) => normalizeEmail(item.email) === email && item.active !== false);
      if (!user) {
        const error = new Error("E-mail ou senha inválidos.");
        error.statusCode = 401;
        throw error;
      }

      if (user.role === "admin_manager" && !user.passwordHash) {
        Object.assign(user, INITIAL_MANAGER_CREDENTIAL);
      }
      if (!verifyPassword(password, user)) {
        const error = new Error(user.passwordHash ? "E-mail ou senha inválidos." : "Acesso ainda não configurado pelo gestor.");
        error.statusCode = 401;
        throw error;
      }

      user.lastLoginAt = new Date().toISOString();
      authenticatedUser = user;
      return state;
    });

    setSessionCookie(request, response, authenticatedUser);
    response.status(200).json({ user: publicUser(authenticatedUser) });
  } catch (error) {
    response.status(error.statusCode || 500).json({ error: error.statusCode ? error.message : "Authentication unavailable", detail: error.statusCode ? undefined : error.message });
  }
};
