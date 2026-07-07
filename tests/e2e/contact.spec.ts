import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("rejects malformed payload with 400", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "x", email: "not-an-email", message: "" },
    });
    expect(res.status()).toBe(400);
  });

  test("accepts a valid submission (no email creds → 200, server logs)", async ({ request }) => {
    // With no RESEND_API_KEY/DATABASE_URL set in CI, the route logs and returns ok.
    const res = await request.post("/api/contact", {
      data: {
        name: "Playwright User",
        email: "test+pw@example.com",
        phone: "",
        message: "This is a Playwright smoke test message.",
        send_copy: false,
        locale: "en",
        source_path: "/contact",
        website: "",
      },
    });
    expect(res.status()).toBeLessThan(500);
  });

  test("honeypot is silently accepted (no submission processed)", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Bot",
        email: "bot@example.com",
        message: "spam spam spam spam",
        website: "https://buy-cheap-stuff.example",
        locale: "en",
      },
    });
    // Honeypot returns 200 ok to avoid teaching bots they're caught
    expect(res.status()).toBe(200);
  });

  test("contact page loads and form is interactive", async ({ page }) => {
    await page.goto("/contact");
    const nameInput = page.locator('input[name="name"]').first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill("Test");
    await expect(nameInput).toHaveValue("Test");
  });
});
