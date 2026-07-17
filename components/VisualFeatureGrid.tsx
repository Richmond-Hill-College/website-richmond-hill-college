import Link from "next/link";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { GENERATED_VISUALS, type GeneratedVisualKey } from "@/lib/generated-visuals";

export type VisualFeatureGridItem = {
  visualKey: GeneratedVisualKey;
  title: string;
  description: string;
  href?: string;
};

export type VisualFeatureGridProps = {
  items: readonly VisualFeatureGridItem[];
  locale?: "en" | "fr";
  className?: string;
  /** Accessible label for the list when the surrounding section has no heading. */
  ariaLabel?: string;
};

function FeatureContent({
  item,
  locale,
}: {
  item: VisualFeatureGridItem;
  locale: "en" | "fr";
}) {
  const isIcon = GENERATED_VISUALS[item.visualKey].kind === "icon";

  return (
    <>
      <div
        className={
          isIcon
            ? "flex min-h-44 items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 p-6"
            : "overflow-hidden bg-slate-100"
        }
      >
        <GeneratedVisual
          visualKey={item.visualKey}
          locale={locale}
          className={isIcon ? "w-32 sm:w-36" : "w-full"}
          sizes={
            isIcon
              ? "(max-width: 640px) 128px, 144px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>
      <div className="flex flex-1 flex-col p-5 tablet:p-6">
        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-[var(--rhc-primary-dark)]">
          {item.title}
        </h3>
        <p className="mt-2 leading-relaxed text-slate-600">{item.description}</p>
        {item.href && (
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--rhc-primary-dark)]">
            {locale === "fr" ? "En savoir plus" : "Learn more"}
            <span
              className="ml-1 text-[var(--rhc-accent)] transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        )}
      </div>
    </>
  );
}

/** Responsive, semantic feature cards backed by the generated visual catalog. */
export function VisualFeatureGrid({
  items,
  locale = "en",
  className = "",
  ariaLabel,
}: VisualFeatureGridProps) {
  return (
    <ul
      className={`grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const cardClass =
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rhc-accent)] focus-visible:ring-offset-2";

        return (
          <li key={`${item.visualKey}-${item.title}`} className="h-full">
            {item.href ? (
              <Link href={item.href} className={cardClass}>
                <FeatureContent item={item} locale={locale} />
              </Link>
            ) : (
              <article className={cardClass}>
                <FeatureContent item={item} locale={locale} />
              </article>
            )}
          </li>
        );
      })}
    </ul>
  );
}
