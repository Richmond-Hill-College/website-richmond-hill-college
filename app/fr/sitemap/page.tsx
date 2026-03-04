import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { staticRoutes } from "@/lib/sitemap-routes";
import { getAllProducts } from "@/lib/products";
import {
  getRhcCourses,
  getCourseCategories,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
} from "@/lib/rhc-global-bridge-courses";
import { FAQ_ENTRIES_FR, getFaqCategories } from "@/lib/faq";

export const metadata: Metadata = createPageMetadata({
  title: "Plan du site",
  description:
    "Liste complète des pages du Collège Richmond Hill de gestion des soins de santé et de la technologie. Programmes, cours, conférences et contact.",
  path: "sitemap",
  locale: "fr",
});

export default async function SitemapPageFr() {
  const [products, courseList, courseCategories, faqCategories] =
    await Promise.all([
      Promise.resolve(getAllProducts()),
      getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK),
      getCourseCategories(),
      Promise.resolve(getFaqCategories("fr")),
    ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Plan du site</h1>
      <p className="mt-2 text-slate-600">
        Toutes les pages du Collège Richmond Hill de gestion des soins de santé et de la technologie.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">Français</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          {staticRoutes.map(({ path, labelFr }) => (
            <li key={path || "home"}>
              <Link
                href={path ? `/fr/${path}` : "/fr"}
                className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {labelFr}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">English</h2>
        <p className="mt-1 text-sm text-slate-600">
          <Link href="/sitemap" className="text-slate-600 underline hover:text-slate-800">
            View sitemap in English
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-800">FAQ</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>
            <Link href="/fr/faq" className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
              FAQ (toutes les questions)
            </Link>
          </li>
          <li>
            <Link href="/fr/faq/categories" className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
              FAQ par catégorie
            </Link>
          </li>
          {faqCategories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/fr/faq/category/${cat.slug}`} className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                {cat.name} ({cat.count})
              </Link>
            </li>
          ))}
          {FAQ_ENTRIES_FR.map((e) => (
            <li key={e.slug}>
              <Link href={`/fr/faq/${e.slug}`} className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                {e.question}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {courseList.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800">Cours</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
            <li>
              <Link href="/fr/courses" className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                Tous les cours
              </Link>
            </li>
            {courseCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/fr/courses/category/${cat.slug}`} className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                  {cat.name} ({cat.count})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {products.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-800">Produits</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
            <li>
              <Link href="/fr/products" className="text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                Tous les produits
              </Link>
            </li>
          </ul>
        </section>
      )}

      <p className="mt-12 text-sm text-slate-500">
        Fichier sitemap :{" "}
        <a href={`${siteUrl}/sitemap.xml`} className="text-slate-600 underline hover:text-slate-800">
          sitemap.xml
        </a>
      </p>
    </div>
  );
}
