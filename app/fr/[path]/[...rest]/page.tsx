/**
 * Catch-all for FR URLs with multi-segment paths that don't match a dedicated
 * app/fr/{slug}/page.tsx. Permanent-redirects to the canonical English URL.
 */
import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ path: string; rest?: string[] }> };

export default async function FrenchNestedRedirect({ params }: Props) {
  const { path, rest } = await params;
  const segments = [path, ...(rest ?? [])].filter(Boolean);
  permanentRedirect(segments.length ? `/${segments.join("/")}` : "/");
}
