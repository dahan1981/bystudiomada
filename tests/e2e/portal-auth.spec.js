const { test, expect } = require("@playwright/test");

async function goToRoute(page, route) {
  if ((page.viewportSize()?.width || 1280) <= 1024) {
    await page.locator("[data-mobile-menu]").click();
    await expect(page.locator("[data-sidebar]")).toHaveClass(/is-open/);
  }
  await page.locator(`[data-sidebar] .nav [data-route="${route}"]`).click();
}

test("shows secure login and password recovery", async ({ page }) => {
  await page.goto("/portal-mada/");
  await expect(page.getByRole("heading", { name: "Portal Comercial" })).toBeVisible();
  await expect(page.getByLabel("Senha")).toBeVisible();
  await page.getByRole("button", { name: "Esqueci minha senha" }).click();
  await expect(page.getByRole("button", { name: "Enviar link" })).toBeVisible();
  await expect(page.getByText("Enviaremos um link para o e-mail cadastrado.")).toBeVisible();
});

test("login screen does not overflow the viewport", async ({ page }) => {
  await page.goto("/portal-mada/");
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
  await expect(page.locator('img.brand-logo[src="./assets/mada-logo.jpeg"]')).toBeVisible();
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "./assets/mada-icon.svg");
});

test("dashboard uses everyday activity language and hides persistence details", async ({ page, request }) => {
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");

  await expect(page.getByText("A oportunidade de Cliente Aprovação foi recusada e arquivada")).toBeVisible();
  await expect(page.getByText("A oportunidade de Cliente Aprovação foi enviada para aprovação")).toBeVisible();
  await expect(page.getByText("opportunity_rejected")).toHaveCount(0);
  await expect(page.getByText("opportunity_submitted")).toHaveCount(0);

  await goToRoute(page, "settings");
  await expect(page.getByRole("heading", { name: "Persistência" })).toHaveCount(0);
  await expect(page.getByText("Sincronizado com Supabase")).toHaveCount(0);
});

test("primary routes and workspaces do not overflow the viewport", async ({ page, request }) => {
  test.setTimeout(60_000);
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");

  const routes = [
    "dashboard", "opportunities", "progress", "approvals", "contracts", "payments",
    "commissions", "files", "reports", "projects", "services", "audit", "settings",
  ];

  for (const route of routes) {
    await goToRoute(page, route);
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      contentRight: Math.round(document.querySelector(".content")?.getBoundingClientRect().right || 0),
    }));
    expect(dimensions.scrollWidth, `${route} created page overflow`).toBeLessThanOrEqual(dimensions.width);
    expect(dimensions.contentRight, `${route} exceeded the viewport`).toBeLessThanOrEqual(dimensions.width + 1);
  }

  await goToRoute(page, "opportunities");
  await page.locator("[data-new-opportunity]").first().click();
  await expect(page.locator('input[type="date"], input[type="datetime-local"]')).toHaveCount(0);
  await expect(page.locator("[data-drawer-panel] [data-date-control]")).toHaveCount(2);
  const workspace = await page.evaluate(() => {
    const panel = document.querySelector("[data-drawer-panel]");
    return panel ? { clientWidth: panel.clientWidth, scrollWidth: panel.scrollWidth } : null;
  });
  expect(workspace).not.toBeNull();
  expect(workspace.scrollWidth).toBeLessThanOrEqual(workspace.clientWidth);
});

test("manager reviews a pending condition from opportunity actions", async ({ page, request }) => {
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");
  await goToRoute(page, "opportunities");

  const pendingRow = page.locator("tr", { hasText: "Cliente Aprovação" });
  await expect(pendingRow.getByRole("button", { name: "Analisar" })).toBeVisible();
  await pendingRow.getByRole("button", { name: "Analisar" }).click();

  await expect(page.getByText("Condição aguardando sua aprovação", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Aprovar sem alteração" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Aprovar com alterações" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Solicitar informações" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Recusar" })).toBeVisible();
  await page.locator("[data-drawer-panel] header [data-close-drawer]").click();
  await expect(page.locator("[data-drawer-panel]")).toHaveCount(0);
});

