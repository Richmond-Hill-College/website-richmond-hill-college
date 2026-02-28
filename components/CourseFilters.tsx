"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";

const iconClass = "size-5 shrink-0 text-slate-500";

function SearchIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.2-5.2m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6Z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18l-4 6v5l-4 2v-7L3 4.5Z" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

const RHC_COURSES_URL = "https://www.rhcglobalbridge.com/courses/";

type CourseFiltersProps = {
  courses: RhcCourse[];
  /** Initial category from URL (e.g. ?category=...) for deep links from Programs. */
  initialCategory?: string;
  /**
   * When provided, the filter bar is shown but this function renders the course list
   * instead of the default grid (e.g. for course-offerings article layout).
   */
  renderItems?: (filtered: RhcCourse[]) => React.ReactNode;
};

export function CourseFilters({ courses, initialCategory = "", renderItems }: CourseFiltersProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [duration, setDuration] = useState<string>("");
  const copy =
    locale === "fr"
      ? {
          searchLabel: "Rechercher des cours par nom ou categorie",
          searchPlaceholder: "Rechercher des cours par nom ou categorie...",
          filters: "Filtres",
          category: "Categorie",
          duration: "Duree",
          allCategories: "Toutes les categories",
          anyDuration: "Toute duree",
          clearFilters: "Effacer les filtres",
          noResults: "Aucun cours ne correspond a vos filtres. Essayez d'ajuster la recherche ou les filtres.",
          viewDetails: "Voir les details ->",
        }
      : {
          searchLabel: "Search courses by name or category",
          searchPlaceholder: "Search courses by name or category...",
          filters: "Filters",
          category: "Category",
          duration: "Duration",
          allCategories: "All categories",
          anyDuration: "Any duration",
          clearFilters: "Clear filters",
          noResults: "No courses match your filters. Try adjusting search or filters.",
          viewDetails: "View details ->",
        };

  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const durations = useMemo(() => {
    const set = new Set(courses.map((c) => c.duration).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        !search ||
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        (course.category && course.category.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = !category || course.category === category;
      const matchDuration = !duration || course.duration === duration;
      return matchSearch && matchCategory && matchDuration;
    });
  }, [courses, search, category, duration]);

  const hasActiveFilters = Boolean(search || category || duration);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setDuration("");
  };

  return (
    <>
      {/* Filter bar */}
      <div className="mt-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="course-search" className="sr-only">
            {copy.searchLabel}
          </label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            id="course-search"
            type="search"
            placeholder={copy.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/80 tablet:min-h-[48px] tablet:py-3.5 tablet:pl-11"
            autoComplete="off"
          />
        </div>

        {/* Category & duration filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <FilterIcon />
            <span>{copy.filters}</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm tablet:min-h-[48px] tablet:px-4">
              <CategoryIcon />
              <label htmlFor="filter-category" className="sr-only">
                {copy.category}
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-h-[36px] min-w-[10rem] border-0 bg-transparent text-sm text-slate-700 focus:ring-0 tablet:min-w-[11rem] tablet:text-[15px]"
              >
                <option value="">{copy.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm tablet:min-h-[48px] tablet:px-4">
              <ClockIcon />
              <label htmlFor="filter-duration" className="sr-only">
                {copy.duration}
              </label>
              <select
                id="filter-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="min-h-[36px] min-w-[8rem] border-0 bg-transparent text-sm text-slate-700 focus:ring-0 tablet:min-w-[9rem] tablet:text-[15px]"
              >
                <option value="">{copy.anyDuration}</option>
                {durations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 tablet:min-h-[48px] tablet:px-4"
              >
                <ClearIcon />
                {copy.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-slate-500">
          {filtered.length === courses.length
            ? `${courses.length} course${courses.length !== 1 ? "s" : ""}`
            : `${filtered.length} of ${courses.length} course${courses.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Course list: custom render (e.g. article layout) or default grid */}
      {renderItems ? (
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 py-12 text-center text-slate-600">
              {copy.noResults}
            </div>
          ) : (
            renderItems(filtered)
          )}
        </div>
      ) : (
        <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <li className="col-span-full rounded-xl border border-slate-200 bg-slate-50/50 py-12 text-center text-slate-600">
              {copy.noResults}
            </li>
          ) : (
            filtered.map((course) => (
              <li
                key={course.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  href={
                    course.slug
                      ? withLocale(`/courses/${course.slug}`, locale)
                      : course.link || RHC_COURSES_URL
                  }
                  className="flex flex-col sm:flex-row sm:items-stretch"
                  aria-label={`View ${course.name} course details`}
                  {...(course.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <div className="relative w-full flex-shrink-0 bg-slate-100 aspect-[4/3] min-h-[14rem] sm:h-52 sm:w-44 sm:min-h-0 sm:aspect-auto">
                    <Image
                      src={course.image}
                      alt={`${course.name} – course at Richmond Hill College`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <h2 className="font-semibold text-slate-900">{course.name}</h2>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-sm text-slate-600">
                      {course.category && <span>{course.category}</span>}
                      {course.duration && <span>{course.duration}</span>}
                    </div>
                    <span className="mt-2 inline-block text-sm font-medium text-slate-800">
                      {copy.viewDetails}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
