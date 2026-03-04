"use client";

import { useState } from "react";
import Link from "next/link";

const faqsEn = [
  {
    q: "What courses do you offer?",
    a: "We offer online, hybrid, and in-person courses in healthcare and technology management.",
  },
  {
    q: "Are the courses accredited?",
    a: "Yes, our courses are accredited and recognized by industry professionals.",
  },
  {
    q: "How can I enroll in a course?",
    a: "To enroll in a course, simply fill out our online application form or contact our admissions team for assistance.",
  },
];

const faqsFr = [
  {
    q: "Quels cours offrez-vous?",
    a: "Nous offrons des cours en ligne, hybrides et en personne en gestion des soins de santé et de la technologie.",
  },
  {
    q: "Les cours sont-ils accrédités?",
    a: "Oui, nos cours sont accrédités et reconnus par les professionnels du milieu.",
  },
  {
    q: "Comment puis-je m'inscrire à un cours?",
    a: "Pour vous inscrire, remplissez notre formulaire en ligne ou communiquez avec notre équipe des admissions.",
  },
];

type FAQSectionProps = { locale?: "en" | "fr"; localePrefix?: string };

export function FAQSection({ locale = "en", localePrefix = "" }: FAQSectionProps) {
  const faqs = locale === "fr" ? faqsFr : faqsEn;
  const [open, setOpen] = useState<number | null>(0);
  const heading = locale === "fr" ? "Questions fréquentes" : "Frequently Asked Questions";
  const viewAll = locale === "fr" ? "Voir toutes les questions" : "View all FAQs";
  const faqHref = localePrefix ? `${localePrefix}/faq` : "/faq";

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-6 tablet:text-3xl">
        {heading}
      </h2>
      <ul className="space-y-2 tablet:space-y-3">
        {faqs.map((faq, i) => (
          <li key={i} className="rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-50 tablet:min-h-[52px] tablet:px-5 tablet:text-[15px]"
              aria-expanded={open === i}
            >
              {faq.q}
              <span className="text-slate-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 tablet:px-5 tablet:py-4 tablet:text-[15px]">
                {faq.a}
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-slate-600">
        <Link
          href={faqHref}
          className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          {viewAll} →
        </Link>
      </p>
    </section>
  );
}
