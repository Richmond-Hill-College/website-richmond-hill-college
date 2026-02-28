import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqBySlug, getFaqSlugs } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import { FaqQuestionJsonLd } from "@/components/FaqJsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getFaqSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFaqBySlug(slug);
  if (!entry) return { title: "FAQ Not Found" };

  const description =
    entry.answer.slice(0, 155).replace(/\s+\S*$/, "") + (entry.answer.length > 155 ? "…" : "");

  return createPageMetadata({
    title: entry.question,
    description,
    path: `faq/${slug}`,
  });
}

export default async function FaqSlugPage({ params }: Props) {
  const { slug } = await params;
  const entry = getFaqBySlug(slug);
  if (!entry) notFound();

  return (
    <>
      <FaqQuestionJsonLd question={entry.question} answer={entry.answer} slug={entry.slug} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/faq"
          className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← All FAQs
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
          <Link
            href="/faq"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            All FAQs
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Contact us
          </Link>
        </nav>
      </div>
    </>
  );
}
