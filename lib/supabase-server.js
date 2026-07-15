const { createClient } = require("@supabase/supabase-js");

const DEFAULT_SUPABASE_URL = "https://nbjeggofsqsavniuijxz.supabase.co";
const DEFAULT_PUBLISHABLE_KEY = "sb_publishable_YHoLWChkcQ07nREiKuNvNg_L6P16kUv";

function supabaseUrl() {
  return process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
}

function publishableKey() {
  return process.env.SUPABASE_PUBLISHABLE_KEY || DEFAULT_PUBLISHABLE_KEY;
}

function clientOptions(accessToken) {
  return {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    ...(accessToken ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } } : {}),
  };
}

function createPublicClient(accessToken) {
  return createClient(supabaseUrl(), publishableKey(), clientOptions(accessToken));
}

function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    const error = new Error("SUPABASE_SECRET_KEY is not configured");
    error.statusCode = 503;
    throw error;
  }
  return createClient(supabaseUrl(), key, clientOptions());
}

module.exports = {
  createAdminClient,
  createPublicClient,
  publishableKey,
  supabaseUrl,
};
