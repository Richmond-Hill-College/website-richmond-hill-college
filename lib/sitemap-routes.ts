/**
 * Single source of truth for static sitemap routes.
 * Used by app/sitemap.ts (sitemap.xml) and app/sitemap/page.tsx (human-readable sitemap).
 * When adding a new page, add its path and priority here.
 */
export const staticRoutes: { path: string; priority: number; label: string }[] = [
  { path: "", priority: 0.9, label: "Home" },
  { path: "about-us", priority: 0.8, label: "About Us" },
  { path: "about-us/team", priority: 0.75, label: "Our Team" },
  { path: "message-from-the-president", priority: 0.8, label: "Message from the President" },
  { path: "programs", priority: 0.8, label: "Programs" },
  { path: "course-offerings", priority: 0.8, label: "Course Offerings" },
  { path: "bridging-programs", priority: 0.8, label: "Bridging Programs" },
  { path: "bridge-canadian-certification", priority: 0.8, label: "Bridge to Canadian Certification" },
  { path: "canadian-certification-internationally-educated", priority: 0.8, label: "Canadian Certification for Internationally Educated Professionals" },
  { path: "my-account", priority: 0.8, label: "My Account" },
  { path: "courses", priority: 0.8, label: "Courses" },
  { path: "courses/categories", priority: 0.75, label: "Course Categories" },
  { path: "products", priority: 0.8, label: "Products & Registration" },
  { path: "contact", priority: 0.8, label: "Contact" },
  { path: "support", priority: 0.8, label: "Support" },
  { path: "privacy-policy", priority: 0.6, label: "Privacy Policy" },
  { path: "terms-of-service", priority: 0.6, label: "Terms of Service" },
  { path: "faq", priority: 0.8, label: "FAQ" },
  { path: "faq/categories", priority: 0.75, label: "FAQ by Category" },
  { path: "conferences", priority: 0.8, label: "Conferences" },
  { path: "conferences/nursing-and-healthcare-2025", priority: 0.8, label: "Nursing and Healthcare 2025" },
  { path: "conferences/nursing-and-healthcare-2025/conference-main-page", priority: 0.8, label: "Conference Main Page" },
  { path: "conferences/nursing-and-healthcare-2025/registration", priority: 0.8, label: "Registration" },
  { path: "conferences/nursing-and-healthcare-2025/submit-abstract", priority: 0.8, label: "Submit Abstract" },
  { path: "conferences/nursing-and-healthcare-2025/invitation-letter", priority: 0.8, label: "Invitation Letter" },
  { path: "conferences/nursing-and-healthcare-2025/sponsorship", priority: 0.8, label: "Sponsorship" },
  { path: "conferences/nursing-and-healthcare-2025/accommodations", priority: 0.8, label: "Accommodations" },
  { path: "conferences/nursing-and-healthcare-2025/program-table", priority: 0.8, label: "Program Table" },
  { path: "conferences/nursing-and-healthcare-2025/abstract-proceeding-book", priority: 0.8, label: "Abstract & Proceeding Book" },
  { path: "conferences/nursing-and-healthcare-2025/venue", priority: 0.8, label: "Venue" },
  { path: "conferences/nursing-and-healthcare-2025/contact-1", priority: 0.8, label: "Conference Contact" },
  { path: "sitemap", priority: 0.5, label: "Sitemap" },
];
