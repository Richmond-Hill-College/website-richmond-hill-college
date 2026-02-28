"use client";

import { useEffect } from "react";
import Script from "next/script";

const ELFSIGHT_WIDGET_ID = "5f7c2dce-f412-42bb-ba03-4b1e1aaab067";
const MOBILE_BREAKPOINT_PX = 767;
const MOBILE_NAV_SELECTOR = 'nav[aria-label="Mobile bottom navigation"]';
const MOBILE_NAV_CLEARANCE_PX = 8;
const ELFSIGHT_PORTAL_CLASS = `eapps-whatsapp-chat-${ELFSIGHT_WIDGET_ID}-custom-css-root`;

/**
 * Elfsight chat/widget loads after the page is interactive so it cannot block or break initial render.
 */
export function ElfsightWidget() {
  useEffect(() => {
    const applyMobileBubbleOffset = () => {
      const isMobile = window.matchMedia(
        `(max-width: ${MOBILE_BREAKPOINT_PX}px)`
      ).matches;

      const portalRoots = document.querySelectorAll<HTMLElement>(
        `.${ELFSIGHT_PORTAL_CLASS}`
      );
      if (portalRoots.length === 0) {
        return;
      }

      const mobileNavHeight =
        document
          .querySelector<HTMLElement>(MOBILE_NAV_SELECTOR)
          ?.getBoundingClientRect().height ?? 0;

      const offsetPx = Math.ceil(mobileNavHeight + MOBILE_NAV_CLEARANCE_PX);
      const mobileMarginBottom = `calc(env(safe-area-inset-bottom, 0px) + ${offsetPx}px)`;

      portalRoots.forEach((portalRoot) => {
        const candidates = portalRoot.querySelectorAll<HTMLElement>("div");
        candidates.forEach((candidate) => {
          const computed = window.getComputedStyle(candidate);
          const isFloatingBubbleContainer =
            computed.position === "fixed" &&
            computed.zIndex === "99999999" &&
            !!candidate.querySelector(".es-button-base-container");

          if (!isFloatingBubbleContainer) {
            return;
          }

          if (isMobile) {
            candidate.style.setProperty(
              "margin-bottom",
              mobileMarginBottom,
              "important"
            );
          } else {
            candidate.style.removeProperty("margin-bottom");
          }
        });
      });
    };

    let frameId = 0;
    const scheduleApply = () => {
      if (frameId !== 0) {
        return;
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        applyMobileBubbleOffset();
      });
    };

    scheduleApply();

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", scheduleApply);
    window.addEventListener("orientationchange", scheduleApply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleApply);
      window.removeEventListener("orientationchange", scheduleApply);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />
      <div
        className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`}
        data-elfsight-app-lazy
      />
    </>
  );
}
