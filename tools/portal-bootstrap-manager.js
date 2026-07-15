const readline = require("readline");
const { Pool } = require("pg");
const { createAdminClient } = require("../lib/supabase-server");

async function readConfig() {
  if (!process.argv.includes("--config-stdin")) return {};
  const input = readline.createInterface({ input: process.stdin, terminal: false });
  return new Promise((resolve, reject) => {
    input.once("line", (line) => {
      input.close();
      try {
        resolve(JSON.parse(line));
      } catch {
        reject(new Error("Invalid JSON received through stdin"));
      }
    });
  });
}

function managerAccounts(config) {
  const configured = config.managerAccounts || process.env.PORTAL_MANAGER_ACCOUNTS_JSON;
  const accounts = typeof configured === "string" ? JSON.parse(configured) : configured;
  const values = Array.isArray(accounts) && accounts.length ? accounts : [{
    email: process.env.PORTAL_MANAGER_EMAIL || "gestor@bystudiomada.com.br",
    name: process.env.PORTAL_MANAGER_NAME || "Gestor Mada",
  }];
  return values.map((account) => {
    const email = String(account.email || "").trim().toLowerCase();
    const name = String(account.name || "").trim();
    const password = String(account.password || "");
    if (!email || !name) throw new Error("Every manager must have name and email");
    if (password && password.length < 8) throw new Error(`Password is too short for ${email}`);
    return { email, name, password };
  });
}

async function upsertAuthManagers(admin, accounts, redirectTo) {
  const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listed.error) throw listed.error;
  const usersByEmail = new Map(listed.data.users.map((user) => [user.email?.toLowerCase(), user]));
  const managers = [];

  for (const account of accounts) {
    let user = usersByEmail.get(account.email);
    let created = false;
    let invitationSent = false;
    if (!user && account.password) {
      const createdUser = await admin.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: { display_name: account.name },
      });
      if (createdUser.error || !createdUser.data.user) throw createdUser.error || new Error("Manager creation failed");
      user = createdUser.data.user;
      created = true;
    } else if (!user) {
      const invitation = await admin.auth.admin.inviteUserByEmail(account.email, {
        data: { display_name: account.name },
        redirectTo,
      });
      if (invitation.error || !invitation.data.user) throw invitation.error || new Error("Manager invite failed");
      user = invitation.data.user;
      created = true;
      invitationSent = true;
    } else {
      const attributes = {
        user_metadata: { ...(user.user_metadata || {}), display_name: account.name },
        ban_duration: "none",
        ...(account.password ? { password: account.password, email_confirm: true } : {}),
      };
      const updated = await admin.auth.admin.updateUserById(user.id, attributes);
      if (updated.error || !updated.data.user) throw updated.error || new Error("Manager update failed");
      user = updated.data.user;
    }
    managers.push({ user, account, created, invitationSent });
  }
  return managers;
}

async function main() {
  const config = await readConfig();
  if (config.databaseUrl) process.env.DATABASE_URL = config.databaseUrl;
  if (config.secretKey) process.env.SUPABASE_SECRET_KEY = config.secretKey;
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!process.env.SUPABASE_SECRET_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SECRET_KEY is required");
  }

  const accounts = managerAccounts(config);
  const redirectTo = String(config.redirectUrl || process.env.PORTAL_REDIRECT_URL || "https://bystudiomada.vercel.app/portal-mada/");
  const admin = createAdminClient();
  const managers = await upsertAuthManagers(admin, accounts, redirectTo);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("begin");
    for (const manager of managers) {
      await client.query(`
        insert into public.profiles (user_id, display_name, email, active)
        values ($1,$2,$3,true)
        on conflict (user_id) do update set display_name = excluded.display_name, email = excluded.email, active = true
      `, [manager.user.id, manager.account.name, manager.account.email]);
      await client.query(`
        insert into public.organization_members (organization_id, user_id, role, active)
        select id, $1, 'admin_manager', true from public.organizations where slug in ('mada-operacao', 'mada-treinamento')
        on conflict (organization_id, user_id) do update set role = 'admin_manager', active = true
      `, [manager.user.id]);
      await client.query(`
        update public.opportunities opportunity
        set sdr_user_id = $1
        where opportunity.legacy_sdr_id in (
          select legacy_id from private.portal_legacy_users where lower(email) = lower($2) and role = 'admin_manager'
        )
      `, [manager.user.id, manager.account.email]);
    }
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }

  process.stdout.write(JSON.stringify({
    managers: managers.map(({ user, account, created, invitationSent }) => ({
      userId: user.id,
      email: account.email,
      created,
      invitationSent,
    })),
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
