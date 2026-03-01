import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourseCategories,
  getCoursesByCategorySlug,
} from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getCourseCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCourseCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };

  const path = `courses/category/${slug}`;
  return createPageMetadata({
    title: `${cat.name} – Courses`,
    description: `Browse ${cat.count} bridging program${cat.count !== 1 ? "s" : ""} in ${cat.name} at Richmond Hill College. Register on RHC Global Bridge.`,
    path,
  });
}

export default async function CourseCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, courses] = await Promise.all([
    getCourseCategories(),
    getCoursesByCategorySlug(slug),
  ]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat || courses.length === 0) notFound();

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
          <li>
            <Link href="/courses/categories" className="hover:text-slate-900">
              Categories
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{cat.name}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        {cat.name}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        {cat.count} bridging program{cat.count !== 1 ? "s" : ""} in this category.
        Select a course to view details and register on RHC Global Bridge.
      </p>

      <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <li
            key={course.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
          >
            <Link
              href={`/courses/${course.slug}`}
              className="flex flex-col"
              aria-label={`View ${course.name} course details`}
            >
              <div className="relative w-full flex-shrink-0 bg-slate-100 aspect-[16/10] overflow-hidden">
                <Image
                  src={course.image}
                  alt={`${course.name} – ${cat.name} course at Richmond Hill College`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700">
                  {course.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  {course.duration && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200/60">
                      {course.duration}
                    </span>
                  )}
                  {course.price && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-800 ring-1 ring-slate-200/60">
                      {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 group-hover:text-slate-600">
                  View details
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link href="/courses/categories" className="text-slate-600 hover:text-slate-900">
          ← All categories
        </Link>
      </p>
    </div>
  );
}
