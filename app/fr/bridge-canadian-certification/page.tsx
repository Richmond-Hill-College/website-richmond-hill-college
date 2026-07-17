import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Passerelle vers la certification canadienne",
  description:
    "Passez à la certification canadienne avec le Collège Richmond Hill. Programmes de transition pour les professionnels formés à l'étranger : santé, pharmacie, soins aux animaux, beauté. Ontario.",
  path: "bridge-canadian-certification",
  locale: "fr",
  image: "/images/generated/library/canada-career-future.png",
  imageWidth: 1672,
  imageHeight: 941,
});

const programAreas = [
  { name: "Santé et services à la personne", href: "/fr/bridging-programs" },
  { name: "Soins aux animaux et industrie animalière", href: "/fr/bridging-programs" },
  { name: "Beauté, esthétique et cosmétologie", href: "/fr/bridging-programs" },
  { name: "Pharmacie et normes canadiennes", href: "/fr/courses" },
];

export default function BridgeCanadianCertificationPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f6520a]">
            Parcours professionnels au Canada
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Passerelle vers la certification canadienne
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Le Collège Richmond Hill vous aide à accéder à la certification canadienne pour exercer
            votre métier au Canada. Nos programmes de transition s&apos;adressent aux professionnels
            formés à l&apos;étranger et aux personnes en réorientation qui souhaitent répondre aux
            normes canadiennes en matière d&apos;emploi et d&apos;agrément.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/fr/bridging-programs" className="cta-primary rounded-lg px-5 py-3 text-sm font-semibold">
              Explorer les programmes de transition
            </Link>
            <Link href="/fr/contact" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
              Obtenir des conseils
            </Link>
          </div>
        </div>
        <GeneratedVisual
          visualKey="canadaCareerFuture"
          locale="fr"
          priority
          className="rounded-2xl shadow-xl ring-1 ring-slate-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <section className="mt-12" aria-labelledby="what-bridge-heading">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[180px_1fr] md:items-center tablet:p-8">
          <GeneratedVisual visualKey="credentialBridge" locale="fr" className="w-40" sizes="160px" />
          <div>
            <h2 id="what-bridge-heading" className="text-2xl font-bold text-slate-900">Ce que signifie « passer » à la certification canadienne</h2>
            <p className="mt-4 text-slate-600">
              « Passer » à la certification canadienne, c&apos;est combler l&apos;écart entre vos
              qualifications actuelles — souvent obtenues à l&apos;étranger — et ce que les employeurs
              et organismes de réglementation canadiens exigent. Les programmes de transition offrent
              une formation ciblée et, selon le domaine, une préparation aux examens ou à l&apos;agrément.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="program-areas-heading">
        <h2 id="program-areas-heading" className="text-2xl font-bold text-slate-900">
          Domaines de programmes
        </h2>
        <ul className="mt-4 space-y-2">
          {programAreas.map((area) => (
            <li key={area.name}>
              <Link
                href={area.href}
                className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-slate-600">
          Pour les détails et toutes les catégories, consultez nos pages{" "}
          <Link href="/fr/bridging-programs" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Programmes de transition
          </Link>{" "}
          et{" "}
          <Link href="/fr/courses" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
            Cours
          </Link>.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Prêt à passer à la certification canadienne ?</h2>
        <p className="mt-2 text-slate-600">
          Explorez nos programmes, puis inscrivez-vous sur RHC Global Bridge ou communiquez avec nous
          pour trouver le parcours qui vous convient.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/fr/bridging-programs" className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium">
            Voir les programmes de transition
          </Link>
          <Link href="/fr/courses" className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Parcourir les cours
          </Link>
          <Link href="/fr/contact" className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
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
