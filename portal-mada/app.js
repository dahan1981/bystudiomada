const STORAGE_KEY = "mada.portal.mvp.v1";
const SUPABASE_CONFIG = {
  url: "https://nbjeggofsqsavniuijxz.supabase.co",
  endpoint: "/api/portal-state",
  stateId: "portal-mada-main",
};

const workflowTemplate = [
  "Briefing",
  "Onboarding",
  "Reuniao de kickoff",
  "Pesquisa e diagnostico",
  "Apresentacao da estrategia",
  "Direcao criativa e moodboard",
  "Desenvolvimento da identidade",
  "Apresentacao da identidade",
  "Feedback consolidado",
  "Ajustes e revisoes",
  "Aprovacao final",
  "Pagamento restante",
  "Entrega e implementacao",
  "Suporte e encerramento",
];

const services = [
  {
    id: "srv-consultoria-estrategica",
    name: "Consultoria Estratégica",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Consultoria Estratégica",
  },
  {
    id: "srv-planejamento-conteudo",
    name: "Planejamento de conteúdo",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Planejamento de conteúdo",
  },
  {
    id: "srv-gestao-rede",
    name: "Gestão de Rede",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Gestão de Rede",
  },
  {
    id: "srv-estrutura-perfil",
    name: "Estruturação de Perfil",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Estruturação de Perfil",
  },
  {
    id: "srv-landing-page",
    name: "Landing Page",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Landing Page",
  },
  {
    id: "srv-site-institucional",
    name: "Sites",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Sites",
  },
  {
    id: "srv-ecommerce",
    name: "E-commerce",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "E-commerce",
  },
  {
    id: "srv-identidade",
    name: "Identidade Visual",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Identidade Visual",
  },
  {
    id: "srv-pack-posts",
    name: "Posts",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Posts",
  },
  {
    id: "srv-design-grafico",
    name: "Design Gráfico",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Design Gráfico",
  },
  {
    id: "srv-roteirizacao-videos",
    name: "Roteirização de vídeo",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Roteirização de vídeo",
  },
  {
    id: "srv-edicao-videos",
    name: "Edição de vídeo",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Edição de vídeo",
  },
  {
    id: "srv-captacao-conteudo",
    name: "Captação de Conteúdo",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Captação de Conteúdo",
  },
  {
    id: "srv-storymake",
    name: "Storymake",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Storymake",
  },
  {
    id: "srv-branding",
    name: "Branding",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Branding",
  },
  {
    id: "srv-planejamento-evento",
    name: "Planejamento de Evento",
    reference: "Projeto sob proposta",
    commissionBps: 1000,
    workflow: "Planejamento de Evento",
  },
];

const legacyServiceIdMap = {
  "srv-social": "srv-roteirizacao-videos",
  "srv-campanha": "srv-design-grafico",
  "srv-perfil-planejamento": "srv-planejamento-conteudo",
  "srv-planejamento-roteiros": "srv-roteirizacao-videos",
  "srv-posts": "srv-pack-posts",
};
const navItems = [
  ["dashboard", "Dashboard", "layout-dashboard"],
  ["opportunities", "Oportunidades", "table-properties"],
  ["approvals", "Aprovações", "badge-check"],
  ["contracts", "Contratos", "file-signature"],
  ["payments", "Pagamentos", "wallet-cards"],
  ["projects", "Projetos", "square-kanban"],
  ["commissions", "Comissões", "circle-dollar-sign"],
  ["files", "Arquivos", "folder-closed"],
  ["reports", "Relatórios", "chart-no-axes-combined"],
  ["services", "Serviços", "layers-3"],
  ["audit", "Auditoria", "scroll-text"],
  ["settings", "Configurações", "settings-2"],
];

navItems.splice(2, 0, ["progress", "Andamento", "activity"]);

const roleLabels = {
  admin_manager: "Gestor",
  sdr: "SDR",
};

const statusLabels = {
  draft: "Rascunho",
  pending_approval: "Aguardando aprovação",
  needs_information: "Mais informações",
  commercial_condition_approved: "Condicao aprovada",
  presented_to_client: "Apresentada ao cliente",
  awaiting_client_response: "Aguardando cliente",
  client_requested_revision: "Cliente pediu alteração",
  client_accepted: "Cliente aceitou",
  client_declined: "Cliente recusou",
  approved: "Aprovado",
  approved_with_changes: "Aprovado com alterações",
  rejected: "Recusado",
  proposal_planning: "Planejamento da proposta",
  proposal_ready: "Proposta pronta",
  proposal_sent: "Proposta enviada",
  proposal_accepted: "Proposta aceita",
  contract_ready: "Contrato pronto",
  draft_contract: "Contrato em rascunho",
  sent: "Enviado",
  signed: "Assinado",
  pending: "Registrado",
  confirmed: "Confirmado",
  available: "Disponivel",
  batched: "Em lote",
  paid: "Pago",
  active: "Ativo",
  completed: "Concluido",
  not_started: "Não iniciado",
  awaiting_client: "Aguardando cliente",
  blocked: "Bloqueado",
  on_hold: "Em pausa",
  cancelled: "Cancelado",
  locked: "Bloqueado",
  ready: "Pronto",
  in_progress: "Em andamento",
  awaiting_manager: "Aguardando gestor",
  skipped: "Pulado",
};

const crmStatusLabels = {
  lead_mapped: "Lead mapeado",
  nurturing: "Nutricao",
  lost: "Perdido",
  first_contact: "Primeiro contato",
  follow_up: "Em follow-up",
  replied: "Respondeu",
  manager_meeting: "Reuniao dos gestores com o cliente",
  proposal_sent_crm: "Proposta enviada",
  negotiating: "Em negociação",
  awaiting_contract_payment: "Aguardando contrato/pagamento",
  sale_completed: "Venda concluida",
};

const crmStatusClasses = {
  lead_mapped: "draft",
  nurturing: "info",
  lost: "rejected",
  first_contact: "pending",
  follow_up: "awaiting",
  replied: "info",
  manager_meeting: "ready",
  proposal_sent_crm: "sent",
  negotiating: "pending",
  awaiting_contract_payment: "awaiting",
  sale_completed: "approved",
};

const MANAGEMENT_OWNER_ID = "management";

const originChannels = [
  "Direct Organico",
  "Direct ativo",
  "Google",
  "Interação",
  "Clubinho",
  "Tráfego Pago",
  "Indicação",
  "Pré-Briefing",
];

const operationSignalOptions = [
  "Vende online",
  "Equipe ativa",
  "Agenda cheia",
  "Tem tráfego ativo",
  "Tem base de leads",
  "Tem produto validado",
  "Atendimento recorrente",
  "Presença digital inicial",
  "Operação ainda informal",
];

const currentMomentOptions = [
  "Lançamento",
  "Reposicionamento",
  "Escala",
  "Validação de oferta",
  "Estruturação inicial",
  "Campanha pontual",
  "Aquecimento de lead",
  "Reativação comercial",
  "Manutenção de presença",
];

const statusClasses = {
  draft: "draft",
  pending_approval: "pending",
  needs_information: "info",
  commercial_condition_approved: "approved",
  presented_to_client: "info",
  awaiting_client_response: "awaiting",
  client_requested_revision: "pending",
  client_accepted: "approved",
  client_declined: "rejected",
  approved: "approved",
  approved_with_changes: "approved",
  rejected: "rejected",
  proposal_planning: "pending",
  proposal_ready: "ready",
  proposal_sent: "sent",
  proposal_accepted: "approved",
  contract_ready: "ready",
  draft_contract: "draft",
  sent: "sent",
  signed: "signed",
  pending: "pending",
  confirmed: "confirmed",
  available: "approved",
  batched: "info",
  paid: "paid",
  active: "active",
  completed: "completed",
  not_started: "draft",
  awaiting_client: "awaiting",
  blocked: "rejected",
  on_hold: "pending",
  cancelled: "cancelled",
  locked: "pending",
  ready: "ready",
  in_progress: "info",
  awaiting_manager: "awaiting",
  skipped: "draft",
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
});

var state = normalizeState(seedState());
let currentUser = null;
let authReady = false;
let currentRoute = "dashboard";
let drawer = null;
let commandMenuOpen = false;
let toastTimer = null;
let mobileNavOpen = false;
let mfaEnrollment = null;
let supabaseSyncStatus = "Cache local";
let supabaseSyncInFlight = false;
let supabaseSyncQueued = false;
let supabaseSyncPromise = Promise.resolve();
let supabaseSyncReady = false;

function attachmentUrl(id) {
  return id ? `/api/portal-file?id=${encodeURIComponent(id)}` : "";
}

function attachmentLink(id, label) {
  if (!id) return esc(label || "-");
  return `<a href="${esc(attachmentUrl(id))}" target="_blank" rel="noreferrer">${esc(label || "Abrir arquivo")}</a>`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error || new Error("Falha ao ler arquivo."));
    reader.readAsDataURL(file);
  });
}

