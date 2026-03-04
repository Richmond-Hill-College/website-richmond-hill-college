"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";

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
const DEFAULT_COURSE_IMAGE =
  "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/sliderimage-3.jpg";

type CourseFiltersProps = {
  courses: RhcCourse[];
  /** Initial category from URL (e.g. ?category=...) for deep links from Programs. */
  initialCategory?: string;
  /** e.g. "/fr" for French so course links point to /fr/courses/... */
  localePrefix?: string;
  /**
   * When provided, the filter bar is shown but this function renders the course list
   * instead of the default grid (e.g. for course-offerings article layout).
   */
  renderItems?: (filtered: RhcCourse[]) => React.ReactNode;
};

const copyEn = {
  showFilters: "Show filters",
  hideFilters: "Hide filters",
  searchLabel: "Search courses by name or category",
  searchPlaceholder: "Search courses by name or category…",
  filters: "Filters",
  category: "Category",
  allCategories: "All categories",
  duration: "Duration",
  anyDuration: "Any duration",
  clearFilters: "Clear filters",
  courseCount: (n: number) => `${n} course${n !== 1 ? "s" : ""}`,
  courseCountFiltered: (a: number, b: number) => `${a} of ${b} course${b !== 1 ? "s" : ""}`,
  noMatch: "No courses match your filters. Try adjusting search or filters.",
  viewDetails: "View details",
  viewCourseDetails: (name: string) => `View ${name} course details`,
  courseImageAlt: (name: string) => `${name} – course at Richmond Hill College`,
};

const copyFr = {
  showFilters: "Afficher les filtres",
  hideFilters: "Masquer les filtres",
  searchLabel: "Rechercher par nom ou catégorie de cours",
  searchPlaceholder: "Rechercher par nom ou catégorie de cours…",
  filters: "Filtres",
  category: "Catégorie",
  allCategories: "Toutes les catégories",
  anyDuration: "Toute durée",
  duration: "Durée",
  clearFilters: "Réinitialiser les filtres",
  courseCount: (n: number) => `${n} cours`,
  courseCountFiltered: (a: number, b: number) => `${a} sur ${b} cours`,
  noMatch: "Aucun cours ne correspond à vos critères. Modifiez la recherche ou les filtres.",
  viewDetails: "Voir les détails",
  viewCourseDetails: (name: string) => `Voir les détails du cours ${name}`,
  courseImageAlt: (name: string) => `${name} – cours au Collège Richmond Hill`,
};

export function CourseFilters({ courses, initialCategory = "", localePrefix = "", renderItems }: CourseFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [duration, setDuration] = useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(Boolean(initialCategory));
  const isFr = localePrefix === "/fr";
  const t = isFr ? copyFr : copyEn;

  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const durations = useMemo(() => {
    const set = new Set(courses.map((c) => c.duration).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  // Defer filter values so list updates don't block input (fixes INP: event handlers blocking UI)
  const deferredSearch = useDeferredValue(search);
  const deferredCategory = useDeferredValue(category);
  const deferredDuration = useDeferredValue(duration);

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

  // List is driven by deferred values so heavy grid re-renders don't block the main thread
  const filteredForList = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        !deferredSearch ||
        course.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
        (course.category && course.category.toLowerCase().includes(deferredSearch.toLowerCase()));
      const matchCategory = !deferredCategory || course.category === deferredCategory;
      const matchDuration = !deferredDuration || course.duration === deferredDuration;
      return matchSearch && matchCategory && matchDuration;
    });
  }, [courses, deferredSearch, deferredCategory, deferredDuration]);

  const hasActiveFilters = Boolean(search || category || duration);
  const activeAdvancedFilterCount = Number(Boolean(category)) + Number(Boolean(duration));

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setDuration("");
  };

  return (
    <>
      {/* Filter bar */}
      <div className="mt-8 space-y-3 sm:space-y-4">
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            aria-expanded={mobileFiltersOpen}
            aria-controls="courses-advanced-filters"
          >
            <FilterIcon />
            {mobileFiltersOpen ? t.hideFilters : t.showFilters}
            {activeAdvancedFilterCount > 0 && (
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                {activeAdvancedFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <label htmlFor="course-search" className="sr-only">
            {t.searchLabel}
          </label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            id="course-search"
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[42px] rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/80 sm:min-h-[44px] sm:py-3 tablet:min-h-[48px] tablet:py-3.5 tablet:pl-11"
            autoComplete="off"
          />
        </div>

        {/* Category & duration filters */}
        <div
          id="courses-advanced-filters"
          className={`${mobileFiltersOpen ? "grid" : "hidden"} gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3`}
        >
          <span className="hidden items-center gap-2 text-sm font-medium text-slate-600 sm:flex">
            <FilterIcon />
            <span>{t.filters}</span>
          </span>

          <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
            <div className="flex min-h-[40px] w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm sm:min-h-[44px] sm:w-auto tablet:min-h-[48px] tablet:px-4">
              <CategoryIcon />
              <label htmlFor="filter-category" className="sr-only">
                {t.category}
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-h-[34px] min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-700 focus:ring-0 sm:min-w-[10rem] sm:flex-none tablet:min-w-[11rem] tablet:text-[15px]"
              >
                <option value="">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex min-h-[40px] w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm sm:min-h-[44px] sm:w-auto tablet:min-h-[48px] tablet:px-4">
              <ClockIcon />
              <label htmlFor="filter-duration" className="sr-only">
                {t.duration}
              </label>
              <select
                id="filter-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="min-h-[34px] min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-700 focus:ring-0 sm:min-w-[8rem] sm:flex-none tablet:min-w-[9rem] tablet:text-[15px]"
              >
                <option value="">{t.anyDuration}</option>
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
                className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 sm:min-h-[44px] sm:w-auto sm:justify-start tablet:min-h-[48px] tablet:px-4"
              >
                <ClearIcon />
                {t.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-slate-500">
          {filtered.length === courses.length
            ? t.courseCount(courses.length)
            : t.courseCountFiltered(filtered.length, courses.length)}
        </p>
      </div>

      {/* Course list: custom render (e.g. article layout) or default grid. Uses deferred filter so list updates don't block INP. */}
      {renderItems ? (
        <div className="mt-8">
          {filteredForList.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 py-12 text-center text-slate-600">
              {t.noMatch}
            </div>
          ) : (
            renderItems(filteredForList)
          )}
        </div>
      ) : (
        <ul className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3" aria-busy={filtered.length !== filteredForList.length}>
          {filteredForList.length === 0 ? (
            <li className="col-span-full rounded-xl border border-slate-200 bg-slate-50/50 py-12 text-center text-slate-600">
              {t.noMatch}
            </li>
          ) : (
            filteredForList.map((course) => (
              <li
                key={course.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                <Link
                  href={course.slug ? `${localePrefix}/courses/${localePrefix === "/fr" ? course.slugFr : course.slug}` : course.link || RHC_COURSES_URL}
                  className="flex flex-col"
                  aria-label={t.viewCourseDetails(course.name)}
                  {...(course.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <div className="relative w-full flex-shrink-0 bg-slate-100 aspect-[16/10] overflow-hidden">
                    <Image
                      src={course.image || DEFAULT_COURSE_IMAGE}
                      alt={t.courseImageAlt(course.name)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700">
                      {course.name}
                    </h2>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      {course.category && <span>{course.category}</span>}
                      {course.duration && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200/60">
                          {course.duration}
                        </span>
                      )}
                      {course.price && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-800 ring-1 ring-emerald-200/60">
                          {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                        </span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 group-hover:text-slate-600">
                      {t.viewDetails}
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
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
