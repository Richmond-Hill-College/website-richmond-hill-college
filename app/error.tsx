"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  const copy =
    locale === "fr"
      ? {
          title: "Une erreur est survenue",
          body: "Une erreur s'est produite lors du chargement de cette page. Veuillez reessayer.",
          retry: "Reessayer",
          home: "Retour a l'accueil",
        }
      : {
          title: "Something went wrong",
          body: "An error occurred while loading this page. Please try again.",
          retry: "Try again",
          home: "Go home",
        };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="text-xl font-bold text-red-900">{copy.title}</h1>
        <p className="mt-2 text-sm text-red-700">
          {copy.body}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            {copy.retry}
          </button>
          <Link
            href={withLocale("/", locale)}
            className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-50"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
