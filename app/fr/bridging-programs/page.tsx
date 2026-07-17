import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
  type RhcCourse,
} from "@/lib/rhc-global-bridge-courses";
import { BridgingProgramsSearch } from "@/components/BridgingProgramsSearch";
import { GENERATED_VISUALS } from "@/lib/generated-visuals";

export const metadata: Metadata = createPageMetadata({
  title: "Programmes de transition à Richmond Hill, Ontario",
  description:
    "Découvrez nos programmes de transition à Richmond Hill, Ontario, pour les professionnels formés à l'étranger qui souhaitent acquérir des compétences adaptées au Canada.",
  path: "bridging-programs",
  locale: "fr",
  image: GENERATED_VISUALS.credentialJourney.src,
  imageWidth: 1672,
  imageHeight: 941,
});

const howWeHelp = [
  {
    title: "Formation ciblée",
    description: "Concentrez-vous sur les connaissances et les pratiques professionnelles nécessaires à votre prochaine étape.",
    visual: GENERATED_VISUALS.targetedTraining,
  },
  {
    title: "Mentorat personnalisé",
    description: "Obtenez des conseils pour adapter votre expérience aux attentes canadiennes.",
    visual: GENERATED_VISUALS.mentorship,
  },
  {
    title: "Soutien au parcours professionnel",
    description: "Reliez votre formation à des objectifs clairs de certification et d'emploi.",
    visual: GENERATED_VISUALS.careerPlacement,
  },
  {
    title: "Soutien multilingue",
    description: "Apprenez dans un milieu inclusif conçu pour les professionnels formés à l'étranger.",
    visual: GENERATED_VISUALS.multilingualSupport,
  },
] as const;

function groupCoursesByCategory(courses: RhcCourse[]): Map<string, RhcCourse[]> {
  const map = new Map<string, RhcCourse[]>();
  for (const c of courses) {
    const cat = c.category || "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(c);
  }
  for (const list of Array.from(map.values())) list.sort((a, b) => a.name.localeCompare(b.name));
  return map;
}

export default async function BridgingProgramsPageFr() {
  const courses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const byCategory = groupCoursesByCategory(courses);
  const categoryOrder = Array.from(byCategory.keys()).sort((a, b) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Programmes de transition à Richmond Hill, Ontario
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vous souhaitez une <strong className="text-slate-800">passerelle vers la certification canadienne</strong> ou
            obtenir la <strong className="text-slate-800">certification canadienne en tant que professionnel formé à l&apos;étranger</strong> ?{" "}
            <Link href="/fr/bridge-canadian-certification" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">Passerelle vers la certification canadienne</Link>
            {" · "}
            <Link href="/fr/canadian-certification-internationally-educated" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">Certification pour les professionnels formés à l&apos;étranger</Link>
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src={GENERATED_VISUALS.credentialJourney.src}
            alt={GENERATED_VISUALS.credentialJourney.alt.fr}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <BridgingProgramsSearch
        categoriesWithCourses={categoryOrder.map((cat) => ({
          category: cat,
          courses: byCategory.get(cat)!,
        }))}
        localePrefix="/fr"
      />

      <section className="mt-12" aria-labelledby="what-are-heading">
        <h2 id="what-are-heading" className="text-2xl font-bold text-slate-900">
          Qu&apos;est-ce qu&apos;un programme de transition ?
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-5 lg:items-center lg:gap-10">
          <p className="text-slate-600 lg:col-span-3">
            Un programme de transition est conçu pour « combler l&apos;écart » entre vos qualifications
            actuelles et les exigences pour exercer au Canada. Il aide les professionnels formés à
            l&apos;étranger à répondre aux normes locales en matière d&apos;agrément, de langue et de pratique.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 lg:col-span-2">
            <Image
              src={GENERATED_VISUALS.credentialAssessment.src}
              alt={GENERATED_VISUALS.credentialAssessment.alt.fr}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="how-we-help-heading">
        <h2 id="how-we-help-heading" className="text-2xl font-bold text-slate-900">
          Comment le Collège Richmond Hill vous aide à progresser
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Notre approche combine une formation ciblée et un soutien pratique pour votre parcours professionnel au Canada.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howWeHelp.map(({ title, description, visual }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Image
                src={visual.src}
                alt={visual.alt.fr}
                width={96}
                height={96}
                className="h-20 w-20 object-contain"
                sizes="80px"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-wrap items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <Image
          src="/images/logo/rhc-global-bridge-logo.png"
          alt="RHC Global Bridge – inscription aux programmes de transition"
          width={140}
          height={70}
          className="h-14 w-auto"
        />
        <div>
          <p className="font-medium text-slate-800">Inscription en ligne aux programmes de transition</p>
          <a
            href="https://www.rhcglobalbridge.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-slate-600 hover:underline"
          >
            RHCglobalBridge.com – Plus d&apos;informations
          </a>
        </div>
      </section>

      <div className="mt-12">
        <Link href="/fr/contact" className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium">
          Nous joindre
        </Link>
      </div>
    </div>
  );
}
