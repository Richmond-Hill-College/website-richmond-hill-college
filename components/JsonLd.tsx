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

const faqItemsEn = [
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

const faqItemsFr = [
  {
    question: "Quels cours offrez-vous?",
    answer:
      "Nous offrons des cours en ligne, hybrides et en personne en gestion des soins de santé et de la technologie.",
  },
  {
    question: "Les cours sont-ils accrédités?",
    answer:
      "Oui, nos cours sont accrédités et reconnus par les professionnels du milieu.",
  },
  {
    question: "Comment puis-je m'inscrire à un cours?",
    answer:
      "Pour vous inscrire, remplissez notre formulaire en ligne ou communiquez avec notre équipe des admissions.",
  },
];

type FAQJsonLdProps = { locale?: "en" | "fr" };

export function FAQJsonLd({ locale = "en" }: FAQJsonLdProps) {
  const faqItems = locale === "fr" ? faqItemsFr : faqItemsEn;
  const inLanguage = locale === "fr" ? "fr-CA" : "en-CA";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
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
