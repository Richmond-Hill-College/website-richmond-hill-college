import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourseSlugs } from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { CourseJsonLd } from "@/components/CourseJsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const path = `courses/${slug}`;
  const description =
    `${course.name}. ${course.category ? `${course.category}. ` : ""}` +
    `${course.duration ? `Duration: ${course.duration}. ` : ""}` +
    `Professional bridging program at Richmond Hill College. Register on RHC Global Bridge.`;

  return createPageMetadata({
    title: course.name,
    description: description.slice(0, 160),
    path,
    image: course.image,
    imageWidth: 1200,
    imageHeight: 630,
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const coursePageUrl = `${siteUrl}/courses/${slug}`;

  return (
    <>
      <CourseJsonLd
        course={course}
        coursePageUrl={coursePageUrl}
        description={`${course.name}. ${course.category ? `Category: ${course.category}. ` : ""}${course.duration ? `Duration: ${course.duration}. ` : ""}Professional bridging program aligned with Canadian standards. Register and purchase on RHC Global Bridge.`}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/courses"
          className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← All courses
        </Link>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <Image
              src={course.image}
              alt={`${course.name} – course at Richmond Hill College`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            {course.category && (
              <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                {course.category}
              </p>
            )}
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {course.name}
            </h1>
            <dl className="mt-4 flex flex-wrap gap-2 text-sm">
              {course.duration && (
                <>
                  <dt className="sr-only">Duration</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-slate-700 ring-1 ring-slate-200/60">
                      {course.duration}
                    </span>
                  </dd>
                </>
              )}
              {course.price && (
                <>
                  <dt className="sr-only">Price</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 font-semibold text-slate-800 ring-1 ring-slate-200/60">
                      {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                    </span>
                  </dd>
                </>
              )}
            </dl>
            <p className="mt-6 text-slate-600">
              This professional bridging program is designed for internationally
              educated professionals and aligns with Canadian workplace
              standards. Course content and registration are delivered through
              Richmond Hill College Global Bridge (RHC Global Bridge).
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex rounded-md px-5 py-2.5 text-sm font-medium"
              >
                View course &amp; register on RHC Global Bridge →
              </a>
              <Link
                href="/contact"
                className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </article>

        <nav className="mt-8 flex justify-between border-t border-slate-200 pt-6">
          <Link
            href="/course-offerings"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Course offerings
          </Link>
          <Link
            href="/my-account"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            My account
          </Link>
        </nav>
      </div>
    </>
  );
}
