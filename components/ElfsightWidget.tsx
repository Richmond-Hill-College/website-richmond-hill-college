"use client";

import Script from "next/script";

/**
 * Elfsight chat/widget loads after the page is interactive so it cannot block or break initial render.
 */
export function ElfsightWidget() {
  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />
      <div
        className="elfsight-app-5f7c2dce-f412-42bb-ba03-4b1e1aaab067"
        data-elfsight-app-lazy
      />
    </>
  );
}
