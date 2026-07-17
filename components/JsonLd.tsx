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
    question: "What is the approval status of the courses?",
    answer:
      "Status and credential details depend on the individual offering. Richmond Hill College is currently pursuing registration and program approvals under Ontario’s career-college legislation. Review the specific course page or contact the college for written confirmation before registering.",
  },
  {
    question: "How can I enroll in a course?",
    answer:
      "Review the individual course page, then contact an advisor if you need to confirm requirements, availability, program status or the credential offered. When registration is available, use only the official registration link shown on the course page.",
  },
];

const faqItemsFr = [
  {
    question: "Quels cours offrez-vous?",
    answer:
      "Nous offrons des cours en ligne, hybrides et en personne en gestion des soins de santé et de la technologie.",
  },
  {
    question: "Quel est le statut d’approbation des cours?",
    answer:
      "Le statut et le titre varient selon l’offre. Le Collège Richmond Hill poursuit actuellement son inscription et l’approbation de ses programmes conformément à la législation ontarienne sur les collèges d’enseignement professionnel. Consultez la page du cours ou communiquez avec le collège pour obtenir une confirmation écrite avant de vous inscrire.",
  },
  {
    question: "Comment puis-je m'inscrire à un cours?",
    answer:
      "Consultez la page du cours, puis communiquez avec un conseiller pour confirmer les exigences, les disponibilités, le statut du programme ou le titre offert. Lorsque l’inscription est disponible, utilisez uniquement le lien officiel affiché sur la page du cours.",
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
