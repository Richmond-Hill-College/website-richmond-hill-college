import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { getFaqCategories } from "@/lib/faq";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ par catégorie",
  description:
    "Parcourez les questions fréquentes par thème : admissions, inscription, frais, conférences. Réponses sur le Collège Richmond Hill.",
  path: "faq/categories",
  locale: "fr",
});

export default function FaqCategoriesPageFr() {
  const categories = getFaqCategories("fr");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/fr/faq" className="hover:text-slate-900">
              FAQ
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">Catégories</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        FAQ par catégorie
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Choisissez un thème pour voir les questions et réponses associées au Collège Richmond Hill.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/fr/faq/category/${cat.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="mt-1 block text-sm text-slate-500">
                {cat.count} question{cat.count !== 1 ? "s" : ""}
              </span>
              <span className="mt-2 inline-block text-sm font-medium text-slate-700">
                Voir les questions →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        <Link href="/fr/faq" className="text-slate-600 hover:text-slate-900">
          ← Toute la FAQ
        </Link>
      </p>
    </div>
  );
}
