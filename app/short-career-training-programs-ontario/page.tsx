import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { GENERATED_VISUALS } from "@/lib/generated-visuals";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
  type RhcCourse,
} from "@/lib/rhc-global-bridge-courses";

const pagePath = "short-career-training-programs-ontario";

export const metadata: Metadata = createPageMetadata({
  title: "Short Career Training Programs in Ontario",
  description:
    "Explore short career training at Richmond Hill College, including 10- to 40-hour programs in healthcare, technology, hospitality, trades and more.",
  path: pagePath,
  image: GENERATED_VISUALS.studentSuccess.src,
  imageWidth: 1672,
  imageHeight: 941,
});

function getCourseHours(course: RhcCourse): number | null {
  const match = course.duration.match(/^(\d+) Hours$/i);
  return match ? Number(match[1]) : null;
}

function cleanCategoryName(category: string): string {
  return category.replace(/^\d+\s*-\s*/, "");
}

export default async function ShortCareerTrainingProgramsOntarioPage() {
  const courses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const shortCourses = courses
    .filter((course) => {
      const hours = getCourseHours(course);
      return hours !== null && hours >= 10 && hours <= 40;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const coursesByCategory = new Map<string, RhcCourse[]>();
  for (const course of shortCourses) {
    const category = cleanCategoryName(course.category || "Other programs");
    const categoryCourses = coursesByCategory.get(category) ?? [];
    categoryCourses.push(course);
    coursesByCategory.set(category, categoryCourses);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby="page-heading">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Career-focused learning in Ontario
          </p>
          <h1 id="page-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-5xl">
            Short Career Training Programs in Ontario
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Build focused, Canadian workplace-relevant skills without repeating a full degree.
            Richmond Hill College offers current programs with verified durations from 10 to 40
            hours across healthcare, technology, hospitality, skilled trades, animal care, and
            beauty.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#current-programs" className="cta-primary rounded-md px-5 py-2.5 text-sm font-medium">
              Explore short programs
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Ask about a program
            </Link>
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <Image
            src={GENERATED_VISUALS.studentSuccess.src}
            alt={GENERATED_VISUALS.studentSuccess.alt.en}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mt-16" aria-labelledby="focused-training-heading">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.targetedTraining.src}
              alt={GENERATED_VISUALS.targetedTraining.alt.en}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 id="focused-training-heading" className="mt-4 text-xl font-bold text-slate-900">
              Targeted skills training
            </h2>
            <p className="mt-2 text-slate-600">
              Choose a focused program that builds on your goals, experience, and preferred
              career area.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.flexibleSchedule.src}
              alt={GENERATED_VISUALS.flexibleSchedule.alt.en}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Clear program durations</h2>
            <p className="mt-2 text-slate-600">
              Compare current 10- to 40-hour options and select a program that fits the time you
              can commit.
            </p>
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] bg-slate-100">
              <Image
                src={GENERATED_VISUALS.onlineLearningHome.src}
                alt={GENERATED_VISUALS.onlineLearningHome.alt.en}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">Flexible learning options</h2>
              <p className="mt-2 text-slate-600">
                Richmond Hill College offers online, hybrid, and in-person learning. Check the
                individual course page for its current delivery format.
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.financialGuidance.src}
              alt={GENERATED_VISUALS.financialGuidance.alt.en}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Compare current details</h2>
            <p className="mt-2 text-slate-600">
              Review each course page for its published duration, current price, and registration information.
            </p>
          </article>
        </div>
      </section>

      <section id="current-programs" className="mt-16 scroll-mt-24" aria-labelledby="current-programs-heading">
        <h2 id="current-programs-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Explore Current 10- to 40-Hour Programs
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          The programs below are selected from the current Richmond Hill College catalog using
          their published duration. Open a course to review its details and registration link.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {Array.from(coursesByCategory.entries()).map(([category, categoryCourses]) => (
            <article key={category} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-slate-900">{category}</h3>
              <ul className="mt-4 space-y-3">
                {categoryCourses.map((course) => (
                  <li key={course.id} className="flex items-start justify-between gap-4 border-t border-slate-200 pt-3 first:border-0 first:pt-0">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                    >
                      {course.name}
                    </Link>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      {course.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-8 sm:py-10" aria-labelledby="next-step-heading">
        <h2 id="next-step-heading" className="text-2xl font-bold">Choose Your Next Step</h2>
        <p className="mt-3 max-w-3xl text-slate-200">
          Browse every course, compare broader bridging pathways, or contact Richmond Hill
          College for help finding a program that matches your goals.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/courses" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Browse all courses
          </Link>
          <Link href="/bridging-programs" className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            View bridging programs
          </Link>
          <Link href="/programs" className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Explore program areas
          </Link>
        </div>
      </section>
    </div>
  );
}
