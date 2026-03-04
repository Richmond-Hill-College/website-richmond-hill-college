"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function FrenchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error (fr):", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="text-xl font-bold text-red-900">Une erreur s&apos;est produite</h1>
        <p className="mt-2 text-sm text-red-700">
          Une erreur a eu lieu lors du chargement de cette page. Veuillez réessayer.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Réessayer
          </button>
          <Link
            href="/fr"
            className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-50"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
