/**
 * @deprecated FR coverage now uses 308 redirects to the EN canonical URL.
 * See app/fr/[path]/page.tsx and app/fr/[path]/[...rest]/page.tsx.
 * Kept as a no-op export so any unmerged branch that still imports this
 * component will compile; safe to delete once those branches are merged.
 */
import Link from "next/link";

type Props = { enPath?: string };

export function FrenchComingSoon({ enPath = "/" }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page indisponible</h1>
      <p className="mt-4 text-slate-600">
        Cette page n&apos;est pas disponible. Vous serez redirigé vers la version anglaise.
      </p>
      <Link
        href={enPath}
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white"
        style={{ backgroundColor: "#f6520a" }}
      >
        Voir la version anglaise
      </Link>
    </div>
  );
}
