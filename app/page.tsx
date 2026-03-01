import Link from "next/link";
import Image from "next/image";
import { Laptop, LayoutGrid, GraduationCap, ChevronRight } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CourseSlideshow } from "@/components/CourseSlideshow";
import { FAQJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactBlock } from "@/components/ContactBlock";
import { FAQSection } from "@/components/FAQSection";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getRhcCourses, RHC_GLOBAL_BRIDGE_COURSES_FALLBACK } from "@/lib/rhc-global-bridge-courses";

const learningOptions = [
  {
    title: "Online Courses",
    description: "Flexible online courses with expert instructors",
    href: "/course-offerings",
    icon: Laptop,
  },
  {
    title: "Hybrid Courses",
    description: "Blend of online and in-person learning for a holistic experience",
    href: "/course-offerings",
    icon: LayoutGrid,
  },
  {
    title: "In-person Courses",
    description: "Immersive in-person courses with hands-on training",
    href: "/course-offerings",
    icon: GraduationCap,
  },
];

const bridgingCategories = [
  {
    title: "Healthcare & Human Services",
    description: "Pathways to healthcare careers in Canada for internationally educated professionals.",
    href: "/bridging-programs",
    image: "/images/hero/hero-2.jpg",
    imageAlt: "Healthcare and nursing bridging programs at Richmond Hill College",
  },
  {
    title: "Hospitality & Service",
    description: "Master hospitality and culinary skills aligned with Canadian standards.",
    href: "/bridging-programs",
    image: "/images/programs/programs-1.jpg",
    imageAlt: "Hospitality and culinary bridging programs at Richmond Hill College",
  },
  {
    title: "IT, AI & Computer Science",
    description: "Build your future in technology with Canadian-recognized credentials.",
    href: "/bridging-programs",
    image: "/images/programs/programs-2.jpeg",
    imageAlt: "Technology and innovation bridging programs at Richmond Hill College",
  },
];

const FEATURED_COURSES_COUNT = 6;
const SLIDESHOW_COURSES_COUNT = 8;

