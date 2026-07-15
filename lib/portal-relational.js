const crypto = require("crypto");
const { mergeStateForUser } = require("./portal-scope");

const serviceIdBySlug = {
  "consultoria-estrategica": "srv-consultoria-estrategica",
  "planejamento-conteudo": "srv-planejamento-conteudo",
  "gestao-rede": "srv-gestao-rede",
  "estruturacao-perfil": "srv-estrutura-perfil",
  "landing-page": "srv-landing-page",
  sites: "srv-site-institucional",
  ecommerce: "srv-ecommerce",
  "identidade-visual": "srv-identidade",
  posts: "srv-pack-posts",
  "design-grafico": "srv-design-grafico",
  "roteirizacao-video": "srv-roteirizacao-videos",
  "edicao-video": "srv-edicao-videos",
  "captacao-conteudo": "srv-captacao-conteudo",
  storymake: "srv-storymake",
  branding: "srv-branding",
  "planejamento-evento": "srv-planejamento-evento",
};

const serviceSlugById = Object.fromEntries(Object.entries(serviceIdBySlug).map(([slug, id]) => [id, slug]));
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function uuid(value) {
  return uuidPattern.test(String(value || "")) ? String(value) : crypto.randomUUID();
}

function iso(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function dateOnly(value) {
  return value ? String(value).slice(0, 10) : null;
}

function stripVersion(value) {
  if (!value) return value;
  const copy = structuredClone(value);
  delete copy._version;
  return copy;
}

function changed(before, after) {
  return JSON.stringify(stripVersion(before)) !== JSON.stringify(stripVersion(after));
}

function byId(items) {
  return new Map((items || []).map((item) => [item.id, item]));
}

async function queryAll(client, text, values = []) {
  return (await client.query(text, values)).rows;
}

async function readRelationalState(client, session) {
  const organizationId = session.user.organizationId;
  const isManager = session.user.role === "admin_manager";
  const [members, serviceRows, opportunityRows] = await Promise.all([
    queryAll(client, `
      select profile.user_id, profile.display_name, profile.email, profile.active, membership.role
      from public.organization_members membership
      join public.profiles profile on profile.user_id = membership.user_id
      where membership.organization_id = $1 and membership.active
      order by profile.display_name
    `, [organizationId]),
    queryAll(client, "select * from public.services where organization_id = $1 and active order by sort_order, name", [organizationId]),
    queryAll(client, `
      select * from public.opportunities
      where organization_id = $1 and ($2::boolean or sdr_user_id = $3)
      order by created_at desc
    `, [organizationId, isManager, session.user.id]),
  ]);
  const opportunityIds = opportunityRows.map((row) => row.id);
  const serviceLinkRows = opportunityIds.length
    ? await queryAll(client, `
        select link.opportunity_id, service.slug
        from public.opportunity_services link
        join public.services service on service.id = link.service_id
        where link.opportunity_id = any($1::uuid[])
      `, [opportunityIds])
    : [];
  const serviceIdsByOpportunity = serviceLinkRows.reduce((map, row) => {
    if (!map.has(row.opportunity_id)) map.set(row.opportunity_id, []);
    const serviceId = serviceIdBySlug[row.slug];
    if (serviceId) map.get(row.opportunity_id).push(serviceId);
    return map;
  }, new Map());

  const opportunities = opportunityRows.map((row) => {
    const serviceIds = serviceIdsByOpportunity.get(row.id) || [];
    return {
      ...(row.payload || {}),
      id: row.id,
      organizationId: row.organization_id,
      sdrId: row.sdr_user_id || row.legacy_sdr_id || "management",
      clientName: row.client_name,
      brandName: row.brand_name,
      crmStatus: row.crm_status,
      status: row.approval_status,
      suggestedAmountCents: Number(row.suggested_amount_cents || 0),
      approvedAmountCents: row.approved_amount_cents == null ? null : Number(row.approved_amount_cents),
      requestedConditions: row.payment_plan,
      suggestedPaymentTerms: row.payment_plan,
      nextAction: row.next_action || "",
      nextActionDate: dateOnly(row.next_action_date) || "",
      serviceIds,
      serviceId: serviceIds[0] || "",
      createdAt: iso(row.created_at),
      updatedAt: iso(row.updated_at),
      _version: row.version,
    };
  });

  const [approvalRows, conditionRows, contractRows, paymentRows, commissionRows, batchRows, batchItemRows, projectRows, stageRows, fileRows, notificationRows, auditRows] = await Promise.all([
    queryAll(client, "select * from public.approval_requests where organization_id = $1 order by created_at desc", [organizationId]),
    queryAll(client, "select * from public.condition_versions where organization_id = $1 order by approved_at desc", [organizationId]),
    queryAll(client, "select * from public.contracts where organization_id = $1 order by created_at desc", [organizationId]),
    queryAll(client, "select * from public.customer_payments where organization_id = $1 order by created_at desc", [organizationId]),
    queryAll(client, `select * from public.commissions where organization_id = $1 and ($2::boolean or sdr_user_id = $3) order by created_at desc`, [organizationId, isManager, session.user.id]),
    queryAll(client, `select * from public.payout_batches where organization_id = $1 and ($2::boolean or sdr_user_id = $3) order by created_at desc`, [organizationId, isManager, session.user.id]),
    queryAll(client, `select item.* from public.payout_batch_items item join public.payout_batches batch on batch.id = item.batch_id where batch.organization_id = $1`, [organizationId]),
    queryAll(client, "select * from public.projects where organization_id = $1 order by created_at desc", [organizationId]),
    queryAll(client, "select * from public.project_stages where organization_id = $1 order by project_id, sequence_number", [organizationId]),
    queryAll(client, "select * from public.files where organization_id = $1 order by created_at desc", [organizationId]),
    queryAll(client, `select * from public.notifications where organization_id = $1 and ($2::boolean or recipient_user_id = $3 or recipient_role = $4::portal_member_role) order by created_at desc`, [organizationId, isManager, session.user.id, session.user.role]),
    isManager ? queryAll(client, "select * from public.audit_logs where organization_id = $1 order by created_at desc limit 1000", [organizationId]) : [],
  ]);

  const accessibleOpportunityIds = new Set(opportunities.map((item) => item.id));
  const contracts = contractRows.filter((row) => isManager || accessibleOpportunityIds.has(row.opportunity_id)).map((row) => ({
    ...(row.payload || {}), id: row.id, organizationId: row.organization_id, opportunityId: row.opportunity_id,
    conditionVersionId: row.condition_version_id, contractNumber: row.contract_number, status: row.status,
    amountCents: Number(row.amount_cents || 0), proposalAmountCents: Number(row.amount_cents || 0), paymentPlan: row.payment_plan,
    paymentTerms: row.payment_terms || "", proposalAttachmentId: row.proposal_storage_path || "", contractLink: row.contract_link || "",
    signedAt: iso(row.signed_at), saleValidatedAt: iso(row.sale_validated_at), createdAt: iso(row.created_at), updatedAt: iso(row.updated_at), _version: row.version,
  }));
  const accessibleContractIds = new Set(contracts.map((item) => item.id));

  const projects = projectRows.filter((row) => isManager || accessibleOpportunityIds.has(row.opportunity_id)).map((row) => ({
    ...(row.payload || {}), id: row.id, organizationId: row.organization_id, opportunityId: row.opportunity_id,
    contractId: row.contract_id, sdrId: row.sdr_user_id, managerId: row.manager_user_id, name: row.name,
    status: row.status, startsAt: iso(row.starts_at), targetEndAt: dateOnly(row.target_end_at), currentStageId: row.current_stage_id,
    createdAt: iso(row.created_at), updatedAt: iso(row.updated_at), _version: row.version,
    stages: stageRows.filter((stage) => stage.project_id === row.id).map((stage) => ({
      ...(stage.payload || {}), id: stage.id, sequenceNumber: stage.sequence_number, name: stage.name, status: stage.status,
      responsibleManagerId: stage.responsible_user_id, dueAt: dateOnly(stage.due_at), startsAt: iso(stage.started_at), completedAt: iso(stage.completed_at),
      createdAt: iso(stage.created_at), updatedAt: iso(stage.updated_at), _version: stage.version,
    })),
  }));

  const commissionIdsByBatch = batchItemRows.reduce((map, row) => {
    if (!map.has(row.batch_id)) map.set(row.batch_id, []);
    map.get(row.batch_id).push(row.commission_id);
    return map;
  }, new Map());

  return {
    users: members.map((row) => ({ id: row.user_id, name: row.display_name, email: row.email, role: row.role, active: row.active, hasAccess: true })),
    services: serviceRows.map((row) => ({ id: serviceIdBySlug[row.slug] || row.id, name: row.name, workflow: row.workflow_name || row.name, active: row.active })),
    opportunities,
    approvalRequests: approvalRows.filter((row) => isManager || accessibleOpportunityIds.has(row.opportunity_id)).map((row) => ({
      id: row.id, organizationId: row.organization_id, opportunityId: row.opportunity_id, requestedBy: row.requested_by,
      reviewedBy: row.reviewed_by, status: row.status, reason: row.reason || "", requestedAt: iso(row.requested_at), reviewedAt: iso(row.reviewed_at),
    })),
    conditions: conditionRows.filter((row) => isManager || accessibleOpportunityIds.has(row.opportunity_id)).map((row) => ({
      ...(row.payload || {}), id: row.id, organizationId: row.organization_id, opportunityId: row.opportunity_id,
      versionNumber: row.version_number, amountCents: Number(row.amount_cents || 0), discountPercent: Number(row.discount_percent || 0),
      paymentTerms: row.payment_plan, scope: row.scope || "", reason: row.reason || "", isActive: row.is_active,
      approvedBy: row.approved_by, approvedAt: iso(row.approved_at),
    })),
    contracts,
    payments: paymentRows.filter((row) => isManager || accessibleContractIds.has(row.contract_id)).map((row) => ({
      ...(row.payload || {}), id: row.id, organizationId: row.organization_id, contractId: row.contract_id,
      amountCents: Number(row.amount_cents || 0), type: row.payment_type, method: row.method || "", reference: row.reference || "",
      notes: row.notes || "", status: row.status, dueDate: dateOnly(row.due_date), paidAt: iso(row.paid_at), confirmedBy: row.confirmed_by,
      receiptAttachmentId: row.receipt_storage_path || "", createdAt: iso(row.created_at), updatedAt: iso(row.updated_at), _version: row.version,
    })),
    commissions: commissionRows.filter((row) => isManager || accessibleContractIds.has(row.contract_id)).map((row) => ({
      ...(row.payload || {}), id: row.id, organizationId: row.organization_id, contractId: row.contract_id, paymentId: row.payment_id,
      sdrId: row.sdr_user_id, rateBps: row.rate_bps, baseCents: Number(row.base_cents), amountCents: Number(row.amount_cents),
      status: row.status, notes: row.notes || "", createdAt: iso(row.created_at), updatedAt: iso(row.updated_at), _version: row.version,
    })),
    payoutBatches: batchRows.map((row) => ({
      id: row.id, organizationId: row.organization_id, sdrId: row.sdr_user_id, sequenceNumber: row.sequence_number,
      commissionIds: commissionIdsByBatch.get(row.id) || [], totalAmountCents: Number(row.total_amount_cents || 0), status: row.status,
      receiptAttachmentId: row.receipt_storage_path || "", paidAt: iso(row.paid_at), paidBy: row.paid_by,
      createdAt: iso(row.created_at), updatedAt: iso(row.updated_at), _version: 1,
    })),
    projects,
    files: fileRows.filter((row) => isManager || row.delegated_sdr_id === session.user.id || accessibleOpportunityIds.has(row.opportunity_id) || accessibleContractIds.has(row.contract_id)).map((row) => ({
      id: row.id, organizationId: row.organization_id, category: row.category, name: row.display_name, attachmentId: row.id,
      storagePath: row.storage_path, mimeType: row.mime_type, sizeBytes: Number(row.size_bytes), opportunityId: row.opportunity_id,
      contractId: row.contract_id, paymentId: row.payment_id, payoutBatchId: row.payout_batch_id, delegatedSdrId: row.delegated_sdr_id,
      notes: row.notes || "", createdAt: iso(row.created_at),
    })),
    notifications: notificationRows.map((row) => ({
      id: row.id, organizationId: row.organization_id, recipientUserId: row.recipient_user_id, recipientRole: row.recipient_role,
      createdBy: row.created_by, kind: row.kind, title: row.title, text: row.message, entityType: row.entity_type, entityId: row.entity_id,
      read: Boolean(row.read_at), readAt: iso(row.read_at), createdAt: iso(row.created_at),
    })),
    auditLogs: auditRows.map((row) => ({
      id: row.id, organizationId: row.organization_id, actorUserId: row.actor_user_id, actorId: row.actor_user_id,
      action: row.action, entityType: row.entity_type, entityId: row.entity_id, metadata: row.metadata || {}, createdAt: iso(row.created_at),
    })),
    workspaces: session.user.memberships,
    activeWorkspace: {
      organizationId: session.user.organizationId,
      organizationName: session.user.organizationName,
      workspaceKind: session.user.workspaceKind,
    },
  };
}

function ensureVersion(result, entity) {
  if (!result.rowCount) {
    const error = new Error(`Conflito de edição em ${entity}. Recarregue os dados.`);
    error.statusCode = 409;
    throw error;
  }
}

async function syncOpportunities(client, before, after, session) {
  const beforeById = byId(before);
  const services = await queryAll(client, "select id, slug from public.services where organization_id = $1", [session.user.organizationId]);
  const serviceBySlug = new Map(services.map((row) => [row.slug, row.id]));
  for (const incoming of after || []) {
    const previous = beforeById.get(incoming.id);
    if (previous && !changed(previous, incoming)) continue;
    const id = uuid(incoming.id);
    const isManager = session.user.role === "admin_manager";
    const sdrId = uuidPattern.test(String(incoming.sdrId || "")) ? incoming.sdrId : (isManager ? null : session.user.id);
    if (!isManager && sdrId !== session.user.id) throw Object.assign(new Error("A SDR só pode salvar oportunidades próprias."), { statusCode: 403 });
    const values = [
      id, session.user.organizationId, sdrId, sdrId ? null : incoming.sdrId || "management",
      incoming.clientName || "Cliente sem nome", incoming.brandName || incoming.clientName || "Marca sem nome",
      incoming.crmStatus || "lead_mapped", incoming.status || "draft", Number(incoming.suggestedAmountCents || 0),
      incoming.approvedAmountCents == null ? null : Number(incoming.approvedAmountCents),
      String(incoming.requestedConditions || incoming.suggestedPaymentTerms || "").includes("100") ? "100" : "50_50",
      incoming.nextAction || null, incoming.nextActionDate || null, JSON.stringify({ ...incoming, id }), session.user.id,
    ];
    if (!previous) {
      await client.query(`
        insert into public.opportunities (
          id, organization_id, sdr_user_id, legacy_sdr_id, client_name, brand_name, crm_status,
          approval_status, suggested_amount_cents, approved_amount_cents, payment_plan,
          next_action, next_action_date, payload, created_by, updated_by
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15,$15)
      `, values);
    } else {
      const result = await client.query(`
        update public.opportunities set
          sdr_user_id=$3, legacy_sdr_id=$4, client_name=$5, brand_name=$6, crm_status=$7,
          approval_status=$8, suggested_amount_cents=$9, approved_amount_cents=$10,
          payment_plan=$11, next_action=$12, next_action_date=$13, payload=$14::jsonb,
          updated_by=$15, version=version+1
        where id=$1 and organization_id=$2 and version=$16
      `, [...values, Number(incoming._version || 1)]);
      ensureVersion(result, "oportunidade");
    }
    await client.query("delete from public.opportunity_services where opportunity_id = $1", [id]);
    for (const serviceId of [...new Set(incoming.serviceIds || [incoming.serviceId].filter(Boolean))]) {
      const databaseServiceId = serviceBySlug.get(serviceSlugById[serviceId]);
      if (databaseServiceId) await client.query("insert into public.opportunity_services values ($1,$2,now()) on conflict do nothing", [id, databaseServiceId]);
    }
    if (incoming.status === "pending_approval" && previous?.status !== "pending_approval") {
      const request = await client.query(`
        insert into public.approval_requests (organization_id, opportunity_id, requested_by, status)
        select $1,$2,$3,'pending'
        where not exists (
          select 1 from public.approval_requests
          where organization_id = $1 and opportunity_id = $2 and status = 'pending'
        )
        returning id
      `, [session.user.organizationId, id, session.user.id]);
      if (!request.rowCount) continue;
      await client.query(`
        insert into public.notifications (organization_id, recipient_user_id, created_by, kind, title, message, entity_type, entity_id)
        select $1, membership.user_id, $2, 'approval', 'Nova aprovação',
          'Uma oportunidade foi enviada para aprovação.', 'opportunity', $3
        from public.organization_members membership
        where membership.organization_id = $1 and membership.role = 'admin_manager' and membership.active
      `, [session.user.organizationId, session.user.id, id]);
      await client.query(`
        insert into public.audit_logs (organization_id, actor_user_id, action, entity_type, entity_id, metadata)
        values ($1,$2,'opportunity_submitted','opportunity',$3,jsonb_build_object('request_id',$4::uuid))
      `, [session.user.organizationId, session.user.id, id, request.rows[0].id]);
    }
    if (previous?.status === "pending_approval" && incoming.status !== "pending_approval") {
      await client.query(`
        update public.approval_requests set status = $3, reviewed_by = $4, reviewed_at = now(), reason = $5
        where id = (
          select id from public.approval_requests where organization_id = $1 and opportunity_id = $2 and status = 'pending'
          order by requested_at desc limit 1
        )
      `, [session.user.organizationId, id, incoming.status, session.user.id, incoming.notes || null]);
    }
  }
}

async function resolveStoragePath(client, value) {
  if (!value) return null;
  if (!uuidPattern.test(String(value))) return String(value);
  const result = await client.query("select storage_path from public.files where id = $1", [value]);
  return result.rows[0]?.storage_path || null;
}

async function syncConditions(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (previous && !changed(previous, item)) continue;
    const id = uuid(item.id);
    await client.query(`
      insert into public.condition_versions (
        id, organization_id, opportunity_id, version_number, amount_cents, discount_percent,
        payment_plan, scope, reason, is_active, approved_by, approved_at, payload
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,coalesce($12,now()),$13::jsonb)
      on conflict (id) do update set
        amount_cents=excluded.amount_cents, discount_percent=excluded.discount_percent,
        payment_plan=excluded.payment_plan, scope=excluded.scope, reason=excluded.reason,
        is_active=excluded.is_active, payload=excluded.payload
    `, [
      id, session.user.organizationId, item.opportunityId, Number(item.versionNumber || 1), Number(item.amountCents || 0),
      Number(item.discountPercent || 0), String(item.paymentTerms || "").includes("100") ? "100" : "50_50",
      item.scope || "", item.reason || "", item.isActive !== false, session.user.id, iso(item.approvedAt), JSON.stringify({ ...item, id }),
    ]);
  }
}

