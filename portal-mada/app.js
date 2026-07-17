const SUPABASE_CONFIG = {
  URL: "https://nbjeggofsqsavniuijxz.supabase.co",
  endpoint: "/api/portal-state",
  stateId: "portal-mada-main",
};

const workflowTemplate = [
  "Resumo",
  "Integração",
  "Reunião de kickoff",
  "Pesquisa e diagnóstico",
  "Apresentação da estratégia",
  "Direção criativa e moodboard",
  "Desenvolvimento da identidade",
  "Apresentação da identidade",
  "Feedback consolidado",
  "Ajustes e revisos",
  "Aprovaço final",
  "Pagamento restante",
  "Entrega e implementacao",
  "Suporte e encerramento",
];

const serviços = [
  {
    id: "srv-consultoria-estratégica",
    nome: "Consultoria Estratégica",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Consultoria Estratégica",
  },
  {
    id: "srv-planejamento-conteudo",
    nome: "Planejamento de conteúdo",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Planejamento de conteúdo",
  },
  {
    id: "srv-gestao-rede",
    nome: "Gestão de Rede",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Gestão de Rede",
  },
  {
    id: "srv-estrutura-perfil",
    nome: "Estruturação de Perfil",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Estruturação de Perfil",
  },
  {
    id: "srv-landing-page",
    nome: "Página de destino",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Página de destino",
  },
  {
    id: "srv-site-institucional",
    nome: "Sites",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Sites",
  },
  {
    id: "srv-ecommerce",
    nome: "Comércio eletrônico",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Comércio eletrônico",
  },
  {
    id: "srv-identidade",
    nome: "Identidade Visual",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Identidade Visual",
  },
  {
    id: "srv-pack-posts",
    nome: "Posts",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Posts",
  },
  {
    id: "srv-design-grafico",
    nome: "Design Gráfico",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Design Gráfico",
  },
  {
    id: "srv-roteirizacao-videos",
    nome: "Roteirização de vídeo",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Roteirização de vídeo",
  },
  {
    id: "srv-edicao-videos",
    nome: "Edição de vídeo",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Edição de vídeo",
  },
  {
    id: "srv-captacao-conteudo",
    nome: "Capitão de Conteúdo",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    workflow: "Capitão de Conteúdo",
  },
  {
    id: "srv-storymake",
    nome: "Storymake",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Storymake",
  },
  {
    id: "srv-branding",
    Nome: "Branding",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Branding",
  },
  {
    id: "srv-planejamento-evento",
    nome: "Planejamento de Evento",
    referência: "Projeto sob proposta",
    Comissão Bps: 1000,
    fluxo de trabalho: "Planejamento de Evento",
  },
];

const legacyServiceIdMap = {
  "srv-social": "srv-roteirização-vídeos",
  "srv-campanha": "srv-design-gráfico",
  "srv-perfil-planejamento": "srv-planejamento-conteudo",
  "srv-planejamento-roteiros": "srv-roteirizacao-videos",
  "srv-posts": "srv-pack-posts",
};
const navItems = [
  ["painel", "Painel", "layout-painel"],
  ["opportunities", "Oportunidades", "table-properties"],
  ["aprovações", "AprovaÇÕES", "verificação de crachá"],
  ["contratos", "Contratos", "assinatura de arquivo"],
  ["pagamentos", "Pagamentos", "cartões de carteira"],
  ["projetos", "Projetos", "quadrado-kanban"],
  ["comissões", "Comissões", "círculo-cifrão"],
  ["arquivos", "Arquivos", "pasta fechada"],
  ["relatórios", "Relatórios", "gráfico sem eixos combinados"],
  ["services", "Serviços", "layers-3"],
  ["auditoria", "auditoria", "texto rolante"],
  ["configurações", "Configurações-2"],
];

navItems.splice(2, 0, ["progresso", "Andamento", "atividade"]);

const roleLabels = {
  admin_manager: "Gestor",
  sdr: "SDR",
};

const statusLabels = {
  rascunho: "Rascunho",
  pendente_approval: "Aguardando aprovação",
  needs_information: "Mais informações",
  Commercial_condition_approved: "Condição aprovada",
  apresentado_to_client: "Apresentado ao cliente",
  awaiting_client_response: "Aguardando cliente",
  client_requested_revision: "Cliente pediu alteração",
  client_accepted: "Cliente aceito",
  client_declined: "Cliente escolhido",
  aprovado: "Aprovado",
  aprovado_with_changes: "Aprovado com alterações",
  rejeitado: "Recusado",
  propostas_planning: "Planejamento da proposta",
  proposta_ready: "Proposta pronta",
  proposta_sent: "Proposta enviada",
  proposta_accepted: "Proposta de aceitação",
  contract_ready: "Contrato pronto",
  draft_contract: "Contrato em rascunho",
  enviado: "Enviado",
  assinado: "Assinado",
  pendente: "Registrado",
  confirmado: "Confirmado",
  disponível: "Disponível",
  em lotes: "Em lote",
  pago: "Pago",
  ativo: "Ativo",
  planejamento: "Planejamento",
  concluído: "Concluído",
  not_started: "Não iniciado",
  awaiting_client: "Aguardando cliente",
  bloqueado: "Bloqueado",
  on_hold: "Em pausa",
  cancelado: "Cancelado",
  bloqueado: "Bloqueado",
  pronto: "Pronto",
  em andamento: "Em andamento",
  crítica: "Em revisão",
  awaiting_manager: "Aguardando gestor",
  pulado: "Pulado",
};

const crmStatusLabels = {
  lead_mapped: "Lead mapeado",
  nutrir: "Nutriço",
  perdido: "Perdido",
  first_contact: "Primeiro contato",
  acompanhamento: "Em acompanhamento",
  respondeu: "Respondeu",
  manager_meeting: "Reunião dos gestores com o cliente",
  proposta_sent_crm: "Proposta enviada",
  negociando: "Em negociação",
  awaiting_contract_payment: "Aguardando contrato/pagamento",
  sale_completed: "Venda concluída",
};

const crmStatusClasses = {
  lead_mapped: "rascunho",
  nutrição: "info",
  perdido: "rejeitado",
  primeiro_contato: "pendente",
  follow_up: "aguardando",
  respondeu: "info",
  reunião_de_gerentes: "pronto",
  proposta_enviada_crm: "enviada",
  negociando: "pendente",
  aguardando_pagamento_do_contrato: "aguardando",
  venda_concluída: "aprovada",
};

const MANAGEMENT_OWNER_ID = "management";

const originChannels = [
  "Direto Orgânico",
  "Direto ativo",
  "Google",
  "Interação",
  "Clubinho",
  "Trafego Pago",
  "Indicação",
  "Pré-briefing",
];

const operationSignalOptions = [
  "Venda online",
  "Equipe ativa",
  "Agenda cheia",
  "Tem tràfego ativo",
  "Tem base de leads",
  "Tem produto validado",
  "Atendimento recorrente",
  "Presença digital inicial",
  "Operação ainda informal",
];

const opçõesMomentoAtual = [
  "Lançamento",
  "Reposicionamento",
  "Escala",
  "Validação de oferta",
  "Estruturação inicial",
  "Campanha pontual",
  "Aquecimento de chumbo",
  "Reativação comercial",
  "Manutenção de apresentação",
];

const nextActionOptions = [
  "Mapear contato e contexto",
  "Fazer primeiro contato",
  "Acompanhamento de Fazer",
  "Aguardar resposta do cliente",
  "Agendar reunião",
  "Realizar reunião com gestores",
  "Preparar proposta",
  "Enviar proposta",
  "Negociar condiÃ§Ãµes",
  "Enviar condição para aprovação",
  "Cobrar assinatura do contrato",
  "Confirmar pagamento",
  "Iniciar projeto",
  "Retomar nutriço",
  "Encerrar",
];

const crmPipelineStatuses = [
  "lead_mapped",
  "primeiro contato",
  "seguir",
  "respondeu",
  "reunião_de_gerentes",
  "proposal_sent_crm",
  "negociando",
  "aguardando pagamento do contrato",
  "venda_concluída",
];

const crmSpecialStatuses = ["nutrindo", "perdido"];

const nextActionSuggestions = {
  lead_mapped: ["Mapear contato e contexto", "Fazer primeiro contato"],
  first_contact: ["Fazer follow-up", "Aguardar resposta do cliente"],
  follow_up: ["Fazer follow-up", "Aguardar resposta do cliente", "Agendar reuniÃ£o"],
  replied: ["Agendar reuniÃ£o", "Realizar reuniÃ£o com gestores"],
  manager_meeting: ["Preparar proposta", "Enviar condiÃ§Ã£o para aprovaÃ§Ã£o"],
  proposal_sent_crm: ["Fazer follow-up", "Negociar condiÃ§Ãµes"],
  negotiating: ["Preparar proposta", "Negociar condiÃ§Ãµes", "Enviar condiÃ§Ã£o para aprovaÃ§Ã£o"],
  awaiting_contract_payment: ["Cobrar assinatura do contrato", "Confirmar pagamento"],
  sale_completed: ["Iniciar projeto"],
  nurturing: ["Retomar nutriÃ§Ã£o", "Fazer follow-up"],
  lost: ["Encerrar oportunidade"],
};

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
  planning: "pending",
  completed: "completed",
  not_started: "draft",
  awaiting_client: "awaiting",
  blocked: "rejected",
  on_hold: "pending",
  cancelled: "cancelled",
  locked: "pending",
  ready: "ready",
  in_progress: "info",
  review: "awaiting",
  awaiting_manager: "awaiting",
  skipped: "draft",
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
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
let lastSyncedState = normalizeState(seedState());
let supabaseSyncStatus = "Conectando ao Supabase";
let supabaseSyncInFlight = false;
let supabaseSyncQueued = false;
let supabaseSyncPromise = Promise.resolve();
let supabaseSyncReady = false;
deixe supabaseRetryTimer = null;
let supabaseRetryDelay = 2000;
let pendingSuccessToast = "";
deixe oportunidadeFiltersOpen = false;

função countLabel(contagem, singular, plural) {
  const valor = Número(contagem) || 0;
  retornar `${value} ${value === 1 ? singular : plural}`;
}

função attachmentUrl(id) {
  retornar id ? `/api/portal-file?id=${encodeURIComponent(id)}` : "";
}

função attachmentLink(id, label) {
  se (!id) retorne esc(rótulo || "-");
  return `<a href="${esc(attachmentUrl(id))}" target="_blank" rel="noreferrer">${esc(label || "Abrir arquivo")}</a>`;
}

função assíncrona uploadPortalAttachment(arquivo, metadados = {}) {
  Se (!file?.name) retornar nulo;
  se (arquivo.tamanho > 10 * 1024 * 1024) {
    brinde("Arquivo muito grande. Limite atual: 10 MB.");
    retornar nulo;
  }
  if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
    brinde("Envie um arquivo PDF, JPG ou PNG.");
    retornar nulo;
  }
  const preparedResponse = await fetch("/api/portal-file", {
    método: "POST",
    cabeçalhos: { "Content-Type": "application/json" },
    corpo: JSON.stringify({
      ação: "preparar",
      nome do arquivo: nome.do.arquivo,
      mimeType: file.type || "application/octet-stream",
      tamanhoBytes: tamanho.do.arquivo,
      metadados,
    }),
  });
  const prepared = await preparedResponse.json().catch(() => ({}));
  if (!preparedResponse.ok) throw new Error(prepared.error || "Não foi possível preparar o envio do arquivo.");
  const uploadResponse = await fetch(prepared.signedUrl, {
    método: "PUT",
    cabeçalhos: { "Content-Type": file.type, "x-upsert": "false" },
    corpo: arquivo,
  });
  if (!uploadResponse.ok) throw new Error("Não foi possível enviar o arquivo ao armazenamento privado.");
  const completedResponse = await fetch("/api/portal-file", {
    método: "POST",
    cabeçalhos: { "Content-Type": "application/json" },
    corpo: JSON.stringify({
      ação: "concluir",
      uploadId: prepared.uploadId,
      caminhoDeArmazenamento: caminhoDeArmazenamentoPreparado,
      nome do arquivo: nome.do.arquivo,
      tipoMIME: tipo.de.arquivo,
      tamanhoBytes: tamanho.do.arquivo,
      metadados,
    }),
  });
  const completed = await completedResponse.json().catch(() => ({}));
  if (!completedResponse.ok) throw new Error(completed.error || "Não foi possível registrar o arquivo enviado.");
  Devolução concluída;
}

função seedState() {
  retornar {
    Usuários: [],
    serviços,
    oportunidades: [],
    solicitações de aprovação: [],
    condições: [],
    contratos: [],
    pagamentos: [],
    comissões: [],
    lotes de pagamento: [],
    projetos: [],
    arquivos: [],
    notificações: [],
    auditLogs: [],
  };
}

função normalizeState(dados) {
  dados.usuários = dados.usuários || seedState().usuários;
  data.users.forEach((user) => user.active = user.active !== false);
  dados.serviços = serviços;
  dados.projetos = dados.projetos || [];
  dados.contratos = dados.contratos || [];
  dados.oportunidades = dados.oportunidades || [];
  dados.oportunidades.paraCada((oportunidade) => {
    opportunity.serviceIds = normalizeServiceIds(opportunity.serviceIds, opportunity.serviceId, data.services);
    opportunity.serviceId = opportunity.serviceIds[0] || normalizeServiceId(opportunity.serviceId) || data.services[0]?.id;
    opportunity.sdrId = opportunity.sdrId || MANAGEMENT_OWNER_ID;
    opportunity.crmStatus = opportunity.crmStatus || "lead_mapped";
    oportunidade.website = oportunidade.website || "";
    oportunidade.segmento = oportunidade.segmento || "";
    oportunidade.cidade = oportunidade.cidade || "";
    origem da oportunidade = origem da oportunidade || "";
    oportunidade.oferta de negócios = oportunidade.oferta de negócios || "";
    oportunidade.públicoAlvo = oportunidade.públicoAlvo || "";
    opportunity.operationSignal = opportunity.operationSignal || "";
    oportunidade.momentoatual = oportunidade.momentoatual || "";
    oportunidade.problemaObservado = oportunidade.problemaObservado || "";
    oportunidade.necessidadeRelatada = oportunidade.necessidadeRelatada || oportunidade.necessidadeDoCliente || "";
    oportunidade.intervalo de investimento = oportunidade.intervalo de investimento || "";
    oportunidade.tomadordedecisão = oportunidade.tomadordedecisão || "";
    oportunidade.contrataçãoanterior = oportunidade.contrataçãoanterior || "";
    oportunidade.urgência = oportunidade.urgência || "";
    oportunidade.objeções = oportunidade.objeções || "";
    oportunidade.percentualDeDescontoSugerido = percentualDeDescontoParaOportunidade(oportunidade);
    oportunidade.desconto sugerido em centavos = desconto em centavos a partir de porcentagem(oportunidade.valor sugerido em centavos, oportunidade.desconto sugerido em porcentagem);
    opportunity.requestedConditions = normalizePaymentPlan(opportunity.requestedConditions || opportunity.suggestedPaymentTerms || "50_50");
    opportunity.suggestedPaymentTerms = opportunity.requestedConditions;
    oportunidade.motivodaperda = oportunidade.motivodaperda || "";
    oportunidade.próximaAção = oportunidade.próximaAção || "";
    oportunidade.próximaDataAção = oportunidade.próximaDataAção || "";
    oportunidade.arquivadaEm = oportunidade.arquivadaEm || nulo;
    opportunity.terminalRejection = opportunity.terminalRejection === true || opportunity.status === "rejeitado";
  });
  data.conditions = data.conditions || [];
  dados.condições.paraCada((condição) => {
    condição.paymentTerms = normalizePaymentPlan(condição.paymentTerms || "50_50");
    condição.descontoPercentual = Número(condição.descontoPercentual ?? condição.taxaDeDescontoPercentual ?? 0);
  });
  dados.pagamentos = dados.pagamentos || [];
  dados.pagamentos.paraCada((pagamento) => {
    tipo_de_pagamento = tipo_de_pagamento || "pagamento_contratual";
    método.de.pagamento = método.de.pagamento || "";
    pagamento.referência = pagamento.referência || "";
    pagamento.notas = pagamento.notas || "";
    status.pagamento = status.pagamento || "pendente";
    pagamento.dataDeVencimento = pagamento.dataDeVencimento || pagamento.criadoEm || agoraIso();
    pagamento.criadoEm = pagamento.criadoEm || agoraIso();
    pagamento.pagoEm = pagamento.pagoEm || nulo;
    pagamento.confirmadoPor = pagamento.confirmadoPor || nulo;
    payment.receiptFileName = payment.receiptFileName || "";
    payment.receiptAttachmentId = payment.receiptAttachmentId || "";
    payment.recordSource = payment.recordSource || "manual";
  });
  data.files = data.files || [];
  dados.arquivos.paraCada((arquivo) => {
    file.category = file.category || "general";
    file.delegatedSdrId = file.delegatedSdrId || file.sdrId || null;
    file.attachmentId = file.attachmentId || "";
    arquivo.nomeArquivoOriginal = arquivo.nomeArquivoOriginal || "";
  });

  dados.contratos.paraCada((contrato) => {
    const opp = data.opportunities.find((item) => item.id === contract.opportunityId);
    const condition = data.conditions.find((item) => item.id === contract.conditionVersionId)
      || data.conditions.find((item) => item.opportunityId === contract.opportunityId && item.isActive)
      || data.conditions.find((item) => item.opportunityId === contract.opportunityId);
    normalizarContrato(contrato, opp, condição);
  });

  dados.oportunidades
    .filter((opportunity) => ["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"].includes(opportunity.status))
    .forEach((oportunidade) => {
      const hasContract = data.contracts.some((contract) => contract.opportunityId === opportunity.id);
      const condition = data.conditions.find((item) => item.opportunityId === opportunity.id && item.isActive)
        || data.conditions.find((item) => item.opportunityId === opportunity.id);
      se (hasContract || !condition) retornar;
      data.contracts.unshift(conditionToContractDraft(opportunity, condition, condition.approvedBy || opportunity.sdrId, data.contracts.length + 1));
    });

  dados.comissões = dados.comissões || [];
  dados.comissões.paraCada((comissão) => {
    const pagamento = data.payments.find((item) => item.id === commission.paymentId);
    const rateBps = pagamento ? commissionRateForPayment(pagamento, dados) : 1000;
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
        events: [event("project_created_from_approval", "Projeto criado automaticamente após aprovação da condição comercial e abertura de contrato", actorId)],
      });
    });

  retornar dados;
}

função cloneState(valor) {
  return JSON.parse(JSON.stringify(value || seedState()));
}

função salvarEstado() {
  retornar filaSupabaseSave();
}

const persistedCollections = [
  "oportunidades", "condições", "contratos", "pagamentos", "comissões",
  "payoutLotches", "projects", "files", "notifications", "auditLogs",
];

função comparativeEntity(entity) {
  const copy = cloneState(entity);
  excluir cópia._versão;
  devolver cópia;
}

função construirConjuntoDeMutações(antes, depois) {
  retornar Object.fromEntries(persistedCollections.map((collection) => {
    const previous = new Map((before?.[collection] || []).map((item) => [item.id, JSON.stringify(comparableEntity(item))]));
    const changedIds = (after?.[collection] || [])
      .filter((item) => previous.get(item.id) !== JSON.stringify(comparableEntity(item)))
      .map((item) => item.id);
    retornar [coleção, changedIds];
  }).filter(([, ids]) => ids.length));
}

função assíncrona initSupabaseSync() {
  se (!usuárioAtual) retornar;
  Se (!SUPABASE_CONFIG.endpoint) retornar;
  supabaseSyncStatus = "Conectando ao Supabase";
  tentar {
    const response = await fetch(SUPABASE_CONFIG.endpoint);
    se (resposta.status === 401) {
      usuárioAtual = nulo;
      authReady = verdadeiro;
      supabaseSyncReady = falso;
      renderizar();
      retornar;
    }
    if (!response.ok) throw new Error(await response.text());
    const row = await response.json();
    se (linha?.dados) {
      estado = normalizarEstado({ ...seedState(), ...linha.dados });
      últimoEstadoSincronizado = clonarEstado(estado);
      supabaseSyncReady = verdadeiro;
      supabaseSyncStatus = "Sincronizado com Supabase";
      authReady = verdadeiro;
      renderizar();
      retornar;
    }
    supabaseSyncReady = verdadeiro;
    aguardar pushSupabaseState();
    supabaseSyncStatus = "Supabase inicializado";
    authReady = verdadeiro;
    renderizar();
  } catch (erro) {
    supabaseSyncReady = falso;
    supabaseSyncStatus = "Supabase pendente: endpoint ou DATABASE_URL";
    authReady = verdadeiro;
    console.warn("Sincronização do Supabase indisponível", erro);
    renderizar();
  }
}

função queueSupabaseSave() {
  supabaseSyncQueued = true;
  supabaseSyncStatus = "Salvando alterações";
  atualizarIndicadorSincronizado();
  if (!SUPABASE_CONFIG.endpoint || !supabaseSyncReady) {
    agendarSupabaseRetry();
    retornar Promise.resolve(false);
  }
  supabaseSyncPromise = supabaseSyncPromise.then(async () => {
    se (!supabaseSyncQueued) retornar;
    supabaseSyncQueued = falso;
    aguardar flushSupabaseSave();
  });
  retornar supabaseSyncPromise;
}

função assíncrona flushSupabaseSave() {
  se (supabaseSyncInFlight) retornar;
  supabaseSyncInFlight = true;
  supabaseSyncQueued = falso;
  tentar {
    aguardar pushSupabaseState();
    supabaseSyncStatus = "Sincronizado com Supabase";
    supabaseSyncReady = verdadeiro;
    supabaseRetryDelay = 2000;
    clearTimeout(supabaseRetryTimer);
    supabaseRetryTimer = null;
    if (pendingSuccessToast) {
      const message = pendingSuccessToast;
      pendingSuccessToast = "";
      showToast(message);
    }
  } catch (error) {
    if (error.code === "STATE_CONFLICT") {
      supabaseSyncQueued = false;
      supabaseSyncReady = true;
      pendingSuccessToast = "";
      showToast("Os dados mudaram em outro acesso. A versÃ£o mais recente foi carregada; repita a Ãºltima aÃ§Ã£o.");
      await initSupabaseSync();
      return;
    }
    supabaseSyncQueued = true;
    supabaseSyncReady = false;
    supabaseSyncStatus = "Supabase pendente: falha ao salvar";
    console.warn("Supabase save unavailable", error);
    pendingSuccessToast = "";
    showToast("As alteraÃ§Ãµes ainda nÃ£o foram salvas. O portal tentarÃ¡ novamente automaticamente.");
    scheduleSupabaseRetry();
  } finally {
    supabaseSyncInFlight = false;
    updateSyncIndicator();
  }
}

