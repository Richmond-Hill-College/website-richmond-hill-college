"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const copyEn = {
  labelName: "Full Name",
  labelEmail: "Email address",
  labelPhone: "Mobile Number",
  labelMessage: "Message",
  sendCopy: "Send me a copy",
  thankYou: "Thank you. We will get back to you soon.",
  errorGeneric: "Something went wrong. Please try again.",
  errorValidation: "Please check the form fields and try again.",
  errorRate: "Too many requests. Please wait a moment and try again.",
  sending: "Sending…",
  submit: "Submit form",
};

const copyFr = {
  labelName: "Nom complet",
  labelEmail: "Courriel",
  labelPhone: "Numéro de téléphone",
  labelMessage: "Message",
  sendCopy: "M'envoyer une copie",
  thankYou: "Merci. Nous vous répondrons sous peu.",
  errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
  errorValidation: "Veuillez vérifier les champs et réessayer.",
  errorRate: "Trop de tentatives. Veuillez patienter un instant.",
  sending: "Envoi en cours…",
  submit: "Envoyer le formulaire",
};

type ContactFormProps = { locale?: "en" | "fr" };
type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ locale = "en" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";
  const t = locale === "fr" ? copyFr : copyEn;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      send_copy: fd.get("copy") === "on",
      locale,
      source_path: pathname,
      // Honeypot — must remain empty
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      if (res.status === 400) setErrorMsg(t.errorValidation);
      else if (res.status === 429) setErrorMsg(t.errorRate);
      else setErrorMsg(t.errorGeneric);
      setStatus("error");
    } catch {
      setErrorMsg(t.errorGeneric);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
          {t.labelName} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          {t.labelEmail} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700">
          {t.labelPhone}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 block w-full min-h-[44px] rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 tablet:py-2.5 tablet:min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          {t.labelMessage} <span className="text-red-500">*</span>
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
          {t.sendCopy}
        </label>
      </div>

      {/* Honeypot — visually hidden, ignored by assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "sent" && (
        <p role="status" className="text-sm text-green-600">{t.thankYou}</p>
      )}
      {status === "error" && errorMsg && (
        <p role="alert" className="text-sm text-red-600">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-primary min-h-[44px] rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 tablet:min-h-[48px] tablet:px-5 tablet:py-2.5"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
