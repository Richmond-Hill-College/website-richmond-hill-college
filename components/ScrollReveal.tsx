"use client";

import {
  type ReactNode,
  useRef,
  useEffect,
  useState,
  useId,
} from "react";

/** Apple-style scroll reveal: fade + subtle Y. Intentional, smooth, respects reduced motion. */
const REVEAL = {
  /** Start animating when section is this far from viewport (earlier = smoother) */
  rootMargin: "0px 0px -5% 0px",
  threshold: 0.05,
  /** CSS transition duration (ms) – keep in sync with globals.css */
  durationMs: 700,
  /** Easing: Apple-like ease-out (quick start, soft landing) */
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  /** Treat as "in view" on load if top is above this fraction of viewport (reveal first screenful) */
  inViewTopRatio: 1.2,
} as const;

export type ScrollRevealProps = {
  children: ReactNode;
  /** Stagger children by this many ms (e.g. 80). Use with staggerChildren. */
  staggerMs?: number;
  /** If true, direct children get staggered delay. */
  staggerChildren?: boolean;
  /** Optional class for the wrapper (does not replace default) */
  className?: string;
  /** Semantic element for the reveal wrapper */
  as?: "section" | "div" | "article" | "aside" | "blockquote";
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

export function ScrollReveal({
  children,
  staggerMs = 0,
  staggerChildren = false,
  className = "",
  as: Component = "div",
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const options: IntersectionObserverInit = {
      rootMargin: REVEAL.rootMargin,
      threshold: REVEAL.threshold,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
          }
        }
      },
      options
    );

    observer.observe(el);

    // Reveal immediately if already in viewport (fixes content not showing on load e.g. French homepage).
    // Run after layout (double rAF) and with fallbacks so sections below hero always show.
    const checkInView = () => {
      const rect = el.getBoundingClientRect();
      const rootHeight = window.innerHeight;
      const topThreshold = rootHeight * REVEAL.inViewTopRatio;
      const alreadyInView =
        rect.top < topThreshold && rect.bottom > rootHeight * 0.05;
      if (alreadyInView) setRevealed(true);
    };
    let raf2Id: number | null = null;
    const raf1Id = requestAnimationFrame(() => {
      raf2Id = requestAnimationFrame(() => checkInView());
    });
    const t1 = window.setTimeout(checkInView, 150);
    const t2 = window.setTimeout(checkInView, 450);

    return () => {
      cancelAnimationFrame(raf1Id);
      if (raf2Id !== null) cancelAnimationFrame(raf2Id);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer.disconnect();
    };
  }, [reduceMotion]);

  const style =
    !reduceMotion && staggerChildren && staggerMs > 0
      ? ({
          ["--scroll-reveal-duration-ms" as string]: REVEAL.durationMs,
          ["--scroll-reveal-easing" as string]: REVEAL.easing,
          ["--scroll-reveal-stagger-ms" as string]: staggerMs,
        } as React.CSSProperties)
      : undefined;

  return (
    <Component
      ref={ref as never}
      data-scroll-reveal
      data-revealed={revealed || undefined}
      data-reduce-motion={reduceMotion || undefined}
      data-stagger-children={staggerChildren && staggerMs > 0 ? "" : undefined}
      data-reveal-id={id}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}
