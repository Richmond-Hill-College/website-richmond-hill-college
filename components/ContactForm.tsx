"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n-routing";

export function ContactForm() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const copy =
    locale === "fr"
      ? {
          fullName: "Nom complet",
          email: "Adresse courriel",
          mobile: "Numero de telephone mobile",
          message: "Message",
          sendCopy: "Envoyez-moi une copie",
          sent: "Merci. Nous vous repondrons bientot.",
          error: "Une erreur s'est produite. Veuillez reessayer.",
          sending: "Envoi...",
          submit: "Envoyer le formulaire",
        }
      : {
          fullName: "Full Name",
          email: "Email address",
          mobile: "Mobile Number",
          message: "Message",
          sendCopy: "Send me a copy",
          sent: "Thank you. We will get back to you soon.",
          error: "Something went wrong. Please try again.",
          sending: "Sending...",
          submit: "Submit form",
        };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Stub: wire to existing endpoint when available
    await new Promise((r) => setTimeout(r, 500));
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
          {copy.fullName} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          {copy.email} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700">
          {copy.mobile}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          {copy.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[140px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="contact-copy"
          name="copy"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
        />
        <label htmlFor="contact-copy" className="text-sm text-slate-600">
          {copy.sendCopy}
        </label>
      </div>
      {status === "sent" && (
        <p className="text-sm text-green-600">{copy.sent}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{copy.error}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-primary min-h-[44px] rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 tablet:min-h-[48px] tablet:px-5 tablet:py-2.5"
      >
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
