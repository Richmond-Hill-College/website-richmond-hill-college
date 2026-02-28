export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

const EXTERNAL_LINK_RE = /^(https?:)?\/\//i;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr";
}

export function localeToOpenGraph(locale: Locale): "en_CA" | "fr_CA" {
  return locale === "fr" ? "fr_CA" : "en_CA";
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const [, maybeLocale] = pathname.split("/");
  return isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalized.split("/");
  const maybeLocale = segments[1];

  if (!isLocale(maybeLocale)) {
    return normalized === "" ? "/" : normalized;
  }

  const stripped = `/${segments.slice(2).join("/")}`.replace(/\/+/g, "/");
  return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
}

export function withLocale(pathname: string, locale: Locale): string {
  if (
    EXTERNAL_LINK_RE.test(pathname) ||
    pathname.startsWith("mailto:") ||
    pathname.startsWith("tel:")
  ) {
    return pathname;
  }

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = stripLocalePrefix(normalized);

  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

export function getRequestLocaleFromHeaders(requestHeaders: Headers): Locale {
  const headerLocale = requestHeaders.get("x-rhc-locale");
  if (isLocale(headerLocale)) return headerLocale;
  return DEFAULT_LOCALE;
}
