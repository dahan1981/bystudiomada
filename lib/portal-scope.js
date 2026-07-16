function publicUser(user) {
  if (!user) return null;
  return { ...user };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function arrays(state) {
  return {
    users: state.users || [],
    services: state.services || [],
    opportunities: state.opportunities || [],
    approvalRequests: state.approvalRequests || [],
    conditions: state.conditions || [],
    contracts: state.contracts || [],
    payments: state.payments || [],
    commissions: state.commissions || [],
    payoutBatches: state.payoutBatches || [],
    projects: state.projects || [],
    files: state.files || [],
    notifications: state.notifications || [],
    auditLogs: state.auditLogs || [],
  };
}

function visibleStateForUser(source, user) {
  const data = arrays(clone(source));
  if (user.role === "admin_manager") {
    return { ...data, users: data.users.map(publicUser) };
  }

  const opportunities = data.opportunities.filter((item) => item.sdrId === user.id);
  const opportunityIds = new Set(opportunities.map((item) => item.id));
  const contracts = data.contracts.filter((item) => opportunityIds.has(item.opportunityId));
  const contractIds = new Set(contracts.map((item) => item.id));
  const projects = data.projects.filter((item) => opportunityIds.has(item.opportunityId) || contractIds.has(item.contractId));
  const projectIds = new Set(projects.map((item) => item.id));
  const conditions = data.conditions.filter((item) => opportunityIds.has(item.opportunityId));
  const conditionIds = new Set(conditions.map((item) => item.id));

  return {
    ...data,
    users: data.users.filter((item) => item.id === user.id || item.role === "admin_manager").map(publicUser),
    opportunities,
    approvalRequests: data.approvalRequests.filter((item) => opportunityIds.has(item.opportunityId)),
    conditions,
    contracts,
    payments: data.payments.filter((item) => contractIds.has(item.contractId)),
    commissions: data.commissions.filter((item) => item.sdrId === user.id),
    payoutBatches: data.payoutBatches.filter((item) => item.sdrId === user.id),
    projects,
    files: data.files.filter((item) => item.delegatedSdrId === user.id || opportunityIds.has(item.opportunityId) || contractIds.has(item.contractId)),
    notifications: data.notifications.filter((item) => item.recipientUserId === user.id || item.createdBy === user.id),
    auditLogs: data.auditLogs.filter((item) => item.actorUserId === user.id || opportunityIds.has(item.entityId) || contractIds.has(item.entityId) || projectIds.has(item.entityId) || conditionIds.has(item.entityId)),
  };
}

function mergeOwnedCollection(currentItems, incomingItems, isOwned) {
  return [
    ...(currentItems || []).filter((item) => !isOwned(item)),
    ...(incomingItems || []).filter(isOwned),
  ];
}

function applyMutationSet(source, incomingSource, mutations) {
  if (!mutations || typeof mutations !== "object") return clone(incomingSource);
  const current = arrays(clone(source));
  const incoming = arrays(clone(incomingSource));
  const result = { ...current };
  for (const [collection, ids] of Object.entries(mutations)) {
    if (!Object.prototype.hasOwnProperty.call(current, collection) || !Array.isArray(ids)) continue;
    const allowedIds = new Set(ids.map(String));
    const incomingById = new Map(incoming[collection].map((item) => [String(item.id), item]));
    result[collection] = current[collection].map((item) => (
      allowedIds.has(String(item.id)) && incomingById.has(String(item.id))
        ? incomingById.get(String(item.id))
        : item
    ));
    const existingIds = new Set(current[collection].map((item) => String(item.id)));
    for (const id of allowedIds) {
      if (!existingIds.has(id) && incomingById.has(id)) result[collection].push(incomingById.get(id));
    }
  }
  return result;
}

const sdrOpportunityTransitions = {
  draft: new Set(["draft", "pending_approval", "cancelled"]),
  pending_approval: new Set(["pending_approval"]),
  needs_information: new Set(["needs_information", "pending_approval", "cancelled"]),
  rejected: new Set(["rejected"]),
  commercial_condition_approved: new Set(["commercial_condition_approved", "awaiting_client_response"]),
  presented_to_client: new Set(["presented_to_client", "awaiting_client_response", "client_accepted", "client_declined", "pending_approval"]),
  awaiting_client_response: new Set(["awaiting_client_response", "client_accepted", "client_declined", "pending_approval"]),
  client_requested_revision: new Set(["client_requested_revision", "pending_approval"]),
  client_accepted: new Set(["client_accepted"]),
  client_declined: new Set(["client_declined", "cancelled"]),
  cancelled: new Set(["cancelled"]),
};

function sanitizeSdrOpportunities(currentItems, incomingItems, userId) {
  const currentById = new Map((currentItems || []).map((item) => [item.id, item]));
  return (incomingItems || []).filter((item) => item.sdrId === userId || currentById.get(item.id)?.sdrId === userId).map((item) => {
    const current = currentById.get(item.id);
    if (!current) {
      return {
        ...item,
        sdrId: userId,
        status: ["draft", "pending_approval"].includes(item.status) ? item.status : "draft",
      };
    }
    if (current.status === "rejected" || current.terminalRejection) return current;
    const allowed = sdrOpportunityTransitions[current.status] || new Set([current.status]);
    return {
      ...item,
      sdrId: userId,
      status: allowed.has(item.status) ? item.status : current.status,
    };
  });
}

function mergeSdrOpportunities(currentItems, incomingItems, userId) {
  const incomingById = new Map((incomingItems || []).map((item) => [item.id, item]));
  const merged = (currentItems || []).map((current) => {
    if (current.sdrId !== userId) return current;
    return incomingById.get(current.id) || current;
  });
  const currentIds = new Set((currentItems || []).map((item) => item.id));
  (incomingItems || []).forEach((incoming) => {
    if (!currentIds.has(incoming.id)) merged.push(incoming);
  });
  return merged;
}

function mergeContractChanges(currentItems, incomingItems, ownedOpportunityIds) {
  const incomingById = new Map((incomingItems || []).map((item) => [item.id, item]));
  const allowedFields = ["proposalSentAt", "sentAt", "proposalAcceptedAt", "updatedAt"];
  const transitions = {
    proposal_ready: new Set(["proposal_ready", "proposal_sent"]),
    proposal_sent: new Set(["proposal_sent", "proposal_accepted", "contract_ready"]),
    proposal_accepted: new Set(["proposal_accepted", "contract_ready", "sent"]),
    contract_ready: new Set(["contract_ready", "sent"]),
    sent: new Set(["sent"]),
  };
  return (currentItems || []).map((current) => {
    if (!ownedOpportunityIds.has(current.opportunityId)) return current;
    const incoming = incomingById.get(current.id);
    if (!incoming) return current;
    const next = { ...current };
    const allowedStatuses = transitions[current.status] || new Set([current.status]);
    next.status = allowedStatuses.has(incoming.status) ? incoming.status : current.status;
    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(incoming, field)) next[field] = incoming[field];
    });
    return next;
  });
}

