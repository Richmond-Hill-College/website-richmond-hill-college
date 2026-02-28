"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseFilters } from "@/components/CourseFilters";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";

const RHC_COURSES_URL = "https://www.rhcglobalbridge.com/courses/";
const DEFAULT_IMAGE =
  "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/sliderimage-3.jpg";

type CourseOfferingsWithFiltersProps = {
  courses: RhcCourse[];
};

export function CourseOfferingsWithFilters({ courses }: CourseOfferingsWithFiltersProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy =
    locale === "fr"
      ? {
          summary:
            "Programmes passerelles et certificats professionnels alignes sur les normes canadiennes. Consultez les details complets et inscrivez-vous sur RHC Global Bridge.",
          details: "Voir les details du cours ->",
          external: "Voir le cours sur RHC Global Bridge ->",
          registerExternal: "S'inscrire sur RHC Global Bridge (nouvel onglet)",
          contact: "Nous contacter",
        }
      : {
          summary:
            "Professional bridging and certificate programs aligned with Canadian standards. View full details and register on RHC Global Bridge.",
          details: "View course details ->",
          external: "View course on RHC Global Bridge ->",
          registerExternal: "Register on RHC Global Bridge (opens in new tab)",
          contact: "Contact us",
        };

  return (
    <CourseFilters
      courses={courses}
      renderItems={(filtered) => (
        <div className="space-y-16">
          {filtered.map((course) => {
            const internalUrl = course.slug ? withLocale(`/courses/${course.slug}`, locale) : null;
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
                  aria-label={
                    isExternal
                      ? `View ${course.name} on RHC Global Bridge (opens in new tab)`
                      : `View ${course.name} course details`
                  }
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="relative h-52 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-56 sm:w-80">
                      <Image
                        src={course.image || DEFAULT_IMAGE}
                        alt={`${course.name} – bridging course at Richmond Hill College`}
                        fill
                        className="object-cover transition-transform group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-700">
                        {course.name}
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                        {course.category && (
                          <span className="font-medium text-slate-700">{course.category}</span>
                        )}
                        {course.duration && <span>{course.duration}</span>}
                        {course.price && <span>{course.price}</span>}
                      </div>
                      <p className="mt-3 text-slate-600">
                        {copy.summary}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-slate-800 group-hover:underline">
                        {internalUrl
                          ? copy.details
                          : copy.external}
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
                      {copy.registerExternal}
                    </a>
                  )}
                  <Link
                    href={withLocale("/contact", locale)}
                    className="inline-block font-medium text-slate-800 hover:underline"
                  >
                    {copy.contact}
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
