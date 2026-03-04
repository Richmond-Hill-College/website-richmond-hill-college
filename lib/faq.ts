/**
 * FAQ entries focused on transactional intent: apply, register, pay, deadlines,
 * requirements. Used for /faq and /faq/[slug] with SEO-friendly Q&A pages.
 */
export type FaqEntry = {
  slug: string;
  question: string;
  answer: string;
  /** Optional category for grouping on index (e.g. "Admissions", "Registration"). */
  category?: string;
};

export type FaqLocale = "en" | "fr";

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    slug: "how-do-i-apply",
    question: "How do I apply to Richmond Hill College?",
    category: "Admissions",
    answer:
      "You can apply by visiting our Programs or Course Offerings page, choosing your program or course, and following the registration link to RHC Global Bridge where applications and payments are processed. For bridging programs and certified career programs, complete the online application on the course page. For general inquiries or assistance with the application process, contact us through our Contact page or call toll-free +1 855 (328) 6065.",
  },
  {
    slug: "how-do-i-register-for-courses",
    question: "How do I register for courses at Richmond Hill College?",
    category: "Registration",
    answer:
      "Course registration is handled through RHC Global Bridge. Go to the Courses or Course Offerings page on our website, select the course you want, and click through to the RHC Global Bridge registration and payment portal. You can also access your account and registered courses via the My Account page. For step-by-step help, contact our office and we will guide you through the process.",
  },
  {
    slug: "what-are-tuition-fees-and-payment-options",
    question: "What are the tuition fees and payment options?",
    category: "Fees & Payment",
    answer:
      "Fees vary by program and course. Exact tuition and payment options are shown on each course or product page on RHC Global Bridge when you select a program. Payment is processed securely through the RHC Global Bridge platform. For a detailed fee breakdown or payment plans, contact us and we can provide information specific to your chosen program.",
  },
  {
    slug: "when-are-application-deadlines",
    question: "When are application deadlines?",
    category: "Admissions",
    answer:
      "Application and registration deadlines depend on the program or course and the term. Check the specific course or conference page on our website and on RHC Global Bridge for current dates. For conferences such as Nursing and Healthcare 2025, deadlines for registration, abstract submission, and early-bird rates are listed on the conference pages. Contact us for the latest deadline information for your program of interest.",
  },
  {
    slug: "what-are-admission-requirements",
    question: "What are the admission requirements?",
    category: "Admissions",
    answer:
      "Requirements vary by program. Bridging programs and certified career programs typically require relevant education or work experience; details are on each course page on RHC Global Bridge. For conference registration, requirements are listed on the conference site (e.g. Nursing and Healthcare 2025). For a personalized assessment of your eligibility, contact our office with your background and the program you are interested in.",
  },
  {
    slug: "how-do-i-enroll-in-a-bridging-program",
    question: "How do I enroll in a bridging program?",
    category: "Registration",
    answer:
      "Visit our Bridging Programs page to explore options, then go to the specific course on our Courses or Course Offerings page. Use the link to RHC Global Bridge to complete enrollment and payment. Bridging programs are designed for internationally educated professionals and align with Canadian workplace standards. If you need help choosing a program or completing enrollment, contact us.",
  },
  {
    slug: "where-do-i-pay-for-courses",
    question: "Where do I pay for courses?",
    category: "Fees & Payment",
    answer:
      "All course and program payments are made through the RHC Global Bridge platform. After selecting a course from our website, you will be directed to RHC Global Bridge to complete registration and payment. Do not send payment by email or mail; use only the official RHC Global Bridge payment flow. For payment issues or questions, contact our office.",
  },
  {
    slug: "how-can-i-get-an-invitation-letter-for-a-conference",
    question: "How can I get an invitation letter for a conference?",
    category: "Conferences",
    answer:
      "Registered conference attendees can request an invitation letter from the conference Invitation Letter page (e.g. for Nursing and Healthcare 2025, visit the conference site and use the Invitation Letter section). Typically you must complete registration first. If you need a letter before paying, contact us with your details and we will advise on the process.",
  },
  {
    slug: "how-do-i-submit-an-abstract-for-the-conference",
    question: "How do I submit an abstract for the conference?",
    category: "Conferences",
    answer:
      "Abstract submission is done through the conference’s Submit Abstract page. For Nursing and Healthcare 2025, go to the conference section on our website and open the Submit Abstract page for guidelines and the submission form. Follow the instructions for format and deadline. For questions about abstract submission, contact the conference team via the conference Contact page.",
  },
  {
    slug: "what-is-the-refund-policy",
    question: "What is the refund policy?",
    category: "Fees & Payment",
    answer:
      "Refund policies depend on the program or product. Course and conference refund terms are typically stated on the relevant RHC Global Bridge or conference page at the time of registration. For a written summary of the refund policy for your specific purchase, contact us with your registration or order details and we will provide the applicable policy.",
  },
];

