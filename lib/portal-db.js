const { Pool } = require("pg");

const STATE_ID = "portal-mada-main";

let pool;
let schemaReady = false;

function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function ensureSchema(client) {
  if (schemaReady) return;
  await client.query(`
    create table if not exists public.portal_state (
      id text primary key,
      data jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    );

    create table if not exists public.portal_attachments (
      id text primary key,
      filename text not null,
      mime_type text not null,
      size_bytes integer not null,
      data bytea not null,
      metadata jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now()
    );

    alter table public.portal_state enable row level security;
    alter table public.portal_attachments enable row level security;
    revoke all on public.portal_state from anon, authenticated;
    revoke all on public.portal_attachments from anon, authenticated;
  `);
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

async function ensureStateRow(client) {
  await client.query(
    "insert into public.portal_state (id, data) values ($1, '{}'::jsonb) on conflict (id) do nothing",
    [STATE_ID],
  );
}

async function readState(client) {
  const result = await client.query(
    "select data, updated_at from public.portal_state where id = $1",
    [STATE_ID],
  );
  return result.rows[0] || null;
}

async function writeState(client, data) {
  const result = await client.query(
    `
      insert into public.portal_state (id, data, updated_at)
      values ($1, $2::jsonb, now())
      on conflict (id)
      do update set data = excluded.data, updated_at = now()
      returning data, updated_at
    `,
    [STATE_ID, JSON.stringify(data || {})],
  );
  return result.rows[0];
}

async function updateState(mutator) {
  return withClient(async (client) => {
    await client.query("begin");
    try {
      await ensureStateRow(client);
      const result = await client.query(
        "select data, updated_at from public.portal_state where id = $1 for update",
        [STATE_ID],
      );
      const current = result.rows[0]?.data || {};
      const next = await mutator(current, result.rows[0]?.updated_at || null);
      const row = await writeState(client, next);
      await client.query("commit");
      return row;
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  });
}

module.exports = {
  STATE_ID,
  ensureSchema,
  readState,
  updateState,
  withClient,
  writeState,
};
