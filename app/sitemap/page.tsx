import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { staticRoutes } from "@/lib/sitemap-routes";
import { getAllProducts, getProductCategories } from "@/lib/products";
import {
  getRhcCourses,
  getCourseCategories,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
} from "@/lib/rhc-global-bridge-courses";
import { FAQ_ENTRIES, getFaqCategories } from "@/lib/faq";

export const metadata: Metadata = createPageMetadata({
  title: "Sitemap",
  description:
    "Complete list of pages on Richmond Hill College of Healthcare and Technology Management. Find programs, courses, conferences, and contact information.",
  path: "sitemap",
});

export default async function SitemapPage() {
  const [products, courseList, courseCategories, productCategories, faqCategories] =
    await Promise.all([
      Promise.resolve(getAllProducts()),
      getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK),
      getCourseCategories(),
      Promise.resolve(getProductCategories()),
      Promise.resolve(getFaqCategories()),
    ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Sitemap</h1>
      <p className="mt-2 text-slate-600">
        All pages on Richmond Hill College of Healthcare and Technology Management.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">Main pages</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          {staticRoutes.map(({ path, label }) => (
            <li key={path || "home"}>
              <Link
                href={path ? `/${path}` : "/"}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">FAQ</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>
            <Link
              href="/faq"
              className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
            >
              FAQ (all questions)
            </Link>
          </li>
          <li>
            <Link
              href="/faq/categories"
              className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
            >
              FAQ by category
            </Link>
          </li>
          {faqCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/faq/category/${cat.slug}`}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {cat.name} ({cat.count})
              </Link>
            </li>
          ))}
          {FAQ_ENTRIES.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/faq/${e.slug}`}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {e.question}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {courseList.length > 0 && (
        <>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800">Course categories</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              <li>
                <Link
                  href="/courses/categories"
                  className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                >
                  All course categories
                </Link>
              </li>
              {courseCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/courses/category/${cat.slug}`}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800">Course detail pages</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              {courseList.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {products.length > 0 && (
        <>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800">Products</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              <li>
                <Link
                  href="/products"
                  className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                >
                  All products
                </Link>
              </li>
              {productCategories.map(({ category, label, count }) => (
                <li key={category}>
                  <Link
                    href={`/products/category/${category}`}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {label} ({count})
                  </Link>
                </li>
              ))}
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}/${p.slug}`}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <p className="mt-12 text-sm text-slate-500">
        Machine-readable sitemap:{" "}
        <a
          href={`${siteUrl}/sitemap.xml`}
          className="text-slate-600 underline hover:text-slate-800"
        >
          sitemap.xml
        </a>
      </p>
    </div>
  );
}
