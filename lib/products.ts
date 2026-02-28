/**
 * Product/registration page data for conference and other offerings.
 * IDs and slugs match the current site URLs for SEO/bookmark parity.
 */
export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Extended copy for the product page (general → detailed). */
  longDescription?: string;
  /** Bullet highlights shown in a featured block. */
  highlights?: string[];
  /** "What's included" list. */
  whatIsIncluded?: string[];
  /** Who this product is for / eligibility. */
  whoIsThisFor?: string[];
  /** Format or duration (e.g. "Full conference, 3 days"). */
  format?: string;
  category: "registration" | "sponsorship" | "payment";
  faqs?: ProductFaq[];
}

export const products: ProductItem[] = [
  {
    id: "17712348",
    slug: "registration-oral-presentation-speakers",
    title: "Registration – Oral Presentation (Speakers)",
    description: "Register as an oral presentation speaker for the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Oral presentation speakers are at the heart of our conference. This registration type is for researchers, clinicians, and educators who will deliver a spoken presentation within the scientific program. You will have a dedicated time slot to present your work to peers and receive live feedback. Full conference access, including all sessions, networking events, and materials, is included.",
    highlights: [
      "Dedicated oral presentation slot in the scientific program",
      "Full access to all conference sessions and keynotes",
      "Networking with healthcare professionals and researchers worldwide",
      "Inclusion in the abstract proceeding book",
      "Certificate of presentation",
    ],
    whatIsIncluded: [
      "Conference badge and program materials",
      "Access to all plenary and parallel sessions (Nov 28–30, 2025)",
      "Coffee breaks and designated networking events",
      "Abstract published in the conference proceeding book",
      "Invitation letter for visa purposes (on request)",
    ],
    whoIsThisFor: [
      "Researchers and academics presenting original work",
      "Clinicians and educators sharing practice innovations",
      "Graduate students and postdocs with accepted abstracts",
    ],
    format: "Full conference, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "When will I know my presentation time?",
        answer: "Your assigned session and time will be communicated after the program is finalized. You will receive an email with your slot and room details.",
      },
      {
        question: "How long is each oral presentation?",
        answer: "Presentation length is typically 10–15 minutes plus Q&A, depending on the session. Exact timing will be in the final program.",
      },
    ],
  },
  {
    id: "17712361",
    slug: "registration-poster-presentation",
    title: "Registration – Poster Presentation",
    description: "Register for poster presentation at the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Poster presentations offer an excellent way to share your research or project in a visual, conversational format. You will display your poster in the designated area and discuss your work during dedicated poster sessions. This option is ideal for those who prefer one-on-one or small-group dialogue and full participation in the rest of the conference.",
    highlights: [
      "Designated poster board and display space",
      "Scheduled poster session(s) for discussion with attendees",
      "Full access to all conference sessions and events",
      "Inclusion in the abstract proceeding book",
      "Certificate of presentation",
    ],
    whatIsIncluded: [
      "Conference badge and program materials",
      "Access to all plenary and parallel sessions (Nov 28–30, 2025)",
      "Poster mounting and removal support",
      "Abstract published in the conference proceeding book",
      "Invitation letter for visa purposes (on request)",
    ],
    whoIsThisFor: [
      "Researchers and students with poster-accepted abstracts",
      "Practitioners sharing quality improvement or case studies",
      "Anyone who prefers visual and interactive presentation",
    ],
    format: "Full conference, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "What are the poster dimensions?",
        answer: "Poster size guidelines will be sent with your acceptance letter. Standard boards accommodate A0 or similar dimensions; exact specs will be provided before the conference.",
      },
      {
        question: "When do I set up and take down my poster?",
        answer: "Setup and takedown times will be in the final program. Staff will be available to assist during designated hours.",
      },
    ],
  },
  {
    id: "17712371",
    slug: "registration-virtual-presentation",
    title: "Registration – Virtual Presentation",
    description: "Register for virtual presentation at the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Can't travel to Toronto? Join as a virtual presenter and share your work with a global audience online. Virtual presenters submit a pre-recorded presentation and participate in live Q&A during their assigned session. You retain full access to streamed sessions and virtual networking opportunities, so you stay connected to the conference from anywhere.",
    highlights: [
      "Present your work via pre-recorded presentation and live Q&A",
      "Stream access to plenary and selected parallel sessions",
      "Virtual networking and engagement with attendees",
      "Abstract published in the conference proceeding book",
      "Certificate of presentation",
    ],
    whatIsIncluded: [
      "Virtual conference platform access (Nov 28–30, 2025)",
      "Dedicated virtual presentation slot with Q&A",
      "Streaming of key sessions where technically feasible",
      "Abstract in the conference proceeding book",
      "Digital certificate of presentation",
    ],
    whoIsThisFor: [
      "International presenters unable to travel",
      "Researchers and clinicians with schedule or budget constraints",
      "Anyone preferring a fully remote participation option",
    ],
    format: "Virtual, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "Do I need to be online at a specific time?",
        answer: "Yes. You will have an assigned time slot for live Q&A. The rest of the program can be viewed live or on-demand according to the platform schedule.",
      },
      {
        question: "What format should my pre-recorded presentation be in?",
        answer: "Accepted formats and length will be communicated after abstract acceptance. Typically we use standard video formats (e.g. MP4) and a maximum duration (e.g. 10–15 minutes).",
      },
    ],
  },
  {
    id: "17712380",
    slug: "registration-students-oral-poster",
    title: "Registration – Students (Oral & Poster)",
    description: "Student registration for oral or poster presentation at Nursing and Healthcare 2025.",
    longDescription:
      "We welcome students to present their work at the conference. This discounted registration is for currently enrolled students (undergraduate, graduate, or doctoral) who have an accepted oral or poster abstract. You receive the same benefits as other presenters—full conference access, publication in the proceeding book, and a certificate—at a reduced rate to support the next generation of healthcare leaders.",
    highlights: [
      "Reduced rate for full-time students with accepted abstracts",
      "Same benefits as standard oral or poster presenters",
      "Full access to sessions, networking, and materials",
      "Inclusion in the abstract proceeding book",
      "Certificate of presentation",
    ],
    whatIsIncluded: [
      "Conference badge and program materials",
      "Access to all plenary and parallel sessions (Nov 28–30, 2025)",
      "Coffee breaks and networking events",
      "Abstract published in the conference proceeding book",
      "Invitation letter for visa purposes (on request)",
    ],
    whoIsThisFor: [
      "Undergraduate, master's, or doctoral students",
      "Students with an accepted oral or poster abstract",
      "Student status must be verifiable (e.g. institutional letter or ID)",
    ],
    format: "Full conference, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "How do I prove I am a student?",
        answer: "You may be asked to provide a current student ID, enrollment letter, or similar proof from your institution. Details will be sent after you register.",
      },
      {
        question: "Can I present both an oral and a poster?",
        answer: "Typically one registration covers one presentation (oral OR poster). If you have two accepted contributions, contact us to confirm the correct registration option.",
      },
    ],
  },
  {
    id: "17712389",
    slug: "registration-non-presenting-attendees",
    title: "Registration – Non-Presenting Attendees",
    description: "Register as a non-presenting attendee for the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Join the conference as an attendee and immerse yourself in three days of keynotes, sessions, and networking—without presenting. This option is perfect for professionals who want to learn from leading researchers and practitioners, connect with peers, and stay current with advances in nursing and healthcare. Full access to the scientific program and conference materials is included.",
    highlights: [
      "Full access to all plenary and parallel sessions",
      "Networking with researchers, clinicians, and policymakers",
      "Conference materials and program",
      "Coffee breaks and designated social events",
      "Certificate of attendance",
    ],
    whatIsIncluded: [
      "Conference badge and program materials",
      "Access to all sessions (Nov 28–30, 2025)",
      "Coffee breaks and networking events",
      "Certificate of attendance",
      "Invitation letter for visa purposes (on request)",
    ],
    whoIsThisFor: [
      "Nurses, educators, and healthcare administrators",
      "Policymakers and industry professionals",
      "Anyone wishing to attend without presenting",
    ],
    format: "Full conference, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "Can I switch to presenting later?",
        answer: "If you later submit and get an abstract accepted, contact us. You may need to pay the difference to a presenter registration; we will guide you through the process.",
      },
      {
        question: "Is the invitation letter for visa included?",
        answer: "Yes. Non-presenting attendees can request an invitation letter for visa application. Request it during or after registration and allow time for processing.",
      },
    ],
  },
  {
    id: "17712400",
    slug: "registration-one-day-non-presenting-attendees",
    title: "Registration – One-Day Non-Presenting Attendees",
    description: "One-day attendee registration for Nursing and Healthcare 2025.",
    longDescription:
      "Short on time? Register for a single day of the conference and still benefit from keynotes, parallel sessions, and networking on your chosen day. One-day registration is ideal for local professionals or those with limited availability who want to sample the program and connect with the community.",
    highlights: [
      "Access to all sessions on your chosen day only",
      "Keynotes and parallel sessions for that day",
      "Coffee breaks and networking on the day of attendance",
      "Conference materials for the day",
      "Certificate of attendance (one-day)",
    ],
    whatIsIncluded: [
      "Conference badge and program for your selected day",
      "Access to plenary and parallel sessions on that day only",
      "Coffee breaks during your day of attendance",
      "One-day certificate of attendance",
      "Invitation letter for visa purposes (on request)",
    ],
    whoIsThisFor: [
      "Local or regional attendees with limited availability",
      "Professionals interested in a specific day's theme or speakers",
      "First-time attendees sampling the conference",
    ],
    format: "One day only (choose Nov 28, 29, or 30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "Can I change my chosen day?",
        answer: "Subject to availability, day changes may be possible before the conference. Contact us as early as possible to request a change.",
      },
      {
        question: "Which day should I pick?",
        answer: "The full program with daily themes and speakers will be published on the conference site. Choose the day that best matches your interests or schedule.",
      },
    ],
  },
  {
    id: "19963671",
    slug: "gold-sponsor",
    title: "Gold Sponsor",
    description: "Gold sponsorship package for the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Gold sponsorship places your organization at the forefront of the Advancing Nursing and Healthcare Conference. Your brand will be highly visible to researchers, clinicians, educators, and policymakers from around the world. The package includes prominent logo placement, exhibition space, and recognition across conference materials and sessions, helping you build lasting relationships with healthcare leaders.",
    highlights: [
      "Prominent logo placement on conference website and main materials",
      "Exhibition booth or designated display space",
      "Recognition in opening and closing sessions",
      "Complimentary registrations for your team",
      "Listing in the conference program and proceeding book",
    ],
    whatIsIncluded: [
      "Gold-level logo on website, program, and signage",
      "Exhibition space (details in sponsor kit)",
      "Multiple complimentary full conference registrations",
      "Acknowledgement from the podium during the conference",
      "Sponsor profile in conference materials",
    ],
    whoIsThisFor: [
      "Healthcare industry leaders and solution providers",
      "Publishers, technology companies, and professional associations",
      "Organizations committed to advancing nursing and healthcare",
    ],
    format: "Full conference visibility (November 28–30, 2025)",
    category: "sponsorship",
    faqs: [
      {
        question: "How many complimentary registrations are included?",
        answer: "The exact number is specified in the Gold sponsor agreement. Contact us for the current sponsor kit and detailed benefits.",
      },
      {
        question: "When is the exhibition setup?",
        answer: "Setup and teardown times will be in the sponsor kit and communicated to confirmed Gold sponsors. Typically setup is the day before or morning of the first conference day.",
      },
    ],
  },
  {
    id: "19963738",
    slug: "bronze-sponsor",
    title: "Bronze Sponsor",
    description: "Bronze sponsorship package for the Nursing and Healthcare 2025 conference.",
    longDescription:
      "Bronze sponsorship is an accessible way to align your organization with the Nursing and Healthcare 2025 conference and reach an engaged audience of healthcare professionals. Your support is recognized through logo placement and listing in conference materials, and the package includes benefits that help you connect with attendees and demonstrate your commitment to the field.",
    highlights: [
      "Logo placement on conference website and in program",
      "Listing in the conference proceeding book",
      "Complimentary registration(s) for your team",
      "Recognition as a Bronze sponsor in materials",
      "Opportunity to engage with attendees",
    ],
    whatIsIncluded: [
      "Bronze-level logo on website and in program",
      "Listing in the abstract proceeding book",
      "Complimentary full conference registration(s) per agreement",
      "Sponsor recognition in conference materials",
    ],
    whoIsThisFor: [
      "Small and medium enterprises in healthcare or education",
      "Associations and nonprofit partners",
      "Organizations new to conference sponsorship",
    ],
    format: "Full conference recognition (November 28–30, 2025)",
    category: "sponsorship",
    faqs: [
      {
        question: "What is the difference between Bronze and Gold?",
        answer: "Gold includes larger logo placement, physical exhibition space, and more complimentary registrations. Bronze offers logo visibility and listing without a dedicated booth. Contact us for a side-by-side comparison.",
      },
      {
        question: "Can we upgrade to Gold later?",
        answer: "Upgrades are subject to availability. Contact us to check if Gold packages are still open and to arrange the upgrade process.",
      },
    ],
  },
  {
    id: "20227617",
    slug: "program-registration-payment",
    title: "Program Registration Payment",
    description: "Program registration payment for Nursing and Healthcare 2025.",
    longDescription:
      "Use this option to complete payment for a program or registration that you have already started or that was arranged directly with the conference team. If you have been instructed to pay via this product page—for example, after receiving an invoice or a custom registration link—you can complete your payment here securely. For new registrations, please use the main registration page to choose your registration type first.",
    highlights: [
      "Secure payment for an existing registration or program",
      "Confirmation and receipt after payment",
      "Support from the conference team if you have questions",
    ],
    whatIsIncluded: [
      "Processing of your payment against your registration or program",
      "Payment confirmation and receipt",
      "Follow-up from the team if any further steps are needed",
    ],
    whoIsThisFor: [
      "Attendees or partners who have already been invoiced or given a payment link",
      "Anyone completing a deferred or partial payment",
      "Registrants who were asked to pay via this product",
    ],
    category: "payment",
    faqs: [
      {
        question: "I haven't registered yet. Should I use this?",
        answer: "No. If you are registering for the first time, go to the main Conference Registration page and select your registration type (e.g. oral, poster, attendee). Use this payment page only when you have been directed to do so.",
      },
      {
        question: "How do I get an invoice or payment link?",
        answer: "Contact the conference team. They will confirm your registration or program and provide instructions, including whether to use this payment page or another method.",
      },
    ],
  },
  {
    id: "20236616",
    slug: "registration-oral-presentation-from-african-east-asian-indian-countries",
    title: "Registration – Oral Presentation (African, East Asian, Indian Countries)",
    description: "Oral presentation speaker registration for attendees from African, East Asian, and Indian countries.",
    longDescription:
      "We are committed to inclusive participation from across the globe. This registration type is for oral presentation speakers from African, East Asian, and Indian countries, offering the same presentation and conference benefits at a rate designed to support international participation. You will have a dedicated oral presentation slot, full access to the conference, and inclusion in the proceeding book, with support for invitation letters and visa-related documentation.",
    highlights: [
      "Dedicated oral presentation slot in the scientific program",
      "Full access to all conference sessions and keynotes",
      "Reduced rate to support international participation",
      "Inclusion in the abstract proceeding book",
      "Invitation letter and visa support",
    ],
    whatIsIncluded: [
      "Conference badge and program materials",
      "Access to all plenary and parallel sessions (Nov 28–30, 2025)",
      "Coffee breaks and networking events",
      "Abstract published in the conference proceeding book",
      "Invitation letter for visa purposes and support with documentation",
    ],
    whoIsThisFor: [
      "Oral presentation speakers from African countries",
      "Oral presentation speakers from East Asian countries",
      "Oral presentation speakers from Indian subcontinent countries",
    ],
    format: "Full conference, 3 days (November 28–30, 2025)",
    category: "registration",
    faqs: [
      {
        question: "Which countries are included?",
        answer: "The list of eligible countries is based on our commitment to support participation from underrepresented regions. If you are unsure whether your country is included, contact us with your affiliation and we will confirm.",
      },
      {
        question: "Are the benefits the same as standard oral presentation?",
        answer: "Yes. You receive the same presentation slot, full conference access, and proceeding book inclusion. The difference is the registration fee, which is set to encourage participation from these regions.",
      },
    ],
  },
];

export function getProductByIdAndSlug(id: string, slug: string): ProductItem | undefined {
  return products.find((p) => p.id === id && p.slug === slug);
}

export function getAllProducts(): ProductItem[] {
  return products;
}

export type ProductCategory = ProductItem["category"];

/** All product categories with label and count (for /products and sitemap). */
export function getProductCategories(): { category: ProductCategory; label: string; count: number }[] {
  const labels: Record<ProductCategory, string> = {
    registration: "Registration",
    sponsorship: "Sponsorship",
    payment: "Payment",
  };
  const counts = products.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<ProductCategory, number>
  );
  return (["registration", "sponsorship", "payment"] as const)
    .filter((cat) => (counts[cat] ?? 0) > 0)
    .map((category) => ({
      category,
      label: labels[category],
      count: counts[category] ?? 0,
    }));
}

/** Products in a given category (for /products/category/[category]). */
export function getProductsByCategory(category: ProductCategory): ProductItem[] {
  return products.filter((p) => p.category === category);
}
