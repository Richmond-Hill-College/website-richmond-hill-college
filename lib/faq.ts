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

/** All slugs for static generation and sitemap. */
export function getFaqSlugs(): string[] {
  return FAQ_ENTRIES.map((e) => e.slug);
}

/** Get a single FAQ by slug, or undefined. */
export function getFaqBySlug(slug: string): FaqEntry | undefined {
  return FAQ_ENTRIES.find((e) => e.slug === slug);
}

/** Get all FAQs, optionally grouped by category. */
export function getAllFaqs(groupByCategory = false): FaqEntry[] | Record<string, FaqEntry[]> {
  if (!groupByCategory) return [...FAQ_ENTRIES];
  const byCategory: Record<string, FaqEntry[]> = {};
  for (const entry of FAQ_ENTRIES) {
    const key = entry.category ?? "General";
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(entry);
  }
  return byCategory;
}

/** URL-safe slug from FAQ category name (e.g. "Fees & Payment" → "fees-payment"). */
export function getFaqCategorySlug(categoryName: string): string {
  return categoryName
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, "-and-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "general";
}

/** All FAQ categories with slug and count (for /faq/category/[slug] and sitemap). */
export function getFaqCategories(): { name: string; slug: string; count: number }[] {
  const byName = new Map<string, number>();
  for (const e of FAQ_ENTRIES) {
    const name = e.category?.trim() ?? "General";
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
export function getFaqsByCategorySlug(slug: string): FaqEntry[] {
  const categories = new Set(FAQ_ENTRIES.map((e) => e.category?.trim() ?? "General"));
  const categoryName = Array.from(categories).find((name) => getFaqCategorySlug(name) === slug);
  if (!categoryName) return [];
  return FAQ_ENTRIES.filter((e) => (e.category?.trim() ?? "General") === categoryName);
}
