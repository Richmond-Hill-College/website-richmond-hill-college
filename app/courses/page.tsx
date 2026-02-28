import type { Metadata } from "next";
import Link from "next/link";
import { getRhcCourses, RHC_GLOBAL_BRIDGE_COURSES_FALLBACK } from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";
import { CourseFilters } from "@/components/CourseFilters";

export const metadata: Metadata = createPageMetadata({
  title: "Courses",
  description:
    "Browse bridging programs and courses at Richmond Hill College: healthcare, hospitality, skilled trades, IT, beauty, and more. Each course links to details and registration on RHC Global Bridge.",
  path: "courses",
});

type Props = { searchParams: Promise<{ category?: string }> };

export default async function CoursesIndexPage({ searchParams }: Props) {
  const courses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const { category: categoryParam } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Courses
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
        Professional bridging programs aligned with Canadian standards. Select a
        course to view details and register on RHC Global Bridge.
      </p>

      <p className="mt-2">
        <Link
          href="/courses/categories"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Browse by category →
        </Link>
      </p>

      <CourseFilters courses={courses} initialCategory={categoryParam ?? ""} />

      <div className="mt-10 tablet:mt-12">
        <Link
          href="/my-account"
          className="inline-block text-slate-600 hover:text-slate-900"
        >
          Log in or register on RHC Global Bridge
        </Link>
      </div>
    </div>
  );
}
