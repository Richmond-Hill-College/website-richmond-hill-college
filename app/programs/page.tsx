import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Programs at Richmond Hill College: online, hybrid, and in-person courses in healthcare and technology. Short skilled programs and International Bridge Programs.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Programs at Richmond Hill College
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Welcome to the Programs page of Richmond Hill College, where we offer a variety of
            educational courses designed to equip students with the skills needed for success
            in the healthcare and technology sectors. Our programs include online courses,
            hybrid programs, and in-person workshops to cater to the diverse needs of our
            students.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/programs/programs-1.jpg"
            alt="Programs at Richmond Hill College"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <section className="mt-16" aria-labelledby="formats-heading">
        <h2 id="formats-heading" className="text-2xl font-bold text-slate-900">
          Flexible Learning Formats
        </h2>
        <p className="mt-4 text-slate-600">
          At Richmond Hill College, we understand the importance of flexibility in learning.
          That&apos;s why we offer a range of learning formats including online, hybrid, and
          in-person options. Whether you prefer the convenience of online learning, the
          interactive nature of hybrid programs, or the hands-on experience of in-person
          workshops, we have a program that suits your needs.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="specialized-heading">
        <h2 id="specialized-heading" className="text-2xl font-bold text-slate-900">
          Specialized Programs
        </h2>
        <p className="mt-4 text-slate-600">
          Our programs are specialized in healthcare and technology management, two rapidly
          growing sectors in today&apos;s job market. Whether you are a working professional
          looking to enhance your skills or a career changer seeking a new opportunity, our
          quick and targeted programs are designed to enhance student engagement and
          outcomes.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="short-skilled-heading">
        <h2 id="short-skilled-heading" className="text-2xl font-bold text-slate-900">
          Short Skilled Programs
        </h2>
        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-200 md:w-80">
            <Image
              src="/images/programs/short-skilled-program.png"
              alt="Short skilled program"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
          <p className="text-slate-600">
            Richmond Hill College offers short skilled programs that are designed to provide
            you with the specific skills needed to succeed in your chosen field. Our programs
            are tailored to meet the demands of the healthcare and technology industries,
            ensuring that you are well-equipped to excel in your career.
          </p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="bridge-heading">
        <h2 id="bridge-heading" className="text-2xl font-bold text-slate-900">
          International Bridge Programs
        </h2>
        <p className="mt-4 text-slate-600">
          Our International Bridge Programs are designed for professionals who have earned
          certification in their home countries and are now seeking to continue their careers
          in Canada. These programs act as a pathway, helping internationally trained
          individuals adapt their existing qualifications to meet Canadian standards. Offered
          in online or hybrid formats, the programs combine targeted training, cultural
          orientation, and professional readiness to support a smooth transition into the
          Canadian workforce.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Ready to take the next step?</h2>
        <p className="mt-2 text-slate-600">
          Contact us today to learn more about our educational programs and how they can help
          you achieve your career goals.
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
