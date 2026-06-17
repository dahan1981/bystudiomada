const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contato@bystudiomada.com.br";
const CONTACT_COPY_EMAIL = "equipeninastoll@gmail.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Studio Madá <onboarding@resend.dev>";
const SITE_URL = (process.env.SITE_URL || "https://bystudiomada.vercel.app").replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/Logos/completo%20preto%20e%20branco.jpeg`;

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

  const { name, email, phone, message, interests, company } = request.body || {};

  if (company) {
    return sendJson(response, 200, { ok: true });
  }

  if (!name || !email || !phone || !message || !Array.isArray(interests) || !interests.length) {
    return sendJson(response, 400, { error: "Preencha nome, email, celular, interesse e mensagem." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return sendJson(response, 400, { error: "Informe um email válido." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeInterests = interests.map(escapeHtml).join(", ");

  try {
    await sendEmail({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL, CONTACT_COPY_EMAIL],
      reply_to: email,
      subject: `Novo contato Studio Madá - ${name}`,
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
        `Nome: ${name}`,
        `Email: ${email}`,
        `Celular: ${phone}`,
        `Estou procurando por: ${interests.join(", ")}`,
        `Mensagem: ${message}`,
      ].join("\n"),
    });

    await sendEmail({
      from: CONTACT_FROM_EMAIL,
      to: [email],
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
                        <p style="margin: 0; font-size: 14px; line-height: 1.6;"><strong>Studio Madá</strong><br />Branding, conteúdo e presença digital</p>
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
        `Oi, ${name}.`,
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
