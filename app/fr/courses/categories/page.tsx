import type { Metadata } from "next";
import Link from "next/link";
import { getCourseCategories } from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Catégories de cours",
  description:
    "Parcourez les cours du Collège Richmond Hill par catégorie : santé, beauté, soins aux animaux, métiers et plus. Programmes de transition alignés sur les normes canadiennes.",
  path: "courses/categories",
  locale: "fr",
});

export default async function CourseCategoriesPageFr() {
  const categories = await getCourseCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/fr/courses" className="hover:text-slate-900">
              Cours
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">Catégories</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Catégories de cours
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        Explorez nos programmes de transition par domaine. Chaque catégorie mène aux cours
        que vous pouvez consulter et pour lesquels vous inscrire sur RHC Global Bridge.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 tablet:gap-5 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/fr/courses/category/${cat.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="mt-1 block text-sm text-slate-500">
                {cat.count} cours
              </span>
              <span className="mt-2 inline-block text-sm font-medium text-slate-700">
                Voir les cours →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link href="/fr/courses" className="text-slate-600 hover:text-slate-900">
          ← Cours
        </Link>
      </p>
    </div>
  );
}
