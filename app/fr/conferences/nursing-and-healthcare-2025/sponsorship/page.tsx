import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Commandites",
  description:
    "Options de commandite pour la conférence Soins infirmiers et santé 2025. Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/sponsorship",
  locale: "fr",
});

export default function SponsorshipPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Commandites</h1>
      <p className="mt-4 text-slate-600">
        Découvrez les possibilités de commandite pour la conférence Avancer en soins infirmiers et
        en santé : un dialogue mondial. Pour les forfaits et tarifs, communiquez avec notre équipe.
      </p>
      <Link href="/fr/conferences/nursing-and-healthcare-2025/contact-1" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Nous joindre
      </Link>
    </div>
  );
}
