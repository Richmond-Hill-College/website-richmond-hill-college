import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Message from the President",
  description:
    "A welcome message from Dr. Soheila Hafezi, President of Richmond Hill College. Learn about our mission to empower internationally educated learners through Global Bridge Programs in Ontario, Canada.",
  path: "message-from-the-president",
  image: "/images/leadership/soheila-hafezi-president.png",
  imageWidth: 240,
  imageHeight: 247,
});

export default function MessageFromThePresidentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <header className="border-b border-slate-200 pb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Dr. Soheila Hafezi — President of Richmond Hill College
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
          Message from the President
        </h1>
      </header>

      <section className="mt-8 space-y-6" aria-labelledby="president-intro">
        <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
          <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#9A85AD] to-[#f6c087] p-2 shadow-sm">
            <Image
              src="/images/leadership/soheila-hafezi-president.png"
              alt="Portrait of Dr. Soheila Hafezi, President of Richmond Hill College"
              width={240}
              height={247}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
          <div id="president-intro">
            <p className="font-semibold text-slate-900">Dr. Soheila Hafezi</p>
            <p className="text-slate-600">President, Richmond Hill College</p>
            <p className="text-slate-600">Ontario, Canada</p>
          </div>
        </div>

        <hr className="border-slate-200" />

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700">
            Welcome to Richmond Hill College.
          </p>
          <p className="text-slate-600">
            At <strong className="text-slate-800">RHC</strong>, our mission is to empower
            internationally educated learners as they transition into the Canadian workforce
            through high-quality, accessible, and practical{" "}
            <strong className="text-slate-800">Global Bridge Programs</strong>. These programs
            are carefully designed to help newcomers and international professionals gain the
            knowledge, skills, and confidence they need to build successful careers in Canada.
          </p>
          <p className="text-slate-600">
            We take pride in providing an inclusive learning environment where every student
            feels supported—academically, professionally, and personally. Our dedicated faculty,
            student-centered approach, and commitment to excellence ensure that each learner
            receives the guidance they need to achieve their goals.
          </p>
          <p className="text-slate-600">
            Thank you for choosing Richmond Hill College as your trusted partner on this
            important journey. We look forward to supporting your growth and celebrating your
            future achievements.
          </p>
          <p className="mt-8 text-slate-700">
            Warm regards,
            <br />
            <strong className="text-slate-900">Dr. Soheila Hafezi</strong>
            <br />
            President, Richmond Hill College
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 tablet:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Ready to start your journey with us?
        </h2>
        <p className="mt-2 text-slate-600">
          Explore our programs or get in touch to learn how we can support your career goals
          in Canada.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/bridging-programs"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View Programs
          </Link>
          <Link
            href="/contact"
            className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