/** French FAQ: unique questions and answers for /fr/faq (multilingual SEO). */
export const FAQ_ENTRIES_FR: FaqEntry[] = [
  {
    slug: "comment-postuler-au-college",
    question: "Comment postuler au Collège Richmond Hill ?",
    category: "Admissions",
    answer:
      "Vous pouvez postuler en visitant notre page Programmes ou Offre de cours, en choisissant votre programme ou cours, puis en suivant le lien d'inscription vers RHC Global Bridge où les demandes et les paiements sont traités. Pour les programmes de transition et les programmes de carrière certifiés, remplissez la demande en ligne sur la page du cours. Pour toute question ou aide avec le processus, contactez-nous via notre page Contact ou appelez sans frais le +1 855 (328) 6065.",
  },
  {
    slug: "sinscrire-aux-cours",
    question: "Comment s'inscrire aux cours au Collège Richmond Hill ?",
    category: "Inscription",
    answer:
      "L'inscription aux cours se fait via RHC Global Bridge. Rendez-vous sur la page Cours ou Offre de cours de notre site, choisissez le cours souhaité et cliquez pour accéder au portail d'inscription et de paiement RHC Global Bridge. Vous pouvez aussi accéder à votre compte et à vos cours inscrits via la page Mon compte. Pour une aide étape par étape, contactez notre bureau.",
  },
  {
    slug: "frais-de-scolarite-et-modes-de-paiement",
    question: "Quels sont les frais de scolarité et les modes de paiement ?",
    category: "Frais et paiement",
    answer:
      "Les frais varient selon le programme et le cours. Les montants exacts et les options de paiement sont indiqués sur chaque page de cours ou de produit sur RHC Global Bridge lorsque vous sélectionnez un programme. Le paiement est traité de manière sécurisée via RHC Global Bridge. Pour un détail des frais ou des modalités de paiement, contactez-nous.",
  },
  {
    slug: "dates-limites-de-demande",
    question: "Quelles sont les dates limites pour postuler ?",
    category: "Admissions",
    answer:
      "Les dates limites d'admission et d'inscription dépendent du programme ou du cours et de la session. Consultez la page du cours ou de la conférence sur notre site et sur RHC Global Bridge pour les dates en vigueur. Pour les conférences comme Soins infirmiers et santé 2025, les dates d'inscription, de soumission de résumés et tarifs préférentiels figurent sur les pages de la conférence. Contactez-nous pour les dernières dates selon votre programme.",
  },
  {
    slug: "conditions-dadmission",
    question: "Quelles sont les conditions d'admission ?",
    category: "Admissions",
    answer:
      "Les exigences varient selon le programme. Les programmes de transition et les programmes de carrière certifiés exigent généralement une formation ou une expérience pertinente ; les détails sont sur chaque page de cours sur RHC Global Bridge. Pour les conférences, les exigences sont indiquées sur le site de la conférence. Pour une évaluation personnalisée de votre admissibilité, contactez notre bureau avec votre parcours et le programme visé.",
  },
  {
    slug: "sinscrire-a-un-programme-de-transition",
    question: "Comment s'inscrire à un programme de transition ?",
    category: "Inscription",
    answer:
      "Consultez notre page Programmes de transition pour explorer les options, puis accédez au cours concerné via la page Cours ou Offre de cours. Utilisez le lien vers RHC Global Bridge pour finaliser l'inscription et le paiement. Les programmes de transition s'adressent aux professionnels formés à l'étranger et sont alignés sur les normes canadiennes. Pour de l'aide au choix ou à l'inscription, contactez-nous.",
  },
  {
    slug: "ou-payer-les-cours",
    question: "Où payer les cours ?",
    category: "Frais et paiement",
    answer:
      "Tous les paiements de cours et de programmes se font via la plateforme RHC Global Bridge. Après avoir choisi un cours sur notre site, vous serez redirigé vers RHC Global Bridge pour compléter l'inscription et le paiement. N'envoyez pas de paiement par courriel ou par la poste ; utilisez uniquement le flux de paiement officiel RHC Global Bridge. Pour tout problème de paiement, contactez notre bureau.",
  },
  {
    slug: "lettre-invitation-conference",
    question: "Comment obtenir une lettre d'invitation pour une conférence ?",
    category: "Conférences",
    answer:
      "Les participants inscrits peuvent demander une lettre d'invitation depuis la page Lettre d'invitation de la conférence (p. ex. pour Soins infirmiers et santé 2025, consultez le site de la conférence et la section Lettre d'invitation). En général, l'inscription doit être complétée au préalable. Si vous avez besoin d'une lettre avant de payer, contactez-nous avec vos coordonnées.",
  },
  {
    slug: "soumettre-un-resume-pour-la-conference",
    question: "Comment soumettre un résumé pour la conférence ?",
    category: "Conférences",
    answer:
      "La soumission des résumés se fait via la page Soumettre un résumé de la conférence. Pour Soins infirmiers et santé 2025, allez dans la section conférence de notre site et ouvrez la page Soumettre un résumé pour les consignes et le formulaire. Respectez le format et la date limite indiqués. Pour toute question, contactez l'équipe via la page Contact de la conférence.",
  },
  {
    slug: "politique-de-remboursement",
    question: "Quelle est la politique de remboursement ?",
    category: "Frais et paiement",
    answer:
      "Les politiques de remboursement dépendent du programme ou du produit. Les conditions de remboursement des cours et des conférences sont généralement indiquées sur la page RHC Global Bridge ou de la conférence au moment de l'inscription. Pour un résumé écrit de la politique applicable à votre achat, contactez-nous avec les détails de votre inscription ou commande.",
  },
];

