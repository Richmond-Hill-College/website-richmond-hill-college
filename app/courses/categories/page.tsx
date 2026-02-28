import type { Metadata } from "next";
import Link from "next/link";
import { getCourseCategories } from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Course Categories",
  description:
    "Browse Richmond Hill College courses by category: healthcare, beauty, animal care, skilled trades, and more. Find bridging programs aligned with Canadian standards.",
  path: "courses/categories",
});

export default async function CourseCategoriesPage() {
  const categories = await getCourseCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/courses" className="hover:text-slate-900">
              Courses
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">Categories</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Course Categories
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        Explore our bridging programs by area of study. Each category links to courses
        you can view and register for on RHC Global Bridge.
      </p>

      <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 tablet:gap-5 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/courses/category/${cat.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="mt-1 block text-sm text-slate-500">
                {cat.count} course{cat.count !== 1 ? "s" : ""}
              </span>
              <span className="mt-2 inline-block text-sm font-medium text-slate-700">
                View courses →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link
          href="/courses"
          className="text-slate-600 hover:text-slate-900"
        >
          ← Back to all courses
        </Link>
      </p>
    </div>
  );
}
