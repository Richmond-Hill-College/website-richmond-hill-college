/**
 * RHC Global Bridge courses: same as lp-list-courses on rhcglobalbridge.com/courses/.
 * Fetches every LearnPress page and enriches links from WP REST or the verified
 * static catalog. WP REST currently exposes only a subset of published courses,
 * so it must never be used as an inclusion filter.
 */

import { getCourseSlugFr } from "@/lib/course-slug-fr";

const LP_BASE =
  "https://www.rhcglobalbridge.com/wp-json/learnpress/v1/courses";
const WP_BASE =
  "https://www.rhcglobalbridge.com/wp-json/wp/v2/lp_course";
const PER_PAGE = 100;
/** Timeout in ms so the app never hangs if the external API is slow or down. */
const FETCH_TIMEOUT_MS = 12_000;

export type RhcCourse = {
  id: number;
  name: string;
  slug: string;
  /** French URL slug for /fr/courses/[slug]. Use when building French course links. */
  slugFr: string;
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

function fetchWithTimeout(
  url: string,
  options: RequestInit & { next?: { revalidate: number } }
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
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
    const res = await fetchWithTimeout(url.toString(), {
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

/** Default course image when API returns none. Used by course detail and category pages. */
export const DEFAULT_COURSE_IMAGE =
  "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/sliderimage-3.jpg";

/**
 * Fetches all courses from all pages of rhcglobalbridge.com (LearnPress + WP REST).
 * Dedupes by id, skips placeholder "Lorem ipsum" courses, ensures one image per course.
 * On any error (network, timeout, parse) or if fetch takes >15s, returns fallback so pages always load.
 */
const GET_COURSES_TIMEOUT_MS = 15_000;

async function getRhcCoursesUnsafe(): Promise<RhcCourse[]> {
  const [lpList, wpList] = await Promise.all([
      fetchAllPages(LP_BASE, (r) => r.json()),
      fetchAllPages(WP_BASE, (r) => r.json()),
    ]);

    const wpById = new Map<number, { link: string }>();
    for (const c of wpList as { id: number; link: string }[]) {
      wpById.set(c.id, { link: c.link });
    }
    const fallbackById = new Map(
      RHC_GLOBAL_BRIDGE_COURSES_FALLBACK.map((course) => [course.id, course])
    );

    // Begin with the complete verified catalog. This also prevents Next's
    // stale-while-revalidate cache from briefly dropping newly added courses
    // when the upstream list is one refresh behind.
    const coursesById = new Map<number, RhcCourse>(
      RHC_GLOBAL_BRIDGE_COURSES_FALLBACK.map((course) => [course.id, course])
    );

    for (const c of lpList as Array<{
      id: number;
      name: string;
      image: string;
      duration?: string;
      categories?: Array<{ name: string }>;
      price_rendered?: string;
    }>) {
      if (!c.name || c.name.includes("Lorem ipsum")) continue;
      const liveWpCourse = wpById.get(c.id);
      const fallbackCourse = fallbackById.get(c.id);
      const link = liveWpCourse?.link || fallbackCourse?.link;
      if (!link) continue;
      const slug = getCourseSlugFromLink(link);
      coursesById.set(c.id, {
        id: c.id,
        name: c.name.replace(/&#038;/g, "&").replace(/&amp;/g, "&").trim(),
        slug,
        slugFr: getCourseSlugFr(slug),
        image: c.image ?? "",
        link,
        duration: (c.duration ?? "").trim(),
        category: (c.categories?.[0]?.name ?? "")
          .replace(/&amp;/g, "&")
          .trim(),
        price: (c.price_rendered ?? "").trim(),
      });
    }

    return Array.from(coursesById.values());
}

export async function getRhcCourses(): Promise<RhcCourse[]> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("getRhcCourses timeout")), GET_COURSES_TIMEOUT_MS)
    );
    return await Promise.race([getRhcCoursesUnsafe(), timeoutPromise]);
  } catch {
    return RHC_GLOBAL_BRIDGE_COURSES_FALLBACK;
  }
}

/** Get a single course by URL slug (for internal /courses/[slug] pages). */
export async function getCourseBySlug(slug: string): Promise<RhcCourse | null> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.find((c) => c.slug === slug) ?? null;
}

/** All course slugs for generateStaticParams and sitemap (English routes). */
export async function getCourseSlugs(): Promise<string[]> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.map((c) => c.slug).filter(Boolean);
}

/** All French course slugs for /fr/courses/[slug] generateStaticParams and sitemap. */
export async function getCourseSlugsFr(): Promise<string[]> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.map((c) => c.slugFr).filter(Boolean);
}

