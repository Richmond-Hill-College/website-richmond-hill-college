import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soutien",
  description:
    "Obtenez de l'aide du Collège Richmond Hill. FAQ, options de contact et ressources pour les étudiants et les visiteurs.",
  path: "support",
  locale: "fr",
});

export default function SupportPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Soutien
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Nous sommes là pour vous aider. Consultez les questions fréquentes, les options de
        contact et les ressources ci-dessous.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Questions fréquentes</h2>
        <p className="mt-2 text-slate-600">
          De nombreuses questions sur nos programmes, cours, conférences et inscriptions sont
          traitées dans notre FAQ. Consultez-la en premier pour des réponses rapides.
        </p>
        <Link
          href="/fr/faq"
          className="mt-4 inline-flex items-center font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Visiter la FAQ →
        </Link>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Nous joindre</h2>
        <p className="mt-2 text-slate-600">
          Pour des questions sur les programmes, l&apos;aide à l&apos;inscription ou des demandes
          générales, utilisez notre formulaire de contact ou joignez-nous par téléphone ou courriel.
          Nous visons à répondre dans les jours ouvrables.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/fr/contact"
            className="inline-flex items-center font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
          >
            Formulaire de contact →
          </Link>
        </div>
        <address className="mt-4 not-italic text-slate-600">
          <p><strong>Collège Richmond Hill de gestion des soins de santé et de la technologie</strong></p>
          <p>1 Sala Drive, Richmond Hill, Ontario, Canada</p>
          <p>
            Téléphone :{" "}
            <a href="tel:+18553286065" className="text-slate-800 underline hover:text-slate-900">
              Sans frais +1 855 (328) 6065
            </a>
          </p>
          <p>
            Courriel :{" "}
            <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 underline hover:text-slate-900">
              info@richmondhillcollege.ca
            </a>
          </p>
        </address>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Compte et accès aux cours</h2>
        <p className="mt-2 text-slate-600">
          Si vous avez un compte, vous pouvez gérer votre profil et accéder à vos cours depuis
          la page Mon compte. Pour des problèmes de connexion ou d&apos;accès, communiquez avec
          nous en indiquant votre courriel d&apos;inscription.
        </p>
        <Link
          href="/fr/my-account"
          className="mt-4 inline-flex items-center font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Mon compte →
        </Link>
      </section>

      <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Avertissement</h2>
        <p className="mt-2 text-sm text-slate-600">
          Le soutien est fourni selon nos meilleurs efforts. Nous ne garantissons pas un délai
          ou un résultat précis. Pour les plaintes ou litiges formels, veuillez consulter nos{" "}
          <Link href="/fr/terms-of-service" className="text-slate-800 underline hover:text-slate-900">
            Conditions d&apos;utilisation
          </Link>.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
        <Link href="/fr/privacy-policy" className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
          Politique de confidentialité
        </Link>
        <Link href="/fr/terms-of-service" className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
          Conditions d&apos;utilisation
        </Link>
        <Link href="/fr/contact" className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">
          Contact
        </Link>
      </div>
    </div>
  );
}
