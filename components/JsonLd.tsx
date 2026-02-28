import { siteUrl } from "@/lib/site-url";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Richmond Hill College of Healthcare and Technology Management",
  url: siteUrl,
  logo: `${siteUrl}/images/logo/rhc-logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-855-328-6065",
    contactType: "customer service",
    email: "info@richmondhillcollege.ca",
    areaServed: "CA",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Sala Drive",
    addressLocality: "Richmond Hill",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Richmond Hill College of Healthcare and Technology Management",
  description:
    "Richmond Hill College offers online, hybrid, and in-person courses in healthcare and technology management. Unlocking potential, building futures.",
  url: siteUrl,
  telephone: "+1-855-328-6065",
  email: "info@richmondhillcollege.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Sala Drive",
    addressLocality: "Richmond Hill",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
    />
  );
}

const faqItems = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer online, hybrid, and in-person courses in healthcare and technology management.",
  },
  {
    question: "Are the courses accredited?",
    answer:
      "Yes, our courses are accredited and recognized by industry professionals.",
  },
  {
    question: "How can I enroll in a course?",
    answer:
      "To enroll in a course, simply fill out our online application form or contact our admissions team for assistance.",
  },
];

export function FAQJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
