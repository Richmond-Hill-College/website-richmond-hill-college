import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
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
import { getRequestLocaleFromHeaders, withLocale } from "@/lib/i18n-routing";

export const metadata: Metadata = createPageMetadata({
  title: "Sitemap",
  description:
    "Complete list of pages on Richmond Hill College of Healthcare and Technology Management. Find programs, courses, conferences, and contact information.",
  path: "sitemap",
});

export default async function SitemapPage() {
  const locale = getRequestLocaleFromHeaders(headers());
  const copy =
    locale === "fr"
      ? {
          title: "Plan du site",
          intro: "Toutes les pages de Richmond Hill College of Healthcare and Technology Management.",
          mainPages: "Pages principales",
          faq: "FAQ",
          faqAll: "FAQ (toutes les questions)",
          faqByCategory: "FAQ par categorie",
          courseCategories: "Categories de cours",
          allCourseCategories: "Toutes les categories de cours",
          courseDetailPages: "Pages de details des cours",
          products: "Produits",
          allProducts: "Tous les produits",
          machineReadable: "Plan du site lisible par machine",
        }
      : {
          title: "Sitemap",
          intro: "All pages on Richmond Hill College of Healthcare and Technology Management.",
          mainPages: "Main pages",
          faq: "FAQ",
          faqAll: "FAQ (all questions)",
          faqByCategory: "FAQ by category",
          courseCategories: "Course categories",
          allCourseCategories: "All course categories",
          courseDetailPages: "Course detail pages",
          products: "Products",
          allProducts: "All products",
          machineReadable: "Machine-readable sitemap",
        };

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
      <h1 className="text-3xl font-bold text-slate-900">{copy.title}</h1>
      <p className="mt-2 text-slate-600">
        {copy.intro}
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">{copy.mainPages}</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          {staticRoutes.map(({ path, label }) => (
            <li key={path || "home"}>
              <Link
                href={withLocale(path ? `/${path}` : "/", locale)}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">{copy.faq}</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>
            <Link
              href={withLocale("/faq", locale)}
              className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
            >
              {copy.faqAll}
            </Link>
          </li>
          <li>
            <Link
              href={withLocale("/faq/categories", locale)}
              className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
            >
              {copy.faqByCategory}
            </Link>
          </li>
          {faqCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={withLocale(`/faq/category/${cat.slug}`, locale)}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {cat.name} ({cat.count})
              </Link>
            </li>
          ))}
          {FAQ_ENTRIES.map((e) => (
            <li key={e.slug}>
              <Link
                href={withLocale(`/faq/${e.slug}`, locale)}
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
            <h2 className="text-lg font-semibold text-slate-800">{copy.courseCategories}</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              <li>
                <Link
                  href={withLocale("/courses/categories", locale)}
                  className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                >
                  {copy.allCourseCategories}
                </Link>
              </li>
              {courseCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={withLocale(`/courses/category/${cat.slug}`, locale)}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-800">{copy.courseDetailPages}</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              {courseList.map((c) => (
                <li key={c.id}>
                  <Link
                    href={withLocale(`/courses/${c.slug}`, locale)}
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
            <h2 className="text-lg font-semibold text-slate-800">{copy.products}</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              <li>
                <Link
                  href={withLocale("/products", locale)}
                  className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                >
                  {copy.allProducts}
                </Link>
              </li>
              {productCategories.map(({ category, label, count }) => (
                <li key={category}>
                  <Link
                    href={withLocale(`/products/category/${category}`, locale)}
                    className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                  >
                    {label} ({count})
                  </Link>
                </li>
              ))}
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={withLocale(`/product/${p.id}/${p.slug}`, locale)}
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
        {copy.machineReadable}:{" "}
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
