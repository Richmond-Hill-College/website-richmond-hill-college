import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Course Offerings",
  description:
    "Explore programs and courses at Richmond Hill College: PSW, International Healthcare Bridging, Dog Grooming, Epoxy Coating, BLS, Healthcare Management, Technology Management, and more.",
};

const courses = [
  {
    id: "psw",
    title: "PSW Certificate Program",
    content: [
      "Our Personal Support Worker (PSW) Certificate Program provides comprehensive training in personal support services, preparing students for rewarding careers in healthcare. Join us to make a difference in the lives of others.",
      "Our PSW Certificate Program is known for its hands-on training and high job placement rate. Join us to kickstart your healthcare career today.",
    ],
    bullets: [
      "Expert-led instruction in healthcare administration",
      "Preparation for rewarding careers in healthcare",
      "Comprehensive training in personal support services",
    ],
  },
  {
    id: "international-healthcare-bridging",
    title: "International Healthcare Personal Support Bridging Program",
    content: [
      "The International Healthcare Personal Support Bridging Program is a fully online pathway for internationally educated nurses, nurse aides, and professionals in related healthcare fields. It helps students adapt their qualifications to Canadian standards and prepare for healthcare careers in North America.",
      "Graduates receive a Certificate of Completion jointly issued by Richmond Hill College and our partner institute, with opportunities to continue into Canada's PSW Program or pursue the CNA/HHA exam in the United States.",
    ],
    highlights: [
      "100% online, flexible, and globally accessible",
      "Pathway to Canada's PSW Program or U.S. CNA/HHA exam",
      "Joint Certificate of Completion from College and Institute",
    ],
    cta: { label: "Program Registration", href: "/contact" },
  },
  {
    id: "dog-grooming",
    title: "Dog Grooming Certification",
    content: [
      "Ready to kickstart a fulfilling career or enhance your skills in pet care? Our Dog Grooming Course is perfect for passionate pet lovers and aspiring professionals!",
      "Trusted by professionals, our Dog Grooming Course provides practical training and insights to boost your career confidently.",
    ],
    bullets: [
      "Safety First: Ensure a safe, stress-free grooming experience for you and the dogs.",
      "Breed-Specific Techniques: Handle various breeds and temperaments confidently.",
      "Comprehensive Training: Master essential dog grooming skills.",
    ],
  },
  {
    id: "epoxy-coating",
    title: "Professional Epoxy Coating Certification",
    content: [
      "Looking to start a new career or enhance your trade skills? Enroll in our Professional Epoxy Coating Certification Program, a comprehensive one-week course designed to teach you the techniques and expertise needed for success in the epoxy flooring industry. Gain hands-on experience and industry-recognized certification to jumpstart your career in this high-demand field.",
      "By joining our 1-month hybrid Epoxy Coating Certification Program, combining online learning with hands-on training. Perfect for beginners and professionals, this course covers moisture testing, floor prep, primers, epoxy applications, and business essentials.",
      "Gain real-world experience using professional tools and equipment while learning to install epoxy floors with solid colors, flakes, glitter, and urethane coatings.",
    ],
  },
  {
    id: "bls",
    title: "Basic Life Support Certification",
    content: [
      "Refresh your life-saving skills and gain confidence in emergency situations with our Basic Life Support (BLS) short course.",
      "This course is designed for healthcare professionals and anyone interested in learning critical techniques such as CPR, AED usage, and effective team-based responses.",
      "Delivered in a hands-on, practical format, our BLS training focuses on essential skills that can make all the difference in cardiac and respiratory emergencies. Whether you're looking to update certifications or develop new skills, this course is comprehensive, concise, and tailored to meet Canadian standards. Enrol today and take an important step towards being prepared to save lives.",
    ],
  },
  {
    id: "sales-techniques",
    title: "Professional Sales Techniques",
    content: [
      "This course is the perfect choice for aspiring insurance agents, sales professionals, and business experts. This 40-hour program offers an in-depth understanding of personal insurance products, including life, health, disability, and long-term care insurance—all critical for building your career in this growing field.",
      "The course focuses on equipping participants with powerful sales skills tailored to insurance. You'll master prospecting, client needs analysis, trust-building, and objection-handling to close deals effectively. With role-playing exercises, and real-world case studies, you'll gain the practical tools needed to succeed in the competitive insurance sales environment.",
    ],
    bullets: ["Drive your professional growth.", "Build your strong client relationships"],
  },
  {
    id: "healthcare-management",
    title: "Healthcare Management courses",
    content: [
      "Our Healthcare Management courses cover key topics in healthcare administration, strategic planning, and quality improvement. Gain the skills needed to excel in leadership roles within the healthcare industry.",
      "Our Healthcare Management courses are trusted by industry professionals for their practical approach and real-world insights. Elevate your career with us.",
    ],
    bullets: [
      "Expert-led courses by industry professionals",
      "Specialization in quality improvement and leadership skills",
      "Key topics in healthcare administration and strategic planning",
    ],
  },
  {
    id: "technology-management",
    title: "Technology Management courses",
    content: [
      "Our Technology Management courses focus on the latest trends in IT project management, cybersecurity, and data analytics. Stay ahead in the rapidly evolving field of technology management with our expert-led courses.",
      "Technology professionals trust our Technology Management courses for their relevance and industry-specific focus. Stay competitive in the tech industry with our cutting-edge programs.",
    ],
    bullets: [
      "Expert-led courses tailored for working professionals",
      "Focus on data analytics and technology advancements",
      "Latest trends in IT project management and cybersecurity",
    ],
  },
  {
    id: "high-school-diploma",
    title: "Canadian Online High School Diploma",
    content: [
      "Earn a globally recognized secondary school qualification through our partnership with a registered Canadian online high school. This program is ideal for students aiming to pursue higher education or career opportunities in Canada and internationally.",
      "Our diploma program provides a comprehensive curriculum aligned with Canadian academic standards. Students will engage in core subjects like English, Mathematics, and Science, while also exploring electives that support personal interests and career goals.",
    ],
    bullets: [
      "Build a strong academic foundation and global credentials",
      "Study with the support of experienced, certified teachers",
      "Meet university entrance requirements in Canada",
    ],
  },
];

export default function CourseOfferingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Programs &amp; Courses at Richmond Hill College
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Explore our diverse range of course offerings at Richmond Hill College, specializing
        in healthcare and technology management. Choose from online, hybrid, or in-person
        programs tailored for working professionals and career changers.
      </p>

      <div className="mt-12 space-y-16">
        {courses.map((course) => (
          <article
            key={course.id}
            id={course.id}
            className="scroll-mt-24 border-b border-slate-200 pb-16 last:border-0"
          >
            <h2 className="text-2xl font-bold text-slate-900">{course.title}</h2>
            <div className="mt-4 space-y-2 text-slate-600">
              {course.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {"highlights" in course && course.highlights && (
              <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
                {course.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
            {"bullets" in course && course.bullets && (
              <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
                {course.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            <Link
              href="/contact"
              className="mt-4 inline-block font-medium text-slate-800 hover:underline"
            >
              Contact us
            </Link>
          </article>
        ))}
      </div>

      <blockquote className="mt-12 rounded-xl border border-slate-200 bg-white p-6 italic text-slate-600">
        &ldquo;I enrolled in the Healthcare Management course at Richmond Hill College and it
        exceeded my expectations. The instructors were knowledgeable and the curriculum was
        very relevant to my career goals.&rdquo; — John Doe
      </blockquote>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
