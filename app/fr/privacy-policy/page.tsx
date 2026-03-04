import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du Collège Richmond Hill de gestion des soins de santé et de la technologie. Comment nous recueillons, utilisons et protégeons vos renseignements personnels.",
  path: "privacy-policy",
  locale: "fr",
});

const lastUpdated = "Février 2025";

export default function PrivacyPolicyPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Politique de confidentialité
      </h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : {lastUpdated}</p>
      <p className="mt-4 text-lg text-slate-600">
        Le Collège Richmond Hill de gestion des soins de santé et de la technologie (« nous » ou « le Collège »)
        s&apos;engage à protéger votre vie privée. Cette politique décrit comment nous recueillons, utilisons,
        divulguons et protégeons vos renseignements personnels lorsque vous utilisez notre site, nos services
        et nos programmes.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">1. Renseignements que nous recueillons</h2>
        <p className="mt-2 text-slate-600">
          Nous pouvons recueillir les renseignements que vous fournissez (nom, courriel, téléphone, adresse,
          programmes d&apos;intérêt, communications), les renseignements collectés automatiquement (adresse IP,
          type d&apos;appareil, navigateur, pages visitées) et les renseignements provenant des témoins et
          technologies similaires. Nous utilisons ces renseignements pour offrir nos services, communiquer
          avec vous, améliorer nos programmes et nous conformer aux obligations légales.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">2. Utilisation de vos renseignements</h2>
        <p className="mt-2 text-slate-600">
          Nous utilisons vos renseignements pour fournir, maintenir et améliorer nos programmes et notre site ;
          pour traiter les inscriptions, demandes et paiements ; pour envoyer des communications
          administratives et promotionnelles (lorsque permis) ; pour répondre aux demandes ; pour analyser
          l&apos;utilisation et les tendances ; et pour nous conformer aux lois applicables.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">3. Partage et divulgation</h2>
        <p className="mt-2 text-slate-600">
          Nous ne vendons pas vos renseignements personnels. Nous pouvons les partager avec des fournisseurs
          de services qui nous aident à exploiter notre site et nos programmes, avec les autorités lorsque
          la loi l&apos;exige, ou avec votre consentement.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">4. Sécurité et conservation</h2>
        <p className="mt-2 text-slate-600">
          Nous mettons en œuvre des mesures raisonnables pour protéger vos renseignements. Nous conservons
          vos données tant que nécessaire pour les finalités décrites ou selon les exigences légales.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">5. Vos droits et nous joindre</h2>
        <p className="mt-2 text-slate-600">
          Vous pouvez nous contacter pour accéder à vos renseignements, demander une correction ou poser
          des questions sur cette politique. Pour toute question :{" "}
          <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 underline hover:text-slate-900">
            info@richmondhillcollege.ca
          </a>.
        </p>
      </section>

      <p className="mt-10">
        <Link href="/fr/support" className="text-slate-600 hover:text-slate-900">
          ← Soutien
        </Link>
      </p>
    </div>
  );
}
