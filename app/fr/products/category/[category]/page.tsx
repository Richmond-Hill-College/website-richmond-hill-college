import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductCategories,
  getProductsByCategory,
  type ProductCategory,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

const CATEGORY_LABELS_FR: Record<ProductCategory, string> = {
  registration: "Inscription",
  sponsorship: "Commandites",
  payment: "Paiement",
};

type Props = { params: Promise<{ category: string }> };

const VALID_CATEGORIES: ProductCategory[] = ["registration", "sponsorship", "payment"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory))
    return { title: "Catégorie | Richmond Hill College" };
  const label = CATEGORY_LABELS_FR[category as ProductCategory];
  const path = `products/category/${category}`;
  return createPageMetadata({
    title: `${label} – Produits`,
    description: `Options ${label.toLowerCase()} pour les conférences et événements au Collège Richmond Hill. Inscription ou achat sur RHC Global Bridge.`,
    path,
    locale: "fr",
  });
}

export default async function ProductCategoryPageFr({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory)) notFound();

  const categories = getProductCategories();
  const catMeta = categories.find((c) => c.category === category);
  const products = getProductsByCategory(category as ProductCategory);
  const label = CATEGORY_LABELS_FR[category as ProductCategory];

  if (!catMeta || products.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/fr/products" className="hover:text-slate-900">
              Produits
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{label}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        {label}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        {products.length} produit{products.length !== 1 ? "s" : ""} dans cette catégorie.
        Sélectionnez-en un pour voir les détails et compléter l&apos;inscription ou le paiement sur RHC Global Bridge.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 tablet:gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id}>
            <Link
              href={`/fr/product/${p.id}/${p.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <h2 className="font-semibold text-slate-900">{p.title}</h2>
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

      <p className="mt-10 tablet:mt-12">
        <Link href="/fr/products" className="text-slate-600 hover:text-slate-900">
          ← Tous les produits
        </Link>
      </p>
    </div>
  );
}
