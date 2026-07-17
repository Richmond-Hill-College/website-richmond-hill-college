/**
 * Mapping from English course URL slug to French course URL slug.
 * Used for /fr/courses/[slug] routes and French course links.
 * Add entries as courses are translated; unmapped slugs fall back to the English slug.
 */
export const COURSE_SLUG_EN_TO_FR: Record<string, string> = {
  "ai-powered-digital-skills-workplace-readiness-certificate":
    "competences-numeriques-ia-preparation-milieu-travail",
  "cross-border-healthcare-coordination-medical-tourism-management":
    "coordination-soins-transfrontaliers-gestion-tourisme-medical",
  "developmental-service-worker-dsw-bridging-program":
    "programme-transition-intervenant-services-developpementaux",
  "canadian-workplace-ready-greenhouse-hydroponic-operations":
    "operations-serre-hydroponie-preparation-milieu-travail",
  "basic-hair-styling-haircut-demonstration-hybrid-program":
    "coiffure-base-demonstration-coupe-programme-hybride",
  "pharmacy-assistant-simulator-basic-version":
    "assistant-pharmacie-simulateur-version-de-base",
  "pharmacy-assistant-canadian-standards":
    "assistant-pharmacie-normes-canadiennes",
  "international-community-humanitarian-nursing-program-west-africa-track-ghana":
    "programme-soins-infirmiers-communautaires-humanitaires-ghana",
  "international-culinary-skills-bridging-program-canadian-standards":
    "programme-transition-competences-culinaires-normes-canadiennes",
  "canadian-acute-stroke-care-thrombolytic-pathway-bridging-program":
    "programme-transition-soins-avc-aigus-thrombolyse",
  "professional-makeup-brows-beauty-artistry-bridging-certificate":
    "programme-transition-maquillage-sourcils-esthetique",
  "energy-environmental-safety-standards-ohsa":
    "normes-securite-energie-environnement-ohsa",
  "ai-data-science-bridging-program-canadian-standards":
    "programme-transition-ia-science-donnees-normes-canadiennes",
  "hospitality-customer-service-bridging-program-canadian-standards-2":
    "programme-transition-hotellerie-service-client-normes-canadiennes",
  "hospitality-customer-service-bridging-program-canadian-standards":
    "programme-transition-reception-operations-hotelieres",
  "professional-culinary-arts-bridging-program-canadian-standards":
    "programme-transition-arts-culinaires-professionnels",
  "wound-ostomy-care-bridging-program-canadian-standards":
    "programme-transition-soins-plaies-stomies",
  "psw-bridging-program":
    "programme-transition-travailleur-soutien-sante-psw",
  "pet-grooming-bridge-program":
    "programme-transition-toilettage-animaux",
  "courses-veterinary-assistant-training-canada":
    "programme-transition-assistant-veterinaire",
  "courses-pet-training-behavior-course-canada":
    "programme-transition-dressage-comportement-animal",
  "ldental-assistant-training-canada":
    "programme-transition-assistant-dentaire",
  "medical-office-administration-training-canada":
    "programme-transition-administration-bureau-medical",
  "nursing-bridging-program-canada":
    "programme-transition-soins-infirmiers-autorisation-canada-etats-unis",
  "fitness-coaching-training-canada":
    "programme-transition-sante-conditionnement-coaching",
  "food-beverage-service-training-canada-2":
    "programme-transition-barista-normes-canada-etats-unis",
  "food-beverage-service-training-canada":
    "programme-transition-service-aliments-boissons",
  "cybersecurity-data-systems-level-1-bridging-program":
    "cybersecurite-appliquee-systemes-donnees-securises",
};

/** Get the French URL slug for a course. Falls back to English slug if not mapped. */
export function getCourseSlugFr(slugEn: string): string {
  return COURSE_SLUG_EN_TO_FR[slugEn] ?? slugEn;
}
