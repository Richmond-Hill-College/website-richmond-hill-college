"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LOCALE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE, type Locale } from "@/lib/locale-cookie";

const LOGO_SRC = "/images/logo/rhc-logo.png";
const LOGO_ALT = "Richmond Hill College";

function getStoredLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp(`${LOCALE_COOKIE_NAME}=([^;]+)`));
    const value = match?.[1]?.trim().toLowerCase();
    if (value === "en" || value === "fr") return value;
    const stored = localStorage.getItem(LOCALE_COOKIE_NAME);
    if (stored === "en" || stored === "fr") return stored;
  } catch {
    // ignore
  }
  return null;
}

function setLocalePreference(locale: Locale) {
  const maxAge = LOCALE_COOKIE_MAX_AGE;
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE_NAME, locale);
  } catch {
    // ignore
  }
}

export function LanguageSplash() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const locale = getStoredLocale();
    if (locale) {
      const isFrPath = pathname.startsWith("/fr");
      if (locale === "fr" && !isFrPath && (pathname === "/" || pathname === "")) {
        router.replace("/fr");
        return;
      }
      if (locale === "en" && isFrPath && (pathname === "/fr" || pathname === "/fr/")) {
        router.replace("/");
        return;
      }
      setShowSplash(false);
      return;
    }
    setShowSplash(true);
  }, [mounted, pathname, router]);

  const handleChoose = (locale: Locale) => {
    if (redirecting) return;
    setRedirecting(true);
    setLocalePreference(locale);
    setShowSplash(false);
    if (locale === "fr") {
      router.replace("/fr");
    } else {
      router.replace("/");
    }
  };

  if (!mounted || !showSplash) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#192640] px-4 py-8 animate-language-splash-in motion-reduce:animate-none"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language"
    >
      {/* Subtle gradient overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(246,82,10,0.25) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(68,46,102,0.3) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-32 tablet:h-16 tablet:w-36">
            <Image
              src={LOGO_SRC}
              alt={LOGO_ALT}
              fill
              className="object-contain object-center"
              priority
              sizes="144px"
            />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            Choose your language / Choisissez votre langue
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 tablet:gap-6">
          <button
            type="button"
            onClick={() => handleChoose("en")}
            disabled={redirecting}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-8 text-white shadow-lg transition-all duration-200 ease-out hover:border-[#f6520a] hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#f6520a] focus:ring-offset-2 focus:ring-offset-[#192640] disabled:opacity-70 motion-reduce:transition-none"
            aria-label="English"
          >
            <span className="text-2xl font-bold tablet:text-3xl" aria-hidden>
              EN
            </span>
            <span className="text-sm font-medium text-white/90">English</span>
          </button>
          <button
            type="button"
            onClick={() => handleChoose("fr")}
            disabled={redirecting}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 px-6 py-8 text-white shadow-lg transition-all duration-200 ease-out hover:border-[#f6520a] hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#f6520a] focus:ring-offset-2 focus:ring-offset-[#192640] disabled:opacity-70 motion-reduce:transition-none"
            aria-label="Français"
          >
            <span className="text-2xl font-bold tablet:text-3xl" aria-hidden>
              FR
            </span>
            <span className="text-sm font-medium text-white/90">Français</span>
          </button>
        </div>

        <p className="text-xs text-white/50">
          Your choice will be saved for future visits. / Votre choix sera enregistré.
        </p>
      </div>
    </div>
  );
}
