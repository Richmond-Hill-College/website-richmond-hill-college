import Link from "next/link";

/**
 * Real FR 404 — replaces the old "Coming soon" placeholder.
 * Shown when a user hits an FR path that doesn't resolve through the
 * catch-all redirect (e.g. when the catch-all itself can't disambiguate).
 */
export default function FrenchNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-rhc-primary">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/fr"
          className="cta-primary inline-flex min-h-[44px] items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/fr/courses"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Parcourir les cours
        </Link>
      </div>
    </div>
  );
}