async function uploadPortalAttachment(file, metadata = {}) {
  if (!file?.name) return null;
  if (file.size > 10 * 1024 * 1024) {
    toast("Arquivo muito grande. Limite atual: 10 MB.");
    return null;
  }
  if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
    toast("Envie um arquivo PDF, JPG ou PNG.");
    return null;
  }
  const id = uid("att");
  const response = await fetch("/api/portal-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      contentBase64: await fileToBase64(file),
      metadata,
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

function seedState() {
  return {
    users: [],
    services,
    opportunities: [],
    approvalRequests: [],
    conditions: [],
    contracts: [],
    payments: [],
    commissions: [],
    payoutBatches: [],
    projects: [],
    files: [],
    notifications: [],
    auditLogs: [],
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return normalizeState(seedState());
  try {
    const parsed = JSON.parse(raw);
    return normalizeState({ ...seedState(), ...parsed });
  } catch {
    return normalizeState(seedState());
  }
}

function normalizeState(data) {
  data.users = data.users || seedState().users;
  data.users.forEach((user) => user.active = user.active !== false);
  data.services = services;
  data.projects = data.projects || [];
  data.contracts = data.contracts || [];
  data.opportunities = data.opportunities || [];
  data.opportunities.forEach((opportunity) => {
    opportunity.serviceIds = normalizeServiceIds(opportunity.serviceIds, opportunity.serviceId, data.services);
    opportunity.serviceId = opportunity.serviceIds[0] || normalizeServiceId(opportunity.serviceId) || data.services[0]?.id;
    opportunity.sdrId = opportunity.sdrId || MANAGEMENT_OWNER_ID;
    opportunity.crmStatus = opportunity.crmStatus || "lead_mapped";
    opportunity.website = opportunity.website || "";
    opportunity.segment = opportunity.segment || "";
    opportunity.city = opportunity.city || "";
    opportunity.origin = opportunity.origin || "";
    opportunity.businessOffer = opportunity.businessOffer || "";
    opportunity.targetAudience = opportunity.targetAudience || "";
    opportunity.operationSignal = opportunity.operationSignal || "";
    opportunity.currentMoment = opportunity.currentMoment || "";
    opportunity.observedProblem = opportunity.observedProblem || "";
    opportunity.reportedNeed = opportunity.reportedNeed || opportunity.clientNeed || "";
    opportunity.investmentRange = opportunity.investmentRange || "";
    opportunity.decisionMaker = opportunity.decisionMaker || "";
    opportunity.previousHiring = opportunity.previousHiring || "";
    opportunity.urgency = opportunity.urgency || "";
    opportunity.objections = opportunity.objections || "";
    opportunity.suggestedDiscountPercent = discountPercentForOpportunity(opportunity);
    opportunity.suggestedDiscountCents = discountCentsFromPercent(opportunity.suggestedAmountCents, opportunity.suggestedDiscountPercent);
    opportunity.requestedConditions = normalizePaymentPlan(opportunity.requestedConditions || opportunity.suggestedPaymentTerms || "50_50");
    opportunity.suggestedPaymentTerms = opportunity.requestedConditions;
    opportunity.lossReason = opportunity.lossReason || "";
    opportunity.nextAction = opportunity.nextAction || "";
    opportunity.nextActionDate = opportunity.nextActionDate || "";
  });
  data.conditions = data.conditions || [];
  data.conditions.forEach((condition) => {
    condition.paymentTerms = normalizePaymentPlan(condition.paymentTerms || "50_50");
    condition.discountPercent = Number(condition.discountPercent ?? condition.discountRatePercent ?? 0);
  });
  data.payments = data.payments || [];
  data.payments.forEach((payment) => {
    payment.type = payment.type || "contract_payment";
    payment.method = payment.method || "";
    payment.reference = payment.reference || "";
    payment.notes = payment.notes || "";
    payment.status = payment.status || "pending";
    payment.dueDate = payment.dueDate || payment.createdAt || nowIso();
    payment.createdAt = payment.createdAt || nowIso();
    payment.paidAt = payment.paidAt || null;
    payment.confirmedBy = payment.confirmedBy || null;
    payment.receiptFileName = payment.receiptFileName || "";
    payment.receiptAttachmentId = payment.receiptAttachmentId || "";
    payment.recordSource = payment.recordSource || "manual";
  });
  data.files = data.files || [];
  data.files.forEach((file) => {
    file.category = file.category || "general";
    file.delegatedSdrId = file.delegatedSdrId || file.sdrId || null;
    file.attachmentId = file.attachmentId || "";
    file.originalFileName = file.originalFileName || "";
  });

  data.contracts.forEach((contract) => {
    const opp = data.opportunities.find((item) => item.id === contract.opportunityId);
    const condition = data.conditions.find((item) => item.id === contract.conditionVersionId)
      || data.conditions.find((item) => item.opportunityId === contract.opportunityId && item.isActive)
      || data.conditions.find((item) => item.opportunityId === contract.opportunityId);
    normalizeContract(contract, opp, condition);
  });

  data.opportunities
    .filter((opportunity) => ["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"].includes(opportunity.status))
    .forEach((opportunity) => {
      const hasContract = data.contracts.some((contract) => contract.opportunityId === opportunity.id);
      const condition = data.conditions.find((item) => item.opportunityId === opportunity.id && item.isActive)
        || data.conditions.find((item) => item.opportunityId === opportunity.id);
      if (hasContract || !condition) return;
      data.contracts.unshift(conditionToContractDraft(opportunity, condition, condition.approvedBy || opportunity.sdrId, data.contracts.length + 1));
    });

  data.commissions = data.commissions || [];
  data.commissions.forEach((commission) => {
    const payment = data.payments.find((item) => item.id === commission.paymentId);
    const rateBps = payment ? commissionRateForPayment(payment, data) : 1000;
    commission.rateBps = [500, 1000].includes(commission.rateBps) ? commission.rateBps : rateBps;
    commission.baseCents = commission.baseCents ?? (payment ? commissionBaseCentsForPayment(payment, data) : 0);
    commission.amountCents = commission.amountCents ?? Math.round(commission.baseCents * commission.rateBps / 10000);
  });

  data.payoutBatches = data.payoutBatches || [];
  data.payoutBatches.forEach((batch) => {
    batch.commissionIds = batch.commissionIds || [];
    batch.totalAmountCents = batch.commissionIds.reduce((sum, commissionId) => {
      const commission = data.commissions.find((item) => item.id === commissionId);
      return sum + (commission?.amountCents || 0);
    }, 0);
  });

  data.projects.forEach((project) => {
    if (!project.opportunityId && project.contractId) {
      const contract = data.contracts.find((item) => item.id === project.contractId);
      project.opportunityId = contract?.opportunityId || null;
    }
    if (!project.sdrId && project.opportunityId) {
      const opportunity = data.opportunities.find((item) => item.id === project.opportunityId);
      project.sdrId = opportunity?.sdrId || null;
    }
  });

  data.opportunities
    .filter((opportunity) => ["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"].includes(opportunity.status))
    .forEach((opportunity) => {
      const hasProject = data.projects.some((project) => project.opportunityId === opportunity.id);
      const condition = data.conditions.find((item) => item.opportunityId === opportunity.id && item.isActive)
        || data.conditions.find((item) => item.opportunityId === opportunity.id);
      if (hasProject || !condition) return;
      const actorId = condition.approvedBy || opportunity.sdrId;
      const serviceNames = opportunity.serviceIds
        .map((id) => data.services?.find((item) => item.id === id)?.name)
        .filter(Boolean)
        .join(" + ");
      const contract = data.contracts.find((item) => item.opportunityId === opportunity.id);
      data.projects.unshift({
        id: uid("prj"),
        organizationId: opportunity.organizationId || "org-mada",
        opportunityId: opportunity.id,
        sdrId: opportunity.sdrId,
        contractId: contract?.id || null,
        clientId: `client_${opportunity.id}`,
        serviceId: opportunity.serviceId,
        managerId: actorId,
        name: `${opportunity.brandName} - ${serviceNames || "Projeto"}`,
        status: "active",
        startsAt: nowIso(),
        targetEndAt: addDays(60),
        conditionVersionId: condition.id,
        contractSnapshot: {
          amountCents: condition.amountCents,
          scope: condition.scope,
          paymentTerms: condition.paymentTerms,
        },
        stages: workflowTemplate.map((name, index) => ({
          id: uid("stg"),
          sequenceNumber: index + 1,
          name,
          status: index === 0 ? "ready" : "locked",
          responsibleManagerId: actorId,
          dueAt: addDays(7 * (index + 1)),
          events: [],
        })),
        events: [event("project_created_from_approval", "Projeto criado automaticamente apos aprovacao da condicao comercial e abertura de contrato", actorId)],
      });
    });

  return data;
}

function saveLocalState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveState() {
  saveLocalState();
  return queueSupabaseSave();
}

async function initSupabaseSync() {
  if (!currentUser) return;
  if (!SUPABASE_CONFIG.endpoint) return;
  supabaseSyncStatus = "Conectando ao Supabase";
  try {
    const response = await fetch(SUPABASE_CONFIG.endpoint);
    if (response.status === 401) {
      currentUser = null;
      authReady = true;
      supabaseSyncReady = false;
      render();
      return;
    }
    if (!response.ok) throw new Error(await response.text());
    const row = await response.json();
    if (row?.data) {
      state = normalizeState({ ...seedState(), ...row.data });
      saveLocalState();
      supabaseSyncReady = true;
      supabaseSyncStatus = "Sincronizado com Supabase";
      authReady = true;
      render();
      return;
    }
    supabaseSyncReady = true;
    await pushSupabaseState();
    supabaseSyncStatus = "Supabase inicializado";
    authReady = true;
    render();
  } catch (error) {
    supabaseSyncReady = false;
    supabaseSyncStatus = "Supabase pendente: endpoint ou DATABASE_URL";
    authReady = true;
    console.warn("Supabase sync unavailable", error);
    render();
  }
}

function queueSupabaseSave() {
  if (!SUPABASE_CONFIG.endpoint || !supabaseSyncReady) return Promise.resolve();
  supabaseSyncQueued = true;
  supabaseSyncStatus = "Salvando alterações";
  supabaseSyncPromise = supabaseSyncPromise.then(async () => {
    if (!supabaseSyncQueued) return;
    supabaseSyncQueued = false;
    await flushSupabaseSave();
  });
  return supabaseSyncPromise;
}

async function flushSupabaseSave() {
  if (supabaseSyncInFlight) return;
  supabaseSyncInFlight = true;
  try {
    await pushSupabaseState();
    supabaseSyncStatus = "Sincronizado com Supabase";
  } catch (error) {
    if (error.code === "STATE_CONFLICT") {
      supabaseSyncQueued = false;
      supabaseSyncReady = true;
      toast("Os dados mudaram em outro acesso. A versão mais recente foi carregada; repita a última ação.");
      await initSupabaseSync();
      return;
    }
    supabaseSyncQueued = true;
    supabaseSyncReady = false;
    supabaseSyncStatus = "Supabase pendente: falha ao salvar";
    console.warn("Supabase save unavailable", error);
  } finally {
    supabaseSyncInFlight = false;
    updateSyncIndicator();
  }
}

function updateSyncIndicator() {
  const indicator = document.querySelector(".topbar-sync");
  if (!indicator) return;
  indicator.classList.toggle("is-online", supabaseSyncReady);
  indicator.title = supabaseSyncStatus;
  const label = indicator.querySelector("span");
  if (label) label.textContent = supabaseSyncStatus === "Salvando alterações" ? "Salvando" : (supabaseSyncReady ? "Dados salvos" : "Sem conexão");
}

async function pushSupabaseState() {
  const response = await fetch(SUPABASE_CONFIG.endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: state,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Falha ao salvar dados.");
    if (response.status === 409) error.code = "STATE_CONFLICT";
    throw error;
  }
  if (payload.data) {
    state = normalizeState({ ...seedState(), ...payload.data });
    saveLocalState();
  }
}

function saveUser(user) {
  currentUser = user;
}

async function bootstrapApp() {
  try {
    const response = await fetch("/api/portal-auth", { headers: { Accept: "application/json" } });
    const payload = await response.json().catch(() => ({}));
    currentUser = response.ok ? payload.user : null;
  } catch {
    currentUser = null;
  }
  if (currentUser) {
    authReady = false;
    render();
    await initSupabaseSync();
    return;
  }
  authReady = true;
  render();
}

function uid() {
  return crypto.randomUUID();
}

function nowIso() {
  return new Date().toISOString();
}

function contractNumber(index = state.contracts.length + 1) {
  return `MADA-${String(index).padStart(4, "0")}`;
}

function cents(value) {
  const clean = String(value || "0").replace(/\./g, "").replace(",", ".");
  return Math.round(Number(clean || 0) * 100);
}

function brl(centsValue) {
  return currency.format((Number(centsValue) || 0) / 100);
}

function moneyInputValue(centsValue) {
  return brl(centsValue).replace("R$", "").trim();
}

function percent(value) {
  const clean = String(value || "0").replace("%", "").replace(/\./g, "").replace(",", ".");
  const number = Number(clean || 0);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function percentInputValue(value) {
  const number = Number(value) || 0;
  return number.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function discountPercentForOpportunity(opportunity = {}) {
  if (opportunity.suggestedDiscountPercent != null) return Number(opportunity.suggestedDiscountPercent) || 0;
  if (opportunity.suggestedAmountCents && opportunity.suggestedDiscountCents) {
    return (Number(opportunity.suggestedDiscountCents) / Number(opportunity.suggestedAmountCents)) * 100;
  }
  return 0;
}

function discountCentsFromPercent(amountCents, discountPercent) {
  return Math.round((Number(amountCents) || 0) * (Number(discountPercent) || 0) / 100);
}

function netAmountAfterDiscount(amountCents, discountPercent) {
  return Math.max(0, (Number(amountCents) || 0) - discountCentsFromPercent(amountCents, discountPercent));
}

function dateLabel(value) {
  if (!value) return "-";
  return dateFormat.format(new Date(value));
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function byId(list, id) {
  return list.find((item) => item.id === id);
}

function normalizeServiceId(id) {
  return legacyServiceIdMap[id] || id || null;
}

function normalizeServiceIds(value, fallbackId, list = state?.services || services) {
  const raw = Array.isArray(value) ? value : (value ? [value] : []);
  if (!raw.length && fallbackId) raw.push(fallbackId);
  const allowed = new Set(list.map((item) => item.id));
  const seen = new Set();
  return raw
    .map(normalizeServiceId)
    .filter((id) => id && allowed.has(id) && !seen.has(id) && seen.add(id));
}

function serviceNamesForOpportunity(opp) {
  const ids = normalizeServiceIds(opp?.serviceIds, opp?.serviceId);
  const names = ids.map((id) => byId(state.services, id)?.name).filter(Boolean);
  return names.join(" + ") || "-";
}

function originChannelOptions(selectedOrigin = "") {
  const normalizedSelected = String(selectedOrigin || "");
  const hasLegacyOrigin = normalizedSelected && !originChannels.includes(normalizedSelected);
  return `
    <option value="" ${!normalizedSelected ? "selected" : ""}>Selecione a origem</option>
    ${hasLegacyOrigin ? `<option value="${esc(normalizedSelected)}" selected>${esc(normalizedSelected)}</option>` : ""}
    ${originChannels.map((origin) => `<option value="${esc(origin)}" ${normalizedSelected === origin ? "selected" : ""}>${esc(origin)}</option>`).join("")}
  `;
}

function splitChoiceValue(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function selectOptions(options, selectedValue = "", placeholder = "Selecione") {
  const selected = String(selectedValue || "");
  const hasLegacyValue = selected && !options.includes(selected);
  return `
    <option value="" ${!selected ? "selected" : ""}>${esc(placeholder)}</option>
    ${hasLegacyValue ? `<option value="${esc(selected)}" selected>${esc(selected)}</option>` : ""}
    ${options.map((option) => `<option value="${esc(option)}" ${selected === option ? "selected" : ""}>${esc(option)}</option>`).join("")}
  `;
}

function multiSelectOptions(options, selectedValue = "") {
  const selected = splitChoiceValue(selectedValue);
  const selectedSet = new Set(selected);
  const legacyValues = selected.filter((value) => !options.includes(value));
  return `
    ${legacyValues.map((value) => `<option value="${esc(value)}" selected>${esc(value)}</option>`).join("")}
    ${options.map((option) => `<option value="${esc(option)}" ${selectedSet.has(option) ? "selected" : ""}>${esc(option)}</option>`).join("")}
  `;
}

function multiChoiceValue(form, name) {
  return form.getAll(name).filter(Boolean).join(", ");
}

function opportunityResponsibleOptions(selectedId = "") {
  const selected = selectedId || (currentUser?.role === "admin_manager" ? MANAGEMENT_OWNER_ID : currentUser?.id || "usr-sdr");
  const sdrs = state.users.filter((user) => user.role === "sdr" && (user.active !== false || user.id === selected));
  return `
    <option value="${MANAGEMENT_OWNER_ID}" ${selected === MANAGEMENT_OWNER_ID ? "selected" : ""}>Gestão</option>
    ${sdrs.map((user) => `<option value="${esc(user.id)}" ${selected === user.id ? "selected" : ""}>${esc(user.name)}</option>`).join("")}
  `;
}

function responsibleIdFromForm(form) {
  const responsibleId = form.get("sdrId") || form.get("responsibleId");
  if (responsibleId === MANAGEMENT_OWNER_ID) return MANAGEMENT_OWNER_ID;
  if (byId(state.users, responsibleId)?.role === "sdr") return responsibleId;
  return currentUser?.role === "sdr" ? currentUser.id : MANAGEMENT_OWNER_ID;
}

function getActorName(id) {
  if (id === MANAGEMENT_OWNER_ID) return "Gestão";
  return byId(state.users, id)?.name || "Sistema";
}

function event(action, label, actorId, meta = {}) {
  return {
    id: uid("evt"),
    action,
    label,
    actorId,
    meta,
    createdAt: nowIso(),
  };
}

function audit(actorUserId, action, entityType, entityId, metadata = {}) {
  const fallbackRoles = {
    "usr-admin": "admin_manager",
    "usr-sdr": "sdr",
  };
  const users = state?.users || [];
  return {
    id: uid("aud"),
    organizationId: "org-mada",
    actorUserId,
    actorRole: byId(users, actorUserId)?.role || fallbackRoles[actorUserId] || "system",
    action,
    entityType,
    entityId,
    metadata,
    createdAt: nowIso(),
  };
}

function addAudit(action, entityType, entityId, metadata = {}) {
  state.auditLogs.unshift(audit(currentUser?.id || "system", action, entityType, entityId, metadata));
}

function addNotification(text, { recipientUserId = null, recipientRole = null } = {}) {
  state.notifications.unshift({
    id: uid("ntf"),
    text,
    read: false,
    recipientUserId,
    recipientRole,
    createdBy: currentUser?.id || "system",
    createdAt: nowIso(),
  });
}

function conditionToContractDraft(opp, condition, actorId, sequence = state.contracts.length + 1) {
  const amountCents = condition?.amountCents ?? opp.suggestedAmountCents ?? 0;
  const paymentPlan = normalizePaymentPlan(condition?.paymentTerms || opp.suggestedPaymentTerms || "50_50");
  const paymentTerms = paymentPlanLabel(paymentPlan);
  return {
    id: uid("ctr"),
    opportunityId: opp.id,
    clientId: `client_${opp.id}`,
    conditionVersionId: condition?.id || null,
    contractNumber: contractNumber(sequence),
    amountCents,
    proposalAmountCents: amountCents,
    paymentPlan,
    paymentTerms,
    scope: condition?.scope || opp.suggestedScope || opp.requestedScope || "",
    deliverables: condition?.deliverables || opp.suggestedDeliverables || "",
    proposalFileName: "",
    proposalAttachmentId: "",
    proposalAttachedAt: null,
    proposalSentAt: null,
    proposalAcceptedAt: null,
    contractLink: "",
    contractLinkAddedAt: null,
    status: "proposal_planning",
    createdBy: actorId,
    createdAt: nowIso(),
    sentAt: null,
    signedAt: null,
    saleValidatedAt: null,
  };
}

function normalizeContract(contract, opp, condition) {
  const paymentPlan = normalizePaymentPlan(contract.paymentPlan || contract.paymentTerms || condition?.paymentTerms || opp?.suggestedPaymentTerms || "50_50");
  const paymentTerms = paymentPlanLabel(paymentPlan);
  contract.proposalAmountCents = contract.proposalAmountCents ?? contract.amountCents ?? condition?.amountCents ?? opp?.suggestedAmountCents ?? 0;
  contract.amountCents = contract.amountCents ?? contract.proposalAmountCents;
  contract.paymentPlan = paymentPlan;
  contract.paymentTerms = paymentTerms;
  contract.scope = contract.scope || condition?.scope || opp?.suggestedScope || opp?.requestedScope || "";
  contract.deliverables = contract.deliverables || condition?.deliverables || opp?.suggestedDeliverables || "";
  contract.proposalFileName = contract.proposalFileName || "";
  contract.proposalAttachmentId = contract.proposalAttachmentId || "";
  contract.proposalAttachedAt = contract.proposalAttachedAt || null;
  contract.proposalSentAt = contract.proposalSentAt || null;
  contract.proposalAcceptedAt = contract.proposalAcceptedAt || null;
  contract.contractLink = contract.contractLink || "";
  contract.contractLinkAddedAt = contract.contractLinkAddedAt || null;
  if (contract.status === "draft_contract") contract.status = contract.proposalFileName ? "proposal_ready" : "proposal_planning";
}

function visibleOpportunities() {
  if (!currentUser) return [];
  if (currentUser.role === "admin_manager") return state.opportunities;
  return state.opportunities.filter((item) => item.sdrId === currentUser.id);
}

function operationalOpportunities() {
  return visibleOpportunities().filter((item) => item.status !== "cancelled");
}

function activeCondition(opportunityId) {
  return state.conditions.find((item) => item.opportunityId === opportunityId && item.isActive);
}

function latestContract(opportunityId) {
  return state.contracts.find((item) => item.opportunityId === opportunityId);
}

function visibleContracts() {
  const visibleIds = new Set(visibleOpportunities().map((opp) => opp.id));
  return state.contracts.filter((contract) => visibleIds.has(contract.opportunityId));
}

function visiblePayments() {
  const contractIds = new Set(visibleContracts().map((contract) => contract.id));
  return state.payments.filter((payment) => contractIds.has(payment.contractId));
}

function commissionForPayment(paymentId) {
  return state.commissions.find((item) => item.paymentId === paymentId);
}

function commissionRateForPayment(payment, sourceState = state) {
  const contract = payment && sourceState.contracts.find((item) => item.id === payment.contractId);
  if (!payment || !contract) return 1000;
  const confirmedCents = sourceState.payments
    .filter((item) => item.contractId === contract.id && item.status === "confirmed")
    .reduce((sum, item) => sum + item.amountCents, 0);
  return confirmedCents >= contract.amountCents ? 1000 : 500;
}

function commissionBaseCentsForPayment(payment, sourceState = state) {
  const contract = payment && sourceState.contracts.find((item) => item.id === payment.contractId);
  if (!payment || !contract) return payment?.amountCents || 0;
  return contract.amountCents || payment.amountCents;
}

function commissionAmountCentsForPayment(payment, rateBps, sourceState = state) {
  return Math.round(commissionBaseCentsForPayment(payment, sourceState) * rateBps / 10000);
}

function commissionRateLabel(rateBps) {
  return rateBps === 500 ? "5%" : "10%";
}

function commissionRateOptions(selectedBps) {
  return `
    <option value="500" ${selectedBps === 500 ? "selected" : ""}>5% por ciclo - contrato 50% / 50%</option>
    <option value="1000" ${selectedBps === 1000 ? "selected" : ""}>10% unico - pagamento a vista</option>
  `;
}

function commissionablePayments() {
  return visiblePayments().filter((payment) => {
    const contract = byId(state.contracts, payment.contractId);
    return payment.status === "confirmed" && payment.amountCents > 0 && contract && !commissionForPayment(payment.id);
  });
}

function percentToBps(value) {
  const percent = Number(String(value || "0").replace(",", "."));
  if (!Number.isFinite(percent) || percent <= 0) return 0;
  return Math.round(percent * 100);
}

function paymentForContract(contractId) {
  return state.payments.find((item) => item.contractId === contractId);
}

function paymentsForContract(contractId) {
  return state.payments.filter((item) => item.contractId === contractId);
}

function contractPaymentSummary(contractId) {
  const payments = paymentsForContract(contractId);
  return {
    payments,
    confirmedCents: payments.filter((item) => item.status === "confirmed").reduce((sum, item) => sum + item.amountCents, 0),
    pendingCents: payments.filter((item) => item.status !== "confirmed").reduce((sum, item) => sum + item.amountCents, 0),
  };
}

function projectForContract(contractId) {
  return state.projects.find((item) => item.contractId === contractId);
}

function projectForOpportunity(opportunityId) {
  return state.projects.find((item) => item.opportunityId === opportunityId);
}

function statusBadge(status) {
  return `<span class="status ${statusClasses[status] || "info"}">${statusLabels[status] || status}</span>`;
}

function crmStatusBadge(status) {
  return `<span class="status ${crmStatusClasses[status] || "info"}">${crmStatusLabels[status] || status || "-"}</span>`;
}

function canRequestConditionApproval(opp) {
  if (!opp) return false;
  if (["lost", "sale_completed"].includes(opp.crmStatus)) return false;
  return opp.status === "draft";
}

function conditionApprovalMissingFields(opp) {
  const missing = [];
  if (!String(opp?.clientName || "").trim()) missing.push("nome do cliente");
  if (!normalizeServiceIds(opp?.serviceIds, opp?.serviceId).length) missing.push("serviço");
  if (Number(opp?.suggestedAmountCents || 0) <= 0) missing.push("valor proposto");
  return missing;
}

function paymentPlanLabel(plan) {
  const labels = {
    "50_50": "50% / 50%",
    "100": "A vista / 100%",
  };
  return labels[plan] || plan || "-";
}

function normalizePaymentPlan(value) {
  const raw = String(value || "").trim();
  const lower = raw.toLowerCase();
  if (raw === "100" || lower.includes("vista") || lower.includes("100")) return "100";
  return "50_50";
}

function paymentPlanOptions(selectedValue = "") {
  const selected = normalizePaymentPlan(selectedValue);
  return `
    <option value="50_50" ${selected === "50_50" ? "selected" : ""}>50% / 50%</option>
    <option value="100" ${selected === "100" ? "selected" : ""}>A vista / 100%</option>
  `;
}

const projectStatusOptions = [
  ["not_started", "Não iniciado"],
  ["active", "Ativo"],
  ["awaiting_client", "Aguardando cliente"],
  ["blocked", "Bloqueado"],
  ["on_hold", "Em pausa"],
  ["completed", "Concluido"],
  ["cancelled", "Cancelado"],
];

const stageStatusOptions = [
  ["locked", "Bloqueado"],
  ["ready", "Pronto"],
  ["in_progress", "Em andamento"],
  ["awaiting_client", "Aguardando cliente"],
  ["awaiting_manager", "Aguardando gestor"],
  ["blocked", "Travado"],
  ["approved", "Aprovado"],
  ["completed", "Concluido"],
  ["skipped", "Pulado"],
  ["cancelled", "Cancelado"],
];

const metricIconAliases = {
  "$": "circle-dollar-sign",
  "✓": "check-circle-2",
  "▤": "receipt-text",
  "▥": "square-kanban",
  "▣": "file-signature",
  "▧": "folder-closed",
  "↗": "send",
  "◴": "clock-3",
  "": "activity",
};

function routeLabel(route) {
  return navItems.find(([itemRoute]) => itemRoute === route)?.[1] || "Dashboard";
}

function metricIconName(icon) {
  return metricIconAliases[icon] || icon || "activity";
}

function renderIcon(name, className = "") {
  return `<i data-lucide="${esc(name)}" class="${esc(className)}" aria-hidden="true"></i>`;
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function initials(name = "") {
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "M";
}

function render() {
  const app = document.querySelector("#app");
  if (!authReady) {
    app.className = "app-shell";
    app.innerHTML = `<main class="auth-screen"><section class="auth-loading">${renderIcon("loader-circle")}<strong>Carregando Portal Mada</strong><span>Validando acesso e sincronizando dados.</span></section></main>`;
    refreshIcons();
    return;
  }
  if (!currentUser) {
    app.className = "app-shell";
    app.innerHTML = renderAuth();
    document.onkeydown = null;
    bindAuth();
    refreshIcons();
    return;
  }
  if (currentUser.mfaRequired) {
    app.className = "app-shell";
    app.innerHTML = renderMfaChallenge();
    bindMfaChallenge();
    refreshIcons();
    return;
  }

  app.className = "layout";
  app.innerHTML = `
    ${renderSidebar()}
    <main class="main">
      <header class="topbar">
        <div class="topbar-leading">
          <button class="mobile-menu icon-button" type="button" data-mobile-menu aria-label="Abrir menu">${renderIcon("menu")}</button>
          <div class="topbar-context">
            <span>${currentUser.workspaceKind === "training" ? "Ambiente de treinamento" : "Mada Operação"}</span>
            <strong>${esc(routeLabel(currentRoute))}</strong>
          </div>
        </div>
        <button class="command-trigger" type="button" data-command-menu aria-label="Abrir busca e comandos">
          ${renderIcon("search", "command-trigger-icon")}
          <span>Buscar ou ir para...</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div class="topbar-actions">
          <span class="topbar-sync ${supabaseSyncReady ? "is-online" : ""}" title="${esc(supabaseSyncStatus)}"><i></i><span>${supabaseSyncStatus === "Salvando alterações" ? "Salvando" : "Dados salvos"}</span></span>
          <button class="button topbar-create" type="button" data-new-opportunity aria-label="Nova oportunidade">${renderIcon("plus")}<span>Nova oportunidade</span></button>
          <button class="notification icon-button" type="button" data-route="settings" aria-label="Notificacoes">
            ${renderIcon("bell")}
            <span>${state.notifications.filter((item) => !item.read).length}</span>
          </button>
          <span class="topbar-avatar" title="${esc(currentUser.name)}">${esc(initials(currentUser.name))}</span>
        </div>
      </header>
      <section class="content">${renderRoute()}</section>
    </main>
    ${drawer ? renderDrawer() : ""}
    ${commandMenuOpen ? renderCommandMenu() : ""}
  `;
  bindApp();
  refreshIcons();
}

function renderMfaChallenge() {
  return `
    <main class="auth-screen">
      <section class="auth-card">
        <div class="auth-brand"><span class="brand-mark">M</span><span>Studio Mada</span></div>
        <form class="auth-form" data-mfa-challenge-form>
          <div class="auth-form-head"><strong>Verificação em duas etapas</strong><span>Digite o código atual do seu aplicativo autenticador.</span></div>
          <label class="field"><span>Código de 6 dígitos</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required /></label>
          <button class="button" type="submit">Verificar ${renderIcon("shield-check")}</button>
          <div class="auth-error" data-mfa-error hidden></div>
        </form>
      </section>
    </main>
  `;
}

function bindMfaChallenge() {
  document.querySelector("[data-mfa-challenge-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const errorBox = document.querySelector("[data-mfa-error]");
    try {
      const factors = await postPortal("/api/portal-auth", { action: "mfa_list" });
      const factor = factors.factors.find((item) => item.status === "verified") || factors.factors[0];
      if (!factor) throw new Error("Nenhum autenticador configurado para esta conta.");
      await postPortal("/api/portal-auth", { action: "mfa_verify", factorId: factor.id, code: new FormData(event.currentTarget).get("code") });
      currentUser.mfaRequired = false;
      currentUser.mfaCurrentLevel = "aal2";
      authReady = false;
      render();
      await bootstrapApp();
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.hidden = false;
    }
  });
}

function renderAuth() {
  const recovery = new URLSearchParams(location.hash.replace(/^#/, ""));
  const hasRecoverySession = Boolean(recovery.get("access_token") && recovery.get("refresh_token"));
  return `
    <main class="auth-screen">
      <section class="auth-card" aria-label="Acesso ao Portal Comercial Mada">
        <div class="auth-brand">
          <span class="brand-mark">M</span>
          <span>Studio Mada</span>
        </div>
        <div class="auth-copy">
          <span class="auth-kicker">Portal interno</span>
          <h1>Portal Comercial</h1>
          <p>Operações comerciais, contratos e projetos em um único ambiente.</p>
        </div>
        ${hasRecoverySession ? `
        <form class="auth-form" data-complete-recovery-form>
          <div class="auth-form-head"><strong>Definir nova senha</strong><span>Crie uma senha exclusiva com pelo menos 10 caracteres.</span></div>
          <label class="field"><span>Nova senha</span><input name="newPassword" type="password" minlength="10" autocomplete="new-password" required /></label>
          <label class="field"><span>Confirmar senha</span><input name="confirmPassword" type="password" minlength="10" autocomplete="new-password" required /></label>
          <button class="button" type="submit" data-recovery-button>Salvar senha ${renderIcon("arrow-right")}</button>
          <div class="auth-error" data-auth-error hidden></div>
        </form>
        ` : `
        <form class="auth-form" data-login-form>
          <div class="auth-form-head"><strong>Acessar sua conta</strong><span>Use o acesso criado pelo gestor.</span></div>
          <label class="field">
            <span>E-mail</span>
            <input name="email" type="email" value="gestor@bystudiomada.com.br" autocomplete="email" required />
          </label>
          <label class="field">
            <span>Senha</span>
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          <button class="button" type="submit" data-login-button>Entrar ${renderIcon("arrow-right")}</button>
          <div class="auth-error" data-auth-error hidden></div>
          <button class="auth-link" type="button" data-show-recovery>Esqueci minha senha</button>
        </form>
        <form class="auth-form auth-recovery-form" data-recovery-form hidden>
          <div class="auth-form-head"><strong>Recuperar acesso</strong><span>Enviaremos um link para o e-mail cadastrado.</span></div>
          <label class="field"><span>E-mail</span><input name="email" type="email" autocomplete="email" required /></label>
          <button class="button secondary" type="submit">Enviar link</button>
          <button class="auth-link" type="button" data-back-login>Voltar ao login</button>
          <div class="auth-error" data-recovery-message hidden></div>
        </form>
        `}
      </section>
    </main>
  `;
}

function renderSidebar() {
  const allowed = currentUser.role === "sdr"
    ? navItems.filter(([route]) => !["approvals", "services", "reports", "audit", "settings"].includes(route))
    : navItems;
  const groups = [
    ["Comercial", ["dashboard", "opportunities", "progress", "approvals", "contracts"]],
    ["Financeiro", ["payments", "commissions", "files", "reports"]],
    ["Sistema", ["projects", "services", "audit", "settings"]],
  ].map(([title, routes]) => [title, allowed.filter(([route]) => routes.includes(route))]).filter(([, items]) => items.length);

  return `
    <aside class="sidebar ${mobileNavOpen ? "is-open" : ""}" data-sidebar>
      <div class="brand-block">
        <span class="brand-mark">M</span>
        <div>
          <h1 class="brand-title">Studio Mada</h1>
          <p class="brand-subtitle">Portal Comercial</p>
        </div>
      </div>
      <nav class="nav" aria-label="Navegacao interna">
        ${groups.map(([title, items]) => `
          <div class="nav-section">
            <span class="nav-section-title">${esc(title)}</span>
            ${items.map(([route, label, icon]) => `
              <button type="button" class="${currentRoute === route ? "is-active" : ""}" data-route="${route}">
                ${renderIcon(icon, "nav-icon")}
                <span>${label}</span>
              </button>
            `).join("")}
          </div>
        `).join("")}
      </nav>
      <div class="user-block">
        ${currentUser.memberships?.length > 1 ? `
          <label class="workspace-switch">
            <span>Ambiente</span>
            <select data-workspace-switch aria-label="Trocar ambiente">
              ${currentUser.memberships.map((membership) => `
                <option value="${esc(membership.organizationId)}" ${membership.organizationId === currentUser.organizationId ? "selected" : ""}>
                  ${membership.workspaceKind === "training" ? "Treinamento" : "Operação"}
                </option>
              `).join("")}
            </select>
          </label>
        ` : ""}
        <div class="user-summary">
          <span class="user-avatar">${esc(initials(currentUser.name))}</span>
          <div><strong>${esc(currentUser.name)}</strong><span>${roleLabels[currentUser.role]}</span></div>
        </div>
        <button class="logout" type="button" data-logout>${renderIcon("log-out")}<span>Sair</span></button>
      </div>
    </aside>
  `;
}

function renderCommandMenu() {
  const allowedRoutes = currentUser.role === "sdr"
    ? navItems.filter(([route]) => !["approvals", "services", "reports", "audit", "settings"].includes(route))
    : navItems;
  return `
    <div class="command-backdrop" data-close-command>
      <section class="command-menu" role="dialog" aria-modal="true" aria-label="Busca e comandos" data-command-panel>
        <div class="command-search">
          ${renderIcon("search")}
          <input type="search" data-command-search placeholder="Buscar página ou ação..." autocomplete="off" />
          <kbd>Esc</kbd>
        </div>
        <div class="command-content" data-command-content>
          <span class="command-group-label">Navegação</span>
          ${allowedRoutes.map(([route, label, icon]) => `
            <button type="button" class="command-item" data-route="${route}" data-command-keywords="${esc(`${label} ${route}`.toLowerCase())}">
              ${renderIcon(icon)}
              <span><strong>${esc(label)}</strong><small>Abrir módulo</small></span>
              ${renderIcon("arrow-up-right")}
            </button>
          `).join("")}
          <span class="command-group-label">Ações rápidas</span>
          <button type="button" class="command-item" data-new-opportunity data-command-keywords="nova oportunidade criar lead">
            ${renderIcon("plus-circle")}
            <span><strong>Nova oportunidade</strong><small>Criar registro comercial</small></span>
            <kbd>N</kbd>
          </button>
        </div>
        <div class="command-footer"><span>Digite para filtrar</span><span><kbd>Enter</kbd> abrir <kbd>Esc</kbd> fechar</span></div>
      </section>
    </div>
  `;
}

function renderRoute() {
  const routes = {
    dashboard: renderDashboard,
    approvals: renderApprovals,
    opportunities: renderOpportunities,
    progress: renderOpportunityProgress,
    contracts: renderContractsPipeline,
    payments: renderPayments,
    commissions: renderCommissions,
    projects: renderProjectsManagement,
    files: renderFiles,
    services: renderServices,
    reports: renderReportsFinance,
    audit: renderAudit,
    settings: renderSettings,
  };
  return (routes[currentRoute] || renderDashboard)();
}

function metrics() {
  const opps = visibleOpportunities();
  const contracts = state.contracts.filter((contract) => opps.some((opp) => opp.id === contract.opportunityId));
  const commissions = state.commissions.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id);
  return {
    pendingApprovals: state.opportunities.filter((item) => item.status === "pending_approval").length,
    approved: opps.filter((item) => item.status === "commercial_condition_approved").length,
    validatedSales: contracts.filter((item) => item.saleValidatedAt).length,
    activeProjects: state.projects.filter((item) => item.status === "active").length,
    commissionAvailable: commissions.filter((item) => item.status === "available").reduce((sum, item) => sum + item.amountCents, 0),
    commissionPaid: commissions.filter((item) => item.status === "paid").reduce((sum, item) => sum + item.amountCents, 0),
    cycle: commissions.filter((item) => item.status === "available").length % 5,
    revenue: state.contracts.reduce((sum, item) => sum + item.amountCents, 0),
    received: visiblePayments().filter((item) => item.status === "confirmed").reduce((sum, item) => sum + item.amountCents, 0),
  };
}

function pageHead(title, subtitle, action = "") {
  return `
    <div class="page-head">
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      ${action}
    </div>
  `;
}

function metricCard(label, value, icon = "$", progress = null) {
  return `
    <article class="card metric">
      <div class="metric-head"><span>${label}</span>${renderIcon(metricIconName(icon), "metric-icon")}</div>
      <strong>${value}</strong>
      <small>${progress === null ? "Atualizado agora" : "Progresso do ciclo"}</small>
      ${progress === null ? "" : `<div class="progress"><div style="width:${Math.min(100, progress)}%"></div></div>`}
    </article>
  `;
}

function renderDashboard() {
  const m = metrics();
  const pendingActions = state.opportunities.filter((item) =>
    currentUser.role === "admin_manager"
      ? item.status === "pending_approval"
      : item.sdrId === currentUser.id && ["draft", "needs_information", "commercial_condition_approved", "awaiting_client_response"].includes(item.status)
  );
  const pipeline = [
    ["Mapeadas", visibleOpportunities().filter((item) => ["lead_mapped", "nurturing", "first_contact"].includes(item.crmStatus)).length],
    ["Em andamento", visibleOpportunities().filter((item) => ["follow_up", "replied", "manager_meeting"].includes(item.crmStatus)).length],
    ["Em negociação", visibleOpportunities().filter((item) => ["proposal_sent_crm", "negotiating"].includes(item.crmStatus)).length],
    ["Contratos", visibleOpportunities().filter((item) => item.crmStatus === "awaiting_contract_payment").length],
    ["Concluídas", visibleOpportunities().filter((item) => item.crmStatus === "sale_completed").length],
  ];
  const recentActivity = state.auditLogs.slice(0, 4);

  return `
    ${pageHead("Dashboard Geral", `Ola, ${esc(currentUser.name)}.`)}
    <div class="grid dashboard-metrics">
      ${metricCard("Aguardando Aprovacao", m.pendingApprovals, "◴")}
      ${metricCard("Condicoes Aprovadas", m.approved, "✓")}
      ${metricCard("Vendas Validadas", m.validatedSales, "▤")}
      ${metricCard("Projetos Ativos", m.activeProjects, "▥")}
      ${metricCard("Comissao Disponivel", brl(m.commissionAvailable), "$")}
      ${metricCard("Receita Recebida", brl(m.received), "$")}
    </div>
    <div class="dashboard-overview">
      <section class="card pipeline-card">
        <div class="section-head">
          <div><h3>Pipeline comercial</h3><p>Visão rápida da jornada até a venda concluída.</p></div>
          <button class="button ghost compact-button" type="button" data-route="progress">Ver andamento ${renderIcon("arrow-right")}</button>
        </div>
        <div class="pipeline-strip">
          ${pipeline.map(([label, value], index) => `
            <div class="pipeline-step"><span>${index + 1}</span><div><strong>${value}</strong><small>${label}</small></div></div>
          `).join("")}
        </div>
      </section>
      <section class="card finance-summary-card">
        <div class="section-head"><div><h3>Resumo financeiro</h3><p>Valores consolidados do portal.</p></div></div>
        <div class="kpi-list">
          <div class="kpi-row"><span>Receita contratada</span><strong>${brl(m.revenue)}</strong></div>
          <div class="kpi-row"><span>Receita recebida</span><strong>${brl(m.received)}</strong></div>
          <div class="kpi-row"><span>Comissões geradas</span><strong>${brl(state.commissions.reduce((sum, item) => sum + item.amountCents, 0))}</strong></div>
          <div class="kpi-row"><span>Ticket médio</span><strong>${m.validatedSales ? brl(Math.round(m.revenue / m.validatedSales)) : "-"}</strong></div>
        </div>
        <button class="button secondary compact-button" type="button" data-route="reports">Abrir relatórios ${renderIcon("arrow-up-right")}</button>
      </section>
    </div>
    <div class="grid dashboard-lists">
      <section class="card">
        <div class="section-head"><div><h3>Ações pendentes</h3><p>O que precisa de atenção agora.</p></div></div>
        ${pendingActions.length ? renderOpportunityList(pendingActions.slice(0, 4)) : empty("Nenhuma ação pendente", "◌", "Quando uma oportunidade precisar da sua atenção, ela aparece aqui.")}
      </section>
      <section class="card">
        <div class="section-head"><div><h3>Atividades recentes</h3><p>Últimas movimentações da equipe.</p></div></div>
        ${recentActivity.length ? `<div class="activity-list">${recentActivity.map((item) => `<div class="activity-item">${renderIcon("history")}<div><strong>${esc(item.action || "Atualização registrada")}</strong><span>${dateLabel(item.createdAt)} · ${esc(getActorName(item.actorId))}</span></div></div>`).join("")}</div>` : empty("Nenhuma atividade recente", "◌", "As próximas atualizações aparecerão aqui.")}
      </section>
    </div>
  `;
}

function renderOpportunityList(items) {
  return `
    <div class="pending-action-list">
      ${items.map((item) => `
        <button class="pending-action-row" type="button" data-open-opportunity="${item.id}">
          <span class="pending-action-icon">${renderIcon(item.status === "draft" ? "send" : "circle-alert")}</span>
          <div>
            <strong>${esc(item.clientName)} / ${esc(item.brandName)}</strong>
            <span>${item.status === "draft" ? "Pronta para completar e pedir aprovação" : statusLabels[item.status] || item.status} · ${brl(item.suggestedAmountCents)}</span>
          </div>
          ${renderIcon("chevron-right")}
        </button>
      `).join("")}
    </div>
  `;
}

function renderApprovals() {
  const pending = state.opportunities.filter((item) => item.status === "pending_approval");
  return `
    ${pageHead("Fila de Aprovacoes", `${pending.length} solicitacao(oes) pendente(s)`)}
    ${pending.length ? opportunityTable(pending, true) : `<section class="card">${empty("Nenhuma aprovacao pendente", "◷")}</section>`}
  `;
}

function sdrUsers() {
  const users = state.users.filter((user) => user.role === "sdr");
  const commissionUserIds = state.commissions.map((item) => item.sdrId);
  const opportunityUserIds = state.opportunities.map((item) => item.sdrId);
  const ids = [...new Set([...users.map((user) => user.id), ...commissionUserIds, ...opportunityUserIds])]
    .filter((id) => id && id !== MANAGEMENT_OWNER_ID);
  return ids.map((id) => byId(state.users, id) || { id, name: getActorName(id), role: "sdr" });
}

function sdrCommissionSummary(sdrId) {
  const opportunities = state.opportunities.filter((item) => item.sdrId === sdrId);
  const contracts = state.contracts.filter((contract) => {
    const opportunity = byId(state.opportunities, contract.opportunityId);
    return opportunity?.sdrId === sdrId;
  });
  const commissions = state.commissions.filter((item) => item.sdrId === sdrId);
  const projects = state.projects.filter((project) => {
    const contract = byId(state.contracts, project.contractId);
    const opportunity = contract && byId(state.opportunities, contract.opportunityId);
    return opportunity?.sdrId === sdrId;
  });
  const batches = state.payoutBatches.filter((item) => item.sdrId === sdrId);
  const validatedContracts = contracts.filter((item) => item.saleValidatedAt);

  return {
    opportunities,
    contracts,
    commissions,
    projects,
    batches,
    openOpportunities: opportunities.filter((item) => !["client_declined", "cancelled"].includes(item.status)).length,
    approvedConditions: opportunities.filter((item) => item.status === "commercial_condition_approved").length,
    validatedSales: validatedContracts.length,
    contractedRevenueCents: validatedContracts.reduce((sum, item) => sum + item.amountCents, 0),
    availableCents: commissions.filter((item) => item.status === "available").reduce((sum, item) => sum + item.amountCents, 0),
    batchedCents: commissions.filter((item) => item.status === "batched").reduce((sum, item) => sum + item.amountCents, 0),
    paidCents: commissions.filter((item) => item.status === "paid").reduce((sum, item) => sum + item.amountCents, 0),
    totalCommissionCents: commissions.reduce((sum, item) => sum + item.amountCents, 0),
    cycleCount: commissions.filter((item) => item.status === "available").length % 5,
  };
}

function renderSdrCommissionOverview() {
  if (currentUser.role !== "admin_manager") return "";
  const rows = sdrUsers();
  return `
    <section class="sdr-commission-section">
      <div class="section-head">
        <div>
          <h3>Comissoes por SDR</h3>
          <p>Abra uma SDR para ver o dashboard detalhado de vendas, contratos, lotes e comissoes.</p>
        </div>
      </div>
      <div class="grid cards-3">
        ${rows.map((user) => {
          const summary = sdrCommissionSummary(user.id);
          return `
            <article class="card sdr-card">
              <div class="sdr-card-head">
                <span class="sdr-avatar">${esc(user.name.slice(0, 1).toUpperCase())}</span>
                <div>
                  <h4>${esc(user.name)}</h4>
                  <p>${summary.commissions.length} comissão(ões) gerada(s)</p>
                </div>
              </div>
              <div class="kpi-list">
                <div class="kpi-row"><span>Comissao total</span><strong>${brl(summary.totalCommissionCents)}</strong></div>
                <div class="kpi-row"><span>Disponivel</span><strong>${brl(summary.availableCents)}</strong></div>
                <div class="kpi-row"><span>Ciclo atual</span><strong>${summary.cycleCount} de 5</strong></div>
              </div>
              <div class="progress" aria-label="Progresso do ciclo de pagamento">
                <div style="width:${(summary.cycleCount / 5) * 100}%"></div>
              </div>
              <button class="button secondary" type="button" data-open-sdr-commissions="${user.id}">Abrir dashboard</button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderOpportunities() {
  const items = operationalOpportunities();
  return `
    ${pageHead(
      "Oportunidades",
      currentUser.role === "admin_manager" ? "Todas as oportunidades" : "Suas oportunidades"
    )}
    <div class="toolbar opportunity-toolbar">
      <label class="toolbar-search">${renderIcon("search")}<input class="search" type="search" data-search placeholder="Buscar por cliente ou marca..." /></label>
      <select data-status-filter aria-label="Filtrar status CRM">
        <option value="">Todos os status do CRM</option>
        ${Object.entries(crmStatusLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}
      </select>
      <select data-sdr-filter aria-label="Filtrar SDR">
        <option value="">Todas as SDRs</option>
        ${sdrUsers().map((user) => `<option value="${esc(user.id)}">${esc(user.name)}</option>`).join("")}
      </select>
      <input type="date" data-date-from-filter aria-label="Data inicial" />
      <input type="date" data-date-to-filter aria-label="Data final" />
      <input class="search" data-money-input data-amount-min-filter inputmode="decimal" placeholder="Valor mínimo" />
      <input class="search" data-money-input data-amount-max-filter inputmode="decimal" placeholder="Valor máximo" />
    </div>
    <div class="table-meta"><span><strong>${items.length}</strong> oportunidade(s)</span><span>${renderIcon("sliders-horizontal")} Filtros combinados</span></div>
    <div data-opportunity-table>${opportunityTable(items)}</div>
  `;
}

function renderOpportunityProgress() {
  const items = operationalOpportunities();
  return `
    ${pageHead(
      "Andamento",
      currentUser.role === "admin_manager"
        ? "Controle global do andamento das oportunidades"
        : "Controle o andamento das oportunidades que voce cadastrou"
    )}
    ${items.length ? `
      <div class="table-wrap progress-table">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>SDR</th>
              <th>Etapa</th>
              <th>Próxima ação</th>
              <th>Data</th>
              <th>Observações</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item) => `
              <tr data-progress-row="${item.id}">
                <td>
                  <strong>${esc(item.clientName)}</strong>
                  <br><span style="color:var(--muted)">${esc(item.brandName || "-")}</span>
                </td>
                <td>${esc(getActorName(item.sdrId))}</td>
                <td>
                  <select class="table-select" data-progress-crm-status>
                    ${Object.entries(crmStatusLabels).map(([key, label]) => `<option value="${key}" ${(item.crmStatus || "lead_mapped") === key ? "selected" : ""}>${label}</option>`).join("")}
                  </select>
                </td>
                <td><input data-progress-next-action value="${esc(item.nextAction || "")}" placeholder="Próxima ação" /></td>
                <td><input data-progress-next-date type="date" value="${esc(item.nextActionDate || "")}" /></td>
                <td><textarea data-progress-notes rows="2" placeholder="Observações">${esc(item.notes || "")}</textarea></td>
                <td class="row-actions">
                  <button class="button" type="button" data-save-opportunity-progress="${item.id}">Salvar</button>
                  <button class="icon-button" type="button" data-open-opportunity="${item.id}" aria-label="Ver oportunidade">👁</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhuma oportunidade para acompanhar", "→")}</section>`}
  `;
}

function opportunityTable(items, approvalMode = false) {
  if (!items.length) return `<section class="card">${empty("Nenhuma oportunidade encontrada", "▤")}</section>`;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Marca</th>
            <th>Servicos</th>
            <th>SDR</th>
            <th>Valor sugerido</th>
            <th>Status CRM</th>
            <th>Condicao</th>
            <th>Próxima ação</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td><strong>${esc(item.clientName)}</strong></td>
              <td>${esc(item.brandName && item.brandName !== item.clientName ? item.brandName : "-")}</td>
              <td>${esc(serviceNamesForOpportunity(item))}</td>
              <td>${esc(getActorName(item.sdrId))}</td>
              <td>${brl(item.suggestedAmountCents)}</td>
              <td>${crmStatusBadge(item.crmStatus)}</td>
              <td>${statusBadge(item.status)}</td>
              <td class="next-action-cell">${item.nextAction ? esc(item.nextAction) : `<span class="badge danger-soft">Sem próxima ação</span>`}</td>
              <td>${dateLabel(item.createdAt)}</td>
              <td class="row-actions opportunity-actions">
                ${approvalMode ? `<button class="button compact-button" type="button" data-open-opportunity="${item.id}">${renderIcon("badge-check")} Decidir</button>` : ""}
                <details class="row-menu">
                  <summary class="icon-button" aria-label="Ações da oportunidade">${renderIcon("ellipsis")}</summary>
                  <div class="row-menu-popover">
                    <span class="row-menu-label">Ações</span>
                    <button type="button" data-open-opportunity="${item.id}">${renderIcon("external-link")}<span><strong>Abrir oportunidade</strong><small>Ver contexto completo</small></span></button>
                    ${currentUser.role === "sdr" && item.sdrId === currentUser.id && canRequestConditionApproval(item) ? `<button type="button" data-submit-opportunity="${item.id}">${renderIcon("send")}<span><strong>Pedir aprovação</strong><small>Enviar condição ao gestor</small></span></button>` : ""}
                    <button type="button" data-archive-opportunity="${item.id}">${renderIcon("archive")}<span><strong>Arquivar</strong><small>Remover da visão ativa</small></span></button>
                    <button type="button" data-duplicate-opportunity="${item.id}">${renderIcon("copy")}<span><strong>Duplicar</strong><small>Criar a partir deste registro</small></span></button>
                    <button type="button" data-route="progress">${renderIcon("activity")}<span><strong>Atualizar andamento</strong><small>Status e próxima ação</small></span></button>
                  </div>
                </details>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderContracts() {
  const rows = state.contracts.filter((contract) => visibleOpportunities().some((opp) => opp.id === contract.opportunityId));
  return `
    ${pageHead("Contratos", "Formalizacao criada somente a partir de condicao aprovada")}
    ${rows.length ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Numero</th><th>Cliente</th><th>Valor</th><th>Status</th><th>Assinatura</th><th></th></tr></thead>
          <tbody>
            ${rows.map((item) => {
              const opp = byId(state.opportunities, item.opportunityId);
              return `
                <tr>
                  <td><strong>${item.contractNumber}</strong></td>
                  <td>${esc(opp?.clientName)}</td>
                  <td>${brl(item.amountCents)}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td>${item.signedAt ? dateLabel(item.signedAt) : "-"}</td>
                  <td class="row-actions">
                    ${item.status === "sent" && currentUser.role === "admin_manager" ? `<button class="button" data-sign-contract="${item.id}">Confirmar assinatura</button>` : ""}
                    <button class="icon-button" data-open-opportunity="${item.opportunityId}">👁</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhum contrato criado", "▣")}</section>`}
  `;
}

function renderContractsPipeline() {
  const rows = state.contracts.filter((contract) => visibleOpportunities().some((opp) => opp.id === contract.opportunityId));
  const availableRows = rows.filter((item) => ["proposal_ready", "proposal_sent", "proposal_accepted", "contract_ready"].includes(item.status)).length;
  return `
    ${pageHead(
      "Contratos",
      currentUser.role === "admin_manager"
        ? "Planejamento comercial, proposta PDF e link de contrato de todas as SDRs"
        : "Propostas e contratos das oportunidades atribuidas a voce"
    )}
    <div class="grid cards-4">
      ${metricCard("Em planejamento", rows.filter((item) => item.status === "proposal_planning").length, "▣")}
      ${metricCard("Prontos para SDR", availableRows, "✓")}
      ${metricCard("Enviados", rows.filter((item) => ["proposal_sent", "sent"].includes(item.status)).length, "↗")}
      ${metricCard("Assinados", rows.filter((item) => item.status === "signed").length, "✓")}
    </div>
    ${rows.length ? `
      <div class="table-wrap" style="margin-top:18px">
        <table>
          <thead><tr><th>Numero</th><th>Cliente</th><th>SDR</th><th>Valor</th><th>Pagamento</th><th>Proposta</th><th>Contrato</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${rows.map((item) => {
              const opp = byId(state.opportunities, item.opportunityId);
              return `
                <tr>
                  <td><strong>${esc(item.contractNumber)}</strong></td>
                  <td>${esc(opp?.clientName || "-")}</td>
                  <td>${esc(getActorName(opp?.sdrId))}</td>
                  <td>${brl(item.amountCents)}</td>
                  <td>${esc(paymentPlanLabel(item.paymentPlan))}</td>
                  <td>${item.proposalFileName ? attachmentLink(item.proposalAttachmentId, item.proposalFileName) : "-"}</td>
                  <td>${item.contractLink ? `<a href="${esc(item.contractLink)}" target="_blank" rel="noreferrer">Abrir link</a>` : "-"}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td class="row-actions">
                    ${item.status === "sent" && currentUser.role === "admin_manager" ? `<button class="button" data-sign-contract="${item.id}">Confirmar assinatura</button>` : ""}
                    <button class="button secondary" data-open-contract="${item.id}">Abrir contrato</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card" style="margin-top:18px">${empty("Nenhum contrato criado", "▣")}</section>`}
  `;
}

function renderPayments() {
  const contracts = visibleContracts();
  const rows = visiblePayments();
  const confirmed = rows.filter((item) => item.status === "confirmed").reduce((sum, item) => sum + item.amountCents, 0);
  const pending = rows.filter((item) => item.status !== "confirmed").reduce((sum, item) => sum + item.amountCents, 0);
  return `
    ${pageHead(
      "Pagamentos",
      currentUser.role === "admin_manager"
        ? "Registros informativos dos recebimentos externos vinculados a cada contrato"
        : "Registros informativos dos pagamentos externos dos seus contratos"
    )}
    <section class="card notice-card">
      <strong>Registro apenas informativo</strong>
      <p>Nenhuma cobranca, Pix, boleto, cartao ou transferencia acontece pela plataforma. Use esta area somente para registrar valores pagos fora do CRM, anexar informacoes e alimentar contratos, comissoes e relatorios.</p>
    </section>
    <div class="grid cards-3">
      ${metricCard("Recebido confirmado", brl(confirmed), "$")}
      ${metricCard("A confirmar", brl(pending), "$")}
      ${metricCard("Contratos", contracts.length, "▣")}
    </div>
    ${contracts.length ? `
      <div class="table-wrap" style="margin-top:18px">
        <table>
          <thead><tr><th>Contrato</th><th>Cliente</th><th>Valor contrato</th><th>Recebido</th><th>A confirmar</th><th>Saldo</th><th>Ultimo registro</th><th></th></tr></thead>
          <tbody>
            ${contracts.map((contract) => {
              const opp = byId(state.opportunities, contract.opportunityId);
              const summary = contractPaymentSummary(contract.id);
              const lastPayment = summary.payments[0];
              const balance = Math.max(0, contract.amountCents - summary.confirmedCents);
              return `
                <tr>
                  <td><strong>${esc(contract.contractNumber)}</strong></td>
                  <td>${esc(opp?.clientName || "-")}</td>
                  <td>${brl(contract.amountCents)}</td>
                  <td>${brl(summary.confirmedCents)}</td>
                  <td>${brl(summary.pendingCents)}</td>
                  <td>${brl(balance)}</td>
                  <td>${lastPayment ? `${brl(lastPayment.amountCents)} - ${statusLabels[lastPayment.status] || lastPayment.status}` : "-"}</td>
                  <td class="row-actions">
                    ${currentUser.role === "admin_manager" ? `<button class="button" data-register-contract-payment="${contract.id}">Registrar pagamento</button>` : ""}
                    <button class="button secondary" data-open-contract="${contract.id}">Abrir contrato</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card" style="margin-top:18px">${empty("Nenhum contrato disponivel para pagamento", "$")}</section>`}
    ${rows.length ? `
      <h3 style="margin-top:28px">Historico de pagamentos</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Contrato</th><th>Tipo</th><th>Valor</th><th>Método</th><th>Referência</th><th>Status</th><th>Data</th><th>Observação</th><th></th></tr></thead>
          <tbody>
            ${rows.map((item) => {
              const contract = byId(state.contracts, item.contractId);
              return `
                <tr>
                  <td>${esc(contract?.contractNumber || "-")}</td>
                  <td>${esc(paymentTypeLabel(item.type))}</td>
                  <td>${brl(item.amountCents)}</td>
                  <td>${esc(item.method || "-")}</td>
                  <td>${esc(item.reference || "-")}</td>
                  <td>${item.receiptFileName ? attachmentLink(item.receiptAttachmentId, item.receiptFileName) : "-"}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td>${dateLabel(item.paidAt || item.dueDate || item.createdAt)}</td>
                  <td>${esc(item.notes || "-")}</td>
                  <td class="row-actions">
                    ${item.status !== "confirmed" && currentUser.role === "admin_manager" ? `<button class="button" data-confirm-payment="${item.id}">Confirmar</button>` : ""}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : ""}
  `;
}

function paymentTypeLabel(type) {
  const labels = {
    initial: "Entrada",
    contract_payment: "Pagamento do contrato",
    installment: "Parcela",
    remaining: "Saldo restante",
    adjustment: "Ajuste",
  };
  return labels[type] || type || "-";
}

function renderPaymentTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Contrato</th><th>Tipo</th><th>Valor</th><th>Método</th><th>Referência</th><th>Comprovante</th><th>Status</th><th>Data</th><th>Observação</th><th></th></tr></thead>
        <tbody>
          ${rows.map((item) => {
            const contract = byId(state.contracts, item.contractId);
            return `
              <tr>
                <td>${esc(contract?.contractNumber || "-")}</td>
                <td>${esc(paymentTypeLabel(item.type))}</td>
                <td><strong>${brl(item.amountCents)}</strong></td>
                <td>${esc(item.method || "-")}</td>
                <td>${esc(item.reference || "-")}</td>
                <td>${item.receiptFileName ? attachmentLink(item.receiptAttachmentId, item.receiptFileName) : "-"}</td>
                <td>${statusBadge(item.status)}</td>
                <td>${dateLabel(item.paidAt || item.dueDate || item.createdAt)}</td>
                <td>${esc(item.notes || "-")}</td>
                <td class="row-actions">
                  ${item.status !== "confirmed" && currentUser.role === "admin_manager" ? `<button class="button" data-confirm-payment="${item.id}">Confirmar</button>` : ""}
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCommissions() {
  if (currentUser.role !== "admin_manager") return renderMyCommissions();

  const items = state.commissions.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id);
  const pendingPayments = commissionablePayments();
  const firstPayment = pendingPayments[0];
  const firstContract = firstPayment && byId(state.contracts, firstPayment.contractId);
  const firstOpportunity = firstContract && byId(state.opportunities, firstContract.opportunityId);
  const defaultRateBps = firstPayment ? commissionRateForPayment(firstPayment) : 1000;
  const defaultBaseCents = firstPayment ? commissionBaseCentsForPayment(firstPayment) : 0;
  const defaultAmountCents = firstPayment ? Math.round(defaultBaseCents * defaultRateBps / 10000) : 0;
  const firstSummary = firstContract ? contractPaymentSummary(firstContract.id) : null;

  return `
    ${pageHead("Comissoes", "Lancamento manual de comissoes pelo gestor")}
    <section class="card">
      <div class="section-head">
        <div>
          <h3>Registrar comissao manual</h3>
          <p>O portal mostra receita contratada, total pago e uma sugestao de regra. O gestor confere e edita a base, taxa e valor antes de lancar.</p>
        </div>
      </div>
      ${pendingPayments.length ? `
        <form class="form-grid" data-commission-form>
          <label class="field full">
            <span>Pagamento confirmado</span>
            <select name="paymentId" data-commission-payment-select required>
              ${pendingPayments.map((payment) => {
                const contract = byId(state.contracts, payment.contractId);
                const opp = contract && byId(state.opportunities, contract.opportunityId);
                const summary = contract ? contractPaymentSummary(contract.id) : { confirmedCents: 0, pendingCents: 0 };
                const rateBps = commissionRateForPayment(payment);
                const baseCents = commissionBaseCentsForPayment(payment);
                const amountCents = Math.round(baseCents * rateBps / 10000);
                return `<option value="${esc(payment.id)}" data-sdr-id="${esc(opp?.sdrId || "")}" data-rate-bps="${rateBps}" data-base-cents="${baseCents}" data-amount-cents="${amountCents}" data-contract-cents="${contract?.amountCents || 0}" data-confirmed-cents="${summary.confirmedCents}" data-pending-cents="${summary.pendingCents}" data-payment-cents="${payment.amountCents}" data-plan="${esc(paymentPlanLabel(contract?.paymentPlan))}" data-contract-number="${esc(contract?.contractNumber || "-")}">${esc(contract?.contractNumber || "-")} - ${esc(opp?.clientName || "-")} - pago ${brl(payment.amountCents)} - contratado ${brl(contract?.amountCents || 0)} - recebido ${brl(summary.confirmedCents)} - sugestao ${commissionRateLabel(rateBps)}</option>`;
              }).join("")}
            </select>
          </label>
          <div class="card-subtle full" data-commission-context>
            <div><span>Contrato</span><strong>${esc(firstContract?.contractNumber || "-")}</strong></div>
            <div><span>Receita contratada</span><strong>${brl(firstContract?.amountCents || 0)}</strong></div>
            <div><span>Total confirmado</span><strong>${brl(firstSummary?.confirmedCents || 0)}</strong></div>
            <div><span>Pagamento selecionado</span><strong>${brl(firstPayment?.amountCents || 0)}</strong></div>
            <div><span>Sugestao</span><strong>${commissionRateLabel(defaultRateBps)}</strong></div>
          </div>
          <label class="field">
            <span>SDR responsavel</span>
            <select name="sdrId" data-commission-sdr-select required>
              ${sdrUsers().map((user) => `<option value="${esc(user.id)}" ${user.id === firstOpportunity?.sdrId ? "selected" : ""}>${esc(user.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Regra de comissao</span>
            <select name="rateBps" data-commission-rate-select required>
              ${commissionRateOptions(defaultRateBps)}
            </select>
            <small>Sugestao: 10% quando o total confirmado cobre o contrato; 5% quando ainda e ciclo parcial.</small>
          </label>
          <label class="field">
            <span>Base da comissao</span>
            <input name="baseAmount" data-money-input data-commission-base-input inputmode="decimal" value="${moneyInputValue(defaultBaseCents)}" required />
          </label>
          <label class="field">
            <span>Valor da comissao</span>
            <input name="amount" data-money-input data-commission-amount-input inputmode="decimal" value="${moneyInputValue(defaultAmountCents)}" required />
            <small>O gestor pode sobrescrever antes de salvar.</small>
          </label>
          <div class="form-actions">
            <button class="button" type="submit">Registrar comissao</button>
          </div>
        </form>
      ` : empty("Nenhum pagamento confirmado pendente de comissão", "$", "Registre e confirme um pagamento em Pagamentos para liberar o lançamento manual de comissão.", `<button class="button secondary" type="button" data-route="payments">Ir para pagamentos</button>`)}
    </section>
    ${renderSdrCommissionOverview()}
    <h3 style="margin-top:28px">Comissoes Individuais</h3>
    ${items.length ? `
      <div class="table-wrap">
        <table class="commission-edit-table">
          <thead><tr><th>SDR</th><th>Contrato</th><th>Pagamento</th><th>Receita / pago</th><th>Base</th><th>Taxa</th><th>Comissao</th><th>Status</th><th>Acoes</th></tr></thead>
          <tbody>
            ${items.map((item) => {
              const contract = byId(state.contracts, item.contractId);
              const payment = item.paymentId ? byId(state.payments, item.paymentId) : null;
              const summary = contract ? contractPaymentSummary(contract.id) : { confirmedCents: 0 };
              return `
                <tr data-commission-row="${item.id}">
                  <td>
                    <select data-commission-edit-sdr>
                      ${sdrUsers().map((user) => `<option value="${esc(user.id)}" ${user.id === item.sdrId ? "selected" : ""}>${esc(user.name)}</option>`).join("")}
                    </select>
                  </td>
                  <td>${esc(contract?.contractNumber || "-")}</td>
                  <td>${payment ? `${brl(payment.amountCents)} em ${dateLabel(payment.paidAt || payment.createdAt)}` : "-"}</td>
                  <td><small>Contratado ${brl(contract?.amountCents || 0)}<br/>Recebido ${brl(summary.confirmedCents)}</small></td>
                  <td><input data-money-input data-commission-edit-base inputmode="decimal" value="${moneyInputValue(item.baseCents)}" /></td>
                  <td>
                    <select data-commission-edit-rate>
                      ${commissionRateOptions(item.rateBps)}
                    </select>
                  </td>
                  <td><input data-money-input data-commission-edit-amount inputmode="decimal" value="${moneyInputValue(item.amountCents)}" /></td>
                  <td>
                    <select data-commission-edit-status>
                      ${["available", "batched", "paid"].map((status) => `<option value="${status}" ${status === item.status ? "selected" : ""}>${statusLabels[status] || status}</option>`).join("")}
                    </select>
                  </td>
                  <td><button class="button" type="button" data-save-commission="${item.id}">Salvar</button></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhuma comissão gerada", "$", "As comissões lançadas pelo gestor aparecem aqui com base, taxa, status e contrato vinculado.")}</section>`}
    ${renderPayoutBatches()}
  `;
}

function renderMyCommissions() {
  const summary = sdrCommissionSummary(currentUser.id);
  const availableCount = summary.commissions.filter((item) => item.status === "available").length;
  const remainingToBatch = availableCount ? 5 - summary.cycleCount : 5;
  return `
    ${pageHead("Minhas Comissoes", "Sua comissao, ciclo de pagamento e historico recebido")}
    <div class="grid cards-4">
      ${metricCard("Comissao Disponivel", brl(summary.availableCents), "$")}
      ${metricCard("Ciclo de Pagamento", `${summary.cycleCount} de 5`, "", (summary.cycleCount / 5) * 100)}
      ${metricCard("Total Recebido", brl(summary.paidCents), "$")}
      ${metricCard("Em Lote", brl(summary.batchedCents), "$")}
    </div>

    <section class="card personal-commission-panel">
      <div class="section-head">
        <div>
          <h3>Resumo do ciclo atual</h3>
          <p>O ciclo fecha automaticamente a cada cinco comissoes disponiveis.</p>
        </div>
      </div>
      <div class="kpi-list">
        <div class="kpi-row"><span>Comissoes disponiveis no ciclo</span><strong>${availableCount}</strong></div>
        <div class="kpi-row"><span>Faltam para fechar o proximo lote</span><strong>${remainingToBatch} venda(s)</strong></div>
        <div class="kpi-row"><span>Comissao total gerada</span><strong>${brl(summary.totalCommissionCents)}</strong></div>
        <div class="kpi-row"><span>Vendas validadas</span><strong>${summary.validatedSales}</strong></div>
      </div>
    </section>

    <section class="card">
      <div class="section-head">
        <div>
          <h3>Minhas comissoes</h3>
          <p>Somente vendas vinculadas a ${esc(currentUser.name)} aparecem aqui.</p>
        </div>
      </div>
      ${summary.commissions.length ? renderSdrCommissionTable(summary.commissions) : empty("Nenhuma comissão gerada para você", "$", "Quando o gestor lançar uma comissão vinculada à sua venda, ela aparece aqui.")}
    </section>

    <section class="card">
      <div class="section-head">
        <div>
          <h3>Ciclos de pagamento</h3>
          <p>Lotes fechados, aguardando pagamento ou ja recebidos.</p>
        </div>
      </div>
      ${summary.batches.length ? renderSdrBatchMiniTable(summary.batches) : empty("Nenhum ciclo de pagamento criado ainda", "$")}
    </section>
  `;
}

function renderPayoutBatches(items = state.payoutBatches) {
  if (!items.length) return "";
  return `
    <h3 style="margin-top:28px">Lotes</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Lote</th><th>SDR</th><th>Itens</th><th>Total</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>#${item.sequenceNumber}</td>
              <td>${esc(getActorName(item.sdrId))}</td>
              <td>${item.commissionIds.length}</td>
              <td>${brl(item.totalAmountCents)}</td>
              <td>${statusBadge(item.status)}</td>
              <td class="row-actions">
                ${item.status !== "paid" && currentUser.role === "admin_manager" ? `<button class="button" data-pay-batch="${item.id}">Marcar pago</button>` : ""}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderProjects() {
  const items = currentUser.role === "admin_manager"
    ? state.projects
    : state.projects.filter((project) => {
      const opp = byId(state.opportunities, project.opportunityId)
        || byId(state.opportunities, byId(state.contracts, project.contractId)?.opportunityId);
      return opp?.sdrId === currentUser.id;
    });

  return `
    ${pageHead("Projetos", `${items.length} projeto(s)`)}
    ${items.length ? `
      <div class="grid cards-2">
        ${items.map((project) => `
          <article class="card">
            <div class="page-head" style="margin-bottom:14px">
              <div>
                <h3 style="margin:0">${esc(project.name)}</h3>
                <p>${esc(serviceNamesForOpportunity(byId(state.opportunities, project.opportunityId) || byId(state.opportunities, byId(state.contracts, project.contractId)?.opportunityId)))}</p>
              </div>
              ${statusBadge(project.status)}
            </div>
            <div class="stage-list">
              ${project.stages.slice(0, 6).map((stage, index) => `
                <div class="stage">
                  <span class="stage-number">${index + 1}</span>
                  <strong>${esc(stage.name)}</strong>
                  ${statusBadge(stage.status)}
                </div>
              `).join("")}
            </div>
            <div class="actions">
              <button class="button secondary" data-open-project="${project.id}">Abrir planejamento</button>
            </div>
          </article>
        `).join("")}
      </div>
    ` : `<section class="card">${empty("Nenhum projeto ainda", "▥")}<p style="text-align:center;color:var(--muted)">Projetos aparecem automaticamente quando uma condição comercial é aprovada.</p></section>`}
  `;
}

function renderProjectsManagement() {
  const items = currentUser.role === "admin_manager"
    ? state.projects
    : state.projects.filter((project) => {
      const contract = byId(state.contracts, project.contractId);
      const opp = byId(state.opportunities, project.opportunityId)
        || byId(state.opportunities, contract?.opportunityId);
      return opp?.sdrId === currentUser.id;
    });

  return `
    ${pageHead("Projetos", "Gestao de tarefas dos projetos em tabela")}
    ${items.length ? `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Projeto / servico</th>
              <th>SDR responsavel</th>
              <th>Status</th>
              <th>Etapa atual</th>
              <th>Progresso</th>
              <th>Prazo</th>
              <th>Valor</th>
              <th>Contrato</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items.map((project) => {
              const contract = byId(state.contracts, project.contractId);
              const opportunity = byId(state.opportunities, project.opportunityId)
                || byId(state.opportunities, contract?.opportunityId);
              const service = byId(state.services, project.serviceId || opportunity?.serviceId);
              const serviceLabel = opportunity ? serviceNamesForOpportunity(opportunity) : (service?.name || "-");
              const currentStage = currentProjectStage(project);
              const completed = project.stages?.filter((stage) => ["completed", "skipped"].includes(stage.status)).length || 0;
              const total = project.stages?.length || 0;
              const progress = projectProgress(project);
              return `
                <tr>
                  <td>
                    <strong>${esc(opportunity?.clientName || "-")}</strong>
                    <br><span style="color:var(--muted)">${esc(opportunity?.brandName || "-")}</span>
                  </td>
                  <td>
                    <strong>${esc(project.name || "-")}</strong>
                    <br><span style="color:var(--muted)">${esc(serviceLabel)}</span>
                  </td>
                  <td>${esc(getActorName(project.sdrId || opportunity?.sdrId))}</td>
                  <td>
                    <select class="table-select" data-project-status="${project.id}" aria-label="Status do projeto">
                      ${projectStatusOptions.map(([value, label]) => `<option value="${value}" ${project.status === value ? "selected" : ""}>${label}</option>`).join("")}
                    </select>
                  </td>
                  <td>
                    <strong>${esc(currentStage?.name || "-")}</strong>
                    <br>${currentStage ? statusBadge(currentStage.status) : ""}
                  </td>
                  <td>
                    <strong>${completed}/${total}</strong>
                    <div class="progress" aria-label="Progresso do projeto"><div style="width:${progress}%"></div></div>
                  </td>
                  <td>${dateLabel(project.targetEndAt)}</td>
                  <td>${brl(project.contractSnapshot?.amountCents || contract?.amountCents || 0)}</td>
                  <td>${esc(contract?.contractNumber || "-")}</td>
                  <td class="row-actions">
                    <button class="button secondary" type="button" data-open-project="${project.id}">Abrir tarefas</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhum projeto ainda", "â–¥")}<p style="text-align:center;color:var(--muted)">Projetos aparecem automaticamente quando a condição comercial é aprovada.</p></section>`}
  `;
}

function renderFiles() {
  const files = visibleFiles();
  const sdrOptions = sdrUsers();
  const availableBatches = state.payoutBatches.filter((batch) =>
    currentUser.role === "admin_manager" && batch.status === "paid"
  );
  return `
    ${pageHead("Arquivos", "Comprovantes dos pagamentos de comissao feitos para as SDRs")}
    <div class="grid cards-3">
      ${metricCard("Comprovantes", files.length, "▧")}
      ${metricCard("Total comprovado", brl(files.reduce((sum, item) => sum + (item.amountCents || 0), 0)), "$")}
      ${metricCard("Lotes pagos", state.payoutBatches.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id).filter((item) => item.status === "paid").length, "$")}
    </div>
    ${currentUser.role === "admin_manager" ? `
      <section class="card" style="margin-top:18px">
        <form class="form-grid" data-file-form>
          <label class="field">
            <span>Lote de comissao pago</span>
            <select name="payoutBatchId">
              <option value="">Sem lote especifico</option>
              ${availableBatches.map((batch) => `<option value="${batch.id}">#${batch.sequenceNumber} - ${esc(getActorName(batch.sdrId))} - ${brl(batch.totalAmountCents)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>SDR</span>
            <select name="delegatedSdrId" required>
              ${sdrOptions.map((user) => `<option value="${user.id}">${esc(user.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field"><span>Nome do comprovante</span><input name="name" required placeholder="Ex. Comprovante Pix lote #1" /></label>
          <label class="field"><span>Valor pago</span><input name="amount" data-money-input inputmode="decimal" placeholder="Ex. 1500,00" /></label>
          <label class="field full">
            <span>Arquivo do comprovante</span>
            <input name="receiptFile" type="file" accept="application/pdf,image/*" required />
            <small>PDF ou imagem de até 3 MB.</small>
          </label>
          <label class="field full"><span>Observação</span><textarea name="notes" placeholder="Descreva o comprovante pago para a SDR."></textarea></label>
          <div class="actions full"><button class="button" type="submit">Registrar comprovante</button></div>
        </form>
      </section>
    ` : ""}
    <div style="margin-top:18px">${files.length ? fileTable(files) : `<section class="card">${empty("Nenhum comprovante de comissao registrado", "▧")}</section>`}</div>
  `;
}

function visibleFiles() {
  const receipts = state.files.filter((item) => item.category === "commission_receipt");
  if (currentUser.role === "admin_manager") return receipts;
  return receipts.filter((item) => item.delegatedSdrId === currentUser.id);
}

function fileVisibilityLabel(item) {
  return item.visibility === "manager" ? "Restrito ao gestor" : "Delegado para SDR";
}

function fileDelegationLabel(item) {
  if (item.visibility === "manager") return "-";
  return item.delegatedSdrId ? getActorName(item.delegatedSdrId) : "SDR vinculada";
}

function fileTable(files = visibleFiles()) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Comprovante</th><th>Arquivo</th><th>SDR</th><th>Lote</th><th>Valor</th><th>Observação</th><th>Data</th></tr></thead>
        <tbody>
          ${files.map((item) => `
            <tr>
              <td><strong>${esc(item.name)}</strong></td>
              <td>${item.attachmentId ? attachmentLink(item.attachmentId, item.originalFileName || "Abrir comprovante") : "-"}</td>
              <td>${esc(fileDelegationLabel(item))}</td>
              <td>${item.payoutBatchId ? `#${esc(byId(state.payoutBatches, item.payoutBatchId)?.sequenceNumber || "-")}` : "-"}</td>
              <td>${brl(item.amountCents || 0)}</td>
              <td>${esc(item.notes)}</td>
              <td>${dateLabel(item.createdAt)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function soldServices() {
  return state.contracts
    .filter((contract) => contract.saleValidatedAt)
    .map((contract) => {
      const opportunity = byId(state.opportunities, contract.opportunityId);
      const service = opportunity && byId(state.services, opportunity.serviceId);
      const project = projectForContract(contract.id);
      return {
        id: contract.id,
        contract,
        opportunity,
        service,
        serviceLabel: serviceNamesForOpportunity(opportunity),
        project,
      };
    })
    .filter((item) => item.opportunity && item.service);
}

function currentProjectStage(project) {
  if (!project?.stages?.length) return null;
  return project.stages.find((stage) => !["completed", "skipped", "cancelled"].includes(stage.status)) || project.stages[project.stages.length - 1];
}

function projectProgress(project) {
  if (!project?.stages?.length) return 0;
  const done = project.stages.filter((stage) => ["completed", "skipped"].includes(stage.status)).length;
  return Math.round((done / project.stages.length) * 100);
}

function renderServices() {
  const items = soldServices();
  return `
    ${pageHead("Servicos", "Servicos vendidos para clientes e andamento dos projetos")}
    ${items.length ? `
      <div class="grid cards-3">
        ${items.map(renderSoldServiceCard).join("")}
      </div>
      <section class="card" style="margin-top:18px">
        <p class="section-title">Todos os servicos vendidos</p>
        ${renderSoldServicesTable(items)}
      </section>
    ` : `<section class="card">${empty("Nenhum servico vendido ainda", "◇")}<p style="text-align:center;color:var(--muted)">Quando uma venda for validada, o servico contratado aparecera aqui com o ambiente do projeto.</p></section>`}
  `;
}

function renderSoldServiceCard(item) {
  const stage = currentProjectStage(item.project);
  const progress = projectProgress(item.project);
  return `
    <article class="card sold-service-card">
      <div class="sold-service-head">
        <div>
          <h3>${esc(item.serviceLabel || item.service.name)}</h3>
          <p>${esc(item.opportunity.clientName)} / ${esc(item.opportunity.brandName)}</p>
        </div>
        ${statusBadge(item.project?.status || "active")}
      </div>
      <div class="kpi-list">
        <div class="kpi-row"><span>Contrato</span><strong>${esc(item.contract.contractNumber)}</strong></div>
        <div class="kpi-row"><span>Valor vendido</span><strong>${brl(item.contract.amountCents)}</strong></div>
        <div class="kpi-row"><span>Etapa atual</span><strong>${esc(stage?.name || "Projeto nao criado")}</strong></div>
        <div class="kpi-row"><span>Responsavel</span><strong>${esc(getActorName(item.project?.managerId || item.contract.createdBy))}</strong></div>
      </div>
      <div class="progress" aria-label="Progresso do projeto">
        <div style="width:${progress}%"></div>
      </div>
      <button class="button secondary" type="button" data-open-sold-service="${item.contract.id}">Abrir ambiente</button>
    </article>
  `;
}

function renderSoldServicesTable(items) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Cliente</th><th>Servico vendido</th><th>Contrato</th><th>Etapa atual</th><th>Projeto</th><th></th></tr></thead>
        <tbody>
          ${items.map((item) => {
            const stage = currentProjectStage(item.project);
            return `
              <tr>
                <td><strong>${esc(item.opportunity.clientName)}</strong></td>
                <td>${esc(item.serviceLabel || item.service.name)}</td>
                <td>${esc(item.contract.contractNumber)}</td>
                <td>${esc(stage?.name || "-")}</td>
                <td>${statusBadge(item.project?.status || "active")}</td>
                <td class="row-actions"><button class="button secondary" type="button" data-open-sold-service="${item.contract.id}">Abrir</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderReports() {
  const m = metrics();
  return `
    ${pageHead("Relatorios", "Indicadores operacionais e exportacao CSV")}
    <div class="grid cards-3">
      ${metricCard("Receita contratada", brl(m.revenue), "$")}
      ${metricCard("Receita recebida", brl(m.received), "$")}
      ${metricCard("Projetos ativos", m.activeProjects, "▥")}
    </div>
    <section class="card" style="margin-top:18px">
      <div class="actions" style="margin-top:0">
        <button class="button" data-export-csv="opportunities">Exportar oportunidades CSV</button>
        <button class="button secondary" data-export-csv="audit">Exportar auditoria CSV</button>
      </div>
    </section>
  `;
}

function monthlyFinanceBuckets(payments, commissions) {
  const buckets = new Map();
  const touch = (dateValue) => {
    const key = String(dateValue || nowIso()).slice(0, 7);
    if (!buckets.has(key)) buckets.set(key, { key, received: 0, commissions: 0 });
    return buckets.get(key);
  };
  payments.filter((item) => item.status === "confirmed").forEach((item) => {
    touch(item.paidAt || item.createdAt).received += item.amountCents || 0;
  });
  commissions.forEach((item) => {
    touch(item.validatedAt || item.createdAt).commissions += item.amountCents || 0;
  });
  return [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key)).slice(-6);
}

function renderFinanceChart(payments, commissions) {
  const buckets = monthlyFinanceBuckets(payments, commissions);
  if (!buckets.length) {
    return `
      <section class="card">
        <div class="section-head">
          <div>
            <h3>Tendência financeira</h3>
            <p>Receita recebida e comissões geradas nos últimos meses com registro.</p>
          </div>
        </div>
        ${empty("Sem dados para gráfico", "↗", "Registre pagamentos e comissões para visualizar tendência financeira.")}
      </section>
    `;
  }
  const max = Math.max(...buckets.map((item) => Math.max(item.received, item.commissions)), 1);
  return `
    <section class="card">
      <div class="section-head">
        <div>
          <h3>Tendência financeira</h3>
          <p>Receita recebida e comissões geradas nos últimos meses com registro.</p>
        </div>
      </div>
      <div class="finance-chart">
        ${buckets.map((item) => `
          <div class="finance-bar-group">
            <div class="finance-bars">
              <span class="finance-bar received" style="height:${Math.max(8, Math.round(item.received / max * 100))}%"></span>
              <span class="finance-bar commission" style="height:${Math.max(8, Math.round(item.commissions / max * 100))}%"></span>
            </div>
            <strong>${esc(item.key.slice(5) + "/" + item.key.slice(2, 4))}</strong>
            <small>${brl(item.received)} / ${brl(item.commissions)}</small>
          </div>
        `).join("")}
      </div>
      <div class="chart-legend"><span class="dot received"></span>Receita recebida <span class="dot commission"></span>Comissões</div>
    </section>
  `;
}

function renderReportsFinance() {
  const m = metrics();
  const payments = visiblePayments();
  const commissions = state.commissions.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id);
  const receipts = visibleFiles();
  return `
    ${pageHead("Relatorios", "Pagamentos, comissoes, comprovantes e indicadores operacionais")}
    <div class="grid cards-3">
      ${metricCard("Receita contratada", brl(m.revenue), "$")}
      ${metricCard("Receita recebida", brl(m.received), "$")}
      ${metricCard("Projetos ativos", m.activeProjects, "▥")}
    </div>
    <div class="grid cards-3" style="margin-top:16px">
      ${metricCard("Pagamentos registrados", payments.length, "$")}
      ${metricCard("Comissoes geradas", brl(commissions.reduce((sum, item) => sum + item.amountCents, 0)), "$")}
      ${metricCard("Comprovantes de comissao", receipts.length, "▧")}
    </div>
    <div style="margin-top:18px">${renderFinanceChart(payments, commissions)}</div>
    <section class="card" style="margin-top:18px">
      <div class="actions" style="margin-top:0">
        <button class="button" data-export-csv="opportunities">Exportar oportunidades CSV</button>
        <button class="button" data-export-csv="payments">Exportar pagamentos CSV</button>
        <button class="button" data-export-csv="commissions">Exportar comissoes CSV</button>
        <button class="button" data-export-csv="commission_receipts">Exportar comprovantes CSV</button>
        <button class="button secondary" data-export-csv="audit">Exportar auditoria CSV</button>
      </div>
    </section>
  `;
}

function renderAudit() {
  return `
    ${pageHead("Auditoria", "Registro append-only das acoes do sistema")}
    ${state.auditLogs.length ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Data</th><th>Usuario</th><th>Acao</th><th>Entidade</th><th>ID</th></tr></thead>
          <tbody>
            ${state.auditLogs.map((item) => `
              <tr>
                <td>${dateLabel(item.createdAt)}</td>
                <td>${esc(getActorName(item.actorUserId))}</td>
                <td><strong>${esc(item.action)}</strong></td>
                <td>${esc(item.entityType)}</td>
                <td>${esc(item.entityId)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhum log registrado", "▤")}</section>`}
  `;
}

function renderSettings() {
  return `
    ${pageHead("Configurações", "Contas, segurança e sincronização do portal")}
    <div class="settings-layout">
      <section class="card team-card">
        <div class="section-head"><div><h3>Equipe e acessos</h3><p>Crie uma conta individual para cada SDR.</p></div><span class="settings-count">${state.users.length} conta(s)</span></div>
        <div class="team-list">
          ${state.users.map((user) => `
            <article class="team-row ${user.active === false ? "is-inactive" : ""}">
              <span class="user-avatar">${esc(initials(user.name))}</span>
              <div class="team-identity"><strong>${esc(user.name)}</strong><span>${esc(user.email)}</span></div>
              <div class="team-access">
                <span class="status ${user.active === false ? "rejected" : "approved"}">${user.active === false ? "Inativa" : "Ativa"}</span>
                <span class="access-note">Acesso individual por e-mail</span>
              </div>
              <details class="account-menu">
                <summary class="icon-button" aria-label="Gerenciar ${esc(user.name)}">${renderIcon("ellipsis")}</summary>
                <div class="account-menu-panel">
                  <strong>${roleLabels[user.role]}</strong>
                  <button class="button secondary compact-button" type="button" data-send-user-recovery="${user.id}">Enviar recuperação de senha</button>
                  ${user.role === "sdr" ? `<button class="button ghost compact-button" type="button" data-toggle-user-active="${user.id}" data-active="${user.active === false ? "true" : "false"}">${user.active === false ? "Reativar conta" : "Desativar conta"}</button>` : ""}
                </div>
              </details>
            </article>
          `).join("")}
        </div>
      </section>

      <div class="settings-side">
        <section class="card">
          <div class="section-head"><div><h3>Nova conta SDR</h3><p>A SDR receberá acesso apenas às oportunidades atribuídas a ela.</p></div></div>
          <form class="form-grid settings-form" data-create-sdr-form>
            <label class="field full"><span>Nome da SDR</span><input name="name" required /></label>
            <label class="field full"><span>E-mail de acesso</span><input name="email" type="email" required /></label>
            <p class="form-note full">A SDR receberá um convite para definir a própria senha. Nenhuma senha será compartilhada pelo gestor.</p>
            <button class="button full" type="submit">${renderIcon("user-plus")} Enviar convite SDR</button>
          </form>
        </section>

        <section class="card">
          <div class="section-head"><div><h3>Alterar minha senha</h3><p>Use uma senha exclusiva para o Portal Mada.</p></div></div>
          <form class="form-grid settings-form" data-change-password-form>
            <label class="field full"><span>Senha atual</span><input name="currentPassword" type="password" required /></label>
            <label class="field full"><span>Nova senha</span><input name="newPassword" type="password" minlength="10" required /></label>
            <button class="button secondary full" type="submit">Atualizar senha</button>
          </form>
        </section>

        ${currentUser.role === "admin_manager" ? `
        <section class="card">
          <div class="section-head"><div><h3>Verificação em duas etapas</h3><p>Obrigatória para o acesso do gestor na liberação geral.</p></div></div>
          ${currentUser.mfaEnrolled ? `
            <div class="security-status is-secure">${renderIcon("shield-check")} <strong>MFA configurado</strong></div>
          ` : mfaEnrollment ? `
            <div class="mfa-enrollment">
              <img src="${esc(mfaEnrollment.qrCode)}" alt="QR Code para configurar autenticador" />
              <p>Escaneie o QR Code no autenticador e confirme o código.</p>
              <code>${esc(mfaEnrollment.secret)}</code>
              <form data-mfa-enrollment-form>
                <label class="field"><span>Código de 6 dígitos</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required /></label>
                <button class="button" type="submit">Ativar MFA</button>
              </form>
            </div>
          ` : `<button class="button secondary full" type="button" data-start-mfa>Configurar autenticador</button>`}
        </section>
        ` : ""}
      </div>
    </div>

    <div class="grid cards-2 settings-bottom">
      <section class="card">
        <div class="section-head"><div><h3>Notificações</h3><p>Movimentações que exigem atenção.</p></div></div>
        ${state.notifications.length ? `<div class="timeline">
          ${state.notifications.map((item) => `
            <div class="timeline-item">
              <span class="timeline-dot"></span>
              <div><strong>${esc(item.text)}</strong><span>${item.read ? "Lida" : "Nova"}</span></div>
            </div>
          `).join("")}
        </div>` : empty("Nenhuma notificação", "◌", "As novas solicitações aparecerão aqui.")}
        <div class="actions"><button class="button secondary" data-mark-notifications>Ler todas</button></div>
      </section>
      <section class="card sync-card">
        <div class="section-head"><div><h3>Persistência</h3><p>Dados e anexos protegidos no ambiente da Mada.</p></div>${renderIcon("database")}</div>
        <div class="detail-row"><span>Status</span><strong>${esc(supabaseSyncStatus)}</strong></div>
        <div class="detail-row"><span>Projeto</span><strong>${esc(new URL(SUPABASE_CONFIG.url).host)}</strong></div>
        <div class="detail-row"><span>Sessão</span><strong>Protegida por cookie HTTP-only</strong></div>
        <p class="form-note">O navegador mantém apenas uma cópia operacional. A fonte oficial é o banco conectado ao portal.</p>
      </section>
    </div>
  `;
}

function empty(text, icon, description = "", action = "") {
  const emptyIcon = metricIconAliases[icon] || {
    "◌": "inbox",
    "◇": "layers-3",
    "▷": "circle-check",
    "→": "activity",
  }[icon] || "inbox";
  return `
    <div class="empty">
      <div class="empty-icon">${renderIcon(emptyIcon)}</div>
      <div><strong>${esc(text)}</strong>${description ? `<p>${esc(description)}</p>` : ""}</div>
      ${action}
    </div>
  `;
}

function renderDrawer() {
  if (drawer.type === "newOpportunity") return renderNewOpportunityDrawer();
  if (drawer.type === "opportunity") return renderOpportunityDrawer(drawer.id);
  if (drawer.type === "contract") return renderContractDrawer(drawer.id);
  if (drawer.type === "paymentRecord") return renderPaymentRecordDrawer(drawer.contractId);
  if (drawer.type === "payoutPayment") return renderPayoutPaymentDrawer(drawer.id);
  if (drawer.type === "project") return renderProjectDrawer(drawer.id);
  if (drawer.type === "sdrCommissionDashboard") return renderSdrCommissionDrawer(drawer.id);
  if (drawer.type === "soldService") return renderSoldServiceDrawer(drawer.id);
  return "";
}

function renderWorkspaceShell({ title, subtitle = "", badges = "", main = "", side = "", label = "Detalhe" }) {
  return `
    <div class="drawer-backdrop workspace-backdrop" data-close-drawer>
      <aside class="drawer workspace-panel" role="dialog" aria-modal="true" aria-label="${esc(label)}" data-drawer-panel>
        <header class="drawer-head workspace-head">
          <div>
            <h3>${esc(title)}</h3>
            ${subtitle ? `<p>${subtitle}</p>` : ""}
            ${badges ? `<div class="workspace-badges">${badges}</div>` : ""}
          </div>
          <button class="icon-button" data-close-drawer type="button">x</button>
        </header>
        <div class="drawer-body workspace-body">
          <div class="workspace-layout ${side ? "" : "workspace-layout-single"}">
            <main class="workspace-main">${main}</main>
            ${side ? `<aside class="workspace-side">${side}</aside>` : ""}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function renderTimelineCard(title, items = []) {
  return `
    <section class="card">
      <p class="section-title">${esc(title)}</p>
      ${items.length ? `
        <div class="timeline">
          ${items.map((item) => `
            <div class="timeline-item">
              <span class="timeline-dot"></span>
              <div>
                <strong>${esc(item.label)}</strong>
                <span>${dateLabel(item.createdAt)} - ${esc(getActorName(item.actorId))}</span>
              </div>
            </div>
          `).join("")}
        </div>
      ` : empty("Nenhum evento registrado", "○")}
    </section>
  `;
}

function renderNewOpportunityDrawer() {
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Nova oportunidade" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>Nova Oportunidade</h3><p>Cadastre o lead no CRM e peca aprovacao da condicao quando estiver pronto.</p></div>
          <button class="icon-button" data-close-drawer type="button">×</button>
        </header>
        <form class="drawer-body" data-opportunity-form>
          ${opportunityFormFields()}
          <div class="actions">
            <button class="button secondary" type="submit" name="intent" value="draft">Salvar no CRM</button>
            ${currentUser.role === "sdr" ? `<button class="button" type="submit" name="intent" value="submit">Salvar e pedir aprovação</button>` : ""}
          </div>
        </form>
      </aside>
    </div>
  `;
}

function opportunityFormFields(opportunity = {}) {
  const selectedServiceIds = normalizeServiceIds(opportunity.serviceIds, opportunity.serviceId);
  return `
    <section class="card">
      <p class="section-title">Dados basicos</p>
      <div class="form-grid">
        <label class="field"><span>Nome do Cliente *</span><input name="clientName" required value="${esc(opportunity.clientName)}" /></label>
        <label class="field"><span>Empresa / perfil</span><input name="brandName" value="${esc(opportunity.brandName)}" /></label>
        <label class="field"><span>Instagram</span><input name="instagram" placeholder="@usuario" value="${esc(opportunity.instagram)}" /></label>
        <label class="field"><span>Site</span><input name="website" placeholder="https://" value="${esc(opportunity.website)}" /></label>
        <label class="field"><span>WhatsApp</span><input name="phone" value="${esc(opportunity.phone)}" /></label>
        <label class="field"><span>E-mail</span><input name="email" type="email" value="${esc(opportunity.email)}" /></label>
        <label class="field"><span>Segmento</span><input name="segment" value="${esc(opportunity.segment)}" /></label>
        <label class="field"><span>Cidade</span><input name="city" value="${esc(opportunity.city)}" /></label>
        <label class="field">
          <span>Origem</span>
          <select name="origin">${originChannelOptions(opportunity.origin)}</select>
        </label>
        ${currentUser.role === "sdr" ? `
          <label class="field">
            <span>Responsável</span>
            <input value="${esc(currentUser.name)}" disabled />
            <input name="sdrId" type="hidden" value="${esc(currentUser.id)}" />
            <small>Esta oportunidade ficará vinculada à sua conta.</small>
          </label>
        ` : `
          <label class="field">
            <span>Responsável</span>
            <select name="sdrId">${opportunityResponsibleOptions(opportunity.sdrId)}</select>
            <small>Escolha Gestão ou uma SDR da equipe.</small>
          </label>
        `}
        <label class="field"><span>CPF/CNPJ</span><input name="documentNumber" value="${esc(opportunity.documentNumber)}" /></label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Negocio</p>
      <div class="form-grid">
        <label class="field full"><span>O que vende</span><textarea name="businessOffer">${esc(opportunity.businessOffer)}</textarea></label>
        <label class="field full"><span>Publico</span><textarea name="targetAudience">${esc(opportunity.targetAudience)}</textarea></label>
        <label class="field">
          <span>Sinal de operação</span>
          <select class="multi-select" name="operationSignal" multiple size="5">
            ${multiSelectOptions(operationSignalOptions, opportunity.operationSignal)}
          </select>
          <small>Segure Ctrl para marcar mais de uma opção.</small>
        </label>
        <label class="field">
          <span>Momento atual</span>
          <select name="currentMoment">
            ${selectOptions(currentMomentOptions, opportunity.currentMoment, "Selecione o momento")}
          </select>
        </label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Oportunidade</p>
      <div class="form-grid">
        <div class="field full">
          <span>Servicos possiveis</span>
          <div class="check-grid">
            ${state.services.map((item) => `
              <label class="check-card">
                <input type="checkbox" name="serviceIds" value="${item.id}" ${selectedServiceIds.includes(item.id) ? "checked" : ""} />
                <span>${esc(item.name)}</span>
              </label>
            `).join("")}
          </div>
          <small>Marque uma ou mais opcoes quando a oportunidade for combo.</small>
        </div>
        <label class="field full"><span>Problema observado</span><textarea name="observedProblem">${esc(opportunity.observedProblem)}</textarea></label>
        <label class="field full"><span>Necessidade relatada</span><textarea name="reportedNeed">${esc(opportunity.reportedNeed || opportunity.clientNeed)}</textarea></label>
        <label class="field full"><span>Escopo solicitado</span><textarea name="requestedScope">${esc(opportunity.requestedScope)}</textarea></label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Qualificacao</p>
      <div class="form-grid">
        <label class="field"><span>Prazo</span><input name="expectedDeadline" type="date" value="${esc(opportunity.expectedDeadline)}" /></label>
        <label class="field"><span>Faixa de investimento</span><input name="investmentRange" placeholder="Ex. R$ 5 mil a R$ 8 mil" value="${esc(opportunity.investmentRange)}" /></label>
        <div class="field">
          <span>Contratação anterior</span>
          <div class="check-grid compact-choice-grid">
            ${["Sim", "Não"].map((option) => `
              <label class="check-card">
                <input type="radio" name="previousHiring" value="${option}" ${opportunity.previousHiring === option ? "checked" : ""} />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
        <label class="field full"><span>Urgência</span><input name="urgency" placeholder="Por que precisa agora?" value="${esc(opportunity.urgency)}" /></label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Negociacao</p>
      <div class="form-grid">
        <label class="field"><span>Valor proposto</span><input name="suggestedAmount" data-money-input inputmode="decimal" placeholder="0,00" value="${opportunity.suggestedAmountCents ? moneyInputValue(opportunity.suggestedAmountCents) : ""}" /></label>
        <label class="field"><span>Orçamento / investimento do cliente</span><input name="clientBudget" data-money-input inputmode="decimal" placeholder="0,00" value="${opportunity.clientBudgetCents ? moneyInputValue(opportunity.clientBudgetCents) : ""}" /></label>
        <label class="field"><span>Desconto (%)</span><input name="suggestedDiscount" data-percent-input inputmode="decimal" placeholder="0" value="${percentInputValue(discountPercentForOpportunity(opportunity))}" /></label>
        <label class="field"><span>Prazo sugerido</span><input name="suggestedDeadline" type="date" value="${esc(opportunity.suggestedDeadline)}" /></label>
        <label class="field full"><span>Objecoes</span><textarea name="objections">${esc(opportunity.objections)}</textarea></label>
        <label class="field full">
          <span>Condicoes solicitadas</span>
          <select name="requestedConditions">${paymentPlanOptions(opportunity.requestedConditions || opportunity.suggestedPaymentTerms)}</select>
        </label>
      </div>
    </section>
  `;
}

function renderOpportunityCrmReadOnly(opp) {
  return `
    <section class="card">
      <p class="section-title">Informacoes do CRM</p>
      <div class="detail-list">
        <div class="detail-row"><span>Instagram</span><strong>${esc(opp.instagram || "-")}</strong></div>
        <div class="detail-row"><span>Site</span><strong>${esc(opp.website || "-")}</strong></div>
        <div class="detail-row"><span>WhatsApp / e-mail</span><div>${esc([opp.phone, opp.email].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Segmento / cidade</span><div>${esc([opp.segment, opp.city].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Origem</span><strong>${esc(opp.origin || "-")}</strong></div>
        <div class="detail-row"><span>O que vende</span><div>${esc(opp.businessOffer || "-")}</div></div>
        <div class="detail-row"><span>Publico</span><div>${esc(opp.targetAudience || "-")}</div></div>
        <div class="detail-row"><span>Sinal de operação</span><div>${esc(opp.operationSignal || "-")}</div></div>
        <div class="detail-row"><span>Momento atual</span><div>${esc(opp.currentMoment || "-")}</div></div>
        <div class="detail-row"><span>Problema / necessidade</span><div>${esc([opp.observedProblem, opp.reportedNeed].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Prazo / investimento</span><div>${esc([opp.expectedDeadline, opp.investmentRange].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Contratação anterior</span><div>${esc(opp.previousHiring || "-")}</div></div>
        <div class="detail-row"><span>Urgência</span><div>${esc(opp.urgency || "-")}</div></div>
        <div class="detail-row"><span>Próxima ação</span><div>${esc([opp.nextAction, opp.nextActionDate].filter(Boolean).join(" - ") || "-")}</div></div>
      </div>
    </section>
  `;
}

function renderOpportunityWorkflow(opp, contract, payment) {
  const project = projectForOpportunity(opp.id);
  const approvalComplete = ["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"].includes(opp.status);
  const approvalCurrent = opp.status === "pending_approval" || opp.status === "needs_information";
  const stages = [
    ["CRM", true, !approvalCurrent && !approvalComplete && !contract],
    ["Aprovação", approvalComplete, approvalCurrent],
    ["Contrato", Boolean(contract), approvalComplete && !contract],
    ["Pagamento", payment?.status === "confirmed", Boolean(contract) && payment?.status !== "confirmed"],
    ["Projeto", Boolean(project), payment?.status === "confirmed" && !project],
  ];
  return `
    <section class="opportunity-workflow" aria-label="Jornada da oportunidade">
      ${stages.map(([label, complete, current], index) => `
        <div class="workflow-step ${complete ? "is-complete" : ""} ${current ? "is-current" : ""}">
          <span>${complete ? renderIcon("check") : index + 1}</span>
          <strong>${label}</strong>
        </div>
      `).join("")}
    </section>
  `;
}

function renderOpportunityDrawer(id) {
  const opp = byId(state.opportunities, id);
  if (!opp) return "";
  const condition = activeCondition(id);
  const contract = latestContract(id);
  const payment = contract ? paymentForContract(contract.id) : null;
  const canManage = currentUser.role === "admin_manager";
  const canSdrAct = currentUser.role === "sdr" && opp.sdrId === currentUser.id;
  const canEdit = canManage || canSdrAct;
  const approvalMissing = conditionApprovalMissingFields(opp);

  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Detalhe da oportunidade" data-drawer-panel>
        <header class="drawer-head">
          <div>
            <h3>${esc(opp.clientName)} / ${esc(opp.brandName)}</h3>
            <p>${crmStatusBadge(opp.crmStatus)} ${statusBadge(opp.status)}</p>
          </div>
          <button class="icon-button" data-close-drawer type="button">×</button>
        </header>
        <div class="drawer-body">
          ${renderOpportunityWorkflow(opp, contract, payment)}
          <section class="card">
            <p class="section-title">Resumo</p>
            <div class="detail-list">
              <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(opp.sdrId))}</strong></div>
              <div class="detail-row"><span>Status do CRM</span><strong>${crmStatusBadge(opp.crmStatus)}</strong></div>
              <div class="detail-row"><span>Status da condicao</span><strong>${statusBadge(opp.status)}</strong></div>
              <div class="detail-row"><span>Servicos</span><strong>${esc(serviceNamesForOpportunity(opp))}</strong></div>
              <div class="detail-row"><span>Valor sugerido</span><strong>${brl(opp.suggestedAmountCents)}</strong></div>
              <div class="detail-row"><span>Desconto</span><strong>${percentInputValue(discountPercentForOpportunity(opp))}% - ${brl(opp.suggestedDiscountCents)}</strong></div>
              <div class="detail-row"><span>Valor liquido</span><strong>${brl(netAmountAfterDiscount(opp.suggestedAmountCents, discountPercentForOpportunity(opp)))}</strong></div>
              <div class="detail-row"><span>Pagamento</span><strong>${esc(paymentPlanLabel(normalizePaymentPlan(opp.suggestedPaymentTerms || opp.requestedConditions)))}</strong></div>
              <div class="detail-row"><span>Escopo</span><div>${esc(opp.suggestedScope || opp.requestedScope)}</div></div>
            </div>
          </section>

          ${canSdrAct && canRequestConditionApproval(opp) ? `
            <section class="card opportunity-next-step">
              <div>
                <span>Próximo passo</span>
                <h3>Enviar a condição para aprovação</h3>
                <p>${approvalMissing.length ? `Complete ${esc(approvalMissing.join(", "))} antes do envio.` : "Os dados mínimos estão completos. O gestor receberá esta oportunidade na fila de aprovações."}</p>
              </div>
              <button class="button" type="button" data-submit-opportunity="${opp.id}">${renderIcon("send")} Pedir aprovação</button>
            </section>
          ` : ""}

          ${canEdit ? `
            <form data-opportunity-edit-form="${opp.id}">
              ${opportunityFormFields(opp)}
              <div class="actions opportunity-form-actions">
                <button class="button secondary" type="submit" name="intent" value="save">Salvar alterações</button>
                ${canSdrAct && canRequestConditionApproval(opp) ? `<button class="button" type="submit" name="intent" value="submit">Salvar e pedir aprovação</button>` : ""}
              </div>
            </form>
          ` : renderOpportunityCrmReadOnly(opp)}

          ${condition ? renderConditionCard(condition) : ""}
          ${contract ? renderCommercialContractCard(contract, payment) : ""}

          <section class="card">
            <p class="section-title">Acoes</p>
            <div class="actions" style="margin-top:0">
              ${canManage && opp.status === "pending_approval" ? renderApprovalActions(opp) : ""}
              ${canSdrAct && opp.status === "needs_information" ? `<button class="button" data-open-opportunity-follow="${opp.id}" data-follow-action="answer_information">Responder informações</button>` : ""}
              ${canSdrAct && ["presented_to_client", "awaiting_client_response"].includes(opp.status) ? `
                <button class="button success" data-client-accepted="${opp.id}">Cliente aceitou</button>
                <button class="button secondary" data-open-opportunity-follow="${opp.id}" data-follow-action="client_revision">Registrar revisão</button>
                <button class="button danger" data-open-opportunity-follow="${opp.id}" data-follow-action="client_declined">Cliente recusou</button>
              ` : ""}
              ${canManage && contract?.status === "sent" ? `<button class="button" data-sign-contract="${contract.id}">Confirmar assinatura</button>` : ""}
              ${canManage && payment && payment.status !== "confirmed" ? `<button class="button" data-confirm-payment="${payment.id}">Confirmar pagamento inicial</button>` : ""}
              ${canManage && contract?.status === "signed" && payment?.status === "confirmed" && !contract.saleValidatedAt ? `<button class="button success" data-validate-sale="${contract.id}">Validar venda</button>` : ""}
              ${renderOpportunityFollowForm(opp)}
            </div>
          </section>

          <section class="card">
            <p class="section-title">Timeline</p>
            <div class="timeline">
              ${opp.timeline.map((item) => `
                <div class="timeline-item">
                  <span class="timeline-dot"></span>
                  <div>
                    <strong>${esc(item.label)}</strong>
                    <span>${dateLabel(item.createdAt)} · ${esc(getActorName(item.actorId))}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        </div>
      </aside>
    </div>
  `;
}

function renderApprovalActions(opp) {
  const selectedAction = drawer?.approvalAction;
  return `
    <button class="button success" data-open-approval-action="${opp.id}" data-approval-action="approved">Aprovar sem alteracao</button>
    <button class="button" data-open-approval-action="${opp.id}" data-approval-action="approved_with_changes">Aprovar com alteracoes</button>
    <button class="button secondary" data-open-approval-action="${opp.id}" data-approval-action="needs_information">Solicitar informacoes</button>
    <button class="button danger" data-open-approval-action="${opp.id}" data-approval-action="rejected">Recusar</button>
    ${selectedAction ? renderApprovalFollowActionMenu(opp, selectedAction) : ""}
  `;
}

function renderOpportunityFollowForm(opp) {
  const action = drawer?.opportunityFollowAction;
  const configs = {
    answer_information: {
      title: "Responder solicitação do gestor",
      label: "Informações complementares",
      placeholder: "Inclua os dados pedidos e o contexto necessário para uma nova análise.",
      button: "Enviar para nova análise",
    },
    client_revision: {
      title: "Registrar revisão solicitada",
      label: "O que o cliente pediu para alterar?",
      placeholder: "Descreva a alteração de escopo, valor, prazo ou condição.",
      button: "Enviar revisão ao gestor",
    },
    client_declined: {
      title: "Registrar recusa do cliente",
      label: "Motivo da recusa",
      placeholder: "Registre o motivo para histórico e relatórios.",
      button: "Confirmar recusa",
    },
  };
  const config = configs[action];
  if (!config) return "";
  return `
    <form class="approval-follow-menu approval-follow-form" data-opportunity-follow-form="${opp.id}" data-follow-action="${action}">
      <div class="section-head"><div><h3>${config.title}</h3><p>Este registro será incluído na timeline da oportunidade.</p></div><button class="icon-button" type="button" data-clear-opportunity-follow="${opp.id}" aria-label="Fechar ação">${renderIcon("x")}</button></div>
      <label class="field"><span>${config.label}</span><textarea name="note" required placeholder="${config.placeholder}"></textarea></label>
      <div class="form-grid">
        <label class="field"><span>Próxima ação</span><input name="nextAction" value="${esc(opp.nextAction || "")}" /></label>
        <label class="field"><span>Data da próxima ação</span><input name="nextActionDate" type="date" value="${esc(opp.nextActionDate || "")}" /></label>
      </div>
      <div class="actions"><button class="button ${action === "client_declined" ? "danger" : ""}" type="submit">${config.button}</button></div>
    </form>
  `;
}

function approvalActionConfig(action) {
  const configs = {
    approved: {
      title: "Aprovar sem alteracao",
      description: "Confirme a aprovacao e defina a proxima acao do contrato.",
      button: "Confirmar aprovacao",
      requiresReason: false,
      requiresAmount: false,
      reasonLabel: "Observação da aprovação",
      defaultReason: "Aprovado sem alteracao.",
      followOptions: [
        "Abrir contrato e preparar proposta",
        "Enviar proposta para SDR",
        "Acompanhar aceite da cliente",
      ],
    },
    approved_with_changes: {
      title: "Aprovar com alteracoes",
      description: "Registre o ajuste aprovado, o novo valor final e a proxima acao.",
      button: "Aprovar com alteracoes",
      requiresReason: true,
      requiresAmount: true,
      reasonLabel: "Justificativa da alteracao",
      defaultReason: "Ajuste comercial aprovado pelo gestor.",
      followOptions: [
        "Revisar proposta com novo valor",
        "Validar ajuste com SDR",
        "Enviar proposta ajustada para cliente",
      ],
    },
    needs_information: {
      title: "Solicitar informacoes",
      description: "Explique o que a SDR precisa complementar antes da aprovacao.",
      button: "Enviar solicitacao",
      requiresReason: true,
      requiresAmount: false,
      reasonLabel: "Informacao necessaria",
      defaultReason: "Detalhar prazo, escopo e entregaveis.",
      followOptions: [
        "Aguardar complemento da SDR",
        "Revisar CRM apos complemento",
        "Reagendar analise comercial",
      ],
    },
    rejected: {
      title: "Recusar oportunidade",
      description: "Informe o motivo da recusa e como a oportunidade deve seguir.",
      button: "Confirmar recusa",
      requiresReason: true,
      requiresAmount: false,
      reasonLabel: "Justificativa da recusa",
      defaultReason: "Fora da politica comercial atual.",
      followOptions: [
        "Arquivar oportunidade",
        "Retornar para nutricao futura",
        "Registrar perda e encerrar",
      ],
    },
  };
  return configs[action] || configs.approved;
}

function renderApprovalFollowActionMenu(opp, action) {
  const config = approvalActionConfig(action);
  const discountPercent = discountPercentForOpportunity(opp);
  const suggestedNetAmountCents = netAmountAfterDiscount(opp.suggestedAmountCents, discountPercent);
  return `
    <div class="approval-follow-menu full">
      <form class="form-grid approval-follow-form" data-approval-action-form="${opp.id}" data-approval-action="${esc(action)}">
        <div class="card-subtle full">
          <div><span>Decisao</span><strong>${esc(config.title)}</strong></div>
          <div><span>Valor sugerido</span><strong>${brl(opp.suggestedAmountCents)}</strong></div>
          <div><span>Desconto</span><strong>${percentInputValue(discountPercent)}%</strong></div>
          <div><span>Valor liquido</span><strong>${brl(suggestedNetAmountCents)}</strong></div>
          <div><span>Pagamento</span><strong>${esc(paymentPlanLabel(normalizePaymentPlan(opp.suggestedPaymentTerms || opp.requestedConditions)))}</strong></div>
        </div>
        <p class="form-note full">${esc(config.description)}</p>
        ${config.requiresAmount ? `
          <label class="field">
            <span>Valor final aprovado</span>
            <input name="amount" data-money-input inputmode="decimal" value="${moneyInputValue(suggestedNetAmountCents)}" required />
          </label>
        ` : ""}
        <label class="field ${config.requiresAmount ? "" : "full"}">
          <span>Follow action</span>
          <select name="followAction" required>
            ${config.followOptions.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>Data da proxima acao</span>
          <input name="nextActionDate" type="date" value="${addDays(action === "needs_information" ? 2 : 1)}" />
        </label>
        <label class="field full">
          <span>${esc(config.reasonLabel)}${config.requiresReason ? " *" : ""}</span>
          <textarea name="reason" ${config.requiresReason ? "required" : ""}>${esc(config.defaultReason)}</textarea>
        </label>
        <div class="actions full">
          <button class="button ${action === "rejected" ? "danger" : "success"}" type="submit">${esc(config.button)}</button>
          <button class="button secondary" type="button" data-clear-approval-action="${opp.id}">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function renderConditionCard(condition) {
  const discountPercent = Number(condition.discountPercent ?? condition.discountRatePercent ?? 0);
  return `
    <section class="card">
      <p class="section-title">Condicao aprovada vigente</p>
      <div class="detail-list">
        <div class="detail-row"><span>Versao</span><strong>v${condition.versionNumber}</strong></div>
        <div class="detail-row"><span>Valor final</span><strong>${brl(condition.amountCents)}</strong></div>
        <div class="detail-row"><span>Desconto</span><strong>${discountPercent ? `${percentInputValue(discountPercent)}% - ` : ""}${brl(condition.discountCents)}</strong></div>
        <div class="detail-row"><span>Validade</span><strong>${dateLabel(condition.validUntil)}</strong></div>
        <div class="detail-row"><span>Pagamento</span><div>${esc(paymentPlanLabel(normalizePaymentPlan(condition.paymentTerms)))}</div></div>
        <div class="detail-row"><span>Entregaveis</span><div>${esc(condition.deliverables)}</div></div>
      </div>
    </section>
  `;
}

function renderContractCard(contract, payment) {
  return `
    <section class="card">
      <p class="section-title">Contrato e pagamento</p>
      <div class="detail-list">
        <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
        <div class="detail-row"><span>Status</span>${statusBadge(contract.status)}</div>
        <div class="detail-row"><span>Valor</span><strong>${brl(contract.amountCents)}</strong></div>
        <div class="detail-row"><span>Condição usada</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} · ${statusLabels[payment.status]}` : "-"}</div></div>
        <div class="detail-row"><span>Venda validada</span><strong>${contract.saleValidatedAt ? dateLabel(contract.saleValidatedAt) : "Nao"}</strong></div>
      </div>
    </section>
  `;
}

function renderCommercialContractCard(contract, payment) {
  const opp = byId(state.opportunities, contract.opportunityId);
  const canManage = currentUser.role === "admin_manager";
  const canSdrAct = currentUser.role === "sdr" && opp?.sdrId === currentUser.id;
  return `
    <section class="card">
      <p class="section-title">Proposta, contrato e pagamento</p>
      <div class="detail-list">
        <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
        <div class="detail-row"><span>Status</span>${statusBadge(contract.status)}</div>
        <div class="detail-row"><span>Valor</span><strong>${brl(contract.amountCents)}</strong></div>
        <div class="detail-row"><span>Forma</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Condição usada</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Proposta PDF</span><div>${contract.proposalFileName ? attachmentLink(contract.proposalAttachmentId, contract.proposalFileName) : "Não anexada"}</div></div>
        <div class="detail-row"><span>Link do contrato</span><div>${contract.contractLink ? `<a href="${esc(contract.contractLink)}" target="_blank" rel="noreferrer">${esc(contract.contractLink)}</a>` : "Nao informado"}</div></div>
        <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} - ${statusLabels[payment.status]}` : "-"}</div></div>
        <div class="detail-row"><span>Venda validada</span><strong>${contract.saleValidatedAt ? dateLabel(contract.saleValidatedAt) : "Nao"}</strong></div>
      </div>
      ${canManage ? `
        <form class="form-grid contract-plan-form" data-contract-plan-form="${contract.id}">
          <label class="field">
            <span>Quanto sera cobrado</span>
            <input name="amount" data-money-input inputmode="decimal" value="${moneyInputValue(contract.amountCents)}" />
          </label>
          <label class="field">
            <span>Forma de pagamento</span>
            <select name="paymentPlan">
              ${paymentPlanOptions(contract.paymentPlan)}
            </select>
          </label>
          <label class="field full">
            <span>Condicao de pagamento</span>
            <input name="paymentTerms" value="${esc(contract.paymentTerms)}" placeholder="Ex. 50% entrada + 50% entrega" />
          </label>
          <label class="field full">
            <span>Anexar proposta PDF</span>
            <input name="proposalFile" type="file" accept="application/pdf,.pdf" />
            <small>${contract.proposalFileName ? `Arquivo atual: ${esc(contract.proposalFileName)}` : "Anexe o PDF da proposta para a SDR enviar ao cliente."}</small>
          </label>
          <label class="field full">
            <span>Link do contrato</span>
            <input name="contractLink" type="url" value="${esc(contract.contractLink)}" placeholder="https://..." />
          </label>
          <div class="actions full">
            <button class="button" type="submit">Salvar planejamento</button>
          </div>
        </form>
      ` : ""}
      ${canSdrAct ? `
        <div class="actions contract-sdr-actions">
          ${contract.proposalFileName && !contract.proposalSentAt ? `<button class="button" data-send-proposal="${contract.id}">Enviar proposta para cliente</button>` : ""}
          ${contract.contractLink && contract.status === "contract_ready" ? `<button class="button" data-send-contract="${contract.id}">Enviar contrato para cliente</button>` : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function renderContractDrawer(id) {
  const contract = byId(state.contracts, id);
  if (!contract) return "";
  const opp = byId(state.opportunities, contract.opportunityId);
  const payments = paymentsForContract(contract.id);
  const payment = paymentForContract(contract.id);
  const summary = contractPaymentSummary(contract.id);
  const balance = Math.max(0, contract.amountCents - summary.confirmedCents);
  const canManage = currentUser.role === "admin_manager";
  const canSdrAct = currentUser.role === "sdr" && opp?.sdrId === currentUser.id;
  const main = `
    ${renderCommercialContractCard(contract, payment)}
    <section class="card">
      <div class="section-head">
        <div>
          <h3>Pagamentos do contrato</h3>
          <p>Todos os registros financeiros deste contrato ficam centralizados aqui.</p>
        </div>
        ${canManage ? `<button class="button" data-register-contract-payment="${contract.id}">Registrar pagamento</button>` : ""}
      </div>
      ${payments.length ? `
        ${renderPaymentTable(payments)}
      ` : empty("Nenhum pagamento registrado neste contrato", "$")}
    </section>
    ${renderTimelineCard("Historico comercial", opp?.timeline || [])}
  `;
  const side = `
    <section class="card action-panel">
      <p class="section-title">Proximas acoes</p>
      <div class="actions stacked-actions">
        ${canManage && contract.status === "sent" ? `<button class="button" data-sign-contract="${contract.id}">Confirmar assinatura</button>` : ""}
        ${canManage ? `<button class="button secondary" data-register-contract-payment="${contract.id}">Registrar pagamento</button>` : ""}
        ${canManage && payment && payment.status !== "confirmed" ? `<button class="button" data-confirm-payment="${payment.id}">Confirmar pagamento inicial</button>` : ""}
        ${canManage && contract.status === "signed" && payment?.status === "confirmed" && !contract.saleValidatedAt ? `<button class="button success" data-validate-sale="${contract.id}">Validar venda</button>` : ""}
        ${canSdrAct && contract.proposalFileName && !contract.proposalSentAt ? `<button class="button" data-send-proposal="${contract.id}">Enviar proposta para cliente</button>` : ""}
        ${canSdrAct && contract.contractLink && contract.status === "contract_ready" ? `<button class="button" data-send-contract="${contract.id}">Enviar contrato para cliente</button>` : ""}
        <button class="button secondary" data-open-opportunity="${contract.opportunityId}">Abrir CRM da oportunidade</button>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Contexto</p>
      <div class="detail-list">
        <div class="detail-row"><span>Cliente</span><strong>${esc(opp?.clientName || "-")}</strong></div>
        <div class="detail-row"><span>Marca</span><strong>${esc(opp?.brandName || "-")}</strong></div>
        <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(opp?.sdrId))}</strong></div>
        <div class="detail-row"><span>Servicos</span><div>${esc(serviceNamesForOpportunity(opp))}</div></div>
        <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
        <div class="detail-row"><span>Status</span>${statusBadge(contract.status)}</div>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Resumo financeiro</p>
      <div class="kpi-list">
        <div class="kpi-row"><span>Valor do contrato</span><strong>${brl(contract.amountCents)}</strong></div>
        <div class="kpi-row"><span>Recebido</span><strong>${brl(summary.confirmedCents)}</strong></div>
        <div class="kpi-row"><span>A confirmar</span><strong>${brl(summary.pendingCents)}</strong></div>
        <div class="kpi-row"><span>Saldo</span><strong>${brl(balance)}</strong></div>
      </div>
    </section>
  `;
  return renderWorkspaceShell({
    title: `${contract.contractNumber} - ${opp?.clientName || "Contrato"}`,
    subtitle: `${esc(paymentPlanLabel(contract.paymentPlan))} - ${brl(contract.amountCents)}`,
    badges: statusBadge(contract.status),
    label: "Workspace do contrato",
    main,
    side,
  });
}

function renderPaymentRecordDrawer(contractId) {
  const contract = byId(state.contracts, contractId);
  if (!contract) return "";
  const opp = byId(state.opportunities, contract.opportunityId);
  const summary = contractPaymentSummary(contractId);
  const suggested = Math.max(0, contract.amountCents - summary.confirmedCents) || contract.amountCents;
  const side = `
    <section class="card">
      <p class="section-title">Contexto do contrato</p>
      <div class="detail-list">
        <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
        <div class="detail-row"><span>Cliente</span><strong>${esc(opp?.clientName || "-")}</strong></div>
        <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(opp?.sdrId))}</strong></div>
        <div class="detail-row"><span>Forma</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Valor contrato</span><strong>${brl(contract.amountCents)}</strong></div>
        <div class="detail-row"><span>Recebido</span><strong>${brl(summary.confirmedCents)}</strong></div>
        <div class="detail-row"><span>A confirmar</span><strong>${brl(summary.pendingCents)}</strong></div>
      </div>
    </section>
    <section class="card notice-card">
      <strong>Nao e uma cobranca</strong>
      <p>Este formulario apenas registra informacoes de pagamentos recebidos fora da plataforma. Nenhum dinheiro, Pix, boleto ou cartao passa pelo portal.</p>
    </section>
  `;
  const main = `
    <section class="card">
      <div class="section-head">
        <div>
          <h3>Registrar pagamento externo</h3>
          <p>Use para documentar valor, data, metodo, referencia e comprovante recebido do contratante.</p>
        </div>
      </div>
      <form class="form-grid" data-payment-record-form="${contract.id}">
        <label class="field">
          <span>Valor registrado</span>
          <input name="amount" data-money-input inputmode="decimal" required value="${moneyInputValue(suggested)}" />
        </label>
        <label class="field">
          <span>Status do registro</span>
          <select name="status">
            <option value="confirmed">Confirmado / conferido</option>
            <option value="pending">Registrado, aguardando conferencia</option>
          </select>
        </label>
        <label class="field">
          <span>Tipo</span>
          <select name="type">
            <option value="contract_payment">Pagamento do contrato</option>
            <option value="initial">Entrada</option>
            <option value="installment">Parcela</option>
            <option value="remaining">Saldo restante</option>
            <option value="adjustment">Ajuste</option>
          </select>
        </label>
        <label class="field">
          <span>Metodo externo</span>
          <select name="method">
            <option>Pix</option>
            <option>Transferencia</option>
            <option>Boleto</option>
            <option>Cartao externo</option>
            <option>Dinheiro</option>
            <option>Outro</option>
          </select>
        </label>
        <label class="field">
          <span>Data do pagamento</span>
          <input name="paidAt" type="date" value="${nowIso().slice(0, 10)}" />
        </label>
        <label class="field">
          <span>Vencimento / referencia</span>
          <input name="dueDate" type="date" value="${nowIso().slice(0, 10)}" />
        </label>
        <label class="field full">
          <span>Referencia externa</span>
          <input name="reference" placeholder="Ex. ID Pix, banco, número do comprovante, nome do pagador" />
        </label>
        <label class="field full">
          <span>Comprovante ou arquivo recebido</span>
          <input name="receiptFile" type="file" />
          <small>Anexe o comprovante recebido para manter o registro baixável no portal.</small>
        </label>
        <label class="field full">
          <span>Observações internas</span>
          <textarea name="notes" placeholder="Detalhe quem enviou, onde foi recebido e qualquer informação útil para contrato, comissão e relatórios."></textarea>
        </label>
        <div class="actions full">
          <button class="button" type="submit">Salvar registro de pagamento</button>
          <button class="button secondary" type="button" data-open-contract="${contract.id}">Voltar ao contrato</button>
        </div>
      </form>
    </section>
  `;
  return renderWorkspaceShell({
    title: `Pagamento - ${contract.contractNumber}`,
    subtitle: `${esc(opp?.clientName || "Contrato")} - registro informativo`,
    label: "Registro de pagamento externo",
    main,
    side,
  });
}

function renderPayoutPaymentDrawer(id) {
  const batch = byId(state.payoutBatches, id);
  if (!batch || currentUser.role !== "admin_manager") return "";
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer payout-drawer" role="dialog" aria-modal="true" aria-label="Registrar pagamento da comissão" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>Registrar pagamento do lote #${batch.sequenceNumber}</h3><p>Este registro informa o pagamento feito fora da plataforma e disponibiliza o comprovante para a SDR.</p></div>
          <button class="icon-button" data-close-drawer type="button">×</button>
        </header>
        <form class="drawer-body" data-payout-payment-form="${batch.id}">
          <section class="card">
            <p class="section-title">Resumo do pagamento</p>
            <div class="card-subtle">
              <div><span>SDR</span><strong>${esc(getActorName(batch.sdrId))}</strong></div>
              <div><span>Comissões</span><strong>${batch.commissionIds.length}</strong></div>
              <div><span>Total</span><strong>${brl(batch.totalAmountCents)}</strong></div>
              <div><span>Status atual</span><strong>${statusLabels[batch.status] || batch.status}</strong></div>
            </div>
          </section>
          <section class="card">
            <p class="section-title">Comprovante</p>
            <div class="form-grid">
              <label class="field"><span>Identificação</span><input name="name" required value="Comprovante lote #${batch.sequenceNumber}" /></label>
              <label class="field"><span>Arquivo do comprovante</span><input name="receiptFile" type="file" accept="application/pdf,image/*" required /><small>PDF ou imagem de até 3 MB.</small></label>
              <label class="field full"><span>Observação</span><textarea name="notes">Pagamento de comissão realizado para a SDR.</textarea></label>
            </div>
          </section>
          <div class="actions"><button class="button success" type="submit">${renderIcon("check-circle-2")} Confirmar pagamento e publicar comprovante</button></div>
        </form>
      </aside>
    </div>
  `;
}

function renderProjectStatusSelect(project) {
  return `
    <label class="field">
      <span>Status geral do projeto</span>
      <select data-project-status="${project.id}">
        ${projectStatusOptions.map(([value, label]) => `<option value="${value}" ${project.status === value ? "selected" : ""}>${label}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderStageStatusSelect(projectId, stage) {
  return `
    <label class="stage-status-field">
      <span>Status</span>
      <select data-stage-status="${projectId}" data-stage-id="${stage.id}">
        ${stageStatusOptions.map(([value, label]) => `<option value="${value}" ${stage.status === value ? "selected" : ""}>${label}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderProjectDrawer(id) {
  const project = byId(state.projects, id);
  if (!project) return "";
  const opportunity = byId(state.opportunities, project.opportunityId)
    || byId(state.opportunities, byId(state.contracts, project.contractId)?.opportunityId);
  const currentStage = currentProjectStage(project);
  const progress = projectProgress(project);
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Detalhe do projeto" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>${esc(project.name)}</h3><p>${statusBadge(project.status)}</p></div>
          <button class="icon-button" data-close-drawer type="button">×</button>
        </header>
        <div class="drawer-body">
          <div class="grid cards-3">
            ${metricCard("Progresso", `${progress}%`, "", progress)}
            ${metricCard("Etapa atual", esc(currentStage?.name || "-"), "▥")}
            ${metricCard("SDR", esc(getActorName(opportunity?.sdrId)), "✓")}
          </div>
          <section class="card">
            <p class="section-title">Planejamento</p>
            <div class="form-grid">
              ${renderProjectStatusSelect(project)}
              <div class="field">
                <span>Cliente / marca</span>
                <input value="${esc(opportunity ? `${opportunity.clientName} / ${opportunity.brandName}` : "-")}" disabled />
              </div>
            </div>
          </section>
          <section class="card">
            <p class="section-title">Escolha o status de cada etapa</p>
            <div class="stage-list">
              ${project.stages.map((stage, index) => `
                <div class="stage">
                  <span class="stage-number">${index + 1}</span>
                  <div>
                    <strong>${esc(stage.name)}</strong>
                    <br><span style="color:var(--muted)">Responsavel: ${esc(getActorName(stage.responsibleManagerId))}</span>
                  </div>
                  ${renderStageStatusSelect(project.id, stage)}
                </div>
              `).join("")}
            </div>
          </section>
          <section class="card">
            <p class="section-title">Registros internos do cliente</p>
            <form class="form-grid" data-interaction-form="${project.id}">
              <label class="field"><span>Tipo</span><select name="type"><option>briefing recebido</option><option>reuniao</option><option>aprovacao</option><option>feedback</option><option>pagamento</option></select></label>
              <label class="field"><span>Canal</span><select name="channel"><option>WhatsApp</option><option>E-mail</option><option>Reuniao</option><option>Instagram</option></select></label>
              <label class="field"><span>Contato externo</span><input name="contact" placeholder="Nome do cliente" /></label>
              <label class="field"><span>Data real</span><input name="occurredAt" type="date" /></label>
              <label class="field full"><span>Resumo</span><textarea name="summary" required></textarea></label>
              <div class="actions full"><button class="button" type="submit">Registrar interacao</button></div>
            </form>
          </section>
          <section class="card">
            <p class="section-title">Timeline</p>
            <div class="timeline">
              ${project.events.map((item) => `
                <div class="timeline-item">
                  <span class="timeline-dot"></span>
                  <div><strong>${esc(item.label)}</strong><span>${dateLabel(item.createdAt)} · ${esc(getActorName(item.actorId))}</span></div>
                </div>
              `).join("")}
            </div>
          </section>
        </div>
      </aside>
    </div>
  `;
}

function renderSoldServiceDrawer(contractId) {
  const item = soldServices().find((serviceItem) => serviceItem.contract.id === contractId);
  if (!item) return "";
  const stage = currentProjectStage(item.project);
  const progress = projectProgress(item.project);
  const payment = paymentForContract(item.contract.id);
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Ambiente do servico vendido" data-drawer-panel>
        <header class="drawer-head">
          <div>
            <h3>${esc(item.serviceLabel || item.service.name)}</h3>
            <p>${esc(item.opportunity.clientName)} / ${esc(item.opportunity.brandName)}</p>
          </div>
          <button class="icon-button" data-close-drawer type="button">x</button>
        </header>
        <div class="drawer-body">
          <div class="grid cards-3">
            ${metricCard("Valor vendido", brl(item.contract.amountCents), "$")}
            ${metricCard("Progresso", `${progress}%`, "", progress)}
            ${metricCard("Etapa atual", esc(stage?.name || "-"), "▥")}
          </div>

          <section class="card">
            <p class="section-title">Ambiente do projeto</p>
            <div class="detail-list">
              <div class="detail-row"><span>Projeto</span><strong>${esc(item.project?.name || "Projeto nao criado")}</strong></div>
              <div class="detail-row"><span>Status</span>${statusBadge(item.project?.status || "active")}</div>
              <div class="detail-row"><span>Responsavel</span><strong>${esc(getActorName(item.project?.managerId || item.contract.createdBy))}</strong></div>
              <div class="detail-row"><span>Contrato</span><strong>${esc(item.contract.contractNumber)}</strong></div>
              <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} · ${statusLabels[payment.status] || payment.status}` : "-"}</div></div>
              <div class="detail-row"><span>Venda validada</span><strong>${dateLabel(item.contract.saleValidatedAt)}</strong></div>
              <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(item.opportunity.sdrId))}</strong></div>
            </div>
          </section>

          <section class="card">
            <p class="section-title">Etapas do projeto</p>
            ${item.project?.stages?.length ? `
              <div class="stage-list">
                ${item.project.stages.map((projectStage, index) => `
                  <div class="stage">
                    <span class="stage-number">${index + 1}</span>
                    <div>
                      <strong>${esc(projectStage.name)}</strong>
                      <br><span style="color:var(--muted)">Prazo: ${dateLabel(projectStage.dueAt)}</span>
                    </div>
                    ${statusBadge(projectStage.status)}
                  </div>
                `).join("")}
              </div>
            ` : empty("Projeto ainda nao criado para este servico", "▥")}
          </section>

          <section class="card">
            <p class="section-title">Timeline do projeto</p>
            ${item.project?.events?.length ? `
              <div class="timeline">
                ${item.project.events.map((eventItem) => `
                  <div class="timeline-item">
                    <span class="timeline-dot"></span>
                    <div><strong>${esc(eventItem.label)}</strong><span>${dateLabel(eventItem.createdAt)} · ${esc(getActorName(eventItem.actorId))}</span></div>
                  </div>
                `).join("")}
              </div>
            ` : empty("Nenhum evento registrado no projeto", "◌")}
          </section>
        </div>
      </aside>
    </div>
  `;
}

function renderSdrCommissionDrawer(id) {
  const user = byId(state.users, id) || { id, name: getActorName(id) };
  const summary = sdrCommissionSummary(id);
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Dashboard de comissoes por SDR" data-drawer-panel>
        <header class="drawer-head">
          <div>
            <h3>${esc(user.name)}</h3>
            <p>Dashboard detalhado de comissoes, vendas e lotes</p>
          </div>
          <button class="icon-button" data-close-drawer type="button">x</button>
        </header>
        <div class="drawer-body">
          <div class="grid cards-3">
            ${metricCard("Comissao total", brl(summary.totalCommissionCents), "$")}
            ${metricCard("Disponivel", brl(summary.availableCents), "$")}
            ${metricCard("Ciclo atual", `${summary.cycleCount} de 5`, "", (summary.cycleCount / 5) * 100)}
          </div>
          <div class="grid cards-3">
            ${metricCard("Vendas validadas", summary.validatedSales, "✓")}
            ${metricCard("Receita validada", brl(summary.contractedRevenueCents), "$")}
            ${metricCard("Projetos originados", summary.projects.length, "▥")}
          </div>

          <section class="card">
            <p class="section-title">Comissoes individuais</p>
            ${summary.commissions.length ? renderSdrCommissionTable(summary.commissions) : empty("Nenhuma comissao gerada para esta SDR", "$")}
          </section>

          <section class="card">
            <p class="section-title">Oportunidades da SDR</p>
            ${summary.opportunities.length ? renderSdrOpportunityMiniTable(summary.opportunities) : empty("Nenhuma oportunidade registrada", "▤")}
          </section>

          <section class="card">
            <p class="section-title">Lotes de pagamento</p>
            ${summary.batches.length ? renderSdrBatchMiniTable(summary.batches) : empty("Nenhum lote criado para esta SDR", "$")}
          </section>
        </div>
      </aside>
    </div>
  `;
}

function renderSdrCommissionTable(items) {
  return `
    <div class="table-wrap compact-table">
      <table>
        <thead><tr><th>Contrato</th><th>Cliente</th><th>Pagamento</th><th>Base</th><th>Taxa</th><th>Comissao</th><th>Status</th></tr></thead>
        <tbody>
          ${items.map((item) => {
            const contract = byId(state.contracts, item.contractId);
            const opportunity = contract && byId(state.opportunities, contract.opportunityId);
            const payment = item.paymentId ? byId(state.payments, item.paymentId) : null;
            return `
              <tr>
                <td>${esc(contract?.contractNumber || "-")}</td>
                <td>${esc(opportunity?.clientName || "-")}</td>
                <td>${payment ? `${brl(payment.amountCents)} em ${dateLabel(payment.paidAt || payment.createdAt)}` : "-"}</td>
                <td>${brl(item.baseCents)}</td>
                <td>${item.rateBps / 100}%</td>
                <td><strong>${brl(item.amountCents)}</strong></td>
                <td>${statusBadge(item.status)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSdrOpportunityMiniTable(items) {
  return `
    <div class="table-wrap compact-table">
      <table>
        <thead><tr><th>Cliente</th><th>Marca</th><th>Status</th><th>Valor sugerido</th><th></th></tr></thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td><strong>${esc(item.clientName)}</strong></td>
              <td>${esc(item.brandName && item.brandName !== item.clientName ? item.brandName : "-")}</td>
              <td>${statusBadge(item.status)}</td>
              <td>${brl(item.suggestedAmountCents)}</td>
              <td class="row-actions"><button class="icon-button" type="button" data-open-opportunity="${item.id}" aria-label="Ver oportunidade">👁</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSdrBatchMiniTable(items) {
  return `
    <div class="table-wrap compact-table">
      <table>
        <thead><tr><th>Lote</th><th>Itens</th><th>Total</th><th>Status</th><th>Pago em</th></tr></thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>#${item.sequenceNumber}</td>
              <td>${item.commissionIds.length}</td>
              <td>${brl(item.totalAmountCents)}</td>
              <td>${statusBadge(item.status)}</td>
              <td>${item.paidAt ? dateLabel(item.paidAt) : "-"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindAuth() {
  document.querySelector("[data-show-recovery]")?.addEventListener("click", () => {
    document.querySelector("[data-login-form]").hidden = true;
    document.querySelector("[data-recovery-form]").hidden = false;
  });
  document.querySelector("[data-back-login]")?.addEventListener("click", () => {
    document.querySelector("[data-login-form]").hidden = false;
    document.querySelector("[data-recovery-form]").hidden = true;
  });

  document.querySelector("[data-login-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const button = document.querySelector("[data-login-button]");
    const errorBox = document.querySelector("[data-auth-error]");
    button.disabled = true;
    button.textContent = "Entrando...";
    errorBox.hidden = true;
    try {
      const response = await fetch("/api/portal-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email: form.get("email"), password: form.get("password") }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Não foi possível entrar.");
      saveUser(payload.user);
      currentRoute = "dashboard";
      supabaseSyncReady = false;
      authReady = false;
      render();
      await initSupabaseSync();
      toast("Sessão iniciada com segurança.");
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.hidden = false;
      button.disabled = false;
      button.innerHTML = `Entrar ${renderIcon("arrow-right")}`;
      refreshIcons();
    }
  });

  document.querySelector("[data-recovery-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = document.querySelector("[data-recovery-message]");
    try {
      const payload = await postPortal("/api/portal-auth", { action: "recover", email: form.get("email") });
      message.textContent = payload.message;
      message.classList.add("is-success");
    } catch (error) {
      message.textContent = error.message;
      message.classList.remove("is-success");
    }
    message.hidden = false;
  });

  document.querySelector("[data-complete-recovery-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const errorBox = document.querySelector("[data-auth-error]");
    if (form.get("newPassword") !== form.get("confirmPassword")) {
      errorBox.textContent = "As senhas não coincidem.";
      errorBox.hidden = false;
      return;
    }
    const tokens = new URLSearchParams(location.hash.replace(/^#/, ""));
    try {
      await postPortal("/api/portal-auth", {
        action: "complete_recovery",
        accessToken: tokens.get("access_token"),
        refreshToken: tokens.get("refresh_token"),
        newPassword: form.get("newPassword"),
      });
      history.replaceState({}, "", `${location.pathname}${location.search.replace(/([?&])mode=recovery(&|$)/, "$1").replace(/[?&]$/, "")}`);
      await bootstrapApp();
      toast("Senha definida. Acesso liberado.");
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.hidden = false;
    }
  });
}

function bindApp() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      currentRoute = button.dataset.route;
      drawer = null;
      commandMenuOpen = false;
      mobileNavOpen = false;
      render();
    });
  });

  document.querySelector("[data-command-menu]")?.addEventListener("click", () => {
    commandMenuOpen = true;
    render();
    document.querySelector("[data-command-search]")?.focus();
  });

  document.querySelectorAll("[data-close-command]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-command-panel]")) return;
      commandMenuOpen = false;
      render();
    });
  });

  const commandSearch = document.querySelector("[data-command-search]");
  commandSearch?.addEventListener("input", () => {
    const term = commandSearch.value.trim().toLowerCase();
    document.querySelectorAll("[data-command-keywords]").forEach((item) => {
      item.hidden = term && !item.dataset.commandKeywords.includes(term);
    });
  });

  document.querySelector("[data-mobile-menu]")?.addEventListener("click", () => {
    mobileNavOpen = !mobileNavOpen;
    render();
  });

  document.querySelector("[data-workspace-switch]")?.addEventListener("change", async (event) => {
    event.currentTarget.disabled = true;
    try {
      const payload = await postPortal("/api/portal-auth", {
        action: "select_workspace",
        organizationId: event.currentTarget.value,
      });
      currentUser = payload.user;
      state = normalizeState(seedState());
      drawer = null;
      supabaseSyncReady = false;
      authReady = false;
      render();
      await initSupabaseSync();
      toast(`Ambiente alterado para ${currentUser.workspaceKind === "training" ? "Treinamento" : "Operação"}.`);
    } catch (error) {
      toast(error.message);
      render();
    }
  });

  document.querySelector("[data-logout]")?.addEventListener("click", async () => {
    try {
      await fetch("/api/portal-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      saveUser(null);
      currentUser = null;
      drawer = null;
      commandMenuOpen = false;
      supabaseSyncReady = false;
      render();
    }
  });

  document.querySelectorAll("[data-new-opportunity]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "newOpportunity" };
      commandMenuOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-open-opportunity]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "opportunity", id: button.dataset.openOpportunity };
      render();
    });
  });

  document.querySelectorAll("[data-open-contract]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "contract", id: button.dataset.openContract };
      render();
    });
  });

  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "project", id: button.dataset.openProject };
      render();
    });
  });

  document.querySelectorAll("[data-open-sdr-commissions]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "sdrCommissionDashboard", id: button.dataset.openSdrCommissions };
      render();
    });
  });

  document.querySelectorAll("[data-open-sold-service]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "soldService", id: button.dataset.openSoldService };
      render();
    });
  });

  document.querySelectorAll("[data-project-status]").forEach((select) => {
    select.addEventListener("change", () => {
      updateProjectStatus(select.dataset.projectStatus, select.value);
    });
  });

  document.querySelectorAll("[data-stage-status]").forEach((select) => {
    select.addEventListener("change", () => {
      updateProjectStageStatus(select.dataset.stageStatus, select.dataset.stageId, select.value);
    });
  });

  document.querySelectorAll("[data-crm-status]").forEach((select) => {
    select.addEventListener("change", () => {
      updateOpportunityCrmStatus(select.dataset.crmStatus, select.value);
    });
  });

  document.querySelectorAll("[data-close-drawer]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-drawer-panel]") && !event.target.matches("[data-close-drawer]")) return;
      drawer = null;
      render();
    });
  });

  bindForms();
  bindActions();
  bindFilters();

  document.onkeydown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      commandMenuOpen = !commandMenuOpen;
      render();
      document.querySelector("[data-command-search]")?.focus();
      return;
    }
    if (event.key === "Escape" && commandMenuOpen) {
      commandMenuOpen = false;
      render();
    }
  };
}

