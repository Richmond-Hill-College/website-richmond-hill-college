import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductCategories,
  getProductsByCategory,
  type ProductCategory,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  registration: "Registration",
  sponsorship: "Sponsorship",
  payment: "Payment",
};

type Props = { params: Promise<{ category: string }> };

const VALID_CATEGORIES: ProductCategory[] = ["registration", "sponsorship", "payment"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory))
    return { title: "Category | Richmond Hill College" };
  const label = CATEGORY_LABELS[category as ProductCategory];
  const path = `products/category/${category}`;
  return createPageMetadata({
    title: `${label} – Products`,
    description: `Browse ${label.toLowerCase()} options for conferences and events at Richmond Hill College. Register or purchase on RHC Global Bridge.`,
    path,
  });
}

export default async function ProductCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory)) notFound();

  const categories = getProductCategories();
  const catMeta = categories.find((c) => c.category === category);
  const products = getProductsByCategory(category as ProductCategory);
  const label = CATEGORY_LABELS[category as ProductCategory];

  if (!catMeta || products.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/products" className="hover:text-slate-900">
              Products
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
        {products.length} product{products.length !== 1 ? "s" : ""} in this category.
        Select one to view details and complete registration or payment on RHC Global Bridge.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 tablet:gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id}>
            <Link
              href={`/product/${p.id}/${p.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <h2 className="font-semibold text-slate-900">{p.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {p.description}
              </p>
              <span className="mt-2 inline-block text-sm font-medium text-slate-800">
                View details →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link href="/products" className="text-slate-600 hover:text-slate-900">
          ← All products
        </Link>
      </p>
    </div>
  );
}
