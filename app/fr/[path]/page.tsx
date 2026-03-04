import type { Metadata } from "next";
import { FrenchComingSoon } from "@/components/FrenchComingSoon";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ path: string }> };

const PRESIDENT_PATH = "message-from-the-president";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  if (path === PRESIDENT_PATH) {
    return createPageMetadata({
      title: "Message de la présidente",
      description:
        "Message de bienvenue de la Dre Soheila Hafezi, présidente du Collège Richmond Hill. Notre mission : outiller les apprenants formés à l'étranger grâce aux programmes Global Bridge en Ontario, Canada.",
      path: PRESIDENT_PATH,
      locale: "fr",
      image: "/images/leadership/soheila-hafezi-president.png",
      imageWidth: 240,
      imageHeight: 247,
    });
  }
  return createPageMetadata({
    title: "Version française à venir",
    description: "Cette page n'est pas encore disponible en français. Consultez la version anglaise.",
    path: path ?? "",
    locale: "fr",
  });
}

export default async function FrenchPlaceholderPage({ params }: Props) {
  const { path } = await params;
  if (path === PRESIDENT_PATH) {
    const { default: MessageFromThePresidentPageFr } = await import(
      "../message-from-the-president/page"
    );
    return <MessageFromThePresidentPageFr />;
  }
  return <FrenchComingSoon enPath={path ? `/${path}` : "/"} />;
}
