import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
  type RhcCourse,
} from "@/lib/rhc-global-bridge-courses";

const RHC_BASE = "https://www.rhcglobalbridge.com";
const RHC_ACCOUNT = `${RHC_BASE}/my-account/`;
const RHC_COURSES = `${RHC_BASE}/courses/`;

/** Logo from rhcglobalbridge.com; program cards use high-quality Unsplash stock images. */
const RHC_IMAGES = {
  logo:
    "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/cropped-rhc_logo-removebg-preview-high-Copy-1-1.png",
  /** Healthcare & Human Services — professional nursing/patient care */
  sliderHealthcare:
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
  /** Animal Care & Pet Industries — veterinarian with patient */
  sliderAnimal:
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  /** Hospitality & Service — chef in professional kitchen */
  sliderHospitality:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
  /** Global Business Success — team collaboration */
  sliderBusiness:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  post1: "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/post-img1.jpg",
  post2: "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/post-img2.jpg",
  post3: "https://www.rhcglobalbridge.com/wp-content/uploads/2025/09/post-img3.jpg",
} as const;

/** Programs/categories matching rhcglobalbridge.com, with links to the exact pages. */
const programs = [
  {
    title: "Healthcare & Human Services",
    description:
      "Pathways to healthcare careers in Canada. Bridging programs for internationally educated professionals.",
    href: `${RHC_BASE}/find-your-ideal-career-4/`,
    image: RHC_IMAGES.sliderHealthcare,
    imageAlt: "Healthcare careers bridging programs at Richmond Hill College",
  },
  {
    title: "Animal Care & Pet Industries",
    description:
      "Build a rewarding career in animal care. Upgrade your international pet-care experience with Canadian-recognized skills.",
    href: `${RHC_BASE}/find-your-ideal-career-2/`,
    image: RHC_IMAGES.sliderAnimal,
    imageAlt: "Animal care and pet industries programs at Richmond Hill College",
  },
  {
    title: "Hospitality & Service Industries",
    description:
      "Build your future in culinary and hospitality. Programs aligned with Canadian standards.",
    href: `${RHC_BASE}/find-your-ideal-career-3/`,
    image: RHC_IMAGES.sliderHospitality,
    imageAlt: "Hospitality and culinary programs at Richmond Hill College",
  },
  {
    title: "Your Bridge to Global Business Success",
    description:
      "Gain the skills and Canadian credentials needed to thrive in management, entrepreneurship, and leadership roles.",
    href: `${RHC_BASE}/find-your-ideal-career/`,
    image: RHC_IMAGES.sliderBusiness,
    imageAlt: "Global business success bridging programs at Richmond Hill College",
  },
  {
    title: "Skilled Trades & Technical Fields",
    description:
      "Professional bridging programs in skilled trades and technical fields, aligned with Canadian standards.",
    href: RHC_COURSES,
    image: RHC_IMAGES.post1,
    imageAlt: "Skilled trades and technical programs at Richmond Hill College",
  },
  {
    title: "IT, AI & Computer Science · Beauty & Aesthetics",
    description:
      "Programs in information technology, AI, computer science, beauty, aesthetics, and cosmetology.",
    href: RHC_COURSES,
    image: RHC_IMAGES.post2,
    imageAlt: "IT, AI, and beauty programs at Richmond Hill College",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "My Account",
  description:
    "Log in or register at Richmond Hill College Global Bridge. Access courses, bridging programs, and your account at RHCglobalBridge.com.",
  path: "my-account",
});

export default async function MyAccountPage() {
  const courseList: RhcCourse[] = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero: same branding as rhcglobalbridge.com */}
      <section className="mb-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="relative h-20 w-40 flex-shrink-0">
          <Image
            src={RHC_IMAGES.logo}
            alt="Richmond Hill College Global Bridge logo – log in or register for courses"
            fill
            className="object-contain object-left"
            sizes="160px"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Richmond Hill College Global Bridge
          </h1>
          <p className="mt-2 text-slate-600">
            Professional bridging programs aligned with Canadian standards, for
            internationally educated professionals.
          </p>
        </div>
      </section>

      {/* My Account: Login & Register — links to exact rhcglobalbridge.com/my-account/ */}
      <section
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="my-account-heading"
      >
        <h2 id="my-account-heading" className="text-2xl font-bold text-slate-900">
          My account
        </h2>
        <p className="mt-2 text-slate-600">
          Log in or register on RHC Global Bridge to access your courses and
          programs.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={RHC_ACCOUNT}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary inline-flex rounded-md px-5 py-2.5 text-sm font-medium"
          >
            Log in
          </a>
          <a
            href={RHC_ACCOUNT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Register
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          You will be taken to{" "}
          <span className="font-medium text-slate-700">rhcglobalbridge.com</span>{" "}
          to sign in or create an account. Lost your password?{" "}
          <a
            href={`${RHC_ACCOUNT}lost-password/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800 underline hover:no-underline"
          >
            Reset it here
          </a>
          .
        </p>
      </section>

      {/* Courses & Programs — same categories and images as the main site */}
      <section className="mt-14" aria-labelledby="programs-heading">
        <h2 id="programs-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Courses and programs
        </h2>
        <p className="mt-2 text-slate-600">
          Explore bridging programs and courses on RHC Global Bridge. Each link
          opens the same program page on rhcglobalbridge.com.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.title}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <a
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{program.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {program.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-slate-800 hover:underline">
                    View on RHC Global Bridge →
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Course list: same as lp-list-courses on rhcglobalbridge.com — images + links to specific course pages */}
      <section className="mt-14" aria-labelledby="course-list-heading">
        <h2 id="course-list-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          All courses
        </h2>
        <p className="mt-2 text-slate-600">
          Each course links to its page on rhcglobalbridge.com. Use the same
          images and open the specific course to register.
        </p>
        <ul className="mt-8 list-none space-y-6 p-0">
          {courseList.map((course) => (
            <li
              key={course.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                href={`/courses/${course.slug}`}
                className="flex flex-col sm:flex-row sm:items-stretch transition-shadow hover:shadow-md rounded-xl"
                aria-label={`View ${course.name} course details`}
              >
                <div className="relative h-48 w-full flex-shrink-0 bg-slate-100 sm:h-40 sm:w-56">
                  <Image
                    src={course.image}
                    alt={`${course.name} – course at Richmond Hill College`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                  <h3 className="font-semibold text-slate-900">{course.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    {course.category && (
                      <span>{course.category}</span>
                    )}
                    {course.duration && (
                      <span>{course.duration}</span>
                    )}
                    {course.price && (
                      <span className="font-medium text-slate-800">
                        {course.price}
                      </span>
                    )}
                  </div>
                  <span className="mt-3 inline-block text-sm font-medium text-slate-800 hover:underline">
                    View course details →
                  </span>
                </div>
              </Link>
              <div className="border-t border-slate-100 px-4 py-2 sm:px-5 sm:py-3">
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Register on RHC Global Bridge (opens in new tab)
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          Full catalog and filters:{" "}
          <a
            href={RHC_COURSES}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 underline hover:no-underline"
          >
            rhcglobalbridge.com/courses
          </a>
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
