const test = require("node:test");
const assert = require("node:assert/strict");
const { assertNotificationEncoding, buildNotificationEmail } = require("../../lib/portal-email");

test("builds a branded and safe Portal Mada notification email", () => {
  const email = buildNotificationEmail({
    recipient_name: "Nina <Gestora>",
    recipient_email: "nina@example.com",
    title: "Nova oportunidade cadastrada",
    message: "A oportunidade de Cliente & Marca foi cadastrada.",
    kind: "opportunity",
    organization_name: "Mada Operação",
    notification_created_at: "2026-07-15T18:30:00.000Z",
  });

  assert.equal(email.subject, "[Portal Mada] Nova oportunidade cadastrada");
  assert.match(email.html, /MADA/);
  assert.match(email.html, /Abrir Portal Mada/);
  assert.match(email.html, /Nina &lt;Gestora&gt;/);
  assert.match(email.html, /Cliente &amp; Marca/);
  assert.doesNotMatch(email.html, /Nina <Gestora>/);
  assert.match(email.text, /https:\/\/bystudiomada\.vercel\.app\/portal-mada\//);
  assert.match(email.text, /Mada Operação/);
});

test("preserves Portuguese special characters and blocks corrupted text", () => {
  const email = buildNotificationEmail({
    recipient_name: "João Dahan",
    title: "Notificações por e-mail ativadas",
    message: "O Portal Mada também envia aprovações e comissões.",
    kind: "info",
    organization_name: "Mada Operação",
    notification_created_at: "2026-07-15T18:30:00.000Z",
  });

  assert.match(email.html, /Notificações por e-mail ativadas/);
  assert.match(email.html, /também envia aprovações e comissões/);
  assert.match(email.text, /João Dahan/);
  assert.doesNotMatch(email.html, /Notifica\?\?es|tamb\?m|comiss\?es/);
  assert.throws(
    () => assertNotificationEncoding("Notifica??es por e-mail"),
    /caracteres inválidos/,
  );
});
