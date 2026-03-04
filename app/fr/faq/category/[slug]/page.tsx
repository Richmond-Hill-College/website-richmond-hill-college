import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqCategories, getFaqsByCategorySlug } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = getFaqCategories("fr");
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = getFaqCategories("fr");
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Catégorie FAQ | Richmond Hill College" };

  const path = `faq/category/${slug}`;
  return createPageMetadata({
    title: `${cat.name} – FAQ`,
    description: `Questions fréquentes sur ${cat.name.toLowerCase()} au Collège Richmond Hill. ${cat.count} question${cat.count !== 1 ? "s" : ""} et réponses.`,
    path,
    locale: "fr",
  });
}

export default async function FaqCategoryPageFr({ params }: Props) {
  const { slug } = await params;
  const categories = getFaqCategories("fr");
  const cat = categories.find((c) => c.slug === slug);
  const entries = getFaqsByCategorySlug(slug, "fr");

  if (!cat || entries.length === 0) notFound();

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
          <li>
            <Link href="/fr/faq/categories" className="hover:text-slate-900">
              Catégories
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{cat.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {cat.name}
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        {entries.length} question{entries.length !== 1 ? "s" : ""} dans cette catégorie.
      </p>

      <ul className="mt-8 list-none space-y-4 p-0">
        {entries.map((entry) => (
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

      <p className="mt-10">
        <Link href="/fr/faq" className="text-slate-600 hover:text-slate-900">
          ← Toute la FAQ
        </Link>
      </p>
    </div>
  );
}
