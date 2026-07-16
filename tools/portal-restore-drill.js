const fs = require("fs");
const crypto = require("crypto");
const { Pool } = require("pg");

const filename = process.argv[2];
if (!filename) throw new Error("Informe o caminho do backup JSON.");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const backup = JSON.parse(fs.readFileSync(filename, "utf8"));
const expectedHash = backup.sha256;
const copy = { ...backup };
delete copy.sha256;
const actualHash = crypto.createHash("sha256").update(JSON.stringify(copy)).digest("hex");
if (expectedHash !== actualHash) throw new Error("Checksum do backup inválido.");

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });

async function main() {
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("create temp table portal_restore_drill (table_name text, row_count integer, primary key (table_name)) on commit drop");
    for (const [table, rows] of Object.entries(backup.relational || {})) {
      await client.query("insert into portal_restore_drill values ($1,$2)", [table, Array.isArray(rows) ? rows.length : 0]);
    }
    const totals = await client.query("select sum(row_count)::int as rows from portal_restore_drill");
    await client.query("rollback");
    process.stdout.write(JSON.stringify({ ok: true, checksum: actualHash, relationalTables: Object.keys(backup.relational || {}).length, relationalRows: totals.rows[0].rows, storageComplete: Boolean(backup.storageBackup?.complete) }, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
