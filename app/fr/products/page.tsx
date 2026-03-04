import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getProductCategories } from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Produits et inscription",
  description:
    "Inscription aux conférences, forfaits de commandite et options de paiement au Collège Richmond Hill. Inscrivez-vous à Soins infirmiers et santé 2025 et autres événements.",
  path: "products",
  locale: "fr",
});

export default function ProductsIndexPageFr() {
  const products = getAllProducts();
  const categories = getProductCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Produits et inscription
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        Options d&apos;inscription aux conférences, forfaits de commandite et liens de paiement.
        Choisissez une catégorie ou parcourez toutes les offres ci-dessous.
      </p>

      {categories.length > 0 && (
        <nav className="mt-8" aria-label="Catégories de produits">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Parcourir par catégorie
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3 list-none p-0">
            {categories.map(({ category, label, count }) => (
              <li key={category}>
                <Link
                  href={`/fr/products/category/${category}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow"
                >
                  {label}
                  <span className="text-slate-500">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-800">
          Tous les produits ({products.length})
        </h2>
        <ul className="mt-5 grid list-none gap-4 p-0 sm:grid-cols-2 tablet:gap-5 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/fr/product/${p.id}/${p.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {p.category}
                </span>
                <h3 className="mt-2 font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {p.description}
                </p>
                <span className="mt-2 inline-block text-sm font-medium text-slate-800">
                  Voir les détails →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 tablet:mt-12">
        <Link
          href="/fr/conferences/nursing-and-healthcare-2025/registration"
          className="text-slate-600 hover:text-slate-900"
        >
          ← Inscription à la conférence
        </Link>
      </p>
    </div>
  );
}
