import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

/** Recommended OG image size for link previews. */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export type PageSeoOptions = {
  /** Page title (layout template will append " | Richmond Hill College"). */
  title: string;
  /** Meta description; keep under ~160 characters. */
  description: string;
  /** Path without leading slash (e.g. "about-us"). For FR pages use same path and locale: "fr". */
  path?: string;
  /** Locale for canonical and hreflang alternates. */
  locale?: "en" | "fr";
  /** When EN/FR URLs differ (e.g. course slugs), set alternate paths for correct hreflang. */
  alternatePaths?: { en?: string; fr?: string };
  /** Optional OG/twitter image path (e.g. "/images/hero/about-hero.jpg"). Falls back to default generated OG image. */
  image?: string;
  /** Optional image width/height if using custom image. */
  imageWidth?: number;
  imageHeight?: number;
  /** Optional; set to false for noindex (e.g. thank-you pages). */
  index?: boolean;
};

/**
 * Builds consistent Metadata for new pages: title, description, canonical,
 * openGraph, and twitter card. Use in every page's `export const metadata`.
 *
 * @example
 * // app/about-us/page.tsx
 * export const metadata = createPageMetadata({
 *   title: "About Us",
 *   description: "Learn about Richmond Hill College...",
 *   path: "about-us",
 *   image: "/images/hero/about-hero.jpg",
 * });
 */
function enUrl(path: string): string {
  return path ? `${siteUrl}/${path}` : siteUrl;
}
function frUrl(path: string): string {
  return path ? `${siteUrl}/fr/${path}` : `${siteUrl}/fr`;
}

export function createPageMetadata({
  title,
  description,
  path,
  locale = "en",
  alternatePaths,
  image,
  imageWidth = OG_WIDTH,
  imageHeight = OG_HEIGHT,
  index = true,
}: PageSeoOptions): Metadata {
  const pathNorm = path ?? "";
  const canonical = locale === "fr" ? frUrl(pathNorm) : enUrl(pathNorm);
  const enAlternate = alternatePaths?.en !== undefined ? enUrl(alternatePaths.en) : enUrl(pathNorm);
  const frAlternate = alternatePaths?.fr !== undefined ? frUrl(alternatePaths.fr) : frUrl(pathNorm);
  const openGraphImages = image
    ? [{ url: image, width: imageWidth, height: imageHeight, alt: title }]
    : undefined;

  return {
    title,
    description,
    ...(index
      ? {}
      : {
          robots: { index: false, follow: true },
        }),
    alternates: {
      canonical,
      languages: { en: enAlternate, fr: frAlternate, "x-default": enAlternate },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      siteName: "Richmond Hill College",
      ...(openGraphImages && { images: openGraphImages }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(openGraphImages && { images: openGraphImages }),
    },
  };
}
