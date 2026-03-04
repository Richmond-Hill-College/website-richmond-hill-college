import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Message de la présidente",
  description:
    "Message de bienvenue de la Dre Soheila Hafezi, présidente du Collège Richmond Hill. Notre mission : outiller les apprenants formés à l'étranger grâce aux programmes Global Bridge en Ontario, Canada.",
  path: "message-from-the-president",
  locale: "fr",
  image: "/images/leadership/soheila-hafezi-president.png",
  imageWidth: 240,
  imageHeight: 247,
});

export default function MessageFromThePresidentPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <header className="border-b border-slate-200 pb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Dre Soheila Hafezi — Présidente du Collège Richmond Hill
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
          Message de la présidente
        </h1>
      </header>

      <section className="mt-8 space-y-6" aria-labelledby="president-intro">
        <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
          <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#9A85AD] to-[#f6c087] p-2 shadow-sm">
            <Image
              src="/images/leadership/soheila-hafezi-president.png"
              alt="Portrait de la Dre Soheila Hafezi, présidente du Collège Richmond Hill"
              width={240}
              height={247}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
          <div id="president-intro">
            <p className="font-semibold text-slate-900">Dre Soheila Hafezi</p>
            <p className="text-slate-600">Présidente, Collège Richmond Hill</p>
            <p className="text-slate-600">Ontario, Canada</p>
          </div>
        </div>

        <hr className="border-slate-200" />

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700">
            Bienvenue au Collège Richmond Hill.
          </p>
          <p className="text-slate-600">
            Au <strong className="text-slate-800">Collège Richmond Hill</strong>, notre mission est d&apos;outiller
            les apprenants formés à l&apos;étranger dans leur transition vers le marché du travail canadien
            grâce à des <strong className="text-slate-800">programmes Global Bridge</strong> de qualité, accessibles
            et pratiques. Ces programmes sont conçus pour aider les nouveaux arrivants et les professionnels
            internationaux à acquérir les connaissances, compétences et la confiance nécessaires pour bâtir
            une carrière au Canada.
          </p>
          <p className="text-slate-600">
            Nous sommes fiers d&apos;offrir un environnement d&apos;apprentissage inclusif où chaque étudiant
            est soutenu sur les plans académique, professionnel et personnel. Notre corps professoral dévoué,
            notre approche centrée sur l&apos;étudiant et notre engagement envers l&apos;excellence garantissent
            à chaque apprenant l&apos;accompagnement nécessaire pour atteindre ses objectifs.
          </p>
          <p className="text-slate-600">
            Merci d&apos;avoir choisi le Collège Richmond Hill comme partenaire de confiance dans ce parcours.
            Nous avons hâte de soutenir votre croissance et de célébrer vos réussites.
          </p>
          <p className="mt-8 text-slate-700">
            Cordialement,
            <br />
            <strong className="text-slate-900">Dre Soheila Hafezi</strong>
            <br />
            Présidente, Collège Richmond Hill
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 tablet:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Prêt à commencer votre parcours avec nous ?
        </h2>
        <p className="mt-2 text-slate-600">
          Découvrez nos programmes ou communiquez avec nous pour voir comment nous pouvons soutenir
          vos objectifs professionnels au Canada.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/fr/bridging-programs"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Voir les programmes
          </Link>
          <Link href="/fr/contact" className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium">
            Nous joindre
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <ContactBlock locale="fr" />
      </div>
    </div>
  );
}
