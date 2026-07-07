/**
 * Single source of truth for static sitemap routes (EN + FR).
 * When adding a new page: add path, priority, label, labelFr; create app/{path}/page.tsx and app/fr/{path}/page.tsx.
 */
export const staticRoutes: { path: string; priority: number; label: string; labelFr: string }[] = [
  { path: "", priority: 0.9, label: "Home", labelFr: "Accueil" },
  { path: "about-us", priority: 0.8, label: "About Us", labelFr: "À propos" },
  { path: "about-us/team", priority: 0.75, label: "Our Team", labelFr: "Notre équipe" },
  { path: "message-from-the-president", priority: 0.8, label: "Message from the President", labelFr: "Message de la présidente" },
  { path: "programs", priority: 0.8, label: "Programs", labelFr: "Programmes" },
  { path: "course-offerings", priority: 0.8, label: "Course Offerings", labelFr: "Offre de cours" },
  { path: "bridging-programs", priority: 0.8, label: "Bridging Programs", labelFr: "Programmes de transition" },
  { path: "bridge-canadian-certification", priority: 0.8, label: "Bridge to Canadian Certification", labelFr: "Passerelle vers la certification canadienne" },
  { path: "canadian-certification-internationally-educated", priority: 0.8, label: "Canadian Certification for Internationally Educated Professionals", labelFr: "Certification canadienne pour les professionnels formés à l'étranger" },
  { path: "my-account", priority: 0.8, label: "My Account", labelFr: "Mon compte" },
  { path: "courses", priority: 0.8, label: "Courses", labelFr: "Cours" },
  { path: "courses/categories", priority: 0.75, label: "Course Categories", labelFr: "Catégories de cours" },
  { path: "products", priority: 0.8, label: "Products & Registration", labelFr: "Produits et inscription" },
  { path: "contact", priority: 0.8, label: "Contact", labelFr: "Contact" },
  { path: "support", priority: 0.8, label: "Support", labelFr: "Soutien" },
  { path: "privacy-policy", priority: 0.6, label: "Privacy Policy", labelFr: "Politique de confidentialité" },
  { path: "terms-of-service", priority: 0.6, label: "Terms of Service", labelFr: "Conditions d'utilisation" },
  { path: "faq", priority: 0.8, label: "FAQ", labelFr: "FAQ" },
  { path: "faq/categories", priority: 0.75, label: "FAQ by Category", labelFr: "FAQ par catégorie" },
  { path: "conferences", priority: 0.8, label: "Conferences", labelFr: "Conférences" },
  { path: "conferences/nursing-and-healthcare-2025", priority: 0.7, label: "Nursing and Healthcare 2025 (Recap)", labelFr: "Soins infirmiers et santé 2025 (Récapitulatif)" },
  // Conference is past (Nov 2025). Time-sensitive subpages are noindex and excluded
  // from the sitemap. The hub, program-table and proceedings stay indexable.
  { path: "conferences/nursing-and-healthcare-2025/conference-main-page", priority: 0.5, label: "Conference Overview (2025)", labelFr: "Aperçu de la conférence (2025)" },
  { path: "conferences/nursing-and-healthcare-2025/program-table", priority: 0.5, label: "Program Table (2025)", labelFr: "Tableau du programme (2025)" },
  { path: "conferences/nursing-and-healthcare-2025/abstract-proceeding-book", priority: 0.6, label: "Abstract & Proceeding Book (2025)", labelFr: "Résumés et actes (2025)" },
  { path: "search", priority: 0.4, label: "Search", labelFr: "Rechercher" },
  { path: "sitemap", priority: 0.5, label: "Sitemap", labelFr: "Plan du site" },
];
