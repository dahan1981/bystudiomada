const crypto = require("crypto");

const COOKIE_NAME = "mada_portal_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, passwordSalt, ...safe } = user;
  return {
    ...safe,
    active: user.active !== false,
    hasAccess: Boolean(passwordHash && passwordSalt),
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function validatePassword(password) {
  const value = String(password || "");
  if (value.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
  return value;
}

function hashPassword(password) {
  const value = validatePassword(password);
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(value, salt, 64).toString("hex");
  return { passwordSalt: salt, passwordHash: hash };
}

function verifyPassword(password, user) {
  if (!user?.passwordSalt || !user?.passwordHash) return false;
  const candidate = crypto.scryptSync(String(password || ""), user.passwordSalt, 64);
  const expected = Buffer.from(user.passwordHash, "hex");
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

function sessionSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET || process.env.DATABASE_URL;
  if (!secret) throw new Error("Portal session secret is not configured");
  return secret;
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(value) {
  return crypto.createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function createSessionToken(user) {
  const payload = encode(JSON.stringify({
    userId: user.id,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    v: 1,
  }));
  return `${payload}.${sign(payload)}`;
}

function parseCookies(request) {
  return String(request.headers?.cookie || "").split(";").reduce((cookies, part) => {
    const index = part.indexOf("=");
    if (index < 0) return cookies;
    cookies[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1).trim());
    return cookies;
  }, {});
}

function verifySessionToken(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.userId || Number(data.exp) <= Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

function getSessionUser(request, state) {
  const token = parseCookies(request)[COOKIE_NAME];
  const session = verifySessionToken(token);
  if (!session) return null;
  const user = (state.users || []).find((item) => item.id === session.userId);
  return user && user.active !== false ? user : null;
}

function cookieSecurity(request) {
  return request.headers?.["x-forwarded-proto"] === "https" || Boolean(process.env.VERCEL);
}

function setSessionCookie(request, response, user) {
  const secure = cookieSecurity(request) ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(createSessionToken(user))}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`,
  );
}

function clearSessionCookie(request, response) {
  const secure = cookieSecurity(request) ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
  );
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

module.exports = {
  clearSessionCookie,
  getSessionUser,
  hashPassword,
  isSameOrigin,
  normalizeEmail,
  publicUser,
  setSessionCookie,
  validatePassword,
  verifyPassword,
};
