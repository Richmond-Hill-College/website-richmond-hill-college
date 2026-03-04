import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlugFr, getCourseSlugsFr, DEFAULT_COURSE_IMAGE } from "@/lib/rhc-global-bridge-courses";
import { getCourseInstructor } from "@/lib/course-instructors";
import { createPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { CourseJsonLd } from "@/components/CourseJsonLd";
import { CourseInstructorBlock } from "@/components/CourseInstructorBlock";

type Props = { params: Promise<{ slug: string }> | { slug: string } };

export async function generateStaticParams() {
  const slugs = await getCourseSlugsFr();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug;
  if (!slug) return { title: "Cours introuvable" };
  const course = await getCourseBySlugFr(slug);
  if (!course) return { title: "Cours introuvable" };

  const path = `courses/${slug}`;
  const description =
    `${course.name}. ${course.category ? `${course.category}. ` : ""}` +
    `${course.duration ? `Durée : ${course.duration}. ` : ""}` +
    `Programme de transition au Collège Richmond Hill. Inscription sur RHC Global Bridge.`;

  return createPageMetadata({
    title: course.name,
    description: description.slice(0, 160),
    path,
    locale: "fr",
    alternatePaths: { en: `courses/${course.slug}` },
    image: course.image || DEFAULT_COURSE_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
  });
}

export default async function CourseDetailPageFr({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug;
  if (!slug) notFound();
  const course = await getCourseBySlugFr(slug);
  if (!course) notFound();

  const coursePageUrl = `${siteUrl}/fr/courses/${slug}`;

  return (
    <>
      <CourseJsonLd
        course={course}
        coursePageUrl={coursePageUrl}
        description={`${course.name}. ${course.category ? `Catégorie : ${course.category}. ` : ""}${course.duration ? `Durée : ${course.duration}. ` : ""}Programme de transition aligné sur les normes canadiennes. Inscription sur RHC Global Bridge.`}
        locale="fr"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/fr/courses" className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Tous les cours
        </Link>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <Image
              src={course.image || DEFAULT_COURSE_IMAGE}
              alt={`${course.name} – cours au Collège Richmond Hill`}
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
                  <dt className="sr-only">Durée</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-slate-700 ring-1 ring-slate-200/60">
                      {course.duration}
                    </span>
                  </dd>
                </>
              )}
              {course.price && (
                <>
                  <dt className="sr-only">Prix</dt>
                  <dd>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 font-semibold text-slate-800 ring-1 ring-slate-200/60">
                      {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                    </span>
                  </dd>
                </>
              )}
            </dl>
            {getCourseInstructor(course.slug) && (
              <CourseInstructorBlock instructor={getCourseInstructor(course.slug)!} localeFr />
            )}
            <p className="mt-6 text-slate-600">
              Ce programme de transition s&apos;adresse aux professionnels formés à l&apos;étranger
              et est aligné sur les normes canadiennes. Le contenu et l&apos;inscription sont offerts
              via Richmond Hill College Global Bridge (RHC Global Bridge).
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex rounded-md px-5 py-2.5 text-sm font-medium"
              >
                Voir le cours et s&apos;inscrire sur RHC Global Bridge →
              </a>
              <Link
                href="/fr/contact"
                className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Nous joindre
              </Link>
            </div>
          </div>
        </article>

        <nav className="mt-8 flex justify-between border-t border-slate-200 pt-6">
          <Link href="/fr/course-offerings" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Offre de cours
          </Link>
          <Link href="/fr/my-account" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Mon compte
          </Link>
        </nav>
      </div>
    </>
  );
}
