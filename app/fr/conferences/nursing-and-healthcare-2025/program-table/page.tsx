import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tableau du programme",
  description:
    "Programme détaillé de la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/program-table",
  locale: "fr",
});

export default function ProgramTablePageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Tableau du programme</h1>
      <p className="mt-4 text-slate-600">
        Programme détaillé des sessions, ateliers et présentations de la conférence Avancer en
        soins infirmiers et en santé : un dialogue mondial (28–30 novembre 2025).
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025/conference-main-page" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Page principale de la conférence
      </Link>
    </div>
  );
}
