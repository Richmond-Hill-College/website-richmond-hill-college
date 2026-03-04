import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Lettre d'invitation",
  description:
    "Demande de lettre d'invitation pour la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/invitation-letter",
  locale: "fr",
});

export default function InvitationLetterPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Lettre d&apos;invitation</h1>
      <p className="mt-4 text-slate-600">
        Les participants inscrits peuvent demander une lettre d&apos;invitation pour les démarches
        de visa. Communiquez avec nous pour en faire la demande.
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025/contact-1" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Contact conférence
      </Link>
    </div>
  );
}