async function syncContracts(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (previous && !changed(previous, item)) continue;
    const id = uuid(item.id);
    const proposalPath = await resolveStoragePath(client, item.proposalAttachmentId || item.proposalStoragePath);
    const values = [
      id, session.user.organizationId, item.opportunityId, item.conditionVersionId || null,
      item.contractNumber || `MADA-${String(Date.now()).slice(-5)}`, item.status || "proposal_planning",
      Number(item.amountCents || item.proposalAmountCents || 0), String(item.paymentPlan || "").includes("100") ? "100" : "50_50",
      item.paymentTerms || "", proposalPath, item.contractLink || null, iso(item.signedAt), iso(item.saleValidatedAt),
      JSON.stringify({ ...item, id }), session.user.id,
    ];
    if (!previous) {
      await client.query(`
        insert into public.contracts (
          id, organization_id, opportunity_id, condition_version_id, contract_number, status,
          amount_cents, payment_plan, payment_terms, proposal_storage_path, contract_link,
          signed_at, sale_validated_at, payload, created_by, updated_by
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15,$15)
      `, values);
    } else {
      const result = await client.query(`
        update public.contracts set condition_version_id=$4, contract_number=$5, status=$6,
          amount_cents=$7, payment_plan=$8, payment_terms=$9, proposal_storage_path=$10,
          contract_link=$11, signed_at=$12, sale_validated_at=$13, payload=$14::jsonb,
          updated_by=$15, version=version+1
        where id=$1 and organization_id=$2 and opportunity_id=$3 and version=$16
      `, [...values, Number(item._version || 1)]);
      ensureVersion(result, "contrato");
    }
  }
}