function bindForms() {
  setupValueInputs();

  document.querySelector("[data-create-sdr-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await createSdrAccount(event.currentTarget);
  });

  document.querySelectorAll("[data-send-user-recovery]").forEach((button) => {
    button.addEventListener("click", async () => sendPortalUserRecovery(button.dataset.sendUserRecovery, button));
  });

  document.querySelector("[data-change-password-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await changeCurrentPassword(event.currentTarget);
  });

  document.querySelector("[data-start-mfa]")?.addEventListener("click", async (event) => {
    event.currentTarget.disabled = true;
    try {
      mfaEnrollment = await postPortal("/api/portal-auth", { action: "mfa_enroll" });
      render();
    } catch (error) {
      toast(error.message);
      event.currentTarget.disabled = false;
    }
  });

  document.querySelector("[data-mfa-enrollment-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await postPortal("/api/portal-auth", {
        action: "mfa_verify",
        factorId: mfaEnrollment.factorId,
        code: new FormData(event.currentTarget).get("code"),
      });
      mfaEnrollment = null;
      await bootstrapApp();
      toast("Verificação em duas etapas ativada.");
    } catch (error) {
      toast(error.message);
    }
  });

  document.querySelector("[data-opportunity-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const intent = event.submitter?.value || "draft";
    createOpportunity(new FormData(event.currentTarget), intent);
  });

  document.querySelector("[data-opportunity-edit-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateOpportunityDetails(
      event.currentTarget.dataset.opportunityEditForm,
      new FormData(event.currentTarget),
      event.submitter?.value === "submit",
    );
  });

  document.querySelector("[data-approval-action-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitApprovalFollowAction(event.currentTarget.dataset.approvalActionForm, event.currentTarget);
  });

  document.querySelector("[data-opportunity-follow-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitOpportunityFollowAction(event.currentTarget.dataset.opportunityFollowForm, event.currentTarget);
  });

  document.querySelector("[data-file-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payoutBatchId = form.get("payoutBatchId");
    const batch = payoutBatchId ? byId(state.payoutBatches, payoutBatchId) : null;
    const delegatedSdrId = form.get("delegatedSdrId") || batch?.sdrId || null;
    const amountInput = form.get("amount");
    const receiptFile = form.get("receiptFile");
    let attachmentId = "";
    if (receiptFile?.name) {
      try {
        const attachment = await uploadPortalAttachment(receiptFile, { kind: "commission_receipt", payoutBatchId: payoutBatchId || null, sdrId: delegatedSdrId });
        attachmentId = attachment?.id || "";
      } catch {
        return toast("Não foi possível enviar o comprovante. Tente novamente.");
      }
    }
    const file = {
      id: uid("file"),
      category: "commission_receipt",
      name: form.get("name"),
      attachmentId,
      originalFileName: receiptFile?.name || "",
      visibility: "sdr",
      delegatedSdrId,
      payoutBatchId: payoutBatchId || null,
      amountCents: amountInput ? cents(amountInput) : (batch?.totalAmountCents || 0),
      notes: form.get("notes"),
      createdAt: nowIso(),
    };
    state.files.unshift(file);
    if (batch) batch.receipt = file.name;
    addAudit("commission_receipt_registered", "Attachment", file.id, { payoutBatchId: file.payoutBatchId, sdrId: delegatedSdrId });
    saveState();
    toast("Comprovante de comissao registrado.");
    render();
  });

  setupFileDelegationField();
  setupCommissionForm();

  document.querySelector("[data-commission-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    createCommissionFromPayment(new FormData(event.currentTarget));
  });

  document.querySelector("[data-interaction-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const project = byId(state.projects, event.currentTarget.dataset.interactionForm);
    const form = new FormData(event.currentTarget);
    project.events.unshift(event("client_interaction_recorded", `${form.get("type")} via ${form.get("channel")}: ${form.get("summary")}`, currentUser.id, {
      contact: form.get("contact"),
      occurredAt: form.get("occurredAt"),
    }));
    addAudit("client_interaction_recorded", "Project", project.id, {});
    saveState();
    toast("Interacao registrada na timeline do projeto.");
    drawer = { type: "project", id: project.id };
    render();
  });

  document.querySelector("[data-contract-plan-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveContractPlanning(event.currentTarget.dataset.contractPlanForm, event.currentTarget);
  });

  document.querySelector("[data-payment-record-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    savePaymentRecord(event.currentTarget.dataset.paymentRecordForm, event.currentTarget);
  });

  document.querySelector("[data-payout-payment-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await confirmPayoutBatchPayment(event.currentTarget.dataset.payoutPaymentForm, event.currentTarget);
  });
}

