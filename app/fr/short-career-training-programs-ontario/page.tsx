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
  title: "Programmes courts de formation professionnelle en Ontario",
  description:
    "Explorez des formations professionnelles courtes de 10 à 40 heures en santé, technologie, hôtellerie, métiers spécialisés et plus encore.",
  path: pagePath,
  locale: "fr",
  image: GENERATED_VISUALS.studentSuccess.src,
  imageWidth: 1672,
  imageHeight: 941,
});

function getCourseHours(course: RhcCourse): number | null {
  const match = course.duration.match(/^(\d+) Hours$/i);
  return match ? Number(match[1]) : null;
}

const categoryNamesFr: Record<string, string> = {
  "Healthcare & Human Services": "Santé et services à la personne",
  "Animal Care & Pet Industries": "Soins aux animaux et services animaliers",
  "Hospitality & Service Industries": "Hôtellerie et services",
  "Skilled Trades & Technical Fields": "Métiers spécialisés et domaines techniques",
  "Information Technology, AI & Computer Science": "Technologies de l’information, IA et informatique",
  "Beauty, Aesthetics & Cosmetology": "Beauté, esthétique et cosmétologie",
};

function categoryNameFr(category: string): string {
  const cleanName = category.replace(/^\d+\s*-\s*/, "");
  return categoryNamesFr[cleanName] ?? cleanName;
}

export default async function ProgrammesCourtsFormationProfessionnelleOntarioPage() {
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
    const category = categoryNameFr(course.category || "Autres programmes");
    const categoryCourses = coursesByCategory.get(category) ?? [];
    categoryCourses.push(course);
    coursesByCategory.set(category, categoryCourses);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby="page-heading">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Formation axée sur la carrière en Ontario
          </p>
          <h1 id="page-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-5xl">
            Programmes courts de formation professionnelle en Ontario
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Développez des compétences ciblées et pertinentes pour le milieu de travail canadien
            sans reprendre un diplôme complet. Le Collège Richmond Hill propose des programmes
            dont la durée publiée varie de 10 à 40 heures en santé, technologie, hôtellerie,
            métiers spécialisés, soins aux animaux et beauté.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#programmes-actuels" className="cta-primary rounded-md px-5 py-2.5 text-sm font-medium">
              Explorer les programmes courts
            </a>
            <Link
              href="/fr/contact"
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Poser une question
            </Link>
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <Image
            src={GENERATED_VISUALS.studentSuccess.src}
            alt={GENERATED_VISUALS.studentSuccess.alt.fr}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mt-16" aria-labelledby="formation-ciblee-heading">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.targetedTraining.src}
              alt={GENERATED_VISUALS.targetedTraining.alt.fr}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 id="formation-ciblee-heading" className="mt-4 text-xl font-bold text-slate-900">
              Formation ciblée
            </h2>
            <p className="mt-2 text-slate-600">
              Choisissez un programme ciblé qui correspond à vos objectifs, à votre expérience et
              au domaine professionnel qui vous intéresse.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.flexibleSchedule.src}
              alt={GENERATED_VISUALS.flexibleSchedule.alt.fr}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Durées clairement indiquées</h2>
            <p className="mt-2 text-slate-600">
              Comparez les options actuelles de 10 à 40 heures et choisissez un programme adapté
              au temps que vous pouvez y consacrer.
            </p>
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] bg-slate-100">
              <Image
                src={GENERATED_VISUALS.onlineLearningHome.src}
                alt={GENERATED_VISUALS.onlineLearningHome.alt.fr}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">Modes d’apprentissage flexibles</h2>
              <p className="mt-2 text-slate-600">
                Le Collège Richmond Hill offre des formations en ligne, hybrides et en personne.
                Consultez la page de chaque cours pour connaître son mode actuel.
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src={GENERATED_VISUALS.financialGuidance.src}
              alt={GENERATED_VISUALS.financialGuidance.alt.fr}
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Comparer les détails actuels</h2>
            <p className="mt-2 text-slate-600">
              Consultez chaque page de cours pour connaître la durée, le prix actuel et les renseignements d’inscription publiés.
            </p>
          </article>
        </div>
      </section>

      <section id="programmes-actuels" className="mt-16 scroll-mt-24" aria-labelledby="programmes-actuels-heading">
        <h2 id="programmes-actuels-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Programmes actuels de 10 à 40 heures
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Les programmes ci-dessous proviennent du catalogue actuel du Collège Richmond Hill et
          sont sélectionnés selon leur durée publiée. Ouvrez un cours pour consulter ses détails
          et son lien d’inscription.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {Array.from(coursesByCategory.entries()).map(([category, categoryCourses]) => (
            <article key={category} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-slate-900">{category}</h3>
              <ul className="mt-4 space-y-3">
                {categoryCourses.map((course) => (
                  <li key={course.id} className="flex items-start justify-between gap-4 border-t border-slate-200 pt-3 first:border-0 first:pt-0">
                    <Link
                      href={`/fr/courses/${course.slugFr}`}
                      className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                    >
                      {course.name}
                    </Link>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      {course.duration.replace("Hours", "heures")}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-8 sm:py-10" aria-labelledby="prochaine-etape-heading">
        <h2 id="prochaine-etape-heading" className="text-2xl font-bold">Choisissez votre prochaine étape</h2>
        <p className="mt-3 max-w-3xl text-slate-200">
          Parcourez tous les cours, comparez les parcours de transition ou communiquez avec le
          Collège Richmond Hill pour trouver un programme adapté à vos objectifs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/fr/courses" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Parcourir tous les cours
          </Link>
          <Link href="/fr/bridging-programs" className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Voir les programmes de transition
          </Link>
          <Link href="/fr/programs" className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Explorer les domaines
          </Link>
        </div>
      </section>
    </div>
  );
}
