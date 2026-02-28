"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";

function getFaqs(locale: "en" | "fr") {
  if (locale === "fr") {
    return [
      {
        q: "Quels cours offrez-vous?",
        a: "Nous offrons des cours en ligne, hybrides et en personne en gestion de la sante et des technologies.",
      },
      {
        q: "Les cours sont-ils accredites?",
        a: "Oui, nos cours sont accredites et reconnus par les professionnels du secteur.",
      },
      {
        q: "Comment puis-je m'inscrire a un cours?",
        a: "Pour vous inscrire, remplissez simplement notre formulaire en ligne ou contactez notre equipe des admissions.",
      },
    ];
  }

  return [
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
}

export function FAQSection() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const faqs = getFaqs(locale);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-6 tablet:text-3xl">
        {locale === "fr" ? "Foire aux questions" : "Frequently Asked Questions"}
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
          href={withLocale("/faq", locale)}
          className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          {locale === "fr" ? "Voir toute la FAQ ->" : "View all FAQs ->"}
        </Link>
      </p>
    </section>
  );
}