function setupFileDelegationField() {
  const visibility = document.querySelector("[data-file-visibility]");
  const field = document.querySelector("[data-sdr-delegate-field]");
  const select = document.querySelector("[data-sdr-delegate-select]");
  if (!visibility || !field || !select) return;

  const sync = () => {
    const shouldDelegate = visibility.value === "sdr";
    field.hidden = !shouldDelegate;
    select.required = shouldDelegate;
    select.disabled = !shouldDelegate;
  };

  visibility.addEventListener("change", sync);
  sync();
}

function setupValueInputs(root = document) {
  root.querySelectorAll("[data-money-input]").forEach((input) => {
    const format = () => {
      if (!String(input.value || "").trim()) return;
      input.value = moneyInputValue(cents(input.value));
    };
    const schedule = () => {
      clearTimeout(input._formatTimer);
      input._formatTimer = setTimeout(format, 450);
    };
    input.oninput = schedule;
    input.onblur = format;
    input.onchange = format;
  });

  root.querySelectorAll("[data-percent-input]").forEach((input) => {
    const format = () => {
      if (!String(input.value || "").trim()) {
        input.value = "0";
        return;
      }
      input.value = percentInputValue(percent(input.value));
    };
    const schedule = () => {
      clearTimeout(input._formatTimer);
      input._formatTimer = setTimeout(format, 450);
    };
    input.oninput = schedule;
    input.onblur = format;
    input.onchange = format;
  });
}

