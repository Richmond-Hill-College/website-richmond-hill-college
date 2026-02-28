import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqCategories, getFaqsByCategorySlug } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = getFaqCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = getFaqCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "FAQ Category | Richmond Hill College" };

  const path = `faq/category/${slug}`;
  return createPageMetadata({
    title: `${cat.name} – FAQ`,
    description: `Frequently asked questions about ${cat.name.toLowerCase()} at Richmond Hill College. ${cat.count} question${cat.count !== 1 ? "s" : ""} and answers.`,
    path,
  });
}

export default async function FaqCategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = getFaqCategories();
  const cat = categories.find((c) => c.slug === slug);
  const entries = getFaqsByCategorySlug(slug);

  if (!cat || entries.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/faq" className="hover:text-slate-900">
              FAQ
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/faq/categories" className="hover:text-slate-900">
              Categories
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
        {entries.length} question{entries.length !== 1 ? "s" : ""} in this category.
      </p>

      <ul className="mt-10 space-y-4 list-none p-0">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/faq/${entry.slug}`}
              className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <span className="font-medium text-slate-900">{entry.question}</span>
              <span className="mt-1 block text-sm text-slate-500">
                Read answer →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        <Link href="/faq/categories" className="text-slate-600 hover:text-slate-900">
          ← All categories
        </Link>
      </p>
    </div>
  );
}
