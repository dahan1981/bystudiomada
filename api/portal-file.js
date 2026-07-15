const crypto = require("crypto");
const { getPortalSession, isSameOrigin } = require("../lib/portal-auth-session");
const { createPublicClient } = require("../lib/supabase-server");

const BUCKET = "portal-documents";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

function safeSegment(value, fallback = "general") {
  const normalized = String(value || fallback).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalized.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || fallback;
}

module.exports = async function handler(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    response.setHeader("Allow", "GET, POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (request.method === "POST" && !isSameOrigin(request)) {
    response.status(403).json({ error: "Invalid request origin" });
    return;
  }

  try {
    const session = await getPortalSession(request, response);
    if (!session) {
      response.status(401).json({ error: "Authentication required" });
      return;
    }
    const supabase = createPublicClient(session.accessToken);

    if (request.method === "GET") {
      const id = String(request.query?.id || "");
      const fileResult = await supabase.from("files").select("id, storage_path").eq("id", id).maybeSingle();
      if (fileResult.error || !fileResult.data) {
        response.status(fileResult.error ? 403 : 404).json({ error: "Arquivo não encontrado ou sem acesso." });
        return;
      }
      const signed = await supabase.storage.from(BUCKET).createSignedUrl(fileResult.data.storage_path, 300);
      if (signed.error || !signed.data?.signedUrl) {
        response.status(403).json({ error: "Não foi possível liberar o arquivo." });
        return;
      }
      response.setHeader("Cache-Control", "private, no-store");
      response.redirect(302, signed.data.signedUrl);
      return;
    }

    if (session.user.role !== "admin_manager") {
      response.status(403).json({ error: "Apenas o gestor pode anexar arquivos financeiros e comerciais." });
      return;
    }
    const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const filename = String(body.filename || "").trim();
    const mimeType = String(body.mimeType || "");
    const metadata = body.metadata || {};
    const buffer = Buffer.from(String(body.contentBase64 || ""), "base64");
    if (!filename || !buffer.length || !ALLOWED_MIME_TYPES.has(mimeType)) {
      response.status(400).json({ error: "Envie um arquivo PDF, JPG ou PNG válido." });
      return;
    }
    if (buffer.length > MAX_FILE_SIZE) {
      response.status(413).json({ error: "O arquivo excede o limite de 10 MB." });
      return;
    }

    const id = crypto.randomUUID();
    const kind = safeSegment(metadata.kind || "general");
    const entityId = safeSegment(metadata.opportunityId || metadata.contractId || metadata.paymentId || metadata.payoutBatchId || "unlinked");
    const storagePath = `${session.user.organizationId}/${kind}/${entityId}/${id}-${safeSegment(filename, "arquivo")}`;
    const upload = await supabase.storage.from(BUCKET).upload(storagePath, buffer, { contentType: mimeType, upsert: false });
    if (upload.error) throw upload.error;

    const inserted = await supabase.from("files").insert({
      id,
      organization_id: session.user.organizationId,
      category: metadata.kind || "general",
      display_name: filename,
      storage_path: storagePath,
      mime_type: mimeType,
      size_bytes: buffer.length,
      opportunity_id: metadata.opportunityId || null,
      contract_id: metadata.contractId || null,
      payment_id: metadata.paymentId || null,
      payout_batch_id: metadata.payoutBatchId || null,
      delegated_sdr_id: metadata.sdrId || metadata.delegatedSdrId || null,
      notes: metadata.notes || null,
      uploaded_by: session.user.id,
    }).select("id, storage_path").single();
    if (inserted.error) {
      await supabase.storage.from(BUCKET).remove([storagePath]);
      throw inserted.error;
    }
    response.status(201).json({ id, filename, mimeType, sizeBytes: buffer.length, storagePath });
  } catch (error) {
    response.status(error.statusCode || 500).json({
      error: error.statusCode ? error.message : "Attachment persistence unavailable",
      detail: error.statusCode ? undefined : error.message,
    });
  }
};
