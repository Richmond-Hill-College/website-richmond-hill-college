/**
 * Mapping from English course URL slug to French course URL slug.
 * Used for /fr/courses/[slug] routes and French course links.
 * Add entries as courses are translated; unmapped slugs fall back to the English slug.
 */
export const COURSE_SLUG_EN_TO_FR: Record<string, string> = {
  "basic-hair-styling-haircut-demonstration-hybrid-program":
    "coiffure-base-demonstration-coupe-programme-hybride",
  "pharmacy-assistant-simulator-basic-version":
    "assistant-pharmacie-simulateur-version-de-base",
  "pharmacy-assistant-canadian-standards":
    "assistant-pharmacie-normes-canadiennes",
  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-12":
    "programme-transition-soins-sante-international",
  "pet-grooming-bridge-program":
    "programme-transition-toilettage-animaux",
  "cybersecurity-data-systems-level-1-bridging-program":
    "cybersecurite-appliquee-systemes-donnees-securises",
};

/** Get the French URL slug for a course. Falls back to English slug if not mapped. */
export function getCourseSlugFr(slugEn: string): string {
  return COURSE_SLUG_EN_TO_FR[slugEn] ?? slugEn;
}
