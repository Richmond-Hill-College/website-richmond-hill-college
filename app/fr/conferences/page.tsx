import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Conférences",
  description:
    "Conférences et événements au Collège Richmond Hill. Conférences scientifiques, rencontres et ateliers avec des participants nationaux et internationaux.",
  path: "conferences",
  locale: "fr",
});

export default function ConferencesPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Conférences et rencontres
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Bienvenue sur la page des conférences et événements du Collège Richmond Hill. Nous y présentons
        nos conférences scientifiques, rencontres et ateliers qui réunissent des participants du Canada
        et de l&apos;international.
      </p>

      <section className="mt-12" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="text-2xl font-bold text-slate-900">
          Conférences à venir
        </h2>
        <p className="mt-4 text-slate-600">
          Restez à l&apos;affût de nos prochaines conférences sur des thèmes variés : technologie,
          affaires et santé. Rejoignez-nous et réseauter avec des experts du monde entier.
        </p>
        <Link
          href="/fr/conferences/nursing-and-healthcare-2025"
          className="mt-4 inline-block font-medium text-slate-800 hover:underline"
        >
          Liste des conférences
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="past-heading">
        <h2 id="past-heading" className="text-2xl font-bold text-slate-900">
          Conférences passées
        </h2>
        <p className="mt-4 text-slate-600">
          Découvrez les événements que nous avons organisés : conférenciers, panels et ateliers.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Participez à notre prochaine conférence</h2>
        <p className="mt-2 text-slate-600">
          Ne manquez pas l&apos;occasion de participer à nos prochaines conférences. Inscrivez-vous
          pour réserver votre place et élargir votre réseau professionnel.
        </p>
        <Link
          href="/fr/conferences/nursing-and-healthcare-2025/registration"
          className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium"
        >
          S&apos;inscrire
        </Link>
      </section>
    </div>
  );
}
