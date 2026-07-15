const { createPublicClient } = require("./supabase-server");

const ACCESS_COOKIE = "mada_sb_access";
const REFRESH_COOKIE = "mada_sb_refresh";
const WORKSPACE_COOKIE = "mada_portal_org";

function parseCookies(request) {
  return String(request.headers?.cookie || "").split(";").reduce((cookies, part) => {
    const index = part.indexOf("=");
    if (index < 0) return cookies;
    cookies[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1).trim());
    return cookies;
  }, {});
}

function cookieSecurity(request) {
  return request.headers?.["x-forwarded-proto"] === "https" || Boolean(process.env.VERCEL);
}

function setCookies(response, values) {
  const current = response.getHeader("Set-Cookie");
  const list = current ? (Array.isArray(current) ? current : [current]) : [];
  response.setHeader("Set-Cookie", [...list, ...values]);
}

function cookie(request, name, value, maxAge) {
  const secure = cookieSecurity(request) ? "; Secure" : "";
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function setAuthCookies(request, response, session) {
  setCookies(response, [
    cookie(request, ACCESS_COOKIE, session.access_token, Math.max(60, Number(session.expires_in || 3600))),
    cookie(request, REFRESH_COOKIE, session.refresh_token, 60 * 60 * 24 * 30),
  ]);
}

function clearAuthCookies(request, response) {
  setCookies(response, [
    cookie(request, ACCESS_COOKIE, "", 0),
    cookie(request, REFRESH_COOKIE, "", 0),
    cookie(request, WORKSPACE_COOKIE, "", 0),
  ]);
}

function setWorkspaceCookie(request, response, organizationId) {
  setCookies(response, [cookie(request, WORKSPACE_COOKIE, organizationId, 60 * 60 * 24 * 30)]);
}

function isSameOrigin(request) {
  const origin = request.headers?.origin;
  if (!origin) return true;
  try {
    const host = request.headers?.["x-forwarded-host"] || request.headers?.host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function loadMemberships(accessToken, userId) {
  const client = createPublicClient(accessToken);
  const [profileResult, membershipsResult] = await Promise.all([
    client.from("profiles").select("user_id, display_name, email, active").eq("user_id", userId).maybeSingle(),
    client.from("organization_members")
      .select("organization_id, role, active, organizations(id, slug, name, workspace_kind, active)")
      .eq("user_id", userId)
      .eq("active", true),
  ]);
  if (profileResult.error) throw profileResult.error;
  if (membershipsResult.error) throw membershipsResult.error;
  return { profile: profileResult.data, memberships: membershipsResult.data || [] };
}

async function buildPortalIdentity(accessToken, authUser, requestedOrganization, refreshToken = "") {
  const { profile, memberships } = await loadMemberships(accessToken, authUser.id);
  if (!profile?.active || !memberships.length) return null;
  const activeMembership = memberships.find((item) => item.organization_id === requestedOrganization && item.organizations?.active)
    || memberships.find((item) => item.organizations?.workspace_kind === "training" && item.organizations?.active)
    || memberships.find((item) => item.organizations?.active);
  if (!activeMembership) return null;
  const mfaClient = createPublicClient();
  let aalResult = { data: { currentLevel: "aal1", nextLevel: "aal1" } };
  if (refreshToken) {
    const restored = await mfaClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (!restored.error) {
      aalResult = await mfaClient.auth.mfa.getAuthenticatorAssuranceLevel();
    }
  }
  const currentLevel = aalResult.data?.currentLevel || "aal1";
  const nextLevel = aalResult.data?.nextLevel || "aal1";
  return {
    profile,
    memberships,
    activeMembership,
    user: {
      id: authUser.id,
      name: profile.display_name,
      email: profile.email || authUser.email,
      role: activeMembership.role,
      active: profile.active,
      organizationId: activeMembership.organization_id,
      organizationName: activeMembership.organizations?.name,
      workspaceKind: activeMembership.organizations?.workspace_kind,
      memberships: memberships.map((item) => ({
        organizationId: item.organization_id,
        organizationName: item.organizations?.name,
        workspaceKind: item.organizations?.workspace_kind,
        role: item.role,
      })),
      mfaCurrentLevel: currentLevel,
      mfaNextLevel: nextLevel,
      mfaEnrolled: nextLevel === "aal2",
      mfaRequired: activeMembership.role === "admin_manager" && nextLevel === "aal2" && currentLevel !== "aal2",
    },
  };
}

async function getPortalSession(request, response) {
  const cookies = parseCookies(request);
  let accessToken = cookies[ACCESS_COOKIE];
  const refreshToken = cookies[REFRESH_COOKIE];
  if (!accessToken && !refreshToken) return null;

  let authClient = createPublicClient();
  let userResult = accessToken ? await authClient.auth.getUser(accessToken) : { data: {}, error: new Error("Missing access token") };
  if (userResult.error && refreshToken) {
    const refreshed = await authClient.auth.setSession({ access_token: accessToken || "", refresh_token: refreshToken });
    if (refreshed.error || !refreshed.data.session) return null;
    setAuthCookies(request, response, refreshed.data.session);
    accessToken = refreshed.data.session.access_token;
    userResult = { data: { user: refreshed.data.user }, error: null };
  }
  const authUser = userResult.data?.user;
  if (!authUser || !accessToken) return null;

  const requestedOrganization = cookies[WORKSPACE_COOKIE];
  const identity = await buildPortalIdentity(accessToken, authUser, requestedOrganization, refreshToken);
  if (!identity) return null;
  const { profile, memberships, activeMembership, user } = identity;
  if (requestedOrganization !== activeMembership.organization_id) {
    setWorkspaceCookie(request, response, activeMembership.organization_id);
  }

  return {
    accessToken,
    authUser,
    profile,
    membership: activeMembership,
    user,
  };
}

module.exports = {
  buildPortalIdentity,
  clearAuthCookies,
  getPortalSession,
  isSameOrigin,
  parseCookies,
  setAuthCookies,
  setWorkspaceCookie,
};