function scheduleSupabaseRetry() {
  if (supabaseRetryTimer || !currentUser) return;
  supabaseRetryTimer = setTimeout(async () => {
    supabaseRetryTimer = null;
    try {
      const response = await fetch(SUPABASE_CONFIG.endpoint, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Supabase indisponÃ­vel");
      supabaseSyncReady = true;
      await flushSupabaseSave();
    } catch {
      supabaseRetryDelay = Math.min(60000, supabaseRetryDelay * 2);
      scheduleSupabaseRetry();
    }
  }, supabaseRetryDelay);
}

function updateSyncIndicator() {
  const indicator = document.querySelector(".topbar-sync");
  if (!indicator) return;
  indicator.classList.toggle("is-online", supabaseSyncReady);
  indicator.title = supabaseSyncStatus;
  const label = indicator.querySelector("span");
  if (label) label.textContent = supabaseSyncStatus === "Salvando alteraÃ§Ãµes" ? "Salvando" : (supabaseSyncReady ? "Dados salvos" : "Sem conexÃ£o");
}

async function pushSupabaseState() {
  const snapshot = cloneState(state);
  const mutations = buildMutationSet(lastSyncedState, snapshot);
  if (!Object.keys(mutations).length) return;
  const response = await fetch(SUPABASE_CONFIG.endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: snapshot,
      mutations,
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
    lastSyncedState = cloneState(state);
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
  } pegar {
    usuárioAtual = nulo;
  }
  se (usuárioAtual) {
    authReady = falso;
    renderizar();
    aguarde initSupabaseSync();
    retornar;
  }
  authReady = verdadeiro;
  renderizar();
}

função uid() {
  retornar crypto.randomUUID();
}

função nowIso() {
  retornar novo Date().toISOString();
}

função contractNumber(index = state.contracts.length + 1) {
  retornar `MADA-${String(index).padStart(4, "0")}`;
}

função centavos(valor) {
  const clean = String(value || "0").replace(/\./g, "").replace(",", ".");
  retorne Math.round(Number(clean || 0) * 100);
}

função brl(centsValue) {
  retornar currency.format((Number(centsValue) || 0) / 100);
}

função moneyInputValue(centsValue) {
  retornar brl(centsValue).replace("R$", "").trim();
}

função percentual(valor) {
  const clean = String(value || "0").replace("%", "").replace(/\./g, "").replace(",", ".");
  const número = Número(limpo || 0);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

função percentInputValue(valor) {
  const número = Número(valor) || 0;
  return number.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

função discountPercentForOpportunity(opportunity = {}) {
  se (opportunity.suggestedDiscountPercent != null) retorne Number(opportunity.suggestedDiscountPercent) || 0;
  se (oportunidade.valorSugeridoCentavos && oportunidade.descontoSugeridoCentavos) {
    retornar (Número(opportunity.suggestedDiscountCents) / Número(opportunity.suggestedAmountCents)) * 100;
  }
  retornar 0;
}

função discountCentsFromPercent(amountCents, discountPercent) {
  return Math.round((Number(amountCents) || 0) * (Number(discountPercent) || 0) / 100);
}

função netAmountAfterDiscount(amountCents, discountPercent) {
  return Math.max(0, (Number(amountCents) || 0) - discountCentsFromPercent(amountCents, discountPercent));
}

função dateLabel(valor) {
  se (!valor) retorne "-";
  const date = parseDateOnly(String(value).slice(0, 10)) || new Date(value);
  Se (Number.isNaN(date.getTime())) retorne "-";
  const parts = Object.fromEntries(dateFormat.formatToParts(date).map((part) => [part.type, part.value]));
  retornar `${parts.day} ${String(parts.month || "").replace(".", "")} ${parts.year}`.trim();
}

função esc(valor) {
  retornar String(valor ?? "")
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', """)
    .replaceAll("'", "'");
}

função porId(lista, id) {
  retornar lista.find((item) => item.id === id);
}

função normalizarServiceId(id) {
  retornar legacyServiceIdMap[id] || id || null;
}

função normalizarIdsDeServiço(valor, fallbackId, lista = estado?.serviços || serviços) {
  const raw = Array.isArray(value) ? value : (value ? [value] : []);
  if (!raw.length && fallbackId) raw.push(fallbackId);
  const allowed = new Set(list.map((item) => item.id));
  const visto = novo Conjunto();
  retornar bruto
    .map(normalizeServiceId)
    .filter((id) => id && allowed.has(id) && !seen.has(id) && seen.add(id));
}

função serviceNamesForOpportunity(opp) {
  const ids = normalizeServiceIds(opp?.serviceIds, opp?.serviceId);
  const names = ids.map((id) => byId(state.services, id)?.name).filter(Boolean);
  retornar nomes.join(" + ") || "-";
}

function originChannelOptions(selectedOrigin = "") {
  const normalizedSelected = String(selectedOrigin || "");
  const hasLegacyOrigin = normalizedSelected && !originChannels.includes(normalizedSelected);
  retornar `
    <option value="" ${!normalizedSelected ? "selected" : ""}>Selecione a origem</option>
    ${hasLegacyOrigin ? `<option value="${esc(normalizedSelected)}" selected>${esc(normalizedSelected)}</option>` : ""}
    ${originChannels.map((origin) => `<option value="${esc(origin)}" ${normalizedSelected === origin ? "selected" : ""}>${esc(origin)}</option>`).join("")}
  `;
}

função splitChoiceValue(valor) {
  retornar String(valor || "")
    .dividir(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function selectOptions(options, selectedValue = "", placeholder = "Selecione") {
  const selected = String(selectedValue || "");
  const hasLegacyValue = selected && !options.includes(selected);
  retornar `
    <option value="" ${!selected ? "selected" : ""}>${esc(placeholder)}</option>
    ${hasLegacyValue ? `<option value="${esc(selected)}" selected>${esc(selected)}</option>` : ""}
    ${options.map((option) => `<option value="${esc(option)}" ${selected === option ? "selected" : ""}>${esc(option)}</option>`).join("")}
  `;
}

função nextActionSelectOptions(valorSelecionado = "") {
  return selectOptions(nextActionOptions, selectedValue, "Selecione a próxima ação");
}

função multiSelectOptions(opções, valorSelecionado = "") {
  const selected = splitChoiceValue(selectedValue);
  const selectedSet = new Set(selecionado);
  const legacyValues ​​= selected.filter((value) => !options.includes(value));
  retornar `
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
    <option value="${MANAGEMENT_OWNER_ID}" ${selected === MANAGEMENT_OWNER_ID ? "selected" : ""}>GestÃ£o</option>
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
  if (id === MANAGEMENT_OWNER_ID) return "GestÃ£o";
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

function opportunityFromAudit(item) {
  const metadata = item.metadata || {};
  const entityType = String(item.entityType || "").toLowerCase();
  if (entityType === "opportunity") return byId(state.opportunities, item.entityId);

  let opportunityId = metadata.opportunityId || null;
  if (entityType === "contract") opportunityId ||= byId(state.contracts, item.entityId)?.opportunityId;
  if (entityType === "customerpayment") {
    const payment = byId(state.payments, item.entityId);
    opportunityId ||= payment?.opportunityId || byId(state.contracts, payment?.contractId)?.opportunityId;
  }
  if (entityType === "project") opportunityId ||= byId(state.projects, item.entityId)?.opportunityId;
  se (entityType === "projectstage") {
    opportunityId ||= byId(state.projects, metadata.projectId)?.opportunityId;
  }
  se (entityType === "commissionentry") {
    const commission = byId(state.commissions, item.entityId);
    opportunityId ||= byId(state.contracts, metadata.contractId || commission?.contractId)?.opportunityId;
  }
  retornar porId(estado.oportunidades, idDaOportunidade);
}

função textoAtividadeRecente(item) {
  const oportunidade = oportunidadeDaAuditoria(item);
  const clientName = opportunity?.clientName || opportunity?.brandName || "";
  const opportunityTarget = clientName ? ` de ${clientName}` : "";
  const contract = byId(state.contracts, item.entityId) || byId(state.contracts, item.metadata?.contractId);
  const pagamento = byId(state.payments, item.entityId) || byId(state.payments, item.metadata?.paymentId);
  const commission = byId(state.commissions, item.entityId);
  const project = byId(state.projects, item.entityId) || byId(state.projects, item.metadata?.projectId);
  const paymentAmount = payment?.amountCents ? ` de ${brl(payment.amountCents)}` : "";
  const commissionAmount = commission?.amountCents ? ` de ${brl(commission.amountCents)}` : "";
  const crmStatus = crmStatusLabels[item.metadata?.crmStatus] || "uma nova etapa";
  const projectStatus = statusLabels[item.metadata?.status] || “estado de novo”;
  descrições constantes = {
    oportunidade_created: `A oportunidade${opportunityTarget} foi criada`,
    oportunidade_submetida: `A oportunidade${opportunityTarget} foi enviada para aprovação`,
    oportunidade_crm_updated: `As informações da oportunidade${opportunityTarget} foram atualizadas`,
    crm_status_updated: `A oportunidade${opportunityTarget} avançou para ${crmStatus}`,
    oportunidade_progress_updated: `O andamento da oportunidade${opportunityTarget} foi atualizado`,
    oportunidade_duplicada: `Uma oportunidade${opportunityTarget} foi duplicada`,
    oportunidade_archived: `A oportunidade${opportunityTarget} foi arquivada`,
    oportunidade_restored: `A oportunidade${opportunityTarget} voltou para a operação`,
    aprovado: `A condição comercial${opportunityTarget} foi aprovada`,
    aprovado_with_changes: `A condição comercial${opportunityTarget} foi aprovada com alterações`,
    aprovado_needs_information: `O gestor pediu mais informações sobre a oportunidade${opportunityTarget}`,
    information_answered: `As informações solicitadas sobre a oportunidade${opportunityTarget} foram enviadas`,
    aprovado_rejected: `A oportunidade${opportunityTarget} foi recusada e arquivada`,
    oportunidade_rejected: `A oportunidade${opportunityTarget} foi recusada e arquivada`,
    Condition_presented_to_client: `A condição comercial${opportunityTarget} foi apresentada ao cliente`,
    client_accepted_condition: `O cliente aceitou a condição comercial${opportunityTarget}`,
    client_requested_revision: `O cliente pediu alterações na condição${opportunityTarget}`,
    client_declined: `O cliente escolheu a condição${opportunityTarget}`,
    contract_pipeline_created: `O contrato${opportunityTarget} entrou em planejamento`,
    contract_planning_updated: `O planejamento do contrato${opportunityTarget} foi atualizado`,
    proposta_sent_to_client: `A proposta${opportunityTarget} foi enviada ao cliente`,
    contract_sent: `O contrato ${contract?.contractNumber || ""}${opportunityTarget} foi enviado`.replace(" ", " "),
    contract_signed: `O contrato ${contract?.contractNumber || ""}${opportunityTarget} foi assinado`.replace(" ", " "),
    customer_payment_created: `Um pagamento${paymentAmount}${opportunityTarget} foi programado`,
    customer_payment_registered: `Um pagamento${paymentAmount}${opportunityTarget} foi registrado`,
    customer_payment_updated: `O registro de pagamento${paymentAmount}${opportunityTarget} foi atualizado`,
    customer_payment_confirmed: `Um pagamento${paymentAmount}${opportunityTarget} foi confirmado`,
    commission_created_from_payment: `Uma comissão${commissionAmount}${opportunityTarget} foi registrada`,
    commission_manually_updated: `Uma comissão${commissionAmount}${opportunityTarget} foi atualizada`,
    Commission_receipt_registered: "Um comprovante de comissão foi anexado",
    payout_batch_created: "Um novo ciclo de pagamento de comissão foi criado",
    payout_batch_paid: "Um ciclo de comissão foi marcado como pagamento",
    manual_project_created: `O projeto ${project?.name || "manual"} foi criado`,
    project_created_from_approval: `O projeto${opportunityTarget} foi criado após a aprovação`,
    project_status_changed: `O projeto ${project?.name || ""} passou para ${projectStatus}`.replace(" ", " "),
    project_stage_status_changed: `Uma etapa do projeto${opportunityTarget} foi atualizada`,
    sale_validated: `A venda${opportunityTarget} foi validada`,
    csv_exported: "Um relacionamento foi exportado",
  };
  retornar descrições[item.action] || `Uma atualização${opportunityTarget} foi registrada`;
}

const auditActionLabels = {
  oportunidade_created: "Oportunidade criada",
  oportunidade_submetida: "Oportunidade enviada para aprovação",
  oportunidade_crm_updated: "Informações da oportunidade atualizada",
  crm_status_updated: "Etapa da oportunidade atualizada",
  oportunidade_progress_updated: "Anúncio de oportunidade atualizado",
  oportunidade_archived: "Oportunidade arquivada",
  oportunidade_restored: "Oportunidade restaurada",
  oportunidade_rejected: "Oportunidade recusada e arquivada",
  aprovado: "Condição comercial aprovada",
  approved_with_changes: "CondiÃ§Ã£o aprovada com alteraÃ§Ãµes",
  approval_needs_information: "Gestor solicitou informaÃ§Ãµes",
  contract_pipeline_created: "Contrato entrou em planejamento",
  contract_planning_updated: "Planejamento do contrato atualizado",
  customer_payment_created: "Pagamento registrado",
  customer_payment_updated: "Registro de pagamento atualizado",
  customer_payment_confirmed: "Pagamento confirmado",
  commission_manually_updated: "ComissÃ£o atualizada",
  commission_created_from_payment: "ComissÃ£o registrada",
  commission_receipt_registered: "Comprovante de comissÃ£o anexado",
  project_created_from_approval: "Projeto criado a partir da aprovaÃ§Ã£o",
  project_status_changed: "Status do projeto atualizado",
  project_stage_status_changed: "Etapa do projeto atualizada",
  manual_project_created: "Projeto criado manualmente",
};

function auditActionLabel(item) {
  const metadata = item.metadata || {};
  const base = auditActionLabels[item.action] || "Atividade atualizada";
  if (item.action === "crm_status_updated" && metadata.previousStatus && metadata.crmStatus) {
    return `Etapa: ${crmStatusLabels[metadata.previousStatus] || metadata.previousStatus} â†’ ${crmStatusLabels[metadata.crmStatus] || metadata.crmStatus}`;
  }
  if (item.action === "project_status_changed" && metadata.previousStatus && metadata.status) {
    return `Status: ${statusLabels[metadata.previousStatus] || metadata.previousStatus} â†’ ${statusLabels[metadata.status] || metadata.status}`;
  }
  return base;
}

function shortId(value) {
  const text = String(value || "");
  return text.length > 16 ? `${text.slice(0, 8)}â€¦${text.slice(-4)}` : text || "-";
}

function addNotification(text, { recipientUserId = null, recipientRole = null, title = "AtualizaÃ§Ã£o", kind = "info", entityType = null, entityId = null } = {}) {
  const roleRecipients = recipientRole
    ? state.users.filter((user) => user.role === recipientRole && user.active !== false && user.id !== currentUser?.id).map((user) => user.id)
    : [];
  const recipients = recipientUserId && recipientUserId !== currentUser?.id ? [recipientUserId] : roleRecipients;
  recipients.forEach((targetUserId) => state.notifications.unshift({
    id: uid("ntf"),
    title,
    kind,
    text,
    read: false,
    recipientUserId: targetUserId,
    recipientRole: targetUserId ? null : recipientRole,
    entityType,
    entityId,
    createdBy: currentUser?.id || "system",
    createdAt: nowIso(),
  }));
}

function notifyOpportunityTeam(opportunity, text, { title = "AtualizaÃ§Ã£o de oportunidade", kind = "opportunity" } = {}) {
  if (!opportunity || !currentUser) return;
  se (currentUser.role === "sdr") {
    adicionarNotificação(texto, { funçãoDoReceptor: "admin_manager", título, tipo, tipoDeEntidade: "oportunidade", idDaEntidade: opportunity.id });
    retornar;
  }
  const assignedUser = byId(state.users, opportunity.sdrId);
  se (assignedUser?.role === "sdr" && assignedUser.active !== false) {
    adicionarNotificação(texto, { recipientUserId: assignedUser.id, título, tipo, entityType: "opportunity", entityId: opportunity.id });
    retornar;
  }
  adicionarNotificação(texto, { funçãoDoReceptor: "admin_manager", título, tipo, tipoDeEntidade: "oportunidade", idDaEntidade: opportunity.id });
}

função condiçãoParaRascunhoDeContrato(opp, condição, idDoAtor, sequência = estado.contratos.comprimento + 1) {
  const amountCents = condition?.amountCents ?? opp.suggestedAmountCents ?? 0;
  const paymentPlan = normalizePaymentPlan(condition?.paymentTerms || opp.suggestedPaymentTerms || "50_50");
  const paymentTerms = paymentPlanLabel(paymentPlan);
  retornar {
    id: uid("ctr"),
    ID da oportunidade: opp.id,
    clientId: `client_${opp.id}`,
    conditionVersionId: condition?.id || null,
    númeroDoContrato: númeroDoContrato(sequência),
    valorCentavos,
    proposalAmountCents: amountCents,
    Plano de pagamento,
    Condições de pagamento,
    escopo: condição?.escopo || escopo sugerido pela parte || escopo solicitado pela parte || "",
    entregáveis: condição?.entregáveis ​​|| opp.entregáveissugeridos || "",
    NomeDoArquivoDaProposta: "",
    ID do anexo da proposta: "",
    propostaAnexadaEm: nulo,
    propostaEnviadaEm: nulo,
    propostaAceitaEm: nulo,
    link do contrato: "",
    contractLinkAddedAt: nulo,
    status: "planejamento_de_proposta",
    criadoPor: idDoAtor,
    criadoEm: agoraIso(),
    sentAt: nulo,
    assinadoEm: nulo,
    vendaValidadaEm: nulo,
  };
}

função normalizarContrato(contrato, opp, condição) {
  const paymentPlan = normalizePaymentPlan(contract.paymentPlan || contract.paymentTerms || condition?.paymentTerms || opp?.suggestedPaymentTerms || "50_50");
  const paymentTerms = paymentPlanLabel(paymentPlan);
  contrato.proposalAmountCents = contrato.proposalAmountCents ?? contrato.amountCents ?? condição?.amountCents ?? opp?.suggestedAmountCents ?? 0;
  contract.amountCents = contract.amountCents ?? contract.proposalAmountCents;
  contrato.planodepagamento = planodepagamento;
  contrato.termosdepagamento = termosdepagamento;
  contrato.escopo = contrato.escopo || condição?.escopo || opp?.escopo sugerido || opp?.escopo solicitado || "";
  contrato.entregáveis ​​= contrato.entregáveis ​​|| condição?.entregáveis ​​|| oportunidade?.entregáveissugeridos || "";
  contract.proposalFileName = contract.proposalFileName || "";
  contract.proposalAttachmentId = contract.proposalAttachmentId || "";
  contrato.propostaAnexadaEm = contrato.propostaAnexadaEm || nulo;
  contrato.propostaEnviadaEm = contrato.propostaEnviadaEm || nulo;
  contrato.propostaAceitaEm = contrato.propostaAceitaEm || nulo;
  contrato.linkContrato = contrato.linkContrato || "";
  contract.contractLinkAddedAt = contract.contractLinkAddedAt || null;
  contract.recordMode = contract.recordMode || (contract.opportunityId ? "crm" : "external");
  contract.externalClientName = contract.externalClientName || "";
  contrato.nomeDaMarcaExterna = contrato.nomeDaMarcaExterna || "";
  contract.sdrId = contract.sdrId || opp?.sdrId || null;
  contract.externalSource = contract.externalSource || (contract.recordMode === "external" ? "outside_crm" : "crm");
  contrato.notas = contrato.notas || "";
  contract.contractAttachmentId = contract.contractAttachmentId || "";
  contract.contractFileName = contract.contractFileName || "";
  if (contract.status === "draft_contract") contract.status = contract.proposalFileName ? "proposal_ready" : "proposal_planning";
}

função isExternalContract(contrato) {
  retornar Boolean(contrato && (contrato.recordMode === "external" || (!contrato.opportunityId && contrato.externalClientName)));
}

função contractClientName(contrato) {
  const oportunidade = contrato && byId(estado.oportunidades, contrato.opportunityId);
  retornar contrato?.externalClientName || oportunidade?.clientName || "Contrato externo";
}

função contractSdrId(contrato) {
  const oportunidade = contrato && byId(estado.oportunidades, contrato.opportunityId);
  contrato de retorno?.sdrId || oportunidade?.sdrId || nulo;
}

função visibleOpportunities() {
  se (!usuárioAtual) retorne [];
  Se (currentUser.role === "admin_manager") retornar state.opportunities;
  retornar state.opportunities.filter((item) => item.sdrId === currentUser.id);
}

função operationalOpportunities() {
  retornar visibleOpportunities().filter((item) => !isArchivedOpportunity(item) && !item.manualProjectOnly);
}

função oportunidades arquivadas() {
  retornar visibleOpportunities().filter((item) => isArchivedOpportunity(item) && !item.manualProjectOnly);
}

função isTerminallyRejected(oportunidade) {
  retornar Boolean(oportunidade && (oportunidade.status === "rejeitado" || oportunidade.terminalRejection));
}

função isArchivedOpportunity(oportunidade) {
  retornar Boolean(oportunidade && (oportunidade.status === "cancelada" || oportunidade.arquivadaEm || éTerminallyRejeitada(oportunidade)));
}

função visibleNotifications() {
  se (!usuárioAtual) retorne [];
  retornar state.notifications.filter((item) => (
    item.recipientUserId === currentUser.id
    || (!item.recipientUserId && item.recipientRole === currentUser.role)
  ));
}

função activeCondition(opportunityId) {
  return state.conditions.find((item) => item.opportunityId === opportunityId && item.isActive);
}

função latestContract(opportunityId) {
  retornar state.contracts.find((item) => item.opportunityId === opportunityId);
}

função visibleContracts() {
  const visibleIds = new Set(visibleOpportunities().map((opp) => opp.id));
  return state.contracts.filter((contract) => isExternalContract(contract)
    ? currentUser?.role === "admin_manager" || contractSdrId(contract) === currentUser?.id
    : visibleIds.has(contract.opportunityId));
}

function visiblePayments() {
  if (currentUser.role === "admin_manager") return state.payments;
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

função projectForContract(contratoId) {
  retornar state.projects.find((item) => item.contractId === contractId);
}

função projectForOpportunity(opportunityId) {
  retornar state.projects.find((item) => item.opportunityId === opportunityId);
}

função statusBadge(status) {
  retornar `<span class="status status-condition ${statusClasses[status] || "info"}">${statusLabels[status] || status>`;
}

função crmStatusBadge(status) {
  retornar `<span class="status status-crm ${crmStatusClasses[status] || "info"}">${crmStatusLabels[status] || status || "-"}</span>`;
}

função podeSolicitarAprovaçãoDeCondição(opp) {
  se (!opp) retorne falso;
  if (["lost", "sale_completed"].includes(opp.crmStatus)) return false;
  retornar opp.status === "rascunho";
}

função conditionApprovalMissingFields(opp) {
  const missing = [];
  if (!String(opp?.clientName || "").trim()) missing.push("nome do cliente");
  if (!normalizeServiceIds(opp?.serviceIds, opp?.serviceId).length) missing.push("serviço");
  if (Number(opp?.suggestedAmountCents || 0) <= 0) missing.push("valor proposto");
  retornar itens faltantes;
}

função paymentPlanLabel(plano) {
  const labels = {
    "50_50": "50% / 50%",
    "100": "Uma vista / 100%",
  };
  retorna labels[plano] || plano || "-";
}

função normalizarPlanoDePagamento(valor) {
  const raw = String(value || "").trim();
  const lower = raw.toLowerCase();
  if (raw === "100" || lower.includes("vista") || lower.includes("100")) return "100";
  retornar "50_50";
}

função paymentPlanOptions(valorSelecionado = "") {
  const selected = normalizePaymentPlan(selectedValue);
  retornar `
    <option value="50_50" ${selected === "50_50" ? "selected" : ""}>50% / 50%</option>
    <option value="100" ${selected === "100" ? "selected" : ""}>A vista / 100%</option>
  `;
}

const projectStatusOptions = [
  ["planejamento", "Planejamento"],
  ["ativo", "Ativo"],
  ["em espera", "Em pausa"],
  ["concluído", "Concluido"],
  ["cancelado", "Cancelado"],
];

const stageStatusOptions = [
  ["trancado", "Bloqueado"],
  ["pronto", "Pronto"],
  ["in_progress", "Em andamento"],
  ["review", "Em revisao"],
  ["aprovado", "Aprovado"],
  ["concluído", "Concluido"],
  ["pulado", "Pulado"],
  ["cancelado", "Cancelado"],
];

const metricIconAliases = {
  "$": "círculo-símbolo-de-dólar",
  "âœ“": "check-circle-2",
  "â–¤": "receipt-text",
  "â–¥": "square-kanban",
  "â–£": "file-signature",
  "â–§": "folder-closed",
  "â†—": "send",
  "â—´": "clock-3",
  "": "activity",
};

function routeLabel(route) {
  const secondaryLabels = { archived: "Oportunidades arquivadas", notifications: "NotificaÃ§Ãµes" };
  return navItems.find(([itemRoute]) => itemRoute === route)?.[1] || secondaryLabels[route] || "Dashboard";
}

function metricIconName(icon) {
  return metricIconAliases[icon] || icon || "activity";
}

function renderIcon(name, className = "") {
  return `<i data-lucide="${esc(name)}" class="${esc(className)}" aria-hidden="true"></i>`;
}

function renderBrandLogo(className = "") {
  return `<img class="brand-logo${className ? ` ${esc(className)}` : ""}" src="./assets/mada-logo.jpeg" alt="Mada" />`;
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
    app.innerHTML = `<main class="auth-screen"><section class="auth-loading">${renderBrandLogo("auth-loading-logo")}${renderIcon("loader-circle")}<strong>Carregando Portal Mada</strong><span>Validando acesso e sincronizando dados.</span></section></main>`;
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
            <span>${currentUser.workspaceKind === "training" ? "Ambiente de treinamento" : "Mada OperaÃ§Ã£o"}</span>
            <strong>${esc(routeLabel(currentRoute))}</strong>
          </div>
        </div>
        <button class="command-trigger" type="button" data-command-menu aria-label="Abrir busca e comandos">
          ${renderIcon("search", "command-trigger-icon")}
          <span>Buscar ou ir para...</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div class="topbar-actions">
          <span class="topbar-sync ${supabaseSyncReady ? "is-online" : ""}" title="${esc(supabaseSyncStatus)}"><i></i><span>${supabaseSyncStatus === "Salvando alteraÃ§Ãµes" ? "Salvando" : "Dados salvos"}</span></span>
          ${["dashboard", "opportunities", "progress"].includes(currentRoute) ? `<button class="button topbar-create" type="button" data-new-opportunity aria-label="Nova oportunidade">${renderIcon("plus")}<span>Nova oportunidade</span></button>` : ""}
          <button class="notification icon-button" type="button" data-route="notifications" aria-label="NotificaÃ§Ãµes">
            ${renderIcon("bell")}
            <span>${visibleNotifications().filter((item) => !item.read).length}</span>
          </button>
          <button class="topbar-avatar" type="button" data-route="settings" title="Abrir meu perfil" aria-label="Abrir meu perfil">${esc(initials(currentUser.name))}</button>
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
  const enrollment = !currentUser.mfaEnrolled;
  return `
    <main class="auth-screen">
      <section class="auth-card">
        <div class="auth-brand">${renderBrandLogo("auth-brand-logo")}<span>Portal Comercial</span></div>
        ${enrollment ? `
          <div class="auth-form" data-mfa-required-enrollment>
            <div class="auth-form-head"><strong>Proteja sua conta de gestor</strong><span>A verificaÃ§Ã£o em duas etapas Ã© obrigatÃ³ria antes de acessar os dados do portal.</span></div>
            ${mfaEnrollment ? `
              <div class="mfa-enrollment">
                <img src="${esc(mfaEnrollment.qrCode)}" alt="QR Code para configurar o aplicativo autenticador" />
                <p>Escaneie o QR Code no seu aplicativo autenticador e confirme o cÃ³digo gerado.</p>
                <code>${esc(mfaEnrollment.secret)}</code>
              </div>
              <form class="auth-form" data-mfa-challenge-form data-enrollment-factor="${esc(mfaEnrollment.factorId)}">
                <label class="field"><span>CÃ³digo de 6 dÃ­gitos</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required /></label>
                <button class="button" type="submit">Ativar e continuar ${renderIcon("shield-check")}</button>
                <div class="auth-error" data-mfa-error hidden></div>
              </form>
            ` : `<button class="button" type="button" data-mfa-required-start>Configurar aplicativo autenticador ${renderIcon("shield-check")}</button>`}
          </div>
        ` : `
          <form class="auth-form" data-mfa-challenge-form>
            <div class="auth-form-head"><strong>VerificaÃ§Ã£o em duas etapas</strong><span>Digite o cÃ³digo atual do seu aplicativo autenticador.</span></div>
            <label class="field"><span>CÃ³digo de 6 dÃ­gitos</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required /></label>
            <button class="button" type="submit">Verificar ${renderIcon("shield-check")}</button>
            <div class="auth-error" data-mfa-error hidden></div>
          </form>
        `}
      </section>
    </main>
  `;
}

function bindMfaChallenge() {
  document.querySelector("[data-mfa-required-start]")?.addEventListener("click", async (event) => {
    event.currentTarget.disabled = true;
    try {
      mfaEnrollment = await postPortal("/api/portal-auth", { action: "mfa_enroll" });
      render();
    } catch (error) {
      showToast(error.message);
      event.currentTarget.disabled = false;
    }
  });
  document.querySelector("[data-mfa-challenge-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const code = new FormData(form).get("code");
    const errorBox = document.querySelector("[data-mfa-error]");
    try {
      const enrollmentFactor = form.dataset.enrollmentFactor;
      let factorId = enrollmentFactor;
      if (!factorId) {
        const factors = await postPortal("/api/portal-auth", { action: "mfa_list" });
        const factor = factors.factors.find((item) => item.status === "verified") || factors.factors[0];
        if (!factor) throw new Error("Nenhum autenticador configurado para esta conta.");
        factorId = factor.id;
      }
      await postPortal("/api/portal-auth", { action: "mfa_verify", factorId, code });
      mfaEnrollment = null;
      currentUser.mfaEnrolled = true;
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
  const isInvitation = new URLSearchParams(location.search).get("mode") === "invite" || recovery.get("type") === "invite";
  return `
    <main class="auth-screen">
      <section class="auth-card" aria-label="Acesso ao Portal Comercial Mada">
        <div class="auth-brand">
          ${renderBrandLogo("auth-brand-logo")}
          <span>Portal Comercial</span>
        </div>
        <div class="auth-copy">
          <span class="auth-kicker">Portal interno</span>
          <h1>Portal Comercial</h1>
          <p>OperaÃ§Ãµes comerciais, contratos e projetos em um Ãºnico ambiente.</p>
        </div>
        ${hasRecoverySession ? `
        <form class="auth-form" data-complete-recovery-form data-invitation-mode="${isInvitation ? "true" : "false"}">
          <div class="auth-form-head"><strong>${isInvitation ? "Criar acesso de SDR" : "Definir nova senha"}</strong><span>${isInvitation ? "Crie sua senha para entrar no Portal Comercial Mada." : "Crie uma senha exclusiva com pelo menos 10 caracteres."}</span></div>
          <label class="field"><span>Nova senha</span><input name="newPassword" type="password" minlength="10" autocomplete="new-password" required /></label>
          <label class="field"><span>Confirmar senha</span><input name="confirmPassword" type="password" minlength="10" autocomplete="new-password" required /></label>
          <button class="button" type="submit" data-recovery-button>${isInvitation ? "Criar minha senha" : "Salvar senha"} ${renderIcon("arrow-right")}</button>
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
    ? navItems.filter(([route]) => !["approvals", "services", "reports", "audit"].includes(route))
    : navItems;
  const groups = [
    ["Comercial", ["dashboard", "opportunities", "progress", "approvals", "contracts"]],
    ["Financeiro", ["payments", "commissions", "files", "reports"]],
    ["Sistema", ["projects", "services", "audit", "settings"]],
  ].map(([title, routes]) => [title, allowed.filter(([route]) => routes.includes(route))]).filter(([, items]) => items.length);

  return `
    <aside class="sidebar ${mobileNavOpen ? "is-open" : ""}" data-sidebar>
      <div class="brand-block">
        <div class="brand-logo-lockup">
          ${renderBrandLogo("sidebar-brand-logo")}
          <span class="brand-subtitle">Portal Comercial</span>
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
                  ${membership.workspaceKind === "training" ? "Treinamento" : "OperaÃ§Ã£o"}
                </option>
              `).join("")}
            </select>
          </label>
        ` : ""}
        <button class="user-summary user-summary-button" type="button" data-route="settings" aria-label="Abrir meu perfil">
          <span class="user-avatar">${esc(initials(currentUser.name))}</span>
          <div><strong>${esc(currentUser.name)}</strong><span>${roleLabels[currentUser.role]}</span></div>
        </button>
        <button class="logout" type="button" data-logout>${renderIcon("log-out")}<span>Sair</span></button>
      </div>
    </aside>
  `;
}

function renderCommandMenu() {
  const allowedRoutes = currentUser.role === "sdr"
    ? navItems.filter(([route]) => !["approvals", "services", "reports", "audit"].includes(route))
    : navItems;
  return `
    <div class="command-backdrop" data-close-command>
      <section class="command-menu" role="dialog" aria-modal="true" aria-label="Busca e comandos" data-command-panel>
        <div class="command-search">
          ${renderIcon("search")}
          <input type="search" data-command-search placeholder="Buscar pÃ¡gina ou aÃ§Ã£o..." autocomplete="off" />
          <kbd>Esc</kbd>
        </div>
        <div class="command-content" data-command-content>
          <span class="command-group-label">NavegaÃ§Ã£o</span>
          ${allowedRoutes.map(([route, label, icon]) => `
            <button type="button" class="command-item" data-route="${route}" data-command-keywords="${esc(`${label} ${route}`.toLowerCase())}">
              ${renderIcon(icon)}
              <span><strong>${esc(label)}</strong><small>Abrir mÃ³dulo</small></span>
              ${renderIcon("arrow-up-right")}
            </button>
          `).join("")}
          <span class="command-group-label">AÃ§Ãµes rÃ¡pidas</span>
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
    archived: renderArchivedOpportunities,
    notifications: renderNotifications,
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
    ["Em negociaÃ§Ã£o", visibleOpportunities().filter((item) => ["proposal_sent_crm", "negotiating"].includes(item.crmStatus)).length],
    ["Contratos", visibleOpportunities().filter((item) => item.crmStatus === "awaiting_contract_payment").length],
    ["ConcluÃ­das", visibleOpportunities().filter((item) => item.crmStatus === "sale_completed").length],
  ];
  const recentActivity = state.auditLogs.slice(0, 4);

  return `
    ${pageHead("Dashboard Geral", `Ola, ${esc(currentUser.name)}.`)}
    <div class="grid dashboard-metrics">
      ${metricCard("Aguardando AprovaÃ§Ã£o", m.pendingApprovals, "â—´")}
      ${metricCard("CondiÃ§Ãµes Aprovadas", m.approved, "âœ“")}
      ${metricCard("Vendas Validadas", m.validatedSales, "â–¤")}
      ${metricCard("Projetos Ativos", m.activeProjects, "â–¥")}
      ${metricCard("ComissÃ£o DisponÃ­vel", brl(m.commissionAvailable), "$")}
      ${metricCard("Receita Recebida", brl(m.received), "$")}
    </div>
    <div class="dashboard-overview">
      <section class="card pipeline-card">
        <div class="section-head">
          <div><h3>Pipeline comercial</h3><p>VisÃ£o rÃ¡pida da jornada atÃ© a venda concluÃ­da.</p></div>
          <button class="button ghost compact-button" type="button" data-route="progress">Ver andamento ${renderIcon("arrow-right")}</button>
        </div>
        <div class="pipeline-strip" aria-label="Etapas do pipeline comercial">
          ${pipeline.map(([label, value], index) => `
            <div class="pipeline-step ${value ? "has-items" : "is-empty"}">
              <span>${index + 1}</span><div><strong>${value}</strong><small>${label}</small></div>
              <i class="pipeline-progress" aria-hidden="true"></i>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="card finance-summary-card">
        <div class="section-head"><div><h3>Resumo financeiro</h3><p>Valores consolidados do portal.</p></div></div>
        <div class="kpi-list">
          <div class="kpi-row"><span>Receita contratada</span><strong>${brl(m.revenue)}</strong></div>
          <div class="kpi-row"><span>Receita recebida</span><strong>${brl(m.received)}</strong></div>
          <div class="kpi-row"><span>ComissÃµes geradas</span><strong>${brl(state.commissions.reduce((sum, item) => sum + item.amountCents, 0))}</strong></div>
          <div class="kpi-row"><span>Ticket mÃ©dio</span><strong>${m.validatedSales ? brl(Math.round(m.revenue / m.validatedSales)) : "-"}</strong></div>
        </div>
        <button class="button secondary compact-button" type="button" data-route="reports">Abrir relatÃ³rios ${renderIcon("arrow-up-right")}</button>
      </section>
    </div>
    <div class="grid dashboard-lists">
      <section class="card">
        <div class="section-head"><div><h3>AÃ§Ãµes pendentes</h3><p>O que precisa de atenÃ§Ã£o agora.</p></div></div>
        ${pendingActions.length ? renderOpportunityList(pendingActions.slice(0, 4)) : empty("Nenhuma aÃ§Ã£o pendente", "â—Œ", "Quando uma oportunidade precisar da sua atenÃ§Ã£o, ela aparece aqui.")}
      </section>
      <section class="card">
        <div class="section-head"><div><h3>Atividades recentes</h3><p>Ãšltimas movimentaÃ§Ãµes da equipe.</p></div></div>
        ${recentActivity.length ? `<div class="activity-list">${recentActivity.map((item) => `<div class="activity-item">${renderIcon("history")}<div><strong>${esc(recentActivityText(item))}</strong><span>${dateLabel(item.createdAt)} Â· ${esc(getActorName(item.actorUserId || item.actorId))}</span></div></div>`).join("")}</div>` : empty("Nenhuma atividade recente", "â—Œ", "As prÃ³ximas atualizaÃ§Ãµes aparecerÃ£o aqui.")}
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
            <span>${item.status === "draft" ? "Pronta para completar e pedir aprovaÃ§Ã£o" : statusLabels[item.status] || item.status} Â· ${brl(item.suggestedAmountCents)}</span>
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
    ${pageHead("Fila de AprovaÃ§Ãµes", pending.length ? countLabel(pending.length, "solicitaÃ§Ã£o pendente", "solicitaÃ§Ãµes pendentes") : "Nenhuma solicitaÃ§Ã£o pendente")}
    ${pending.length ? opportunityTable(pending, true) : `<section class="card">${empty("Nenhuma aprovaÃ§Ã£o pendente", "â—·")}</section>`}
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
          <h3>ComissÃµes por SDR</h3>
          <p>Abra uma SDR para ver o dashboard detalhado de vendas, contratos, lotes e comissÃµes.</p>
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
                  <p>${summary.commissions.length} comissÃ£o(Ãµes) gerada(s)</p>
                </div>
              </div>
              <div class="kpi-list">
                <div class="kpi-row"><span>ComissÃ£o total</span><strong>${brl(summary.totalCommissionCents)}</strong></div>
                <div class="kpi-row"><span>DisponÃ­vel</span><strong>${brl(summary.availableCents)}</strong></div>
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
      currentUser.role === "admin_manager" ? "Todas as oportunidades" : "Suas oportunidades",
      `<button class="button secondary" type="button" data-route="archived">${renderIcon("archive")} Arquivadas (${archivedOpportunities().length})</button>`
    )}
    <div class="toolbar opportunity-toolbar">
      <label class="toolbar-search">${renderIcon("search")}<input class="search" type="search" data-search placeholder="Buscar por cliente ou marca..." /></label>
      <select data-status-filter aria-label="Filtrar status CRM">
        <option value="">Todos os status do CRM</option>
        ${Object.entries(crmStatusLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}
      </select>
      <button class="button secondary filter-toggle" type="button" data-toggle-opportunity-filters aria-expanded="${opportunityFiltersOpen}">${renderIcon("sliders-horizontal")} Filtros${opportunityFiltersOpen ? "" : " (mais)"}</button>
      ${opportunityFiltersOpen ? `<div class="opportunity-more-filters" data-opportunity-more-filters>
        <select data-sdr-filter aria-label="Filtrar SDR">
          <option value="">Todas as SDRs</option>
          ${sdrUsers().map((user) => `<option value="${esc(user.id)}">${esc(user.name)}</option>`).join("")}
        </select>
        ${renderDateControl({ placeholder: "Data inicial", ariaLabel: "Data inicial", compact: true, inputAttributes: "data-date-from-filter" })}
        ${renderDateControl({ placeholder: "Data final", ariaLabel: "Data final", compact: true, inputAttributes: "data-date-to-filter" })}
        <input class="search" data-money-input data-amount-min-filter inputmode="decimal" placeholder="Valor mÃ­nimo" />
        <input class="search" data-money-input data-amount-max-filter inputmode="decimal" placeholder="Valor mÃ¡ximo" />
      </div>` : ""}
    </div>
    <div class="table-meta"><span><strong>${countLabel(items.length, "oportunidade", "oportunidades")}</strong></span><span>${renderIcon("sliders-horizontal")} Busca e status visÃ­veis; filtros avanÃ§ados sob demanda</span></div>
    <div data-opportunity-table>${opportunityTable(items)}</div>
  `;
}

function renderArchivedOpportunities() {
  const items = archivedOpportunities();
  return `
    ${pageHead(
      "Oportunidades arquivadas",
      "Registros fora da operacao ativa; recusas do gestor ficam bloqueadas definitivamente",
      `<button class="button secondary" type="button" data-route="opportunities">${renderIcon("arrow-left")} Voltar para ativas</button>`
    )}
    ${items.length ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Cliente</th><th>Marca</th><th>ServiÃ§os</th><th>SDR</th><th>Status anterior</th><th>Arquivada em</th><th></th></tr></thead>
          <tbody>
            ${items.map((item) => `
              <tr>
                <td><strong>${esc(item.clientName)}</strong></td>
                <td>${esc(item.brandName || "-")}</td>
                <td>${esc(serviceNamesForOpportunity(item))}</td>
                <td>${esc(getActorName(item.sdrId))}</td>
                <td>${statusBadge(isTerminallyRejected(item) ? "rejected" : item.archivedFromStatus || "draft")}</td>
                <td>${dateLabel(item.archivedAt || item.updatedAt)}</td>
                <td class="row-actions">
                  <button class="button secondary" type="button" data-open-opportunity="${item.id}">Ver historico</button>
                  ${isTerminallyRejected(item)
                    ? `<span class="archive-lock">${renderIcon("lock-keyhole")} Bloqueada</span>`
                    : `<button class="button" type="button" data-restore-opportunity="${item.id}">${renderIcon("archive-restore")} Restaurar</button>`}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhuma oportunidade arquivada", "archive", "Oportunidades arquivadas permanecem para consulta; recusas do gestor nÃ£o podem ser restauradas.")}</section>`}
  `;
}

function renderNotifications() {
  const items = visibleNotifications();
  const unread = items.filter((item) => !item.read).length;
  return `
    ${pageHead(
      "NotificaÃ§Ãµes",
      `${unread ? countLabel(unread, "notificaÃ§Ã£o nÃ£o lida", "notificaÃ§Ãµes nÃ£o lidas") : "Nenhuma notificaÃ§Ã£o nÃ£o lida"} de ${countLabel(items.length, "notificaÃ§Ã£o", "notificaÃ§Ãµes")}`,
      unread ? `<button class="button secondary" type="button" data-mark-notifications>${renderIcon("check-check")} Marcar todas como lidas</button>` : ""
    )}
    ${items.length ? `
      <section class="notification-list" aria-label="Central de notificacoes">
        ${items.map((item) => `
          <article class="notification-row ${item.read ? "is-read" : "is-unread"}">
            <span class="notification-kind">${renderIcon(item.kind === "approval" ? "badge-check" : "bell")}</span>
            <div class="notification-copy">
              <div><strong>${esc(item.title || "AtualizaÃ§Ã£o")}</strong>${item.read ? "" : `<span class="notification-new">Nova</span>`}</div>
              <p>${esc(item.text || item.message || "AtualizaÃ§Ã£o no portal")}</p>
              <small>${dateLabel(item.createdAt)}</small>
            </div>
            <div class="notification-actions">
              ${item.entityId ? `<button class="button secondary compact-button" type="button" data-open-notification="${item.id}">Abrir</button>` : ""}
              ${item.read ? "" : `<button class="icon-button" type="button" data-read-notification="${item.id}" aria-label="Marcar como lida">${renderIcon("check")}</button>`}
            </div>
          </article>
        `).join("")}
      </section>
    ` : `<section class="card">${empty("Nenhuma notificacao", "bell", "AprovaÃ§Ãµes, contratos, pagamentos e atualizaÃ§Ãµes destinadas a voce aparecerao aqui.")}</section>`}
  `;
}

function progressStageTrack(status) {
  const activeIndex = crmPipelineStatuses.indexOf(status);
  const special = crmSpecialStatuses.includes(status);
  return crmPipelineStatuses.map((_, index) => `<i class="${special || index <= activeIndex ? "is-active" : ""}"></i>`).join("");
}

function progressStageOptions(status) {
  const option = (key) => `
    <button type="button" class="progress-option ${status === key ? "is-selected" : ""}" data-progress-stage-value="${key}">
      <span class="progress-option-dot stage-${key}"></span>
      <span>${esc(crmStatusLabels[key])}</span>
      ${status === key ? renderIcon("check") : ""}
    </button>
  `;
  return `
    <div class="progress-option-group">
      <span class="progress-popover-title">Pipeline principal</span>
      ${crmPipelineStatuses.map(option).join("")}
    </div>
    <div class="progress-option-group special">
      <span class="progress-popover-title">Estados especiais</span>
      ${crmSpecialStatuses.map(option).join("")}
    </div>
  `;
}

function progressActionButtons(options, selected) {
  return options.map((actionName) => `
    <button type="button" class="progress-option ${selected === actionName ? "is-selected" : ""}" data-progress-action-value="${esc(actionName)}" data-action-search="${esc(actionName.toLowerCase())}">
      <span>${esc(actionName)}</span>
      ${selected === actionName ? renderIcon("check") : ""}
    </button>
  `).join("");
}

function progressActionOptions(status, selected) {
  const suggested = nextActionSuggestions[status] || nextActionOptions.slice(0, 3);
  return `
    <div class="progress-option-group" data-progress-suggested-group>
      <span class="progress-popover-title">Sugeridas para esta etapa</span>
      <div data-progress-suggested-list>${progressActionButtons(suggested, selected)}</div>
    </div>
    <div class="progress-option-group">
      <span class="progress-popover-title">Todas as aÃ§Ãµes</span>
      ${progressActionButtons(nextActionOptions, selected)}
    </div>
  `;
}

function parseDateOnly(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function dateOnlyValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function progressDateLabel(value) {
  return value ? dateLabel(value) : "Definir data";
}

function progressCalendarBody(selectedValue, monthValue) {
  const selected = parseDateOnly(selectedValue);
  const monthDate = parseDateOnly(monthValue) || selected || new Date();
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayValue = dateOnlyValue(new Date());
  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const day = index - firstWeekday + 1;
    if (day < 1 || day > daysInMonth) {
      cells.push("<span></span>");
      continue;
    }
    const value = dateOnlyValue(new Date(year, month, day));
    cells.push(`<button type="button" class="${value === selectedValue ? "is-selected" : ""} ${value === todayValue ? "is-today" : ""}" data-progress-date-value="${value}">${day}</button>`);
  }
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(year, month, 1));
  return `
    <div class="progress-calendar-head">
      <button type="button" data-progress-calendar-nav="-1" aria-label="Mes anterior">${renderIcon("chevron-left")}</button>
      <strong>${esc(monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1))}</strong>
      <button type="button" data-progress-calendar-nav="1" aria-label="Proximo mes">${renderIcon("chevron-right")}</button>
    </div>
    <div class="progress-calendar-week"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div>
    <div class="progress-calendar-days">${cells.join("")}</div>
    <div class="progress-calendar-foot">
      <button type="button" data-progress-date-clear>Limpar</button>
      <button type="button" data-progress-date-value="${todayValue}">Hoje</button>
    </div>
  `;
}

function renderDateControl({ name = "", value = "", placeholder = "Definir data", ariaLabel = "", inputAttributes = "", compact = false } = {}) {
  const normalizedValue = String(value || "").slice(0, 10);
  const monthValue = normalizedValue || dateOnlyValue(new Date());
  return `
    <div class="portal-date-control ${compact ? "is-compact" : ""}" data-date-control>
      <input type="hidden" ${name ? `name="${esc(name)}"` : ""} value="${esc(normalizedValue)}" data-date-input ${inputAttributes} />
      <details class="progress-picker date-picker portal-date-picker" data-date-picker ${ariaLabel ? `aria-label="${esc(ariaLabel)}"` : ""}>
        <summary>${renderIcon("calendar-days")}<span class="${normalizedValue ? "" : "is-placeholder"}" data-date-label>${esc(normalizedValue ? dateLabel(normalizedValue) : placeholder)}</span>${renderIcon("chevron-down")}</summary>
        <div class="progress-popover progress-calendar" data-date-calendar data-month="${monthValue}">${progressCalendarBody(normalizedValue, monthValue)}</div>
      </details>
    </div>
  `;
}

function renderDateField(label, name, value = "", options = {}) {
  return `
    <div class="field portal-date-field ${options.full ? "full" : ""}">
      <span>${esc(label)}${options.required ? " *" : ""}</span>
      ${renderDateControl({ name, value, placeholder: options.placeholder || "Definir data", ariaLabel: label, inputAttributes: options.required ? "required" : "" })}
    </div>
  `;
}

function renderProgressStagePicker(item) {
  const status = item.crmStatus || "lead_mapped";
  return `
    <input type="hidden" data-progress-crm-status value="${esc(status)}" />
    <details class="progress-picker stage-picker" data-progress-stage-picker>
      <summary>
        <span class="progress-stage-summary">
          <span class="progress-stage-pill stage-${status}" data-progress-stage-label>${esc(crmStatusLabels[status])}</span>
          <span class="progress-stage-track" data-progress-stage-track>${progressStageTrack(status)}</span>
        </span>
        ${renderIcon("chevron-down")}
      </summary>
      <div class="progress-popover stage-popover">${progressStageOptions(status)}</div>
    </details>
  `;
}

function renderProgressActionPicker(item) {
  const status = item.crmStatus || "lead_mapped";
  return `
    <input type="hidden" data-progress-next-action value="${esc(item.nextAction || "")}" />
    <details class="progress-picker action-picker" data-progress-action-picker>
      <summary>
        <span class="${item.nextAction ? "" : "is-placeholder"}" data-progress-action-label>${esc(item.nextAction || "Selecionar aÃ§Ã£o")}</span>
        ${renderIcon("chevron-down")}
      </summary>
      <div class="progress-popover action-popover">
        <label class="progress-action-search">${renderIcon("search")}<input type="search" placeholder="Buscar aÃ§Ã£o..." data-progress-action-search /></label>
        <div class="progress-action-options" data-progress-action-options>${progressActionOptions(status, item.nextAction || "")}</div>
      </div>
    </details>
  `;
}

function renderProgressDatePicker(item) {
  const selected = item.nextActionDate || "";
  const monthValue = selected || dateOnlyValue(new Date());
  return `
    <input type="hidden" data-progress-next-date value="${esc(selected)}" />
    <details class="progress-picker date-picker" data-progress-date-picker>
      <summary>${renderIcon("calendar-days")}<span class="${selected ? "" : "is-placeholder"}" data-progress-date-label>${esc(progressDateLabel(selected))}</span></summary>
      <div class="progress-popover progress-calendar" data-progress-calendar data-month="${monthValue}">${progressCalendarBody(selected, monthValue)}</div>
    </details>
  `;
}

function renderProgressConditionAction(item) {
  const canAct = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && item.sdrId === currentUser.id);
  const missing = conditionApprovalMissingFields(item);
  if (item.status === "pending_approval") {
    return currentUser.role === "admin_manager"
      ? `<button class="progress-condition review" type="button" data-open-opportunity="${item.id}">${renderIcon("badge-check")} Revisar condiÃ§Ã£o</button>`
      : `<span class="progress-condition waiting">${renderIcon("clock-3")} Em anÃ¡lise</span>`;
  }
  if (item.status === "needs_information") {
    return `<button class="progress-condition info" type="button" data-open-opportunity="${item.id}">${renderIcon("message-square-more")} ${currentUser.role === "sdr" ? "Responder gestor" : "Aguardando SDR"}</button>`;
  }
  if (["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"].includes(item.status)) {
    return `<span class="progress-condition approved">${renderIcon("circle-check")} CondiÃ§Ã£o aprovada</span>`;
  }
  if (item.status === "rejected") {
    return `<button class="progress-condition rejected" type="button" data-open-opportunity="${item.id}">${renderIcon("circle-x")} CondiÃ§Ã£o recusada</button>`;
  }
  if (!canAct) return "";
  return missing.length
    ? `<button class="progress-condition draft" type="button" data-open-opportunity="${item.id}" title="Complete ${esc(missing.join(", "))}">${renderIcon("file-pen-line")} Completar condiÃ§Ã£o</button>`
    : `<button class="progress-condition draft" type="button" data-submit-opportunity="${item.id}">${renderIcon("send")} Pedir aprovaÃ§Ã£o</button>`;
}

function renderOpportunityProgress() {
  const items = operationalOpportunities();
  return `
    ${pageHead(
      "Andamento",
      currentUser.role === "admin_manager"
        ? "Atualize etapa, prÃ³xima aÃ§Ã£o e prazo sem sair da rotina comercial"
        : "Organize seus prÃ³ximos contatos e envie condiÃ§Ãµes para aprovaÃ§Ã£o"
    )}
    ${items.length ? `
      <div class="table-wrap progress-table">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>SDR</th>
              <th>Etapa</th>
              <th>PrÃ³xima aÃ§Ã£o</th>
              <th>Prazo da prÃ³xima aÃ§Ã£o</th>
              <th>ObservaÃ§Ãµes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item) => `
              <tr class="progress-row" data-progress-row="${item.id}">
                <td class="progress-client" data-label="Cliente">
                  <strong>${esc(item.clientName)}</strong>
                  <span>${esc(item.brandName && item.brandName !== item.clientName ? item.brandName : item.instagram || "Sem perfil informado")}</span>
                </td>
                <td class="progress-owner" data-label="SDR">${esc(getActorName(item.sdrId))}</td>
                <td class="progress-stage-cell" data-label="Etapa">${renderProgressStagePicker(item)}</td>
                <td class="progress-action-cell" data-label="PrÃ³xima aÃ§Ã£o">${renderProgressActionPicker(item)}</td>
                <td class="progress-date-cell" data-label="Prazo da prÃ³xima aÃ§Ã£o">${renderProgressDatePicker(item)}</td>
                <td class="progress-notes-cell" data-label="ObservaÃ§Ãµes"><input data-progress-notes value="${esc(item.notes || "")}" title="${esc(item.notes || "Sem observaÃ§Ã£o registrada")}" placeholder="Adicionar observaÃ§Ã£o" /></td>
                <td class="progress-row-actions" data-label="AÃ§Ãµes">
                  ${renderProgressConditionAction(item)}
                  <button class="button compact-button progress-save" type="button" data-save-opportunity-progress="${item.id}" hidden>Salvar</button>
                  <button class="icon-button" type="button" data-open-opportunity="${item.id}" aria-label="Ver oportunidade">${renderIcon("eye")}</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhuma oportunidade para acompanhar", "arrow-right")}</section>`}
  `;
}

function opportunityTable(items, approvalMode = false) {
  if (!items.length) return `<section class="card">${empty("Nenhuma oportunidade encontrada", "â–¤")}</section>`;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Marca</th>
            <th>ServiÃ§os</th>
            <th>SDR</th>
            <th>Valor sugerido</th>
            <th>Status CRM</th>
            <th>CondiÃ§Ã£o</th>
            <th>PrÃ³xima aÃ§Ã£o</th>
            <th>Criada em</th>
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
              <td class="next-action-cell">${item.nextAction ? esc(item.nextAction) : `<span class="badge danger-soft">Sem prÃ³xima aÃ§Ã£o</span>`}</td>
              <td>${dateLabel(item.createdAt)}</td>
              <td class="row-actions opportunity-actions">
                ${approvalMode || (currentUser.role === "admin_manager" && item.status === "pending_approval") ? `<button class="button compact-button" type="button" data-open-opportunity="${item.id}">${renderIcon("badge-check")} ${approvalMode ? "Decidir" : "Analisar"}</button>` : ""}
                <details class="row-menu">
                  <summary class="icon-button" aria-label="AÃ§Ãµes da oportunidade">${renderIcon("ellipsis")}</summary>
                  <div class="row-menu-popover">
                    <span class="row-menu-label">AÃ§Ãµes</span>
                    <button type="button" data-open-opportunity="${item.id}">${renderIcon("external-link")}<span><strong>Abrir oportunidade</strong><small>Ver contexto completo</small></span></button>
                    ${currentUser.role === "admin_manager" && item.status === "pending_approval" ? `<button type="button" data-open-opportunity="${item.id}">${renderIcon("badge-check")}<span><strong>Analisar condiÃ§Ã£o</strong><small>Aprovar, ajustar ou devolver para a SDR</small></span></button>` : ""}
                    ${currentUser.role === "sdr" && item.sdrId === currentUser.id && canRequestConditionApproval(item) ? `<button type="button" data-submit-opportunity="${item.id}">${renderIcon("send")}<span><strong>Pedir aprovaÃ§Ã£o</strong><small>Enviar condiÃ§Ã£o ao gestor</small></span></button>` : ""}
                    <button type="button" data-archive-opportunity="${item.id}">${renderIcon("archive")}<span><strong>Arquivar</strong><small>Remover da visÃ£o ativa</small></span></button>
                    <button type="button" data-duplicate-opportunity="${item.id}">${renderIcon("copy")}<span><strong>Duplicar</strong><small>Criar a partir deste registro</small></span></button>
                    <button type="button" data-route="progress">${renderIcon("activity")}<span><strong>Atualizar andamento</strong><small>Status e prÃ³xima aÃ§Ã£o</small></span></button>
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
  const rows = visibleContracts();
  return `
    ${pageHead("Contratos", "Formalizacao criada somente a partir de condiÃ§Ã£o aprovada")}
    ${rows.length ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>NÃºmero</th><th>Cliente</th><th>Valor</th><th>Status</th><th>Assinatura</th><th></th></tr></thead>
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
                    <button class="icon-button" data-open-opportunity="${item.opportunityId}">ðŸ‘</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhum contrato criado", "â–£")}</section>`}
  `;
}

function renderContractsPipeline() {
  const rows = visibleContracts();
  const availableRows = rows.filter((item) => ["proposal_ready", "proposal_sent", "proposal_accepted", "contract_ready"].includes(item.status)).length;
  return `
    ${pageHead(
      "Contratos",
      currentUser.role === "admin_manager"
        ? "Planejamento comercial, proposta PDF e link de contrato de todas as SDRs"
        : "Propostas e contratos das oportunidades atribuidas a voce"
    )}
    <div class="grid cards-4">
      ${metricCard("Em planejamento", rows.filter((item) => item.status === "proposal_planning").length, "â–£")}
      ${metricCard("Prontos para SDR", availableRows, "âœ“")}
      ${metricCard("Enviados", rows.filter((item) => ["proposal_sent", "sent"].includes(item.status)).length, "â†—")}
      ${metricCard("Assinados", rows.filter((item) => item.status === "signed").length, "âœ“")}
    </div>
    ${rows.length ? `
      <div class="table-wrap" style="margin-top:18px">
        <table>
          <thead><tr><th>NÃºmero</th><th>Cliente</th><th>SDR</th><th>Valor</th><th>Pagamento</th><th>Proposta</th><th>Contrato</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${rows.map((item) => {
              const opp = byId(state.opportunities, item.opportunityId);
              return `
                <tr>
                  <td><strong>${esc(item.contractNumber)}</strong></td>
                  <td>${esc(contractClientName(item))}</td>
                  <td>${esc(getActorName(contractSdrId(item)))}</td>
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
    ` : `<section class="card" style="margin-top:18px">${empty("Nenhum contrato criado", "â–£")}</section>`}
  `;
}

function renderPayments() {
  const contracts = visibleContracts();
  const rows = visiblePayments();
  const confirmed = rows.filter((item) => item.status === "confirmed").reduce((sum, item) => sum + item.amountCents, 0);
  const pending = rows.filter((item) => item.status !== "confirmed").reduce((sum, item) => sum + item.amountCents, 0);
  const externalCount = rows.filter((item) => !item.contractId).length;
  return `
    ${pageHead(
      "Pagamentos",
      currentUser.role === "admin_manager"
        ? "Controle manual dos valores recebidos fora da plataforma, com vÃ­nculo opcional ao CRM"
        : "Registros informativos dos pagamentos externos dos seus contratos",
      currentUser.role === "admin_manager" ? `<button class="button" type="button" data-new-payment>${renderIcon("plus")} Novo pagamento</button>` : ""
    )}
    <section class="card notice-card">
      <strong>Registro apenas informativo</strong>
      <p>Nenhuma cobranca acontece pela plataforma. Registre aqui o que foi pago por Pix, transferÃªncia, boleto, cartÃ£o externo ou outro meio. O vÃ­nculo com um contrato pode ser feito agora ou depois.</p>
    </section>
    <div class="grid cards-3">
      ${metricCard("Recebido confirmado", brl(confirmed), "$")}
      ${metricCard("A confirmar", brl(pending), "$")}
      ${metricCard("Sem vÃ­nculo com CRM", externalCount, "link-2-off")}
    </div>
    ${contracts.length ? `
      <div class="table-wrap" style="margin-top:18px">
        <table>
          <thead><tr><th>Contrato</th><th>Cliente</th><th>Valor contrato</th><th>Recebido</th><th>A confirmar</th><th>Saldo</th><th>Ãšltimo registro</th><th></th></tr></thead>
          <tbody>
            ${contracts.map((contract) => {
              const opp = byId(state.opportunities, contract.opportunityId);
              const summary = contractPaymentSummary(contract.id);
              const lastPayment = summary.payments[0];
              const balance = Math.max(0, contract.amountCents - summary.confirmedCents);
              return `
                <tr>
                  <td><strong>${esc(contract.contractNumber)}</strong></td>
                  <td>${esc(contractClientName(contract))}</td>
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
    ` : currentUser.role === "admin_manager" ? `<section class="card" style="margin-top:18px">${empty("Nenhum contrato disponÃ­vel", "$", "Ainda assim, voce pode registrar um pagamento manual e vincula-lo ao CRM depois.", `<button class="button" type="button" data-new-payment>${renderIcon("plus")} Registrar pagamento manual</button>`)}</section>` : ""}
    ${rows.length ? `
      <h3 style="margin-top:28px">Historico de pagamentos</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>VÃ­nculo</th><th>Cliente / origem</th><th>Tipo</th><th>Valor</th><th>MÃ©todo</th><th>Pagador / referÃªncia</th><th>Comprovante</th><th>Status</th><th>Data</th><th>ObservaÃ§Ã£o</th><th></th></tr></thead>
          <tbody>
            ${rows.map((item) => {
              const contract = byId(state.contracts, item.contractId);
              const opportunity = contract && byId(state.opportunities, contract.opportunityId);
              return `
                <tr>
                  <td>${contract ? `<span class="link-status linked">${renderIcon("link-2")} ${esc(contract.contractNumber)}</span>` : `<span class="link-status external">${renderIcon("link-2-off")} Sem vÃ­nculo</span>`}</td>
                  <td><strong>${esc(item.externalClientName || opportunity?.clientName || "Registro externo")}</strong></td>
                  <td>${esc(paymentTypeLabel(item.type))}</td>
                  <td>${brl(item.amountCents)}</td>
                  <td>${esc(item.method || "-")}</td>
                  <td>${esc([item.payerName, item.receiptNumber, item.reference].filter(Boolean).join(" Â· ") || "-")}</td>
                  <td>${item.receiptFileName ? attachmentLink(item.receiptAttachmentId, item.receiptFileName) : "-"}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td>${dateLabel(item.paidAt || item.dueDate || item.createdAt)}</td>
                  <td>${esc(item.notes || "-")}</td>
                  <td class="row-actions">
                    ${currentUser.role === "admin_manager" ? `<button class="button secondary" data-edit-payment="${item.id}">Editar</button>` : ""}
                    ${item.status !== "confirmed" && currentUser.role === "admin_manager" ? `<button class="button" data-confirm-payment="${item.id}">Confirmar</button>` : ""}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card" style="margin-top:18px">${empty("Nenhum pagamento registrado", "$", currentUser.role === "admin_manager" ? "Adicione o primeiro recebimento manual para iniciar o controle financeiro." : "Os pagamentos dos seus contratos aparecerao aqui.")}</section>`}
  `;
}

function paymentTypeLabel(type) {
  const labels = {
    initial: "Entrada",
    contract_payment: "Pagamento do contrato",
    installment: "Parcela",
    remaining: "Saldo restante",
    adjustment: "Ajuste",
    external: "Pagamento externo",
  };
  return labels[type] || type || "-";
}

function renderPaymentTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Contrato</th><th>Tipo</th><th>Valor</th><th>MÃ©todo</th><th>ReferÃªncia</th><th>Comprovante</th><th>Status</th><th>Data</th><th>ObservaÃ§Ã£o</th><th></th></tr></thead>
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
    ${pageHead("ComissÃµes", "LanÃ§amento manual de comissÃµes pelo gestor")}
    <section class="card">
      <div class="section-head">
        <div>
          <h3>Registrar comissÃ£o manual</h3>
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
              ${sdrUsers().map((user) => `<option value="${esc(user.id)}" ${user.id === (firstOpportunity?.sdrId || contractSdrId(firstContract)) ? "selected" : ""}>${esc(user.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Regra de comissÃ£o</span>
            <select name="rateBps" data-commission-rate-select required>
              ${commissionRateOptions(defaultRateBps)}
            </select>
            <small>Sugestao: 10% quando o total confirmado cobre o contrato; 5% quando ainda e ciclo parcial.</small>
          </label>
          <label class="field">
            <span>Base da comissÃ£o</span>
            <input name="baseAmount" data-money-input data-commission-base-input inputmode="decimal" value="${moneyInputValue(defaultBaseCents)}" required />
          </label>
          <label class="field">
            <span>Valor da comissÃ£o</span>
            <input name="amount" data-money-input data-commission-amount-input inputmode="decimal" value="${moneyInputValue(defaultAmountCents)}" required />
            <small>O gestor pode sobrescrever antes de salvar.</small>
          </label>
          <div class="form-actions">
            <button class="button" type="submit">Registrar comissÃ£o</button>
          </div>
        </form>
      ` : empty("Nenhum pagamento confirmado pendente de comissÃ£o", "$", "Registre e confirme um pagamento em Pagamentos para liberar o lanÃ§amento manual de comissÃ£o.", `<button class="button secondary" type="button" data-route="payments">Ir para pagamentos</button>`)}
    </section>
    ${renderSdrCommissionOverview()}
    <h3 style="margin-top:28px">ComissÃµes Individuais</h3>
    ${items.length ? `
      <div class="table-wrap">
        <table class="commission-edit-table">
          <thead><tr><th>SDR</th><th>Contrato</th><th>Pagamento</th><th>Receita / pago</th><th>Base</th><th>Taxa</th><th>ComissÃ£o</th><th>Status</th><th>AÃ§Ãµes</th></tr></thead>
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
    ` : `<section class="card">${empty("Nenhuma comissÃ£o gerada", "$", "As comissÃµes lanÃ§adas pelo gestor aparecem aqui com base, taxa, status e contrato vinculado.")}</section>`}
    ${renderPayoutBatches()}
  `;
}

function renderMyCommissions() {
  const summary = sdrCommissionSummary(currentUser.id);
  const availableCount = summary.commissions.filter((item) => item.status === "available").length;
  const remainingToBatch = availableCount ? 5 - summary.cycleCount : 5;
  return `
    ${pageHead("Minhas ComissÃµes", "Sua comissÃ£o, ciclo de pagamento e histÃ³rico recebido")}
    <div class="grid cards-4">
      ${metricCard("ComissÃ£o DisponÃ­vel", brl(summary.availableCents), "$")}
      ${metricCard("Ciclo de Pagamento", `${summary.cycleCount} de 5`, "", (summary.cycleCount / 5) * 100)}
      ${metricCard("Total Recebido", brl(summary.paidCents), "$")}
      ${metricCard("Em Lote", brl(summary.batchedCents), "$")}
    </div>

    <section class="card personal-commission-panel">
      <div class="section-head">
        <div>
          <h3>Resumo do ciclo atual</h3>
          <p>O ciclo fecha automaticamente a cada cinco comissÃµes disponiveis.</p>
        </div>
      </div>
      <div class="kpi-list">
        <div class="kpi-row"><span>ComissÃµes disponÃ­veis no ciclo</span><strong>${availableCount}</strong></div>
        <div class="kpi-row"><span>Faltam para fechar o prÃ³ximo lote</span><strong>${remainingToBatch} venda(s)</strong></div>
        <div class="kpi-row"><span>ComissÃ£o total gerada</span><strong>${brl(summary.totalCommissionCents)}</strong></div>
        <div class="kpi-row"><span>Vendas validadas</span><strong>${summary.validatedSales}</strong></div>
      </div>
    </section>

    <section class="card">
      <div class="section-head">
        <div>
          <h3>Minhas comissÃµes</h3>
          <p>Somente vendas vinculadas a ${esc(currentUser.name)} aparecem aqui.</p>
        </div>
      </div>
      ${summary.commissions.length ? renderSdrCommissionTable(summary.commissions) : empty("Nenhuma comissÃ£o gerada para vocÃª", "$", "Quando o gestor lanÃ§ar uma comissÃ£o vinculada Ã  sua venda, ela aparece aqui.")}
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
    ` : `<section class="card">${empty("Nenhum projeto ainda", "â–¥")}<p style="text-align:center;color:var(--muted)">Projetos aparecem automaticamente quando uma condiÃ§Ã£o comercial Ã© aprovada.</p></section>`}
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
    ${pageHead(
      "Projetos",
      "GestÃ£o de tarefas dos projetos em tabela",
      currentUser.role === "admin_manager" ? `<button class="button" type="button" data-new-project>${renderIcon("plus")} Adicionar projeto</button>` : ""
    )}
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
    ` : `<section class="card">${empty("Nenhum projeto ainda", "Ã¢â€“Â¥")}<p style="text-align:center;color:var(--muted)">Projetos aparecem automaticamente quando a condiÃ§Ã£o comercial Ã© aprovada.</p></section>`}
  `;
}

function renderFiles() {
  const files = visibleFiles();
  const externalContracts = visibleContracts().filter(isExternalContract);
  const sdrOptions = sdrUsers();
  const availableBatches = state.payoutBatches.filter((batch) =>
    currentUser.role === "admin_manager" && batch.status === "paid"
  );
  return `
    ${pageHead("Arquivos", "Comprovantes dos pagamentos de comissÃ£o feitos para as SDRs")}
    <div class="grid cards-3">
      ${metricCard("Comprovantes", files.length, "â–§")}
      ${metricCard("Total comprovado", brl(files.reduce((sum, item) => sum + (item.amountCents || 0), 0)), "$")}
      ${metricCard("Lotes pagos", state.payoutBatches.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id).filter((item) => item.status === "paid").length, "$")}
    </div>
    ${currentUser.role === "admin_manager" ? `
      <section class="card" style="margin-top:18px">
        <section class="card" style="margin-bottom:18px">
          <div class="section-head"><div><h3>Contrato de fora do CRM</h3><p>Cadastre contratos fechados por outro canal para conectar pagamentos, comissao e relatorios.</p></div><span class="status-pill info">Registro manual</span></div>
          ${externalContracts.length ? externalContractTable(externalContracts) : ""}
          <form class="form-grid" data-external-contract-form>
            <div class="form-grid two">
              <label class="field"><span>Cliente / empresa *</span><input name="externalClientName" required placeholder="Ex. Empresa Cliente" /></label>
              <label class="field"><span>Marca / projeto</span><input name="externalBrandName" placeholder="Ex. Marca ou unidade" /></label>
            </div>
            <div class="form-grid three">
              <label class="field"><span>Valor contratado *</span><input name="amount" data-money-input inputmode="decimal" required placeholder="Ex. 10.000,00" /></label>
              <label class="field"><span>Forma de pagamento *</span><select name="paymentPlan"><option value="50_50">50% / 50%</option><option value="100">A vista</option></select></label>
              <label class="field"><span>SDR responsavel</span><select name="sdrId"><option value="">Sem SDR vinculada</option>${sdrOptions.map((user) => `<option value="${user.id}">${esc(user.name)}</option>`).join("")}</select></label>
            </div>
            <div class="form-grid two">
              <label class="field"><span>Numero do contrato</span><input name="contractNumber" placeholder="Automatico se vazio" /></label>
              <label class="field"><span>Link do contrato</span><input name="contractLink" type="url" placeholder="https://..." /></label>
            </div>
            <label class="field full"><span>Arquivo do contrato</span><input name="contractFile" type="file" accept="application/pdf,image/jpeg,image/png" /><small>PDF, JPG ou PNG de ate 10 MB. O upload e privado.</small></label>
            <label class="field full"><span>Observacoes</span><textarea name="notes" placeholder="Como o contrato foi fechado, escopo, referencia ou observacoes financeiras."></textarea></label>
            <div class="actions full"><button class="button" type="submit">Cadastrar contrato externo</button></div>
          </form>
        </section>
        <form class="form-grid" data-file-form>
          <label class="field">
            <span>Lote de comissÃ£o pago</span>
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
            <small>PDF ou imagem de atÃ© 3 MB.</small>
          </label>
          <label class="field full"><span>ObservaÃ§Ã£o</span><textarea name="notes" placeholder="Descreva o comprovante pago para a SDR."></textarea></label>
          <div class="actions full"><button class="button" type="submit">Registrar comprovante</button></div>
        </form>
      </section>
    ` : ""}
    <div style="margin-top:18px">${files.length ? fileTable(files) : `<section class="card">${empty("Nenhum comprovante de comissÃ£o registrado", "â–§")}</section>`}</div>
  `;
}

function externalContractTable(contracts) {
  return `<div class="table-wrap" style="margin-bottom:18px"><table><thead><tr><th>Contrato</th><th>Cliente</th><th>SDR</th><th>Valor</th><th>Pagamento</th><th>Documento</th><th>Pagamentos</th><th></th></tr></thead><tbody>
    ${contracts.map((contract) => {
      const summary = contractPaymentSummary(contract.id);
      return `<tr><td><strong>${esc(contract.contractNumber)}</strong><br><small>Fora do CRM</small></td><td>${esc(contractClientName(contract))}${contract.externalBrandName ? `<br><small>${esc(contract.externalBrandName)}</small>` : ""}</td><td>${esc(getActorName(contractSdrId(contract)))}</td><td>${brl(contract.amountCents)}</td><td>${esc(paymentPlanLabel(contract.paymentPlan))}</td><td>${contract.contractAttachmentId ? attachmentLink(contract.contractAttachmentId, contract.contractFileName || "Abrir contrato") : contract.contractLink ? `<a href="${esc(contract.contractLink)}" target="_blank" rel="noreferrer">Abrir link</a>` : "-"}</td><td>${brl(summary.confirmedCents)} / ${brl(contract.amountCents)}</td><td class="row-actions"><button class="button secondary" data-open-contract="${contract.id}">Abrir</button><button class="button" data-register-contract-payment="${contract.id}">Registrar pagamento</button></td></tr>`;
    }).join("")}
  </tbody></table></div>`;
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
        <thead><tr><th>Comprovante</th><th>Arquivo</th><th>SDR</th><th>Lote</th><th>Valor</th><th>ObservaÃ§Ã£o</th><th>Data</th></tr></thead>
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
    ${pageHead("ServiÃ§os", "ServiÃ§os vendidos para clientes e andamento dos projetos")}
    ${items.length ? `
      <div class="grid cards-3">
        ${items.map(renderSoldServiceCard).join("")}
      </div>
      <section class="card" style="margin-top:18px">
        <p class="section-title">Todos os serviÃ§os vendidos</p>
        ${renderSoldServicesTable(items)}
      </section>
    ` : `<section class="card">${empty("Nenhum servico vendido ainda", "â—‡")}<p style="text-align:center;color:var(--muted)">Quando uma venda for validada, o servico contratado aparecera aqui com o ambiente do projeto.</p></section>`}
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
        <div class="kpi-row"><span>Etapa atual</span><strong>${esc(stage?.name || "Projeto nÃ£o criado")}</strong></div>
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
    ${pageHead("RelatÃ³rios", "Indicadores operacionais e exportaÃ§Ã£o CSV")}
    <div class="grid cards-3">
      ${metricCard("Receita contratada", brl(m.revenue), "$")}
      ${metricCard("Receita recebida", brl(m.received), "$")}
      ${metricCard("Projetos ativos", m.activeProjects, "â–¥")}
    </div>
    <section class="card" style="margin-top:18px">
      <div class="actions" style="margin-top:0">
        <button class="button" data-export-csv="opportunities">Exportar oportunidades CSV</button>
        <button class="button secondary" data-export-csv="payments">Exportar pagamentos CSV</button>
        <button class="button secondary" data-export-csv="commissions">Exportar comissÃµes CSV</button>
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
            <h3>TendÃªncia financeira</h3>
            <p>Receita recebida e comissÃµes geradas nos Ãºltimos meses com registro.</p>
          </div>
        </div>
        ${empty("Sem dados para grÃ¡fico", "â†—", "Registre pagamentos e comissÃµes para visualizar tendÃªncia financeira.")}
      </section>
    `;
  }
  const max = Math.max(...buckets.map((item) => Math.max(item.received, item.commissions)), 1);
  return `
    <section class="card">
      <div class="section-head">
        <div>
          <h3>TendÃªncia financeira</h3>
          <p>Receita recebida e comissÃµes geradas nos Ãºltimos meses com registro.</p>
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
      <div class="chart-legend"><span class="dot received"></span>Receita recebida <span class="dot commission"></span>ComissÃµes</div>
    </section>
  `;
}

function renderReportsFinance() {
  const m = metrics();
  const payments = visiblePayments();
  const commissions = state.commissions.filter((item) => currentUser.role === "admin_manager" || item.sdrId === currentUser.id);
  const receipts = visibleFiles();
  return `
    ${pageHead("RelatÃ³rios", "Pagamentos, comissÃµes, comprovantes e indicadores operacionais")}
    <div class="grid cards-3">
      ${metricCard("Receita contratada", brl(m.revenue), "$")}
      ${metricCard("Receita recebida", brl(m.received), "$")}
      ${metricCard("Projetos ativos", m.activeProjects, "â–¥")}
    </div>
    <div class="grid cards-3" style="margin-top:16px">
      ${metricCard("Pagamentos registrados", payments.length, "$")}
      ${metricCard("ComissÃµes geradas", brl(commissions.reduce((sum, item) => sum + item.amountCents, 0)), "$")}
      ${metricCard("Comprovantes de comissÃ£o", receipts.length, "â–§")}
    </div>
    <div style="margin-top:18px">${renderFinanceChart(payments, commissions)}</div>
    <section class="card" style="margin-top:18px">
      <div class="actions" style="margin-top:0">
        <button class="button" data-export-csv="opportunities">Exportar oportunidades CSV</button>
        <button class="button" data-export-csv="payments">Exportar pagamentos CSV</button>
        <button class="button" data-export-csv="commissions">Exportar comissÃµes CSV</button>
        <button class="button" data-export-csv="commission_receipts">Exportar comprovantes CSV</button>
        <button class="button secondary" data-export-csv="audit">Exportar auditoria CSV</button>
      </div>
    </section>
  `;
}

function renderAudit() {
  return `
    ${pageHead("Auditoria", "HistÃ³rico das movimentaÃ§Ãµes importantes do portal")}
    ${state.auditLogs.length ? `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Quando</th><th>Quem</th><th>O que aconteceu</th><th>Registro</th><th>ID</th></tr></thead>
          <tbody>
            ${state.auditLogs.map((item) => `
              <tr>
                <td>${dateLabel(item.createdAt)}</td>
                <td>${esc(getActorName(item.actorUserId))}</td>
                <td><strong>${esc(auditActionLabel(item))}</strong></td>
                <td>${esc(item.entityType || "Registro")}</td>
                <td><button class="copy-id" type="button" data-copy-id="${esc(item.entityId)}" title="Copiar ID completo">${esc(shortId(item.entityId))}</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    ` : `<section class="card">${empty("Nenhum log registrado", "â–¤")}</section>`}
  `;
}

function renderSettings() {
  return `
    ${pageHead("ConfiguraÃ§Ãµes", "Contas, seguranÃ§a e sincronizaÃ§Ã£o do portal")}
    <section class="card profile-card">
      <div class="profile-card-main">
        <span class="profile-avatar">${esc(initials(currentUser.name))}</span>
        <div><span class="section-title">Meu perfil</span><h3>${esc(currentUser.name)}</h3><p>${esc(currentUser.email)} Â· ${esc(roleLabels[currentUser.role])}</p></div>
      </div>
      <div class="profile-meta"><span>Ambiente</span><strong>${currentUser.workspaceKind === "training" ? "Treinamento" : "OperaÃ§Ã£o"}</strong></div>
    </section>
    <div class="settings-layout">
      ${currentUser.role === "admin_manager" ? `
      <section class="card team-card">
        <div class="section-head"><div><h3>Equipe e acessos</h3><p>Crie uma conta individual para cada SDR.</p></div><span class="settings-count">${countLabel(state.users.length, "conta", "contas")}</span></div>
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
                  <button class="button secondary compact-button" type="button" data-send-user-recovery="${user.id}">Enviar recuperaÃ§Ã£o de senha</button>
                  ${user.role === "sdr" ? `<button class="button ghost compact-button" type="button" data-toggle-user-active="${user.id}" data-active="${user.active === false ? "true" : "false"}">${user.active === false ? "Reativar conta" : "Desativar conta"}</button>` : ""}
                </div>
              </details>
            </article>
          `).join("")}
        </div>
      </section>
      ` : `
      <section class="card">
        <div class="section-head"><div><h3>Acesso da SDR</h3><p>Seu perfil visualiza apenas oportunidades, contratos, projetos, pagamentos informativos, arquivos e comissÃµes atribuidos a voce.</p></div>${renderIcon("shield-check")}</div>
        <div class="security-status is-secure"><strong>Acesso individual e protegido</strong></div>
      </section>
      `}

      <div class="settings-side">
        ${currentUser.role === "admin_manager" ? `
        <section class="card">
          <div class="section-head"><div><h3>Nova conta SDR</h3><p>A SDR receberÃ¡ acesso apenas Ã s oportunidades atribuÃ­das a ela.</p></div></div>
          <form class="form-grid settings-form" data-create-sdr-form>
            <label class="field full"><span>Nome da SDR</span><input name="name" required /></label>
            <label class="field full"><span>E-mail de acesso</span><input name="email" type="email" required /></label>
            <p class="form-note full">A SDR receberÃ¡ um convite para definir a prÃ³pria senha. Nenhuma senha serÃ¡ compartilhada pelo gestor.</p>
            <button class="button full" type="submit">${renderIcon("user-plus")} Enviar convite SDR</button>
          </form>
        </section>
        ` : ""}

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
          <div class="section-head"><div><h3>VerificaÃ§Ã£o em duas etapas</h3><p>ObrigatÃ³ria para o acesso do gestor na liberaÃ§Ã£o geral.</p></div></div>
          ${currentUser.mfaEnrolled ? `
            <div class="security-status is-secure">${renderIcon("shield-check")} <strong>MFA configurado</strong></div>
          ` : mfaEnrollment ? `
            <div class="mfa-enrollment">
              <img src="${esc(mfaEnrollment.qrCode)}" alt="QR Code para configurar autenticador" />
              <p>Escaneie o QR Code no autenticador e confirme o cÃ³digo.</p>
              <code>${esc(mfaEnrollment.secret)}</code>
              <form data-mfa-enrollment-form>
                <label class="field"><span>CÃ³digo de 6 dÃ­gitos</span><input name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required /></label>
                <button class="button" type="submit">Ativar MFA</button>
              </form>
            </div>
          ` : `<button class="button secondary full" type="button" data-start-mfa>Configurar autenticador</button>`}
        </section>
        ` : ""}
      </div>
    </div>

    <div class="settings-bottom">
      <section class="card">
        <div class="section-head"><div><h3>NotificaÃ§Ãµes</h3><p>MovimentaÃ§Ãµes que exigem atenÃ§Ã£o.</p></div></div>
        ${visibleNotifications().length ? `<div class="timeline">
          ${visibleNotifications().slice(0, 5).map((item) => `
            <div class="timeline-item">
              <span class="timeline-dot"></span>
              <div><strong>${esc(item.text)}</strong><span>${item.read ? "Lida" : "Nova"}</span></div>
            </div>
          `).join("")}
        </div>` : empty("Nenhuma notificaÃ§Ã£o", "â—Œ", "As novas solicitaÃ§Ãµes aparecerÃ£o aqui.")}
        <div class="actions"><button class="button secondary" data-route="notifications">Abrir central</button></div>
      </section>
    </div>
  `;
}

function empty(text, icon, description = "", action = "") {
  const emptyIcon = metricIconAliases[icon] || {
    "â—Œ": "inbox",
    "â—‡": "layers-3",
    "â–·": "circle-check",
    "â†’": "activity",
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
  if (drawer.type === "newProject") return renderNewProjectDrawer();
  if (drawer.type === "opportunity") return renderOpportunityDrawer(drawer.id);
  if (drawer.type === "contract") return renderContractDrawer(drawer.id);
  if (drawer.type === "paymentRecord") return renderPaymentRecordDrawer(drawer.contractId, drawer.paymentId);
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
      ` : empty("Nenhum evento registrado", "â—‹")}
    </section>
  `;
}

function renderNewOpportunityDrawer() {
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Nova oportunidade" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>Nova Oportunidade</h3><p>Cadastre o lead no CRM e peca aprovaÃ§Ã£o da condiÃ§Ã£o quando estiver pronto.</p></div>
          <button class="icon-button" data-close-drawer type="button">Ã—</button>
        </header>
        <form class="drawer-body" data-opportunity-form>
          ${opportunityFormFields()}
          <div class="actions">
            <button class="button secondary" type="submit" name="intent" value="draft">Salvar no CRM</button>
            ${currentUser.role === "sdr" ? `<button class="button" type="submit" name="intent" value="submit">Salvar e pedir aprovaÃ§Ã£o</button>` : ""}
          </div>
        </form>
      </aside>
    </div>
  `;
}

function renderNewProjectDrawer() {
  if (currentUser.role !== "admin_manager") return "";
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Adicionar projeto" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>Adicionar projeto</h3><p>Crie um projeto manual mesmo quando ele nÃ£o nasceu de uma oportunidade comercial.</p></div>
          <button class="icon-button" data-close-drawer type="button">x</button>
        </header>
        <form class="drawer-body" data-project-form>
          <section class="card">
            <p class="section-title">Identificacao</p>
            <div class="form-grid">
              <label class="field"><span>Cliente *</span><input name="clientName" required /></label>
              <label class="field"><span>Empresa / marca</span><input name="brandName" /></label>
              <label class="field full"><span>Nome do projeto *</span><input name="projectName" required placeholder="Ex. Reposicionamento de marca 2026" /></label>
              <label class="field"><span>SDR responsavel</span><select name="sdrId">${opportunityResponsibleOptions(MANAGEMENT_OWNER_ID)}</select></label>
              <label class="field"><span>Status inicial</span><select name="status">${projectStatusOptions.map(([value, label]) => `<option value="${value}" ${value === "planning" ? "selected" : ""}>${label}</option>`).join("")}</select></label>
              ${renderDateField("Data de inicio", "startsAt", nowIso().slice(0, 10))}
              ${renderDateField("Prazo previsto", "targetEndAt", addDays(60))}
              <label class="field full"><span>Modelo de etapas</span><select name="template"><option value="complete">Fluxo completo Mada</option><option value="simple">Fluxo simplificado</option></select></label>
            </div>
          </section>
          <section class="card">
            <fieldset class="field service-picker" data-service-picker>
              <legend>ServiÃ§os do projeto *</legend>
              <div class="service-picker-toolbar"><strong data-service-count>0 selecionado(s)</strong><button class="button ghost compact-button" type="button" data-clear-services>Limpar selecao</button></div>
              <div class="check-grid service-check-grid">
                ${state.services.map((item) => `<div class="check-card service-check-card" role="checkbox" aria-checked="false" tabindex="0" data-service-card><input type="checkbox" name="serviceIds" value="${item.id}" data-service-option tabindex="-1" aria-hidden="true" /><span>${esc(item.name)}</span>${renderIcon("check", "service-selected-icon")}</div>`).join("")}
              </div>
            </fieldset>
          </section>
          <div class="actions"><button class="button" type="submit">${renderIcon("plus")} Criar projeto</button><button class="button secondary" type="button" data-close-drawer>Cancelar</button></div>
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
            <span>ResponsÃ¡vel</span>
            <input value="${esc(currentUser.name)}" disabled />
            <input name="sdrId" type="hidden" value="${esc(currentUser.id)}" />
            <small>Esta oportunidade ficarÃ¡ vinculada Ã  sua conta.</small>
          </label>
        ` : `
          <label class="field">
            <span>ResponsÃ¡vel</span>
            <select name="sdrId">${opportunityResponsibleOptions(opportunity.sdrId)}</select>
            <small>Escolha GestÃ£o ou uma SDR da equipe.</small>
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
        <fieldset class="field choice-field">
          <span>Sinal de operaÃ§Ã£o</span>
          <div class="check-grid compact-signal-grid">
            ${operationSignalOptions.map((option) => `
              <label class="check-card">
                <input type="checkbox" name="operationSignal" value="${esc(option)}" ${splitChoiceValue(opportunity.operationSignal).includes(option) ? "checked" : ""} />
                <span>${esc(option)}</span>
              </label>
            `).join("")}
          </div>
          <small>Marque todos os sinais que representam o momento do negÃ³cio.</small>
        </fieldset>
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
        <fieldset class="field full service-picker" data-service-picker>
          <legend>ServiÃ§os possiveis</legend>
          <div class="service-picker-toolbar">
            <strong data-service-count>${selectedServiceIds.length} selecionado(s)</strong>
            <button class="button ghost compact-button" type="button" data-clear-services>Limpar selecao</button>
          </div>
          <div class="check-grid service-check-grid">
            ${state.services.map((item) => `
              <div class="check-card service-check-card ${selectedServiceIds.includes(item.id) ? "is-selected" : ""}" role="checkbox" aria-checked="${selectedServiceIds.includes(item.id)}" tabindex="0" data-service-card>
                <input type="checkbox" name="serviceIds" value="${item.id}" data-service-option tabindex="-1" aria-hidden="true" ${selectedServiceIds.includes(item.id) ? "checked" : ""} />
                <span>${esc(item.name)}</span>
                ${renderIcon("check", "service-selected-icon")}
              </div>
            `).join("")}
          </div>
          <small>Marque uma ou mais opcoes quando a oportunidade for combo.</small>
        </fieldset>
        <label class="field full"><span>Problema observado</span><textarea name="observedProblem">${esc(opportunity.observedProblem)}</textarea></label>
        <label class="field full"><span>Necessidade relatada</span><textarea name="reportedNeed">${esc(opportunity.reportedNeed || opportunity.clientNeed)}</textarea></label>
        <label class="field full"><span>Escopo solicitado</span><textarea name="requestedScope">${esc(opportunity.requestedScope)}</textarea></label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Qualificacao</p>
      <div class="form-grid">
        ${renderDateField("Prazo", "expectedDeadline", opportunity.expectedDeadline)}
        <label class="field"><span>Faixa de investimento</span><input name="investmentRange" placeholder="Ex. R$ 5 mil a R$ 8 mil" value="${esc(opportunity.investmentRange)}" /></label>
        <div class="field">
          <span>ContrataÃ§Ã£o anterior</span>
          <div class="check-grid compact-choice-grid">
            ${["Sim", "NÃ£o"].map((option) => `
              <label class="check-card">
                <input type="radio" name="previousHiring" value="${option}" ${opportunity.previousHiring === option ? "checked" : ""} />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
        <label class="field full"><span>UrgÃªncia</span><input name="urgency" placeholder="Por que precisa agora?" value="${esc(opportunity.urgency)}" /></label>
      </div>
    </section>
    <section class="card">
      <p class="section-title">Negociacao</p>
      <div class="form-grid">
        <label class="field"><span>Valor proposto</span><input name="suggestedAmount" data-money-input inputmode="decimal" placeholder="0,00" value="${opportunity.suggestedAmountCents ? moneyInputValue(opportunity.suggestedAmountCents) : ""}" /></label>
        <label class="field"><span>OrÃ§amento / investimento do cliente</span><input name="clientBudget" data-money-input inputmode="decimal" placeholder="0,00" value="${opportunity.clientBudgetCents ? moneyInputValue(opportunity.clientBudgetCents) : ""}" /></label>
        <label class="field"><span>Desconto (%)</span><input name="suggestedDiscount" data-percent-input inputmode="decimal" placeholder="0" value="${percentInputValue(discountPercentForOpportunity(opportunity))}" /></label>
        ${renderDateField("Prazo sugerido", "suggestedDeadline", opportunity.suggestedDeadline)}
        <label class="field full"><span>Objecoes</span><textarea name="objections">${esc(opportunity.objections)}</textarea></label>
        <label class="field full">
          <span>CondiÃ§Ãµes solicitadas</span>
          <select name="requestedConditions">${paymentPlanOptions(opportunity.requestedConditions || opportunity.suggestedPaymentTerms)}</select>
        </label>
      </div>
    </section>
  `;
}

function renderOpportunityCrmReadOnly(opp) {
  return `
    <section class="card">
      <p class="section-title">InformaÃ§Ãµes do CRM</p>
      <div class="detail-list">
        <div class="detail-row"><span>Instagram</span><strong>${esc(opp.instagram || "-")}</strong></div>
        <div class="detail-row"><span>Site</span><strong>${esc(opp.website || "-")}</strong></div>
        <div class="detail-row"><span>WhatsApp / e-mail</span><div>${esc([opp.phone, opp.email].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Segmento / cidade</span><div>${esc([opp.segment, opp.city].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Origem</span><strong>${esc(opp.origin || "-")}</strong></div>
        <div class="detail-row"><span>O que vende</span><div>${esc(opp.businessOffer || "-")}</div></div>
        <div class="detail-row"><span>Publico</span><div>${esc(opp.targetAudience || "-")}</div></div>
        <div class="detail-row"><span>Sinal de operaÃ§Ã£o</span><div>${esc(opp.operationSignal || "-")}</div></div>
        <div class="detail-row"><span>Momento atual</span><div>${esc(opp.currentMoment || "-")}</div></div>
        <div class="detail-row"><span>Problema / necessidade</span><div>${esc([opp.observedProblem, opp.reportedNeed].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>Prazo / investimento</span><div>${esc([opp.expectedDeadline ? dateLabel(opp.expectedDeadline) : "", opp.investmentRange].filter(Boolean).join(" / ") || "-")}</div></div>
        <div class="detail-row"><span>ContrataÃ§Ã£o anterior</span><div>${esc(opp.previousHiring || "-")}</div></div>
        <div class="detail-row"><span>UrgÃªncia</span><div>${esc(opp.urgency || "-")}</div></div>
        <div class="detail-row"><span>PrÃ³xima aÃ§Ã£o</span><div>${esc([opp.nextAction, opp.nextActionDate ? dateLabel(opp.nextActionDate) : ""].filter(Boolean).join(" - ") || "-")}</div></div>
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
    ["AprovaÃ§Ã£o", approvalComplete, approvalCurrent],
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
  const canEdit = (canManage || canSdrAct) && !isArchivedOpportunity(opp) && !isTerminallyRejected(opp);
  const approvalMissing = conditionApprovalMissingFields(opp);

  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Detalhe da oportunidade" data-drawer-panel>
        <header class="drawer-head">
          <div>
            <h3>${esc(opp.clientName)} / ${esc(opp.brandName)}</h3>
            <p>${crmStatusBadge(opp.crmStatus)} ${statusBadge(opp.status)}</p>
          </div>
          <button class="icon-button" data-close-drawer type="button">Ã—</button>
        </header>
        <div class="drawer-body">
          ${renderOpportunityWorkflow(opp, contract, payment)}
          <section class="card">
            <p class="section-title">Resumo</p>
            <div class="detail-list">
              <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(opp.sdrId))}</strong></div>
              <div class="detail-row"><span>Status do CRM</span><strong>${crmStatusBadge(opp.crmStatus)}</strong></div>
              <div class="detail-row"><span>Status da condiÃ§Ã£o</span><strong>${statusBadge(opp.status)}</strong></div>
              <div class="detail-row"><span>ServiÃ§os</span><strong>${esc(serviceNamesForOpportunity(opp))}</strong></div>
              <div class="detail-row"><span>Valor sugerido</span><strong>${brl(opp.suggestedAmountCents)}</strong></div>
              <div class="detail-row"><span>Desconto</span><strong>${percentInputValue(discountPercentForOpportunity(opp))}% - ${brl(opp.suggestedDiscountCents)}</strong></div>
              <div class="detail-row"><span>Valor liquido</span><strong>${brl(netAmountAfterDiscount(opp.suggestedAmountCents, discountPercentForOpportunity(opp)))}</strong></div>
              <div class="detail-row"><span>Pagamento</span><strong>${esc(paymentPlanLabel(normalizePaymentPlan(opp.suggestedPaymentTerms || opp.requestedConditions)))}</strong></div>
              <div class="detail-row"><span>Escopo</span><div>${esc(opp.suggestedScope || opp.requestedScope)}</div></div>
            </div>
          </section>

          ${canEdit ? `
            <form data-opportunity-edit-form="${opp.id}">
              ${opportunityFormFields(opp)}
              <div class="actions opportunity-form-actions">
                <button class="button secondary" type="submit" name="intent" value="save">Salvar alteraÃ§Ãµes</button>
                ${canSdrAct && canRequestConditionApproval(opp) ? `<button class="button" type="submit" name="intent" value="submit">Salvar e pedir aprovaÃ§Ã£o</button>` : ""}
              </div>
            </form>
          ` : renderOpportunityCrmReadOnly(opp)}

          ${condition ? renderConditionCard(condition) : ""}
          ${contract ? renderCommercialContractCard(contract, payment) : ""}

          <section class="card opportunity-action-card">
            <p class="section-title">AÃ§Ãµes</p>
            ${renderOpportunityActionPanel(opp, contract, payment, { canManage, canSdrAct, approvalMissing })}
          </section>

          <section class="card">
            <p class="section-title">Timeline</p>
            <div class="timeline">
              ${opp.timeline.map((item) => `
                <div class="timeline-item">
                  <span class="timeline-dot"></span>
                  <div>
                    <strong>${esc(item.label)}</strong>
                    <span>${dateLabel(item.createdAt)} Â· ${esc(getActorName(item.actorId))}</span>
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
    <button class="button success" data-open-approval-action="${opp.id}" data-approval-action="approved">Aprovar sem alteraÃ§Ã£o</button>
    <button class="button" data-open-approval-action="${opp.id}" data-approval-action="approved_with_changes">Aprovar com alteraÃ§Ãµes</button>
    <button class="button secondary" data-open-approval-action="${opp.id}" data-approval-action="needs_information">Solicitar informaÃ§Ãµes</button>
    <button class="button danger" data-open-approval-action="${opp.id}" data-approval-action="rejected">Recusar</button>
    ${selectedAction ? renderApprovalFollowActionMenu(opp, selectedAction) : ""}
  `;
}

function renderOpportunityActionPanel(opp, contract, payment, permissions) {
  const { canManage, canSdrAct, approvalMissing } = permissions;
  const approvedStatuses = ["commercial_condition_approved", "presented_to_client", "awaiting_client_response", "client_accepted"];
  let tone = "neutral";
  let icon = "circle-help";
  let eyebrow = "Status atual";
  let title = "Nenhuma decisÃ£o pendente";
  let description = `A oportunidade esta em ${statusLabels[opp.status] || opp.status}.`;
  let primaryActions = "";

  if (canManage && opp.status === "pending_approval") {
    tone = "review";
    icon = "badge-check";
    eyebrow = "Decisao do gestor";
    title = "CondiÃ§Ã£o aguardando sua aprovaÃ§Ã£o";
    description = "Revise valor, desconto, forma de pagamento, serviÃ§os e escopo. Depois escolha uma das quatro decisÃµes abaixo.";
    primaryActions = renderApprovalActions(opp);
  } else if (canManage && opp.status === "needs_information") {
    tone = "waiting";
    icon = "clock-3";
    eyebrow = "Aguardando SDR";
    title = "InformaÃ§Ãµes complementares solicitadas";
    description = "A decisÃ£o sera reaberta aqui quando a SDR responder e reenviar a condiÃ§Ã£o para anÃ¡lise.";
  } else if (canManage && opp.status === "draft") {
    tone = approvalMissing.length ? "waiting" : "review";
    icon = "send";
    eyebrow = "CondiÃ§Ã£o em rascunho";
    title = approvalMissing.length ? "Complete a condiÃ§Ã£o antes da anÃ¡lise" : "CondiÃ§Ã£o pronta para entrar em anÃ¡lise";
    description = approvalMissing.length
      ? `Ainda falta ${approvalMissing.join(", ")}. O gestor pode completar os dados nesta tela.`
      : "Envie a condiÃ§Ã£o para anÃ¡lise. Em seguida, as quatro decisÃµes do gestor aparecerao nesta mesma area.";
    primaryActions = approvalMissing.length
      ? `<button class="button" type="button" disabled>${renderIcon("send")} Enviar para anÃ¡lise</button>`
      : `<button class="button" type="button" data-submit-opportunity="${opp.id}">${renderIcon("send")} Enviar para anÃ¡lise</button>`;
  } else if (isTerminallyRejected(opp)) {
    tone = "blocked";
    icon = "lock-keyhole";
    eyebrow = "Recusa definitiva";
    title = "Oportunidade arquivada e bloqueada";
    description = opp.rejectionReason
      ? `Motivo: ${opp.rejectionReason}`
      : "A condiÃ§Ã£o foi recusada pelo gestor. Este registro permanece apenas para consulta e nÃ£o pode ser alterado ou restaurado.";
  } else if (canManage && approvedStatuses.includes(opp.status)) {
    tone = "approved";
    icon = "circle-check";
    eyebrow = "CondiÃ§Ã£o aprovada";
    title = contract ? `Contrato ${contract.contractNumber} aberto` : "AprovaÃ§Ã£o concluida";
    description = contract
      ? "A decisÃ£o comercial foi registrada. Continue pelo contrato, pagamento e validacao da venda."
      : "A decisÃ£o foi registrada e os prÃ³ximos registros comerciais estao sendo preparados.";
  } else if (canSdrAct && canRequestConditionApproval(opp)) {
    tone = approvalMissing.length ? "waiting" : "review";
    icon = "send";
    eyebrow = "Proximo passo da SDR";
    title = "Enviar a condiÃ§Ã£o para aprovaÃ§Ã£o";
    description = approvalMissing.length
      ? `Complete ${approvalMissing.join(", ")} e salve a oportunidade antes do envio.`
      : "Os dados minimos estao completos. O gestor recebera esta oportunidade na fila de aprovaÃ§Ãµes.";
    primaryActions = approvalMissing.length
      ? `<button class="button" type="button" disabled title="Complete os campos indicados">${renderIcon("send")} Pedir aprovaÃ§Ã£o</button>`
      : `<button class="button" type="button" data-submit-opportunity="${opp.id}">${renderIcon("send")} Pedir aprovaÃ§Ã£o</button>`;
  } else if (canSdrAct && opp.status === "pending_approval") {
    tone = "waiting";
    icon = "clock-3";
    eyebrow = "Em anÃ¡lise";
    title = "Aguardando decisÃ£o do gestor";
    description = "Quando o gestor decidir, a resposta e o prÃ³ximo passo aparecerao nesta mesma area.";
  } else if (canSdrAct && opp.status === "needs_information") {
    tone = "review";
    icon = "message-square-more";
    eyebrow = "AÃ§Ã£o necessaria";
    title = "O gestor pediu mais informaÃ§Ãµes";
    description = "Responda ao pedido para devolver a condiÃ§Ã£o a fila de anÃ¡lise.";
    primaryActions = `<button class="button" data-open-opportunity-follow="${opp.id}" data-follow-action="answer_information">Responder informaÃ§Ãµes</button>`;
  } else if (canSdrAct && approvedStatuses.includes(opp.status)) {
    tone = "approved";
    icon = "circle-check";
    eyebrow = "CondiÃ§Ã£o aprovada";
    title = "Continue o acompanhamento com a cliente";
    description = "A proposta e o contrato ficam disponiveis somente para oportunidades atribuidas a voce.";
  }

  const clientActions = canSdrAct && ["presented_to_client", "awaiting_client_response"].includes(opp.status) ? `
    <button class="button success" data-client-accepted="${opp.id}">Cliente aceitou</button>
    <button class="button secondary" data-open-opportunity-follow="${opp.id}" data-follow-action="client_revision">Registrar revisao</button>
    <button class="button danger" data-open-opportunity-follow="${opp.id}" data-follow-action="client_declined">Cliente recusou</button>
  ` : "";
  const managerActions = canManage && !isArchivedOpportunity(opp) ? `
    ${contract?.status === "sent" ? `<button class="button" data-sign-contract="${contract.id}">Confirmar assinatura</button>` : ""}
    ${payment && payment.status !== "confirmed" ? `<button class="button" data-confirm-payment="${payment.id}">Confirmar pagamento inicial</button>` : ""}
    ${contract?.status === "signed" && payment?.status === "confirmed" && !contract.saleValidatedAt ? `<button class="button success" data-validate-sale="${contract.id}">Validar venda</button>` : ""}
  ` : "";

  return `
    <div class="opportunity-action-context ${tone}">
      <span class="opportunity-action-icon">${renderIcon(icon)}</span>
      <div>
        <span class="opportunity-action-eyebrow">${esc(eyebrow)}</span>
        <h3>${esc(title)}</h3>
        <p>${esc(description)}</p>
      </div>
    </div>
    <div class="actions opportunity-decision-actions">
      ${primaryActions}
      ${clientActions}
      ${managerActions}
      ${renderOpportunityFollowForm(opp)}
    </div>
  `;
}

function renderOpportunityFollowForm(opp) {
  const action = drawer?.opportunityFollowAction;
  const configs = {
    answer_information: {
      title: "Responder solicitaÃ§Ã£o do gestor",
      label: "InformaÃ§Ãµes complementares",
      placeholder: "Inclua os dados pedidos e o contexto necessÃ¡rio para uma nova anÃ¡lise.",
      button: "Enviar para nova anÃ¡lise",
    },
    client_revision: {
      title: "Registrar revisÃ£o solicitada",
      label: "O que o cliente pediu para alterar?",
      placeholder: "Descreva a alteraÃ§Ã£o de escopo, valor, prazo ou condiÃ§Ã£o.",
      button: "Enviar revisÃ£o ao gestor",
    },
    client_declined: {
      title: "Registrar recusa do cliente",
      label: "Motivo da recusa",
      placeholder: "Registre o motivo para histÃ³rico e relatÃ³rios.",
      button: "Confirmar recusa",
    },
  };
  const config = configs[action];
  if (!config) return "";
  return `
    <form class="approval-follow-menu approval-follow-form" data-opportunity-follow-form="${opp.id}" data-follow-action="${action}">
      <div class="section-head"><div><h3>${config.title}</h3><p>Este registro serÃ¡ incluÃ­do na timeline da oportunidade.</p></div><button class="icon-button" type="button" data-clear-opportunity-follow="${opp.id}" aria-label="Fechar aÃ§Ã£o">${renderIcon("x")}</button></div>
      <label class="field"><span>${config.label}</span><textarea name="note" required placeholder="${config.placeholder}"></textarea></label>
      <div class="form-grid">
        <label class="field"><span>PrÃ³xima aÃ§Ã£o</span><input name="nextAction" value="${esc(opp.nextAction || "")}" /></label>
        ${renderDateField("Data da prÃ³xima aÃ§Ã£o", "nextActionDate", opp.nextActionDate || "")}
      </div>
      <div class="actions"><button class="button ${action === "client_declined" ? "danger" : ""}" type="submit">${config.button}</button></div>
    </form>
  `;
}

function approvalActionConfig(action) {
  const configs = {
    approved: {
      title: "Aprovar sem alteraÃ§Ã£o",
      description: "Confirme a aprovaÃ§Ã£o e defina a prÃ³xima acao do contrato.",
      button: "Confirmar aprovaÃ§Ã£o",
      requiresReason: false,
      requiresAmount: false,
      reasonLabel: "ObservaÃ§Ã£o da aprovaÃ§Ã£o",
      defaultReason: "Aprovado sem alteraÃ§Ã£o.",
      followOptions: [
        "Abrir contrato e preparar proposta",
        "Enviar proposta para SDR",
        "Acompanhar aceite da cliente",
      ],
    },
    approved_with_changes: {
      title: "Aprovar com alteraÃ§Ãµes",
      description: "Registre o ajuste aprovado, o novo valor final e a prÃ³xima acao.",
      button: "Aprovar com alteraÃ§Ãµes",
      requiresReason: true,
      requiresAmount: true,
      reasonLabel: "Justificativa da alteraÃ§Ã£o",
      defaultReason: "Ajuste comercial aprovado pelo gestor.",
      followOptions: [
        "Revisar proposta com novo valor",
        "Validar ajuste com SDR",
        "Enviar proposta ajustada para cliente",
      ],
    },
    needs_information: {
      title: "Solicitar informaÃ§Ãµes",
      description: "Explique o que a SDR precisa complementar antes da aprovaÃ§Ã£o.",
      button: "Enviar solicitacao",
      requiresReason: true,
      requiresAmount: false,
      reasonLabel: "InformaÃ§Ã£o necessaria",
      defaultReason: "Detalhar prazo, escopo e entregaveis.",
      followOptions: [
        "Aguardar complemento da SDR",
        "Revisar CRM apos complemento",
        "Reagendar anÃ¡lise comercial",
      ],
    },
    rejected: {
      title: "Recusar oportunidade",
      description: "Esta decisÃ£o Ã© definitiva. Ao confirmar, a oportunidade serÃ¡ arquivada e bloqueada para gestores e SDRs.",
      button: "Recusar e arquivar",
      requiresReason: true,
      requiresAmount: false,
      reasonLabel: "Justificativa da recusa",
      defaultReason: "Fora da politica comercial atual.",
      followOptions: [],
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
        ${action === "rejected" ? `
          <div class="terminal-rejection-note full">${renderIcon("lock-keyhole")} A oportunidade sairÃ¡ da operaÃ§Ã£o ativa e ficarÃ¡ disponÃ­vel somente para consulta em Oportunidades arquivadas.</div>
        ` : `
          <label class="field ${config.requiresAmount ? "" : "full"}">
            <span>Follow action</span>
            <select name="followAction" required>
              ${config.followOptions.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join("")}
            </select>
          </label>
          ${renderDateField("Data da prÃ³xima acao", "nextActionDate", addDays(action === "needs_information" ? 2 : 1))}
        `}
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
      <p class="section-title">CondiÃ§Ã£o aprovada vigente</p>
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
        <div class="detail-row"><span>CondiÃ§Ã£o usada</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} Â· ${statusLabels[payment.status]}` : "-"}</div></div>
        <div class="detail-row"><span>Venda validada</span><strong>${contract.saleValidatedAt ? dateLabel(contract.saleValidatedAt) : "NÃ£o"}</strong></div>
      </div>
    </section>
  `;
}

function renderCommercialContractCard(contract, payment) {
  const opp = byId(state.opportunities, contract.opportunityId);
  const canManage = currentUser.role === "admin_manager";
  const canSdrAct = currentUser.role === "sdr" && contractSdrId(contract) === currentUser.id;
  return `
    <section class="card">
      <p class="section-title">Proposta, contrato e pagamento</p>
      <div class="detail-list">
        <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
        <div class="detail-row"><span>Status</span>${statusBadge(contract.status)}</div>
        <div class="detail-row"><span>Valor</span><strong>${brl(contract.amountCents)}</strong></div>
        <div class="detail-row"><span>Forma</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>CondiÃ§Ã£o usada</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
        <div class="detail-row"><span>Proposta PDF</span><div>${contract.proposalFileName ? attachmentLink(contract.proposalAttachmentId, contract.proposalFileName) : "NÃ£o anexada"}</div></div>
        <div class="detail-row"><span>Link do contrato</span><div>${contract.contractLink ? `<a href="${esc(contract.contractLink)}" target="_blank" rel="noreferrer">${esc(contract.contractLink)}</a>` : "NÃ£o informado"}</div></div>
        <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} - ${statusLabels[payment.status]}` : "-"}</div></div>
        <div class="detail-row"><span>Venda validada</span><strong>${contract.saleValidatedAt ? dateLabel(contract.saleValidatedAt) : "NÃ£o"}</strong></div>
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
            <span>CondiÃ§Ã£o de pagamento</span>
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
  const canSdrAct = currentUser.role === "sdr" && contractSdrId(contract) === currentUser.id;
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
      <p class="section-title">PrÃ³ximas acoes</p>
      <div class="actions stacked-actions">
        ${canManage && contract.status === "sent" ? `<button class="button" data-sign-contract="${contract.id}">Confirmar assinatura</button>` : ""}
        ${canManage ? `<button class="button secondary" data-register-contract-payment="${contract.id}">Registrar pagamento</button>` : ""}
        ${canManage && payment && payment.status !== "confirmed" ? `<button class="button" data-confirm-payment="${payment.id}">Confirmar pagamento inicial</button>` : ""}
        ${canManage && contract.status === "signed" && payment?.status === "confirmed" && !contract.saleValidatedAt ? `<button class="button success" data-validate-sale="${contract.id}">Validar venda</button>` : ""}
        ${canSdrAct && contract.proposalFileName && !contract.proposalSentAt ? `<button class="button" data-send-proposal="${contract.id}">Enviar proposta para cliente</button>` : ""}
        ${canSdrAct && contract.contractLink && contract.status === "contract_ready" ? `<button class="button" data-send-contract="${contract.id}">Enviar contrato para cliente</button>` : ""}
        ${contract.opportunityId ? `<button class="button secondary" data-open-opportunity="${contract.opportunityId}">Abrir CRM da oportunidade</button>` : ""}
      </div>
    </section>
    <section class="card">
      <p class="section-title">Contexto</p>
      <div class="detail-list">
        <div class="detail-row"><span>Cliente</span><strong>${esc(contractClientName(contract))}</strong></div>
        <div class="detail-row"><span>Marca</span><strong>${esc(opp?.brandName || "-")}</strong></div>
        <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(contractSdrId(contract)))}</strong></div>
        <div class="detail-row"><span>ServiÃ§os</span><div>${esc(serviceNamesForOpportunity(opp))}</div></div>
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
    title: `${contract.contractNumber} - ${contractClientName(contract)}`,
    subtitle: `${esc(paymentPlanLabel(contract.paymentPlan))} - ${brl(contract.amountCents)}`,
    badges: statusBadge(contract.status),
    label: "Workspace do contrato",
    main,
    side,
  });
}

function renderPaymentRecordDrawer(contractId, paymentId = null) {
  const payment = paymentId ? byId(state.payments, paymentId) : null;
  contractId = payment?.contractId || contractId || "";
  const contract = byId(state.contracts, contractId);
  const opp = contract ? byId(state.opportunities, contract.opportunityId) : null;
  const summary = contract ? contractPaymentSummary(contract.id) : { confirmedCents: 0, pendingCents: 0 };
  const suggested = payment?.amountCents || (contract ? Math.max(0, contract.amountCents - summary.confirmedCents) || contract.amountCents : 0);
  const contractOptions = visibleContracts().map((item) => {
    return `<option value="${item.id}" ${item.id === contract?.id ? "selected" : ""}>${esc(item.contractNumber)} - ${esc(contractClientName(item))}</option>`;
  }).join("");
  const side = `
    ${contract ? `
      <section class="card">
        <p class="section-title">Contexto do contrato</p>
        <div class="detail-list">
          <div class="detail-row"><span>Contrato</span><strong>${esc(contract.contractNumber)}</strong></div>
          <div class="detail-row"><span>Cliente</span><strong>${esc(contractClientName(contract))}</strong></div>
          <div class="detail-row"><span>SDR</span><strong>${esc(getActorName(contractSdrId(contract)))}</strong></div>
          <div class="detail-row"><span>Forma</span><strong>${esc(paymentPlanLabel(contract.paymentPlan))}</strong></div>
          <div class="detail-row"><span>Valor contrato</span><strong>${brl(contract.amountCents)}</strong></div>
          <div class="detail-row"><span>Recebido</span><strong>${brl(summary.confirmedCents)}</strong></div>
          <div class="detail-row"><span>A confirmar</span><strong>${brl(summary.pendingCents)}</strong></div>
        </div>
      </section>
    ` : `
      <section class="card payment-external-context">
        <span class="context-icon">${renderIcon("link-2-off")}</span>
        <p class="section-title">Fora do CRM</p>
        <h3>Registro independente</h3>
        <p>Este pagamento entra no controle e nos relatÃ³rios do gestor. Ele nÃ£o gera comissÃ£o atÃ© ser vinculado a um contrato.</p>
      </section>
    `}
    <section class="card notice-card"><strong>NÃ£o e uma cobranca</strong><p>Este formulario apenas registra pagamentos recebidos fora da plataforma.</p></section>
  `;
  const main = `
    <section class="card">
      <div class="section-head"><div><h3>${payment ? "Editar pagamento manual" : "Registrar pagamento manual"}</h3><p>Documente o recebimento e escolha se ele ja pertence a um contrato do CRM.</p></div></div>
      <form class="form-grid" data-payment-record-form>
        <input name="paymentId" type="hidden" value="${esc(payment?.id || "")}" />
        <label class="field full payment-link-field">
          <span>VÃ­nculo com o CRM</span>
          <select name="contractId" data-payment-link-select>
            <option value="" ${contract ? "" : "selected"}>Sem vÃ­nculo - pagamento por fora do CRM</option>
            ${contractOptions}
          </select>
          <small>Voce pode deixar sem vÃ­nculo e conectar este pagamento a um contrato depois.</small>
        </label>
        <label class="field full"><span>Cliente ou origem do pagamento *</span><input name="externalClientName" required value="${esc(payment?.externalClientName || opp?.clientName || "")}" placeholder="Ex. Cliente avulso, evento ou nome da empresa" /></label>
        <label class="field"><span>Valor registrado</span><input name="amount" data-money-input inputmode="decimal" required value="${moneyInputValue(suggested)}" /></label>
        <label class="field"><span>Status do registro</span><select name="status"><option value="confirmed" ${!payment || payment.status === "confirmed" ? "selected" : ""}>Confirmado / conferido</option><option value="pending" ${payment?.status === "pending" ? "selected" : ""}>Aguardando conferÃªncia</option></select></label>
        <label class="field"><span>Tipo</span><select name="type">${[["external", "Pagamento externo"], ["contract_payment", "Pagamento do contrato"], ["initial", "Entrada"], ["installment", "Parcela"], ["remaining", "Saldo restante"], ["adjustment", "Ajuste"]].map(([value, label]) => `<option value="${value}" ${(!payment && value === (contract ? "contract_payment" : "external")) || payment?.type === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        <label class="field"><span>MÃ©todo externo</span><select name="method">${["Pix", "Transferencia", "Boleto", "Cartao externo", "Dinheiro", "Outro"].map((method) => `<option value="${method}" ${payment?.method === method ? "selected" : ""}>${method}</option>`).join("")}</select></label>
        ${renderDateField("Data do pagamento", "paidAt", String(payment?.paidAt || nowIso()).slice(0, 10))}
        ${renderDateField("Vencimento", "dueDate", String(payment?.dueDate || "").slice(0, 10))}
        <label class="field"><span>Nome do pagador</span><input name="payerName" value="${esc(payment?.payerName || "")}" placeholder="Pessoa ou empresa pagadora" /></label>
        <label class="field"><span>NÃºmero do recibo</span><input name="receiptNumber" value="${esc(payment?.receiptNumber || "")}" placeholder="Ex. REC-2026-001" /></label>
        <label class="field full"><span>ReferÃªncia externa</span><input name="reference" value="${esc(payment?.reference || "")}" placeholder="ID Pix, banco ou identificador da transferÃªncia" /></label>
        <label class="field full"><span>Comprovante ou arquivo recebido</span><input name="receiptFile" type="file" accept="application/pdf,image/jpeg,image/png" /><small>${payment?.receiptFileName ? `Arquivo atual: ${esc(payment.receiptFileName)}. Envie outro apenas para substituir.` : "PDF, JPG ou PNG de atÃ© 10 MB."}</small></label>
        <label class="field full"><span>Observacoes internas</span><textarea name="notes">${esc(payment?.notes || "")}</textarea></label>
        <div class="actions full"><button class="button" type="submit">${payment ? "Atualizar registro" : "Salvar pagamento"}</button>${contract ? `<button class="button secondary" type="button" data-open-contract="${contract.id}">Abrir contrato</button>` : ""}<button class="button ghost" type="button" data-close-drawer>Cancelar</button></div>
      </form>
    </section>`;
  return renderWorkspaceShell({
    title: payment ? "Editar pagamento" : "Novo pagamento",
    subtitle: contract ? `${esc(contract.contractNumber)} - ${esc(opp?.clientName || "Contrato")}` : "Registro manual fora do CRM",
    label: "Registro manual de pagamento",
    main,
    side,
  });
}

function renderPayoutPaymentDrawer(id) {
  const batch = byId(state.payoutBatches, id);
  if (!batch || currentUser.role !== "admin_manager") return "";
  return `
    <div class="drawer-backdrop" data-close-drawer>
      <aside class="drawer payout-drawer" role="dialog" aria-modal="true" aria-label="Registrar pagamento da comissÃ£o" data-drawer-panel>
        <header class="drawer-head">
          <div><h3>Registrar pagamento do lote #${batch.sequenceNumber}</h3><p>Este registro informa o pagamento feito fora da plataforma e disponibiliza o comprovante para a SDR.</p></div>
          <button class="icon-button" data-close-drawer type="button">Ã—</button>
        </header>
        <form class="drawer-body" data-payout-payment-form="${batch.id}">
          <section class="card">
            <p class="section-title">Resumo do pagamento</p>
            <div class="card-subtle">
              <div><span>SDR</span><strong>${esc(getActorName(batch.sdrId))}</strong></div>
              <div><span>ComissÃµes</span><strong>${batch.commissionIds.length}</strong></div>
              <div><span>Total</span><strong>${brl(batch.totalAmountCents)}</strong></div>
              <div><span>Status atual</span><strong>${statusLabels[batch.status] || batch.status}</strong></div>
            </div>
          </section>
          <section class="card">
            <p class="section-title">Comprovante</p>
            <div class="form-grid">
              <label class="field"><span>IdentificaÃ§Ã£o</span><input name="name" required value="Comprovante lote #${batch.sequenceNumber}" /></label>
              <label class="field"><span>Arquivo do comprovante</span><input name="receiptFile" type="file" accept="application/pdf,image/*" required /><small>PDF ou imagem de atÃ© 3 MB.</small></label>
              <label class="field full"><span>ObservaÃ§Ã£o</span><textarea name="notes">Pagamento de comissÃ£o realizado para a SDR.</textarea></label>
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
          <button class="icon-button" data-close-drawer type="button">Ã—</button>
        </header>
        <div class="drawer-body">
          <div class="grid cards-3">
            ${metricCard("Progresso", `${progress}%`, "", progress)}
            ${metricCard("Etapa atual", esc(currentStage?.name || "-"), "â–¥")}
            ${metricCard("SDR", esc(getActorName(opportunity?.sdrId)), "âœ“")}
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
              <label class="field"><span>Tipo</span><select name="type"><option>briefing recebido</option><option>reuniÃ£o</option><option>aprovaÃ§Ã£o</option><option>feedback</option><option>pagamento</option></select></label>
              <label class="field"><span>Canal</span><select name="channel"><option>WhatsApp</option><option>E-mail</option><option>ReuniÃ£o</option><option>Instagram</option></select></label>
              <label class="field"><span>Contato externo</span><input name="contact" placeholder="Nome do cliente" /></label>
              ${renderDateField("Data real", "occurredAt")}
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
                  <div><strong>${esc(item.label)}</strong><span>${dateLabel(item.createdAt)} Â· ${esc(getActorName(item.actorId))}</span></div>
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
            ${metricCard("Etapa atual", esc(stage?.name || "-"), "â–¥")}
          </div>

          <section class="card">
            <p class="section-title">Ambiente do projeto</p>
            <div class="detail-list">
              <div class="detail-row"><span>Projeto</span><strong>${esc(item.project?.name || "Projeto nÃ£o criado")}</strong></div>
              <div class="detail-row"><span>Status</span>${statusBadge(item.project?.status || "active")}</div>
              <div class="detail-row"><span>Responsavel</span><strong>${esc(getActorName(item.project?.managerId || item.contract.createdBy))}</strong></div>
              <div class="detail-row"><span>Contrato</span><strong>${esc(item.contract.contractNumber)}</strong></div>
              <div class="detail-row"><span>Pagamento inicial</span><div>${payment ? `${brl(payment.amountCents)} Â· ${statusLabels[payment.status] || payment.status}` : "-"}</div></div>
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
            ` : empty("Projeto ainda nÃ£o criado para este servico", "â–¥")}
          </section>

          <section class="card">
            <p class="section-title">Timeline do projeto</p>
            ${item.project?.events?.length ? `
              <div class="timeline">
                ${item.project.events.map((eventItem) => `
                  <div class="timeline-item">
                    <span class="timeline-dot"></span>
                    <div><strong>${esc(eventItem.label)}</strong><span>${dateLabel(eventItem.createdAt)} Â· ${esc(getActorName(eventItem.actorId))}</span></div>
                  </div>
                `).join("")}
              </div>
            ` : empty("Nenhum evento registrado no projeto", "â—Œ")}
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
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="Dashboard de comissÃµes por SDR" data-drawer-panel>
        <header class="drawer-head">
          <div>
            <h3>${esc(user.name)}</h3>
            <p>Dashboard detalhado de comissÃµes, vendas e lotes</p>
          </div>
          <button class="icon-button" data-close-drawer type="button">x</button>
        </header>
        <div class="drawer-body">
          <div class="grid cards-3">
            ${metricCard("ComissÃ£o total", brl(summary.totalCommissionCents), "$")}
            ${metricCard("DisponÃ­vel", brl(summary.availableCents), "$")}
            ${metricCard("Ciclo atual", `${summary.cycleCount} de 5`, "", (summary.cycleCount / 5) * 100)}
          </div>
          <div class="grid cards-3">
            ${metricCard("Vendas validadas", summary.validatedSales, "âœ“")}
            ${metricCard("Receita validada", brl(summary.contractedRevenueCents), "$")}
            ${metricCard("Projetos originados", summary.projects.length, "â–¥")}
          </div>

          <section class="card">
            <p class="section-title">ComissÃµes individuais</p>
            ${summary.commissions.length ? renderSdrCommissionTable(summary.commissions) : empty("Nenhuma comissÃ£o gerada para esta SDR", "$")}
          </section>

          <section class="card">
            <p class="section-title">Oportunidades da SDR</p>
            ${summary.opportunities.length ? renderSdrOpportunityMiniTable(summary.opportunities) : empty("Nenhuma oportunidade registrada", "â–¤")}
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
        <thead><tr><th>Contrato</th><th>Cliente</th><th>Pagamento</th><th>Base</th><th>Taxa</th><th>ComissÃ£o</th><th>Status</th></tr></thead>
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
              <td class="row-actions"><button class="icon-button" type="button" data-open-opportunity="${item.id}" aria-label="Ver oportunidade">ðŸ‘</button></td>
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
      if (!response.ok) throw new Error(payload.error || "NÃ£o foi possÃ­vel entrar.");
      saveUser(payload.user);
      currentRoute = "dashboard";
      supabaseSyncReady = false;
      authReady = false;
      render();
      await initSupabaseSync();
      toast("SessÃ£o iniciada com seguranÃ§a.");
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
    const isInvitation = event.currentTarget.dataset.invitationMode === "true";
    if (form.get("newPassword") !== form.get("confirmPassword")) {
      errorBox.textContent = "As senhas nÃ£o coincidem.";
      errorBox.hidden = false;
      return;
    }
    const tokens = new URLSearchParams(location.hash.replace(/^#/, ""));
    try {
      await postPortal("/api/portal-auth", {
        action: isInvitation ? "complete_invitation" : "complete_recovery",
        accessToken: tokens.get("access_token"),
        refreshToken: tokens.get("refresh_token"),
        newPassword: form.get("newPassword"),
      });
      history.replaceState({}, "", location.pathname);
      if (isInvitation) {
        currentUser = null;
        authReady = true;
        supabaseSyncReady = false;
        render();
        toast("Acesso criado. Agora entre com seu e-mail e senha.");
      } else {
        await bootstrapApp();
        toast("Senha definida. Acesso liberado.");
      }
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
      toast(`Ambiente alterado para ${currentUser.workspaceKind === "training" ? "Treinamento" : "OperaÃ§Ã£o"}.`);
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

  document.querySelectorAll("[data-new-project]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "newProject" };
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

  document.querySelectorAll("[data-new-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      drawer = { type: "paymentRecord", contractId: "" };
      render();
    });
  });

  document.querySelectorAll("[data-edit-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      const payment = byId(state.payments, button.dataset.editPayment);
      if (!payment) return;
      drawer = { type: "paymentRecord", contractId: payment.contractId, paymentId: payment.id };
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
  bindProgressControls();
  bindDateControls();
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
  setupServicePickers();

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
      toast("VerificaÃ§Ã£o em duas etapas ativada.");
    } catch (error) {
      toast(error.message);
    }
  });

  document.querySelector("[data-opportunity-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const intent = event.submitter?.value || "draft";
    setFormBusy(formElement, true);
    try {
      await createOpportunity(formData, intent);
    } finally {
      setFormBusy(formElement, false);
    }
  });

  document.querySelector("[data-opportunity-edit-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const opportunityId = formElement.dataset.opportunityEditForm;
    const shouldSubmit = event.submitter?.value === "submit";
    setFormBusy(formElement, true);
    try {
      await updateOpportunityDetails(opportunityId, formData, shouldSubmit);
    } finally {
      setFormBusy(formElement, false);
    }
  });

  document.querySelector("[data-project-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    setFormBusy(formElement, true);
    try {
      await createManualProject(formData);
    } finally {
      setFormBusy(formElement, false);
    }
  });

  document.querySelector("[data-approval-action-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const approvalAction = formElement.dataset.approvalAction;
    const opportunityId = formElement.dataset.approvalActionForm;
    setFormBusy(formElement, true);
    try {
      await submitApprovalFollowAction(opportunityId, formData, approvalAction);
    } finally {
      setFormBusy(formElement, false);
    }
  });

  document.querySelector("[data-opportunity-follow-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitOpportunityFollowAction(event.currentTarget.dataset.opportunityFollowForm, event.currentTarget);
  });

  document.querySelector("[data-external-contract-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await registerExternalContract(new FormData(event.currentTarget));
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
        return toast("NÃ£o foi possÃ­vel enviar o comprovante. Tente novamente.");
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
    if (delegatedSdrId) {
      addNotification(`Um novo comprovante de comissÃ£o foi disponibilizado para vocÃª: ${file.name}.`, {
        recipientUserId: delegatedSdrId,
        title: "Novo comprovante de comissÃ£o",
        kind: "file",
        entityType: "file",
        entityId: file.id,
      });
    }
    saveState();
    toast("Comprovante de comissÃ£o registrado.");
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
    savePaymentRecord(event.currentTarget);
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

function setupServicePickers(root = document) {
  root.querySelectorAll("[data-service-picker]").forEach((picker) => {
    const options = [...picker.querySelectorAll("[data-service-option]")];
    const cards = [...picker.querySelectorAll("[data-service-card]")];
    const count = picker.querySelector("[data-service-count]");
    const sync = () => {
      const selected = options.filter((option) => option.checked);
      options.forEach((option) => {
        const card = option.closest("[data-service-card]");
        card?.classList.toggle("is-selected", option.checked);
        card?.setAttribute("aria-checked", String(option.checked));
      });
      if (count) count.textContent = `${selected.length} selecionado(s)`;
    };
    const toggleCard = (card) => {
      const option = card.querySelector("[data-service-option]");
      if (!option) return;
      option.checked = !option.checked;
      sync();
    };
    cards.forEach((card) => {
      card.addEventListener("click", () => toggleCard(card));
      card.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        toggleCard(card);
      });
    });
    picker.querySelector("[data-clear-services]")?.addEventListener("click", () => {
      options.forEach((option) => option.checked = false);
      sync();
    });
    sync();
  });
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

function markProgressRowDirty(row) {
  if (!row) return;
  row.classList.add("is-dirty");
  const saveButton = row.querySelector("[data-save-opportunity-progress]");
  if (saveButton) saveButton.hidden = false;
}

function bindProgressControls() {
  document.querySelectorAll("[data-progress-row]").forEach((row) => {
    row.querySelectorAll(".progress-picker").forEach((picker) => {
      picker.addEventListener("toggle", () => {
        if (!picker.open) return;
        document.querySelectorAll(".progress-picker[open]").forEach((other) => {
          if (other !== picker) other.open = false;
        });
      });
    });

    row.querySelector("[data-progress-notes]")?.addEventListener("input", () => markProgressRowDirty(row));
    row.querySelector("[data-progress-action-search]")?.addEventListener("input", (event) => {
      const term = event.currentTarget.value.trim().toLowerCase();
      row.querySelectorAll("[data-progress-action-value]").forEach((button) => {
        button.hidden = Boolean(term && !button.dataset.actionSearch.includes(term));
      });
    });

    row.addEventListener("click", (event) => {
      const stageButton = event.target.closest("[data-progress-stage-value]");
      if (stageButton) {
        const status = stageButton.dataset.progressStageValue;
        const input = row.querySelector("[data-progress-crm-status]");
        input.value = status;
        const label = row.querySelector("[data-progress-stage-label]");
        label.className = `progress-stage-pill stage-${status}`;
        label.textContent = crmStatusLabels[status];
        row.querySelector("[data-progress-stage-track]").innerHTML = progressStageTrack(status);
        const selectedAction = row.querySelector("[data-progress-next-action]").value;
        row.querySelector("[data-progress-action-options]").innerHTML = progressActionOptions(status, selectedAction);
        row.querySelector("[data-progress-stage-picker]").open = false;
        markProgressRowDirty(row);
        refreshIcons();
        return;
      }

      const actionButton = event.target.closest("[data-progress-action-value]");
      if (actionButton) {
        const actionName = actionButton.dataset.progressActionValue;
        row.querySelector("[data-progress-next-action]").value = actionName;
        const label = row.querySelector("[data-progress-action-label]");
        label.textContent = actionName;
        label.classList.remove("is-placeholder");
        row.querySelector("[data-progress-action-picker]").open = false;
        markProgressRowDirty(row);
        return;
      }

      const calendarNav = event.target.closest("[data-progress-calendar-nav]");
      if (calendarNav) {
        const calendar = row.querySelector("[data-progress-calendar]");
        const currentMonth = parseDateOnly(calendar.dataset.month) || new Date();
        currentMonth.setDate(1);
        currentMonth.setMonth(currentMonth.getMonth() + Number(calendarNav.dataset.progressCalendarNav));
        const monthValue = dateOnlyValue(currentMonth);
        const selectedValue = row.querySelector("[data-progress-next-date]").value;
        calendar.dataset.month = monthValue;
        calendar.innerHTML = progressCalendarBody(selectedValue, monthValue);
        refreshIcons();
        return;
      }

      const clearDate = event.target.closest("[data-progress-date-clear]");
      if (clearDate) {
        row.querySelector("[data-progress-next-date]").value = "";
        const label = row.querySelector("[data-progress-date-label]");
        label.textContent = "Definir data";
        label.classList.add("is-placeholder");
        row.querySelector("[data-progress-date-picker]").open = false;
        markProgressRowDirty(row);
        return;
      }

      const dateButton = event.target.closest("[data-progress-date-value]");
      if (dateButton) {
        const dateValue = dateButton.dataset.progressDateValue;
        row.querySelector("[data-progress-next-date]").value = dateValue;
        const label = row.querySelector("[data-progress-date-label]");
        label.textContent = progressDateLabel(dateValue);
        label.classList.remove("is-placeholder");
        row.querySelector("[data-progress-date-picker]").open = false;
        markProgressRowDirty(row);
      }
    });
  });
}

function bindDateControls() {
  document.querySelectorAll("[data-date-control]").forEach((control) => {
    const picker = control.querySelector("[data-date-picker]");
    const input = control.querySelector("[data-date-input]");
    const calendar = control.querySelector("[data-date-calendar]");
    const label = control.querySelector("[data-date-label]");

    picker?.addEventListener("toggle", () => {
      if (!picker.open) return;
      document.querySelectorAll(".progress-picker[open]").forEach((other) => {
        if (other !== picker) other.open = false;
      });
    });

    control.addEventListener("click", (event) => {
      const calendarNav = event.target.closest("[data-progress-calendar-nav]");
      if (calendarNav) {
        const currentMonth = parseDateOnly(calendar.dataset.month) || new Date();
        currentMonth.setDate(1);
        currentMonth.setMonth(currentMonth.getMonth() + Number(calendarNav.dataset.progressCalendarNav));
        calendar.dataset.month = dateOnlyValue(currentMonth);
        calendar.innerHTML = progressCalendarBody(input.value, calendar.dataset.month);
        refreshIcons();
        return;
      }

      const clearButton = event.target.closest("[data-progress-date-clear]");
      const dateButton = event.target.closest("[data-progress-date-value]");
      if (!clearButton && !dateButton) return;
      input.value = clearButton ? "" : dateButton.dataset.progressDateValue;
      label.textContent = input.value ? dateLabel(input.value) : "Definir data";
      label.classList.toggle("is-placeholder", !input.value);
      picker.open = false;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
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
  action("[data-restore-opportunity]", (button) => restoreOpportunity(button.dataset.restoreOpportunity));
  action("[data-read-notification]", (button) => markNotificationRead(button.dataset.readNotification));
  action("[data-open-notification]", (button) => openNotification(button.dataset.openNotification));
  action("[data-save-commission]", (button) => updateCommission(button.dataset.saveCommission, button.closest("[data-commission-row]")));
  action("[data-pay-batch]", (button) => payBatch(button.dataset.payBatch));
  action("[data-export-csv]", (button) => exportCsv(button.dataset.exportCsv));
  document.querySelectorAll("[data-copy-id]").forEach((button) => button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyId || "");
      toast("ID copiado.");
    } catch {
      toast("NÃ£o foi possÃ­vel copiar o ID.");
    }
  }));
  action("[data-mark-notifications]", () => markAllNotificationsRead());
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
  if (!response.ok) throw new Error(body.error || "NÃ£o foi possÃ­vel concluir a aÃ§Ã£o.");
  return body;
}

async function postWorkflow(payload) {
  return postPortal("/api/portal-workflow", payload);
}

function setFormBusy(form, busy) {
  if (!form) return;
  form.querySelectorAll("button, input, select, textarea").forEach((control) => control.disabled = busy);
}

async function createSdrAccount(form) {
  const data = new FormData(form);
  setFormBusy(form, true);
  try {
    await postPortal("/api/portal-users", {
      action: "invite",
      name: data.get("name"),
      email: data.get("email"),
    });
    form.reset();
    toast("Convite enviado para a SDR definir a prÃ³pria senha.");
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
    toast("E-mail de recuperaÃ§Ã£o enviado.");
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
  const data = new FormData(form);
  setFormBusy(form, true);
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
  document.querySelector("[data-toggle-opportunity-filters]")?.addEventListener("click", () => {
    opportunityFiltersOpen = !opportunityFiltersOpen;
    render();
  });
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

async function createOpportunity(form, intent) {
  if (intent === "submit" && currentUser.role !== "sdr") intent = "draft";
  const id = uid("opp");
  const serviceIds = normalizeServiceIds(form.getAll("serviceIds"));
  const suggestedAmountCents = cents(form.get("suggestedAmount"));
  if (intent === "submit" && !serviceIds.length) return toast("Selecione pelo menos um servico antes de pedir aprovaÃ§Ã£o.");
  if (intent === "submit" && suggestedAmountCents <= 0) return toast("Informe o valor proposto antes de pedir aprovaÃ§Ã£o.");
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
    status: "draft",
    createdAt: nowIso(),
    updatedAt: nowIso(),
    timeline: [event("opportunity_created", "Oportunidade salva no CRM", currentUser.id)],
  };
  state.opportunities.unshift(opp);
  addAudit("opportunity_created", "Opportunity", opp.id, {});
  notifyOpportunityTeam(opp, `A oportunidade de ${opp.clientName} foi cadastrada por ${currentUser.name}.`, {
    title: "Nova oportunidade cadastrada",
  });
  await saveState();
  drawer = { type: "opportunity", id };
  if (intent === "submit") {
    await submitOpportunity(id);
    return;
  }
  toast("Oportunidade salva no CRM.");
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

async function updateOpportunityDetails(id, form, requestApproval = false) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("Uma oportunidade recusada nÃ£o pode ser alterada.");
  if (isArchivedOpportunity(opp)) return toast("Restaure a oportunidade antes de altera-la.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nÃ£o pode editar esta oportunidade.");
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
  opp.serviceIds = normalizeServiceIds(form.getAll("serviceIds"));
  opp.serviceId = opp.serviceIds[0] || "";
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
  opp.timeline.unshift(event("opportunity_crm_updated", "InformaÃ§Ãµes do CRM atualizadas", currentUser.id));
  addAudit("opportunity_crm_updated", "Opportunity", id, { crmStatus: opp.crmStatus });
  notifyOpportunityTeam(opp, `As informaÃ§Ãµes da oportunidade de ${opp.clientName} foram atualizadas por ${currentUser.name}.`, {
    title: "Oportunidade atualizada",
  });
  await saveState();
  if (requestApproval) {
    await submitOpportunity(id);
    return;
  }
  toast("InformaÃ§Ãµes do CRM salvas.");
  drawer = { type: "opportunity", id };
  render();
}

function updateOpportunityCrmStatus(id, crmStatus) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("Uma oportunidade recusada nÃ£o pode ser alterada.");
  if (isArchivedOpportunity(opp)) return toast("Restaure a oportunidade antes de altera-la.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nÃ£o pode alterar esta oportunidade.");
  if (!crmStatusLabels[crmStatus] || opp.crmStatus === crmStatus) return;
  const previousStatus = opp.crmStatus || "lead_mapped";
  opp.crmStatus = crmStatus;
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("crm_status_updated", `Status CRM alterado de ${crmStatusLabels[previousStatus] || previousStatus} para ${crmStatusLabels[crmStatus]}`, currentUser.id, { previousStatus, crmStatus }));
  addAudit("crm_status_updated", "Opportunity", id, { previousStatus, crmStatus });
  notifyOpportunityTeam(opp, `${opp.clientName} avanÃ§ou de ${crmStatusLabels[previousStatus] || previousStatus} para ${crmStatusLabels[crmStatus]}.`, {
    title: "Novo andamento no CRM",
    kind: "progress",
  });
  saveState();
  toast("Status do CRM atualizado.");
  drawer = { type: "opportunity", id };
  render();
}

function updateOpportunityProgress(id, row) {
  const opp = byId(state.opportunities, id);
  if (!opp || !row) return toast("Oportunidade nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("Uma oportunidade recusada nÃ£o pode ser alterada.");
  if (isArchivedOpportunity(opp)) return toast("Restaure a oportunidade antes de altera-la.");
  const canUpdate = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && opp.sdrId === currentUser.id);
  if (!canUpdate) return toast("Voce nÃ£o pode alterar esta oportunidade.");

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
  const nextActionText = opp.nextAction ? ` PrÃ³xima aÃ§Ã£o: ${opp.nextAction}${opp.nextActionDate ? ` em ${dateLabel(opp.nextActionDate)}` : ""}.` : "";
  notifyOpportunityTeam(opp, `O andamento de ${opp.clientName} foi atualizado para ${crmStatusLabels[crmStatus]}.${nextActionText}`, {
    title: "Andamento atualizado",
    kind: "progress",
  });
  saveState();
  toast("Andamento da oportunidade salvo.");
  render();
}

function duplicateOpportunity(id) {
  const source = byId(state.opportunities, id);
  if (!source) return toast("Oportunidade nÃ£o encontrada.");
  const copy = {
    ...structuredClone(source),
    id: uid("opp"),
    clientName: `${source.clientName} (cÃ³pia)`,
    brandName: source.brandName === source.clientName ? `${source.brandName} (cÃ³pia)` : source.brandName,
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
  if (!opp) return toast("Oportunidade nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("A oportunidade recusada ja esta arquivada definitivamente.");
  if (!confirm(`Arquivar a oportunidade ${opp.clientName}?`)) return;
  opp.archivedFromStatus = opp.status === "cancelled" ? (opp.archivedFromStatus || "draft") : opp.status;
  opp.status = "cancelled";
  opp.archivedAt = nowIso();
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("opportunity_archived", "Oportunidade arquivada", currentUser.id));
  addAudit("opportunity_archived", "Opportunity", id, {});
  saveState();
  toast("Oportunidade arquivada.");
  drawer = null;
  currentRoute = "opportunities";
  render();
}

function restoreOpportunity(id) {
  const opp = byId(state.opportunities, id);
  if (!opp || !isArchivedOpportunity(opp)) return toast("Oportunidade arquivada nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("Uma oportunidade recusada pelo gestor nÃ£o pode ser restaurada.");
  const canRestore = currentUser.role === "admin_manager" || opp.sdrId === currentUser.id;
  if (!canRestore) return toast("Voce nÃ£o pode restaurar esta oportunidade.");
  opp.status = opp.archivedFromStatus && opp.archivedFromStatus !== "cancelled" ? opp.archivedFromStatus : "draft";
  opp.archivedAt = null;
  opp.updatedAt = nowIso();
  opp.timeline.unshift(event("opportunity_restored", "Oportunidade restaurada para a operacao ativa", currentUser.id));
  addAudit("opportunity_restored", "Opportunity", id, { restoredStatus: opp.status });
  saveState();
  toast("Oportunidade restaurada.");
  currentRoute = "opportunities";
  render();
}

async function markNotificationRead(id, { rerender = true } = {}) {
  const notification = byId(state.notifications, id);
  if (!notification || notification.read) return;
  if (notification.recipientUserId && notification.recipientUserId !== currentUser.id && currentUser.role !== "admin_manager") return;
  try {
    if (supabaseSyncReady && notification.recipientUserId === currentUser.id) {
      await postWorkflow({ action: "mark_notification_read", notificationId: id });
      notification.read = true;
      notification.readAt = nowIso();
      await initSupabaseSync();
    } else {
      notification.read = true;
      notification.readAt = nowIso();
      await saveState();
    }
  } catch (error) {
    toast(error.message);
  }
  if (rerender) render();
}

async function markAllNotificationsRead() {
  const unread = visibleNotifications().filter((item) => !item.read);
  for (const item of unread) await markNotificationRead(item.id, { rerender: false });
  toast("NotificaÃ§Ãµes marcadas como lidas.");
  render();
}

async function openNotification(id) {
  const notification = byId(state.notifications, id);
  if (!notification) return;
  await markNotificationRead(id, { rerender: false });
  const entityType = String(notification.entityType || "").toLowerCase();
  if (entityType.includes("opportunity")) drawer = { type: "opportunity", id: notification.entityId };
  else if (entityType.includes("contract")) drawer = { type: "contract", id: notification.entityId };
  else if (entityType.includes("project")) drawer = { type: "project", id: notification.entityId };
  else currentRoute = "notifications";
  render();
}

async function submitOpportunity(id) {
  let current = byId(state.opportunities, id);
  if (isTerminallyRejected(current)) return toast("Uma oportunidade recusada nÃ£o pode voltar para aprovaÃ§Ã£o.");
  if (isArchivedOpportunity(current)) return toast("Restaure a oportunidade antes de pedir aprovaÃ§Ã£o.");
  const canSubmit = currentUser.role === "admin_manager" || (currentUser.role === "sdr" && current?.sdrId === currentUser.id);
  if (!canSubmit) return toast("Apenas o gestor ou a SDR responsavel pode enviar a condiÃ§Ã£o para aprovaÃ§Ã£o.");
  if (!canRequestConditionApproval(current)) return toast("Esta oportunidade nÃ£o pode ser enviada para aprovaÃ§Ã£o neste status.");
  const missing = conditionApprovalMissingFields(current);
  if (missing.length) return toast(`Complete ${missing.join(", ")} antes de pedir aprovaÃ§Ã£o.`);
  if (supabaseSyncReady) {
    try {
      await saveState();
      current = byId(state.opportunities, id);
      await postWorkflow({
        action: "request_approval",
        opportunityId: id,
        expectedVersion: Number(current._version || 1),
      });
      await initSupabaseSync();
      toast("Pedido de aprovaÃ§Ã£o enviado para a fila do gestor.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  const opp = mutateOpportunity(id, "pending_approval", "Pedido de aprovaÃ§Ã£o da condiÃ§Ã£o enviado", "opportunity_submitted");
  if (!opp) return;
  addNotification(`Nova solicitaÃ§Ã£o enviada por ${getActorName(opp.sdrId)}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Pedido de aprovaÃ§Ã£o enviado para a fila do gestor.");
  render();
}

async function submitApprovalFollowAction(id, form, action) {
  const payload = {
    reason: String(form.get("reason") || "").trim(),
    followAction: String(form.get("followAction") || "").trim(),
    nextActionDate: form.get("nextActionDate") || "",
    amountCents: form.get("amount") ? cents(form.get("amount")) : null,
  };

  if (action === "approved" || action === "approved_with_changes") return await approveOpportunity(id, action, payload);
  if (action === "needs_information") return await needsInformation(id, payload);
  if (action === "rejected") return await rejectOpportunity(id, payload);
  return toast("AÃ§Ã£o invalida.");
}

function submitOpportunityFollowAction(id, formElement) {
  const form = new FormData(formElement);
  const action = formElement.dataset.followAction;
  const note = String(form.get("note") || "").trim();
  if (!note) return toast("Descreva a informaÃ§Ã£o antes de continuar.");
  const follow = {
    note,
    nextAction: String(form.get("nextAction") || "").trim(),
    nextActionDate: form.get("nextActionDate") || "",
  };
  if (action === "answer_information") return answerInformation(id, follow);
  if (action === "client_revision") return clientRevision(id, follow);
  if (action === "client_declined") return clientDeclined(id, follow);
  return toast("AÃ§Ã£o invÃ¡lida.");
}

function applyFollowAction(opp, payload) {
  if (!opp || !payload) return;
  opp.nextAction = payload.followAction || opp.nextAction || "";
  opp.nextActionDate = payload.nextActionDate || opp.nextActionDate || "";
  if (payload.reason) opp.notes = payload.reason;
}

async function approveOpportunity(id, mode, payload = {}) {
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nÃ£o encontrada.");
  const changed = mode === "approved_with_changes";
  const reason = payload.reason || (changed ? "" : "Aprovado sem alteraÃ§Ã£o.");
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
      const refreshed = byId(state.opportunities, id);
      applyFollowAction(refreshed, payload);
      refreshed?.timeline?.unshift(event("approval_follow_action_set", `PrÃ³xima acao definida: ${payload.followAction || "-"}`, currentUser.id, { nextActionDate: payload.nextActionDate || null }));
      await saveState();
      toast("CondiÃ§Ã£o aprovada: contrato e projeto criados pelo Supabase.");
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
  mutateOpportunity(id, "commercial_condition_approved", changed ? "CondiÃ§Ã£o aprovada com alteraÃ§Ãµes" : "CondiÃ§Ã£o aprovada sem alteraÃ§Ã£o", mode, { conditionId: condition.id, reason });
  const contract = ensureCommercialContract(opp, condition);
  createPlanningProject(opp, condition);
  addNotification(`CondiÃ§Ã£o aprovada para ${opp.clientName}; contrato ${contract.contractNumber} aberto para planejamento.`, { recipientUserId: opp.sdrId });
  saveState();
  toast("CondiÃ§Ã£o aprovada: contrato aberto para planejamento do gestor.");
  render();
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

async function needsInformation(id, payload = {}) {
  const reason = payload.reason || "";
  if (!reason) return;
  const opp = byId(state.opportunities, id);
  if (supabaseSyncReady) {
    try {
      await postWorkflow({
        action: "review_opportunity",
        opportunityId: id,
        reviewAction: "needs_information",
        reason,
        expectedVersion: Number(opp?._version || 1),
      });
      await initSupabaseSync();
      const refreshed = byId(state.opportunities, id);
      applyFollowAction(refreshed, payload);
      refreshed?.timeline?.unshift(event("approval_needs_information", `Gestor solicitou mais informaÃ§Ãµes: ${reason}`, currentUser.id));
      await saveState();
      toast("Pedido de informaÃ§Ã£o enviado.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  applyFollowAction(opp, payload);
  mutateOpportunity(id, "needs_information", `Gestor solicitou mais informaÃ§Ãµes: ${reason}`, "approval_needs_information", { reason });
  addNotification(`O gestor solicitou informaÃ§Ãµes adicionais em ${opp.clientName}.`, { recipientUserId: opp.sdrId });
  saveState();
  toast("Pedido de informaÃ§Ã£o enviado.");
  render();
}

async function rejectOpportunity(id, payload = {}) {
  const reason = payload.reason || "";
  if (!reason) return toast("A justificativa e obrigatoria.");
  const opp = byId(state.opportunities, id);
  if (!opp) return toast("Oportunidade nÃ£o encontrada.");
  if (isTerminallyRejected(opp)) return toast("Esta oportunidade ja foi recusada e arquivada.");
  if (supabaseSyncReady) {
    try {
      await postWorkflow({
        action: "review_opportunity",
        opportunityId: id,
        reviewAction: "rejected",
        reason,
        expectedVersion: Number(opp?._version || 1),
      });
      await initSupabaseSync();
      drawer = null;
      currentRoute = "archived";
      toast("Oportunidade recusada, arquivada e bloqueada.");
      render();
      return;
    } catch (error) {
      toast(error.message);
      await initSupabaseSync();
      return;
    }
  }
  const rejected = mutateOpportunity(id, "rejected", `Oportunidade recusada: ${reason}`, "approval_rejected", { reason });
  rejected.archivedFromStatus = "rejected";
  rejected.archivedAt = nowIso();
  rejected.terminalRejection = true;
  rejected.rejectionReason = reason;
  rejected.nextAction = "";
  rejected.nextActionDate = "";
  rejected.notes = reason;
  addNotification(`A condiÃ§Ã£o de ${opp.clientName} foi recusada pelo gestor.`, { recipientUserId: opp.sdrId });
  saveState();
  drawer = null;
  currentRoute = "archived";
  toast("Oportunidade recusada, arquivada e bloqueada.");
  render();
}

function answerInformation(id, follow = {}) {
  const answer = follow.note || "";
  if (!answer) return toast("Informe a resposta para o gestor.");
  const opp = byId(state.opportunities, id);
  opp.nextAction = follow.nextAction || opp.nextAction;
  opp.nextActionDate = follow.nextActionDate || opp.nextActionDate;
  mutateOpportunity(id, "pending_approval", `SDR respondeu pedido de informaÃ§Ã£o: ${answer}`, "information_answered", { answer });
  addNotification(`InformaÃ§Ãµes complementares enviadas por ${getActorName(opp.sdrId)} em ${opp.clientName}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("Resposta enviada para nova anÃ¡lise.");
  render();
}

function presentToClient(id) {
  mutateOpportunity(id, "awaiting_client_response", "CondiÃ§Ã£o apresentada ao cliente", "condition_presented_to_client");
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
  if (!note) return toast("Descreva a revisÃ£o solicitada pelo cliente.");
  mutateOpportunity(id, "client_requested_revision", `Cliente solicitou revisÃ£o: ${note}`, "client_requested_revision", { note });
  const opp = byId(state.opportunities, id);
  opp.status = "pending_approval";
  opp.nextAction = follow.nextAction || opp.nextAction;
  opp.nextActionDate = follow.nextActionDate || opp.nextActionDate;
  opp.timeline.unshift(event("revision_submitted", "Nova revisÃ£o enviada para aprovaÃ§Ã£o", currentUser.id));
  addAudit("revision_submitted", "Opportunity", id, {});
  addNotification(`RevisÃ£o comercial enviada por ${getActorName(opp.sdrId)} em ${opp.clientName}.`, { recipientRole: "admin_manager" });
  saveState();
  toast("RevisÃ£o criada sem sobrescrever a versÃ£o anterior.");
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

async function registerExternalContract(form) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode cadastrar contratos externos.");
  const externalClientName = String(form.get("externalClientName") || "").trim();
  const amountCents = cents(form.get("amount"));
  const contractLink = String(form.get("contractLink") || "").trim();
  if (!externalClientName) return toast("Informe o cliente ou empresa do contrato.");
  if (amountCents <= 0) return toast("Informe um valor contratado maior que zero.");
  if (contractLink) {
    try {
      const url = new URL(contractLink);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("invalid protocol");
    } catch {
      return toast("Informe um link de contrato valido, comecando com https://.");
    }
  }
  const contractId = uid("ctr_external");
  const contractFile = form.get("contractFile");
  let contractAttachmentId = "";
  if (contractFile?.name) {
    try {
      const attachment = await uploadPortalAttachment(contractFile, { kind: "external_contract", contractId });
      contractAttachmentId = attachment?.id || "";
    } catch {
      return toast("Nao foi possivel enviar o contrato. Tente novamente.");
    }
  }
  const sdrId = String(form.get("sdrId") || "") || null;
  const contract = {
    id: contractId,
    opportunityId: null,
    clientId: null,
    recordMode: "external",
    externalSource: "outside_crm",
    externalClientName,
    externalBrandName: String(form.get("externalBrandName") || "").trim(),
    sdrId,
    contractNumber: String(form.get("contractNumber") || "").trim() || `EXT-${String(state.contracts.filter(isExternalContract).length + 1).padStart(4, "0")}`,
    amountCents,
    proposalAmountCents: amountCents,
    paymentPlan: form.get("paymentPlan") || "50_50",
    paymentTerms: paymentPlanLabel(form.get("paymentPlan") || "50_50"),
    contractLink,
    contractLinkAddedAt: contractLink ? nowIso() : null,
    contractAttachmentId,
    contractFileName: contractFile?.name || "",
    proposalFileName: "",
    proposalAttachmentId: "",
    status: "signed",
    signedAt: nowIso(),
    saleValidatedAt: null,
    notes: String(form.get("notes") || "").trim(),
    createdBy: currentUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  state.contracts.unshift(contract);
  addAudit("external_contract_created", "Contract", contract.id, { sdrId, amountCents, recordOnly: true });
  if (sdrId) addNotification(`Um contrato externo de ${externalClientName} foi cadastrado e vinculado a voce.`, { recipientUserId: sdrId, title: "Novo contrato externo", kind: "contract", entityType: "contract", entityId: contract.id });
  await saveState();
  toast("Contrato externo cadastrado. Agora voce pode vincular pagamentos a ele.");
  render();
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
      return toast("Informe um link de contrato valido, comeÃ§ando com https://.");
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
      return toast("NÃ£o foi possÃ­vel enviar a proposta. Tente novamente.");
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
  const opp = contract && (byId(state.opportunities, contract.opportunityId) || { clientName: contractClientName(contract), timeline: null });
  if (!contract || !opp) return toast("Contrato inexistente.");
  if (currentUser.role !== "sdr" || opp.sdrId !== currentUser.id) return toast("Apenas a SDR vinculada pode enviar esta proposta.");
  if (!contract.proposalFileName) return toast("A proposta ainda nÃ£o foi anexada pelo gestor.");
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
  if (!condition) return toast("Bloqueado: nÃ£o existe condiÃ§Ã£o aprovada vigente.");
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
  if (!canManage && !canSdrAct) return toast("Voce nÃ£o tem acesso a este contrato.");
  if (!contract.contractLink) return toast("O gestor ainda nÃ£o informou o link do contrato.");
  if (!["contract_ready", "proposal_accepted"].includes(contract.status)) return toast("Contrato ainda nÃ£o esta pronto para envio.");
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

async function savePaymentRecord(formElement) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar pagamentos.");
  const form = new FormData(formElement);
  const contractId = String(form.get("contractId") || "");
  const contract = contractId ? byId(state.contracts, contractId) : null;
  if (contractId && !contract) return toast("O contrato selecionado nÃ£o foi encontrado.");
  const paymentId = String(form.get("paymentId") || "") || uid("pay");
  const existing = byId(state.payments, paymentId);
  const amountCents = cents(form.get("amount"));
  if (!amountCents) return toast("Informe um valor valido para o registro.");
  const externalClientName = String(form.get("externalClientName") || "").trim();
  if (!externalClientName) return toast("Informe o cliente ou a origem do pagamento.");
  const status = form.get("status") === "confirmed" ? "confirmed" : "pending";
  const paidAtDate = form.get("paidAt");
  if (status === "confirmed" && !paidAtDate) return toast("Defina a data do pagamento confirmado.");
  const dueDate = form.get("dueDate") || null;
  const receiptFile = form.get("receiptFile");
  let receiptAttachmentId = existing?.receiptAttachmentId || "";
  if (receiptFile?.name) {
    try {
      const attachment = await uploadPortalAttachment(receiptFile, { kind: "customer_payment_receipt", contractId: contract?.id || null, paymentId });
      receiptAttachmentId = attachment?.id || "";
    } catch {
      return toast("NÃ£o foi possÃ­vel enviar o comprovante. Tente novamente.");
    }
  }
  const payment = {
    ...(existing || {}),
    id: paymentId,
    contractId: contract?.id || null,
    externalClientName,
    amountCents,
    type: form.get("type") || (contract ? "contract_payment" : "external"),
    method: form.get("method") || "",
    payerName: String(form.get("payerName") || "").trim(),
    receiptNumber: String(form.get("receiptNumber") || "").trim(),
    reference: String(form.get("reference") || "").trim(),
    notes: String(form.get("notes") || "").trim(),
    status,
    dueDate,
    createdAt: existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
    paidAt: status === "confirmed" ? (paidAtDate ? new Date(`${paidAtDate}T12:00:00`).toISOString() : nowIso()) : null,
    confirmedBy: status === "confirmed" ? currentUser.id : null,
    receiptFileName: receiptFile?.name || existing?.receiptFileName || "",
    receiptAttachmentId,
    recordSource: "manual",
    recordMode: contract ? "linked" : "external",
  };
  if (existing) Object.assign(existing, payment);
  else state.payments.unshift(payment);
  const opp = contract && byId(state.opportunities, contract.opportunityId);
  opp?.timeline.unshift(event(
    existing ? "external_payment_updated" : (status === "confirmed" ? "external_payment_confirmed" : "external_payment_registered"),
    `${existing ? "Pagamento externo atualizado" : status === "confirmed" ? "Pagamento externo confirmado" : "Pagamento externo registrado"}: ${brl(payment.amountCents)}`,
    currentUser.id,
    { paymentId: payment.id, contractId: contract?.id || null }
  ));
  addAudit(existing ? "customer_payment_updated" : "customer_payment_registered", "CustomerPayment", payment.id, { contractId: contract?.id || null, status: payment.status, recordOnly: true, recordMode: payment.recordMode });
  if (opp?.sdrId) {
    addNotification(`${existing ? "O registro do pagamento" : "Um pagamento"} de ${brl(payment.amountCents)} para ${opp.clientName} foi ${existing ? "atualizado" : "registrado"}.`, {
      recipientUserId: opp.sdrId,
      title: existing ? "Pagamento atualizado" : "Novo pagamento registrado",
      kind: "payment",
      entityType: "payment",
      entityId: payment.id,
    });
  }
  await saveState();
  toast(existing
    ? "Registro de pagamento atualizado."
    : contract
      ? "Pagamento registrado e vinculado ao contrato."
      : "Pagamento manual salvo sem vÃ­nculo com o CRM.");
  drawer = null;
  currentRoute = "payments";
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
  if (opp?.sdrId) {
    addNotification(`O pagamento de ${brl(payment.amountCents)} para ${opp.clientName} foi confirmado.`, {
      recipientUserId: opp.sdrId,
      title: "Pagamento confirmado",
      kind: "payment",
      entityType: "payment",
      entityId: payment.id,
    });
  }
  saveState();
  toast("Registro de pagamento externo confirmado.");
  render();
}

function createCommissionFromPayment(form) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode registrar comissÃµes.");
  const payment = byId(state.payments, form.get("paymentId"));
  const contract = payment && byId(state.contracts, payment.contractId);
  const opp = contract && (byId(state.opportunities, contract.opportunityId) || { clientName: contractClientName(contract), timeline: null });
  if (!payment || !contract) return toast("Pagamento ou contrato nao encontrado.");
  if (payment.status !== "confirmed") return toast("A comissÃ£o so pode ser gerada para pagamentos confirmados.");
  if (commissionForPayment(payment.id)) return toast("Este pagamento ja gerou uma comissÃ£o.");
  const sdrId = form.get("sdrId") || contractSdrId(contract);
  const rateBps = Number(form.get("rateBps"));
  if (!sdrId || ![500, 1000].includes(rateBps)) return toast("Informe a SDR e selecione 5% ou 10%.");
  const baseCents = cents(form.get("baseAmount"));
  const amountCents = cents(form.get("amount"));
  if (!baseCents || !amountCents) return toast("Informe a base e o valor da comissÃ£o.");
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
  if (opp?.timeline) opp.timeline.unshift(event("commission_created_from_payment", `Comissao registrada pelo gestor: ${brl(amountCents)} sobre base de ${brl(baseCents)}`, currentUser.id, { paymentId: payment.id, commissionId: commission.id, sdrId }));
  addAudit("commission_created_from_payment", "CommissionEntry", commission.id, { paymentId: payment.id, contractId: contract.id, sdrId });
  addNotification(`Uma comissÃ£o de ${brl(amountCents)} foi registrada para vocÃª no contrato de ${opp.clientName}.`, {
    recipientUserId: sdrId,
    title: "Nova comissÃ£o disponÃ­vel",
    kind: "commission",
    entityType: "commission",
    entityId: commission.id,
  });
  maybeCreateBatch(sdrId);
  saveState();
  toast(`ComissÃ£o registrada para ${getActorName(sdrId)}: ${brl(amountCents)}.`);
  render();
}

function updateCommission(id, row) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode editar comissÃµes.");
  const commission = byId(state.commissions, id);
  if (!commission || !row) return toast("ComissÃ£o nÃ£o encontrada.");
  const sdrId = row.querySelector("[data-commission-edit-sdr]")?.value;
  const rateBps = Number(row.querySelector("[data-commission-edit-rate]")?.value || 0);
  const baseCents = cents(row.querySelector("[data-commission-edit-base]")?.value);
  const amountCents = cents(row.querySelector("[data-commission-edit-amount]")?.value);
  const status = row.querySelector("[data-commission-edit-status]")?.value || commission.status;
  if (!sdrId || ![500, 1000].includes(rateBps) || !baseCents || !amountCents) {
    return toast("Revise SDR, taxa, base e valor da comissÃ£o.");
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
  addNotification(`Sua comissÃ£o foi atualizada para ${brl(amountCents)} e estÃ¡ com status ${statusLabels[status] || status}.`, {
    recipientUserId: sdrId,
    title: "ComissÃ£o atualizada",
    kind: "commission",
    entityType: "commission",
    entityId: commission.id,
  });
  saveState();
  toast("ComissÃ£o atualizada pelo gestor.");
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

async function createManualProject(form) {
  if (currentUser.role !== "admin_manager") return toast("Apenas o gestor pode criar projetos manualmente.");
  const serviceIds = normalizeServiceIds(form.getAll("serviceIds"));
  if (!serviceIds.length) return toast("Selecione pelo menos um servico para o projeto.");
  const clientName = String(form.get("clientName") || "").trim();
  const projectName = String(form.get("projectName") || "").trim();
  if (!clientName || !projectName) return toast("Informe cliente e nome do projeto.");
  const opportunityId = uid("opp");
  const projectId = uid("prj");
  const responsibleId = form.get("sdrId") || MANAGEMENT_OWNER_ID;
  const stageNames = form.get("template") === "simple"
    ? ["Briefing", "Planejamento", "ProduÃ§Ã£o", "RevisÃ£o", "Entrega"]
    : workflowTemplate;
  const opportunity = {
    id: opportunityId,
    organizationId: "org-mada",
    sdrId: responsibleId,
    clientName,
    brandName: String(form.get("brandName") || "").trim() || clientName,
    serviceId: serviceIds[0],
    serviceIds,
    crmStatus: "sale_completed",
    status: "commercial_condition_approved",
    suggestedAmountCents: 0,
    requestedConditions: "50_50",
    suggestedPaymentTerms: "50_50",
    nextAction: "",
    nextActionDate: "",
    manualProjectOnly: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    timeline: [event("manual_project_source_created", "Registro auxiliar criado para projeto manual", currentUser.id)],
  };
  const project = {
    id: projectId,
    organizationId: "org-mada",
    opportunityId,
    contractId: null,
    sdrId: responsibleId === MANAGEMENT_OWNER_ID ? null : responsibleId,
    managerId: currentUser.id,
    serviceId: serviceIds[0],
    name: projectName,
    status: form.get("status") || "planning",
    startsAt: form.get("startsAt") ? new Date(`${form.get("startsAt")}T12:00:00`).toISOString() : null,
    targetEndAt: form.get("targetEndAt") || "",
    manualEntry: true,
    stages: stageNames.map((name, index) => ({
      id: uid("stg"),
      sequenceNumber: index + 1,
      name,
      status: index === 0 ? "ready" : "locked",
      responsibleManagerId: currentUser.id,
      dueAt: form.get("targetEndAt") || addDays((index + 1) * 7),
      events: [],
    })),
    events: [event("manual_project_created", "Projeto criado manualmente pelo gestor", currentUser.id)],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  project.currentStageId = project.stages[0]?.id || null;
  state.opportunities.unshift(opportunity);
  state.projects.unshift(project);
  addAudit("manual_project_created", "Project", projectId, { opportunityId, serviceIds, responsibleId });
  notifyOpportunityTeam(opportunity, `O projeto ${project.name} foi criado e atribuÃ­do a vocÃª.`, {
    title: "Novo projeto",
    kind: "project",
  });
  await saveState();
  toast("Projeto criado e salvo.");
  drawer = { type: "project", id: projectId };
  render();
}

function updateProjectStatus(projectId, status) {
  const project = byId(state.projects, projectId);
  if (!project || project.status === status) return;
  const previousStatus = project.status;
  project.status = status;
  project.events.unshift(event("project_status_changed", `Status do projeto alterado de ${statusLabels[previousStatus] || previousStatus} para ${statusLabels[status] || status}`, currentUser.id));
  addAudit("project_status_changed", "Project", project.id, { previousStatus, status });
  const opportunity = byId(state.opportunities, project.opportunityId);
  notifyOpportunityTeam(opportunity, `O projeto ${project.name} passou para ${statusLabels[status] || status}.`, {
    title: "Projeto atualizado",
    kind: "project",
  });
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
      const refreshedProject = byId(state.projects, projectId);
      const refreshedOpportunity = byId(state.opportunities, refreshedProject?.opportunityId);
      notifyOpportunityTeam(refreshedOpportunity, `A etapa ${stage.name} do projeto ${project.name} passou para ${statusLabels[status] || status}.`, {
        title: "Etapa do projeto atualizada",
        kind: "project",
      });
      await saveState();
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
  const opportunity = byId(state.opportunities, project.opportunityId);
  notifyOpportunityTeam(opportunity, `A etapa ${stage.name} do projeto ${project.name} passou para ${statusLabels[status] || status}.`, {
    title: "Etapa do projeto atualizada",
    kind: "project",
  });
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
  toast("Venda validada: projeto atualizado. Gere a comissÃ£o pelos pagamentos confirmados.");
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
    return toast("NÃ£o foi possÃ­vel enviar o comprovante. Tente novamente.");
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
  addNotification(`O ciclo de comissÃ£o no valor de ${brl(batch.totalAmountCents)} foi pago. O comprovante jÃ¡ estÃ¡ disponÃ­vel em Arquivos.`, {
    recipientUserId: batch.sdrId,
    title: "ComissÃ£o paga",
    kind: "commission",
    entityType: "payout_batch",
    entityId: batch.id,
  });
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
    events: [event("project_created_from_approval", "Projeto criado automaticamente apos aprovaÃ§Ã£o da condiÃ§Ã£o comercial e abertura de contrato", currentUser.id)],
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
    opportunities: () => [["cliente", "empresa_perfil", "instagram", "site", "whatsapp", "email", "segmento", "cidade", "origem", "sdr", "status_crm", "status_condiÃ§Ã£o", "o_que_vende", "publico", "sinal_operacao", "momento_atual", "problema_observado", "necessidade_relatada", "serviÃ§os", "prazo", "faixa_investimento", "contratacao_anterior", "urgencia", "valor_proposto", "desconto_percentual", "desconto_valor", "valor_liquido", "objecoes", "condiÃ§Ãµes_solicitadas", "motivo_perda", "prÃ³xima_acao", "data_prÃ³xima_acao", "observacoes"], ...visibleOpportunities().map((item) => {
      const discountPercent = discountPercentForOpportunity(item);
      return [item.clientName, item.brandName, item.instagram || "-", item.website || "-", item.phone || "-", item.email || "-", item.segment || "-", item.city || "-", item.origin || "-", getActorName(item.sdrId), crmStatusLabels[item.crmStatus] || item.crmStatus || "-", item.status, item.businessOffer || "-", item.targetAudience || "-", item.operationSignal || "-", item.currentMoment || "-", item.observedProblem || "-", item.reportedNeed || item.clientNeed || "-", serviceNamesForOpportunity(item), item.expectedDeadline || "-", item.investmentRange || "-", item.previousHiring || "-", item.urgency || "-", item.suggestedAmountCents, discountPercent, item.suggestedDiscountCents, netAmountAfterDiscount(item.suggestedAmountCents, discountPercent), item.objections || "-", paymentPlanLabel(normalizePaymentPlan(item.requestedConditions || item.suggestedPaymentTerms)), item.lossReason || "-", item.nextAction || "-", item.nextActionDate || "-", item.notes || "-"];
    })],
    payments: () => [["contrato", "cliente", "valor", "metodo", "referÃªncia", "comprovante", "status", "data", "observacao"], ...visiblePayments().map((item) => {
      const contract = byId(state.contracts, item.contractId);
      const opp = contract && byId(state.opportunities, contract.opportunityId);
      return [contract?.contractNumber || "Sem vÃ­nculo", item.externalClientName || opp?.clientName || "Registro externo", item.amountCents, item.method || "-", item.reference || "-", item.receiptFileName || "-", item.status, dateLabel(item.paidAt || item.dueDate || item.createdAt), item.notes || "-"];
    })],
    commissions: () => [["sdr", "contrato", "pagamento_id", "pagamento_valor", "base", "taxa_bps", "comissÃ£o", "status", "validada_em"], ...commissionRows.map((item) => {
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
  const safeCsvCell = (cell) => {
    let value = String(cell ?? "");
    if (/^[\t\r\n ]*[=+\-@]/.test(value)) value = `'${value}`;
    return `"${value.replaceAll('"', '""')}"`;
  };
  const csv = rows.map((row) => row.map(safeCsvCell).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}-mada.csv`;
  link.click();
  URL.revokeObjectURL(url);
  addAudit("csv_exported", type, type, {});
  saveState();
}

function showToast(message) {
  clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  toastTimer = setTimeout(() => node.remove(), 3200);
}

function toast(message) {
  if (supabaseSyncStatus === "Salvando alteraÃ§Ãµes" && supabaseSyncQueued) {
    pendingSuccessToast = String(message || "AlteraÃ§Ãµes salvas.");
    return;
  }
  showToast(message);
}

void bootstrapApp();
