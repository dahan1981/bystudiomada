const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contato@bystudiomada.com.br";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Studio Madá <onboarding@resend.dev>";

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

  const { name, email, message, interests, company } = request.body || {};

  if (company) {
    return sendJson(response, 200, { ok: true });
  }

  if (!name || !email || !message || !Array.isArray(interests) || !interests.length) {
    return sendJson(response, 400, { error: "Preencha nome, email, interesse e mensagem." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return sendJson(response, 400, { error: "Informe um email válido." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeInterests = interests.map(escapeHtml).join(", ");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Novo contato Studio Madá - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #283e5c; line-height: 1.6;">
          <h1 style="margin: 0 0 24px;">Novo contato pelo site</h1>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Estou procurando por:</strong> ${safeInterests}</p>
          <p><strong>Mensagem:</strong><br />${safeMessage}</p>
        </div>
      `,
      text: [
        "Novo contato pelo site Studio Madá",
        `Nome: ${name}`,
        `Email: ${email}`,
        `Estou procurando por: ${interests.join(", ")}`,
        `Mensagem: ${message}`,
      ].join("\n"),
    }),
  });

  const resendResult = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    return sendJson(response, 502, {
      error: resendResult.message || "Não foi possível enviar o email agora.",
    });
  }

  return sendJson(response, 200, { ok: true });
};