/** Get a single course by French URL slug (for /fr/courses/[slug] pages). */
export async function getCourseBySlugFr(slugFr: string): Promise<RhcCourse | null> {
  const list = await getRhcCourses().catch(() => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK);
  return list.find((c) => c.slugFr === slugFr) ?? null;
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
): RhcCourse => {
  const slug = getCourseSlugFromLink(link);
  return {
    id,
    name,
    slug,
    slugFr: getCourseSlugFr(slug),
    image,
    link,
    duration,
    category,
    price,
  };
};

export const RHC_GLOBAL_BRIDGE_COURSES_FALLBACK: RhcCourse[] = [
  fallbackWithSlug(
    7435,
    "AI-Powered Digital Skills & Workplace Readiness",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/05/AI-Powered-Digital-Skills-Workplace-Readiness.jpg",
    "https://www.rhcglobalbridge.com/courses/ai-powered-digital-skills-workplace-readiness-certificate/",
    "40 Hours",
    "5- Information Technology, AI & Computer Science",
    "$1,290.00"
  ),
  fallbackWithSlug(
    7212,
    "Cross-Border Healthcare Coordination & Medical Tourism Management",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/04/Medical-Tourism-Management.jpg",
    "https://www.rhcglobalbridge.com/courses/cross-border-healthcare-coordination-medical-tourism-management/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$1,790.00"
  ),
  fallbackWithSlug(
    6894,
    "Developmental Services Worker (DSW) Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-12-2026-10_05_19-AM.jpg",
    "https://www.rhcglobalbridge.com/courses/developmental-service-worker-dsw-bridging-program/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$1,090.00"
  ),
  fallbackWithSlug(
    6728,
    "Applied Cybersecurity & Secure Data Systems Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/03/Applied-Cybersecurity-Secure-Data-Systems-Program.jpg",
    "https://www.rhcglobalbridge.com/courses/cybersecurity-data-systems-level-1-bridging-program/",
    "40 Hours",
    "5- Information Technology, AI & Computer Science",
    "$990.00"
  ),
  fallbackWithSlug(
    6693,
    "Canadian Workplace-Ready Greenhouse & Hydroponic Operations",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/03/Greenhouse-Hydroponic.jpg",
    "https://www.rhcglobalbridge.com/courses/canadian-workplace-ready-greenhouse-hydroponic-operations/",
    "40 Hours",
    "4- Skilled Trades & Technical Fields",
    "$1,090.00"
  ),
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
    "1- Healthcare & Human Services",
    "$140.00"
  ),
  fallbackWithSlug(
    6027,
    "Pharmacy Assistant (Canadian Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2026/02/Pharacy-Assistant-Canadian-Standard-Final.jpg",
    "https://www.rhcglobalbridge.com/courses/pharmacy-assistant-canadian-standards/",
    "Lifetime",
    "1- Healthcare & Human Services",
    "$890.00"
  ),
  fallbackWithSlug(
    5641,
    "International Community & Humanitarian Nursing Program West Africa Track (Ghana)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/12/International-Ghana-Community-Humanitarian-Nursing-Program-RHC.jpg",
    "https://www.rhcglobalbridge.com/courses/international-community-humanitarian-nursing-program-west-africa-track-ghana/",
    "24 Weeks",
    "1- Healthcare & Human Services",
    "$480.00"
  ),
  fallbackWithSlug(
    4906,
    "International Culinary Skills Bridging Program (Canadian Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/12/ChatGPT-Image-Dec-19-2025-12_23_13-AM.jpg",
    "https://www.rhcglobalbridge.com/courses/international-culinary-skills-bridging-program-canadian-standards/",
    "40 Hours",
    "3- Hospitality & Service Industries",
    "$240.00"
  ),
  fallbackWithSlug(
    4768,
    "Canadian Acute Stroke Care & Thrombolytic Pathway Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/12/canadian-acute-stroke-care-thrombolytic-pathway-bridging-program-rhc-canada-1.jpg",
    "https://www.rhcglobalbridge.com/courses/canadian-acute-stroke-care-thrombolytic-pathway-bridging-program/",
    "36 Hours",
    "1- Healthcare & Human Services",
    "$190.00"
  ),
  fallbackWithSlug(
    4454,
    "Professional Makeup, Brows & Beauty Artistry Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/professional-makeup-browsbeauty-artistry-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/professional-makeup-brows-beauty-artistry-bridging-certificate/",
    "35 Hours",
    "6- Beauty, Aesthetics & Cosmetology",
    "$190.00"
  ),
  fallbackWithSlug(
    4248,
    "Energy & Environmental Safety Standards (OHSA)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/energy-environmental-safety-standards-bridging-program-rhc.jpg",
    "https://www.rhcglobalbridge.com/courses/energy-environmental-safety-standards-ohsa/",
    "40 Hours",
    "4- Skilled Trades & Technical Fields",
    "$190.00"
  ),
  fallbackWithSlug(
    4072,
    "AI & Data Science Bridging Program – Canadian Standards",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/ai-data-science-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/ai-data-science-bridging-program-canadian-standards/",
    "40 Hours",
    "5- Information Technology, AI & Computer Science",
    "$390.00"
  ),
  fallbackWithSlug(
    3261,
    "Hospitality & Customer Service Bridging Program – Canadian Standards",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/Hospitalty-Customer-Servic-Bridging-Program-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/hospitality-customer-service-bridging-program-canadian-standards-2/",
    "36 Hours",
    "3- Hospitality & Service Industries",
    "$240.00"
  ),
  fallbackWithSlug(
    3245,
    "Front Desk & Hotel Operations Bridging Program – Canadian Standards",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/Front-Desk-Hote1-Operations-Bridging-Program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/hospitality-customer-service-bridging-program-canadian-standards/",
    "40 Hours",
    "3- Hospitality & Service Industries",
    "$240.00"
  ),
  fallbackWithSlug(
    3237,
    "Professional Culinary Arts Bridging Program (Canadian Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/professional-culinary-arts-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/professional-culinary-arts-bridging-program-canadian-standards/",
    "40 Hours",
    "3- Hospitality & Service Industries",
    "$240.00"
  ),
  fallbackWithSlug(
    2747,
    "Wound & Ostomy Care Bridging Program – Canadian Standards",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/11/wound-ostomy-care-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/wound-ostomy-care-bridging-program-canadian-standards/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$790.00"
  ),
  fallbackWithSlug(
    462,
    "International Healthcare Support Worker Bridging Program (PSW-Focused)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/international-healthcare-psw-bridging-program-canada.jpg.jpg",
    "https://www.rhcglobalbridge.com/courses/psw-bridging-program/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$790.00"
  ),
  fallbackWithSlug(
    460,
    "Pet Grooming Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/pet-training-behavior-bridging-program-rhc.jpg",
    "https://www.rhcglobalbridge.com/courses/pet-grooming-bridge-program/",
    "40 Hours",
    "2- Animal Care & Pet Industries",
    "$1,890.00"
  ),
  fallbackWithSlug(
    458,
    "Veterinary Assistant Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/veterinary-assistant-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/courses-veterinary-assistant-training-canada/",
    "36 Hours",
    "2- Animal Care & Pet Industries",
    "$190.00"
  ),
  fallbackWithSlug(
    456,
    "Pet Training & Behavior Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/Pet-training-Behavior-Bridging-Program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/courses-pet-training-behavior-course-canada/",
    "40 Hours",
    "2- Animal Care & Pet Industries",
    "$290.00"
  ),
  fallbackWithSlug(
    438,
    "Dental Assistant Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/canadian-dental-assistant-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/ldental-assistant-training-canada/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$340.00"
  ),
  fallbackWithSlug(
    436,
    "Medical Office Administration Bridging Program Canadian Standard",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/medical-office-administration-bridging-program-canadian-standard-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/medical-office-administration-training-canada/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$590.00"
  ),
  fallbackWithSlug(
    434,
    "International Nursing Bridging Program – Pathway to RN Licensure in Canada & USA",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/international-nursing-rn-licensure-bridging-program-rhc-canada-1.jpg",
    "https://www.rhcglobalbridge.com/courses/nursing-bridging-program-canada/",
    "40 Hours",
    "1- Healthcare & Human Services",
    "$190.00"
  ),
  fallbackWithSlug(
    432,
    "International Health, Fitness, and Coaching Bridging Program",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/international-health-fitness-coaching-bridging-program-rhc.jpg",
    "https://www.rhcglobalbridge.com/courses/fitness-coaching-training-canada/",
    "38 Hours",
    "1- Healthcare & Human Services",
    "$190.00"
  ),
  fallbackWithSlug(
    422,
    "Professional Barista Bridging Program (Canada/US Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/professional-barista-bridging-program-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/food-beverage-service-training-canada-2/",
    "36 Hours",
    "3- Hospitality & Service Industries",
    "$190.00"
  ),
  fallbackWithSlug(
    420,
    "Food & Beverage Service Bridging Program (Canadian Standards)",
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/food-beverage-service-bridging-progran-rhc-canada.jpg",
    "https://www.rhcglobalbridge.com/courses/food-beverage-service-training-canada/",
    "36 Hours",
    "3- Hospitality & Service Industries",
    "$240.00"
  ),
];
