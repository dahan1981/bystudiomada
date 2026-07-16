const crypto = require("crypto");
const { markDeliveryProviderStatus } = require("../lib/portal-email");

function rawBody(request) {
  if (typeof request.body === "string") return Promise.resolve(request.body);
  if (request.body && typeof request.body === "object") return Promise.resolve(JSON.stringify(request.body));
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function validSignature(request, body) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false;
  const id = String(request.headers?.["svix-id"] || "");
  const timestamp = String(request.headers?.["svix-timestamp"] || "");
  const signatures = String(request.headers?.["svix-signature"] || "").split(" ");
  if (!id || !timestamp || !signatures.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const encodedSecret = secret.replace(/^whsec_/, "");
  const key = Buffer.from(encodedSecret, "base64");
  const expected = crypto.createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest("base64");
  return signatures.some((value) => {
    const candidate = value.replace(/^v1,/, "");
    return candidate.length === expected.length && crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
  });
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = await rawBody(request);
    if (!validSignature(request, body)) {
      response.status(401).json({ error: "Invalid webhook signature" });
      return;
    }
    const payload = JSON.parse(body || "{}");
    const event = String(payload.type || "").toLowerCase();
    const providerMessageId = payload.data?.email_id || payload.data?.id;
    const status = event.includes("deliver") ? "delivered" : event.includes("bounce") ? "bounced" : event.includes("complain") ? "complained" : event.includes("fail") ? "failed" : "received";
    await markDeliveryProviderStatus(providerMessageId, status);
    response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend webhook failed", { message: error.message });
    response.status(400).json({ error: "Invalid webhook" });
  }
};

module.exports.config = { api: { bodyParser: false } };
