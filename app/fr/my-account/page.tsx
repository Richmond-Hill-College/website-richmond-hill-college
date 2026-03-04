import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

const RHC_BASE = "https://www.rhcglobalbridge.com";
const RHC_ACCOUNT = `${RHC_BASE}/my-account/`;
const RHC_COURSES = `${RHC_BASE}/courses/`;

export const metadata: Metadata = createPageMetadata({
  title: "Mon compte",
  description:
    "Connectez-vous à votre compte RHC Global Bridge pour gérer vos inscriptions, accéder à vos cours et suivre votre progression au Collège Richmond Hill.",
  path: "my-account",
  locale: "fr",
});

export default function MyAccountPageFr() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Mon compte
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Accédez à votre compte RHC Global Bridge pour gérer votre profil, vos inscriptions
        et vos cours. Si vous n&apos;avez pas encore de compte, vous pouvez en créer un lors
        de votre première inscription à un cours.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Connexion et inscription</h2>
        <p className="mt-2 text-slate-600">
          Utilisez le portail RHC Global Bridge pour vous connecter ou vous inscrire à des
          programmes et des cours.
        </p>
        <a
          href={RHC_ACCOUNT}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium"
        >
          Ouvrir Mon compte (RHC Global Bridge)
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">Parcourir les cours</h2>
        <p className="mt-2 text-slate-600">
          Consultez notre offre de cours et programmes de transition sur RHC Global Bridge.
        </p>
        <a
          href={RHC_COURSES}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Voir les cours →
        </a>
      </section>

      <p className="mt-10">
        <Link href="/fr/contact" className="text-slate-600 hover:text-slate-900">
          Besoin d&apos;aide ? Nous joindre
        </Link>
      </p>
    </div>
  );
}
