import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Certification canadienne pour les professionnels formés à l'étranger",
  description:
    "Obtenez une certification canadienne en tant que professionnel formé à l'étranger. Programmes de transition du Collège Richmond Hill : santé, pharmacie, soins aux animaux, beauté. Ontario.",
  path: "canadian-certification-internationally-educated",
  locale: "fr",
});

const pathways = [
  { name: "International Healthcare Personal Support Bridging", description: "Pour infirmières, aides-soignants et professionnels de la santé. Parcours vers le programme PSW au Canada ou l'examen CNA/HHA aux États-Unis. Entièrement en ligne.", href: "/fr/courses" },
  { name: "Pharmacy Assistant (Canadian Standards)", description: "Alignez votre formation en pharmacie sur les normes et attentes canadiennes.", href: "/fr/courses" },
  { name: "Pet Grooming Bridging Program", description: "Passez aux normes canadiennes en soins et toilettage des animaux.", href: "/fr/courses" },
  { name: "Canadian Workplace-Ready Hair Styling", description: "Programme hybride en coiffure et coupe répondant aux normes canadiennes.", href: "/fr/courses" },
];

export default function CanadianCertificationInternationallyEducatedPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Certification canadienne pour les professionnels formés à l&apos;étranger
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Si vous avez été formé ou certifié à l&apos;étranger et souhaitez exercer votre métier au Canada,
        la certification canadienne — ou un parcours reconnu pour y accéder — est souvent l&apos;étape
        suivante. Le Collège Richmond Hill offre des programmes de transition conçus pour les
        professionnels formés à l&apos;étranger afin d&apos;adapter vos qualifications aux normes
        canadiennes et d&apos;avancer vers la certification, l&apos;agrément ou l&apos;emploi au Canada.
      </p>

      <section className="mt-12" aria-labelledby="pathways-heading">
        <h2 id="pathways-heading" className="text-2xl font-bold text-slate-900">
          Parcours offerts
        </h2>
        <ul className="mt-4 space-y-4">
          {pathways.map((p) => (
            <li key={p.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <Link href={p.href} className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
                {p.name}
              </Link>
              <p className="mt-2 text-slate-600">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Prêt à obtenir votre certification canadienne ?</h2>
        <p className="mt-2 text-slate-600">
          Explorez nos programmes de transition ou communiquez avec nous pour en savoir plus.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/fr/bridging-programs" className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium">
            Programmes de transition
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
