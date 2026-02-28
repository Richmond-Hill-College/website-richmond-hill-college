import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductByIdAndSlug,
  getAllProducts,
  type ProductItem,
} from "@/lib/products";

type Props = { params: Promise<{ id: string; slug: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const product = getProductByIdAndSlug(id, slug);
  if (!product) return { title: "Product | Richmond Hill College" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id, slug } = await params;
  const product = getProductByIdAndSlug(id, slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025/registration"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Conference Registration
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{product.title}</h1>
      <p className="mt-4 text-slate-600">{product.description}</p>
      <p className="mt-4 text-slate-600">
        Complete your registration or purchase through the checkout. For questions, please
        contact us.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Contact Us
        </Link>
        <Link
          href="/conferences/nursing-and-healthcare-2025"
          className="inline-block font-medium text-slate-800 hover:underline"
        >
          Conference details
        </Link>
      </div>
    </div>
  );
}
