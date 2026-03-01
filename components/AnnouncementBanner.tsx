"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STORAGE_KEY = "rhc-announcement-banner-dismissed";

export function AnnouncementBanner() {
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

  if (!mounted || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-40 flex w-full items-center justify-center gap-2 border-b border-orange-700/30 bg-[#f6520a] px-3 py-2 text-center text-sm font-medium text-white shadow-sm sm:px-4 sm:py-3 sm:text-[15px]"
    >
      <span className="flex flex-1 flex-shrink-0 flex-wrap items-center justify-center gap-1.5 gap-y-1 sm:gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-white/20 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide sm:px-2">
          Limited spots
        </span>
        {/* Mobile: short line to save vertical space */}
        <span className="sm:hidden">
          Enrol now.{" "}
          <Link
            href="/courses"
            className="underline decoration-white/80 underline-offset-2 transition-colors hover:decoration-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a]"
          >
            View courses
          </Link>
        </span>
        {/* sm+: full message */}
        <span className="hidden sm:inline">
          Enrol now for upcoming intakes.{" "}
          <Link
            href="/courses"
            className="underline decoration-white/80 underline-offset-2 transition-colors hover:decoration-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a]"
          >
            View courses
          </Link>
        </span>
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#f6520a] sm:right-3"
        aria-label="Dismiss announcement"
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
