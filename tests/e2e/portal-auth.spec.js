const { test, expect } = require("@playwright/test");

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
