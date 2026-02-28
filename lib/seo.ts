import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getAlternateLocale,
  localeToOpenGraph,
  type Locale,
  withLocale,
} from "@/lib/i18n-routing";
import { siteUrl } from "@/lib/site-url";

/** Recommended OG image size for link previews. */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export type PageSeoOptions = {
  /** Page title (layout template will append " | Richmond Hill College"). */
  title: string;
  /** Meta description; keep under ~160 characters. */
  description: string;
  /** Path without leading slash (e.g. "about-us", "conferences/nursing-and-healthcare-2025"). Used for canonical and openGraph URL. */
  path?: string;
  /** Optional OG/twitter image path (e.g. "/images/hero/about-hero.jpg"). Falls back to default generated OG image. */
  image?: string;
  /** Optional image width/height if using custom image. */
  imageWidth?: number;
  imageHeight?: number;
  /** Optional; set to false for noindex (e.g. thank-you pages). */
  index?: boolean;
  /** Locale for canonical + hreflang tags. */
  locale?: Locale;
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
export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageWidth = OG_WIDTH,
  imageHeight = OG_HEIGHT,
  index = true,
  locale = DEFAULT_LOCALE,
}: PageSeoOptions): Metadata {
  const normalizedPath = path ? `/${path}` : "/";
  const canonicalPath = withLocale(normalizedPath, locale);
  const canonical = `${siteUrl}${canonicalPath}`;
  const alternateLocale = getAlternateLocale(locale);

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
      languages: {
        en: `${siteUrl}${withLocale(normalizedPath, "en")}`,
        fr: `${siteUrl}${withLocale(normalizedPath, "fr")}`,
        "x-default": `${siteUrl}${withLocale(normalizedPath, DEFAULT_LOCALE)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: localeToOpenGraph(locale),
      siteName: "Richmond Hill College",
      alternateLocale: [localeToOpenGraph(alternateLocale)],
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