function setupCommissionForm() {
  const paymentSelect = document.querySelector("[data-commission-payment-select]");
  const sdrSelect = document.querySelector("[data-commission-sdr-select]");
  const rateSelect = document.querySelector("[data-commission-rate-select]");
  const baseInput = document.querySelector("[data-commission-base-input]");
  const amountInput = document.querySelector("[data-commission-amount-input]");
  const context = document.querySelector("[data-commission-context]");
  if (!paymentSelect || !sdrSelect || !rateSelect || !baseInput || !amountInput) return;

  const updateAmount = () => {
    const rateBps = Number(rateSelect.value || 0);
    const baseCents = cents(baseInput.value);
    amountInput.value = moneyInputValue(Math.round(baseCents * rateBps / 10000));
  };

  const sync = () => {
    const option = paymentSelect.selectedOptions[0];
    if (!option) return;
    if (option.dataset.sdrId) sdrSelect.value = option.dataset.sdrId;
    if (option.dataset.rateBps) rateSelect.value = option.dataset.rateBps;
    if (option.dataset.baseCents) baseInput.value = moneyInputValue(Number(option.dataset.baseCents));
    if (option.dataset.amountCents) amountInput.value = moneyInputValue(Number(option.dataset.amountCents));
    if (context) {
      context.innerHTML = `
        <div><span>Contrato</span><strong>${esc(option.dataset.contractNumber || "-")}</strong></div>
        <div><span>Receita contratada</span><strong>${brl(option.dataset.contractCents || 0)}</strong></div>
        <div><span>Total confirmado</span><strong>${brl(option.dataset.confirmedCents || 0)}</strong></div>
        <div><span>Pagamento selecionado</span><strong>${brl(option.dataset.paymentCents || 0)}</strong></div>
        <div><span>Sugestao</span><strong>${commissionRateLabel(Number(option.dataset.rateBps || 0))}</strong></div>
      `;
    }
  };

  paymentSelect.addEventListener("change", sync);
  rateSelect.addEventListener("change", updateAmount);
  baseInput.addEventListener("input", updateAmount);
  sync();
}

