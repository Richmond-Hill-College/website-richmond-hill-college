"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  locale?: "en" | "fr";
  /** Tag stored alongside the submission so we know which list this is for */
  topic?: string;
  /** Visible heading override */
  heading?: string;
};

/**
 * Lightweight email-only form for "Notify me when the next edition is announced".
 * Reuses /api/contact under the hood so we don't need a second pipeline.
 */
export function NotifyMeForm({
  locale = "en",
  topic = "nursing-healthcare-2026",
  heading,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const pathname = usePathname() ?? "/";
  const isFr = locale === "fr";

  const t = isFr
    ? {
        heading: heading ?? "M'avertir de l'édition 2026",
        placeholder: "votre@courriel.ca",
        submit: "M'inscrire",
        sending: "Envoi…",
        thanks: "Merci ! Nous vous écrirons dès que l'édition 2026 sera annoncée.",
        error: "Erreur. Veuillez réessayer.",
      }
    : {
        heading: heading ?? "Notify me about the 2026 edition",
        placeholder: "you@email.com",
        submit: "Sign up",
        sending: "Sending…",
        thanks: "Thanks! We'll email you as soon as the 2026 edition is announced.",
        error: "Something went wrong. Please try again.",
      };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setStatus("error");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          message: `[notify-me:${topic}] Please notify me about ${topic} when announced.`,
          locale,
          source_path: pathname,
          send_copy: false,
          website: "",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="notify" className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-semibold text-slate-900">{t.heading}</h3>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row" noValidate>
        <label className="sr-only" htmlFor="notify-email">{t.placeholder}</label>
        <input
          id="notify-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t.placeholder}
          className="flex-1 min-h-[44px] rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="cta-primary min-h-[44px] rounded-md px-5 py-2 text-sm font-medium disabled:opacity-50"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
      </form>
      {status === "sent" && <p role="status" className="mt-3 text-sm text-emerald-700">{t.thanks}</p>}
      {status === "error" && <p role="alert" className="mt-3 text-sm text-red-600">{t.error}</p>}
    </section>
  );
}
