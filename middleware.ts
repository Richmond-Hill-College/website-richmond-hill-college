import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE_NAME, type Locale } from "@/lib/locale-cookie";

function getLocaleFromRequest(request: NextRequest): Locale | null {
  const value = request.cookies.get(LOCALE_COOKIE_NAME)?.value?.trim().toLowerCase();
  return value === "en" || value === "fr" ? value : null;
}

/** Clone request with x-pathname header so root layout can set <html lang> server-side. */
function nextWithPathname(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

/**
 * Redirect root paths to the user's preferred locale when they have a saved preference.
 * First-time visitors (no cookie) see the LanguageSplash and choose EN or FR.
 * Adds x-pathname to all requests so root layout can set <html lang> for SEO.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only redirect exact root: "/" or "/fr" or "/fr/"
  const isRootEn = pathname === "/";
  const isRootFr = pathname === "/fr" || pathname === "/fr/";

  if (!isRootEn && !isRootFr) {
    return nextWithPathname(request);
  }

  const locale = getLocaleFromRequest(request);

  if (locale === "fr" && isRootEn) {
    return NextResponse.redirect(new URL("/fr", request.url));
  }
  if (locale === "en" && isRootFr) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return nextWithPathname(request);
}

export const config = {
  // Run on all pathnames so x-pathname is set for layout; root paths also get locale redirect.
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)"],
};
