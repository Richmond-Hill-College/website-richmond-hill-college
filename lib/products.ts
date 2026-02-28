/**
 * Product/registration page data for conference and other offerings.
 * IDs and slugs match the current site URLs for SEO/bookmark parity.
 */
export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export const products: ProductItem[] = [
  {
    id: "17712348",
    slug: "registration-oral-presentation-speakers",
    title: "Registration – Oral Presentation (Speakers)",
    description: "Register as an oral presentation speaker for the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "17712361",
    slug: "registration-poster-presentation",
    title: "Registration – Poster Presentation",
    description: "Register for poster presentation at the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "17712371",
    slug: "registration-virtual-presentation",
    title: "Registration – Virtual Presentation",
    description: "Register for virtual presentation at the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "17712380",
    slug: "registration-students-oral-poster",
    title: "Registration – Students (Oral & Poster)",
    description: "Student registration for oral or poster presentation at Nursing and Healthcare 2025.",
  },
  {
    id: "17712389",
    slug: "registration-non-presenting-attendees",
    title: "Registration – Non-Presenting Attendees",
    description: "Register as a non-presenting attendee for the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "17712400",
    slug: "registration-one-day-non-presenting-attendees",
    title: "Registration – One-Day Non-Presenting Attendees",
    description: "One-day attendee registration for Nursing and Healthcare 2025.",
  },
  {
    id: "19963671",
    slug: "gold-sponsor",
    title: "Gold Sponsor",
    description: "Gold sponsorship package for the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "19963738",
    slug: "bronze-sponsor",
    title: "Bronze Sponsor",
    description: "Bronze sponsorship package for the Nursing and Healthcare 2025 conference.",
  },
  {
    id: "20227617",
    slug: "program-registration-payment",
    title: "Program Registration Payment",
    description: "Program registration payment for Nursing and Healthcare 2025.",
  },
  {
    id: "20236616",
    slug: "registration-oral-presentation-from-african-east-asian-indian-countries",
    title: "Registration – Oral Presentation (African, East Asian, Indian Countries)",
    description: "Oral presentation speaker registration for attendees from African, East Asian, and Indian countries.",
  },
];

export function getProductByIdAndSlug(id: string, slug: string): ProductItem | undefined {
  return products.find((p) => p.id === id && p.slug === slug);
}

export function getAllProducts(): ProductItem[] {
  return products;
}
