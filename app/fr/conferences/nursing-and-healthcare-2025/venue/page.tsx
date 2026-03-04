import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Lieu",
  description:
    "Lieu de la conférence Soins infirmiers et santé 2025. Toronto, Canada, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/venue",
  locale: "fr",
});

export default function VenuePageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Lieu</h1>
      <p className="mt-4 text-slate-600">
        La conférence Avancer en soins infirmiers et en santé : un dialogue mondial se tiendra
        à Toronto, Canada, du 28 au 30 novembre 2025. Les détails du lieu précis seront communiqués
        aux participants inscrits.
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Détails de la conférence
      </Link>
    </div>
  );
}
