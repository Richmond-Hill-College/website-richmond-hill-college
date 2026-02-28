import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { CourseOfferingsWithFilters } from "@/components/CourseOfferingsWithFilters";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
  type RhcCourse,
} from "@/lib/rhc-global-bridge-courses";

export const metadata: Metadata = createPageMetadata({
  title: "Course Offerings",
  description:
    "Explore current programs and courses at Richmond Hill College: healthcare bridging, pharmacy, pet grooming, hair styling, and more. All courses align with Canadian standards.",
  path: "course-offerings",
});

export default async function CourseOfferingsPage() {
  const courses: RhcCourse[] = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Programs &amp; Courses at Richmond Hill College
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Our current course offerings are listed below. Each program is aligned with Canadian
        standards and available through Richmond Hill College Global Bridge. Choose a course
        to view details and register.
      </p>

      <CourseOfferingsWithFilters courses={courses} />

      <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/courses" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Browse all courses
          </Link>{" "}
          with filters, or{" "}
          <Link href="/contact" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            contact us
          </Link>{" "}
          for help choosing a program.
        </p>
      </div>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
