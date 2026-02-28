import type { Metadata } from "next";
import Link from "next/link";
import { getFaqCategories } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ by Category",
  description:
    "Browse frequently asked questions by topic: admissions, registration, fees, conferences. Find answers about applying, enrolling, and paying at Richmond Hill College.",
  path: "faq/categories",
});

export default function FaqCategoriesPage() {
  const categories = getFaqCategories();

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
          <li className="font-medium text-slate-900">Categories</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        FAQ by Category
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Choose a topic to see related questions and answers about Richmond Hill College.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/faq/category/${cat.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="mt-1 block text-sm text-slate-500">
                {cat.count} question{cat.count !== 1 ? "s" : ""}
              </span>
              <span className="mt-2 inline-block text-sm font-medium text-slate-700">
                View questions →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        <Link href="/faq" className="text-slate-600 hover:text-slate-900">
          ← All FAQ
        </Link>
      </p>
    </div>
  );
}
