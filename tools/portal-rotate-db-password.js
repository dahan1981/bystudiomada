const { Pool } = require("pg");

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!process.env.NEW_DATABASE_PASSWORD || process.env.NEW_DATABASE_PASSWORD.length < 32) {
    throw new Error("NEW_DATABASE_PASSWORD must contain at least 32 characters");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  const client = await pool.connect();
  try {
    const identity = await client.query("select current_user");
    if (identity.rows[0]?.current_user !== "postgres") throw new Error("Expected postgres database owner");
    const escaped = process.env.NEW_DATABASE_PASSWORD.replaceAll("'", "''");
    try {
      await client.query(`alter role postgres with password '${escaped}'`);
    } catch (error) {
      const message = String(error?.message || "");
      if (/permission denied|must be superuser|not permitted/i.test(message)) {
        throw new Error("O Supabase Pooler recusou ALTER ROLE. Rotacione a senha pelo painel ou Management API do Supabase e atualize DATABASE_URL na Vercel.");
      }
      throw error;
    }
    process.stdout.write("Database password rotated");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