function mergeProjectChanges(currentItems, incomingItems, ownedOpportunityIds) {
  const incomingById = new Map((incomingItems || []).map((item) => [item.id, item]));
  const projectStatuses = new Set(["planning", "active", "on_hold", "completed", "cancelled"]);
  const stageStatuses = new Set(["locked", "ready", "in_progress", "review", "approved", "completed", "skipped", "cancelled"]);
  return (currentItems || []).map((current) => {
    if (!ownedOpportunityIds.has(current.opportunityId)) return current;
    const incoming = incomingById.get(current.id);
    if (!incoming) return current;
    const incomingStages = new Map((incoming.stages || []).map((stage) => [stage.id, stage]));
    return {
      ...current,
      status: projectStatuses.has(incoming.status) ? incoming.status : current.status,
      currentStageId: (current.stages || []).some((stage) => stage.id === incoming.currentStageId) ? incoming.currentStageId : current.currentStageId,
      events: incoming.events || current.events,
      stages: (current.stages || []).map((stage) => {
        const changed = incomingStages.get(stage.id);
        if (!changed) return stage;
        return {
          ...stage,
          status: stageStatuses.has(changed.status) ? changed.status : stage.status,
          startsAt: changed.startsAt || stage.startsAt,
          completedAt: changed.completedAt || stage.completedAt,
          events: changed.events || stage.events,
        };
      }),
    };
  });
}

function appendOwnedEvents(currentItems, incomingItems, userId, actorField) {
  const existingIds = new Set((currentItems || []).map((item) => item.id));
  const additions = (incomingItems || []).filter((item) => !existingIds.has(item.id) && item[actorField] === userId);
  return [...additions, ...(currentItems || [])];
}

function mergeStateForUser(source, incomingSource, user) {
  const current = arrays(clone(source));
  const incoming = arrays(clone(incomingSource));

  if (user.role === "admin_manager") {
    return {
      ...incoming,
      users: incoming.users,
    };
  }

  const ownedOpportunity = (item) => item.sdrId === user.id;
  const incomingOwnedOpportunities = sanitizeSdrOpportunities(current.opportunities, incoming.opportunities, user.id);
  const ownedOpportunityIds = new Set([
    ...current.opportunities.filter(ownedOpportunity).map((item) => item.id),
    ...incomingOwnedOpportunities.map((item) => item.id),
  ]);
  return {
    ...current,
    opportunities: mergeSdrOpportunities(current.opportunities, incomingOwnedOpportunities, user.id),
    contracts: mergeContractChanges(current.contracts, incoming.contracts, ownedOpportunityIds),
    projects: mergeProjectChanges(current.projects, incoming.projects, ownedOpportunityIds),
    notifications: appendOwnedEvents(current.notifications, incoming.notifications.filter((item) => item.recipientRole === "admin_manager"), user.id, "createdBy"),
    auditLogs: appendOwnedEvents(current.auditLogs, incoming.auditLogs, user.id, "actorUserId"),
  };
}

function canAccessAttachment(metadata, state, user) {
  if (user.role === "admin_manager") return true;
  const data = metadata || {};
  if (data.sdrId === user.id || data.delegatedSdrId === user.id) return true;
  const opportunityId = data.opportunityId || (state.contracts || []).find((item) => item.id === data.contractId)?.opportunityId;
  return Boolean(opportunityId && (state.opportunities || []).some((item) => item.id === opportunityId && item.sdrId === user.id));
}

module.exports = {
  applyMutationSet,
  canAccessAttachment,
  mergeStateForUser,
  visibleStateForUser,
};
