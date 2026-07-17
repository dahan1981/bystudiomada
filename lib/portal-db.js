const { Pool } = require("pg");

let pool;
let schemaReady = false;

function getPool() {
  if (!process.env.DATABASE_URL) {
    const error = new Error("DATABASE_URL is not configured");
    error.statusCode = 503;
    throw error;
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function ensureSchema(client) {
  if (schemaReady) return;
  const result = await client.query("select to_regclass('public.organizations') as organizations, to_regclass('public.opportunities') as opportunities");
  if (!result.rows[0]?.organizations || !result.rows[0]?.opportunities) {
    const error = new Error("Portal relational schema is not installed");
    error.statusCode = 503;
    throw error;
  }
  schemaReady = true;
}

async function withClient(callback) {
  const client = await getPool().connect();
  try {
    await ensureSchema(client);
    return await callback(client);
  } finally {
    client.release();
  }
}

module.exports = { getPool, withClient };
