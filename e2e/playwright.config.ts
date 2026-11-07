import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

// Com E2E_BASE_URL (ex.: URL de preview da Vercel) os testes rodam contra
// um site já publicado e nenhum servidor local é iniciado.
const externalBaseURL = process.env.E2E_BASE_URL;
const port = Number(process.env.E2E_PORT ?? 3000);
const baseURL = externalBaseURL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL,
    locale: "pt-BR",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],

  // Sobe o app Next.js da raiz do repositório (o pacote da aplicação é o "..").
  // Localmente reaproveita um `npm run dev` que já esteja rodando.
  webServer: externalBaseURL
    ? undefined
    : {
        command: isCI
          ? `npm run build && npm run start -- --port ${port}`
          : `npm run dev -- --port ${port}`,
        cwd: "..",
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 180_000,
        stdout: "ignore",
        stderr: "pipe",
      },
});
