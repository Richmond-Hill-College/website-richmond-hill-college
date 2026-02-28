/**
 * RHC Global Bridge courses: same as lp-list-courses on rhcglobalbridge.com/courses/.
 * Fetches ALL pages from LearnPress + WP REST APIs, merges by id, one image per course (no repeats).
 */

const LP_BASE =
  "https://www.rhcglobalbridge.com/wp-json/learnpress/v1/courses";
const WP_BASE =
  "https://www.rhcglobalbridge.com/wp-json/wp/v2/lp_course";
const PER_PAGE = 100;

export type RhcCourse = {
  id: number;
  name: string;
  slug: string;
  image: string;
  link: string;
  duration: string;
  category: string;
  price: string;
};

/** Extract URL slug from RHC course link (e.g. energy-environmental-safety-standards-ohsa). */
export function getCourseSlugFromLink(link: string): string {
  try {
    const pathname = new URL(link).pathname;
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? "";
  } catch {
    return "";
  }
}

async function fetchAllPages<T>(
  baseUrl: string,
  parse: (res: Response) => Promise<T[]>
): Promise<T[]> {
  const out: T[] = [];
  let page = 1;
  const url = new URL(baseUrl);
  url.searchParams.set("per_page", String(PER_PAGE));
  while (true) {
    url.searchParams.set("page", String(page));
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) break;
    const list = await parse(res);
    if (list.length === 0) break;
    out.push(...list);
    const totalPages = res.headers.get("x-wp-totalpages");
    if (totalPages && page >= parseInt(totalPages, 10)) break;
    if (list.length < PER_PAGE) break;
    page++;
  }
  return out;
}

/**
 * Fetches all courses from all pages of rhcglobalbridge.com (LearnPress + WP REST).
 * Dedupes by id, skips placeholder "Lorem ipsum" courses, ensures one image per course.
 */
export async function getRhcCourses(): Promise<RhcCourse[]> {
  const [lpList, wpList] = await Promise.all([
    fetchAllPages(LP_BASE, (r) => r.json()),
    fetchAllPages(WP_BASE, (r) => r.json()),
  ]);

  const wpById = new Map<number, { link: string }>();
  for (const c of wpList as { id: number; link: string }[]) {
    wpById.set(c.id, { link: c.link });
  }

  const seenIds = new Set<number>();
  const courses: RhcCourse[] = [];

  for (const c of lpList as Array<{
    id: number;
    name: string;
    image: string;
    duration?: string;
    categories?: Array<{ name: string }>;
    price_rendered?: string;
  }>) {
    if (seenIds.has(c.id)) continue;
    if (!c.name || c.name.includes("Lorem ipsum")) continue;
    const wp = wpById.get(c.id);
    if (!wp) continue;
    seenIds.add(c.id);
    const link = wp.link;
    courses.push({
      id: c.id,
      name: c.name.replace(/&#038;/g, "&").replace(/&amp;/g, "&").trim(),
      slug: getCourseSlugFromLink(link),
      image: c.image ?? "",
      link,
      duration: (c.duration ?? "").trim(),
      category: (c.categories?.[0]?.name ?? "")
        .replace(/&amp;/g, "&")
        .trim(),
      price: (c.price_rendered ?? "").trim(),
    });
  }

  return courses;
}

/** Get a single course by URL slug (for internal /courses/[slug] pages). */
export async function getCourseBySlug(slug: string): Promise<RhcCourse | null> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.find((c) => c.slug === slug) ?? null;
}

/** All course slugs for generateStaticParams and sitemap. */
export async function getCourseSlugs(): Promise<string[]> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.map((c) => c.slug).filter(Boolean);
}

/** URL-safe slug from course category name (e.g. "6- Beauty, Aesthetics & Cosmetology" → "6-beauty-aesthetics-and-cosmetology"). */
export function getCourseCategorySlug(categoryName: string): string {
  return categoryName
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, "-and-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "uncategorized";
}

/** All course categories with slug and count (for /courses/categories and sitemap). */
export async function getCourseCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  const byName = new Map<string, number>();
  for (const c of list) {
    const name = c.category?.trim() || "Uncategorized";
    byName.set(name, (byName.get(name) ?? 0) + 1);
  }
  return Array.from(byName.entries())
    .map(([name, count]) => ({
      name,
      slug: getCourseCategorySlug(name),
      count,
    }))
    .filter((item) => item.slug && item.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Courses in a given category slug (for /courses/category/[slug]). */
export async function getCoursesByCategorySlug(slug: string): Promise<RhcCourse[]> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  const categoryNames = new Set(list.map((c) => c.category?.trim() || "Uncategorized"));
  const categoryName = Array.from(categoryNames).find((name) => getCourseCategorySlug(name) === slug);
  if (!categoryName) return [];
  return list.filter((c) => (c.category?.trim() || "Uncategorized") === categoryName);
}

/**
 * Static fallback used when fetch fails (e.g. no network at build).
 * Matches the structure from the API so UI stays consistent.
 */
const fallbackWithSlug = (
  id: number,
  name: string,
  image: string,
  link: string,
  duration: string,
  category: string,
  price: string
): RhcCourse => ({
  id,
  name,
  slug: getCourseSlugFromLink(link),
  image,
  link,
  duration,
  category,
  price,
});

export const RHC_GLOBAL_BRIDGE_COURSES_FALLBACK: RhcCourse[] = [
  fallbackWithSlug(
    6496,
    "Canadian Workplace-Ready Hair Styling (Hybrid Program)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/02/ChatGPT-Image-Feb-25-2026-12_10_29-PM.jpg",
    "https://www.rhcglobalbridge.com/courses/basic-hair-styling-haircut-demonstration-hybrid-program/",
    "40 Hours",
    "6- Beauty, Aesthetics & Cosmetology",
    "$990.00"
  ),
  fallbackWithSlug(
    6386,
    "Pharmacy Assistant Simulator (Basic Version)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/02/Pharmacy-Assistant-Simulation.jpg",
    "https://www.rhcglobalbridge.com/courses/pharmacy-assistant-simulator-basic-version/",
    "10 Hours",
    "",
    "$120.00"
  ),
  fallbackWithSlug(
    6027,
    "Pharmacy Assistant (Canadian Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/02/Pharacy-Assistant-Canadian-Standard-Final.jpg",
    "https://www.rhcglobalbridge.com/courses/pharmacy-assistant-canadian-standards/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$990.00"
  ),
  fallbackWithSlug(
    462,
    "International Healthcare Personal Support Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/international-healthcare-psw-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-12/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$340.00"
  ),
  fallbackWithSlug(
    460,
    "Pet Grooming Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/pet-training-behavior-bridging-program-rhc.jpg",
    "https://www.rhcglobalbridge.com/courses/pet-grooming-bridge-program/",
    "40 Hours",
    "2- Animal Care & Pet Industries",
    "$1,990.00"
  ),
];
