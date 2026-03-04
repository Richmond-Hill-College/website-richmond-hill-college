"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Sets document.documentElement.lang for multilingual SEO (en vs fr). */
export function LangAttribute() {
  const pathname = usePathname() ?? "/";
  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/fr") ? "fr" : "en";
  }, [pathname]);
  return null;
}
