import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { FAQ_ENTRIES, getAllFaqs } from "@/lib/faq";
import { FaqPageJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers on how to apply, register for courses, pay tuition, check deadlines, and meet admission requirements at Richmond Hill College of Healthcare and Technology Management.",
  path: "faq",
});

export default function FaqPage() {
  const byCategory = getAllFaqs(true) as Record<string, typeof FAQ_ENTRIES>;
  const categories = Object.keys(byCategory).sort();

  return (
    <>
      <FaqPageJsonLd entries={FAQ_ENTRIES} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Answers to common questions about applying, registering, fees, deadlines, and more at
          Richmond Hill College.
        </p>

        <p className="mt-2">
          <Link
            href="/faq/categories"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Browse by category →
          </Link>
        </p>

        <nav className="mt-10 flex flex-wrap gap-2" aria-label="FAQ categories">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
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
              id={category.toLowerCase().replace(/\s+/g, "-")}
              aria-labelledby={`heading-${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h2
                id={`heading-${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xl font-semibold text-slate-800"
              >
                {category}
              </h2>
              <ul className="mt-4 space-y-4">
                {byCategory[category].map((entry) => (
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
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">Still have questions?</h2>
          <p className="mt-2 text-slate-600">
            Contact us for help with applications, registration, or program details.
          </p>
          <Link
            href="/contact"
            className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </>
  );
}
