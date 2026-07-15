const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const migrationsDir = path.resolve("supabase", "migrations");
  const filenames = fs.readdirSync(migrationsDir).filter((name) => name.endsWith(".sql")).sort();
  const dryRun = process.argv.includes("--dry-run");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("create schema if not exists private");
    await client.query(`
      create table if not exists private.portal_migrations (
        version text primary key,
        filename text not null,
        checksum text not null,
        applied_at timestamptz not null default now()
      )
    `);
    const appliedResult = await client.query("select version, checksum from private.portal_migrations");
    const applied = new Map(appliedResult.rows.map((row) => [row.version, row.checksum]));

    for (const filename of filenames) {
      const version = filename.split("_")[0];
      const sql = fs.readFileSync(path.join(migrationsDir, filename), "utf8");
      const checksum = require("crypto").createHash("sha256").update(sql).digest("hex");
      if (applied.has(version)) {
        if (applied.get(version) !== checksum) throw new Error(`Migration ${version} changed after being applied`);
        process.stdout.write(`skip ${filename}\n`);
        continue;
      }
      if (dryRun) {
        process.stdout.write(`pending ${filename}\n`);
        continue;
      }
      process.stdout.write(`apply ${filename}\n`);
      await client.query("begin");
      try {
        await client.query(sql);
        await client.query(
          "insert into private.portal_migrations (version, filename, checksum) values ($1, $2, $3)",
          [version, filename, checksum],
        );
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
