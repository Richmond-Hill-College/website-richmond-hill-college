"use client";

import Image from "next/image";
import Link from "next/link";
import { CourseFilters } from "@/components/CourseFilters";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";

const RHC_COURSES_URL = "https://www.rhcglobalbridge.com/courses/";
const DEFAULT_IMAGE =
  "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/sliderimage-3.jpg";

type CourseOfferingsWithFiltersProps = {
  courses: RhcCourse[];
  /** e.g. "/fr" for French pages so course links point to /fr/courses/... */
  localePrefix?: string;
};

const copyEn = {
  ariaExternal: (name: string) => `View ${name} on RHC Global Bridge (opens in new tab)`,
  ariaDetails: (name: string) => `View ${name} course details`,
  imageAlt: (name: string) => `${name} – bridging course at Richmond Hill College`,
  description:
    "Professional bridging and certificate programs aligned with Canadian standards. View full details and register on RHC Global Bridge.",
  viewDetails: "View course details →",
  viewOnBridge: "View course on RHC Global Bridge →",
  registerBridge: "Register on RHC Global Bridge (opens in new tab)",
  contactUs: "Contact us",
};

const copyFr = {
  ariaExternal: (name: string) => `Voir ${name} sur RHC Global Bridge (ouvre dans un nouvel onglet)`,
  ariaDetails: (name: string) => `Voir les détails du cours ${name}`,
  imageAlt: (name: string) => `${name} – programme de transition au Collège Richmond Hill`,
  description:
    "Programmes de transition et de certificat alignés sur les normes canadiennes. Consultez les détails et inscrivez-vous sur RHC Global Bridge.",
  viewDetails: "Voir les détails du cours →",
  viewOnBridge: "Voir le cours sur RHC Global Bridge →",
  registerBridge: "S'inscrire sur RHC Global Bridge (nouvel onglet)",
  contactUs: "Nous contacter",
};

export function CourseOfferingsWithFilters({ courses, localePrefix = "" }: CourseOfferingsWithFiltersProps) {
  const isFr = localePrefix === "/fr";
  const t = isFr ? copyFr : copyEn;
  return (
    <CourseFilters
      courses={courses}
      localePrefix={localePrefix}
      renderItems={(filtered) => (
        <div className="space-y-16">
          {filtered.map((course) => {
            const courseSlug = localePrefix === "/fr" ? course.slugFr : course.slug;
            const internalUrl = course.slug ? `${localePrefix}/courses/${courseSlug}` : null;
            const courseDetailsUrl = internalUrl ?? course.link ?? RHC_COURSES_URL;
            const isExternal = !internalUrl;
            return (
              <article
                key={course.id}
                id={course.slug || String(course.id)}
                className="scroll-mt-24 border-b border-slate-200 pb-16 last:border-0"
              >
                <a
                  href={courseDetailsUrl}
                  {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group block rounded-xl transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label={isExternal ? t.ariaExternal(course.name) : t.ariaDetails(course.name)}
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="relative h-52 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-56 sm:w-80">
                      <Image
                        src={course.image || DEFAULT_IMAGE}
                        alt={t.imageAlt(course.name)}
                        fill
                        className="object-cover transition-transform group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-700">
                        {course.name}
                      </h2>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-slate-600">
                        {course.category && (
                          <span className="font-medium text-slate-700">{course.category}</span>
                        )}
                        {course.duration && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-slate-200/60">
                            {course.duration}
                          </span>
                        )}
                        {course.price && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/60">
                            {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-slate-600">
                        {t.description}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-slate-800 group-hover:underline">
                        {internalUrl ? t.viewDetails : t.viewOnBridge}
                      </span>
                    </div>
                  </div>
                </a>
                <div className="mt-4 flex flex-wrap gap-4">
                  {course.link && internalUrl && (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-medium text-slate-600 hover:underline"
                    >
                      {t.registerBridge}
                    </a>
                  )}
                  <Link
                    href={localePrefix ? `${localePrefix}/contact` : "/contact"}
                    className="inline-block font-medium text-slate-800 hover:underline"
                  >
                    {t.contactUs}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    />
  );
}
