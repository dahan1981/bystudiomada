const test = require("node:test");
const assert = require("node:assert/strict");
const { Pool } = require("pg");

test("production schema, RLS and private bucket are installed", { skip: !process.env.DATABASE_URL }, async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  try {
    const migrations = await pool.query("select count(*)::int as count from private.portal_migrations");
    assert(migrations.rows[0].count >= 5);
    const organizations = await pool.query("select slug, workspace_kind from public.organizations order by slug");
    assert.deepEqual(organizations.rows.map((row) => row.slug), ["mada-operacao", "mada-treinamento"]);
    const rls = await pool.query(`
      select relname, relrowsecurity from pg_class
      where relnamespace = 'public'::regnamespace and relname = any($1::text[])
    `, [["opportunities", "contracts", "customer_payments", "commissions", "projects", "files", "audit_logs"]]);
    assert.equal(rls.rows.length, 7);
    assert(rls.rows.every((row) => row.relrowsecurity));
    const bucket = await pool.query("select public, file_size_limit from storage.buckets where id = 'portal-documents'");
    assert.equal(bucket.rows[0].public, false);
    assert.equal(Number(bucket.rows[0].file_size_limit), 10 * 1024 * 1024);
    const imported = await pool.query("select count(*)::int as count from public.opportunities where legacy_id is not null");
    assert.equal(imported.rows[0].count, 2);
    const paymentContractColumn = await pool.query(`
      select is_nullable from information_schema.columns
      where table_schema = 'public' and table_name = 'customer_payments' and column_name = 'contract_id'
    `);
    assert.equal(paymentContractColumn.rows[0].is_nullable, "YES");
  } finally {
    await pool.end();
  }
});
