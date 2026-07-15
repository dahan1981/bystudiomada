const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const { createAdminClient } = require("../lib/supabase-server");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function loadEnvFile(filename) {
  if (!filename) return;
  const content = fs.readFileSync(filename, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) return;
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1);
      }
    }
    process.env[match[1]] = value;
  });
}

async function tableExists(client, table) {
  const result = await client.query("select to_regclass($1) is not null as present", [`public.${table}`]);
  return result.rows[0].present;
}

async function readRows(client, table) {
  if (!await tableExists(client, table)) return [];
  const result = await client.query(`select * from public.${table}`);
  return result.rows;
}

function storageFilename(name) {
  const digest = crypto.createHash("sha256").update(name).digest("hex").slice(0, 16);
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120) || "arquivo";
  return `${digest}-${base}`;
}

async function main() {
  loadEnvFile(argument("--env-file"));
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

  const outputDir = path.resolve(argument("--output") || path.join(".private", "backups"));
  fs.mkdirSync(outputDir, { recursive: true });

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  const client = await pool.connect();
  try {
    const stateRows = await readRows(client, "portal_state");
    const attachmentRows = await readRows(client, "portal_attachments");
    const relationalTables = [
      "organizations", "profiles", "organization_members", "services", "opportunities",
      "opportunity_services", "approval_requests", "condition_versions", "contracts",
      "customer_payments", "commissions", "payout_batches", "payout_batch_items",
      "projects", "project_stages", "files", "notifications", "audit_logs",
    ];
    const relational = {};
    for (const table of relationalTables) relational[table] = await readRows(client, table);
    const storageInventory = await client.query(`
      select id, bucket_id, name, owner_id, metadata, created_at, updated_at, last_accessed_at
      from storage.objects where bucket_id = 'portal-documents' order by name
    `);
    const backupStamp = new Date().toISOString().replace(/[:.]/g, "-");
    const storageDir = path.join(outputDir, `portal-mada-${backupStamp}.storage`);
    const requireStorage = process.argv.includes("--require-storage");
    const storageFiles = [];
    if (storageInventory.rows.length && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      if (requireStorage) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to back up private Storage objects");
    } else if (storageInventory.rows.length) {
      const admin = createAdminClient();
      fs.mkdirSync(storageDir, { recursive: true, mode: 0o700 });
      for (const object of storageInventory.rows) {
        const downloaded = await admin.storage.from("portal-documents").download(object.name);
        if (downloaded.error) throw downloaded.error;
        const target = storageFilename(object.name);
        const buffer = Buffer.from(await downloaded.data.arrayBuffer());
        fs.writeFileSync(path.join(storageDir, target), buffer, { mode: 0o600 });
        storageFiles.push({
          name: object.name,
          file: path.join(path.basename(storageDir), target),
          sizeBytes: buffer.length,
          sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
        });
      }
    }
    const normalizedAttachments = attachmentRows.map((row) => ({
      ...row,
      data: Buffer.isBuffer(row.data) ? row.data.toString("base64") : row.data,
    }));
    const state = stateRows.find((row) => row.id === "portal-mada-main")?.data || {};
    const totals = {
      users: state.users?.length || 0,
      opportunities: state.opportunities?.length || 0,
      contracts: state.contracts?.length || 0,
      payments: state.payments?.length || 0,
      commissions: state.commissions?.length || 0,
      projects: state.projects?.length || 0,
      files: state.files?.length || 0,
      attachments: normalizedAttachments.length,
      relationalOpportunities: relational.opportunities.length,
      storageObjects: storageInventory.rows.length,
      contractedCents: (state.contracts || []).reduce((sum, item) => sum + Number(item.amountCents || 0), 0),
      receivedCents: (state.payments || []).filter((item) => item.status === "confirmed").reduce((sum, item) => sum + Number(item.amountCents || 0), 0),
      commissionsCents: (state.commissions || []).reduce((sum, item) => sum + Number(item.amountCents || 0), 0),
    };
    const backup = {
      format: "portal-mada-backup-v1",
      createdAt: new Date().toISOString(),
      source: "production",
      totals,
      legacy: {
        portalState: stateRows,
        portalAttachments: normalizedAttachments,
      },
      relational,
      storageInventory: storageInventory.rows,
      storageBackup: {
        bucket: "portal-documents",
        complete: storageFiles.length === storageInventory.rows.length,
        files: storageFiles,
      },
    };
    const serialized = JSON.stringify(backup);
    backup.sha256 = crypto.createHash("sha256").update(serialized).digest("hex");

    const filename = path.join(outputDir, `portal-mada-${backupStamp}.json`);
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2), { mode: 0o600 });
    process.stdout.write(JSON.stringify({ filename, totals, sha256: backup.sha256 }, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
