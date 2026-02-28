import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bridging Programs",
  description:
    "Richmond Hill College bridging programs: Healthcare & Human Services, Animal Care, Hospitality, Skilled Trades, IT & AI, Beauty. For internationally educated professionals and career changers.",
};

const categories = [
  "Healthcare & Human Services",
  "Animal Care & Pet Industries",
  "Hospitality & Service Industries",
  "Skilled Trades & Technical Fields",
  "IT, AI & Computer Science",
  "Beauty, Aesthetics & Cosmetology",
];

export default function BridgingProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Bridging Programs
      </h1>

      <section className="mt-8" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-xl font-bold text-slate-900">
          Richmond Hill College Bridging Programs Categories
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-600">
          {categories.map((cat) => (
            <li key={cat} className="font-medium text-slate-800">
              {cat}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12" aria-labelledby="what-are-heading">
        <h2 id="what-are-heading" className="text-2xl font-bold text-slate-900">
          What Are Bridging Programs?
        </h2>
        <p className="mt-4 text-slate-600">
          A bridging program is a type of educational or training program designed to
          &ldquo;bridge the gap&rdquo; between a person&apos;s current qualifications, skills,
          or experience and the requirements they need to enter a new field, career, or level of
          study.
        </p>
        <p className="mt-4 text-slate-600">They&apos;re often used in contexts like:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Internationally educated professionals:</strong>{" "}
            For example, nurses, doctors, or engineers trained abroad may need a bridging
            program when moving to another country. It helps them meet local licensing,
            language, and professional practice standards.
          </li>
          <li>
            <strong className="text-slate-800">Academic transitions:</strong> Students moving
            from one level of education to another (e.g., from college to university, or from
            vocational training to a degree program) may take bridging courses to fill
            knowledge gaps.
          </li>
          <li>
            <strong className="text-slate-800">Career shifts:</strong> People changing careers
            sometimes join bridging programs to gain industry-specific skills, certifications,
            or workplace readiness.
          </li>
          <li>
            <strong className="text-slate-800">Language and cultural preparation:</strong> Some
            bridging programs focus on communication, professional English, or cultural
            competency in a new country.
          </li>
        </ul>
        <p className="mt-4 text-slate-600">
          In short, a bridging program helps individuals transition smoothly by filling in
          missing skills, knowledge, or accreditation so they can succeed in their new
          environment.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="canada-heading">
        <h2 id="canada-heading" className="text-2xl font-bold text-slate-900">
          Bridging Programs in Canada
        </h2>
        <p className="mt-4 text-slate-600">
          In Canada, bridging programs are very common, especially for internationally
          educated professionals (IEPs) who want to work in their field after immigrating.
        </p>

        <h3 className="mt-6 text-lg font-bold text-slate-800">
          What Bridging Programs in Canada Do
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Help with licensing/registration:</strong> For
            regulated professions (e.g., nurses, doctors, pharmacists, engineers, accountants,
            teachers), bridging programs fill gaps between your foreign training and Canadian
            requirements.
          </li>
          <li>
            <strong className="text-slate-800">Provide Canadian workplace skills:</strong>{" "}
            Training in communication, ethics, professional standards, and workplace culture.
          </li>
          <li>
            <strong className="text-slate-800">Offer exam preparation:</strong> Many programs
            prepare participants for licensing or certification exams.
          </li>
          <li>
            <strong className="text-slate-800">Build networks:</strong> They often include
            mentorship, clinical placements, or co-op opportunities to gain local experience.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-bold text-slate-800">Who Offers Them</h3>
        <p className="mt-2 text-slate-600">
          Universities and colleges (e.g., Richmond Hill College, York University). Regulatory
          bodies (like nursing colleges or engineering regulators). Provincial governments
          often fund them to support skilled immigrants.
        </p>

        <h3 className="mt-6 text-lg font-bold text-slate-800">Examples</h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Nursing:</strong> Internationally educated
            nurses (IENs) can take a bridging program.
          </li>
          <li>
            <strong className="text-slate-800">Medicine:</strong> Programs like Practice Ready
            Assessment (in provinces like Manitoba, Saskatchewan, BC) help international
            medical graduates (IMGs) qualify to practice.
          </li>
          <li>
            <strong className="text-slate-800">Engineering:</strong> Ontario&apos;s
            &ldquo;Engineering Connections&rdquo; program helps internationally trained
            engineers gain Canadian workplace experience and prepare for licensing with
            Professional Engineers Ontario (PEO).
          </li>
          <li>
            <strong className="text-slate-800">Accounting/Finance:</strong> Bridging programs
            prepare internationally educated accountants to meet CPA Canada requirements.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-bold text-slate-800">Key Benefits</h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
          <li>Shorter and more targeted than repeating a full degree.</li>
          <li>Funded or subsidized in many cases.</li>
          <li>Direct pathway to licensing, employment, or further study.</li>
        </ul>
        <p className="mt-4 text-slate-600">
          In short: In Canada, bridging programs are designed to help newcomers with foreign
          credentials enter the Canadian workforce in their profession faster by addressing
          gaps in training, licensing, and workplace readiness.
        </p>
      </section>

      <section className="mt-12 flex flex-wrap items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <Image
          src="/images/logo/rhc-global-bridge-logo.png"
          alt="RHC Global Bridge"
          width={140}
          height={70}
          className="h-14 w-auto"
        />
        <div>
          <p className="font-medium text-slate-800">Online Bridging Program registration</p>
          <a
            href="https://www.rhcglobalbridge.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-slate-600 hover:underline"
          >
            RHCglobalBridge.com – More Information
          </a>
        </div>
      </section>

      <div className="mt-12">
        <Link
          href="/contact"
          className="inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
