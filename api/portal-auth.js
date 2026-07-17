const {
  buildPortalIdentity,
  clearAuthCookies,
  getPortalSession,
  isSameOrigin,
  parseCookies,
  setAuthCookies,
  setWorkspaceCookie,
} = require("../lib/portal-auth-session");
const { createPublicClient } = require("../lib/supabase-server");
const { sendApiError } = require("../lib/portal-http");

function bodyOf(request) {
  return typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
}

function portalOrigin(request) {
  if (process.env.PORTAL_PUBLIC_ORIGIN) return process.env.PORTAL_PUBLIC_ORIGIN.replace(/\/$/, "");
  const host = request.headers?.["x-forwarded-host"] || request.headers?.host;
  const protocol = request.headers?.["x-forwarded-proto"] || (process.env.VERCEL ? "https" : "http");
  return `${protocol}://${host}`;
}

function authError(error) {
  const message = String(error?.message || "");
  if (/invalid login credentials/i.test(message)) return "E-mail ou senha inválidos.";
  if (/email not confirmed/i.test(message)) return "Confirme o convite recebido por e-mail antes de entrar.";
  if (/password/i.test(message)) return "A senha precisa atender aos requisitos de segurança.";
  return "Não foi possível concluir a autenticação.";
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
      const session = await getPortalSession(request, response);
      response.status(session ? 200 : 401).json({ user: session?.user || null });
      return;
    }

    const body = bodyOf(request);
    const action = body.action || "login";
    const client = createPublicClient();

    if (action === "login") {
      const result = await client.auth.signInWithPassword({
        email: String(body.email || "").trim().toLowerCase(),
        password: String(body.password || ""),
      });
      if (result.error || !result.data.session || !result.data.user) {
        response.status(401).json({ error: authError(result.error) });
        return;
      }
      const identity = await buildPortalIdentity(
        result.data.session.access_token,
        result.data.user,
        null,
        result.data.session.refresh_token,
      );
      if (!identity) {
        await client.auth.setSession(result.data.session);
        await client.auth.signOut({ scope: "global" });
        response.status(403).json({ error: "Conta autenticada, mas sem acesso ativo ao Portal Mada." });
        return;
      }
      setAuthCookies(request, response, result.data.session);
      setWorkspaceCookie(request, response, identity.activeMembership.organization_id);
      response.status(200).json({ user: identity.user });
      return;
    }

    if (action === "recover") {
      const email = String(body.email || "").trim().toLowerCase();
      await client.auth.resetPasswordForEmail(email, { redirectTo: `${portalOrigin(request)}/portal-mada/?mode=recovery` });
      response.status(200).json({ ok: true, message: "Se a conta existir, o e-mail de recuperação será enviado." });
      return;
    }

    if (action === "complete_recovery") {
      const result = await client.auth.setSession({
        access_token: String(body.accessToken || ""),
        refresh_token: String(body.refreshToken || ""),
      });
      if (result.error || !result.data.session) {
        response.status(400).json({ error: "O link de recuperação expirou. Solicite um novo." });
        return;
      }
      const updated = await client.auth.updateUser({ password: String(body.newPassword || "") });
      if (updated.error) {
        response.status(400).json({ error: authError(updated.error) });
        return;
      }
      setAuthCookies(request, response, result.data.session);
      response.status(200).json({ ok: true });
      return;
    }

    if (action === "complete_invitation") {
      const result = await client.auth.setSession({
        access_token: String(body.accessToken || ""),
        refresh_token: String(body.refreshToken || ""),
      });
      if (result.error || !result.data.session) {
        response.status(400).json({ error: "O convite expirou. Peça ao gestor para enviar um novo convite." });
        return;
      }
      const updated = await client.auth.updateUser({ password: String(body.newPassword || "") });
      if (updated.error) {
        response.status(400).json({ error: authError(updated.error) });
        return;
      }
      await client.auth.signOut({ scope: "global" });
      clearAuthCookies(request, response);
      response.status(200).json({ ok: true });
      return;
    }

    const session = await getPortalSession(request, response);
    if (!session) {
      response.status(401).json({ error: "Sessão expirada. Entre novamente." });
      return;
    }

    if (["mfa_enroll", "mfa_list", "mfa_verify"].includes(action)) {
      const cookies = parseCookies(request);
      const mfaClient = createPublicClient();
      const restored = await mfaClient.auth.setSession({
        access_token: session.accessToken,
        refresh_token: cookies.mada_sb_refresh || "",
      });
      if (restored.error || !restored.data.session) {
        response.status(401).json({ error: "Sessão expirada. Entre novamente." });
        return;
      }
      if (action === "mfa_enroll") {
        if (session.user.role !== "admin_manager") {
          response.status(403).json({ error: "MFA obrigatório está disponível para gestores." });
          return;
        }
        const enrolled = await mfaClient.auth.mfa.enroll({ factorType: "totp", friendlyName: "Portal Mada" });
        if (enrolled.error) throw enrolled.error;
        response.status(200).json({
          factorId: enrolled.data.id,
          qrCode: enrolled.data.totp.qr_code,
          secret: enrolled.data.totp.secret,
        });
        return;
      }
      if (action === "mfa_list") {
        const factors = await mfaClient.auth.mfa.listFactors();
        if (factors.error) throw factors.error;
        response.status(200).json({ factors: factors.data.totp || [] });
        return;
      }
      const verified = await mfaClient.auth.mfa.challengeAndVerify({
        factorId: String(body.factorId || ""),
        code: String(body.code || "").trim(),
      });
      if (verified.error) {
        response.status(400).json({ error: "Código inválido ou expirado." });
        return;
      }
      const latest = await mfaClient.auth.getSession();
      if (latest.data.session) setAuthCookies(request, response, latest.data.session);
      response.status(200).json({ ok: true });
      return;
    }

    if (action === "logout") {
      const cookies = parseCookies(request);
      const sessionClient = createPublicClient();
      await sessionClient.auth.setSession({
        access_token: session.accessToken,
        refresh_token: cookies.mada_sb_refresh || "",
      });
      await sessionClient.auth.signOut({ scope: "global" });
      clearAuthCookies(request, response);
      response.status(200).json({ ok: true });
      return;
    }

    if (action === "select_workspace") {
      const membership = session.user.memberships.find((item) => item.organizationId === body.organizationId);
      if (!membership) {
        response.status(403).json({ error: "Você não possui acesso a este ambiente." });
        return;
      }
      setWorkspaceCookie(request, response, membership.organizationId);
      response.status(200).json({ user: {
        ...session.user,
        role: membership.role,
        organizationId: membership.organizationId,
        organizationName: membership.organizationName,
        workspaceKind: membership.workspaceKind,
      } });
      return;
    }

    if (action === "change_password") {
      const reauth = await client.auth.signInWithPassword({
        email: session.user.email,
        password: String(body.currentPassword || ""),
      });
      if (reauth.error || !reauth.data.session) {
        response.status(400).json({ error: "Senha atual incorreta." });
        return;
      }
      const restored = await client.auth.setSession(reauth.data.session);
      if (restored.error) {
        response.status(400).json({ error: "Não foi possível validar a sessão novamente." });
        return;
      }
      const updated = await client.auth.updateUser({ password: String(body.newPassword || "") });
      if (updated.error) {
        response.status(400).json({ error: authError(updated.error) });
        return;
      }
      if (updated.data.user && reauth.data.session) setAuthCookies(request, response, reauth.data.session);
      response.status(200).json({ user: session.user });
      return;
    }

    response.status(400).json({ error: "Ação de autenticação inválida." });
  } catch (error) {
    sendApiError(request, response, error, "Não foi possível concluir a autenticação.", { context: "Portal authentication failed" });
  }
};
