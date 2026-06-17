const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contato@bystudiomada.com.br";
const CONTACT_COPY_EMAIL = "equipeninastoll@gmail.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Studio Madá <onboarding@resend.dev>";
const SITE_URL = (process.env.SITE_URL || "https://bystudiomada.vercel.app").replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/Logos/completo%20preto%20e%20branco.jpeg`;
const MIN_FORM_TIME_MS = 3500;
const MAX_FORM_TIME_MS = 1000 * 60 * 60 * 2;
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 15;
const RATE_LIMIT_MAX = 5;
const MAX_FIELD_LENGTHS = {
  name: 90,
  email: 160,
  phone: 40,
  message: 1600,
};
const ALLOWED_HOSTS = new Set([
  "bystudiomada.com.br",
  "www.bystudiomada.com.br",
  "bystudiomada.vercel.app",
]);
const ALLOWED_INTERESTS = new Set([
  "Estruturação de perfil",
  "Planejamento de conteúdo",
  "Sites, apps e sistemas",
  "Ações e eventos",
  "Design gráfico",
  "Consultoria de marca",
]);
const rateLimitBuckets = globalThis.__studioMadaRateLimitBuckets || new Map();
globalThis.__studioMadaRateLimitBuckets = rateLimitBuckets;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}

function getRequestIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.socket?.remoteAddress || "unknown";
}

function isAllowedOrigin(request) {
  const origin = request.headers.origin;
  const referer = request.headers.referer;

  for (const value of [origin, referer]) {
    if (!value) continue;

    try {
      const host = new URL(value).hostname;
      if (!ALLOWED_HOSTS.has(host)) return false;
    } catch {
      return false;
    }
  }

  return true;
}

function isRateLimited(request) {
  const ip = getRequestIp(request);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  bucket.count += 1;
  rateLimitBuckets.set(ip, bucket);

  for (const [key, value] of rateLimitBuckets) {
    if (value.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }

  return bucket.count > RATE_LIMIT_MAX;
}

function hasSuspiciousContent(value) {
  const text = String(value || "");
  const linkMatches = text.match(/https?:\/\/|www\.|\.com\b|\.ru\b|\.cn\b|\.top\b/gi) || [];
  const repeatedChars = /(.)\1{8,}/.test(text);
  const htmlTags = /<[^>]+>/.test(text);

  return linkMatches.length > 2 || repeatedChars || htmlTags;
}

function hasValidFormTiming(formStartedAt) {
  const startedAt = Number(formStartedAt);
  const now = Date.now();

  if (!Number.isFinite(startedAt)) return false;
  if (startedAt > now) return false;

  const elapsed = now - startedAt;
  return elapsed >= MIN_FORM_TIME_MS && elapsed <= MAX_FORM_TIME_MS;
}

function normalizeInterests(interests) {
  if (!Array.isArray(interests)) return [];
  return [...new Set(interests.map((interest) => String(interest || "").trim()).filter(Boolean))];
}

async function sendEmail(payload) {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const resendResult = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    throw new Error(resendResult.message || "Não foi possível enviar o email agora.");
  }

  return resendResult;
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Método não permitido." });
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(response, 503, {
      error: "Envio de email ainda não configurado. Defina RESEND_API_KEY na Vercel.",
    });
  }

  if (!isAllowedOrigin(request)) {
    return sendJson(response, 403, { error: "Origem do envio não permitida." });
  }

  const { name, email, phone, message, interests, company, formStartedAt } = request.body || {};

  if (company) {
    return sendJson(response, 200, { ok: true });
  }

  const safeInterestList = normalizeInterests(interests);
  const normalizedName = String(name || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPhone = String(phone || "").trim();
  const normalizedMessage = String(message || "").trim();

  if (
    !normalizedName ||
    !normalizedEmail ||
    !normalizedPhone ||
    !normalizedMessage ||
    !safeInterestList.length
  ) {
    return sendJson(response, 400, { error: "Preencha nome, email, celular, interesse e mensagem." });
  }

  if (!hasValidFormTiming(formStartedAt)) {
    return sendJson(response, 400, {
      error: "Aguarde alguns segundos antes de enviar o formulário.",
    });
  }

  if (
    normalizedName.length > MAX_FIELD_LENGTHS.name ||
    normalizedEmail.length > MAX_FIELD_LENGTHS.email ||
    normalizedPhone.length > MAX_FIELD_LENGTHS.phone ||
    normalizedMessage.length > MAX_FIELD_LENGTHS.message
  ) {
    return sendJson(response, 400, { error: "Revise o tamanho das informações enviadas." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return sendJson(response, 400, { error: "Informe um email válido." });
  }

  if (!/^[+\d\s().-]{8,40}$/.test(normalizedPhone)) {
    return sendJson(response, 400, { error: "Informe um celular válido." });
  }

  if (safeInterestList.some((interest) => !ALLOWED_INTERESTS.has(interest))) {
    return sendJson(response, 400, { error: "Selecione uma opção válida em Estou procurando." });
  }

  if (
    hasSuspiciousContent(normalizedName) ||
    hasSuspiciousContent(normalizedEmail) ||
    hasSuspiciousContent(normalizedPhone) ||
    hasSuspiciousContent(normalizedMessage)
  ) {
    return sendJson(response, 400, { error: "Não foi possível enviar esta mensagem." });
  }

  if (isRateLimited(request)) {
    return sendJson(response, 429, { error: "Muitas tentativas. Tente novamente em alguns minutos." });
  }

  const safeName = escapeHtml(normalizedName);
  const safeEmail = escapeHtml(normalizedEmail);
  const safePhone = escapeHtml(normalizedPhone);
  const safeMessage = escapeHtml(normalizedMessage).replace(/\n/g, "<br />");
  const safeInterests = safeInterestList.map(escapeHtml).join(", ");

  try {
    await sendEmail({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL, CONTACT_COPY_EMAIL],
      reply_to: normalizedEmail,
      subject: `Novo contato Studio Madá - ${normalizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #283e5c; line-height: 1.6; background: #fffbef; padding: 32px;">
          <img src="${LOGO_URL}" alt="Studio Madá" style="display: block; width: 160px; max-width: 100%; margin: 0 0 28px;" />
          <h1 style="margin: 0 0 24px; color: #283e5c; font-size: 28px; line-height: 1.1; text-transform: uppercase;">Novo contato pelo site</h1>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Celular:</strong> ${safePhone}</p>
          <p><strong>Estou procurando por:</strong> ${safeInterests}</p>
          <p><strong>Mensagem:</strong><br />${safeMessage}</p>
        </div>
      `,
      text: [
        "Novo contato pelo site Studio Madá",
        `Nome: ${normalizedName}`,
        `Email: ${normalizedEmail}`,
        `Celular: ${normalizedPhone}`,
        `Estou procurando por: ${safeInterestList.join(", ")}`,
        `Mensagem: ${normalizedMessage}`,
      ].join("\n"),
    });

    await sendEmail({
      from: CONTACT_FROM_EMAIL,
      to: [normalizedEmail],
      reply_to: CONTACT_TO_EMAIL,
      subject: "Recebemos seu contato - Studio Madá",
      html: `
        <div style="margin: 0; padding: 0; background: #fffbef;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fffbef; font-family: Arial, sans-serif; color: #3e3e3e;">
            <tr>
              <td align="center" style="padding: 38px 18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; border: 1px solid rgba(40, 62, 92, 0.2); background: #fffbef;">
                  <tr>
                    <td style="padding: 34px 34px 24px; border-bottom: 1px solid rgba(40, 62, 92, 0.18);">
                      <img src="${LOGO_URL}" alt="Studio Madá" style="display: block; width: 170px; max-width: 100%; margin: 0 0 30px;" />
                      <p style="margin: 0 0 10px; color: #283e5c; font-size: 13px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase;">Obrigada pelo contato</p>
                      <h1 style="margin: 0; color: #283e5c; font-size: 36px; line-height: 1.04; letter-spacing: 0; text-transform: uppercase;">Recebemos sua mensagem.</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 34px 36px;">
                      <p style="margin: 0 0 18px; font-size: 17px; line-height: 1.7;">Oi, ${safeName}.</p>
                      <p style="margin: 0 0 18px; font-size: 17px; line-height: 1.7;">Recebemos as informações que você enviou pelo site da Studio Madá. Já vamos olhar tudo com atenção e em breve entraremos em contato com você pelo WhatsApp ou pelo e-mail informado.</p>
                      <p style="margin: 0 0 28px; font-size: 17px; line-height: 1.7;">Enquanto isso, pode ficar tranquila(o): seu pedido chegou por aqui.</p>
                      <div style="padding: 18px 20px; background: #283e5c; color: #fffbef;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.6;"><strong>Studio Madá</strong><br />STUDIO CRIATIVO</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
      text: [
        `Oi, ${normalizedName}.`,
        "",
        "Recebemos as informações que você enviou pelo site da Studio Madá.",
        "Em breve entraremos em contato com você pelo WhatsApp ou pelo e-mail informado.",
        "",
        "Studio Madá",
      ].join("\n"),
    });
  } catch (error) {
    return sendJson(response, 502, {
      error: error.message || "Não foi possível enviar o email agora.",
    });
  }

  return sendJson(response, 200, { ok: true });
};
