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
  title: "Programmes",
  description:
    "Programmes du Collège Richmond Hill : santé, pharmacie, toilettage, coiffure et plus. Parcourez les cours et programmes de transition alignés sur les normes canadiennes.",
  path: "programs",
  locale: "fr",
  image: "/images/programs/programs-1.jpg",
  imageWidth: 800,
  imageHeight: 600,
});

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
            Programmes du Collège Richmond Hill
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Nous offrons une variété de programmes et de cours conçus pour vous doter de
            compétences reconnues au Canada. Nos offres couvrent la santé, les soins aux animaux,
            l&apos;esthétique et plus encore — en ligne, en hybride et en personne.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/programs/programs-1.jpg"
            alt="Programmes en santé et professionnels au Collège Richmond Hill"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
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

      <section className="mt-12" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900">
          Formats d&apos;apprentissage flexibles
        </h2>
        <p className="mt-4 text-slate-600">
          Options en ligne, hybrides et en personne. Détails et format sur chaque page de programme
          sur <a href="https://www.rhcglobalbridge.com/courses/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-800 underline hover:no-underline">RHC Global Bridge</a>.
        </p>
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