async function syncPayments(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (previous && !changed(previous, item)) continue;
    const id = uuid(item.id);
    const receiptPath = await resolveStoragePath(client, item.receiptAttachmentId);
    const values = [
      id, session.user.organizationId, item.contractId || null, Number(item.amountCents || 0), item.type || "contract_payment",
      item.method || null, item.reference || null, item.notes || null, item.status || "pending", dateOnly(item.dueDate),
      iso(item.paidAt), item.confirmedBy || null, receiptPath, JSON.stringify({ ...item, id }), session.user.id,
    ];
    if (!previous) {
      await client.query(`
        insert into public.customer_payments (
          id, organization_id, contract_id, amount_cents, payment_type, method, reference, notes,
          status, due_date, paid_at, confirmed_by, receipt_storage_path, payload, created_by
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15)
      `, values);
    } else {
      const result = await client.query(`
        update public.customer_payments set contract_id=$3, amount_cents=$4, payment_type=$5, method=$6,
          reference=$7, notes=$8, status=$9, due_date=$10, paid_at=$11,
          confirmed_by=$12, receipt_storage_path=$13, payload=$14::jsonb, version=version+1
        where id=$1 and organization_id=$2 and version=$16
      `, [...values, Number(item._version || 1)]);
      ensureVersion(result, "pagamento");
    }
  }
}

