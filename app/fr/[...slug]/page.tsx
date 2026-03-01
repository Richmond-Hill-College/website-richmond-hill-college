import Link from "next/link";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = slug?.join("/") ?? "";
  return {
    title: path ? `${path} | Richmond Hill College (FR)` : "Richmond Hill College | FR",
    description:
      "Cette page n'est pas encore disponible en français. Consultez la version anglaise.",
  };
}

export default async function FrenchCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const enPath = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 tablet:px-8 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl tablet:text-5xl">
          Version française à venir
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Cette page n&apos;est pas encore disponible en français.
        </p>
        <p className="mt-2 text-slate-500">
          Vous pouvez consulter la version anglaise en cliquant ci-dessous.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={enPath}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            style={{
              backgroundColor: "#f6520a",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            }}
          >
            Voir la version anglaise
          </Link>
          <Link
            href="/fr"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Retour à l&apos;accueil (FR)
          </Link>
        </div>
      </div>
    </div>
  );
}