function bindActions() {
  action("[data-open-approval-action]", (button) => {
    drawer = { type: "opportunity", id: button.dataset.openApprovalAction, approvalAction: button.dataset.approvalAction };
    render();
  });
  action("[data-clear-approval-action]", (button) => {
    drawer = { type: "opportunity", id: button.dataset.clearApprovalAction };
    render();
  });
  action("[data-open-opportunity-follow]", (button) => {
    drawer = { type: "opportunity", id: button.dataset.openOpportunityFollow, opportunityFollowAction: button.dataset.followAction };
    render();
  });
  action("[data-clear-opportunity-follow]", (button) => {
    drawer = { type: "opportunity", id: button.dataset.clearOpportunityFollow };
    render();
  });
  action("[data-submit-opportunity]", (button) => submitOpportunity(button.dataset.submitOpportunity));
  action("[data-present-client]", (button) => presentToClient(button.dataset.presentClient));
  action("[data-client-accepted]", (button) => clientAccepted(button.dataset.clientAccepted));
  action("[data-create-contract]", (button) => createContract(button.dataset.createContract));
  action("[data-send-proposal]", (button) => sendProposal(button.dataset.sendProposal));
  action("[data-send-contract]", (button) => sendContract(button.dataset.sendContract));
  action("[data-sign-contract]", (button) => signContract(button.dataset.signContract));
  action("[data-register-contract-payment]", (button) => registerContractPayment(button.dataset.registerContractPayment));
  action("[data-confirm-payment]", (button) => confirmPayment(button.dataset.confirmPayment));
  action("[data-validate-sale]", (button) => validateSale(button.dataset.validateSale));
  action("[data-save-opportunity-progress]", (button) => updateOpportunityProgress(button.dataset.saveOpportunityProgress, button.closest("[data-progress-row]")));
  action("[data-duplicate-opportunity]", (button) => duplicateOpportunity(button.dataset.duplicateOpportunity));
  action("[data-archive-opportunity]", (button) => archiveOpportunity(button.dataset.archiveOpportunity));
  action("[data-save-commission]", (button) => updateCommission(button.dataset.saveCommission, button.closest("[data-commission-row]")));
  action("[data-pay-batch]", (button) => payBatch(button.dataset.payBatch));
  action("[data-export-csv]", (button) => exportCsv(button.dataset.exportCsv));
  action("[data-mark-notifications]", () => {
    state.notifications.forEach((item) => item.read = true);
    saveState();
    render();
  });
  action("[data-toggle-user-active]", (button) => togglePortalUser(button.dataset.toggleUserActive, button.dataset.active === "true"));
}

