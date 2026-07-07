/**
 * Catch-all for FR URLs that don't match a dedicated app/fr/{slug}/page.tsx.
 * Permanent-redirects to the canonical English URL so users see real content
 * and search engines consolidate authority on the EN page. If the EN page
 * also doesn't exist, the EN site's not-found will handle it.
 */
import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ path: string }> };

export default async function FrenchSinglePathRedirect({ params }: Props) {
  const { path } = await params;
  permanentRedirect(path ? `/${path}` : "/");
}
