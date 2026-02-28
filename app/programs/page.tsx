import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
} from "@/lib/rhc-global-bridge-courses";

export const metadata: Metadata = createPageMetadata({
  title: "Programs",
  description:
    "Programs at Richmond Hill College: healthcare, pharmacy, pet grooming, hair styling, and more. Browse current courses and bridging programs aligned with Canadian standards.",
  path: "programs",
  image: "/images/programs/programs-1.jpg",
  imageWidth: 800,
  imageHeight: 600,
});

export default async function ProgramsPage() {
  const courses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );

  const categories = Array.from(
    new Set(courses.map((c) => c.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Programs at Richmond Hill College
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            We offer a variety of programs and courses designed to equip you with
            Canadian-recognized skills. Our current offerings span healthcare, animal care,
            beauty and aesthetics, skilled trades, and more—with online, hybrid, and
            in-person options.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/programs/programs-1.jpg"
            alt="Healthcare and professional programs at Richmond Hill College of Healthcare and Technology Management"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <section className="mt-16" aria-labelledby="our-programs-heading">
        <h2 id="our-programs-heading" className="text-2xl font-bold text-slate-900">
          Our current programs
        </h2>
        <p className="mt-2 text-slate-600">
          The following program areas and courses are currently available. Each links to
          details and registration on RHC Global Bridge.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Link
                key={cat}
                href={`/courses?category=${encodeURIComponent(cat)}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                {cat}
              </Link>
            ))
          ) : (
            <span className="text-slate-500">Loading categories…</span>
          )}
        </div>
        <Link
          href="/course-offerings"
          className="mt-6 inline-block font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          View all course offerings →
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900">
          Flexible learning formats
        </h2>
        <p className="mt-4 text-slate-600">
          We offer online, hybrid, and in-person options so you can learn in a way that
          fits your schedule. Course details and format are listed on each program page
          on <a href="https://www.rhcglobalbridge.com/courses/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 underline hover:no-underline">RHC Global Bridge</a>.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="bridge-heading">
        <h2 id="bridge-heading" className="text-2xl font-bold text-slate-900">
          International bridge programs
        </h2>
        <p className="mt-4 text-slate-600">
          Our bridging programs help internationally educated professionals adapt their
          qualifications to Canadian standards. Explore options by category on our{" "}
          <Link href="/bridging-programs" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Bridging Programs
          </Link>{" "}
          page, then choose a specific course from the list.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Ready to take the next step?</h2>
        <p className="mt-2 text-slate-600">
          Browse our current courses or contact us for help choosing a program.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/course-offerings"
            className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium"
          >
            View course offerings
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
