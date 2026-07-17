import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
} from "@/lib/rhc-global-bridge-courses";
import { GENERATED_VISUALS } from "@/lib/generated-visuals";

export const metadata: Metadata = createPageMetadata({
  title: "Career Programs in Richmond Hill, Ontario",
  description:
    "Explore career programs in Richmond Hill, Ontario, including healthcare, pharmacy, technology, business and bridging courses aligned with Canadian workplace standards.",
  path: "programs",
  image: GENERATED_VISUALS.technologyLearningLab.src,
  imageWidth: 1672,
  imageHeight: 941,
});

const programAreas = [
  { title: "Nursing & Patient Care", visual: GENERATED_VISUALS.nursingCare },
  { title: "Pharmacy", visual: GENERATED_VISUALS.pharmacy },
  { title: "Medical Office", visual: GENERATED_VISUALS.medicalOffice },
  { title: "Mental Health", visual: GENERATED_VISUALS.mentalHealth },
  { title: "AI & Technology", visual: GENERATED_VISUALS.aiTechnology },
  { title: "Applied AI Learning", visual: GENERATED_VISUALS.aiLearning },
  { title: "Cybersecurity", visual: GENERATED_VISUALS.cybersecurity },
  { title: "Business Leadership", visual: GENERATED_VISUALS.businessLeadership },
  { title: "Hospitality", visual: GENERATED_VISUALS.hospitality },
] as const;

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
            Career Programs in Richmond Hill, Ontario
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
            src={GENERATED_VISUALS.technologyLearningLab.src}
            alt={GENERATED_VISUALS.technologyLearningLab.alt.en}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
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

      <section className="mt-12" aria-labelledby="program-areas-heading">
        <h2 id="program-areas-heading" className="text-2xl font-bold text-slate-900">
          Explore our program areas
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Build practical, Canadian-relevant skills across healthcare, technology and professional services.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {programAreas.map(({ title, visual }) => (
            <article
              key={title}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <Image
                src={visual.src}
                alt={visual.alt.en}
                width={112}
                height={112}
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                sizes="(max-width: 640px) 80px, 96px"
              />
              <h3 className="mt-3 text-sm font-semibold text-slate-900 sm:text-base">{title}</h3>
            </article>
          ))}
        </div>
        <Link
          href="/short-career-training-programs-ontario"
          className="mt-6 inline-flex font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-[#f6520a]"
        >
          Compare short 10- to 40-hour career programs →
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900">
          Flexible learning formats
        </h2>
        <div className="mt-4 grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[96px_1fr] sm:items-center sm:p-6">
          <Image
            src={GENERATED_VISUALS.flexibleLearning.src}
            alt={GENERATED_VISUALS.flexibleLearning.alt.en}
            width={96}
            height={96}
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            sizes="96px"
          />
          <p className="text-slate-600">
            We offer online, hybrid, and in-person options so you can learn in a way that
            fits your schedule. Course details and format are listed on each program page
            on <a href="https://www.rhcglobalbridge.com/courses/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 underline hover:no-underline">RHC Global Bridge</a>.
          </p>
        </div>
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
