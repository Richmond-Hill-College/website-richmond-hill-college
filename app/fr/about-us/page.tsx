import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "À propos",
  description:
    "Le Collège Richmond Hill de gestion des soins de santé et de la technologie a été fondé pour offrir des programmes rapides et ciblés aux professionnels et aux personnes en réorientation. Découvrez notre mission.",
  path: "about-us",
  locale: "fr",
  image: "/images/hero/about-hero.jpg",
  imageWidth: 800,
  imageHeight: 600,
});

export default function AboutUsPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <div className="grid gap-10 tablet:gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">À propos</h1>
          <p className="mt-4 text-lg text-slate-600">
            Le Collège Richmond Hill de gestion des soins de santé et de la technologie Inc. a été fondé
            pour offrir des programmes rapides et ciblés aux professionnels en activité et aux personnes
            en réorientation. Notre accent sur l&apos;engagement et les résultats des étudiants nous distingue.
            Nous nous engageons à offrir des cours en ligne, hybrides et en personne pour répondre aux besoins
            de nos apprenants.
          </p>
          <p className="mt-4 text-slate-600">
            Notre corps professoral, dirigé par la Dre Soheila Hafezi, BCN, MSc, PhD, présidente-directrice
            générale du Collège Richmond Hill, s&apos;engage à offrir un environnement d&apos;apprentissage
            inclusif qui favorise la croissance et la réussite de tous les étudiants.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/hero/about-hero.jpg"
            alt="Le Collège Richmond Hill – éducation en gestion des soins de santé et de la technologie"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <section className="mt-12 tablet:mt-16" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-2xl font-bold text-slate-900 tablet:text-3xl">
          Énoncé de mission
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Une éducation qui responsabilise :</strong> Le Collège
            Richmond Hill est voué à offrir une formation de qualité en gestion des soins de santé et
            de la technologie, en dotant les étudiants des compétences nécessaires pour réussir.
          </li>
        </ul>
      </section>

      <section className="mt-10 tablet:mt-12" aria-labelledby="offerings-heading">
        <h2 id="offerings-heading" className="text-2xl font-bold text-slate-900 tablet:text-3xl">
          Nos programmes
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Formats flexibles :</strong> Nos cours sont offerts
            en ligne, en hybride et en personne, pour s&apos;adapter à votre mode de vie.
          </li>
          <li>
            <strong className="text-slate-800">Programmes variés :</strong> Cours courts spécialisés,
            programmes de carrière certifiés et programmes de diplôme en co-diplômation.
          </li>
        </ul>
      </section>

      <section className="mt-10 tablet:mt-12" aria-labelledby="success-heading">
        <h2 id="success-heading" className="text-2xl font-bold text-slate-900 tablet:text-3xl">
          Engagement envers la réussite des étudiants
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Partenariats sectoriels :</strong> Partenariats avec
            des organismes des secteurs de la santé et de la technologie, débouchés vers l&apos;emploi.
          </li>
          <li>
            <strong className="text-slate-800">Soutien personnalisé :</strong> Ressources et accompagnement
            tout au long du parcours éducatif.
          </li>
        </ul>
      </section>

      <section className="mt-10 tablet:mt-12" aria-labelledby="community-heading">
        <h2 id="community-heading" className="text-2xl font-bold text-slate-900 tablet:text-3xl">
          Au service de la communauté
        </h2>
        <p className="mt-4 text-slate-600">
          <strong className="text-slate-800">Développement de la main-d&apos;œuvre :</strong> Contribuer
          au développement des secteurs de la santé et de la technologie et préparer les étudiants au
          marché du travail.
        </p>
      </section>

      <section className="mt-10 tablet:mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 tablet:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Prêt à faire le prochain pas ?
        </h2>
        <p className="mt-2 text-slate-600">
          Communiquez avec nous pour en savoir plus sur nos programmes et vos objectifs académiques
          et professionnels.
        </p>
        <Link href="/fr/contact" className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium">
          Nous joindre
        </Link>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
