import { siteUrl } from "@/lib/site-url";
import type { RhcCourse } from "@/lib/rhc-global-bridge-courses";

export type CourseJsonLdProps = {
  course: RhcCourse;
  /** Canonical URL of this course page (e.g. ${siteUrl}/courses/${slug}). */
  coursePageUrl: string;
  /** Optional full description for SEO (defaults to generated from name + category). */
  description?: string;
};

/**
 * schema.org Course + EducationalOccupationalProgram JSON-LD for SEO.
 * Use on internal course detail pages for rich results and knowledge panel eligibility.
 */
export function CourseJsonLd({
  course,
  coursePageUrl,
  description,
}: CourseJsonLdProps) {
  const name = course.name;
  const desc =
    description ??
    `Professional bridging program: ${name}. ${course.category ? `Category: ${course.category}. ` : ""}${course.duration ? `Duration: ${course.duration}. ` : ""}Register on RHC Global Bridge.`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description: desc,
    url: coursePageUrl,
    image: course.image,
    sameAs: course.link,
    provider: {
      "@type": "Organization",
      name: "Richmond Hill College of Healthcare and Technology Management",
      url: siteUrl,
    },
    ...(course.duration && {
      timeRequired: course.duration,
    }),
    ...(course.price &&
      course.price !== "" && {
        offers: {
          "@type": "Offer",
          price: parseFloat(course.price.replace(/[^0-9.]/g, "")) || undefined,
          priceCurrency: "CAD",
          priceValidUntil: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          )
            .toISOString()
            .slice(0, 10),
        },
      }),
  };

  const programSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name,
    description: desc,
    url: coursePageUrl,
    image: course.image,
    programType: "professional development",
    provider: {
      "@type": "Organization",
      name: "Richmond Hill College of Healthcare and Technology Management",
      url: siteUrl,
    },
    ...(course.duration && { timeToComplete: course.duration }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
    </>
  );
}
