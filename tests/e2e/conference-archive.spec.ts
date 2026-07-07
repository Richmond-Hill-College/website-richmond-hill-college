import { test, expect } from "@playwright/test";

test.describe("Nursing & Healthcare 2025 — past-event treatment", () => {
  test("EN hub shows past-event banner and notify form", async ({ page }) => {
    await page.goto("/conferences/nursing-and-healthcare-2025");
    await expect(page.getByRole("note", { name: /past event/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Recap/i })).toBeVisible();
    await expect(page.locator("#notify")).toBeVisible();
  });

  test("FR hub shows past-event banner", async ({ page }) => {
    await page.goto("/fr/conferences/nursing-and-healthcare-2025");
    await expect(page.getByRole("note", { name: /événement passé/i })).toBeVisible();
  });

  test("registration subpage is noindex", async ({ page }) => {
    await page.goto("/conferences/nursing-and-healthcare-2025/registration");
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/i);
  });
});
