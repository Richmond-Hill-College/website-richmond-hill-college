"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";

const INTERVAL_MS = 5000;
const FALLBACK_IMAGE = "/images/hero/hero-2.jpg";

type CourseSlideshowProps = {
  courses: RhcCourse[];
};

export function CourseSlideshow({ courses }: CourseSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (courses.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % courses.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [courses.length]);

  if (!courses.length) {
    return (
      <div
        className="grid grid-cols-1 overflow-hidden rounded-2xl bg-slate-200 shadow-xl lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]"
        aria-label="Course slideshow"
      >
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
          <Image
            src={FALLBACK_IMAGE}
            alt="Featured courses at Richmond Hill College of Healthcare and Technology Management"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center bg-slate-800 p-6 sm:p-8 lg:min-h-[320px]">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Featured course</p>
          <p className="mt-2 text-slate-300">No courses to display.</p>
        </div>
      </div>
    );
  }

  const course = courses[index];
  const courseHref = course.slug ? `/courses/${course.slug}` : course.link;
  const isExternal = !course.slug;

  return (
    <div
      className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-xl lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]"
      aria-label="Course slideshow"
    >
      {/* Half: image only, fills panel with no white space */}
      <div className="relative aspect-[4/3] bg-slate-900 lg:aspect-auto lg:min-h-[320px]">
        {courses.map((c, i) => (
          <div
            key={c.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={c.image || FALLBACK_IMAGE}
              alt={`${c.name} – featured course at Richmond Hill College`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Half: UI panel – no overlay, no white space */}
      <div className="flex flex-col justify-center bg-slate-800 p-6 sm:p-8 lg:min-h-[320px]">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Featured course
        </span>
        <h3 className="mt-2 line-clamp-3 text-lg font-semibold leading-snug text-white sm:text-xl lg:text-xl">
          {course.name}
        </h3>
        <Link
          href={courseHref}
          className="mt-4 inline-flex w-fit items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-md transition hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
          aria-label={`View ${course.name} course`}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          View course
          <span className="ml-1.5 font-normal opacity-80" aria-hidden>→</span>
        </Link>
        {courses.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-0.5" aria-label="Slide indicators">
            {courses.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === index
                      ? "h-2.5 w-2.5 bg-white sm:h-3 sm:w-3"
                      : "h-2 w-2 bg-white/40 hover:bg-white/60 sm:h-2.5 sm:w-2.5"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
