"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";

const iconClass = "size-5 shrink-0 text-slate-500";

function SearchIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.2-5.2m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6Z"
      />
    </svg>
  );
}

export type CategoryWithCourses = {
  category: string;
  courses: RhcCourse[];
};

type BridgingProgramsSearchProps = {
  categoriesWithCourses: CategoryWithCourses[];
  /** e.g. "/fr" for French so course links point to /fr/courses/... */
  localePrefix?: string;
};

function matchCourse(query: string, course: RhcCourse): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  if (course.name.toLowerCase().includes(q)) return true;
  if (course.category?.toLowerCase().includes(q)) return true;
  if (course.duration?.toLowerCase().includes(q)) return true;
  if (course.price?.toLowerCase().includes(q)) return true;
  return false;
}

export function BridgingProgramsSearch({
  categoriesWithCourses,
  localePrefix = "",
}: BridgingProgramsSearchProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return categoriesWithCourses;
    return categoriesWithCourses
      .map(({ category, courses }) => ({
        category,
        courses: courses.filter((c) => matchCourse(search, c)),
      }))
      .filter(({ courses }) => courses.length > 0);
  }, [categoriesWithCourses, search]);

  const hasQuery = search.trim().length > 0;
  const hasResults = filtered.length > 0;
  const isFr = localePrefix === "/fr";

  const copyEn = {
    heading: "Our bridging programs by category",
    intro: "Each category lists current courses you can take. Select a course to view details and register on RHC Global Bridge.",
    searchLabel: "Search programs by name or category",
    searchPlaceholder: "Search programs by name or category…",
    noMatch: "No programs match your search. Try a different term or clear the search.",
    noPrograms: "No programs available in this view.",
    viewAllInCategory: "View all in this category on Courses →",
    viewCourseDetails: (name: string) => `View ${name} course details`,
    externalLabel: (name: string) => `${name} (opens RHC Global Bridge in new tab)`,
  };
  const copyFr = {
    heading: "Nos programmes de transition par catégorie",
    intro: "Chaque catégorie liste les cours actuels. Sélectionnez un cours pour voir les détails et vous inscrire sur RHC Global Bridge.",
    searchLabel: "Rechercher par nom ou catégorie de programme",
    searchPlaceholder: "Rechercher par nom ou catégorie de programme…",
    noMatch: "Aucun programme ne correspond à votre recherche. Essayez un autre terme ou effacez la recherche.",
    noPrograms: "Aucun programme disponible dans cette vue.",
    viewAllInCategory: "Voir tout dans cette catégorie (Cours) →",
    viewCourseDetails: (name: string) => `Voir les détails du cours ${name}`,
    externalLabel: (name: string) => `${name} (ouvre RHC Global Bridge dans un nouvel onglet)`,
  };
  const t = isFr ? copyFr : copyEn;

  return (
    <section className="mt-12" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-xl font-bold text-slate-900">
        {t.heading}
      </h2>
      <p className="mt-2 text-slate-600">
        {t.intro}
      </p>

      {/* Search */}
      <div className="relative mt-4">
        <label htmlFor="bridging-program-search" className="sr-only">
          {t.searchLabel}
        </label>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <SearchIcon />
        </span>
        <input
          id="bridging-program-search"
          type="search"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full min-h-[42px] rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/80 sm:min-h-[44px] sm:py-3"
          autoComplete="off"
        />
      </div>

      <div className="mt-6 space-y-10">
        {!hasResults && (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
            {hasQuery ? t.noMatch : t.noPrograms}
          </p>
        )}
        {filtered.map(({ category, courses }) => (
          <div
            key={category}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <h3 className="text-lg font-bold text-slate-900">{category}</h3>
            <ul className="mt-4 list-none space-y-2 p-0">
              {courses.map((course) => {
                const courseSlug = localePrefix === "/fr" ? course.slugFr : course.slug;
                const href = course.slug
                  ? `${localePrefix}/courses/${courseSlug}`
                  : course.link;
                const isExternal = !course.slug;
                return (
                  <li key={course.id} className="relative">
                    <Link
                      href={href}
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="relative z-[1] flex cursor-pointer flex-col gap-2 rounded-lg py-2 text-slate-800 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                      aria-label={isExternal ? t.externalLabel(course.name) : t.viewCourseDetails(course.name)}
                    >
                      <span className="min-w-0 flex-1 break-words font-medium">
                        {course.name}
                      </span>
                      <span className="flex flex-shrink-0 flex-wrap items-center gap-2 text-sm">
                        {course.duration && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 ring-1 ring-slate-200/60">
                            {course.duration}
                          </span>
                        )}
                        {course.price && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/60">
                            {course.price.includes("CAD")
                              ? course.price
                              : `${course.price} CAD`}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={`${localePrefix}/courses?category=${encodeURIComponent(category)}`}
              className="mt-3 inline-block text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              {t.viewAllInCategory}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
