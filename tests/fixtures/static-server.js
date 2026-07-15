const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(process.cwd());
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
};

function createTestState() {
  const now = new Date().toISOString();
  const users = [
    { id: "manager-1", name: "Gestora Mada", email: "gestora@example.com", role: "admin_manager", active: true },
    { id: "sdr-1", name: "SDR Teste", email: "sdr@example.com", role: "sdr", active: true },
  ];
  const opportunities = [
    {
      id: "opp-approval", sdrId: "sdr-1", clientName: "Cliente Aprovacao", brandName: "Marca Aprovacao",
      serviceId: "srv-branding", serviceIds: ["srv-branding"], crmStatus: "negotiating", status: "pending_approval",
      suggestedAmountCents: 500000, suggestedDiscountPercent: 0, suggestedDiscountCents: 0,
      requestedConditions: "50_50", suggestedPaymentTerms: "50_50", nextAction: "Preparar proposta", nextActionDate: "2026-07-20",
      requestedScope: "Branding completo", timeline: [], createdAt: now, updatedAt: now, _version: 1,
    },
    {
      id: "opp-active", sdrId: "sdr-1", clientName: "Cliente Andamento", brandName: "Marca Andamento",
      serviceId: "srv-landing-page", serviceIds: ["srv-landing-page"], crmStatus: "follow_up", status: "draft",
      suggestedAmountCents: 300000, requestedConditions: "100", suggestedPaymentTerms: "100",
      nextAction: "Fazer follow-up", nextActionDate: "2026-07-18", notes: "", timeline: [], createdAt: now, updatedAt: now, _version: 1,
    },
    {
      id: "opp-contract", sdrId: "sdr-1", clientName: "Cliente Financeiro", brandName: "Marca Financeiro",
      serviceId: "srv-site-institucional", serviceIds: ["srv-site-institucional"], crmStatus: "sale_completed", status: "commercial_condition_approved",
      suggestedAmountCents: 800000, requestedConditions: "50_50", suggestedPaymentTerms: "50_50",
      nextAction: "Confirmar pagamento", timeline: [], createdAt: now, updatedAt: now, _version: 1,
    },
  ];
  return {
    users,
    opportunities,
    approvalRequests: [{ id: "approval-1", opportunityId: "opp-approval", requestedBy: "sdr-1", status: "pending", requestedAt: now }],
    conditions: [],
    contracts: [{ id: "ctr-1", opportunityId: "opp-contract", contractNumber: "MADA-TESTE", status: "signed", amountCents: 800000, paymentPlan: "50_50", paymentTerms: "50% / 50%", createdAt: now, _version: 1 }],
    payments: [], commissions: [], payoutBatches: [], files: [], auditLogs: [],
    projects: [{
      id: "prj-1", opportunityId: "opp-contract", contractId: "ctr-1", sdrId: "sdr-1", managerId: "manager-1",
      name: "Site Cliente Financeiro", status: "active", targetEndAt: "2026-09-01", currentStageId: "stg-1", _version: 1,
      stages: [{ id: "stg-1", sequenceNumber: 1, name: "Briefing", status: "in_progress", responsibleManagerId: "manager-1", dueAt: "2026-07-22", _version: 1 }], events: [],
    }],
    notifications: [{ id: "notification-1", recipientUserId: "manager-1", createdBy: "sdr-1", kind: "approval", title: "Nova aprovacao", text: "Cliente Aprovacao aguarda analise.", entityType: "opportunity", entityId: "opp-approval", read: false, createdAt: now }],
  };
}

let testState = createTestState();

function hasManagerSession(request) {
  return String(request.headers.cookie || "").includes("portal-e2e=manager");
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => body += chunk);
    request.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    request.on("error", reject);
  });
}

function json(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:4187");
  if (url.pathname === "/api/e2e-reset") {
    testState = createTestState();
    json(response, 200, { ok: true });
    return;
  }
  if (url.pathname === "/api/e2e-login") {
    response.writeHead(302, {
      Location: "/portal-mada/",
      "Set-Cookie": "portal-e2e=manager; Path=/; SameSite=Lax",
    });
    response.end();
    return;
  }
  if (url.pathname === "/api/portal-auth") {
    if (!hasManagerSession(request)) return json(response, 401, { user: null });
    return json(response, 200, { user: {
      id: "manager-1", name: "Gestora Mada", email: "gestora@example.com", role: "admin_manager", active: true,
      organizationId: "org-test", organizationName: "Mada Treinamento", workspaceKind: "training", memberships: [],
      mfaEnrolled: false, mfaRequired: false,
    } });
  }
  if (url.pathname === "/api/portal-state") {
    if (!hasManagerSession(request)) return json(response, 401, { error: "Authentication required" });
    if (request.method === "GET") return json(response, 200, { data: testState });
    if (request.method === "PUT") {
      const body = await readJson(request);
      testState = body.data || testState;
      return json(response, 200, { data: testState });
    }
  }
  if (url.pathname === "/api/portal-workflow") {
    if (!hasManagerSession(request)) return json(response, 401, { error: "Authentication required" });
    const body = await readJson(request);
    if (body.action === "request_approval") {
      const opportunity = testState.opportunities.find((item) => item.id === body.opportunityId);
      if (opportunity) {
        opportunity.status = "pending_approval";
        opportunity._version = Number(opportunity._version || 1) + 1;
        testState.approvalRequests.unshift({
          id: `approval-${Date.now()}`,
          opportunityId: opportunity.id,
          requestedBy: "manager-1",
          status: "pending",
          requestedAt: new Date().toISOString(),
        });
      }
    }
    if (body.action === "review_opportunity") {
      const opportunity = testState.opportunities.find((item) => item.id === body.opportunityId);
      if (opportunity) {
        opportunity.status = body.reviewAction === "approved" || body.reviewAction === "approved_with_changes" ? "commercial_condition_approved" : body.reviewAction;
        opportunity._version = Number(opportunity._version || 1) + 1;
      }
    }
    if (body.action === "mark_notification_read") {
      const notification = testState.notifications.find((item) => item.id === body.notificationId);
      if (notification) notification.read = true;
    }
    if (body.action === "update_project_stage") {
      for (const project of testState.projects) {
        const stage = project.stages.find((item) => item.id === body.stageId);
        if (stage) stage.status = body.status;
      }
    }
    return json(response, 200, { data: { ok: true } });
  }
  const pathname = url.pathname === "/portal-mada/" ? "/portal-mada/index.html" : url.pathname;
  const filename = path.resolve(root, `.${pathname}`);
  if (!filename.startsWith(root) || !fs.existsSync(filename) || fs.statSync(filename).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": types[path.extname(filename)] || "application/octet-stream" });
  fs.createReadStream(filename).pipe(response);
});
server.listen(4187, "127.0.0.1");
