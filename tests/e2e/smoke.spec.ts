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

  test("course catalog includes all published RHC Global Bridge courses", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("rhc-locale", "en"));
    await page.goto("/courses");

    await expect(page.getByText("28 courses", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: /View AI-Powered Digital Skills & Workplace Readiness course details/i,
      })
    ).toBeVisible();

    await page
      .getByRole("searchbox", { name: /Search courses by name or category/i })
      .fill("Medical Tourism");
    await expect(page.getByText("1 of 28 courses", { exact: true })).toBeVisible();
    const medicalTourismCourse = page.getByRole("link", {
      name: /View Cross-Border Healthcare Coordination & Medical Tourism Management course details/i,
    });
    await expect(medicalTourismCourse).toBeVisible();
    await medicalTourismCourse.click();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Cross-Border Healthcare Coordination & Medical Tourism Management",
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /View course & register/i })).toHaveAttribute(
      "href",
      "https://www.rhcglobalbridge.com/courses/cross-border-healthcare-coordination-medical-tourism-management/"
    );
  });

  test("French catalog exposes the complete course set", async ({ page }) => {
    await page.goto("/fr/courses");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByText("28 cours", { exact: true })).toBeVisible();
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