async function syncCommissions(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (previous && !changed(previous, item)) continue;
    const id = uuid(item.id);
    const values = [
      id, session.user.organizationId, item.contractId, item.paymentId || null, item.sdrId,
      Number(item.rateBps || 0), Number(item.baseCents || 0), Number(item.amountCents || 0), item.status || "available",
      item.notes || null, JSON.stringify({ ...item, id }), session.user.id,
    ];
    if (!previous) {
      await client.query(`
        insert into public.commissions (
          id, organization_id, contract_id, payment_id, sdr_user_id, rate_bps,
          base_cents, amount_cents, status, notes, payload, created_by
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12)
      `, values);
    } else {
      const result = await client.query(`
        update public.commissions set payment_id=$4, sdr_user_id=$5, rate_bps=$6,
          base_cents=$7, amount_cents=$8, status=$9, notes=$10, payload=$11::jsonb,
          version=version+1 where id=$1 and organization_id=$2 and contract_id=$3 and version=$13
      `, [...values, Number(item._version || 1)]);
      ensureVersion(result, "comissão");
    }
  }
}

async function syncBatches(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (previous && !changed(previous, item)) continue;
    const id = uuid(item.id);
    const receiptPath = await resolveStoragePath(client, item.receiptAttachmentId);
    await client.query(`
      insert into public.payout_batches (
        id, organization_id, sdr_user_id, sequence_number, total_amount_cents,
        status, receipt_storage_path, paid_at, paid_by
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      on conflict (id) do update set total_amount_cents=excluded.total_amount_cents,
        status=excluded.status, receipt_storage_path=excluded.receipt_storage_path,
        paid_at=excluded.paid_at, paid_by=excluded.paid_by
    `, [id, session.user.organizationId, item.sdrId, Number(item.sequenceNumber || 1), Number(item.totalAmountCents || 0), item.status || "batched", receiptPath, iso(item.paidAt), item.paidBy || null]);
    await client.query("delete from public.payout_batch_items where batch_id = $1", [id]);
    for (const commissionId of item.commissionIds || []) {
      await client.query("insert into public.payout_batch_items (batch_id, commission_id) values ($1,$2) on conflict do nothing", [id, commissionId]);
    }
  }
}

