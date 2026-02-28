import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Richmond Hill College of Healthcare and Technology Management was founded to provide quick, targeted programs for working professionals and career changers. Learn about our mission and commitment to student success.",
};

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">About Us</h1>
          <p className="mt-4 text-lg text-slate-600">
            Richmond Hill College of Healthcare and Technology Management Inc. was founded with
            the goal of providing quick, targeted programs for working professionals and
            career changers. Our focus on student engagement and outcomes sets us apart in the
            industry. With a passion for education and a drive to help our students succeed, we
            are committed to offering online, hybrid, and in-person courses to meet the diverse
            needs of our learners.
          </p>
          <p className="mt-4 text-slate-600">
            Our dedicated faculty, led by Dr. Soheila Hafezi, BCN, MSc, PhD, who serves as the
            CEO and President of Richmond Hill College, are committed to providing an inclusive
            learning environment that fosters growth and success for all students.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/hero/about-hero.jpg"
            alt="Richmond Hill College"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <section className="mt-16" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-2xl font-bold text-slate-900">
          Mission Statement
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Empowering Education:</strong> Richmond Hill
            College is dedicated to providing high-quality education and training in healthcare
            and technology management, equipping students with the skills needed for success in
            their careers.
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="offerings-heading">
        <h2 id="offerings-heading" className="text-2xl font-bold text-slate-900">
          Educational Offerings
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Flexible Learning Formats:</strong> Our courses
            are available in online, hybrid, and in-person formats, allowing students to choose
            the learning style that best fits their lifestyle and commitments.
          </li>
          <li>
            <strong className="text-slate-800">Diverse Programs:</strong> We offer a range of
            educational programs, including short skilled courses, certified career programs,
            and diploma co-programs, designed to meet the needs of various learners.
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="success-heading">
        <h2 id="success-heading" className="text-2xl font-bold text-slate-900">
          Commitment to Student Success
        </h2>
        <ul className="mt-6 space-y-4 text-slate-600">
          <li>
            <strong className="text-slate-800">Industry Connections:</strong> Richmond Hill
            College has established strong partnerships with healthcare and technology
            organizations, providing students with networking opportunities and pathways to
            employment.
          </li>
          <li>
            <strong className="text-slate-800">Personalized Support:</strong> We prioritize
            student success by providing personalized support and resources throughout their
            educational journey, ensuring they have the tools needed to thrive.
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="community-heading">
        <h2 id="community-heading" className="text-2xl font-bold text-slate-900">
          Community Focus
        </h2>
        <p className="mt-4 text-slate-600">
          <strong className="text-slate-800">Workforce Development:</strong> Our mission extends
          beyond education; we aim to contribute to workforce development in the healthcare
          and technology sectors, addressing the skills gap and preparing students for the job
          market.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Ready to take the next step in your education?
        </h2>
        <p className="mt-2 text-slate-600">
          Contact us today to learn more about our programs and how we can help you achieve your
          academic and career goals.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Contact Us
        </Link>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
