"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STORAGE_KEY = "rhc-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

export function CookiesBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
      if (stored === "accepted" || stored === "declined") setStatus(stored);
      else setStatus(null);
    } catch {
      setStatus(null);
    }
  }, []);

  const persist = (value: ConsentStatus) => {
    setStatus(value);
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleAccept = () => persist("accepted");
  const handleDecline = () => persist("declined");

  if (!mounted || status !== null) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      className="fixed left-0 right-0 bottom-20 z-50 animate-cookie-banner-in tablet:bottom-0 motion-reduce:animate-none"
    >
      <div className="mx-auto max-w-7xl px-4 pb-3 pt-3 tablet:px-6 tablet:pb-[calc(1rem+env(safe-area-inset-bottom,0))] tablet:pt-4 desktop:px-8">
        <div className="rounded-xl border border-slate-200/90 bg-white/98 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm supports-[backdrop-filter]:bg-white/95 tablet:rounded-2xl tablet:shadow-[0_-8px_32px_rgba(15,23,42,0.1)]">
          <div className="flex flex-col gap-3 px-4 py-3 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4 tablet:px-6 tablet:py-4">
            <p className="text-sm leading-relaxed text-slate-700 tablet:text-base tablet:max-w-2xl">
              We use cookies to improve your experience and analyze site traffic.
              By continuing you consent to our use of cookies.{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-rhc-primary underline decoration-rhc-primary/50 underline-offset-2 transition-colors hover:decoration-rhc-primary focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2 focus:ring-offset-white rounded"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-shrink-0 items-center gap-2 tablet:gap-3">
              <button
                type="button"
                onClick={handleDecline}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="cta-primary rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2 focus:ring-offset-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
