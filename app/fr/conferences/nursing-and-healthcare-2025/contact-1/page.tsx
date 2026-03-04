import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact conférence",
  description:
    "Contact pour la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/contact-1",
  locale: "fr",
});

export default function Contact1PageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Contact conférence</h1>
      <p className="mt-4 text-slate-600">
        Pour toute question concernant la conférence Soins infirmiers et santé 2025 (inscription,
        résumés, hébergement, commandites), communiquez avec nous.
      </p>
      <div className="mt-8">
        <ContactBlock />
      </div>
    </div>
  );
}
