"use client";

import { useState } from "react";
import Link from "next/link";

const faqsEn = [
  {
    q: "What courses do you offer?",
    a: "We offer online, hybrid, and in-person courses in healthcare and technology management.",
  },
  {
    q: "What is the approval status of the courses?",
    a: "Status and credential details depend on the individual offering. Richmond Hill College is currently pursuing registration and program approvals under Ontario’s career-college legislation. Please review the specific course page or contact us for written confirmation before registering.",
  },
  {
    q: "How can I enroll in a course?",
    a: "Review the individual course page, then contact an advisor if you need to confirm requirements, availability, program status or the credential offered. When registration is available, use only the official registration link shown on the course page.",
  },
];

const faqsFr = [
  {
    q: "Quels cours offrez-vous?",
    a: "Nous offrons des cours en ligne, hybrides et en personne en gestion des soins de santé et de la technologie.",
  },
  {
    q: "Quel est le statut d’approbation des cours?",
    a: "Le statut et le titre varient selon l’offre. Le Collège Richmond Hill poursuit actuellement son inscription et l’approbation de ses programmes conformément à la législation ontarienne sur les collèges d’enseignement professionnel. Consultez la page du cours ou communiquez avec nous pour obtenir une confirmation écrite avant de vous inscrire.",
  },
  {
    q: "Comment puis-je m'inscrire à un cours?",
    a: "Consultez la page du cours, puis communiquez avec un conseiller pour confirmer les exigences, les disponibilités, le statut du programme ou le titre offert. Lorsque l’inscription est disponible, utilisez uniquement le lien officiel affiché sur la page du cours.",
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
