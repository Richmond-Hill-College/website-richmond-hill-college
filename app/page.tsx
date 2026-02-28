import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FAQJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactBlock } from "@/components/ContactBlock";
import { FAQSection } from "@/components/FAQSection";
import { ContactForm } from "@/components/ContactForm";

const learningOptions = [
  {
    title: "Online Courses",
    description: "Flexible online courses with expert instructors",
    href: "/course-offerings",
  },
  {
    title: "Hybrid Courses",
    description: "Blend of online and in-person learning for a holistic experience",
    href: "/course-offerings",
  },
  {
    title: "In-person Courses",
    description: "Immersive in-person courses with hands-on training",
    href: "/course-offerings",
  },
];

export default function Home() {
  return (
    <>
      <FAQJsonLd />
      <HeroCarousel />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-16">
          <SectionHeading title="Welcome to Richmond Hill College">
            <p className="max-w-3xl text-lg text-slate-600">
              At Richmond Hill College of Healthcare and Technology Management we offer a range
              of courses to help you excel in healthcare and technology management. Our
              programs are designed to cater to working professionals and career changers,
              providing quick and targeted learning experiences to enhance student engagement
              and outcomes.
            </p>
          </SectionHeading>
        </section>

        <section className="mb-16" aria-labelledby="learning-options-heading">
          <h2 id="learning-options-heading" className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
            Flexible Learning Options
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {learningOptions.map((opt) => (
              <article
                key={opt.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{opt.title}</h3>
                <p className="mt-2 text-slate-600">{opt.description}</p>
                <Link
                  href={opt.href}
                  className="mt-4 inline-block text-sm font-medium text-slate-800 hover:underline"
                >
                  More info
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            Online RHC Bridging Program
          </h2>
          <p className="text-slate-600">
            Just link to RHCglobalBridge.com for the Online Bridging Programs registration.
          </p>
          <a
            href="https://www.rhcglobalbridge.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-medium text-slate-800 hover:underline"
          >
            More Information …
          </a>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/logo/rhc-global-bridge-logo.png"
              alt="RHC Global Bridge"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
        </section>

        <hr className="my-16 border-slate-200" />

        <section className="mb-16">
          <FAQSection />
        </section>

        <section className="mb-16" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
            Contact us
          </h2>
          <p className="mb-6 text-slate-600">
            Have a question or need assistance? Feel free to reach out to us using the contact
            form below. We will get back to you soon.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <ContactForm />
            <ContactBlock />
          </div>
        </section>

        <section className="mb-8" aria-labelledby="about-heading">
          <h2 id="about-heading" className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
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
            Learn More
          </Link>
        </section>

        <blockquote className="rounded-xl border border-slate-200 bg-white p-6 italic text-slate-600">
          &ldquo;I am truly grateful for the knowledge and skills I gained from Richmond Hill
          College. The courses are practical and relevant to my career, and the instructors are
          top-notch.&rdquo; — John Doe
        </blockquote>
      </div>
    </>
  );
}
