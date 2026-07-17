import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bridge to Canadian Certification",
  description:
    "Bridge to Canadian certification with Richmond Hill College. Bridging programs for internationally educated professionals: healthcare, pharmacy, pet care, beauty. Enroll online. Ontario.",
  path: "bridge-canadian-certification",
  image: "/images/generated/library/canada-career-future.png",
  imageWidth: 1672,
  imageHeight: 941,
});

const programAreas = [
  { name: "Healthcare & Human Services", href: "/bridging-programs" },
  { name: "Animal Care & Pet Industries", href: "/bridging-programs" },
  { name: "Beauty, Aesthetics & Cosmetology", href: "/bridging-programs" },
  { name: "Pharmacy & Canadian Standards", href: "/courses" },
];

export default function BridgeCanadianCertificationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f6520a]">
            Canadian career pathways
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Bridge to Canadian Certification
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Richmond Hill College helps you bridge to Canadian certification so you can work in
            your field in Canada. Our bridging programs are designed for internationally educated
            professionals and career changers who want to meet Canadian workplace and licensing
            standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/bridging-programs" className="cta-primary rounded-lg px-5 py-3 text-sm font-semibold">
              Explore bridging programs
            </Link>
            <Link href="/contact" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
              Get pathway guidance
            </Link>
          </div>
        </div>
        <GeneratedVisual
          visualKey="canadaCareerFuture"
          priority
          className="rounded-2xl shadow-xl ring-1 ring-slate-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <section className="mt-12" aria-labelledby="what-bridge-heading">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[180px_1fr] md:items-center tablet:p-8">
          <GeneratedVisual visualKey="credentialBridge" className="w-40" sizes="160px" />
          <div>
            <h2 id="what-bridge-heading" className="text-2xl font-bold text-slate-900">What It Means to Bridge Canadian Certification</h2>
            <p className="mt-4 text-slate-600">
              To &ldquo;bridge&rdquo; to Canadian certification means to close the gap between
              your current qualifications—often earned abroad—and what Canadian employers and
              regulators require. Bridging programs provide targeted training, Canadian standards
              education, and often exam or licensing preparation.
            </p>
            <p className="mt-4 text-slate-600">Whether you are in healthcare, pharmacy, animal care, beauty, or another sector, a bridging pathway can connect your experience to Canadian requirements.</p>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="why-rhc-heading">
        <h2 id="why-rhc-heading" className="text-2xl font-bold text-slate-900">
          Why Choose Richmond Hill College to Bridge Your Certification
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Canadian standards–focused:</strong> Programs
            aligned with Canadian workplace and, where applicable, provincial or national
            standards.
          </li>
          <li>
            <strong className="text-slate-800">Online and hybrid options:</strong> Study
            flexibly from anywhere, with some programs offering in-person or hybrid
            components.
          </li>
          <li>
            <strong className="text-slate-800">Pathway to credentials:</strong> From
            International Healthcare PSW Bridging to Pharmacy Assistant (Canadian
            Standards), Pet Grooming Bridging, and Canadian Workplace-Ready Hair Styling.
          </li>
          <li>
            <strong className="text-slate-800">For internationally educated professionals:</strong>{" "}
            Content and support aimed at those adapting foreign qualifications to the
            Canadian context.
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="program-areas-heading">
        <h2 id="program-areas-heading" className="text-2xl font-bold text-slate-900">
          Program Areas for Bridging to Canadian Certification
        </h2>
        <p className="mt-4 text-slate-600">
          We offer bridging programs across multiple sectors so you can find a pathway that
          fits your background and goals.
        </p>
        <ul className="mt-4 space-y-2">
          {programAreas.map((area) => (
            <li key={area.name}>
              <Link
                href={area.href}
                className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-slate-600">
          For full details and all categories, see our{" "}
          <Link
            href="/bridging-programs"
            className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
          >
            Bridging Programs
          </Link>{" "}
          and{" "}
          <Link
            href="/courses"
            className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
          >
            Courses
          </Link>{" "}
          pages.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Ready to bridge to Canadian certification?</h2>
        <p className="mt-2 text-slate-600">
          Explore our programs, then register on RHC Global Bridge or contact us for
          guidance on the right pathway for you.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/bridging-programs"
            className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium"
          >
            View Bridging Programs
          </Link>
          <Link
            href="/courses"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Browse Courses
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Online registration:{" "}
          <a
            href="https://www.rhcglobalbridge.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 underline hover:text-slate-900"
          >
            RHCglobalBridge.com
          </a>
        </p>
      </section>

      <div className="mt-12">
        <ContactBlock />
      </div>
    </div>
  );
}