test("manager rejection archives and permanently locks the opportunity", async ({ page, request }) => {
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");
  await goToRoute(page, "opportunities");

  const pendingRow = page.locator("tr", { hasText: "Cliente Aprovação" });
  await pendingRow.getByRole("button", { name: "Analisar" }).click();
  await page.locator('[data-approval-action="rejected"]').click();
  await expect(page.getByText("Esta decisão é definitiva.", { exact: false })).toBeVisible();
  await expect(page.locator('select[name="followAction"]')).toHaveCount(0);
  await expect(page.locator('input[name="nextActionDate"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Recusar e arquivar" }).click();

  await expect(page.getByRole("heading", { name: "Oportunidades arquivadas" })).toBeVisible();
  const archivedRow = page.locator("tr", { hasText: "Cliente Aprovação" });
  await expect(archivedRow.getByText("Bloqueada")).toBeVisible();
  await expect(archivedRow.getByRole("button", { name: "Restaurar" })).toHaveCount(0);
  await archivedRow.getByRole("button", { name: "Ver historico" }).click();
  await expect(page.getByRole("heading", { name: "Oportunidade arquivada e bloqueada" })).toBeVisible();
  await expect(page.locator("[data-opportunity-edit-form]")).toHaveCount(0);
});

test("manager sends a draft condition to the real approval state", async ({ page, request }) => {
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");
  await goToRoute(page, "progress");

  let progressRow = page.locator('[data-progress-row="opp-active"]');
  await progressRow.getByRole("button", { name: "Pedir aprovação" }).click();
  await expect(page.getByText("Pedido de aprovação enviado para a fila do gestor.")).toBeVisible();

  progressRow = page.locator('[data-progress-row="opp-active"]');
  await expect(progressRow.getByRole("button", { name: "Revisar condição" })).toBeVisible();
  await progressRow.getByRole("button", { name: "Revisar condição" }).click();
  await expect(page.getByText("Condição aguardando sua aprovação", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Aprovar sem alteração" })).toBeVisible();
});

test("manager completes the repaired operational flows", async ({ page, request }) => {
  test.setTimeout(60_000);
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.locator("[data-new-opportunity]").first().click();
  await expect(page.locator("[data-service-count]")).toHaveText("0 selecionado(s)");
  await page.locator('[data-service-card]:has(input[value="srv-branding"])').click();
  await page.locator('[data-service-card]:has(input[value="srv-landing-page"])').click();
  await expect(page.locator("[data-service-count]")).toHaveText("2 selecionado(s)");
  await expect(page.locator(".service-check-card.is-selected")).toHaveCount(2);
  await page.locator("[data-drawer-panel] header [data-close-drawer]").click();

  await goToRoute(page, "progress");
  const progressRow = page.locator('[data-progress-row="opp-active"]');
  await progressRow.locator("[data-progress-stage-picker] summary").click();
  await progressRow.locator('[data-progress-stage-value="manager_meeting"]').click();
  await progressRow.locator("[data-progress-action-picker] summary").click();
  await progressRow.locator('[data-progress-action-value="Preparar proposta"]').first().click();
  await progressRow.locator("[data-progress-date-picker] summary").click();
  await progressRow.locator('[data-progress-date-value="2026-07-22"]').click();
  await progressRow.locator("[data-progress-notes]").fill("Alinhar escopo antes da proposta");
  await expect(progressRow.locator("[data-save-opportunity-progress]")).toBeVisible();
  await progressRow.locator("[data-save-opportunity-progress]").click();
  await expect(page.getByText("Andamento da oportunidade salvo.")).toBeVisible();

  await goToRoute(page, "approvals");
  await page.getByRole("button", { name: "Decidir" }).click();
  await page.getByRole("button", { name: "Aprovar sem alteração" }).click();
  await page.getByRole("button", { name: "Confirmar aprovação" }).click();
  await expect(page.getByText("Condição aprovada", { exact: true }).first()).toBeVisible();
  await page.locator("[data-drawer-panel] header [data-close-drawer]").click();

  await goToRoute(page, "opportunities");
  page.once("dialog", (dialog) => dialog.accept());
  const archiveAction = page.locator('[data-archive-opportunity="opp-active"]');
  await archiveAction.locator("xpath=ancestor::details").locator("summary").click();
  await archiveAction.click();
  await page.getByRole("button", { name: /Arquivadas/ }).click();
  await expect(page.getByRole("heading", { name: "Oportunidades arquivadas" })).toBeVisible();
  await page.locator('[data-restore-opportunity="opp-active"]').click();
  await expect(page.getByRole("heading", { name: "Oportunidades" })).toBeVisible();

  await page.getByRole("button", { name: "Notificações" }).click();
  await expect(page.getByRole("heading", { name: "Notificações" })).toBeVisible();
  await page.locator('[data-read-notification="notification-1"]').click();
  await expect(page.getByText("Nenhuma notificação não lida")).toBeVisible();

  await goToRoute(page, "payments");
  await page.getByRole("button", { name: /Novo pagamento/ }).click();
  await expect(page.getByText("Registro manual fora do CRM", { exact: true })).toBeVisible();
  await page.getByLabel("Cliente ou origem do pagamento *").fill("Pagamento Avulso E2E");
  await page.getByLabel("Valor registrado").fill("1.250,00");
  await page.getByLabel("Nome do pagador").fill("Cliente Financeiro LTDA");
  await page.getByLabel("Número do recibo").fill("REC-TESTE-001");
  await expect(page.locator('input[type="date"], input[type="datetime-local"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Salvar pagamento" }).click();
  await expect(page.getByText("Pagamento manual salvo sem vínculo com o CRM.")).toBeVisible();

  let paymentRow = page.locator("tbody tr", { hasText: "Pagamento Avulso E2E" });
  await expect(paymentRow.getByText("Sem vínculo")).toBeVisible();
  await paymentRow.getByRole("button", { name: "Editar" }).click();
  await page.getByLabel("Vínculo com o CRM").selectOption("ctr-1");
  await page.getByRole("button", { name: "Atualizar registro" }).click();
  await expect(page.getByText("Registro de pagamento atualizado.")).toBeVisible();
  paymentRow = page.locator("tbody tr", { hasText: "Pagamento Avulso E2E" });
  await expect(paymentRow.getByText("MADA-TESTE")).toBeVisible();

  await goToRoute(page, "projects");
  await page.getByRole("button", { name: /Adicionar projeto/ }).click();
  await page.getByLabel("Cliente *").fill("Cliente Manual");
  await page.getByLabel("Nome do projeto *").fill("Projeto Manual de Teste");
  await page.getByText("Identidade Visual", { exact: true }).click();
  await page.getByRole("button", { name: /Criar projeto/ }).click();
  await expect(page.getByRole("heading", { name: "Projeto Manual de Teste" })).toBeVisible();

  await page.locator("[data-drawer-panel] header [data-close-drawer]").click();
  await goToRoute(page, "settings");
  await expect(page.getByRole("heading", { name: "Configurações" })).toBeVisible();
});
