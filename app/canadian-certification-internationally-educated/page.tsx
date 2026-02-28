import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Canadian Certification for Internationally Educated Professionals",
  description:
    "Get Canadian certification as an internationally educated professional. Richmond Hill College bridging programs: healthcare PSW, pharmacy assistant, pet grooming, beauty. Enroll or contact us. Ontario.",
  path: "canadian-certification-internationally-educated",
});

const pathways = [
  {
    name: "International Healthcare Personal Support Bridging",
    description: "For nurses, nurse aides, and related healthcare professionals. Pathway to Canada's PSW program or U.S. CNA/HHA exam. Fully online.",
    href: "/courses",
  },
  {
    name: "Pharmacy Assistant (Canadian Standards)",
    description: "Align your pharmacy training with Canadian standards and workplace expectations.",
    href: "/courses",
  },
  {
    name: "Pet Grooming Bridging Program",
    description: "Bridge to Canadian pet care and grooming industry standards.",
    href: "/courses",
  },
  {
    name: "Canadian Workplace-Ready Hair Styling",
    description: "Hybrid program for hair styling and haircut skills meeting Canadian workplace readiness.",
    href: "/courses",
  },
];

export default function CanadianCertificationInternationallyEducatedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Canadian Certification for Internationally Educated Professionals
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        If you were trained or certified abroad and want to work in your field in Canada,
        Canadian certification—or a recognized pathway to it—is often the next step. Richmond
        Hill College offers bridging programs designed for internationally educated
        professionals (IEPs) so you can adapt your qualifications to Canadian standards and
        move toward certification, licensing, or employment here.
      </p>

      {/* Certification preview – how your RHC certification will look */}
      <section className="mt-12" aria-labelledby="cert-preview-heading">
        <h2 id="cert-preview-heading" className="text-2xl font-bold text-slate-900">
          How your certification will look
        </h2>
        <p className="mt-2 text-slate-600">
          Upon completion, you receive an official Richmond Hill College certificate bearing our logo and branding, like this:
        </p>
        <div
          className="relative mx-auto mt-6 max-w-xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-slate-200/80"
          style={{
            borderTop: "4px solid var(--rhc-primary-dark)",
            borderBottom: "4px solid var(--rhc-primary-dark)",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06), 0 0 0 1px rgba(24, 38, 64, 0.06)",
          }}
        >
          {/* Gold accent strip */}
          <div
            className="h-1 w-full"
            style={{ backgroundColor: "var(--rhc-accent)" }}
            aria-hidden
          />
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-16 w-auto sm:h-20">
                <Image
                  src="/images/logo/rhc-logo.png"
                  alt=""
                  width={160}
                  height={80}
                  className="object-contain object-center"
                />
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Richmond Hill College
              </p>
              <p
                className="mt-1 text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--rhc-primary)" }}
              >
                of Healthcare & Technology Management
              </p>
              <div
                className="my-6 h-px w-24"
                style={{ backgroundColor: "var(--rhc-primary-dark)" }}
                aria-hidden
              />
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Certificate of Canadian Certification
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Bridging Program — Internationally Educated Professionals
              </p>
              <div
                className="my-6 h-px w-16"
                style={{ backgroundColor: "var(--rhc-accent)" }}
                aria-hidden
              />
              <p className="text-slate-700">
                This is to certify that
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                [Recipient Name]
              </p>
              <p className="mt-3 text-sm text-slate-600">
                has successfully completed the requirements for Canadian certification
                through Richmond Hill College and is recognized as having met the
                standards of our bridging program.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Issued in Ontario, Canada
              </p>
            </div>
            {/* Decorative seal accent */}
            <div
              className="absolute bottom-4 right-4 h-14 w-14 rounded-full border-2 opacity-20 sm:bottom-6 sm:right-6"
              style={{
                borderColor: "var(--rhc-accent)",
                backgroundColor: "var(--rhc-accent)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="who-heading">
        <h2 id="who-heading" className="text-2xl font-bold text-slate-900">
          Who This Is For
        </h2>
        <p className="mt-4 text-slate-600">
          Our Canadian certification and bridging programs are for anyone who has education
          or work experience from outside Canada and wants to:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Work in their profession in Canada</li>
          <li>Meet Canadian workplace or regulatory standards</li>
          <li>Prepare for Canadian certification or licensing exams</li>
          <li>Gain Canadian-relevant skills and cultural workplace readiness</li>
        </ul>
        <p className="mt-4 text-slate-600">
          Whether you are already in Canada or planning to move here, bridging programs can
          shorten the path from your existing credentials to Canadian certification and
          employment.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="pathways-heading">
        <h2 id="pathways-heading" className="text-2xl font-bold text-slate-900">
          Pathways to Canadian Certification at Richmond Hill College
        </h2>
        <p className="mt-4 text-slate-600">
          We offer multiple pathways so you can choose the one that matches your background
          and career goals.
        </p>
        <ul className="mt-6 space-y-6">
          {pathways.map((pathway) => (
            <li
              key={pathway.name}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-bold text-slate-800">{pathway.name}</h3>
              <p className="mt-2 text-slate-600">{pathway.description}</p>
              <Link
                href={pathway.href}
                className="mt-3 inline-block text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
              >
                View courses →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-2xl font-bold text-slate-900">
          Benefits of Bridging to Canadian Certification
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Targeted, not starting from zero:</strong>{" "}
            Build on your existing education and experience instead of repeating a full
            degree or diploma.
          </li>
          <li>
            <strong className="text-slate-800">Canadian standards:</strong> Learn the
            practices, ethics, and workplace expectations that Canadian employers and
            regulators look for.
          </li>
          <li>
            <strong className="text-slate-800">Flexible delivery:</strong> Many programs are
            fully online or hybrid, so you can study from anywhere.
          </li>
          <li>
            <strong className="text-slate-800">Clear next steps:</strong> Pathways to
            further credentials, exams, or employment in Canada.
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Take the next step</h2>
        <p className="mt-2 text-slate-600">
          Explore our bridging programs and courses, or contact us to discuss which
          Canadian certification pathway is right for you.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/bridge-canadian-certification"
            className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium"
          >
            Bridge to Canadian Certification
          </Link>
          <Link
            href="/bridging-programs"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            All Bridging Programs
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Register for courses online:{" "}
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
