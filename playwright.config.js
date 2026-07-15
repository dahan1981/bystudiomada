const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://127.0.0.1:4187", trace: "retain-on-failure" },
  webServer: {
    command: "node tests/fixtures/static-server.js",
    url: "http://127.0.0.1:4187/portal-mada/",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
