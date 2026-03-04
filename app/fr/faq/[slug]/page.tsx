import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqBySlug, getFaqSlugs } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import { FaqQuestionJsonLd } from "@/components/FaqJsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getFaqSlugs("fr").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFaqBySlug(slug, "fr");
  if (!entry) return { title: "FAQ introuvable" };

  const description =
    entry.answer.slice(0, 155).replace(/\s+\S*$/, "") + (entry.answer.length > 155 ? "…" : "");

  return createPageMetadata({
    title: entry.question,
    description,
    path: `faq/${slug}`,
    locale: "fr",
  });
}

export default async function FaqSlugPageFr({ params }: Props) {
  const { slug } = await params;
  const entry = getFaqBySlug(slug, "fr");
  if (!entry) notFound();

  return (
    <>
      <FaqQuestionJsonLd question={entry.question} answer={entry.answer} slug={entry.slug} locale="fr" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/fr/faq" className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Toute la FAQ
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {entry.category && (
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              {entry.category}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {entry.question}
          </h1>
          <div className="mt-6 prose prose-slate max-w-none text-slate-600 prose-p:leading-relaxed">
            <p>{entry.answer}</p>
          </div>
        </article>

        <nav className="mt-8 flex justify-between border-t border-slate-200 pt-6">
          <Link href="/fr/faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Toute la FAQ
          </Link>
          <Link href="/fr/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Nous joindre
          </Link>
        </nav>
      </div>
    </>
  );
}
