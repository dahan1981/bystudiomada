const { readState, withClient } = require("../lib/portal-db");
const { getSessionUser, isSameOrigin } = require("../lib/portal-security");
const { canAccessAttachment } = require("../lib/portal-scope");

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
    await withClient(async (client) => {
      const stateRow = await readState(client);
      const state = stateRow?.data || {};
      const user = getSessionUser(request, state);
      if (!user) {
        response.status(401).json({ error: "Authentication required" });
        return;
      }

      if (request.method === "GET") {
        const id = String(request.query?.id || "");
        if (!id) {
          response.status(400).json({ error: "Missing attachment id" });
          return;
        }
        const result = await client.query(
          "select filename, mime_type, data, metadata from public.portal_attachments where id = $1",
          [id],
        );
        const row = result.rows[0];
        if (!row) {
          response.status(404).json({ error: "Attachment not found" });
          return;
        }
        if (!canAccessAttachment(row.metadata, state, user)) {
          response.status(403).json({ error: "Attachment access denied" });
          return;
        }
        response.setHeader("Cache-Control", "private, no-store");
        response.setHeader("Content-Type", row.mime_type || "application/octet-stream");
        response.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(row.filename)}`);
        response.status(200).send(row.data);
        return;
      }

      if (user.role !== "admin_manager") {
        response.status(403).json({ error: "Apenas o gestor pode anexar arquivos financeiros e comerciais" });
        return;
      }

      const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
      const id = String(body.id || "");
      const filename = String(body.filename || "");
      const mimeType = String(body.mimeType || "application/octet-stream");
      const base64 = String(body.contentBase64 || "");
      const metadata = { ...(body.metadata || {}), uploadedBy: user.id };
      const buffer = Buffer.from(base64, "base64");

      if (!id || !filename || !buffer.length) {
        response.status(400).json({ error: "Invalid attachment payload" });
        return;
      }
      if (buffer.length > 3 * 1024 * 1024) {
        response.status(413).json({ error: "Attachment exceeds 3MB limit" });
        return;
      }

      await client.query(
        `
          insert into public.portal_attachments (id, filename, mime_type, size_bytes, data, metadata)
          values ($1, $2, $3, $4, $5, $6::jsonb)
          on conflict (id)
          do update set filename = excluded.filename,
            mime_type = excluded.mime_type,
            size_bytes = excluded.size_bytes,
            data = excluded.data,
            metadata = excluded.metadata
        `,
        [id, filename, mimeType, buffer.length, buffer, JSON.stringify(metadata)],
      );
      response.status(200).json({ id, filename, mimeType, sizeBytes: buffer.length });
    });
  } catch (error) {
    response.status(500).json({ error: "Attachment persistence unavailable", detail: error.message });
  }
};
