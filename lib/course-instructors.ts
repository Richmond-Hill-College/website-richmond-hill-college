/**
 * Course organizer/instructor by course slug.
 * Used on course detail pages to show who leads each program.
 * Add profile photos under public/images/instructors/ (e.g. elijah-royaie.jpg);
 * if the image is missing, the UI falls back to initials.
 */

export type CourseInstructor = {
  name: string;
  role: string;
  /** Optional: path under /images or full URL for profile photo. */
  image?: string;
};

const BY_COURSE_SLUG: Record<string, CourseInstructor> = {
  "cybersecurity-data-systems-level-1-bridging-program": {
    name: "Elijah Royaie",
    role: "Organizer & Instructor",
    image: "/images/instructors/elijah-royaie.png",
  },
};

/** Returns the instructor for a course (by English slug) if defined. */
export function getCourseInstructor(courseSlug: string): CourseInstructor | null {
  return BY_COURSE_SLUG[courseSlug] ?? null;
}
