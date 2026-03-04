import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Inscription",
  description:
    "Inscription à Soins infirmiers et santé 2025. Conférence Avancer en soins infirmiers et en santé, Toronto, 28–30 novembre 2025.",
  path: "conferences/nursing-and-healthcare-2025/registration",
  locale: "fr",
});

export default function RegistrationPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/fr/conferences/nursing-and-healthcare-2025" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Retour à Soins infirmiers et santé 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Inscription</h1>
      <p className="mt-4 text-slate-600">
        Inscrivez-vous à la conférence Avancer en soins infirmiers et en santé : un dialogue mondial.
        Toronto, Canada — 28–30 novembre 2025. Tarifs hâtifs disponibles.
      </p>
      <p className="mt-4 text-slate-600">
        Choisissez votre type d&apos;inscription (présentation orale, poster, virtuel, étudiant, sans présentation)
        et complétez votre inscription via nos pages Produits et inscription.
      </p>
      <Link href="/fr/products" className="cta-primary mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium">
        Voir les options d&apos;inscription
      </Link>
    </div>
  );
}
