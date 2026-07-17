import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourseCategories,
  getCoursesByCategorySlug,
  DEFAULT_COURSE_IMAGE,
} from "@/lib/rhc-global-bridge-courses";
import { createPageMetadata } from "@/lib/seo";
import { GeneratedVisual } from "@/components/GeneratedVisual";
import { VisualFeatureGrid } from "@/components/VisualFeatureGrid";

const HEALTHCARE_CATEGORY_SLUG = "1-healthcare-and-human-services";

const healthcareAreas = [
  { visualKey: "nursingCare", title: "Soins infirmiers et soutien aux patients", description: "Développez des connaissances du milieu canadien en soins infirmiers et en soutien à la personne." },
  { visualKey: "pharmacy", title: "Normes en pharmacie", description: "Reliez votre expérience en pharmacie aux attentes du milieu de travail canadien." },
  { visualKey: "medicalOffice", title: "Administration de cabinet médical", description: "Développez des compétences en coordination, dossiers et environnements médicaux." },
  { visualKey: "healthcareLearning", title: "Parcours professionnels en santé", description: "Comparez des programmes ciblés pour les professionnels formés à l’étranger et les personnes en réorientation." },
] as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getCourseCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCourseCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Catégorie introuvable" };

  const path = `courses/category/${slug}`;
  const isHealthcare = slug === HEALTHCARE_CATEGORY_SLUG;
  return createPageMetadata({
    title: isHealthcare ? "Programmes de transition en santé au Canada" : `${cat.name} – Cours`,
    description: isHealthcare
      ? "Explorez les programmes de transition en santé du Collège Richmond Hill : soins infirmiers, pharmacie, administration médicale, soutien aux patients et plus."
      : `Parcourez ${cat.count} programme${cat.count !== 1 ? "s" : ""} de transition dans ${cat.name} au Collège Richmond Hill. Inscription sur RHC Global Bridge.`,
    path,
    locale: "fr",
    ...(isHealthcare && {
      image: "/images/generated/library/global-healthcare-careers.png",
      imageWidth: 1672,
      imageHeight: 941,
    }),
  });
}

export default async function CourseCategoryPageFr({ params }: Props) {
  const { slug } = await params;
  const [categories, courses] = await Promise.all([
    getCourseCategories(),
    getCoursesByCategorySlug(slug),
  ]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat || courses.length === 0) notFound();
  const isHealthcare = slug === HEALTHCARE_CATEGORY_SLUG;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/fr/courses" className="hover:text-slate-900">
              Cours
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/fr/courses/categories" className="hover:text-slate-900">
              Catégories
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{cat.name}</li>
        </ol>
      </nav>

      {isHealthcare ? (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f6520a]">Santé et services à la personne</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
              Programmes de transition en santé au Canada
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5">
              Comparez {cat.count} programmes actuels en soins infirmiers, pharmacie, soutien
              aux patients, administration et domaines connexes pour développer des compétences
              pertinentes au milieu de travail canadien.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/fr/bridging-programs" className="cta-primary rounded-lg px-5 py-3 text-sm font-semibold">Comprendre les programmes de transition</Link>
              <Link href="/fr/contact" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Demander conseil</Link>
            </div>
          </div>
          <GeneratedVisual visualKey="globalHealthcareCareers" locale="fr" priority className="rounded-2xl shadow-xl ring-1 ring-slate-200" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">{cat.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-2xl">
            {cat.count} programme{cat.count !== 1 ? "s" : ""} de transition dans cette catégorie.
            Sélectionnez un cours pour voir les détails et vous inscrire sur RHC Global Bridge.
          </p>
        </>
      )}

      {isHealthcare && (
        <section className="mt-12" aria-labelledby="healthcare-pathways-heading">
          <h2 id="healthcare-pathways-heading" className="text-2xl font-bold text-slate-900">Explorer les domaines de carrière en santé</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Commencez par le domaine le plus proche de votre expérience, puis consultez les cours actuels ci-dessous.</p>
          <VisualFeatureGrid items={healthcareAreas} locale="fr" className="mt-6 lg:grid-cols-4" ariaLabel="Domaines de programmes en santé" />
        </section>
      )}

      <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.id}>
            <Link
              href={`/fr/courses/${course.slugFr}`}
              className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-md"
            >
              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={course.image || DEFAULT_COURSE_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <span className="font-semibold text-slate-900">{course.name}</span>
                {course.duration && (
                  <span className="mt-1 block text-sm text-slate-500">{course.duration}</span>
                )}
                <span className="mt-2 inline-block text-sm font-medium text-slate-700">
                  Voir le cours →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link href="/fr/courses" className="text-slate-600 hover:text-slate-900">
          ← Cours
        </Link>
      </p>
    </div>
  );
}
