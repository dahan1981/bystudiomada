const test = require("node:test");
const assert = require("node:assert/strict");
const { buildNotificationEmail } = require("../../lib/portal-email");

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
