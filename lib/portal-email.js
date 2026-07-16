const { withClient } = require("./portal-db");

const PORTAL_URL = process.env.PORTAL_BASE_URL || "https://bystudiomada.vercel.app/portal-mada/";
const DEFAULT_FROM = "Portal Mada <onboarding@resend.dev>";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNotificationDate(value) {
  const date = value ? new Date(value) : new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function notificationKindLabel(kind) {
  return ({
    approval: "Aprovação comercial",
    opportunity: "Oportunidade",
    progress: "Andamento",
    project: "Projeto",
    payment: "Pagamento",
    commission: "Comissão",
    file: "Arquivo",
    info: "Atualização",
  })[kind] || "Atualização";
}

function buildNotificationEmail(delivery) {
  const recipientName = delivery.recipient_name || "equipe Mada";
  const title = delivery.title || "Nova atualização no Portal Mada";
  const message = delivery.message || "Há uma nova movimentação aguardando sua atenção no portal.";
  const organizationName = delivery.organization_name || "Mada";
  const kindLabel = notificationKindLabel(delivery.kind);
  const eventDate = formatNotificationDate(delivery.notification_created_at);
  const subject = `[Portal Mada] ${title}`;
  const text = [
    `Olá, ${recipientName}.`,
    "",
    title,
    message,
    "",
    `${kindLabel} · ${organizationName}`,
    eventDate,
    "",
    `Acesse o Portal Mada: ${PORTAL_URL}`,
    "",
    "Este é um e-mail automático de acompanhamento do CRM Mada.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f5f8;color:#17181b;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none!important;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(message)}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f5f8;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e3e5ea;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#111214;padding:22px 28px;">
                <div style="color:#ffffff;font-size:19px;font-weight:800;letter-spacing:1.5px;">MADA</div>
                <div style="margin-top:4px;color:#aeb2bd;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Portal Comercial</div>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 28px 30px;">
                <div style="display:inline-block;padding:7px 10px;border-radius:4px;background:#efedff;color:#5548e7;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">${escapeHtml(kindLabel)}</div>
                <p style="margin:24px 0 8px;color:#676b76;font-size:14px;line-height:1.6;">Olá, ${escapeHtml(recipientName)}.</p>
                <h1 style="margin:0;color:#17181b;font-size:25px;line-height:1.28;font-weight:750;letter-spacing:0;">${escapeHtml(title)}</h1>
                <p style="margin:16px 0 0;color:#444854;font-size:15px;line-height:1.7;">${escapeHtml(message)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0;background:#f7f7fa;border:1px solid #e7e8ed;border-radius:6px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="color:#747986;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Ambiente</div>
                      <div style="margin-top:5px;color:#23252b;font-size:13px;font-weight:700;">${escapeHtml(organizationName)}</div>
                    </td>
                    <td style="padding:16px 18px;border-left:1px solid #e7e8ed;">
                      <div style="color:#747986;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Registrado em</div>
                      <div style="margin-top:5px;color:#23252b;font-size:13px;font-weight:700;">${escapeHtml(eventDate)}</div>
                    </td>
                  </tr>
                </table>
                <a href="${escapeHtml(PORTAL_URL)}" style="display:inline-block;padding:13px 20px;border-radius:5px;background:#6557ff;color:#ffffff;text-decoration:none;font-size:14px;font-weight:750;">Abrir Portal Mada</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #eceef2;padding:18px 28px;color:#858995;font-size:11px;line-height:1.6;">
                Este e-mail foi enviado automaticamente porque esta movimentação está relacionada à sua conta no CRM Mada. Nenhuma ação financeira é realizada por e-mail.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

function emailSender() {
  return process.env.PORTAL_NOTIFICATION_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
}

async function sendNotificationEmail(delivery) {
  const email = buildNotificationEmail(delivery);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `portal-notification/${delivery.id}`,
    },
    body: JSON.stringify({
      from: emailSender(),
      to: [delivery.recipient_email],
      subject: email.subject,
      html: email.html,
      text: email.text,
      tags: [
        { name: "source", value: "portal_mada" },
        { name: "kind", value: String(delivery.kind || "info").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256) },
      ],
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Resend respondeu com status ${response.status}`);
  return payload;
}

async function claimPendingDeliveries(organizationId, limit) {
  return withClient(async (client) => {
    const result = await client.query(`
      with candidates as (
        select delivery.id
        from private.notification_email_deliveries delivery
        where delivery.organization_id = $1
          and delivery.attempt_count < 5
          and delivery.next_attempt_at <= now()
          and (
            delivery.status in ('pending', 'failed')
            or (delivery.status = 'processing' and delivery.locked_at < now() - interval '10 minutes')
          )
        order by delivery.created_at
        limit $2
        for update skip locked
      ), claimed as (
        update private.notification_email_deliveries delivery
        set status = 'processing', locked_at = now(), attempt_count = delivery.attempt_count + 1, updated_at = now()
        from candidates
        where delivery.id = candidates.id
        returning delivery.*
      )
      select claimed.*, notification.kind, notification.title, notification.message,
        notification.entity_type, notification.entity_id, notification.created_at as notification_created_at,
        profile.display_name as recipient_name, organization.name as organization_name
      from claimed
      join public.notifications notification on notification.id = claimed.notification_id
      join public.profiles profile on profile.user_id = claimed.recipient_user_id
      join public.organizations organization on organization.id = claimed.organization_id
      order by claimed.created_at
    `, [organizationId, limit]);
    return result.rows;
  });
}

async function markDeliverySent(deliveryId, providerMessageId) {
  return withClient((client) => client.query(`
    update private.notification_email_deliveries
    set status = 'sent', provider_message_id = $2, sent_at = now(), locked_at = null,
      last_error = null, updated_at = now()
    where id = $1
  `, [deliveryId, providerMessageId || null]));
}

async function markDeliveryFailed(deliveryId, error) {
  const message = String(error?.message || error || "Falha desconhecida").slice(0, 1000);
  return withClient((client) => client.query(`
    update private.notification_email_deliveries
    set status = 'failed', last_error = $2, locked_at = null,
      next_attempt_at = now() + make_interval(mins => least(60, power(2, attempt_count)::integer)),
      updated_at = now()
    where id = $1
  `, [deliveryId, message]));
}

async function dispatchPortalNotificationEmails(organizationId, { limit = 12 } = {}) {
  if (!organizationId || !process.env.RESEND_API_KEY) return { sent: 0, failed: 0, skipped: true };
  const deliveries = await claimPendingDeliveries(organizationId, limit);
  let sent = 0;
  let failed = 0;
  for (const delivery of deliveries) {
    try {
      const result = await sendNotificationEmail(delivery);
      await markDeliverySent(delivery.id, result.id);
      sent += 1;
    } catch (error) {
      await markDeliveryFailed(delivery.id, error);
      failed += 1;
      console.error("Portal notification email failed", { deliveryId: delivery.id, message: error.message });
    }
  }
  return { sent, failed, skipped: false };
}

module.exports = {
  buildNotificationEmail,
  dispatchPortalNotificationEmails,
  emailSender,
  sendNotificationEmail,
};
