const { getPortalSession, isSameOrigin } = require("../lib/portal-auth-session");
const { withClient } = require("../lib/portal-db");
const { createAdminClient, createPublicClient } = require("../lib/supabase-server");
const { requireManagerMfa, sendApiError } = require("../lib/portal-http");
const { sendSdrInvitationEmail } = require("../lib/portal-email");

function bodyOf(request) {
  return typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
}

function portalOrigin(request) {
  const host = request.headers?.["x-forwarded-host"] || request.headers?.host;
  const protocol = request.headers?.["x-forwarded-proto"] || (process.env.VERCEL ? "https" : "http");
  return `${protocol}://${host}`;
}

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!isSameOrigin(request)) {
    response.status(403).json({ error: "Invalid request origin" });
    return;
  }

  try {
    const session = await getPortalSession(request, response);
    if (!session || session.user.role !== "admin_manager") {
      response.status(403).json({ error: "Apenas o gestor pode administrar contas." });
      return;
    }
    requireManagerMfa(session);
    const body = bodyOf(request);
    const admin = createAdminClient();

    if (body.action === "invite") {
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      if (!name || !email) {
        response.status(400).json({ error: "Informe nome e e-mail da SDR." });
        return;
      }
      const invitation = await admin.auth.admin.generateLink({
        type: "invite",
        email,
        options: {
          data: { display_name: name },
          redirectTo: `${portalOrigin(request)}/portal-mada/?mode=invite`,
        },
      });
      if (invitation.error || !invitation.data.user || !invitation.data.properties?.action_link) {
        response.status(400).json({ error: invitation.error?.message || "Não foi possível gerar o convite." });
        return;
      }
      const invitedUser = invitation.data.user;
      try {
        await sendSdrInvitationEmail({ recipientName: name, recipientEmail: email, actionLink: invitation.data.properties.action_link });
        await withClient(async (client) => {
          await client.query("begin");
          try {
            await client.query(`
              insert into public.profiles (user_id, display_name, email, active)
              values ($1,$2,$3,true)
              on conflict (user_id) do update set display_name = excluded.display_name, email = excluded.email, active = true
            `, [invitedUser.id, name, email]);
            await client.query(`
              insert into public.organization_members (organization_id, user_id, role, active)
              select id, $1, 'sdr', true from public.organizations where slug in ('mada-operacao', 'mada-treinamento')
              on conflict (organization_id, user_id) do update set role = 'sdr', active = true
            `, [invitedUser.id]);
            await client.query(`
              update public.opportunities opportunity
              set sdr_user_id = $1
              where opportunity.legacy_sdr_id in (
                select legacy_id from private.portal_legacy_users where lower(email) = lower($2)
              )
            `, [invitedUser.id, email]);
            await client.query(`
              insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
              select id, $1, 'user_invited', 'profile', $2, jsonb_build_object('email', $3)
              from public.organizations where slug = 'mada-operacao'
            `, [session.user.id, invitedUser.id, email]);
            await client.query("commit");
          } catch (error) {
            await client.query("rollback");
            throw error;
          }
        });
      } catch (error) {
        await admin.auth.admin.deleteUser(invitedUser.id);
        throw error;
      }
      response.status(201).json({ user: { id: invitedUser.id, name, email, role: "sdr", active: true } });
      return;
    }

    const userId = String(body.userId || "");
    if (!userId) {
      response.status(400).json({ error: "Conta não informada." });
      return;
    }

    const target = await withClient(async (client) => {
      const result = await client.query(`
        select profile.user_id, profile.email, profile.active, membership.role, membership.active as membership_active
        from public.profiles profile
        join public.organization_members membership on membership.user_id = profile.user_id
        where profile.user_id = $1 and membership.organization_id = $2
        limit 1
      `, [userId, session.user.organizationId]);
      return result.rows[0] || null;
    });
    if (!target || target.role !== "sdr") {
      response.status(404).json({ error: "A conta informada não pertence à equipe SDR deste ambiente." });
      return;
    }

    if (body.action === "toggle_active") {
      if (userId === session.user.id) {
        response.status(400).json({ error: "O gestor não pode desativar a própria conta." });
        return;
      }
      const active = body.active !== false;
      const authUpdate = await admin.auth.admin.updateUserById(userId, { ban_duration: active ? "none" : "876000h" });
      if (authUpdate.error) throw authUpdate.error;
      await withClient(async (client) => {
        await client.query("begin");
        try {
          await client.query("update public.profiles set active = $2 where user_id = $1", [userId, active]);
          await client.query("update public.organization_members set active = $2 where user_id = $1", [userId, active]);
          await client.query(`
            insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
            values ($1,$2,$3,'profile',$4,jsonb_build_object('active',$5))
          `, [session.user.organizationId, session.user.id, active ? "user_reactivated" : "user_deactivated", userId, active]);
          await client.query("commit");
        } catch (error) {
          await client.query("rollback");
          throw error;
        }
      });
      response.status(200).json({ user: { id: userId, active } });
      return;
    }

    if (body.action === "send_recovery") {
      if (target.email) {
        await createPublicClient().auth.resetPasswordForEmail(target.email, { redirectTo: `${portalOrigin(request)}/portal-mada/?mode=recovery` });
      }
      response.status(200).json({ ok: true });
      return;
    }

    response.status(400).json({ error: "Ação de conta inválida." });
  } catch (error) {
    sendApiError(request, response, error, "Não foi possível administrar a conta.", { context: "Portal user management failed" });
  }
};
