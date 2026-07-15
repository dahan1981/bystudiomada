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
});

test("manager completes the repaired operational flows", async ({ page, request }) => {
  test.setTimeout(60_000);
  await request.post("/api/e2e-reset", { headers: { Cookie: "portal-e2e=manager" } });
  await page.goto("/api/e2e-login");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.locator("[data-new-opportunity]").first().click();
  await expect(page.locator("[data-service-count]")).toHaveText("0 selecionado(s)");
  await page.getByText("Branding", { exact: true }).click();
  await page.getByText("Landing Page", { exact: true }).click();
  await expect(page.locator("[data-service-count]")).toHaveText("2 selecionado(s)");
  await expect(page.locator(".service-check-card.is-selected")).toHaveCount(2);
  await page.locator("[data-drawer-panel] header [data-close-drawer]").click();

  await goToRoute(page, "progress");
  const progressRow = page.locator('[data-progress-row="opp-active"]');
  await progressRow.locator("[data-progress-next-action]").selectOption({ label: "Agendar reuniao" });
  await progressRow.locator("[data-save-opportunity-progress]").click();
  await expect(page.getByText("Andamento da oportunidade salvo.")).toBeVisible();

  await goToRoute(page, "approvals");
  await page.getByRole("button", { name: "Decidir" }).click();
  await page.getByRole("button", { name: "Aprovar sem alteracao" }).click();
  await page.getByRole("button", { name: "Confirmar aprovacao" }).click();
  await expect(page.getByText("Condicao aprovada", { exact: true }).first()).toBeVisible();
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

  await page.getByRole("button", { name: "Notificacoes" }).click();
  await expect(page.getByRole("heading", { name: "Notificacoes" })).toBeVisible();
  await page.locator('[data-read-notification="notification-1"]').click();
  await expect(page.getByText("0 nao lida(s)")).toBeVisible();

  await goToRoute(page, "payments");
  await page.getByRole("button", { name: /Novo registro/ }).click();
  await page.getByLabel("Nome do pagador").fill("Cliente Financeiro LTDA");
  await page.getByLabel("Numero do recibo").fill("REC-TESTE-001");
  await page.getByRole("button", { name: "Salvar registro de pagamento" }).click();
  await expect(page.getByText("Registro de pagamento atualizado.").or(page.getByText("Pagamento externo confirmado e registrado."))).toBeVisible();

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
