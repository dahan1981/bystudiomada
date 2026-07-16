const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

test("all portal tables enable RLS and Storage remains private", () => {
  const directory = path.resolve("supabase", "migrations");
  const sql = fs.readdirSync(directory).sort().map((file) => fs.readFileSync(path.join(directory, file), "utf8")).join("\n");
  for (const table of ["organizations", "profiles", "organization_members", "opportunities", "contracts", "customer_payments", "commissions", "projects", "files", "audit_logs"]) {
    assert(sql.includes(`alter table public.${table} enable row level security`), `${table} must enable RLS`);
  }
  assert(sql.includes("'portal-documents'"));
  assert(sql.includes("false,\n  10485760"));
  assert(sql.includes("with check"));
  assert(sql.includes("alter column contract_id drop not null"), "manual payments must allow an optional CRM contract");
  assert(sql.includes("portal_guard_terminal_rejection"), "rejected opportunities must have a terminal database guard");
  assert(sql.includes("Uma oportunidade recusada pelo gestor nao pode ser alterada ou restaurada"));
  assert(sql.includes("private.notification_email_deliveries"), "notification email deliveries must use a private outbox");
  assert(sql.includes("portal_enrich_notification"), "approval notifications must be enriched with business context");
  assert(sql.includes("portal_enqueue_notification_email"), "new notifications must enqueue email deliveries");
  assert(sql.includes("unique (notification_id, recipient_user_id)"), "notification emails must be idempotent per recipient");
});
