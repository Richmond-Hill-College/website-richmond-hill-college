import Link from "next/link";

type Props = {
  locale?: "en" | "fr";
  /** Internal anchor id for "Notify me about next edition" form */
  notifyHref?: string;
  /** Where the proceedings book lives */
  proceedingsHref?: string;
};

/**
 * Top-of-page banner used on archived event pages so visitors instantly know
 * the event has happened. Renders in both EN and FR.
 */
export function PastEventBanner({
  locale = "en",
  notifyHref = "#notify",
  proceedingsHref,
}: Props) {
  const isFr = locale === "fr";
  return (
    <aside
      role="note"
      aria-label={isFr ? "Événement passé" : "Past event"}
      className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            {isFr ? "Événement terminé" : "Past event"}
          </p>
          <p className="mt-1 text-sm text-amber-900 sm:text-base">
            {isFr
              ? "Cette conférence a eu lieu du 28 au 30 novembre 2025. Consultez les actes et inscrivez-vous pour être informé de l'édition 2026."
              : "This conference took place November 28–30, 2025. View the proceedings and sign up to hear about the 2026 edition."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {proceedingsHref && (
            <Link
              href={proceedingsHref}
              className="inline-flex min-h-[40px] items-center justify-center rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {isFr ? "Voir les actes" : "View proceedings"}
            </Link>
          )}
          <Link
            href={notifyHref}
            className="inline-flex min-h-[40px] items-center justify-center rounded-md border border-amber-700 bg-white px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            {isFr ? "M'avertir pour 2026" : "Notify me about 2026"}
          </Link>
        </div>
      </div>
    </aside>
  );
}
