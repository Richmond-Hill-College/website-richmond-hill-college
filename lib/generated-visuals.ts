export type GeneratedVisual = {
  src: string;
  kind: "icon" | "illustration";
  alt: {
    en: string;
    fr: string;
  };
};

/**
 * Bilingual alt text for the RHC generated visual library.
 * Use `alt[locale]` whenever one of these assets is rendered with next/image.
 */
export const GENERATED_VISUALS = {
  credentialBridge: {
    src: "/images/generated/rhc-credential-bridge.png",
    kind: "icon",
    alt: {
      en: "Bridge and maple leaf credential representing a pathway to Canadian certification",
      fr: "Pont et titre avec feuille d’érable représentant un parcours vers la certification canadienne",
    },
  },
  healthcareLearning: {
    src: "/images/generated/rhc-healthcare-learning.png",
    kind: "icon",
    alt: {
      en: "Medical cross, stethoscope, and open book representing healthcare education",
      fr: "Croix médicale, stéthoscope et livre ouvert représentant la formation en santé",
    },
  },
  aiLearning: {
    src: "/images/generated/rhc-ai-learning.png",
    kind: "icon",
    alt: {
      en: "Laptop and connected neural network representing artificial intelligence education",
      fr: "Ordinateur portable et réseau neuronal connecté représentant la formation en intelligence artificielle",
    },
  },
  flexibleLearning: {
    src: "/images/generated/rhc-flexible-learning.png",
    kind: "icon",
    alt: {
      en: "Connected laptop, classroom desk, and location marker representing flexible learning options",
      fr: "Ordinateur, pupitre et repère de localisation reliés représentant les modes d’apprentissage flexibles",
    },
  },
  globalBridgeHero: {
    src: "/images/generated/rhc-global-bridge-hero.png",
    kind: "illustration",
    alt: {
      en: "Internationally educated professional crossing a bridge toward Canadian healthcare and technology careers",
      fr: "Professionnelle formée à l’étranger traversant un pont vers des carrières canadiennes en santé et en technologie",
    },
  },
  nursingCare: {
    src: "/images/generated/library/nursing-care.png",
    kind: "icon",
    alt: {
      en: "Nursing cap, caring hands, and medical cross representing nursing and patient care programs",
      fr: "Coiffe infirmière, mains bienveillantes et croix médicale représentant les programmes de soins infirmiers",
    },
  },
  pharmacy: {
    src: "/images/generated/library/pharmacy.png",
    kind: "icon",
    alt: {
      en: "Medicine bottle, mortar, and pestle representing pharmacy programs",
      fr: "Flacon de médicament, mortier et pilon représentant les programmes de pharmacie",
    },
  },
  medicalOffice: {
    src: "/images/generated/library/medical-office.png",
    kind: "icon",
    alt: {
      en: "Patient record, calendar, and medical cross representing medical office administration",
      fr: "Dossier patient, calendrier et croix médicale représentant l’administration de cabinet médical",
    },
  },
  mentalHealth: {
    src: "/images/generated/library/mental-health.png",
    kind: "icon",
    alt: {
      en: "Head silhouette, heart, and supportive hands representing mental health education",
      fr: "Silhouette de tête, cœur et mains de soutien représentant la formation en santé mentale",
    },
  },
  aiTechnology: {
    src: "/images/generated/library/ai-technology.png",
    kind: "icon",
    alt: {
      en: "Computer chip and connected nodes representing artificial intelligence and technology programs",
      fr: "Puce informatique et nœuds connectés représentant les programmes d’intelligence artificielle et de technologie",
    },
  },
  cybersecurity: {
    src: "/images/generated/library/cybersecurity.png",
    kind: "icon",
    alt: {
      en: "Digital shield and secure network representing cybersecurity programs",
      fr: "Bouclier numérique et réseau sécurisé représentant les programmes de cybersécurité",
    },
  },
  businessLeadership: {
    src: "/images/generated/library/business-leadership.png",
    kind: "icon",
    alt: {
      en: "Briefcase, rising chart, and leadership star representing business management programs",
      fr: "Mallette, graphique ascendant et étoile de leadership représentant les programmes de gestion",
    },
  },
  hospitality: {
    src: "/images/generated/library/hospitality.png",
    kind: "icon",
    alt: {
      en: "Service bell and welcoming doorway representing hospitality programs",
      fr: "Cloche de service et entrée accueillante représentant les programmes d’hôtellerie",
    },
  },
  credentialAssessment: {
    src: "/images/generated/library/credential-assessment.png",
    kind: "icon",
    alt: {
      en: "Magnifying glass examining a credential with a maple leaf",
      fr: "Loupe examinant un titre de compétences avec une feuille d’érable",
    },
  },
  targetedTraining: {
    src: "/images/generated/library/targeted-training.png",
    kind: "icon",
    alt: {
      en: "Open book and bullseye representing focused skills training",
      fr: "Livre ouvert et cible représentant une formation ciblée sur les compétences",
    },
  },
  mentorship: {
    src: "/images/generated/library/mentorship.png",
    kind: "icon",
    alt: {
      en: "Mentor guiding a learner toward a star representing personalized support",
      fr: "Mentor guidant une personne apprenante vers une étoile représentant le soutien personnalisé",
    },
  },
  careerPlacement: {
    src: "/images/generated/library/career-placement.png",
    kind: "icon",
    alt: {
      en: "Briefcase on an upward pathway representing career placement support",
      fr: "Mallette sur un parcours ascendant représentant le soutien à l’intégration professionnelle",
    },
  },
  multilingualSupport: {
    src: "/images/generated/library/multilingual-support.png",
    kind: "icon",
    alt: {
      en: "Speech bubbles surrounding a globe representing multilingual student support",
      fr: "Bulles de dialogue autour d’un globe représentant le soutien étudiant multilingue",
    },
  },
  flexibleSchedule: {
    src: "/images/generated/library/flexible-schedule.png",
    kind: "icon",
    alt: {
      en: "Calendar and clock representing flexible course schedules",
      fr: "Calendrier et horloge représentant des horaires de cours flexibles",
    },
  },
  financialGuidance: {
    src: "/images/generated/library/financial-guidance.png",
    kind: "icon",
    alt: {
      en: "Planning grid, coin, and shield representing financial guidance",
      fr: "Grille de planification, pièce et bouclier représentant l’accompagnement financier",
    },
  },
  communityNetwork: {
    src: "/images/generated/library/community-network.png",
    kind: "icon",
    alt: {
      en: "Connected community members representing an inclusive professional network",
      fr: "Membres d’une communauté reliés représentant un réseau professionnel inclusif",
    },
  },
  credentialJourney: {
    src: "/images/generated/library/credential-journey.png",
    kind: "illustration",
    alt: {
      en: "Journey from international credentials through assessment and training to a Canadian career",
      fr: "Parcours des titres internationaux vers une carrière canadienne grâce à l’évaluation et à la formation",
    },
  },
  globalHealthcareCareers: {
    src: "/images/generated/library/global-healthcare-careers.png",
    kind: "illustration",
    alt: {
      en: "Internationally educated professionals advancing toward healthcare careers in Canada",
      fr: "Professionnels formés à l’étranger progressant vers des carrières en santé au Canada",
    },
  },
  technologyLearningLab: {
    src: "/images/generated/library/technology-learning-lab.png",
    kind: "illustration",
    alt: {
      en: "Adult learners collaborating in a modern artificial intelligence and technology lab",
      fr: "Adultes en formation collaborant dans un laboratoire moderne d’intelligence artificielle et de technologie",
    },
  },
  studentSuccess: {
    src: "/images/generated/library/student-success.png",
    kind: "illustration",
    alt: {
      en: "Adult learner reaching a professional milestone on an upward education pathway",
      fr: "Adulte en formation atteignant une étape professionnelle sur un parcours éducatif ascendant",
    },
  },
  nursingConference: {
    src: "/images/generated/library/nursing-conference.png",
    kind: "illustration",
    alt: {
      en: "Diverse healthcare professionals exchanging ideas at a nursing conference",
      fr: "Professionnels de la santé de divers horizons échangeant lors d’un congrès en soins infirmiers",
    },
  },
  onlineLearningHome: {
    src: "/images/generated/library/online-learning-home.png",
    kind: "illustration",
    alt: {
      en: "Working professional completing an online course from a comfortable home workspace",
      fr: "Professionnel en emploi suivant un cours en ligne dans un espace de travail confortable à domicile",
    },
  },
  campusCollaboration: {
    src: "/images/generated/library/campus-collaboration.png",
    kind: "illustration",
    alt: {
      en: "Adult learners collaborating on a healthcare and technology project",
      fr: "Adultes en formation collaborant à un projet en santé et en technologie",
    },
  },
  canadaCareerFuture: {
    src: "/images/generated/library/canada-career-future.png",
    kind: "illustration",
    alt: {
      en: "Canadian career skyline combining healthcare, technology, and professional opportunity",
      fr: "Horizon de carrière au Canada réunissant santé, technologie et possibilités professionnelles",
    },
  },
} as const satisfies Record<string, GeneratedVisual>;

export type GeneratedVisualKey = keyof typeof GENERATED_VISUALS;