export default async function Home() {
  const allCourses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const featuredCourses = allCourses.slice(0, FEATURED_COURSES_COUNT);
  const slideshowCourses = allCourses.slice(0, SLIDESHOW_COURSES_COUNT);

  return (
    <>
      <FAQJsonLd />
      <HeroCarousel />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 tablet:px-8 tablet:py-24 lg:px-8">
        <ScrollReveal as="section" className="mb-16 tablet:mb-24">
          <div className="grid gap-10 tablet:gap-14 lg:grid-cols-[0.8fr_1.7fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Richmond Hill College
              </span>
              <SectionHeading title="Welcome to Richmond Hill College">
                <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                  At Richmond Hill College of Healthcare and Technology Management we offer a
                  range of courses to help you excel in healthcare and technology management.
                  Our programs are designed to cater to working professionals and career
                  changers, providing quick and targeted learning experiences to enhance
                  student engagement and outcomes.
                </p>
              </SectionHeading>
              <Link
                href="/about-us"
                className="cta-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640]"
              >
                About us
              </Link>
            </div>
            <CourseSlideshow courses={slideshowCourses} />
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className="mb-16 tablet:mb-24"
          aria-labelledby="bridging-programs-heading"
          staggerChildren
          staggerMs={90}
        >
          <div className="mb-10 text-center tablet:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Our free career tools
            </span>
            <h2
              id="bridging-programs-heading"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl"
            >
              Bridging Programs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-xl">
              Professional bridging programs aligned with Canadian standards, designed for
              internationally educated professionals.
            </p>
          </div>
          <div className="grid gap-6 tablet:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bridgingCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-lg font-semibold group-hover:underline sm:text-xl">
                    {cat.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-200">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-white">
                    Explore programs
                    <span className="ml-1 transition group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/bridging-programs"
              className="cta-primary-outline inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2"
            >
              View all bridging programs
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className="mb-16 tablet:mb-24"
          aria-labelledby="courses-heading"
          staggerChildren
          staggerMs={70}
        >
          <div className="mb-10 text-center tablet:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Professional development
            </span>
            <h2
              id="courses-heading"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl"
            >
              Our courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-xl">
              Browse a selection of our bridging programs and courses. View details and
              register on RHC Global Bridge.
            </p>
          </div>
          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <li
                key={course.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                <Link
                  href={course.slug ? `/courses/${course.slug}` : course.link}
                  className="flex flex-col"
                  aria-label={`View ${course.name} course details`}
                  {...(course.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={course.image || "/images/hero/hero-2.jpg"}
                      alt={`${course.name} – course at Richmond Hill College`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700">
                      {course.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      {course.category && <span>{course.category}</span>}
                      {course.duration && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200/60">
                          {course.duration}
                        </span>
                      )}
                      {course.price && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-800 ring-1 ring-slate-200/60">
                          {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                        </span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 group-hover:text-slate-600">
                      View details
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="cta-primary-outline inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2"
            >
              View all courses
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24" aria-labelledby="learning-options-heading">
          <h2
            id="learning-options-heading"
            className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-8 tablet:text-3xl"
          >
            Flexible Learning Options
          </h2>
          <div className="grid gap-6 tablet:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {learningOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <article
                  key={opt.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <Icon
                    className="h-10 w-10 text-slate-700"
                    aria-hidden
                  />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{opt.title}</h3>
                  <p className="mt-2 text-slate-600">{opt.description}</p>
                  <Link
                    href={opt.href}
                    className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 hover:underline"
                  >
                    More info
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm tablet:p-10">
          <div className="flex flex-col gap-6 tablet:gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                Online RHC Bridging Program
              </h2>
              <p className="mt-2 text-slate-600">
                Log in, register, or browse courses and programs on RHC Global Bridge.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/my-account"
                  className="cta-primary inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition"
                >
                  My Account (log in / register)
                </Link>
                <a
                  href="https://www.rhcglobalbridge.com/courses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-slate-800 hover:underline"
                >
                  All courses on RHCglobalBridge.com →
                </a>
              </div>
            </div>
            <div className="shrink-0">
              <Image
                src="/images/logo/rhc-global-bridge-logo.png"
                alt="RHC Global Bridge – log in to courses and bridging programs at Richmond Hill College"
                width={140}
                height={70}
                className="h-14 w-auto"
              />
            </div>
          </div>
        </ScrollReveal>

        <hr className="my-12 tablet:my-20 border-slate-200" />

        <ScrollReveal as="section" className="mb-12 tablet:mb-20">
          <FAQSection />
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-6 tablet:text-3xl">
            Contact us
          </h2>
          <p className="mb-5 max-w-2xl text-slate-600 tablet:mb-6">
            Have a question or need assistance? Feel free to reach out to us using the contact
            form below. We will get back to you soon.
          </p>
          <div className="grid gap-8 tablet:gap-10 lg:grid-cols-2">
            <ContactForm />
            <ContactBlock />
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-12 tablet:mb-16" aria-labelledby="about-heading">
          <h2 id="about-heading" className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl">
            About us
          </h2>
          <p className="max-w-3xl text-slate-600">
            Richmond Hill College of Healthcare and Technology Management is dedicated to
            empowering individuals through quality education in healthcare and technology
            management. With a focus on practical learning and industry-relevant skills, we are
            committed to helping our students achieve their academic and professional goals.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block font-medium text-slate-800 hover:underline"
          >
            Learn more →
          </Link>
        </ScrollReveal>

        <ScrollReveal as="blockquote" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 italic text-slate-600 shadow-sm tablet:p-8">
          <p>
            &ldquo;I am truly grateful for the knowledge and skills I gained from Richmond Hill
            College. The courses are practical and relevant to my career, and the instructors
            are top-notch.&rdquo;
          </p>
          <footer className="mt-4 not-italic text-slate-500">— John Doe</footer>
        </ScrollReveal>
      </div>
    </>
  );
}
