import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductByIdAndSlug,
  getAllProducts,
  type ProductItem,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string; slug: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const product = getProductByIdAndSlug(id, slug);
  if (!product)
    return { title: "Product | Richmond Hill College" };
  return createPageMetadata({
    title: product.title,
    description: product.description,
    path: `product/${id}/${slug}`,
  });
}

function ProductDetails({ product }: { product: ProductItem }) {
  const hasHighlights = product.highlights && product.highlights.length > 0;
  const hasIncluded = product.whatIsIncluded && product.whatIsIncluded.length > 0;
  const hasWho = product.whoIsThisFor && product.whoIsThisFor.length > 0;
  const hasFaqs = product.faqs && product.faqs.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/conferences/nursing-and-healthcare-2025/registration"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to Conference Registration
        </Link>
      </nav>

      {/* Hero */}
      <header className="border-b border-slate-200 pb-8">
        {product.format && (
          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 mb-4">
            {product.format}
          </span>
        )}
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {product.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {product.description}
        </p>
      </header>

      {/* Long description: general → detailed */}
      {(product.longDescription ?? product.description) && (
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-bold text-slate-900">
            Overview
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {product.longDescription || product.description}
          </p>
        </section>
      )}

      {/* Highlights */}
      {hasHighlights && (
        <section aria-labelledby="highlights-heading" className="rounded-xl bg-slate-50 p-6 sm:p-8">
          <h2 id="highlights-heading" className="text-xl font-bold text-slate-900">
            Highlights
          </h2>
          <ul className="mt-4 space-y-3" role="list">
            {product.highlights!.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* What's included */}
      {hasIncluded && (
        <section aria-labelledby="included-heading">
          <h2 id="included-heading" className="text-xl font-bold text-slate-900">
            What&apos;s included
          </h2>
          <ul className="mt-4 space-y-2 text-slate-600" role="list">
            {product.whatIsIncluded!.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-slate-400" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Who is this for */}
      {hasWho && (
        <section aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-xl font-bold text-slate-900">
            Who this is for
          </h2>
          <ul className="mt-4 space-y-2 text-slate-600" role="list">
            {product.whoIsThisFor!.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-slate-400" aria-hidden>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {hasFaqs && (
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-slate-900 mb-4">
            Frequently asked questions
          </h2>
          <ul className="space-y-2">
            {product.faqs!.map((faq, i) => (
              <li key={i} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-left font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700">
                    <span>{faq.question}</span>
                    <span className="text-slate-400 transition-transform group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </summary>
                  <div className="border-t border-slate-200 px-4 py-3 text-slate-600 text-sm">
                    {faq.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTAs */}
      <section
        className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6"
        aria-label="Next steps"
      >
        <p className="w-full text-sm text-slate-600 sm:w-auto sm:flex-1">
          Complete your registration or purchase through checkout. For questions, contact us.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="cta-primary rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Contact us
          </Link>
          <Link
            href="/conferences/nursing-and-healthcare-2025"
            className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
          >
            Conference details
          </Link>
        </div>
      </section>
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const { id, slug } = await params;
  const product = getProductByIdAndSlug(id, slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductDetails product={product} />
    </div>
  );
}
