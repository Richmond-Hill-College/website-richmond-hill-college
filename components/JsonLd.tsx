import { siteUrl } from "@/lib/site-url";
import type { Locale } from "@/lib/i18n-routing";

function getOrganizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Richmond Hill College of Healthcare and Technology Management",
    url: siteUrl,
    logo: `${siteUrl}/images/logo/rhc-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-855-328-6065",
      contactType: locale === "fr" ? "service client" : "customer service",
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
}

export function OrganizationJsonLd({ locale = "en" }: { locale?: Locale }) {
  const organizationJsonLd = getOrganizationJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}

function getLocalBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Richmond Hill College of Healthcare and Technology Management",
    description:
      locale === "fr"
        ? "Richmond Hill College propose des cours en ligne, hybrides et en personne en gestion de la sante et des technologies."
        : "Richmond Hill College offers online, hybrid, and in-person courses in healthcare and technology management. Unlocking potential, building futures.",
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
}

export function LocalBusinessJsonLd({ locale = "en" }: { locale?: Locale }) {
  const localBusinessJsonLd = getLocalBusinessJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
    />
  );
}

function getFaqItems(locale: Locale) {
  if (locale === "fr") {
    return [
      {
        question: "Quels cours offrez-vous?",
        answer:
          "Nous offrons des cours en ligne, hybrides et en personne en gestion de la sante et des technologies.",
      },
      {
        question: "Les cours sont-ils accredites?",
        answer:
          "Oui, nos cours sont accredites et reconnus par les professionnels du secteur.",
      },
      {
        question: "Comment puis-je m'inscrire a un cours?",
        answer:
          "Pour vous inscrire, remplissez simplement notre formulaire en ligne ou contactez notre equipe des admissions.",
      },
    ];
  }

  return [
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
}

export function FAQJsonLd({ locale = "en" }: { locale?: Locale }) {
  const faqItems = getFaqItems(locale);
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
