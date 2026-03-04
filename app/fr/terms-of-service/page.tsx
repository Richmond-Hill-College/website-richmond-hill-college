import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Conditions d'utilisation",
  description:
    "Conditions d'utilisation du Collège Richmond Hill de gestion des soins de santé et de la technologie. Règles et conditions d'utilisation de notre site et de nos services.",
  path: "terms-of-service",
  locale: "fr",
});

const lastUpdated = "Février 2025";

export default function TermsOfServicePageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Conditions d&apos;utilisation
      </h1>
      <p className="mt-2 text-sm text-slate-500">Dernière mise à jour : {lastUpdated}</p>
      <p className="mt-4 text-lg text-slate-600">
        Les présentes Conditions d&apos;utilisation (« Conditions ») régissent votre accès et l&apos;utilisation
        du site, des programmes et des services offerts par le Collège Richmond Hill de gestion des soins
        de santé et de la technologie (« le Collège », « nous » ou « notre »). En accédant à nos services
        ou en les utilisant, vous acceptez d&apos;être lié par ces Conditions.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">1. Acceptation des conditions</h2>
        <p className="mt-2 text-slate-600">
          En utilisant notre site ou nos services, vous confirmez avoir lu, compris et accepté ces Conditions
          et notre Politique de confidentialité. En cas de désaccord, vous ne devez pas utiliser nos services.
          Nous pouvons mettre à jour ces Conditions ; une utilisation continue après modification constitue
          une acceptation des Conditions révisées.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">2. Description des services</h2>
        <p className="mt-2 text-slate-600">
          Nous offrons des programmes éducatifs, des cours, des conférences et des services connexes en
          gestion des soins de santé et de la technologie. Les descriptions sur notre site sont à titre
          informatif et peuvent être mises à jour. Nous ne garantissons pas qu&apos;un programme, cours ou
          fonction particulier restera disponible indéfiniment.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">3. Admissibilité et comptes</h2>
        <p className="mt-2 text-slate-600">
          Vous devez avoir l&apos;âge légal et la capacité contractuelle pour utiliser nos services. Vous êtes
          responsable de la confidentialité de votre compte et de toutes les activités qui s&apos;y déroulent.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">4. Limitation de responsabilité</h2>
        <p className="mt-2 text-slate-600">
          Dans les limites permises par la loi, le Collège ne sera pas responsable des dommages indirects,
          accessoires ou consécutifs découlant de l&apos;utilisation de nos services.
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
