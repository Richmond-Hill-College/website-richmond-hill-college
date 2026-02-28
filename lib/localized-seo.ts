import type { Locale } from "@/lib/i18n-routing";
import { staticRoutes } from "@/lib/sitemap-routes";

type RouteSeoCopy = {
  title: string;
  description: string;
};

type SeoCopyByLocale = {
  en: RouteSeoCopy;
  fr: RouteSeoCopy;
};

const ROUTE_SEO_COPY: Record<string, SeoCopyByLocale> = {
  "": {
    en: {
      title: "Home",
      description:
        "Richmond Hill College offers online, hybrid, and in-person healthcare and technology management programs.",
    },
    fr: {
      title: "Accueil",
      description:
        "Richmond Hill College propose des programmes en ligne, hybrides et en personne en gestion de la sante et des technologies.",
    },
  },
  "about-us": {
    en: {
      title: "About Us",
      description:
        "Learn about Richmond Hill College, our mission, and our commitment to student success.",
    },
    fr: {
      title: "A propos",
      description:
        "Decouvrez Richmond Hill College, notre mission et notre engagement envers la reussite des etudiants.",
    },
  },
  "about-us/team": {
    en: {
      title: "Our Team",
      description:
        "Meet the leadership and educators at Richmond Hill College of Healthcare and Technology Management.",
    },
    fr: {
      title: "Notre equipe",
      description:
        "Rencontrez la direction et les enseignants de Richmond Hill College of Healthcare and Technology Management.",
    },
  },
  "message-from-the-president": {
    en: {
      title: "Message from the President",
      description:
        "Read the President's message and vision for education at Richmond Hill College.",
    },
    fr: {
      title: "Message de la presidente",
      description:
        "Lisez le message de la presidente et sa vision de l'education a Richmond Hill College.",
    },
  },
  programs: {
    en: {
      title: "Programs",
      description:
        "Browse healthcare, technology, and professional development programs aligned with Canadian standards.",
    },
    fr: {
      title: "Programmes",
      description:
        "Parcourez des programmes en sante, technologie et perfectionnement professionnel alignes sur les normes canadiennes.",
    },
  },
  "course-offerings": {
    en: {
      title: "Course Offerings",
      description:
        "Explore current course offerings, formats, and registration options on RHC Global Bridge.",
    },
    fr: {
      title: "Offre de cours",
      description:
        "Consultez les cours disponibles, les formats et les options d'inscription sur RHC Global Bridge.",
    },
  },
  "bridging-programs": {
    en: {
      title: "Bridging Programs",
      description:
        "Professional bridging programs for internationally educated professionals entering the Canadian workforce.",
    },
    fr: {
      title: "Programmes passerelles",
      description:
        "Programmes passerelles pour les professionnels formes a l'etranger qui visent le marche du travail canadien.",
    },
  },
  "bridge-canadian-certification": {
    en: {
      title: "Bridge to Canadian Certification",
      description:
        "Bridge your prior training and experience to Canadian certification pathways.",
    },
    fr: {
      title: "Passerelle vers la certification canadienne",
      description:
        "Transformez votre formation et votre experience en parcours de certification canadienne.",
    },
  },
  "canadian-certification-internationally-educated": {
    en: {
      title: "Canadian Certification for Internationally Educated Professionals",
      description:
        "Certification-focused pathways for internationally educated professionals in healthcare and related fields.",
    },
    fr: {
      title: "Certification canadienne pour les professionnels formes a l'etranger",
      description:
        "Parcours axes sur la certification pour les professionnels formes a l'etranger en sante et domaines connexes.",
    },
  },
  "my-account": {
    en: {
      title: "My Account",
      description:
        "Access your learning portal, account details, and registration links through RHC Global Bridge.",
    },
    fr: {
      title: "Mon compte",
      description:
        "Accedez a votre portail d'apprentissage, a vos informations de compte et aux liens d'inscription via RHC Global Bridge.",
    },
  },
  courses: {
    en: {
      title: "Courses",
      description:
        "Browse all courses and bridging programs. View details and register through RHC Global Bridge.",
    },
    fr: {
      title: "Cours",
      description:
        "Parcourez tous les cours et programmes passerelles. Consultez les details et inscrivez-vous via RHC Global Bridge.",
    },
  },
  "courses/categories": {
    en: {
      title: "Course Categories",
      description:
        "Browse courses by category and discover pathways aligned with your goals.",
    },
    fr: {
      title: "Categories de cours",
      description:
        "Parcourez les cours par categorie et decouvrez des parcours adaptes a vos objectifs.",
    },
  },
  products: {
    en: {
      title: "Products & Registration",
      description:
        "Browse conference products and registration options, including sponsorship and payment pages.",
    },
    fr: {
      title: "Produits et inscriptions",
      description:
        "Parcourez les produits et options d'inscription des conferences, y compris le parrainage et les paiements.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description:
        "Contact Richmond Hill College by phone, email, or form for admissions and program support.",
    },
    fr: {
      title: "Contact",
      description:
        "Contactez Richmond Hill College par telephone, courriel ou formulaire pour l'admission et l'accompagnement.",
    },
  },
  support: {
    en: {
      title: "Support",
      description:
        "Get help with applications, registration, course access, and general support.",
    },
    fr: {
      title: "Soutien",
      description:
        "Obtenez de l'aide pour les demandes, l'inscription, l'acces aux cours et le soutien general.",
    },
  },
  "privacy-policy": {
    en: {
      title: "Privacy Policy",
      description:
        "Read Richmond Hill College's privacy policy for data collection, use, and protection practices.",
    },
    fr: {
      title: "Politique de confidentialite",
      description:
        "Consultez la politique de confidentialite de Richmond Hill College concernant la collecte, l'utilisation et la protection des donnees.",
    },
  },
  "terms-of-service": {
    en: {
      title: "Terms of Service",
      description:
        "Review the terms and conditions for using Richmond Hill College and related services.",
    },
    fr: {
      title: "Conditions d'utilisation",
      description:
        "Consultez les conditions d'utilisation des services de Richmond Hill College.",
    },
  },
  faq: {
    en: {
      title: "Frequently Asked Questions",
      description:
        "Find answers to common questions about admissions, registration, payment, and programs.",
    },
    fr: {
      title: "Foire aux questions",
      description:
        "Trouvez des reponses aux questions frequentes sur l'admission, l'inscription, les paiements et les programmes.",
    },
  },
  "faq/categories": {
    en: {
      title: "FAQ by Category",
      description:
        "Explore frequently asked questions grouped by category for faster answers.",
    },
    fr: {
      title: "FAQ par categorie",
      description:
        "Consultez les questions frequentes regroupees par categorie pour trouver rapidement vos reponses.",
    },
  },
  conferences: {
    en: {
      title: "Conferences",
      description:
        "Discover conferences, meetings, and scientific events hosted by Richmond Hill College.",
    },
    fr: {
      title: "Conferences",
      description:
        "Decouvrez les conferences, reunions et evenements scientifiques organises par Richmond Hill College.",
    },
  },
  "conferences/nursing-and-healthcare-2025": {
    en: {
      title: "Nursing and Healthcare 2025",
      description:
        "Conference details for Nursing and Healthcare 2025, including registration and participation options.",
    },
    fr: {
      title: "Soins infirmiers et sante 2025",
      description:
        "Details de la conference Nursing and Healthcare 2025, y compris l'inscription et les options de participation.",
    },
  },
  "conferences/nursing-and-healthcare-2025/conference-main-page": {
    en: {
      title: "Conference Main Page",
      description:
        "Official main page for the Nursing and Healthcare 2025 conference.",
    },
    fr: {
      title: "Page principale de la conference",
      description:
        "Page principale officielle de la conference Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/registration": {
    en: {
      title: "Registration",
      description:
        "Register for Nursing and Healthcare 2025 as a presenter, attendee, or virtual participant.",
    },
    fr: {
      title: "Inscription",
      description:
        "Inscrivez-vous a Nursing and Healthcare 2025 en tant que presentateur, participant ou participant virtuel.",
    },
  },
  "conferences/nursing-and-healthcare-2025/submit-abstract": {
    en: {
      title: "Submit Abstract",
      description:
        "Submit your abstract for consideration in the Nursing and Healthcare 2025 scientific program.",
    },
    fr: {
      title: "Soumettre un resume",
      description:
        "Soumettez votre resume pour evaluation dans le programme scientifique de Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/invitation-letter": {
    en: {
      title: "Invitation Letter",
      description:
        "Request invitation letters for visa and travel support related to the conference.",
    },
    fr: {
      title: "Lettre d'invitation",
      description:
        "Demandez une lettre d'invitation pour le visa et le soutien au voyage en lien avec la conference.",
    },
  },
  "conferences/nursing-and-healthcare-2025/sponsorship": {
    en: {
      title: "Sponsorship",
      description:
        "Explore sponsorship opportunities and packages for Nursing and Healthcare 2025.",
    },
    fr: {
      title: "Parrainage",
      description:
        "Decouvrez les occasions et forfaits de parrainage pour Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/accommodations": {
    en: {
      title: "Accommodations",
      description:
        "Find accommodation recommendations and travel planning information for conference attendees.",
    },
    fr: {
      title: "Hebergement",
      description:
        "Consultez les recommandations d'hebergement et les informations de voyage pour les participants.",
    },
  },
  "conferences/nursing-and-healthcare-2025/program-table": {
    en: {
      title: "Program Table",
      description:
        "View the conference agenda and session schedule for Nursing and Healthcare 2025.",
    },
    fr: {
      title: "Programme",
      description:
        "Consultez l'ordre du jour et l'horaire des sessions de Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/abstract-proceeding-book": {
    en: {
      title: "Abstract & Proceeding Book",
      description:
        "Access abstract and proceedings information for Nursing and Healthcare 2025.",
    },
    fr: {
      title: "Livre des resumes et actes",
      description:
        "Accedez aux informations sur les resumes et les actes de Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/venue": {
    en: {
      title: "Venue",
      description:
        "Conference venue details, directions, and logistics for Nursing and Healthcare 2025.",
    },
    fr: {
      title: "Lieu",
      description:
        "Details du lieu, itineraires et informations logistiques pour Nursing and Healthcare 2025.",
    },
  },
  "conferences/nursing-and-healthcare-2025/contact-1": {
    en: {
      title: "Conference Contact",
      description:
        "Get in touch with the conference team for registration, sponsorship, and participation support.",
    },
    fr: {
      title: "Contact de la conference",
      description:
        "Contactez l'equipe de la conference pour l'inscription, le parrainage et l'accompagnement des participants.",
    },
  },
  sitemap: {
    en: {
      title: "Sitemap",
      description:
        "Browse all pages and key resources on Richmond Hill College.",
    },
    fr: {
      title: "Plan du site",
      description:
        "Parcourez toutes les pages et ressources principales de Richmond Hill College.",
    },
  },
};

function fallbackRouteCopy(path: string, locale: Locale): RouteSeoCopy {
  const label = staticRoutes.find((route) => route.path === path)?.label ?? "Richmond Hill College";

  if (locale === "fr") {
    return {
      title: label,
      description: `Consultez ${label} sur le site de Richmond Hill College.`,
    };
  }

  return {
    title: label,
    description: `Explore ${label} on the Richmond Hill College website.`,
  };
}

export function getStaticRouteSeo(path: string, locale: Locale): RouteSeoCopy {
  const copy = ROUTE_SEO_COPY[path];
  if (!copy) return fallbackRouteCopy(path, locale);
  return copy[locale];
}
