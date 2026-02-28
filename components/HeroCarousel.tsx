"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Your bridge to global business success – Richmond Hill College bridging programs for internationally educated professionals",
    badge: "Our free career tools",
    title: "Your Bridge to Global Business Success",
    subtitle:
      "Gain the skills and Canadian credentials needed to thrive in management, entrepreneurship, and leadership roles.",
    cta: "Ready to get started",
    href: "/bridging-programs",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Pathways to healthcare careers in Canada – Richmond Hill College bridging programs",
    badge: "Our free career tools",
    title: "Pathways to Healthcare Careers in Canada",
    subtitle:
      "Build your future in Canada's growing healthcare sector through specialized bridging programs designed for internationally educated professionals.",
    cta: "Ready to get started",
    href: "/bridging-programs",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Healthcare and technology management learning at Richmond Hill College",
    badge: "Our free career tools",
    title: "Unlocking Potential, Building Futures",
    subtitle:
      "Healthcare and technology management. Professional bridging programs aligned with Canadian standards.",
    cta: "Explore programs",
    href: "/programs",
  },
];

const INTERVAL_MS = 5000;

/** Parallax config: scroll-controlled depth effect */
const PARALLAX = {
  textFactor: 0.55,
  imageFactor: 0.2,
  maxScale: 0.28,
  easeOutCubic: (t: number) => 1 - (1 - t) ** 3,
  maxTiltDeg: 3,
  /** Lerp factor for smooth interpolation (0 = instant, ~0.1–0.2 = smooth follow) */
  smoothFactor: 0.14,
} as const;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [imageTilt, setImageTilt] = useState(0);
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const h = rect.height || 1;
      const rawProgress = Math.min(1, Math.max(0, -rect.top / h));
      const progress = PARALLAX.easeOutCubic(rawProgress);

      if (reduceMotion) {
        setParallaxY(0);
        setImageScale(1);
        setImageTilt(0);
        setImageTranslateY(0);
        return;
      }

      setParallaxY(rect.top * PARALLAX.textFactor);
      setImageScale(1 + PARALLAX.maxScale * progress);
      setImageTilt(PARALLAX.maxTiltDeg * progress);
      setImageTranslateY(rect.top * PARALLAX.imageFactor);
    };

    const onScrollOrResize = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[min(75vh,28rem)] w-full overflow-hidden bg-rhc-primary-dark tablet:h-[min(78vh,38rem)] lg:h-[min(75vh,36rem)]"
      aria-label="Hero carousel"
      style={reduceMotion ? undefined : { perspective: "1400px" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={reduceMotion ? undefined : { transformStyle: "preserve-3d" }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
            style={
              reduceMotion
                ? undefined
                : {
                    transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale}) rotateX(${imageTilt}deg)`,
                    transformOrigin: "center center",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }
            }
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>
      {/* Dark overlay: inline rgba so it always renders (Tailwind /opacity can fail with CSS vars) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: "rgba(25, 38, 64, 0.6)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center text-white tablet:px-8"
        style={
          reduceMotion
            ? undefined
            : {
                transform: `translate3d(0, ${parallaxY}px, 0)`,
                willChange: "transform",
              }
        }
      >
        <span className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/95 backdrop-blur-sm tablet:px-5 tablet:py-2 tablet:text-[13px]">
          {slides[index].badge}
        </span>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl tablet:text-4xl tablet:mt-5 lg:text-5xl xl:text-6xl">
          {slides[index].title}
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg tablet:text-lg tablet:mt-5 tablet:max-w-xl lg:text-xl">
          {slides[index].subtitle}
        </p>
        <Link
          href={slides[index].href}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640] tablet:mt-8 tablet:min-h-[52px] tablet:px-8 tablet:py-3.5 tablet:text-[15px]"
          style={{
            backgroundColor: "#f6520a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        >
          {slides[index].cta}
        </Link>
      </div>
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1 tablet:bottom-6 tablet:gap-2" aria-label="Carousel indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors tablet:min-h-[40px] tablet:min-w-[40px]"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block rounded-full transition-colors ${
                i === index ? "h-2.5 w-2.5 bg-rhc-accent tablet:h-3 tablet:w-3" : "h-2 w-2 bg-white/50 tablet:h-2.5 tablet:w-2.5 hover:bg-white/70"
              }`}
              aria-hidden
            />
          </button>
        ))}
      </div>
    </section>
  );
}
