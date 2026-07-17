import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { GeneratedVisual } from "@/components/GeneratedVisual";

export const metadata: Metadata = createPageMetadata({
  title: "Conférences",
  description:
    "Conférences et événements au Collège Richmond Hill. Conférences scientifiques, rencontres et ateliers avec des participants nationaux et internationaux.",
  path: "conferences",
  locale: "fr",
  image: "/images/generated/library/nursing-conference.png",
  imageWidth: 1672,
  imageHeight: 941,
});

export default function ConferencesPageFr() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f6520a]">
            Savoir, pratique et liens professionnels
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Conférences et rencontres
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Le Collège Richmond Hill organise des conférences scientifiques, des rencontres et
            des ateliers qui réunissent des participants du Canada et de l&apos;international dans
            les domaines de la santé, de la technologie et de la pratique professionnelle.
          </p>
          <Link href="/fr/conferences/nursing-and-healthcare-2025" className="cta-primary mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold">
            Explorer les archives de la conférence 2025
          </Link>
        </div>
        <GeneratedVisual
          visualKey="nursingConference"
          locale="fr"
          priority
          className="rounded-2xl shadow-xl ring-1 ring-slate-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

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
