"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getLocaleFromPathname, stripLocalePrefix, withLocale } from "@/lib/i18n-routing";

const STORAGE_KEY = "rhc-announcement-banner-dismissed";

export function AnnouncementBanner() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const contentPath = stripLocalePrefix(pathname || "/");
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setDismissed(false);
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (contentPath !== "/" || !mounted || dismissed) return null;

  const copy =
    locale === "fr"
      ? {
          aria: "Annonce",
          pill: "Places limitees",
          shortBody: "Inscrivez-vous maintenant.",
          longBody: "Inscrivez-vous maintenant pour les prochaines cohortes - les places se remplissent vite.",
          cta: "Voir les programmes",
          dismiss: "Fermer l'annonce",
        }
      : {
          aria: "Announcement",
          pill: "Limited spots",
          shortBody: "Enrol now.",
          longBody: "Enrol now for upcoming intakes - places fill quickly.",
          cta: "View programs",
          dismiss: "Dismiss announcement",
        };

  return (
    <div
      role="region"
      aria-label={copy.aria}
      className="relative z-40 flex w-full items-center justify-center gap-2 border-b border-orange-700/30 bg-[#f6520a] px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm sm:py-3 sm:text-[15px]"
    >
      <span className="flex flex-1 flex-wrap items-center justify-center gap-1.5 gap-y-1 sm:gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-white/20 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide sm:px-2">
          {copy.pill}
        </span>
        <span className="sm:hidden">
          {copy.shortBody}{" "}
          <Link
            href={withLocale("/programs", locale)}
            className="underline decoration-white/80 underline-offset-2 transition-colors hover:decoration-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a]"
          >
            {copy.cta}
          </Link>
        </span>
        <span className="hidden sm:inline">
          {copy.longBody}{" "}
          <Link
            href={withLocale("/programs", locale)}
            className="underline decoration-white/80 underline-offset-2 transition-colors hover:decoration-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a]"
          >
            {copy.cta}
          </Link>
        </span>
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a] sm:right-3"
        aria-label={copy.dismiss}
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