async function syncProjects(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    const projectChanged = !previous || changed({ ...previous, stages: [] }, { ...item, stages: [] });
    const id = uuid(item.id);
    if (projectChanged) {
      const values = [
        id, session.user.organizationId, item.opportunityId, item.contractId || null, item.sdrId || null, item.managerId || session.user.id,
        item.name || "Projeto", item.status || "planning", iso(item.startsAt), dateOnly(item.targetEndAt),
        uuidPattern.test(String(item.currentStageId || "")) ? item.currentStageId : null, JSON.stringify({ ...item, id, stages: undefined }),
      ];
      if (!previous) {
        await client.query(`
          insert into public.projects (
            id, organization_id, opportunity_id, contract_id, sdr_user_id, manager_user_id,
            name, status, starts_at, target_end_at, current_stage_id, payload
          ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,null,$12::jsonb)
        `, values);
      } else {
        const result = await client.query(`
          update public.projects set contract_id=$4, sdr_user_id=$5, manager_user_id=$6,
            name=$7, status=$8, starts_at=$9, target_end_at=$10, payload=$12::jsonb,
            version=version+1 where id=$1 and organization_id=$2 and opportunity_id=$3 and version=$13
        `, [...values, Number(item._version || 1)]);
        ensureVersion(result, "projeto");
      }
    }
    const previousStages = byId(previous?.stages || []);
    for (const stage of item.stages || []) {
      const oldStage = previousStages.get(stage.id);
      if (oldStage && !changed(oldStage, stage)) continue;
      const stageId = uuid(stage.id);
      const values = [
        stageId, session.user.organizationId, id, Number(stage.sequenceNumber || 1), stage.name || "Etapa", stage.status || "locked",
        stage.responsibleManagerId || session.user.id, dateOnly(stage.dueAt), iso(stage.startsAt), iso(stage.completedAt), JSON.stringify({ ...stage, id: stageId }),
      ];
      if (!oldStage) {
        await client.query(`
          insert into public.project_stages (
            id, organization_id, project_id, sequence_number, name, status,
            responsible_user_id, due_at, started_at, completed_at, payload
          ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb)
        `, values);
      } else {
        const result = await client.query(`
          update public.project_stages set sequence_number=$4, name=$5, status=$6,
            responsible_user_id=$7, due_at=$8, started_at=$9, completed_at=$10,
            payload=$11::jsonb, version=version+1 where id=$1 and organization_id=$2 and project_id=$3 and version=$12
        `, [...values, Number(stage._version || 1)]);
        ensureVersion(result, "etapa do projeto");
      }
    }
    const currentStageId = uuidPattern.test(String(item.currentStageId || "")) ? item.currentStageId : null;
    if (currentStageId) await client.query("update public.projects set current_stage_id = $2 where id = $1", [id, currentStageId]);
  }
}

