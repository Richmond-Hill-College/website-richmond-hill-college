/**
 * Locale preference cookie: used by LanguageSplash and middleware.
 * Persists user's language choice (en/fr) so returning visitors go to the right locale.
 */
export const LOCALE_COOKIE_NAME = "rhc-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds
export type Locale = "en" | "fr";

export function getLocaleCookieValue(cookieHeader: string | undefined): Locale | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${LOCALE_COOKIE_NAME}=([^;]+)`));
  const value = match?.[1]?.trim().toLowerCase();
  return value === "fr" || value === "en" ? value : null;
}
