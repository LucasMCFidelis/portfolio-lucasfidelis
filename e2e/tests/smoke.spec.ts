import { expect, test } from "@playwright/test";

// Smoke tests: só dependem da estrutura fixa das páginas, não do conteúdo
// do banco (passam também quando o app renderiza a versão padrão).

const SITE_NAME = "Portfólio de Lucas Fidelis";

test.describe("Páginas públicas", () => {
  test("home exibe o título e a apresentação", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(`Analista de QA - ${SITE_NAME}`);
    await expect(
      page.getByRole("heading", { level: 1, name: /Lucas Fidelis/ }),
    ).toBeVisible();
    await expect(page.getByAltText("Foto Lucas")).toBeVisible();
  });

  test("home leva para a página de projetos", async ({ page }) => {
    await page.goto("/");

    await page.locator("#redirect-to-all-projects").click();

    await expect(page).toHaveURL(/\/projects$/);
    await expect(page).toHaveTitle(`Projetos - ${SITE_NAME}`);
  });

  test("página sobre exibe a seção 'Sobre mim'", async ({ page }) => {
    await page.goto("/about");

    await expect(page).toHaveTitle(`Sobre Mim - ${SITE_NAME}`);
    await expect(
      page.getByRole("heading", { name: "Sobre mim" }),
    ).toBeVisible();
  });
});

test.describe("Layout", () => {
  test("formulário de contato aparece no rodapé", async ({ page }) => {
    await page.goto("/");

    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();
    await expect(form).toBeVisible();
    await expect(page.locator("#submit-contact-form")).toBeEnabled();
  });

  test("alterna entre tema claro e escuro", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    // Há um botão no menu desktop e outro no mobile; só um fica visível.
    const toggle = page
      .getByRole("button", { name: "toggle-theme" })
      .filter({ visible: true });
    const startsDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    );

    await toggle.click();

    if (startsDark) {
      await expect(html).not.toHaveClass(/\bdark\b/);
    } else {
      await expect(html).toHaveClass(/\bdark\b/);
    }
  });
});