function getEntries(locale: FaqLocale): FaqEntry[] {
  return locale === "fr" ? FAQ_ENTRIES_FR : FAQ_ENTRIES;
}

/** All slugs for static generation and sitemap (locale-specific). */
export function getFaqSlugs(locale: FaqLocale = "en"): string[] {
  return getEntries(locale).map((e) => e.slug);
}

/** Get a single FAQ by slug, or undefined (locale-specific). */
export function getFaqBySlug(slug: string, locale: FaqLocale = "en"): FaqEntry | undefined {
  return getEntries(locale).find((e) => e.slug === slug);
}

/** Get all FAQs, optionally grouped by category (locale-specific). */
export function getAllFaqs(
  groupByCategory = false,
  locale: FaqLocale = "en"
): FaqEntry[] | Record<string, FaqEntry[]> {
  const entries = getEntries(locale);
  if (!groupByCategory) return [...entries];
  const byCategory: Record<string, FaqEntry[]> = {};
  for (const entry of entries) {
    const key = entry.category ?? (locale === "fr" ? "Général" : "General");
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(entry);
  }
  return byCategory;
}

/** Normalize accented chars for URL-safe slugs (e.g. "Conférences" → "conferences"). */
function normalizeAccents(s: string): string {
  const map: Record<string, string> = {
    "à": "a", "á": "a", "â": "a", "ä": "a", "æ": "ae", "ç": "c", "è": "e", "é": "e", "ê": "e", "ë": "e",
    "ì": "i", "í": "i", "î": "i", "ï": "i", "ñ": "n", "ò": "o", "ó": "o", "ô": "o", "ö": "o", "ù": "u",
    "ú": "u", "û": "u", "ü": "u", "ý": "y", "ÿ": "y",
  };
  return s
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

/** URL-safe slug from FAQ category name (e.g. "Fees & Payment" → "fees-payment"). */
export function getFaqCategorySlug(categoryName: string): string {
  return normalizeAccents(categoryName)
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, "-and-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "general";
}

/** All FAQ categories with slug and count (for /faq/category/[slug] and sitemap). */
export function getFaqCategories(
  locale: FaqLocale = "en"
): { name: string; slug: string; count: number }[] {
  const entries = getEntries(locale);
  const defaultCat = locale === "fr" ? "Général" : "General";
  const byName = new Map<string, number>();
  for (const e of entries) {
    const name = e.category?.trim() ?? defaultCat;
    byName.set(name, (byName.get(name) ?? 0) + 1);
  }
  return Array.from(byName.entries())
    .map(([name, count]) => ({
      name,
      slug: getFaqCategorySlug(name),
      count,
    }))
    .filter((item) => item.slug && item.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** FAQs in a given category slug (for /faq/category/[slug]). */
export function getFaqsByCategorySlug(slug: string, locale: FaqLocale = "en"): FaqEntry[] {
  const entries = getEntries(locale);
  const defaultCat = locale === "fr" ? "Général" : "General";
  const categories = new Set(entries.map((e) => e.category?.trim() ?? defaultCat));
  const categoryName = Array.from(categories).find((name) => getFaqCategorySlug(name) === slug);
  if (!categoryName) return [];
  return entries.filter((e) => (e.category?.trim() ?? defaultCat) === categoryName);
}
