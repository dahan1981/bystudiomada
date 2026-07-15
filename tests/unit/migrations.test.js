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
});
