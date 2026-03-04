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
  title: "Offre de cours",
  description:
    "Explorez les programmes et cours du Collège Richmond Hill : programmes de transition en santé, pharmacie, toilettage, coiffure et plus. Tous alignés sur les normes canadiennes.",
  path: "course-offerings",
  locale: "fr",
});

export default async function CourseOfferingsPageFr() {
  const courses: RhcCourse[] = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Programmes et cours du Collège Richmond Hill
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Notre offre de cours actuelle est listée ci-dessous. Chaque programme est aligné sur les
        normes canadiennes et disponible via Richmond Hill College Global Bridge. Choisissez un
        cours pour voir les détails et vous inscrire.
      </p>

      <CourseOfferingsWithFilters courses={courses} localePrefix="/fr" />

      <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          Vous ne trouvez pas ce que vous cherchez ?{" "}
          <Link href="/fr/courses" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Parcourir tous les cours
          </Link>{" "}
          avec filtres, ou{" "}
          <Link href="/fr/contact" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            nous joindre
          </Link>{" "}
          pour vous aider à choisir un programme.
        </p>
      </div>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