async function syncNotifications(client, before, after, session) {
  const beforeById = byId(before);
  for (const item of after || []) {
    const previous = beforeById.get(item.id);
    if (!previous) {
      await client.query(`
        insert into public.notifications (
          id, organization_id, recipient_user_id, recipient_role, created_by,
          kind, title, message, entity_type, entity_id, read_at, created_at
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,coalesce($12,now())) on conflict (id) do nothing
      `, [uuid(item.id), session.user.organizationId, item.recipientUserId || null, item.recipientRole || null, session.user.id,
        item.kind || "info", item.title || "Atualização", item.text || item.message || "Atualização no portal", item.entityType || null,
        uuidPattern.test(String(item.entityId || "")) ? item.entityId : null, item.read ? (iso(item.readAt) || new Date().toISOString()) : null, iso(item.createdAt)]);
    } else if (!previous.read && item.read) {
      await client.query("update public.notifications set read_at = now() where id = $1 and (recipient_user_id = $2 or $3::boolean)", [item.id, session.user.id, session.user.role === "admin_manager"]);
    }
  }
}

async function appendAuditLogs(client, before, after, session) {
  const existing = new Set((before || []).map((item) => item.id));
  for (const item of after || []) {
    if (existing.has(item.id)) continue;
    await client.query(`
      insert into public.audit_logs (id, organization_id, actor_user_id, action, entity_type, entity_id, metadata, created_at)
      values ($1,$2,$3,$4,$5,$6,$7::jsonb,coalesce($8,now())) on conflict (id) do nothing
    `, [uuid(item.id), session.user.organizationId, session.user.id, item.action || "portal_event", item.entityType || "portal", uuidPattern.test(String(item.entityId || "")) ? item.entityId : null, JSON.stringify(item.metadata || {}), iso(item.createdAt)]);
  }
}

async function writeRelationalState(client, incoming, session) {
  const current = await readRelationalState(client, session);
  const merged = mergeStateForUser(current, incoming, session.user);
  await client.query("begin");
  try {
    await syncOpportunities(client, current.opportunities, merged.opportunities, session);
    if (session.user.role === "admin_manager") {
      await syncConditions(client, current.conditions, merged.conditions, session);
    }
    await syncContracts(client, current.contracts, merged.contracts, session);
    if (session.user.role === "admin_manager") {
      await syncPayments(client, current.payments, merged.payments, session);
      await syncCommissions(client, current.commissions, merged.commissions, session);
      await syncBatches(client, current.payoutBatches, merged.payoutBatches, session);
    }
    await syncProjects(client, current.projects, merged.projects, session);
    await syncNotifications(client, current.notifications, merged.notifications, session);
    await appendAuditLogs(client, current.auditLogs, merged.auditLogs, session);
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  }
  return readRelationalState(client, session);
}

module.exports = {
  readRelationalState,
  writeRelationalState,
};
