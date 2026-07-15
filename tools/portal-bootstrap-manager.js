const { createAdminClient } = require("../lib/supabase-server");
const { Pool } = require("pg");

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
  const email = String(process.env.PORTAL_MANAGER_EMAIL || "gestor@bystudiomada.com.br").trim().toLowerCase();
  const name = String(process.env.PORTAL_MANAGER_NAME || "Joao Dahan").trim();
  const redirectTo = String(process.env.PORTAL_REDIRECT_URL || "https://bystudiomada.vercel.app/portal-mada/");
  const admin = createAdminClient();
  const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listed.error) throw listed.error;
  let user = listed.data.users.find((item) => item.email?.toLowerCase() === email);
  let invitationSent = false;
  if (!user) {
    const invitation = await admin.auth.admin.inviteUserByEmail(email, { data: { display_name: name }, redirectTo });
    if (invitation.error || !invitation.data.user) throw invitation.error || new Error("Manager invite failed");
    user = invitation.data.user;
    invitationSent = true;
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(`
      insert into public.profiles (user_id, display_name, email, active)
      values ($1,$2,$3,true)
      on conflict (user_id) do update set display_name = excluded.display_name, email = excluded.email, active = true
    `, [user.id, name, email]);
    await client.query(`
      insert into public.organization_members (organization_id, user_id, role, active)
      select id, $1, 'admin_manager', true from public.organizations where slug in ('mada-operacao', 'mada-treinamento')
      on conflict (organization_id, user_id) do update set role = 'admin_manager', active = true
    `, [user.id]);
    await client.query(`
      update public.opportunities opportunity
      set sdr_user_id = $1
      where opportunity.legacy_sdr_id in (
        select legacy_id from private.portal_legacy_users where lower(email) = lower($2) and role = 'admin_manager'
      )
    `, [user.id, email]);
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
  process.stdout.write(JSON.stringify({ userId: user.id, email, invitationSent }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
