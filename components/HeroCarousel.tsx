"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FIRST_HERO_IMAGE } from "@/lib/hero";
import { GENERATED_VISUALS } from "@/lib/generated-visuals";

const slidesEn = [
  {
    src: FIRST_HERO_IMAGE.src,
    alt: FIRST_HERO_IMAGE.alt,
    badge: "Career pathways built around you",
    title: "Your Bridge to Canadian Career Skills",
    subtitle:
      "Build practical, Canadian-context skills—whether you're internationally educated or changing careers. Explore focused pathways in healthcare, technology, and professional development.",
    cta: "Find my pathway",
    href: "#pathway-finder",
  },
  {
    src: GENERATED_VISUALS.globalHealthcareCareers.src,
    alt: GENERATED_VISUALS.globalHealthcareCareers.alt.en,
    badge: "Healthcare & human services",
    title: "Pathways to Healthcare Careers in Canada",
    subtitle:
      "Bridging education designed for internationally educated professionals. Build Canadian-context knowledge and practical skills for your next career step.",
    cta: "View healthcare programs",
    href: "/bridging-programs",
  },
  {
    src: GENERATED_VISUALS.campusCollaboration.src,
    alt: GENERATED_VISUALS.campusCollaboration.alt.en,
    badge: "Programs & courses",
    title: "Healthcare & Technology Management, Built for You",
    subtitle:
      "From bridging programs to professional development—online, hybrid, and in-person. All aligned with Canadian standards for working professionals and career changers.",
    cta: "Explore programs",
    href: "/programs",
  },
];

/** Canadian French hero copy – natural, institutional tone (vous) */
const slidesFr = [
  {
    src: FIRST_HERO_IMAGE.src,
    alt: FIRST_HERO_IMAGE.altFr,
    badge: "Des parcours professionnels pour vous",
    title: "Votre passerelle vers les compétences recherchées au Canada",
    subtitle:
      "Développez des compétences pratiques adaptées au contexte canadien—que vous soyez formé à l'étranger ou en réorientation. Explorez des parcours ciblés en santé, en technologie et en perfectionnement professionnel.",
    cta: "Trouver mon parcours",
    href: "#pathway-finder",
  },
  {
    src: GENERATED_VISUALS.globalHealthcareCareers.src,
    alt: GENERATED_VISUALS.globalHealthcareCareers.alt.fr,
    badge: "Santé et services à la personne",
    title: "Parcours vers les carrières en santé au Canada",
    subtitle:
      "Formation de transition conçue pour les professionnels formés à l'étranger. Développez des connaissances adaptées au contexte canadien et des compétences pratiques pour votre prochaine étape.",
    cta: "Voir les programmes en santé",
    href: "/fr/bridging-programs",
  },
  {
    src: GENERATED_VISUALS.campusCollaboration.src,
    alt: GENERATED_VISUALS.campusCollaboration.alt.fr,
    badge: "Programmes et cours",
    title: "Gestion des soins de santé et de la technologie, pour vous",
    subtitle:
      "Des programmes de transition au perfectionnement professionnel—en ligne, hybrides et en présentiel. Le tout aligné sur les normes canadiennes pour les professionnels en exercice et les personnes en réorientation.",
    cta: "Explorer les programmes",
    href: "/fr/programs",
  },
];

const INTERVAL_MS = 5000;

/** Parallax config: scroll-controlled depth effect */
const PARALLAX = {
  textFactor: 0.55,
  /** Default upward offset so hero image sits higher in frame */
  imageOffsetUp: 56,
  /** Scroll multiplier: higher = image moves up more as you scroll */
  imageFactor: 0.38,
  maxScale: 0.28,
  easeOutCubic: (t: number) => 1 - (1 - t) ** 3,
  maxTiltDeg: 3,
  /** Lerp factor for smooth interpolation (0 = instant, ~0.1–0.2 = smooth follow) */
  smoothFactor: 0.14,
} as const;

type HeroCarouselProps = { locale?: "en" | "fr" };

export function HeroCarousel({ locale = "en" }: HeroCarouselProps) {
  const slides = locale === "fr" ? slidesFr : slidesEn;
  const [index, setIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [imageTilt, setImageTilt] = useState(0);
  const [imageTranslateY, setImageTranslateY] = useState(-PARALLAX.imageOffsetUp);
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
    if (reduceMotion || manuallyPaused || interactionPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [interactionPaused, manuallyPaused, reduceMotion, slides.length]);

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
        setImageTranslateY(-PARALLAX.imageOffsetUp);
        return;
      }

      setParallaxY(rect.top * PARALLAX.textFactor);
      setImageScale(1 + PARALLAX.maxScale * progress);
      setImageTilt(PARALLAX.maxTiltDeg * progress);
      setImageTranslateY(-PARALLAX.imageOffsetUp + rect.top * PARALLAX.imageFactor);
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
      className="relative h-[36rem] w-full overflow-hidden bg-rhc-primary-dark tablet:h-[min(78vh,38rem)] lg:h-[min(75vh,36rem)]"
      aria-label="Hero carousel"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
      }}
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
                ? {
                    maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                  }
                : {
                    transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale}) rotateX(${imageTilt}deg)`,
                    transformOrigin: "center center",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                  }
            }
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
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
        className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-6 text-center text-white tablet:pt-8 tablet:px-8 px-4"
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
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row tablet:mt-8">
          <Link
            href={slides[index].href}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640] tablet:min-h-[52px] tablet:px-8 tablet:py-3.5 tablet:text-[15px]"
            style={{
              backgroundColor: "#f6520a",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
            }}
          >
            {slides[index].cta}
          </Link>
          <Link
            href={locale === "fr" ? "/fr/contact" : "/contact"}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {locale === "fr" ? "Parler à un conseiller" : "Talk to an advisor"}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1 tablet:bottom-6 tablet:gap-2" aria-label="Carousel indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors tablet:min-h-[40px] tablet:min-w-[40px]"
            aria-label={locale === "fr" ? `Aller au diaporama ${i + 1}` : `Go to slide ${i + 1}`}
          >
            <span
              className={`block rounded-full transition-colors ${
                i === index ? "h-2.5 w-2.5 bg-rhc-accent tablet:h-3 tablet:w-3" : "h-2 w-2 bg-white/50 tablet:h-2.5 tablet:w-2.5 hover:bg-white/70"
              }`}
              aria-hidden
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setManuallyPaused((value) => !value)}
          className="ml-1 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/30 bg-slate-950/25 text-xs font-bold text-white transition hover:bg-slate-950/45 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={locale === "fr" ? (manuallyPaused ? "Reprendre le diaporama" : "Mettre le diaporama en pause") : (manuallyPaused ? "Resume carousel" : "Pause carousel")}
        >
          <span aria-hidden>{manuallyPaused ? "▶" : "Ⅱ"}</span>
        </button>
      </div>
    </section>
  );
}
