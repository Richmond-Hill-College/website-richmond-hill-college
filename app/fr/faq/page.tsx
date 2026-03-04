import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { FAQ_ENTRIES_FR, getAllFaqs, getFaqCategorySlug } from "@/lib/faq";
import { FaqPageJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Questions fréquentes",
  description:
    "Réponses sur comment postuler, s'inscrire aux cours, payer les frais, consulter les délais et répondre aux exigences d'admission au Collège Richmond Hill.",
  path: "faq",
  locale: "fr",
});

export default function FaqPageFr() {
  const byCategory = getAllFaqs(true, "fr") as Record<string, typeof FAQ_ENTRIES_FR>;
  const categories = Object.keys(byCategory).sort();

  return (
    <>
      <FaqPageJsonLd entries={FAQ_ENTRIES_FR} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Questions fréquentes
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Réponses aux questions courantes sur les inscriptions, les frais, les délais et plus
          au Collège Richmond Hill.
        </p>

        <p className="mt-2">
          <Link href="/fr/faq/categories" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Parcourir par catégorie →
          </Link>
        </p>

        <nav className="mt-10 flex flex-wrap gap-2" aria-label="Catégories FAQ">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${getFaqCategorySlug(cat)}`}
              className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
            >
              {cat}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-14">
          {categories.map((category) => (
            <section
              key={category}
              id={getFaqCategorySlug(category)}
              aria-labelledby={`heading-${getFaqCategorySlug(category)}`}
            >
              <h2
                id={`heading-${getFaqCategorySlug(category)}`}
                className="text-xl font-semibold text-slate-800"
              >
                {category}
              </h2>
              <ul className="mt-4 space-y-4">
                {byCategory[category].map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/fr/faq/${entry.slug}`}
                      className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow"
                    >
                      <span className="font-medium text-slate-900">{entry.question}</span>
                      <span className="mt-1 block text-sm text-slate-500">
                        Lire la réponse →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">D&apos;autres questions ?</h2>
          <p className="mt-2 text-slate-600">
            Communiquez avec nous pour l&apos;aide aux demandes, inscriptions ou détails des programmes.
          </p>
          <Link href="/fr/contact" className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium">
            Nous joindre
          </Link>
        </section>
      </div>
    </>
  );
}