function action(selector, handler) {
  document.querySelectorAll(selector).forEach((button) => button.addEventListener("click", () => handler(button)));
}

async function postPortal(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Não foi possível concluir a ação.");
  return body;
}

async function postWorkflow(payload) {
  return postPortal("/api/portal-workflow", payload);
}

function setFormBusy(form, busy) {
  form.querySelectorAll("button, input, select, textarea").forEach((control) => control.disabled = busy);
}

async function createSdrAccount(form) {
  setFormBusy(form, true);
  const data = new FormData(form);
  try {
    await postPortal("/api/portal-users", {
      action: "invite",
      name: data.get("name"),
      email: data.get("email"),
    });
    form.reset();
    toast("Convite enviado para a SDR definir a própria senha.");
    await initSupabaseSync();
  } catch (error) {
    toast(error.message);
    setFormBusy(form, false);
  }
}

async function sendPortalUserRecovery(userId, button) {
  button.disabled = true;
  try {
    await postPortal("/api/portal-users", { action: "send_recovery", userId });
    toast("E-mail de recuperação enviado.");
  } catch (error) {
    toast(error.message);
  } finally {
    button.disabled = false;
  }
}

async function togglePortalUser(userId, active) {
  try {
    await postPortal("/api/portal-users", { action: "toggle_active", userId, active });
    toast(active ? "Conta reativada." : "Conta desativada.");
    await initSupabaseSync();
  } catch (error) {
    toast(error.message);
  }
}

async function changeCurrentPassword(form) {
  setFormBusy(form, true);
  const data = new FormData(form);
  try {
    await postPortal("/api/portal-auth", {
      action: "change_password",
      currentPassword: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
    });
    form.reset();
    toast("Sua senha foi atualizada.");
  } catch (error) {
    toast(error.message);
  } finally {
    setFormBusy(form, false);
  }
}

function bindFilters() {
  const search = document.querySelector("[data-search]");
  const filter = document.querySelector("[data-status-filter]");
  const sdrFilter = document.querySelector("[data-sdr-filter]");
  const dateFromFilter = document.querySelector("[data-date-from-filter]");
  const dateToFilter = document.querySelector("[data-date-to-filter]");
  const amountMinFilter = document.querySelector("[data-amount-min-filter]");
  const amountMaxFilter = document.querySelector("[data-amount-max-filter]");
  if (!search || !filter) return;
  const update = () => {
    const term = search.value.trim().toLowerCase();
    const crmStatus = filter.value;
    const sdrId = sdrFilter?.value || "";
    const from = dateFromFilter?.value || "";
    const to = dateToFilter?.value || "";
    const min = amountMinFilter?.value ? cents(amountMinFilter.value) : 0;
    const max = amountMaxFilter?.value ? cents(amountMaxFilter.value) : 0;
    const items = operationalOpportunities().filter((item) => {
      const matchesTerm = !term || `${item.clientName} ${item.brandName}`.toLowerCase().includes(term);
      const matchesStatus = !crmStatus || item.crmStatus === crmStatus;
      const createdDate = String(item.createdAt || "").slice(0, 10);
      const matchesSdr = !sdrId || item.sdrId === sdrId;
      const matchesFrom = !from || createdDate >= from;
      const matchesTo = !to || createdDate <= to;
      const matchesMin = !min || item.suggestedAmountCents >= min;
      const matchesMax = !max || item.suggestedAmountCents <= max;
      return matchesTerm && matchesStatus && matchesSdr && matchesFrom && matchesTo && matchesMin && matchesMax;
    });
    const tableRegion = document.querySelector("[data-opportunity-table]");
    tableRegion.innerHTML = opportunityTable(items);
    tableRegion.querySelectorAll("[data-open-opportunity]").forEach((button) => button.addEventListener("click", () => {
      drawer = { type: "opportunity", id: button.dataset.openOpportunity };
      render();
    }));
    tableRegion.querySelectorAll("[data-duplicate-opportunity]").forEach((button) => button.addEventListener("click", () => duplicateOpportunity(button.dataset.duplicateOpportunity)));
    tableRegion.querySelectorAll("[data-archive-opportunity]").forEach((button) => button.addEventListener("click", () => archiveOpportunity(button.dataset.archiveOpportunity)));
    tableRegion.querySelectorAll("[data-submit-opportunity]").forEach((button) => button.addEventListener("click", () => submitOpportunity(button.dataset.submitOpportunity)));
    tableRegion.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => {
      currentRoute = button.dataset.route;
      render();
    }));
    refreshIcons();
  };
  search.addEventListener("input", update);
  filter.addEventListener("change", update);
  sdrFilter?.addEventListener("change", update);
  dateFromFilter?.addEventListener("change", update);
  dateToFilter?.addEventListener("change", update);
  amountMinFilter?.addEventListener("change", update);
  amountMaxFilter?.addEventListener("change", update);
}

function createOpportunity(form, intent) {
  if (intent === "submit" && currentUser.role !== "sdr") intent = "draft";
  const id = uid("opp");
  const serviceIds = normalizeServiceIds(form.getAll("serviceIds"), state.services[0]?.id);
  const suggestedAmountCents = cents(form.get("suggestedAmount"));
  if (intent === "submit" && suggestedAmountCents <= 0) return toast("Informe o valor proposto antes de pedir aprovação.");
  const suggestedDiscountPercent = percent(form.get("suggestedDiscount"));
  const requestedPaymentPlan = normalizePaymentPlan(form.get("requestedConditions"));
  const opp = {
    id,
    organizationId: "org-mada",
    sdrId: responsibleIdFromForm(form),
    clientName: form.get("clientName"),
    brandName: form.get("brandName") || form.get("clientName"),
    phone: form.get("phone"),
    email: form.get("email"),
    instagram: form.get("instagram"),
    website: form.get("website"),
    segment: form.get("segment"),
    city: form.get("city"),
    origin: form.get("origin"),
    documentNumber: form.get("documentNumber"),
    serviceId: serviceIds[0],
    serviceIds,
    businessOffer: form.get("businessOffer"),
    targetAudience: form.get("targetAudience"),
    operationSignal: multiChoiceValue(form, "operationSignal"),
    currentMoment: form.get("currentMoment"),
    observedProblem: form.get("observedProblem"),
    reportedNeed: form.get("reportedNeed"),
    clientNeed: form.get("reportedNeed"),
    requestedScope: form.get("requestedScope"),
    expectedDeadline: form.get("expectedDeadline"),
    investmentRange: form.get("investmentRange"),
    decisionMaker: "",
    previousHiring: form.get("previousHiring"),
    urgency: form.get("urgency"),
    clientBudgetCents: cents(form.get("clientBudget")),
    suggestedAmountCents,
    suggestedDiscountPercent,
    suggestedDiscountCents: discountCentsFromPercent(suggestedAmountCents, suggestedDiscountPercent),
    suggestedScope: form.get("requestedScope"),
    suggestedDeliverables: "",
    suggestedDeadline: form.get("suggestedDeadline"),
    requestedConditions: requestedPaymentPlan,
    suggestedPaymentTerms: requestedPaymentPlan,
    objections: form.get("objections"),
    lossReason: "",
    nextAction: "",
    nextActionDate: "",
    notes: "",
    crmStatus: "lead_mapped",
    status: intent === "submit" ? "pending_approval" : "draft",
    createdAt: nowIso(),
    updatedAt: nowIso(),
    timeline: [event(intent === "submit" ? "opportunity_submitted" : "opportunity_created", intent === "submit" ? "Pedido de aprovacao da condicao enviado" : "Oportunidade salva no CRM", currentUser.id)],
  };
  state.opportunities.unshift(opp);
  addAudit(opp.status === "pending_approval" ? "opportunity_submitted" : "opportunity_created", "Opportunity", opp.id, {});
  if (opp.status === "pending_approval") addNotification(`Nova solicitação enviada por ${getActorName(opp.sdrId)}.`, { recipientRole: "admin_manager" });
  saveState();
  drawer = { type: "opportunity", id };
  toast(opp.status === "pending_approval" ? "Pedido de aprovacao enviado." : "Oportunidade salva no CRM.");
  render();
}

function mutateOpportunity(id, status, label, actionName, meta = {}) {
  const opp = byId(state.opportunities, id);
  if (!opp) return null;
  opp.status = status;
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event(actionName, label, currentUser.id, meta));
  addAudit(actionName, "Opportunity", id, meta);
  saveState();
  return opp;
}

function updateOpportunityDetails(id, form, requestApproval = false) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nao encontrada.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nao pode editar esta oportunidade.");
  opp.clientName = form.get("clientName");
  opp.brandName = form.get("brandName") || form.get("clientName");
  opp.phone = form.get("phone");
  opp.email = form.get("email");
  opp.instagram = form.get("instagram");
  opp.website = form.get("website");
  opp.segment = form.get("segment");
  opp.city = form.get("city");
  opp.origin = form.get("origin");
  opp.sdrId = responsibleIdFromForm(form);
  opp.documentNumber = form.get("documentNumber");
  opp.serviceIds = normalizeServiceIds(form.getAll("serviceIds"), opp.serviceId);
  opp.serviceId = opp.serviceIds[0] || opp.serviceId;
  opp.businessOffer = form.get("businessOffer");
  opp.targetAudience = form.get("targetAudience");
  opp.operationSignal = multiChoiceValue(form, "operationSignal");
  opp.currentMoment = form.get("currentMoment");
  opp.observedProblem = form.get("observedProblem");
  opp.reportedNeed = form.get("reportedNeed");
  opp.clientNeed = form.get("reportedNeed");
  opp.requestedScope = form.get("requestedScope");
  opp.expectedDeadline = form.get("expectedDeadline");
  opp.investmentRange = form.get("investmentRange");
  opp.decisionMaker = "";
  opp.previousHiring = form.get("previousHiring");
  opp.urgency = form.get("urgency");
  const suggestedAmountCents = cents(form.get("suggestedAmount"));
  const suggestedDiscountPercent = percent(form.get("suggestedDiscount"));
  const requestedPaymentPlan = normalizePaymentPlan(form.get("requestedConditions"));
  opp.clientBudgetCents = cents(form.get("clientBudget"));
  opp.suggestedAmountCents = suggestedAmountCents;
  opp.suggestedDiscountPercent = suggestedDiscountPercent;
  opp.suggestedDiscountCents = discountCentsFromPercent(suggestedAmountCents, suggestedDiscountPercent);
  opp.suggestedScope = opp.suggestedScope || opp.requestedScope;
  opp.suggestedDeliverables = opp.suggestedDeliverables || "";
  opp.suggestedDeadline = form.get("suggestedDeadline");
  opp.requestedConditions = requestedPaymentPlan;
  opp.suggestedPaymentTerms = requestedPaymentPlan;
  opp.objections = form.get("objections");
  opp.lossReason = opp.lossReason || "";
  opp.nextAction = opp.nextAction || "";
  opp.nextActionDate = opp.nextActionDate || "";
  opp.notes = opp.notes || "";
  opp.crmStatus = opp.crmStatus || "lead_mapped";
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("opportunity_crm_updated", "Informacoes do CRM atualizadas", currentUser.id));
  addAudit("opportunity_crm_updated", "Opportunity", id, { crmStatus: opp.crmStatus });
  saveState();
  if (requestApproval) {
    submitOpportunity(id);
    return;
  }
  toast("Informacoes do CRM salvas.");
  drawer = { type: "opportunity", id };
  render();
}

function updateOpportunityCrmStatus(id, crmStatus) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nao encontrada.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nao pode alterar esta oportunidade.");
  if (!crmStatusLabels[crmStatus] || opp.crmStatus === crmStatus) return;
  const previousStatus = opp.crmStatus || "lead_mapped";
  opp.crmStatus = crmStatus;
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("crm_status_updated", `Status CRM alterado de ${crmStatusLabels[previousStatus] || previousStatus} para ${crmStatusLabels[crmStatus]}`, currentUser.id, { previousStatus, crmStatus }));
  addAudit("crm_status_updated", "Opportunity", id, { previousStatus, crmStatus });
  saveState();
  toast("Status do CRM atualizado.");
  drawer = { type: "opportunity", id };
  render();
}

function updateOpportunityProgress(id, row) {
  const opp = byId(state.opportunities, id);
  if (!opp || !row) return toast("Oportunidade nao encontrada.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nao pode alterar esta oportunidade.");

  const crmStatus = row.querySelector("[data-progress-crm-status]")?.value || "lead_mapped";
  if (!crmStatusLabels[crmStatus]) return toast("Selecione uma etapa valida.");

  const previousStatus = opp.crmStatus || "lead_mapped";
  opp.crmStatus = crmStatus;
  opp.nextAction = String(row.querySelector("[data-progress-next-action]")?.value || "").trim();
  opp.nextActionDate = row.querySelector("[data-progress-next-date]")?.value || "";
  opp.notes = String(row.querySelector("[data-progress-notes]")?.value || "").trim();
  opp.updatedAt = nowIso();

  if (previousStatus !== crmStatus) {
    opp.timeline.unshift(event("crm_status_updated", `Status CRM alterado de ${crmStatusLabels[previousStatus] || previousStatus} para ${crmStatusLabels[crmStatus]}`, currentUser.id, { previousStatus, crmStatus }));
  }
  opp.timeline.unshift(event("opportunity_progress_updated", "Andamento da oportunidade atualizado", currentUser.id, {
    crmStatus,
    nextAction: opp.nextAction,
    nextActionDate: opp.nextActionDate,
  }));
  addAudit("opportunity_progress_updated", "Opportunity", id, { crmStatus, nextActionDate: opp.nextActionDate });
  saveState();
  toast("Andamento da oportunidade salvo.");
  render();
}

function duplicateOpportunity(id) {
  const source = byId(state.opportunities, id);
  if (!source) return toast("Oportunidade não encontrada.");
  const copy = {
    ...structuredClone(source),
    id: uid("opp"),
    clientName: `${source.clientName} (cópia)`,
    brandName: source.brandName === source.clientName ? `${source.brandName} (cópia)` : source.brandName,
    status: "draft",
    conditionStatus: "draft",
    crmStatus: "lead_mapped",
    nextAction: "",
    nextActionDate: "",
    createdAt: nowIso(),
    updatedAt: nowIso(),
    timeline: [event("opportunity_duplicated", `Oportunidade duplicada a partir de ${source.clientName}`, currentUser.id, { sourceId: id })],
  };
  state.opportunities.unshift(copy);
  addAudit("opportunity_duplicated", "Opportunity", copy.id, { sourceId: id });
  saveState();
  toast("Oportunidade duplicada como rascunho.");
  drawer = { type: "opportunity", id: copy.id };
  render();
}

function archiveOpportunity(id) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade não encontrada.");
  if (!confirm(`Arquivar a oportunidade ${opp.clientName}?`)) return;
  opp.status = "cancelled";
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("opportunity_archived", "Oportunidade arquivada", currentUser.id));
  addAudit("opportunity_archived", "Opportunity", id, {});
  saveState();
  toast("Oportunidade arquivada.");
  render();
}

