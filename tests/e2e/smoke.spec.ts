import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("home page renders with primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Richmond Hill College/i);
    await expect(page.locator("main")).toBeVisible();
  });

  test("FR home page renders", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.locator("main")).toBeVisible();
  });

  test("legacy /en/* paths 308 to canonical EN", async ({ page }) => {
    const res = await page.goto("/en/about-us", { waitUntil: "domcontentloaded" });
    expect(res?.url()).toContain("/about-us");
    expect(res?.url()).not.toContain("/en/");
  });

  test("FR catch-all redirects to canonical EN", async ({ page }) => {
    // Path that has no FR translation
    const res = await page.goto("/fr/some-untranslated-path", { waitUntil: "domcontentloaded" });
    expect(res?.url()).toContain("/some-untranslated-path");
    expect(res?.url()).not.toContain("/fr/");
  });

  test("sitemap.xml is valid XML and lists routes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const xml = await res.text();
    expect(xml).toContain("<?xml");
    expect(xml).toContain("<urlset");
    expect(xml).toMatch(/<loc>https?:\/\/.+\/courses<\/loc>/);
  });

  test("robots.txt references sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/Sitemap:/i);
  });

  test("404 page renders without breaking", async ({ page }) => {
    const res = await page.goto("/this-route-definitely-does-not-exist-12345", {
      waitUntil: "domcontentloaded",
    });
    expect(res?.status()).toBe(404);
  });
});
