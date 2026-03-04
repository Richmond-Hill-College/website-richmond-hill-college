import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page principale de la conférence",
  description:
    "Page principale de la conférence Soins infirmiers et santé 2025. Avancer en soins infirmiers et en santé : un dialogue mondial, Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/conference-main-page",
  locale: "fr",
});

export default function ConferenceMainPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Page principale de la conférence</h1>
      <p className="mt-4 text-slate-600">
        Détails complets de la conférence, programme et programme scientifique pour la conférence
        Avancer en soins infirmiers et en santé : un dialogue mondial (28–30 novembre 2025, Toronto).
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="mt-6 inline-block font-medium text-slate-800 hover:underline">
        Voir l&apos;aperçu de la conférence
      </Link>
    </div>
  );
}
