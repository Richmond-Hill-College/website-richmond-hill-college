import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Résumés et actes",
  description:
    "Résumés et actes de la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/abstract-proceeding-book",
  locale: "fr",
});

export default function AbstractProceedingBookPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Résumés et actes</h1>
      <p className="mt-4 text-slate-600">
        Recueil des résumés et actes de la conférence Avancer en soins infirmiers et en santé :
        un dialogue mondial. Les détails seront communiqués aux participants inscrits.
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Retour à la conférence
      </Link>
    </div>
  );
}
