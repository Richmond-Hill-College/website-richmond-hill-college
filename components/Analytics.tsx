"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "rhc-cookie-consent";

/**
 * Loads GA4 only after the user accepts cookies.
 * Reads the same localStorage key as CookiesBanner.tsx and listens for the
 * "rhc-consent-changed" custom event so analytics light up immediately when
 * the user clicks "Accept" without requiring a page reload.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    function check() {
      try {
        setAccepted(localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setAccepted(false);
      }
    }
    check();
    const onConsent = () => check();
    window.addEventListener("rhc-consent-changed", onConsent);
    window.addEventListener("storage", onConsent);
    return () => {
      window.removeEventListener("rhc-consent-changed", onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  if (!gaId || !accepted) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
