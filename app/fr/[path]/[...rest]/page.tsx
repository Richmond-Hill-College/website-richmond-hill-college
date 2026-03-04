import type { Metadata } from "next";
import { FrenchComingSoon } from "@/components/FrenchComingSoon";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ path: string; rest?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path, rest } = await params;
  const fullPath = rest?.length ? `${path}/${rest.join("/")}` : path;
  return createPageMetadata({
    title: "Version française à venir",
    description: "Cette page n'est pas encore disponible en français.",
    path: fullPath ?? "",
    locale: "fr",
  });
}

export default async function FrenchPlaceholderNestedPage({ params }: Props) {
  const { path, rest } = await params;
  const enPath = path ? `/${[path, ...(rest ?? [])].join("/")}` : "/";
  return <FrenchComingSoon enPath={enPath} />;
}