async function submitOpportunity(id) {
  const current = byId(state.opportunities, id);
  if (currentUser.role !== "sdr" || current?.sdrId !== currentUser.id) return toast("Apenas a SDR responsável pode pedir a aprovação.");
  if (!canRequestConditionApproval(current)) return toast("Esta oportunidade nao pode ser enviada para aprovacao neste status.");
  const missing = conditionApprovalMissingFields(current);
  if (supabaseSyncReady) {
    try {
      await saveState();
      await postWorkflow({
        action: "request_approval",
        opportunityId: id,
        expectedVersion: Number(current._version || 1),
      });
      await initSupabaseSync();
      toast("Pedido de aprovacao enviado para a fila do gestor.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  if (missing.length) return toast(`Complete ${missing.join(", ")} antes de pedir aprovação.`);
  const opp = mutateOpportunity(id, "pending_approval", "Pedido de aprovacao da condicao enviado", "opportunity_submitted");
  if (!opp) return;
  addNotification(`Nova solicitação enviada por ${getActorName(opp.sdrId)}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Pedido de aprovacao enviado para a fila do gestor.");
  render();
}

function submitApprovalFollowAction(id, formElement) {
  const form = new FormData(formElement);
  const action = formElement.dataset.approvalAction;
  const payload = {
    reason: String(form.get("reason") || "").trim(),
    followAction: String(form.get("followAction") || "").trim(),
    nextActionDate: form.get("nextActionDate") || "",
    amountCents: form.get("amount") ? cents(form.get("amount")) : null,
  };

  if (action === "approved" || action === "approved_with_changes") return approveOpportunity(id, action, payload);
  if (action === "needs_information") return needsInformation(id, payload);
  if (action === "rejected") return rejectOpportunity(id, payload);
  return toast("Acao invalida.");
}

function submitOpportunityFollowAction(id, formElement) {
  const form = new FormData(formElement);
  const action = formElement.dataset.followAction;
  const note = String(form.get("note") || "").trim();
  if (!note) return toast("Descreva a informação antes de continuar.");
  const follow = {
    note,
    nextAction: String(form.get("nextAction") || "").trim(),
    nextActionDate: form.get("nextActionDate") || "",
  };
  if (action === "answer_information") return answerInformation(id, follow);
  if (action === "client_revision") return clientRevision(id, follow);
  if (action === "client_declined") return clientDeclined(id, follow);
  return toast("Ação inválida.");
}

function applyFollowAction(opp, payload) {
  if (!opp || !payload) return;
  opp.nextAction = payload.followAction || opp.nextAction || "";
  opp.nextActionDate = payload.nextActionDate || opp.nextActionDate || "";
  if (payload.reason) opp.notes = payload.reason;
}

async function approveOpportunity(id, mode, payload = {}) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nao encontrada.");
  const changed = mode === "approved_with_changes";
  const reason = payload.reason || (changed ? "" : "Aprovado sem alteracao.");
  if (changed && !reason) return toast("A justificativa e obrigatoria.");
  const discountPercent = discountPercentForOpportunity(opp);
  const suggestedNetAmountCents = netAmountAfterDiscount(opp.suggestedAmountCents, discountPercent);
  const amountCents = changed ? Number(payload.amountCents || 0) : suggestedNetAmountCents;
  if (changed && !amountCents) return toast("Informe o valor final aprovado.");
  if (supabaseSyncReady) {
    try {
      await postWorkflow({
        action: "review_opportunity",
        opportunityId: id,
        reviewAction: mode,
        amountCents,
        reason,
        expectedVersion: Number(opp._version || 1),
      });
      await initSupabaseSync();
      toast("Condicao aprovada: contrato e projeto criados pelo Supabase.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  const previous = activeCondition(id);
  if (previous) previous.isActive = false;
  const versionNumber = state.conditions.filter((item) => item.opportunityId === id).length + 1;
  const condition = {
    id: uid("ccv"),
    opportunityId: id,
    versionNumber,
    amountCents,
    discountCents: opp.suggestedDiscountCents,
    discountPercent,
    scope: opp.suggestedScope || opp.requestedScope,
    deliverables: opp.suggestedDeliverables,
    deadline: opp.suggestedDeadline || opp.expectedDeadline,
    paymentTerms: normalizePaymentPlan(opp.suggestedPaymentTerms),
    validUntil: addDays(30),
    approvedBy: currentUser.id,
    approvedAt: nowIso(),
    isActive: true,
    supersedesVersionId: previous?.id || null,
    reason,
  };
  state.conditions.unshift(condition);
  applyFollowAction(opp, payload);
  mutateOpportunity(id, "commercial_condition_approved", changed ? "Condicao aprovada com alteracoes" : "Condicao aprovada sem alteracao", mode, { conditionId: condition.id, reason });
  const contract = ensureCommercialContract(opp, condition);
  createPlanningProject(opp, condition);
  addNotification(`Condição aprovada para ${opp.clientName}; contrato ${contract.contractNumber} aberto para planejamento.`, { recipientUserId: opp.sdrId });
  saveState();
  toast("Condicao aprovada: contrato aberto para planejamento do gestor.");
  render();
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function needsInformation(id, payload = {}) {
  const reason = payload.reason || "";
  if (!reason) return;
  const opp = byId(state.opportunities, id);
  applyFollowAction(opp, payload);
  mutateOpportunity(id, "needs_information", `Gestor solicitou mais informacoes: ${reason}`, "approval_needs_information", { reason });
  addNotification(`O gestor solicitou informações adicionais em ${opp.clientName}.`, { recipientUserId: opp.sdrId });
  saveState();
  toast("Pedido de informacao enviado.");
  render();
}

function rejectOpportunity(id, payload = {}) {
  const reason = payload.reason || "";
  if (!reason) return toast("A justificativa e obrigatoria.");
  const opp = byId(state.opportunities, id);
  applyFollowAction(opp, payload);
  mutateOpportunity(id, "rejected", `Oportunidade recusada: ${reason}`, "approval_rejected", { reason });
  addNotification(`A condição de ${opp.clientName} foi recusada pelo gestor.`, { recipientUserId: opp.sdrId });
  saveState();
  toast("Oportunidade recusada.");
  render();
}

function answerInformation(id, follow = {}) {
  const answer = follow.note || "";
  if (!answer) return toast("Informe a resposta para o gestor.");
  const opp = byId(state.opportunities, id);
  opp.nextAction = follow.nextAction || opp.nextAction;
  opp.nextActionDate = follow.nextActionDate || opp.nextActionDate;
  mutateOpportunity(id, "pending_approval", `SDR respondeu pedido de informação: ${answer}`, "information_answered", { answer });
  addNotification(`Informações complementares enviadas por ${getActorName(opp.sdrId)} em ${opp.clientName}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Resposta enviada para nova analise.");
  render();
}

function presentToClient(id) {
  mutateOpportunity(id, "awaiting_client_response", "Condicao apresentada ao cliente", "condition_presented_to_client");
  toast("Retorno do cliente liberado para registro.");
  render();
}

function clientAccepted(id) {
  const opp = mutateOpportunity(id, "client_accepted", "Cliente aceitou a proposta aprovada", "client_accepted_condition");
  const contract = latestContract(id);
  if (contract) {
    contract.proposalAcceptedAt = nowIso();
    contract.status = contract.contractLink ? "contract_ready" : "proposal_accepted";
    addAudit("proposal_accepted_by_client", "Contract", contract.id, {});
    saveState();
  }
  toast(contract?.contractLink ? "Cliente aceitou: contrato pronto para a SDR enviar." : "Cliente aceitou: gestor pode informar o link do contrato.");
  render();
}

function clientRevision(id, follow = {}) {
  const note = follow.note || "";
  if (!note) return toast("Descreva a revisão solicitada pelo cliente.");
  mutateOpportunity(id, "client_requested_revision", `Cliente solicitou revisão: ${note}`, "client_requested_revision", { note });
  const opp = byId(state.opportunities, id);
  opp.status = "pending_approval";
  opp.nextAction = follow.nextAction || opp.nextAction;
  opp.nextActionDate = follow.nextActionDate || opp.nextActionDate;
  opp.timeline.unshift(event("revision_submitted", "Nova revisão enviada para aprovação", currentUser.id));
  addAudit("revision_submitted", "Opportunity", id, {});
  addNotification(`Revisão comercial enviada por ${getActorName(opp.sdrId)} em ${opp.clientName}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Revisão criada sem sobrescrever a versão anterior.");
  render();
}

function clientDeclined(id, follow = {}) {
  const reason = follow.note || "";
  if (!reason) return toast("Informe o motivo da recusa.");
  const opp = byId(state.opportunities, id);
  opp.nextAction = follow.nextAction || opp.nextAction;
  opp.nextActionDate = follow.nextActionDate || opp.nextActionDate;
  mutateOpportunity(id, "client_declined", `Cliente recusou: ${reason}`, "client_declined", { reason });
  addNotification(`Recusa do cliente registrada por ${getActorName(opp.sdrId)} em ${opp.clientName}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Recusa registrada.");
  render();
}

function ensureCommercialContract(opp, condition) {
  const existing = latestContract(opp.id);
  if (existing) {
    normalizeContract(existing, opp, condition);
    attachContractToProject(existing, opp);
    return existing;
  }
  const contract = conditionToContractDraft(opp, condition, currentUser.id);
  state.contracts.unshift(contract);
  attachContractToProject(contract, opp);
  opp.timeline.unshift(event("contract_pipeline_created", `Contrato ${contract.contractNumber} aberto para proposta e fechamento`, currentUser.id));
  addAudit("contract_pipeline_created", "Contract", contract.id, { conditionVersionId: condition?.id || null });
  return contract;
}

async function saveContractPlanning(id, formEl) {
  const contract = byId(state.contracts, id);
  if (!contract || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode editar o planejamento comercial.");
  const form = new FormData(formEl);
  const amountCents = cents(form.get("amount"));
  if (amountCents <= 0) return toast("Informe um valor de contrato maior que zero antes de salvar.");
  const paymentPlan = form.get("paymentPlan") || "50_50";
  const proposalFile = form.get("proposalFile");
  const contractLink = String(form.get("contractLink") || "").trim();
  if (contractLink) {
    try {
      const url = new URL(contractLink);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("invalid protocol");
    } catch {
      return toast("Informe um link de contrato valido, começando com https://.");
    }
  }
  contract.amountCents = amountCents;
  contract.proposalAmountCents = amountCents;
  contract.paymentPlan = paymentPlan;
  contract.paymentTerms = String(form.get("paymentTerms") || (paymentPlan === "100" ? "100% na assinatura" : "50% entrada + 50% entrega")).trim();
  if (proposalFile?.name) {
    try {
      const attachment = await uploadPortalAttachment(proposalFile, { kind: "proposal", contractId: contract.id, opportunityId: contract.opportunityId });
      contract.proposalAttachmentId = attachment?.id || contract.proposalAttachmentId || "";
    } catch {
      return toast("Não foi possível enviar a proposta. Tente novamente.");
    }
    contract.proposalFileName = proposalFile.name;
    contract.proposalAttachedAt = nowIso();
  }
  if (contractLink) {
    contract.contractLink = contractLink;
    contract.contractLinkAddedAt = nowIso();
  }
  if (contract.contractLink && ["proposal_accepted", "contract_ready"].includes(contract.status)) {
    contract.status = "contract_ready";
  } else if (contract.proposalFileName && ["proposal_planning", "draft_contract"].includes(contract.status)) {
    contract.status = "proposal_ready";
  }
  const opp = byId(state.opportunities, contract.opportunityId);
  opp.timeline.unshift(event("contract_planning_updated", `Planejamento comercial atualizado: ${brl(contract.amountCents)} em ${paymentPlanLabel(contract.paymentPlan)}`, currentUser.id));
  attachContractToProject(contract, opp);
  addAudit("contract_planning_updated", "Contract", contract.id, {
    amountCents: contract.amountCents,
    paymentPlan: contract.paymentPlan,
    hasProposal: Boolean(contract.proposalFileName),
    hasContractLink: Boolean(contract.contractLink),
  });
  saveState();
  toast("Planejamento do contrato salvo.");
  drawer = { type: "contract", id: contract.id };
  render();
}

function sendProposal(id) {
  const contract = byId(state.contracts, id);
  const opp = contract && byId(state.opportunities, contract.opportunityId);
  if (!contract || !opp) return toast("Contrato inexistente.");
  if (currentUser.role !== "sdr" || opp.sdrId !== currentUser.id) return toast("Apenas a SDR vinculada pode enviar esta proposta.");
  if (!contract.proposalFileName) return toast("A proposta ainda nao foi anexada pelo gestor.");
  contract.status = "proposal_sent";
  contract.proposalSentAt = nowIso();
  mutateOpportunity(opp.id, "awaiting_client_response", `Proposta ${contract.proposalFileName} enviada para a cliente`, "proposal_sent_to_client", { contractId: id });
  addAudit("proposal_sent_to_client", "Contract", id, {});
  saveState();
  toast("Proposta marcada como enviada para a cliente.");
  render();
}

function createContract(opportunityId) {
  const opp = byId(state.opportunities, opportunityId);
  const condition = activeCondition(opportunityId);
  if (!condition) return toast("Bloqueado: nao existe condicao aprovada vigente.");
  const contract = ensureCommercialContract(opp, condition);
  saveState();
  toast(`Contrato ${contract.contractNumber} aberto para planejamento.`);
  render();
}

function sendContract(id) {
  const contract = byId(state.contracts, id);
  const opp = contract && byId(state.opportunities, contract.opportunityId);
  if (!contract || !opp) return toast("Contrato inexistente.");
  const canManage = currentUser.role === "admin_manager";
  const canSdrAct = currentUser.role === "sdr" && opp.sdrId === currentUser.id;
  if (!canManage && !canSdrAct) return toast("Voce nao tem acesso a este contrato.");
  if (!contract.contractLink) return toast("O gestor ainda nao informou o link do contrato.");
  if (!["contract_ready", "proposal_accepted"].includes(contract.status)) return toast("Contrato ainda nao esta pronto para envio.");
  contract.status = "sent";
  contract.sentAt = nowIso();
  opp.timeline.unshift(event("contract_sent", "Contrato enviado para assinatura da cliente", currentUser.id));
  addAudit("contract_sent", "Contract", id, {});
  saveState();
  toast("Contrato marcado como enviado.");
  render();
}

function signContract(id) {
  const contract = byId(state.contracts, id);
  if (!contract || contract.amountCents <= 0) return toast("Defina o valor do contrato antes de confirmar assinatura.");
  contract.status = "signed";
  contract.signedAt = nowIso();
  const paymentAmountCents = contract.paymentPlan === "100" ? contract.amountCents : Math.round(contract.amountCents / 2);
  const payment = {
    id: uid("pay"),
    contractId: id,
    amountCents: paymentAmountCents,
    type: "initial",
    method: "Pix",
    reference: "Aguardando comprovante do contratante",
    notes: contract.paymentPlan === "100" ? "Pagamento integral do contrato." : "Pagamento inicial do contrato.",
    status: "pending",
    dueDate: addDays(2),
    createdAt: nowIso(),
    paidAt: null,
    confirmedBy: null,
    receiptFileName: "",
    recordSource: "system_expected",
  };
  state.payments.unshift(payment);
  byId(state.opportunities, contract.opportunityId).timeline.unshift(event("contract_signed", "Contrato assinado; pagamento inicial aguardando confirmacao", currentUser.id));
  addAudit("contract_signed", "Contract", id, {});
  addAudit("customer_payment_created", "CustomerPayment", payment.id, {});
  saveState();
  toast("Assinatura confirmada e pagamento inicial criado.");
  render();
}

function registerContractPayment(contractId) {
  const contract = byId(state.contracts, contractId);
  if (!contract || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar pagamentos.");
  if (contract.amountCents <= 0) return toast("Defina o valor do contrato antes de registrar pagamentos.");
  drawer = { type: "paymentRecord", contractId };
  render();
}

async function savePaymentRecord(contractId, formElement) {
  const contract = byId(state.contracts, contractId);
  if (!contract || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar pagamentos.");
  if (contract.amountCents <= 0) return toast("Defina o valor do contrato antes de registrar pagamentos.");
  const form = new FormData(formElement);
  const amountCents = cents(form.get("amount"));
  if (!amountCents) return toast("Informe um valor valido para o registro.");
  const status = form.get("status") === "confirmed" ? "confirmed" : "pending";
  const paidAtDate = form.get("paidAt");
  const dueDate = form.get("dueDate") || paidAtDate || nowIso().slice(0, 10);
  const receiptFile = form.get("receiptFile");
  let receiptAttachmentId = "";
  if (receiptFile?.name) {
    try {
      const attachment = await uploadPortalAttachment(receiptFile, { kind: "customer_payment_receipt", contractId });
      receiptAttachmentId = attachment?.id || "";
    } catch {
      return toast("Não foi possível enviar o comprovante. Tente novamente.");
    }
  }
  const payment = {
    id: uid("pay"),
    contractId,
    amountCents,
    type: form.get("type") || "contract_payment",
    method: form.get("method") || "",
    reference: String(form.get("reference") || "").trim(),
    notes: String(form.get("notes") || "").trim(),
    status,
    dueDate,
    createdAt: nowIso(),
    paidAt: status === "confirmed" ? (paidAtDate ? new Date(`${paidAtDate}T12:00:00`).toISOString() : nowIso()) : null,
    confirmedBy: status === "confirmed" ? currentUser.id : null,
    receiptFileName: receiptFile?.name || "",
    receiptAttachmentId,
    recordSource: "manual",
  };
  state.payments.unshift(payment);
  const opp = byId(state.opportunities, contract.opportunityId);
  opp?.timeline.unshift(event(
    status === "confirmed" ? "external_payment_confirmed" : "external_payment_registered",
    `${status === "confirmed" ? "Pagamento externo confirmado" : "Pagamento externo registrado"}: ${brl(payment.amountCents)}`,
    currentUser.id,
    { paymentId: payment.id, contractId }
  ));
  addAudit("contract_payment_registered", "CustomerPayment", payment.id, { contractId, status: payment.status, recordOnly: true });
  saveState();
  toast(status === "confirmed" ? "Pagamento externo confirmado e registrado." : "Pagamento externo registrado para conferencia.");
  drawer = { type: "contract", id: contractId };
  render();
}

function confirmPayment(id) {
  const payment = byId(state.payments, id);
  if (!payment || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode confirmar pagamentos.");
  payment.status = "confirmed";
  payment.paidAt = payment.paidAt || nowIso();
  payment.confirmedBy = currentUser.id;
  const contract = byId(state.contracts, payment.contractId);
  const opp = contract && byId(state.opportunities, contract.opportunityId);
  opp?.timeline.unshift(event("external_payment_confirmed", `Pagamento externo confirmado: ${brl(payment.amountCents)}`, currentUser.id, { paymentId: id }));
  addAudit("customer_payment_confirmed", "CustomerPayment", id, {});
  saveState();
  toast("Registro de pagamento externo confirmado.");
  render();
}

function createCommissionFromPayment(form) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar comissoes.");
  const payment = byId(state.payments, form.get("paymentId"));
  const contract = payment && byId(state.contracts, payment.contractId);
  const opp = contract && byId(state.opportunities, contract.opportunityId);
  if (!payment || !contract || !opp) return toast("Pagamento ou contrato nao encontrado.");
  if (payment.status !== "confirmed") return toast("A comissao so pode ser gerada para pagamentos confirmados.");
  if (commissionForPayment(payment.id)) return toast("Este pagamento ja gerou uma comissao.");
  const sdrId = form.get("sdrId") || opp.sdrId;
  const rateBps = Number(form.get("rateBps"));
  if (!sdrId || ![500, 1000].includes(rateBps)) return toast("Informe a SDR e selecione 5% ou 10%.");
  const baseCents = cents(form.get("baseAmount"));
  const amountCents = cents(form.get("amount"));
  if (!baseCents || !amountCents) return toast("Informe a base e o valor da comissao.");
  const summary = contractPaymentSummary(contract.id);
  const commission = {
    id: uid("com"),
    organizationId: "org-mada",
    sdrId,
    contractId: contract.id,
    paymentId: payment.id,
    rateBps,
    baseCents,
    amountCents,
    status: "available",
    validatedAt: nowIso(),
    contractAmountCents: contract.amountCents,
    paidCentsAtCreation: summary.confirmedCents,
    paymentAmountCents: payment.amountCents,
    manualEntry: true,
  };
  state.commissions.unshift(commission);
  opp.timeline.unshift(event("commission_created_from_payment", `Comissao registrada pelo gestor: ${brl(amountCents)} sobre base de ${brl(baseCents)}`, currentUser.id, { paymentId: payment.id, commissionId: commission.id, sdrId }));
  addAudit("commission_created_from_payment", "CommissionEntry", commission.id, { paymentId: payment.id, contractId: contract.id, sdrId });
  maybeCreateBatch(sdrId);
  saveState();
  toast(`Comissao registrada para ${getActorName(sdrId)}: ${brl(amountCents)}.`);
  render();
}

function updateCommission(id, row) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode editar comissoes.");
  const commission = byId(state.commissions, id);
  if (!commission || !row) return toast("Comissao nao encontrada.");
  const sdrId = row.querySelector("[data-commission-edit-sdr]")?.value;
  const rateBps = Number(row.querySelector("[data-commission-edit-rate]")?.value || 0);
  const baseCents = cents(row.querySelector("[data-commission-edit-base]")?.value);
  const amountCents = cents(row.querySelector("[data-commission-edit-amount]")?.value);
  const status = row.querySelector("[data-commission-edit-status]")?.value || commission.status;
  if (!sdrId || ![500, 1000].includes(rateBps) || !baseCents || !amountCents) {
    return toast("Revise SDR, taxa, base e valor da comissao.");
  }
  commission.sdrId = sdrId;
  commission.rateBps = rateBps;
  commission.baseCents = baseCents;
  commission.amountCents = amountCents;
  commission.status = status;
  commission.manualEntry = true;
  commission.updatedAt = nowIso();
  syncPayoutBatchTotals();
  addAudit("commission_manually_updated", "CommissionEntry", commission.id, { sdrId, rateBps, baseCents, amountCents, status });
  saveState();
  toast("Comissao atualizada pelo gestor.");
  render();
}

function syncPayoutBatchTotals() {
  state.payoutBatches.forEach((batch) => {
    batch.totalAmountCents = (batch.commissionIds || []).reduce((sum, commissionId) => {
      const commission = byId(state.commissions, commissionId);
      return sum + (commission?.amountCents || 0);
    }, 0);
  });
}

function updateProjectStatus(projectId, status) {
  const project = byId(state.projects, projectId);
  if (!project || project.status === status) return;
  const previousStatus = project.status;
  project.status = status;
  project.events.unshift(event("project_status_changed", `Status do projeto alterado de ${statusLabels[previousStatus] || previousStatus} para ${statusLabels[status] || status}`, currentUser.id));
  addAudit("project_status_changed", "Project", project.id, { previousStatus, status });
  saveState();
  toast("Status geral do projeto atualizado.");
  drawer = { type: "project", id: project.id };
  render();
}

async function updateProjectStageStatus(projectId, stageId, status) {
  const project = byId(state.projects, projectId);
  const stage = project?.stages.find((item) => item.id === stageId);
  if (!project || !stage || stage.status === status) return;
  const previousStatus = stage.status;
  if (supabaseSyncReady) {
    try {
      await postWorkflow({
        action: "update_project_stage",
        stageId,
        status,
        expectedVersion: Number(stage._version || 1),
      });
      await initSupabaseSync();
      toast("Status da etapa atualizado.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  stage.status = status;
  if (status === "in_progress" && !stage.startsAt) stage.startsAt = nowIso();
  if (["completed", "approved", "skipped", "cancelled"].includes(status)) stage.completedAt = nowIso();
  if (status === "ready" && !stage.startsAt) stage.startsAt = null;
  project.currentStageId = stage.id;
  project.events.unshift(event("project_stage_status_changed", `${stage.name}: ${statusLabels[previousStatus] || previousStatus} -> ${statusLabels[status] || status}`, currentUser.id));
  addAudit("project_stage_status_changed", "ProjectStage", stage.id, { projectId, previousStatus, status });
  saveState();
  toast("Status da etapa atualizado.");
  drawer = { type: "project", id: project.id };
  render();
}

function validateSale(contractId) {
  const contract = byId(state.contracts, contractId);
  const payment = paymentForContract(contractId);
  if (!contract || contract.saleValidatedAt) return toast("Venda ja validada ou contrato inexistente.");
  if (contract.status !== "signed" || payment?.status !== "confirmed") return toast("Bloqueado: precisa de contrato assinado e pagamento inicial confirmado.");
  contract.saleValidatedAt = nowIso();
  const opp = byId(state.opportunities, contract.opportunityId);
  opp.timeline.unshift(event("sale_validated", "Venda validada pelo gestor", currentUser.id));
  attachContractToProject(contract, opp);
  addAudit("sale_validated", "Contract", contract.id, {});
  saveState();
  toast("Venda validada: projeto atualizado. Gere a comissao pelos pagamentos confirmados.");
  render();
}

function maybeCreateBatch(sdrId) {
  const available = state.commissions.filter((item) => item.sdrId === sdrId && item.status === "available").slice(0, 5);
  if (available.length < 5) return;
  const batch = {
    id: uid("batch"),
    organizationId: "org-mada",
    sdrId,
    sequenceNumber: state.payoutBatches.filter((item) => item.sdrId === sdrId).length + 1,
    commissionIds: available.map((item) => item.id),
    totalAmountCents: available.reduce((sum, item) => sum + item.amountCents, 0),
    status: "batched",
    createdAt: nowIso(),
    paidAt: null,
    paidBy: null,
    receipt: null,
  };
  available.forEach((item) => item.status = "batched");
  state.payoutBatches.unshift(batch);
  addAudit("payout_batch_created", "PayoutBatch", batch.id, {});
}

function payBatch(id) {
  const batch = byId(state.payoutBatches, id);
  if (!batch || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar o pagamento do lote.");
  drawer = { type: "payoutPayment", id };
  render();
}

async function confirmPayoutBatchPayment(id, formElement) {
  const batch = byId(state.payoutBatches, id);
  if (!batch || currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar o pagamento do lote.");
  const form = new FormData(formElement);
  const receiptFile = form.get("receiptFile");
  if (!receiptFile?.name) return toast("Anexe o comprovante antes de confirmar.");
  setFormBusy(formElement, true);
  let attachment;
  try {
    attachment = await uploadPortalAttachment(receiptFile, { kind: "commission_receipt", payoutBatchId: batch.id, sdrId: batch.sdrId });
  } catch {
    setFormBusy(formElement, false);
    return toast("Não foi possível enviar o comprovante. Tente novamente.");
  }
  const receiptName = String(form.get("name") || receiptFile.name).trim();
  const notes = String(form.get("notes") || "").trim();
  batch.status = "paid";
  batch.paidAt = nowIso();
  batch.paidBy = currentUser.id;
  batch.receipt = receiptName;
  batch.receiptAttachmentId = attachment?.id || "";
  batch.commissionIds.forEach((commissionId) => {
    const commission = byId(state.commissions, commissionId);
    if (commission) commission.status = "paid";
  });
  const file = {
    id: uid("file"),
    category: "commission_receipt",
    name: receiptName,
    attachmentId: attachment?.id || "",
    originalFileName: receiptFile.name,
    visibility: "sdr",
    delegatedSdrId: batch.sdrId,
    payoutBatchId: batch.id,
    amountCents: batch.totalAmountCents,
    notes,
    createdAt: nowIso(),
  };
  state.files.unshift(file);
  addAudit("payout_batch_paid", "PayoutBatch", id, {});
  addAudit("commission_receipt_registered", "Attachment", file.id, { payoutBatchId: batch.id, sdrId: batch.sdrId });
  saveState();
  toast("Lote marcado como pago e comprovante salvo em Arquivos.");
  drawer = null;
  render();
}

function createPlanningProject(opp, condition) {
  const existing = projectForOpportunity(opp.id);
  if (existing) return existing;
  const contract = latestContract(opp.id);

  const project = {
    id: uid("prj"),
    organizationId: "org-mada",
    opportunityId: opp.id,
    sdrId: opp.sdrId,
    contractId: contract?.id || null,
    clientId: `client_${opp.id}`,
    serviceId: opp.serviceId,
    managerId: currentUser.id,
    name: `${opp.brandName} - ${serviceNamesForOpportunity(opp)}`,
    status: "active",
    startsAt: nowIso(),
    targetEndAt: addDays(60),
    conditionVersionId: condition?.id || null,
    contractSnapshot: {
      amountCents: contract?.amountCents || condition?.amountCents || opp.suggestedAmountCents,
      scope: contract?.scope || condition?.scope || opp.suggestedScope || opp.requestedScope,
      paymentTerms: paymentPlanLabel(normalizePaymentPlan(contract?.paymentTerms || condition?.paymentTerms || opp.suggestedPaymentTerms)),
    },
    stages: workflowTemplate.map((name, index) => ({
      id: uid("stg"),
      sequenceNumber: index + 1,
      name,
      status: index === 0 ? "ready" : "locked",
      responsibleManagerId: currentUser.id,
      dueAt: addDays(7 * (index + 1)),
      events: [],
    })),
    events: [event("project_created_from_approval", "Projeto criado automaticamente apos aprovacao da condicao comercial e abertura de contrato", currentUser.id)],
  };
  state.projects.unshift(project);
  addAudit("project_created_from_approval", "Project", project.id, { opportunityId: opp.id, conditionVersionId: condition?.id || null });
  return project;
}

function attachContractToProject(contract, opp) {
  const project = projectForOpportunity(opp.id) || createPlanningProject(opp, activeCondition(opp.id));
  project.contractId = contract.id;
  project.clientId = contract.clientId;
  project.contractSnapshot = {
    amountCents: contract.amountCents,
    scope: contract.scope,
    paymentTerms: paymentPlanLabel(normalizePaymentPlan(contract.paymentTerms)),
  };
  if (!project.events.some((item) => item.action === "contract_linked")) {
    project.events.unshift(event("contract_linked", `Contrato ${contract.contractNumber} vinculado ao projeto`, currentUser.id));
    addAudit("contract_linked_to_project", "Project", project.id, { contractId: contract.id });
  }
  return project;
}

function exportCsv(type) {
  const visibleContractIds = new Set(visibleContracts().map((contract) => contract.id));
  const commissionRows = state.commissions.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id);
  const exporters = {
    audit: () => [["data", "usuario", "acao", "entidade"], ...state.auditLogs.map((item) => [item.createdAt, getActorName(item.actorUserId), item.action, item.entityType])],
    opportunities: () => [["cliente", "empresa_perfil", "instagram", "site", "whatsapp", "email", "segmento", "cidade", "origem", "sdr", "status_crm", "status_condicao", "o_que_vende", "publico", "sinal_operacao", "momento_atual", "problema_observado", "necessidade_relatada", "servicos", "prazo", "faixa_investimento", "contratacao_anterior", "urgencia", "valor_proposto", "desconto_percentual", "desconto_valor", "valor_liquido", "objecoes", "condicoes_solicitadas", "motivo_perda", "proxima_acao", "data_proxima_acao", "observacoes"], ...visibleOpportunities().map((item) => {
      const discountPercent = discountPercentForOpportunity(item);
      return [item.clientName, item.brandName, item.instagram || "-", item.website || "-", item.phone || "-", item.email || "-", item.segment || "-", item.city || "-", item.origin || "-", getActorName(item.sdrId), crmStatusLabels[item.crmStatus] || item.crmStatus || "-", item.status, item.businessOffer || "-", item.targetAudience || "-", item.operationSignal || "-", item.currentMoment || "-", item.observedProblem || "-", item.reportedNeed || item.clientNeed || "-", serviceNamesForOpportunity(item), item.expectedDeadline || "-", item.investmentRange || "-", item.previousHiring || "-", item.urgency || "-", item.suggestedAmountCents, discountPercent, item.suggestedDiscountCents, netAmountAfterDiscount(item.suggestedAmountCents, discountPercent), item.objections || "-", paymentPlanLabel(normalizePaymentPlan(item.requestedConditions || item.suggestedPaymentTerms)), item.lossReason || "-", item.nextAction || "-", item.nextActionDate || "-", item.notes || "-"];
    })],
    payments: () => [["contrato", "cliente", "valor", "metodo", "referencia", "comprovante", "status", "data", "observacao"], ...visiblePayments().map((item) => {
      const contract = byId(state.contracts, item.contractId);
      const opp = contract && byId(state.opportunities, contract.opportunityId);
      return [contract?.contractNumber || "-", opp?.clientName || "-", item.amountCents, item.method || "-", item.reference || "-", item.receiptFileName || "-", item.status, item.paidAt || item.dueDate || item.createdAt || "-", item.notes || "-"];
    })],
    commissions: () => [["sdr", "contrato", "pagamento_id", "pagamento_valor", "base", "taxa_bps", "comissao", "status", "validada_em"], ...commissionRows.map((item) => {
      const contract = byId(state.contracts, item.contractId);
      const payment = item.paymentId ? byId(state.payments, item.paymentId) : null;
      if (contract && !visibleContractIds.has(contract.id) && currentUser.role !== "admin_manager") return null;
      return [getActorName(item.sdrId), contract?.contractNumber || "-", payment?.id || "-", payment?.amountCents || "", item.baseCents, item.rateBps, item.amountCents, item.status, item.validatedAt || "-"];
    }).filter(Boolean)],
    commission_receipts: () => [["comprovante", "sdr", "lote", "valor", "observacao", "data"], ...visibleFiles().map((item) => {
      const batch = item.payoutBatchId ? byId(state.payoutBatches, item.payoutBatchId) : null;
      return [item.name, getActorName(item.delegatedSdrId), batch?.sequenceNumber || "-", item.amountCents || 0, item.notes || "-", item.createdAt];
    })],
  };
  const rows = (exporters[type] || exporters.opportunities)();
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}-mada.csv`;
  link.click();
  URL.revokeObjectURL(url);
  addAudit("csv_exported", type, type, {});
  saveState();
}

function toast(message) {
  clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  toastTimer = setTimeout(() => node.remove(), 3200);
}

void bootstrapApp();
