import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";
import {
  getRhcCourses,
  RHC_GLOBAL_BRIDGE_COURSES_FALLBACK,
  type RhcCourse,
} from "@/lib/rhc-global-bridge-courses";

export const metadata: Metadata = createPageMetadata({
  title: "Bridging Programs",
  description:
    "Richmond Hill College bridging programs: Healthcare & Human Services, Animal Care, Hospitality, Skilled Trades, IT & AI, Beauty. For internationally educated professionals and career changers.",
  path: "bridging-programs",
  image: "/images/programs/programs-1.jpg",
  imageWidth: 800,
  imageHeight: 600,
});

/** Group courses by category (category names from RHC may include a number prefix). */
function groupCoursesByCategory(courses: RhcCourse[]): Map<string, RhcCourse[]> {
  const map = new Map<string, RhcCourse[]>();
  for (const c of courses) {
    const cat = c.category || "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(c);
  }
  for (const list of Array.from(map.values())) list.sort((a, b) => a.name.localeCompare(b.name));
  return map;
}

export default async function BridgingProgramsPage() {
  const courses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const byCategory = groupCoursesByCategory(courses);
  const categoryOrder = Array.from(byCategory.keys()).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Bridging Programs
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Looking to <strong className="text-slate-800">bridge to Canadian certification</strong> or
            get <strong className="text-slate-800">Canadian certification as an internationally educated professional</strong>?{" "}
            <Link href="/bridge-canadian-certification" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">Bridge to Canadian Certification</Link>
            {" · "}
            <Link href="/canadian-certification-internationally-educated" className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600">Canadian Certification for IEPs</Link>
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <Image
            src="/images/programs/programs-1.jpg"
            alt="Bridging programs at Richmond Hill College: education and career pathways for internationally educated professionals"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <section className="mt-12" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-xl font-bold text-slate-900">
          Our bridging programs by category
        </h2>
        <p className="mt-2 text-slate-600">
          Each category lists current courses you can take. Select a course to view details and register on RHC Global Bridge.
        </p>
        <div className="mt-6 space-y-10">
          {categoryOrder.map((cat) => {
            const list = byCategory.get(cat)!;
            return (
              <div key={cat} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{cat}</h3>
                <ul className="mt-4 list-none space-y-2 p-0">
                  {list.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={course.slug ? `/courses/${course.slug}` : course.link}
                        {...(!course.slug && { target: "_blank", rel: "noopener noreferrer" })}
                        className="flex items-center justify-between gap-4 rounded-lg py-2 text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <span className="font-medium">{course.name}</span>
                        <span className="flex flex-wrap items-center gap-2 text-sm">
                          {course.duration && (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 ring-1 ring-slate-200/60">
                              {course.duration}
                            </span>
                          )}
                          {course.price && (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/60">
                              {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/courses?category=${encodeURIComponent(cat)}`}
                  className="mt-3 inline-block text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  View all in this category on Courses →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="what-are-heading">
        <h2 id="what-are-heading" className="text-2xl font-bold text-slate-900">
          What Are Bridging Programs?
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="text-slate-600">
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
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 lg:col-span-2">
            <Image
              src="/images/programs/programs-2.jpeg"
              alt="Diverse professionals in a Canadian workplace or classroom setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
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
          alt="RHC Global Bridge – register for bridging programs at Richmond Hill College"
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
          className="cta-primary inline-block rounded-md px-4 py-2 text-sm font-medium"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
