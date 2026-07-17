import { test, expect } from "@playwright/test";

test.describe("Homepage decision journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("rhc-locale", window.location.pathname.startsWith("/fr") ? "fr" : "en");
    });
  });

  test("guides a learner to a relevant pathway without collecting personal data", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /Internationally educated/i }).click();
    await page.getByRole("button", { name: /Healthcare & human services/i }).click();
    await page.getByRole("button", { name: /^Online/i }).click();

    await expect(page.getByRole("heading", { name: /A focused pathway/i })).toBeVisible();
    await expect(page.getByText(/Start with Healthcare & human services/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /View recommended options/i })).toHaveAttribute(
      "href",
      "/bridging-programs"
    );
    await expect(page.getByText(/answers stay in this browser/i)).toBeVisible();
  });

  test("offers the complete pathway journey in French", async ({ page }) => {
    await page.goto("/fr", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /Formé à l’étranger/i }).click();
    await page.getByRole("button", { name: /Technologie et IA/i }).click();
    await page.getByRole("button", { name: /^Hybride/i }).click();

    await expect(page.getByRole("heading", { name: /Un parcours ciblé/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Voir les options recommandées/i })).toHaveAttribute(
      "href",
      "/fr/bridging-programs"
    );
  });

  test("provides keyboard and motion controls", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();

    const pause = page.getByRole("button", { name: /Pause carousel/i });
    await pause.click();
    await expect(page.getByRole("button", { name: /Resume carousel/i })).toBeVisible();
  });

  test("does not leave the closed mobile navigation in the accessibility tree", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const openMenu = page.getByRole("button", { name: /Open menu/i });

    if (await openMenu.isVisible()) {
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
      await openMenu.click();
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
      await expect(openMenu).toBeFocused();
    }
  });
});
