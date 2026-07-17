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
  title: "Programmes de carrière à Richmond Hill, Ontario",
  description:
    "Découvrez nos programmes de carrière à Richmond Hill, Ontario : santé, pharmacie, technologie, affaires et transition selon les normes du marché canadien.",
  path: "programs",
  locale: "fr",
  image: GENERATED_VISUALS.technologyLearningLab.src,
  imageWidth: 1672,
  imageHeight: 941,
});

const programAreas = [
  { title: "Soins infirmiers et aux patients", visual: GENERATED_VISUALS.nursingCare },
  { title: "Pharmacie", visual: GENERATED_VISUALS.pharmacy },
  { title: "Administration médicale", visual: GENERATED_VISUALS.medicalOffice },
  { title: "Santé mentale", visual: GENERATED_VISUALS.mentalHealth },
  { title: "IA et technologie", visual: GENERATED_VISUALS.aiTechnology },
  { title: "Cybersécurité", visual: GENERATED_VISUALS.cybersecurity },
  { title: "Leadership en affaires", visual: GENERATED_VISUALS.businessLeadership },
  { title: "Hôtellerie", visual: GENERATED_VISUALS.hospitality },
] as const;

export default async function ProgramsPageFr() {
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
            Programmes de carrière à Richmond Hill, Ontario
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Nous offrons une variété de programmes et de cours conçus pour vous doter de
            compétences reconnues au Canada. Nos offres couvrent la santé, les soins aux animaux,
            l&apos;esthétique et plus encore — en ligne, en hybride et en personne.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src={GENERATED_VISUALS.technologyLearningLab.src}
            alt={GENERATED_VISUALS.technologyLearningLab.alt.fr}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <section className="mt-16" aria-labelledby="our-programs-heading">
        <h2 id="our-programs-heading" className="text-2xl font-bold text-slate-900">
          Nos programmes actuels
        </h2>
        <p className="mt-2 text-slate-600">
          Domaines et cours actuellement offerts. Chaque lien mène aux détails et à l&apos;inscription sur RHC Global Bridge.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Link
                key={cat}
                href={`/fr/courses?category=${encodeURIComponent(cat)}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                {cat}
              </Link>
            ))
          ) : (
            <span className="text-slate-500">Chargement des catégories…</span>
          )}
        </div>
        <Link
          href="/fr/course-offerings"
          className="mt-6 inline-block font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Voir toute l&apos;offre de cours →
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="program-areas-heading">
        <h2 id="program-areas-heading" className="text-2xl font-bold text-slate-900">
          Explorez nos domaines de formation
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Développez des compétences pratiques adaptées au marché canadien en santé, technologie et services professionnels.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programAreas.map(({ title, visual }) => (
            <article
              key={title}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <Image
                src={visual.src}
                alt={visual.alt.fr}
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
          href="/fr/short-career-training-programs-ontario"
          className="mt-6 inline-flex font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-[#f6520a]"
        >
          Comparer les formations professionnelles courtes de 10 à 40 heures →
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900">
          Formats d&apos;apprentissage flexibles
        </h2>
        <div className="mt-4 grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[96px_1fr] sm:items-center sm:p-6">
          <Image
            src={GENERATED_VISUALS.flexibleSchedule.src}
            alt={GENERATED_VISUALS.flexibleSchedule.alt.fr}
            width={96}
            height={96}
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            sizes="96px"
          />
          <p className="text-slate-600">
            Options en ligne, hybrides et en personne. Détails et format sur chaque page de programme
            sur <a href="https://www.rhcglobalbridge.com/courses/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 underline hover:no-underline">RHC Global Bridge</a>.
          </p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="bridge-heading">
        <h2 id="bridge-heading" className="text-2xl font-bold text-slate-900">
          Programmes de transition pour l&apos;international
        </h2>
        <p className="mt-4 text-slate-600">
          Nos programmes de transition aident les professionnels formés à l&apos;étranger à adapter
          leurs qualifications aux normes canadiennes. Explorez les options sur notre page{" "}
          <Link href="/fr/bridging-programs" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Programmes de transition
          </Link>.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Prêt à faire le prochain pas ?</h2>
        <p className="mt-2 text-slate-600">
          Parcourez nos cours ou communiquez avec nous pour choisir un programme.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href="/fr/course-offerings" className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium">
            Voir l&apos;offre de cours
          </Link>
          <Link href="/fr/contact" className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">
            Nous joindre
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
