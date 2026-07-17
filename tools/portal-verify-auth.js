const readline = require("readline");
const { createClient } = require("@supabase/supabase-js");

async function readConfig() {
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

async function main() {
  const config = await readConfig();
  const results = [];
  for (const account of config.accounts || []) {
    const client = createClient(config.supabaseUrl, config.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const signedIn = await client.auth.signInWithPassword({ email: account.email, password: account.password });
    if (signedIn.error || !signedIn.data.user) throw signedIn.error || new Error(`Login failed for ${account.email}`);
    const memberships = await client
      .from("organization_members")
      .select("role, active, organizations(slug, workspace_kind)")
      .eq("user_id", signedIn.data.user.id)
      .eq("active", true);
    if (memberships.error) throw memberships.error;
    results.push({
      email: account.email,
      authenticated: true,
      memberships: memberships.data.map((item) => ({
        role: item.role,
        slug: item.organizations?.slug,
        workspaceKind: item.organizations?.workspace_kind,
      })),
    });
    await client.auth.signOut({ scope: "local" });
  }
  process.stdout.write(JSON.stringify({ accounts: results }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
