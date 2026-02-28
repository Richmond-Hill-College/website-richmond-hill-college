"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  { src: "/images/hero/hero-1.jpg", alt: "Richmond Hill College campus" },
  { src: "/images/hero/hero-2.jpg", alt: "Healthcare and technology learning" },
  { src: "/images/hero/hero-3.jpg", alt: "Students and faculty" },
];

const INTERVAL_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[min(70vh,32rem)] w-full overflow-hidden bg-slate-900" aria-label="Hero carousel">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Unlocking Potential, Building Futures
        </h1>
        <p className="mt-2 text-lg font-medium text-slate-200 sm:text-xl">
          Healthcare and Technology Management
        </p>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Carousel indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
