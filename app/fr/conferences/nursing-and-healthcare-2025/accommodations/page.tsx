import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  index: false,
  title: "Hébergement",
  description:
    "Options d'hébergement pour la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/accommodations",
  locale: "fr",
});

export default function AccommodationsPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <aside className="my-6 rounded-xl border border-sky-200 bg-sky-50 p-5 text-slate-700">Archives de la conférence 2025. Les inscriptions, demandes de lettres et soumissions sont closes. Les renseignements ci-dessous sont historiques.</aside>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Hébergement</h1>
      <p className="mt-4 text-slate-600">
        Informations sur l&apos;hébergement à Toronto pour la conférence (28–30 novembre 2025).
        Des tarifs préférentiels peuvent être disponibles ; contactez-nous pour plus de détails.
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025/contact-1" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Contact
      </Link>
    </div>
  );
}
