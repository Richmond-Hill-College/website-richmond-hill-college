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
  {
    slug: "how-do-i-access-my-account",
    question: "How do I access my account?",
    category: "My Account",
    answer:
      "Use the My Account page on our website to sign in to RHC Global Bridge. There you can view your registered courses, update your profile, and manage your learning activity. If you have forgotten your password or need help logging in, use the recovery options on the sign-in page or contact our office for assistance.",
  },
  {
    slug: "what-programs-does-richmond-hill-college-offer",
    question: "What programs does Richmond Hill College offer?",
    category: "Programs",
    answer:
      "Richmond Hill College offers bridging programs for internationally educated professionals, certified career programs, and a range of courses in nursing, healthcare, and related fields. Explore the Programs, Bridging Programs, and Course Offerings pages on our website for full details. Conference events such as Nursing and Healthcare 2025 are also listed under Conferences.",
  },
  {
    slug: "can-i-get-a-certificate-or-transcript-after-completing-a-course",
    question: "Can I get a certificate or transcript after completing a course?",
    category: "Certificates & Credentials",
    answer:
      "Certificate and transcript availability depends on the program. Many of our career and bridging programs issue certificates upon successful completion. Details are usually provided on the course page and in your account. For an official transcript or duplicate certificate, contact our office with your name, program, and completion date.",
  },
  {
    slug: "how-do-i-contact-richmond-hill-college",
    question: "How do I contact Richmond Hill College?",
    category: "Contact & Support",
    answer:
      "You can reach us through the Contact page on our website, by phone at toll-free +1 855 (328) 6065, or by using the contact form or email listed there. For conference-specific questions, use the contact details on the relevant conference page. We aim to respond to inquiries in a timely manner.",
  },
  {
    slug: "are-courses-offered-online-or-in-person",
    question: "Are courses offered online or in person?",
    category: "Programs",
    answer:
      "Delivery format varies by program and course. Some offerings are fully online, others are in person or hybrid. Check the specific course or program page on our website and on RHC Global Bridge for the delivery mode and schedule. Conference events are typically in person with details on the conference pages.",
  },
  {
    slug: "what-is-rhc-global-bridge",
    question: "What is RHC Global Bridge?",
    category: "Registration",
    answer:
      "RHC Global Bridge is our official platform for course and program registration, payments, and account management. When you choose a course from our website, you are directed to RHC Global Bridge to complete enrollment and payment securely. Your My Account access also goes through this platform.",
  },
  {
    slug: "do-you-offer-payment-plans",
    question: "Do you offer payment plans?",
    category: "Fees & Payment",
    answer:
      "Payment options vary by program. Some courses and products on RHC Global Bridge may offer installment or payment plan options—check the specific course or product page at the time of registration. For programs that do not show a plan online, contact us to ask about possible arrangements for your situation.",
  },
  {
    slug: "how-long-do-bridging-programs-take",
    question: "How long do bridging programs take?",
    category: "Programs",
    answer:
      "Duration varies by bridging program. Each program page on our website and on RHC Global Bridge states the length (e.g. weeks or months) and schedule. For exact timelines and whether you can study part time, check the course details or contact us with the program name.",
  },
  {
    slug: "can-international-students-apply",
    question: "Can international students apply?",
    category: "Admissions",
    answer:
      "Yes. Many of our programs, including bridging programs, are designed for internationally educated professionals. Admission requirements and any language or credential requirements are listed on the relevant course or program page. For visa or study-permit questions, we recommend consulting Immigration, Refugees and Citizenship Canada (IRCC) and, if needed, we can provide supporting documents such as conference invitation letters where applicable.",
  },
  {
    slug: "how-do-i-know-if-my-application-was-received",
    question: "How do I know if my application was received?",
    category: "Admissions",
    answer:
      "After submitting through RHC Global Bridge, you typically receive an email confirmation. You can also check your My Account area for registered courses and application status. If you did not receive a confirmation or have concerns, contact us with your name and the program or course you applied for.",
  },
  {
    slug: "what-is-the-nursing-and-healthcare-conference",
    question: "What is the Nursing and Healthcare conference?",
    category: "Conferences",
    answer:
      "Nursing and Healthcare 2025 is a conference hosted by Richmond Hill College, bringing together professionals in nursing and healthcare. Details on dates, venue, registration, abstract submission, sponsorship, and accommodations are on the Conferences section of our website. Use the conference links to register or submit an abstract.",
  },
  {
    slug: "where-is-richmond-hill-college-located",
    question: "Where is Richmond Hill College located?",
    category: "Contact & Support",
    answer:
      "Richmond Hill College is in Richmond Hill, Ontario. Full address and contact information are on our Contact page. For conference events, the venue and location are specified on each conference page (e.g. Nursing and Healthcare 2025).",
  },
  {
    slug: "can-i-transfer-credits-from-another-institution",
    question: "Can I transfer credits from another institution?",
    category: "Admissions",
    answer:
      "Credit transfer depends on the program. Some programs may recognize prior learning or credentials—check the specific program or course page for policy. For a personalized assessment, contact us with the name of your program of interest and details of your previous education.",
  },
  {
    slug: "how-do-i-reset-my-password",
    question: "How do I reset my password?",
    category: "My Account",
    answer:
      "Use the password reset option on the RHC Global Bridge sign-in page (reached via My Account). Enter the email associated with your account to receive reset instructions. If you do not receive the email or cannot reset your password, contact our office and we can help you regain access.",
  },
  {
    slug: "are-there-scholarships-or-financial-aid",
    question: "Are there scholarships or financial aid?",
    category: "Fees & Payment",
    answer:
      "Availability of scholarships or financial support varies by program. Any such options are typically described on the program or course page. For current opportunities and eligibility, contact us with the program you are interested in and we will provide the relevant information.",
  },
  {
    slug: "what-are-certified-career-programs",
    question: "What are certified career programs?",
    category: "Programs",
    answer:
      "Our certified career programs are structured courses that prepare you for specific careers and may lead to a certificate or credential. They are listed on our website under Programs and Course Offerings. Each program page describes outcomes, duration, and how to enroll via RHC Global Bridge.",
  },
  {
    slug: "how-do-i-cancel-my-registration",
    question: "How do I cancel my registration?",
    category: "Registration",
    answer:
      "Cancellation and refund rules depend on the program or conference and are stated at the time of registration. To cancel, contact us with your name, the course or event, and your registration details. We will confirm the process and any applicable refund according to the policy.",
  },
  {
    slug: "do-you-offer-language-support-for-french-speakers",
    question: "Do you offer language support for French speakers?",
    category: "Contact & Support",
    answer:
      "Our website is available in English and French. For service in French, contact us and we will do our best to assist you in French. Course materials and delivery language vary by program—check the course description for language of instruction.",
  },
  {
    slug: "what-should-i-do-if-i-miss-a-deadline",
    question: "What should I do if I miss a deadline?",
    category: "Admissions",
    answer:
      "If you missed an application or registration deadline, contact us as soon as possible with the program or conference name. Depending on capacity and policy, we may be able to advise on late registration or the next available intake. Deadlines for abstracts and early-bird rates are typically firm; we can confirm options for your case.",
  },
  {
    slug: "how-do-i-get-my-conference-materials-or-badge",
    question: "How do I get my conference materials or badge?",
    category: "Conferences",
    answer:
      "Conference materials and badges are usually distributed at the event. Details on pick-up location and times are communicated to registered attendees before the conference. If you have not received instructions, check the conference page or contact the conference team via the conference Contact page.",
  },
  {
    slug: "is-my-payment-secure",
    question: "Is my payment secure?",
    category: "Fees & Payment",
    answer:
      "Yes. Payments are processed through RHC Global Bridge using secure methods. Do not send payment or credit card details by email. Always use the official registration and payment flow from our website to RHC Global Bridge. If you notice anything suspicious, contact us before entering payment information.",
  },
  {
    slug: "can-i-attend-a-conference-without-submitting-an-abstract",
    question: "Can I attend a conference without submitting an abstract?",
    category: "Conferences",
    answer:
      "Yes. You can register as an attendee without submitting an abstract. Abstract submission is for those who wish to present. Registration options and fees are on the conference page (e.g. Nursing and Healthcare 2025). Register through the conference registration link to secure your place.",
  },
  {
    slug: "what-are-the-requirements-for-bridging-programs",
    question: "What are the requirements for bridging programs?",
    category: "Admissions",
    answer:
      "Requirements vary by bridging program. Typically they include relevant education or work experience from outside Canada. Exact requirements are on each bridging program page on our website and RHC Global Bridge. For an eligibility check, contact us with your background and the program name.",
  },
  {
    slug: "how-do-i-update-my-personal-information",
    question: "How do I update my personal information?",
    category: "My Account",
    answer:
      "Sign in to your account via the My Account page (RHC Global Bridge). From your profile or account settings you can update contact and personal details. If you cannot find the option or need to change something that is not editable (e.g. name on a certificate), contact us with your request.",
  },
  {
    slug: "where-can-i-find-the-conference-program-or-schedule",
    question: "Where can I find the conference program or schedule?",
    category: "Conferences",
    answer:
      "The program or schedule for each conference is published on the conference section of our website. For Nursing and Healthcare 2025, use the conference main page and the Program Table or equivalent link. Updates are posted as they become available; registered attendees may also receive schedule updates by email.",
  },
  {
    slug: "what-happens-after-i-register-for-a-course",
    question: "What happens after I register for a course?",
    category: "Registration",
    answer:
      "After you complete registration and payment on RHC Global Bridge, you will receive a confirmation. You can see your registered course in My Account. Next steps (e.g. start date, access to materials, orientation) depend on the program and are usually communicated by email or shown in your account.",
  },
  {
    slug: "do-you-offer-accommodation-for-conferences",
    question: "Do you offer accommodation for conferences?",
    category: "Conferences",
    answer:
      "Accommodation options for conferences are listed on the conference pages. For Nursing and Healthcare 2025, see the Accommodations section on the conference site for recommended hotels or options. Booking is typically your responsibility; we provide information to help you arrange stays.",
  },
  {
    slug: "how-can-i-request-a-receipt-or-invoice",
    question: "How can I request a receipt or invoice?",
    category: "Fees & Payment",
    answer:
      "Receipts or invoices may be available from RHC Global Bridge after payment, or sent by email. If you need a duplicate receipt or a formal invoice, contact us with your name, the course or product, and the date of payment. We will provide the document according to our procedures.",
  },
  {
    slug: "what-is-the-difference-between-programs-and-courses",
    question: "What is the difference between programs and courses?",
    category: "Programs",
    answer:
      "Programs are broader offerings (e.g. bridging programs, certified career programs) that may include multiple components or a defined path. Courses can be standalone or part of a program. Both are listed on our website—Programs and Bridging Programs for program-level options, Course Offerings and Courses for individual courses. Each has its own registration and fee information on RHC Global Bridge.",
  },
  {
    slug: "can-i-get-sponsorship-information-for-conferences",
    question: "Can I get sponsorship information for conferences?",
    category: "Conferences",
    answer:
      "Yes. Sponsorship opportunities are described on the conference pages. For Nursing and Healthcare 2025, visit the conference section and open the Sponsorship page for packages and contact details. For other events, check the relevant conference area on our website.",
  },
  {
    slug: "how-do-i-report-a-technical-issue",
    question: "How do I report a technical issue?",
    category: "Contact & Support",
    answer:
      "If you experience a technical problem with the website or RHC Global Bridge (e.g. login, payment, or registration), contact us via the Contact page with a description of the issue, the page or step where it occurred, and your browser or device if relevant. We will escalate to technical support as needed.",
  },
  {
    slug: "are-there-prerequisites-for-courses",
    question: "Are there prerequisites for courses?",
    category: "Admissions",
    answer:
      "Prerequisites vary by course or program. They are listed on the course page on our website and on RHC Global Bridge. If nothing is stated, there may be no formal prerequisite; for clarity, contact us with the course name and your background so we can confirm your eligibility.",
  },
  {
    slug: "what-if-i-have-a-disability-or-accessibility-need",
    question: "What if I have a disability or accessibility need?",
    category: "Contact & Support",
    answer:
      "We aim to accommodate accessibility needs where possible. Please contact us before registering to discuss your requirements (e.g. for courses or conferences). We will work with you to identify options. For conference venues, accessibility information is provided on the conference page where available.",
  },
  {
    slug: "how-do-i-know-when-new-courses-are-available",
    question: "How do I know when new courses are available?",
    category: "Programs",
    answer:
      "New courses and programs are added to our website and RHC Global Bridge as they become available. Check the Course Offerings, Courses, and Programs pages regularly. For important updates you can also contact us and ask to be informed about new offerings in your area of interest.",
  },
  {
    slug: "what-is-the-abstract-proceeding-book",
    question: "What is the abstract proceeding book?",
    category: "Conferences",
    answer:
      "The abstract proceeding book for a conference (e.g. Nursing and Healthcare 2025) is a collection of accepted abstracts from presenters. Details on whether it is digital or print and how to access it are on the conference page. Registered attendees and presenters typically receive access or instructions before or at the event.",
  },
  {
    slug: "can-i-switch-to-a-different-course-or-program",
    question: "Can I switch to a different course or program?",
    category: "Registration",
    answer:
      "Switching depends on program policy and timing. Contact us with your current registration, the course or program you want to switch to, and your reason. We will explain the process, any fee difference, and whether a transfer is possible before the start date.",
  },
  {
    slug: "how-are-courses-delivered-online",
    question: "How are courses delivered online?",
    category: "Programs",
    answer:
      "Online delivery varies by program: some use a learning management system, live sessions, or self-paced modules. The course or program page describes the format. After registration, you will receive access and instructions. For specific technical or format questions, contact us or refer to the course materials.",
  },
  {
    slug: "what-is-early-bird-registration",
    question: "What is early bird registration?",
    category: "Conferences",
    answer:
      "Early bird registration is a discounted rate for conference attendees who register before a set deadline. Dates and prices are on the conference page (e.g. Nursing and Healthcare 2025). After the early bird deadline, standard rates apply. Register before the deadline to secure the early bird price.",
  },
  {
    slug: "do-i-need-a-study-permit-for-short-courses",
    question: "Do I need a study permit for short courses?",
    category: "Admissions",
    answer:
      "Study permit requirements are set by Immigration, Refugees and Citizenship Canada (IRCC), not by the college. Short courses and professional development may have different rules than full-time academic programs. We recommend checking IRCC guidelines. We can provide documents such as confirmation of registration or invitation letters for conferences when applicable.",
  },
  {
    slug: "how-do-i-request-an-invitation-letter-for-a-visa",
    question: "How do I request an invitation letter for a visa?",
    category: "Conferences",
    answer:
      "Registered conference attendees can request an invitation letter via the conference Invitation Letter page. Complete registration first, then follow the instructions there. If you need the letter before paying (e.g. for visa application), contact us with your details and we will advise on the process.",
  },
  {
    slug: "what-payment-methods-are-accepted",
    question: "What payment methods are accepted?",
    category: "Fees & Payment",
    answer:
      "Accepted payment methods are shown on RHC Global Bridge when you complete registration. Typically major credit cards and other options supported by the platform are available. Do not send cash or wire details by email. Use only the payment options provided in the official RHC Global Bridge checkout.",
  },
  {
    slug: "where-is-the-conference-venue",
    question: "Where is the conference venue?",
    category: "Conferences",
    answer:
      "The venue and full address for each conference are on the conference page. For Nursing and Healthcare 2025, see the Venue section. Directions, transit, and parking information are included where available. Registered attendees may receive venue details again by email before the event.",
  },
  {
    slug: "can-employers-verify-my-certificate-or-credential",
    question: "Can employers verify my certificate or credential?",
    category: "Certificates & Credentials",
    answer:
      "We can verify completion of our programs and issuance of certificates when requested by you or with your consent. Employers or third parties seeking verification should contact us with your full name, program name, and approximate completion date. We will respond in line with our verification process and privacy policy.",
  },
  {
    slug: "what-support-is-available-during-my-program",
    question: "What support is available during my program?",
    category: "Contact & Support",
    answer:
      "Support varies by program. You can contact our office for general questions, technical issues, or administrative help. Course-specific support (e.g. content, assignments) may be provided by instructors or through the learning platform—details are usually in your course materials or welcome communication.",
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
  {
    slug: "how-do-i-access-my-account",
    question: "Comment accéder à mon compte ?",
    category: "Mon compte",
    answer:
      "Utilisez la page Mon compte sur notre site pour vous connecter à RHC Global Bridge. Vous y trouverez vos cours inscrits, pourrez mettre à jour votre profil et gérer votre activité. En cas d'oubli de mot de passe ou de problème de connexion, utilisez les options de récupération sur la page de connexion ou contactez notre bureau.",
  },
  {
    slug: "what-programs-does-richmond-hill-college-offer",
    question: "Quels programmes offre le Collège Richmond Hill ?",
    category: "Programmes",
    answer:
      "Le Collège Richmond Hill propose des programmes de transition pour les professionnels formés à l'étranger, des programmes de carrière certifiés et des cours en soins infirmiers, santé et domaines connexes. Consultez les pages Programmes, Programmes de transition et Offre de cours. Les conférences (ex. Soins infirmiers et santé 2025) figurent dans la section Conférences.",
  },
  {
    slug: "can-i-get-a-certificate-or-transcript-after-completing-a-course",
    question: "Puis-je obtenir un certificat ou une transcription après un cours ?",
    category: "Certificats et attestations",
    answer:
      "La délivrance de certificats et transcriptions dépend du programme. Plusieurs programmes de carrière et de transition délivrent un certificat à la réussite. Les détails sont sur la page du cours et dans votre compte. Pour une transcription officielle ou un duplicata de certificat, contactez-nous avec votre nom, le programme et la date de complétion.",
  },
  {
    slug: "how-do-i-contact-richmond-hill-college",
    question: "Comment contacter le Collège Richmond Hill ?",
    category: "Contact et soutien",
    answer:
      "Vous pouvez nous joindre via la page Contact, par téléphone au +1 855 (328) 6065 (sans frais), ou via le formulaire ou courriel indiqué. Pour les conférences, utilisez les coordonnées de la page de la conférence. Nous nous efforçons de répondre rapidement.",
  },
  {
    slug: "are-courses-offered-online-or-in-person",
    question: "Les cours sont-ils offerts en ligne ou en présentiel ?",
    category: "Programmes",
    answer:
      "Le format varie selon le programme et le cours : en ligne, en présentiel ou hybride. Consultez la page du cours ou du programme et RHC Global Bridge pour le mode et l'horaire. Les conférences sont généralement en présentiel ; les détails sont sur les pages des conférences.",
  },
  {
    slug: "what-is-rhc-global-bridge",
    question: "Qu'est-ce que RHC Global Bridge ?",
    category: "Inscription",
    answer:
      "RHC Global Bridge est notre plateforme officielle d'inscription aux cours et programmes, de paiement et de gestion de compte. En choisissant un cours sur notre site, vous êtes redirigé vers RHC Global Bridge pour finaliser l'inscription et le paiement en toute sécurité. L'accès Mon compte passe également par cette plateforme.",
  },
  {
    slug: "do-you-offer-payment-plans",
    question: "Proposez-vous des modalités de paiement échelonné ?",
    category: "Frais et paiement",
    answer:
      "Les options de paiement varient selon le programme. Certains cours et produits sur RHC Global Bridge peuvent offrir des versements ou des plans de paiement—vérifiez la page du cours ou du produit au moment de l'inscription. Sinon, contactez-nous pour connaître les possibilités.",
  },
  {
    slug: "how-long-do-bridging-programs-take",
    question: "Combien de temps durent les programmes de transition ?",
    category: "Programmes",
    answer:
      "La durée varie selon le programme de transition. Chaque page de programme sur notre site et RHC Global Bridge indique la durée (semaines ou mois) et l'horaire. Pour les délais précis et la possibilité d'étudier à temps partiel, consultez le cours ou contactez-nous.",
  },
  {
    slug: "can-international-students-apply",
    question: "Les étudiants internationaux peuvent-ils postuler ?",
    category: "Admissions",
    answer:
      "Oui. Plusieurs de nos programmes, dont les programmes de transition, s'adressent aux professionnels formés à l'étranger. Les conditions d'admission et toute exigence linguistique ou de diplôme sont sur la page du cours ou du programme. Pour les questions de visa ou de permis d'études, consultez Immigration, Réfugiés et Citoyenneté Canada (IRCC) ; nous pouvons fournir des documents de soutien (ex. lettres d'invitation pour conférences) si applicable.",
  },
  {
    slug: "how-do-i-know-if-my-application-was-received",
    question: "Comment savoir si ma demande a été reçue ?",
    category: "Admissions",
    answer:
      "Après soumission via RHC Global Bridge, vous recevez généralement un courriel de confirmation. Vous pouvez aussi consulter Mon compte pour l'état de vos inscriptions. En l'absence de confirmation, contactez-nous avec votre nom et le programme ou cours demandé.",
  },
  {
    slug: "what-is-the-nursing-and-healthcare-conference",
    question: "Qu'est-ce que la conférence Soins infirmiers et santé ?",
    category: "Conférences",
    answer:
      "Soins infirmiers et santé 2025 est une conférence organisée par le Collège Richmond Hill, réunissant des professionnels des soins infirmiers et de la santé. Dates, lieu, inscription, soumission de résumés, commandites et hébergement sont dans la section Conférences. Utilisez les liens de la conférence pour vous inscrire ou soumettre un résumé.",
  },
  {
    slug: "where-is-richmond-hill-college-located",
    question: "Où se trouve le Collège Richmond Hill ?",
    category: "Contact et soutien",
    answer:
      "Le Collège Richmond Hill est situé à Richmond Hill, Ontario. L'adresse et les coordonnées complètes sont sur notre page Contact. Pour les conférences, le lieu est indiqué sur chaque page de conférence (ex. Soins infirmiers et santé 2025).",
  },
  {
    slug: "can-i-transfer-credits-from-another-institution",
    question: "Puis-je faire reconnaître des crédits d'un autre établissement ?",
    category: "Admissions",
    answer:
      "La reconnaissance des crédits dépend du programme. Certains programmes peuvent reconnaître des acquis ou diplômes—consultez la page du programme ou du cours. Pour une évaluation personnalisée, contactez-nous avec le programme visé et votre parcours.",
  },
  {
    slug: "how-do-i-reset-my-password",
    question: "Comment réinitialiser mon mot de passe ?",
    category: "Mon compte",
    answer:
      "Utilisez l'option de réinitialisation sur la page de connexion RHC Global Bridge (via Mon compte). Entrez le courriel associé à votre compte pour recevoir les instructions. Si vous ne recevez rien ou ne pouvez pas réinitialiser, contactez notre bureau.",
  },
  {
    slug: "are-there-scholarships-or-financial-aid",
    question: "Y a-t-il des bourses ou de l'aide financière ?",
    category: "Frais et paiement",
    answer:
      "Les bourses et l'aide financière varient selon le programme. Les options sont décrites sur la page du programme ou du cours. Pour les possibilités actuelles et l'admissibilité, contactez-nous en indiquant le programme qui vous intéresse.",
  },
  {
    slug: "what-are-certified-career-programs",
    question: "Que sont les programmes de carrière certifiés ?",
    category: "Programmes",
    answer:
      "Nos programmes de carrière certifiés sont des formations structurées qui préparent à des carrières précises et peuvent mener à un certificat ou une attestation. Ils sont listés sous Programmes et Offre de cours. Chaque page décrit les objectifs, la durée et l'inscription via RHC Global Bridge.",
  },
  {
    slug: "how-do-i-cancel-my-registration",
    question: "Comment annuler mon inscription ?",
    category: "Inscription",
    answer:
      "Les règles d'annulation et de remboursement dépendent du programme ou de la conférence et sont indiquées à l'inscription. Pour annuler, contactez-nous avec votre nom, le cours ou l'événement et vos détails d'inscription. Nous vous indiquerons la marche à suivre et tout remboursement applicable.",
  },
  {
    slug: "do-you-offer-language-support-for-french-speakers",
    question: "Offrez-vous du soutien en français ?",
    category: "Contact et soutien",
    answer:
      "Notre site est disponible en anglais et en français. Pour un service en français, contactez-nous et nous ferons notre possible pour vous aider en français. La langue des cours et du matériel varie selon le programme—vérifiez la description du cours.",
  },
  {
    slug: "what-should-i-do-if-i-miss-a-deadline",
    question: "Que faire si j'ai manqué une date limite ?",
    category: "Admissions",
    answer:
      "Si vous avez manqué une date d'admission ou d'inscription, contactez-nous dès que possible avec le nom du programme ou de la conférence. Selon les places et la politique, nous pourrons vous dire s'il est possible de s'inscrire en retard ou à la prochaine session. Les dates pour les résumés et tarifs préférentiels sont en général fermes ; nous pouvons confirmer les options pour votre cas.",
  },
  {
    slug: "how-do-i-get-my-conference-materials-or-badge",
    question: "Comment obtenir mes documents ou badge de conférence ?",
    category: "Conférences",
    answer:
      "Les documents et badges sont en général remis sur place. Les détails (lieu et horaire) sont communiqués aux inscrits avant l'événement. En l'absence d'instructions, consultez la page de la conférence ou contactez l'équipe via la page Contact de la conférence.",
  },
  {
    slug: "is-my-payment-secure",
    question: "Mon paiement est-il sécurisé ?",
    category: "Frais et paiement",
    answer:
      "Oui. Les paiements sont traités via RHC Global Bridge de manière sécurisée. N'envoyez pas de paiement ni de coordonnées bancaires par courriel. Utilisez uniquement le flux officiel d'inscription et de paiement depuis notre site vers RHC Global Bridge. En cas de doute, contactez-nous avant de payer.",
  },
  {
    slug: "can-i-attend-a-conference-without-submitting-an-abstract",
    question: "Puis-je assister à une conférence sans soumettre de résumé ?",
    category: "Conférences",
    answer:
      "Oui. Vous pouvez vous inscrire comme participant sans soumettre de résumé. La soumission de résumés est pour ceux qui souhaitent présenter. Les options et tarifs d'inscription sont sur la page de la conférence (ex. Soins infirmiers et santé 2025). Inscrivez-vous via le lien officiel pour réserver votre place.",
  },
  {
    slug: "what-are-the-requirements-for-bridging-programs",
    question: "Quelles sont les exigences pour les programmes de transition ?",
    category: "Admissions",
    answer:
      "Les exigences varient selon le programme. En général : formation ou expérience pertinente obtenue à l'étranger. Les détails sont sur chaque page de programme de transition sur notre site et RHC Global Bridge. Pour une vérification d'admissibilité, contactez-nous avec votre parcours et le nom du programme.",
  },
  {
    slug: "how-do-i-update-my-personal-information",
    question: "Comment mettre à jour mes informations personnelles ?",
    category: "Mon compte",
    answer:
      "Connectez-vous via la page Mon compte (RHC Global Bridge). Dans votre profil ou paramètres du compte, vous pouvez modifier vos coordonnées. Si vous ne trouvez pas l'option ou devez modifier un élément non éditable (ex. nom sur un certificat), contactez-nous.",
  },
  {
    slug: "where-can-i-find-the-conference-program-or-schedule",
    question: "Où trouver le programme ou l'horaire de la conférence ?",
    category: "Conférences",
    answer:
      "Le programme ou l'horaire de chaque conférence est publié dans la section conférence de notre site. Pour Soins infirmiers et santé 2025, consultez la page principale de la conférence et le Tableau du programme. Les inscrits peuvent aussi recevoir des mises à jour par courriel.",
  },
  {
    slug: "what-happens-after-i-register-for-a-course",
    question: "Que se passe-t-il après mon inscription à un cours ?",
    category: "Inscription",
    answer:
      "Après avoir complété l'inscription et le paiement sur RHC Global Bridge, vous recevez une confirmation. Vous voyez votre cours dans Mon compte. Les prochaines étapes (date de début, accès au matériel, orientation) dépendent du programme et sont communiquées par courriel ou dans votre compte.",
  },
  {
    slug: "do-you-offer-accommodation-for-conferences",
    question: "Proposez-vous des hébergements pour les conférences ?",
    category: "Conférences",
    answer:
      "Les options d'hébergement sont indiquées sur les pages des conférences. Pour Soins infirmiers et santé 2025, voir la section Hébergement pour les hôtels recommandés. La réservation est en général à votre charge ; nous fournissons les informations pour faciliter votre séjour.",
  },
  {
    slug: "how-can-i-request-a-receipt-or-invoice",
    question: "Comment demander un reçu ou une facture ?",
    category: "Frais et paiement",
    answer:
      "Un reçu ou une facture peut être disponible sur RHC Global Bridge après paiement ou envoyé par courriel. Pour un duplicata ou une facture officielle, contactez-nous avec votre nom, le cours ou produit et la date de paiement. Nous vous fournirons le document selon nos procédures.",
  },
  {
    slug: "what-is-the-difference-between-programs-and-courses",
    question: "Quelle est la différence entre programmes et cours ?",
    category: "Programmes",
    answer:
      "Les programmes sont des offres plus larges (ex. programmes de transition, programmes de carrière certifiés) qui peuvent inclure plusieurs composantes. Les cours peuvent être autonomes ou faire partie d'un programme. Les deux sont listés sur notre site—Programmes et Programmes de transition pour les options de programme, Offre de cours et Cours pour les cours individuels. Chacun a ses frais et son inscription sur RHC Global Bridge.",
  },
  {
    slug: "can-i-get-sponsorship-information-for-conferences",
    question: "Puis-je obtenir des informations sur la commandite pour les conférences ?",
    category: "Conférences",
    answer:
      "Oui. Les possibilités de commandite sont décrites sur les pages des conférences. Pour Soins infirmiers et santé 2025, consultez la section conférence et la page Commandite pour les forfaits et coordonnées. Pour d'autres événements, voir la section correspondante sur notre site.",
  },
  {
    slug: "how-do-i-report-a-technical-issue",
    question: "Comment signaler un problème technique ?",
    category: "Contact et soutien",
    answer:
      "En cas de problème technique avec le site ou RHC Global Bridge (connexion, paiement, inscription), contactez-nous via la page Contact en décrivant le problème, la page ou l'étape concernée et votre navigateur ou appareil si pertinent. Nous transmettrons au soutien technique au besoin.",
  },
  {
    slug: "are-there-prerequisites-for-courses",
    question: "Y a-t-il des prérequis pour les cours ?",
    category: "Admissions",
    answer:
      "Les prérequis varient selon le cours ou le programme et sont indiqués sur la page du cours sur notre site et RHC Global Bridge. En l'absence d'indication, il peut n'y avoir aucun prérequis formel ; pour confirmer votre admissibilité, contactez-nous avec le nom du cours et votre parcours.",
  },
  {
    slug: "what-if-i-have-a-disability-or-accessibility-need",
    question: "Que faire si j'ai un handicap ou des besoins d'accessibilité ?",
    category: "Contact et soutien",
    answer:
      "Nous nous efforçons d'accommoder les besoins d'accessibilité lorsque possible. Contactez-nous avant de vous inscrire pour discuter de vos besoins (cours ou conférences). Nous travaillerons avec vous pour trouver des solutions. Pour les lieux de conférence, les informations d'accessibilité sont sur la page de la conférence lorsqu'elles sont disponibles.",
  },
  {
    slug: "how-do-i-know-when-new-courses-are-available",
    question: "Comment savoir quand de nouveaux cours sont offerts ?",
    category: "Programmes",
    answer:
      "Les nouveaux cours et programmes sont ajoutés sur notre site et RHC Global Bridge au fur et à mesure. Consultez régulièrement les pages Offre de cours, Cours et Programmes. Vous pouvez aussi nous contacter pour être informé des nouvelles offres dans votre domaine d'intérêt.",
  },
  {
    slug: "what-is-the-abstract-proceeding-book",
    question: "Qu'est-ce que le recueil des résumés (abstract proceeding book) ?",
    category: "Conférences",
    answer:
      "Le recueil des résumés d'une conférence (ex. Soins infirmiers et santé 2025) rassemble les résumés acceptés des présentateurs. Les détails (format numérique ou imprimé, accès) sont sur la page de la conférence. Les inscrits et présentateurs reçoivent en général les instructions avant ou lors de l'événement.",
  },
  {
    slug: "can-i-switch-to-a-different-course-or-program",
    question: "Puis-je changer de cours ou de programme ?",
    category: "Inscription",
    answer:
      "Le changement dépend de la politique du programme et du moment. Contactez-nous en indiquant votre inscription actuelle, le cours ou programme souhaité et la raison. Nous expliquerons la démarche, toute différence de frais et si un transfert est possible avant le début.",
  },
  {
    slug: "how-are-courses-delivered-online",
    question: "Comment les cours en ligne sont-ils dispensés ?",
    category: "Programmes",
    answer:
      "La formule en ligne varie : plateforme d'apprentissage, séances en direct ou modules à rythme libre. La page du cours ou du programme décrit le format. Après l'inscription, vous recevrez l'accès et les instructions. Pour des questions techniques ou de format, contactez-nous ou consultez le matériel du cours.",
  },
  {
    slug: "what-is-early-bird-registration",
    question: "Qu'est-ce que l'inscription tarif préférentiel (early bird) ?",
    category: "Conférences",
    answer:
      "L'inscription early bird est un tarif réduit pour les participants qui s'inscrivent avant une date donnée. Les dates et prix sont sur la page de la conférence (ex. Soins infirmiers et santé 2025). Après cette date, le tarif standard s'applique. Inscrivez-vous avant la date pour bénéficier du tarif early bird.",
  },
  {
    slug: "do-i-need-a-study-permit-for-short-courses",
    question: "Ai-je besoin d'un permis d'études pour des cours de courte durée ?",
    category: "Admissions",
    answer:
      "Les exigences de permis d'études sont fixées par Immigration, Réfugiés et Citoyenneté Canada (IRCC), pas par le collège. Les cours courts et la formation professionnelle peuvent être soumis à d'autres règles. Consultez les lignes directrices d'IRCC. Nous pouvons fournir des documents tels qu'une confirmation d'inscription ou des lettres d'invitation pour conférences lorsque pertinent.",
  },
  {
    slug: "how-do-i-request-an-invitation-letter-for-a-visa",
    question: "Comment demander une lettre d'invitation pour un visa ?",
    category: "Conférences",
    answer:
      "Les participants inscrits peuvent demander une lettre d'invitation via la page Lettre d'invitation de la conférence. Complétez d'abord l'inscription, puis suivez les instructions. Si vous avez besoin de la lettre avant de payer (ex. pour une demande de visa), contactez-nous avec vos coordonnées.",
  },
  {
    slug: "what-payment-methods-are-accepted",
    question: "Quels modes de paiement sont acceptés ?",
    category: "Frais et paiement",
    answer:
      "Les modes de paiement acceptés sont indiqués sur RHC Global Bridge lors du paiement. En général, les principales cartes de crédit et autres options de la plateforme sont acceptées. N'envoyez pas d'argent ni de coordonnées par courriel. Utilisez uniquement les options de paiement du flux officiel RHC Global Bridge.",
  },
  {
    slug: "where-is-the-conference-venue",
    question: "Où se déroule la conférence ?",
    category: "Conférences",
    answer:
      "Le lieu et l'adresse complète de chaque conférence sont sur la page de la conférence. Pour Soins infirmiers et santé 2025, voir la section Lieu. Les directions, transports et stationnement sont indiqués lorsqu’ils sont disponibles. Les inscrits peuvent recevoir à nouveau ces informations par courriel avant l'événement.",
  },
  {
    slug: "can-employers-verify-my-certificate-or-credential",
    question: "Les employeurs peuvent-ils vérifier mon certificat ou attestation ?",
    category: "Certificats et attestations",
    answer:
      "Nous pouvons vérifier la complétion de nos programmes et la délivrance de certificats sur demande de votre part ou avec votre consentement. Les employeurs ou tiers doivent nous contacter avec votre nom complet, le programme et la date approximative de complétion. Nous répondrons selon notre processus de vérification et notre politique de confidentialité.",
  },
  {
    slug: "what-support-is-available-during-my-program",
    question: "Quel soutien est offert pendant mon programme ?",
    category: "Contact et soutien",
    answer:
      "Le soutien varie selon le programme. Vous pouvez contacter notre bureau pour les questions générales, techniques ou administratives. Le soutien propre au cours (contenu, travaux) peut être assuré par les instructeurs ou la plateforme—les détails sont dans le matériel ou le message de bienvenue du cours.",
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
