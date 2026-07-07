/**
 * POST /api/contact — Contact form submission endpoint.
 *
 * Pipeline:
 *   1. Validate body (zod)
 *   2. Honeypot + rate-limit (in-memory; replace with Upstash later)
 *   3. Persist to Neon (lib/db.ts) — best-effort: failure does not block email
 *   4. Email notification via Resend; if RESEND_API_KEY missing, log only
 *   5. Optional copy to submitter when send_copy=true
 *
 * Returns { ok: true } on success, { ok: false, error: "..." } on rejection.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { getSql, dbAvailable } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs"; // Resend SDK + crypto

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(5000),
  send_copy: z.boolean().optional(),
  locale: z.enum(["en", "fr"]).optional().default("en"),
  source_path: z.string().max(500).optional(),
  /** Honeypot — must be empty. Real users never fill it. Validated broadly so bots get 200, not 400. */
  website: z.string().optional().or(z.literal("")),
});

const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL ?? "info@richmondhillcollege.ca";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Richmond Hill College <noreply@richmondhillcollege.ca>";

function hashIp(ip: string): string {
  const secret = process.env.IP_HASH_SECRET ?? "rhc-default-secret";
  return createHash("sha256").update(`${secret}:${ip}`).digest("hex").slice(0, 32);
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot — silently accept-and-discard so bots don't learn
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } },
    );
  }

  const ua = req.headers.get("user-agent") ?? null;

  // 1) Persist (best-effort)
  if (dbAvailable()) {
    try {
      const sql = getSql()!;
      await sql`
        INSERT INTO contact_submissions
          (name, email, phone, message, locale, source_path, send_copy, ip_hash, user_agent)
        VALUES
          (${data.name}, ${data.email}, ${data.phone || null}, ${data.message},
           ${data.locale}, ${data.source_path ?? null}, ${data.send_copy ?? false},
           ${hashIp(ip)}, ${ua})
      `;
    } catch (err) {
      console.error("[contact] DB write failed", err);
      // Continue — email is the primary delivery channel
    }
  }

  // 2) Email notification
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const subject = `New contact form submission — ${data.name}`;
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "Phone: (not provided)",
      `Locale: ${data.locale}`,
      data.source_path ? `Page: ${data.source_path}` : "Page: (unknown)",
      "",
      "Message:",
      data.message,
    ].join("\n");

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_TO,
        replyTo: data.email,
        subject,
        text: lines,
      });

      if (data.send_copy) {
        const copyCopy =
          data.locale === "fr"
            ? `Merci ${data.name},\n\nNous avons bien reçu votre message :\n\n---\n${data.message}\n---\n\nNous vous répondrons sous peu.\n\n— Collège Richmond Hill`
            : `Hi ${data.name},\n\nWe received your message:\n\n---\n${data.message}\n---\n\nWe'll get back to you soon.\n\n— Richmond Hill College`;
        await resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject:
            data.locale === "fr"
              ? "Nous avons reçu votre message — Collège Richmond Hill"
              : "We received your message — Richmond Hill College",
          text: copyCopy,
        });
      }
    } catch (err) {
      console.error("[contact] Email send failed", err);
      return NextResponse.json(
        { ok: false, error: "Email service temporarily unavailable. Please try again." },
        { status: 502 },
      );
    }
  } else {
    console.warn("[contact] RESEND_API_KEY not configured; submission logged only", {
      name: data.name,
      email: data.email,
    });
  }

  return NextResponse.json({ ok: true });
}
