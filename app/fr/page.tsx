import Link from "next/link";
import Image from "next/image";
import { Laptop, LayoutGrid, GraduationCap, ChevronRight } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CourseSlideshow } from "@/components/CourseSlideshow";
import { FAQJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactBlock } from "@/components/ContactBlock";
import { FAQSection } from "@/components/FAQSection";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getRhcCourses, RHC_GLOBAL_BRIDGE_COURSES_FALLBACK } from "@/lib/rhc-global-bridge-courses";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Accueil",
  description:
    "Le Collège Richmond Hill offre des programmes de transition et des cours en ligne, hybrides et en personne en gestion des soins de santé et de la technologie. Débloquer le potentiel, construire l'avenir.",
  path: "",
  locale: "fr",
});

/** Canadian French – natural, institutional tone (vous). Same structure as English landing. */
const learningOptions = [
  {
    title: "Cours en ligne",
    description: "Des cours en ligne flexibles avec des instructeurs chevronnés.",
    href: "/fr/course-offerings",
    icon: Laptop,
  },
  {
    title: "Cours hybrides",
    description: "Une combinaison d'apprentissage en ligne et en personne pour une expérience complète.",
    href: "/fr/course-offerings",
    icon: LayoutGrid,
  },
  {
    title: "Cours en personne",
    description: "Des cours en présentiel avec formation pratique.",
    href: "/fr/course-offerings",
    icon: GraduationCap,
  },
];

const bridgingCategories = [
  {
    title: "Santé et services à la personne",
    description: "Parcours vers les carrières en santé au Canada pour les professionnels formés à l'étranger.",
    href: "/fr/bridging-programs",
    image: "/images/hero/hero-2.jpg",
    imageAlt: "Programmes de transition en santé et soins infirmiers au Collège Richmond Hill",
  },
  {
    title: "Hôtellerie et services",
    description: "Maîtrisez l'hôtellerie et les arts culinaires selon les normes canadiennes.",
    href: "/fr/bridging-programs",
    image: "/images/programs/programs-1.jpg",
    imageAlt: "Programmes de transition en hôtellerie et arts culinaires au Collège Richmond Hill",
  },
  {
    title: "TI, IA et informatique",
    description: "Bâtissez votre avenir en technologie avec des titres reconnus au Canada.",
    href: "/fr/bridging-programs",
    image: "/images/programs/programs-2.jpeg",
    imageAlt: "Programmes de transition en technologie et innovation au Collège Richmond Hill",
  },
];

const FEATURED_COURSES_COUNT = 6;
const SLIDESHOW_COURSES_COUNT = 8;

export default async function FrenchHomePage() {
  const allCourses = await getRhcCourses().catch(
    () => RHC_GLOBAL_BRIDGE_COURSES_FALLBACK
  );
  const featuredCourses = allCourses.slice(0, FEATURED_COURSES_COUNT);
  const slideshowCourses = allCourses.slice(0, SLIDESHOW_COURSES_COUNT);

  return (
    <>
      <FAQJsonLd locale="fr" />
      <HeroCarousel locale="fr" />

      <div className="relative z-0 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 tablet:px-8 tablet:py-24 lg:px-8">
        <ScrollReveal as="section" className="mb-16 tablet:mb-24">
          <div className="grid gap-10 tablet:gap-14 lg:grid-cols-[0.8fr_1.7fr] lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Collège Richmond Hill
              </span>
              <SectionHeading title="Bienvenue au Collège Richmond Hill">
                <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                  Au Collège Richmond Hill de gestion des soins de santé et de la technologie, nous offrons
                  une gamme de cours pour vous aider à exceller en gestion des soins de santé et de la technologie.
                  Nos programmes s&apos;adressent aux professionnels en activité et aux personnes en réorientation,
                  avec des formations rapides et ciblées qui favorisent l&apos;engagement et la réussite.
                </p>
              </SectionHeading>
              <Link
                href="/fr/about-us"
                className="cta-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640]"
              >
                À propos
              </Link>
            </div>
            <CourseSlideshow courses={slideshowCourses} localePrefix="/fr" />
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className="mb-16 tablet:mb-24"
          aria-labelledby="bridging-programs-heading"
          staggerChildren
          staggerMs={90}
        >
          <div className="mb-10 text-center tablet:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Nos outils gratuits pour votre carrière
            </span>
            <h2
              id="bridging-programs-heading"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl"
            >
              Programmes de transition
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-xl">
              Programmes de transition professionnels alignés sur les normes canadiennes, conçus pour
              les professionnels formés à l&apos;étranger.
            </p>
          </div>
          <div className="grid gap-6 tablet:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bridgingCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-lg font-semibold group-hover:underline sm:text-xl">
                    {cat.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-200">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-white">
                    Explorer les programmes
                    <span className="ml-1 transition group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/fr/bridging-programs"
              className="cta-primary-outline inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2"
            >
              Voir tous les programmes de transition
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          className="mb-16 tablet:mb-24"
          aria-labelledby="courses-heading"
          staggerChildren
          staggerMs={70}
        >
          <div className="mb-10 text-center tablet:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Développement professionnel
            </span>
            <h2
              id="courses-heading"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl"
            >
              Nos cours
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-xl">
              Parcourez une sélection de nos programmes de transition et de nos cours. Consultez les détails
              et inscrivez-vous sur RHC Global Bridge.
            </p>
          </div>
          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 tablet:gap-6 lg:grid-cols-3">
            {featuredCourses.map((course) => {
              const slug = course.slugFr ?? course.slug;
              const href = course.slug ? `/fr/courses/${slug}` : course.link;
              return (
                <li
                  key={course.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
                >
                  <Link
                    href={href}
                    className="flex flex-col"
                    aria-label={`Voir les détails du cours ${course.name}`}
                    {...(course.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={course.image || "/images/hero/hero-2.jpg"}
                        alt={`${course.name} – cours au Collège Richmond Hill`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700">
                        {course.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        {course.category && <span>{course.category}</span>}
                        {course.duration && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200/60">
                            {course.duration}
                          </span>
                        )}
                        {course.price && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-800 ring-1 ring-slate-200/60">
                            {course.price.includes("CAD") ? course.price : `${course.price} CAD`}
                          </span>
                        )}
                      </div>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 group-hover:text-slate-600">
                        Voir les détails
                        <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/fr/courses"
              className="cta-primary-outline inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2"
            >
              Voir tous les cours
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24" aria-labelledby="learning-options-heading">
          <h2
            id="learning-options-heading"
            className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-8 tablet:text-3xl"
          >
            Formules d&apos;apprentissage flexibles
          </h2>
          <div className="grid gap-6 tablet:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {learningOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <article
                  key={opt.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <Icon
                    className="h-10 w-10 text-slate-700"
                    aria-hidden
                  />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{opt.title}</h3>
                  <p className="mt-2 text-slate-600">{opt.description}</p>
                  <Link
                    href={opt.href}
                    className="mt-4 inline-flex items-center text-sm font-medium text-slate-800 hover:underline"
                  >
                    Plus d&apos;info
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm tablet:p-10">
          <div className="flex flex-col gap-6 tablet:gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                Programme de transition RHC en ligne
              </h2>
              <p className="mt-2 text-slate-600">
                Connectez-vous, inscrivez-vous ou parcourez les cours et programmes sur RHC Global Bridge.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/fr/my-account"
                  className="cta-primary inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition"
                >
                  Mon compte (connexion / inscription)
                </Link>
                <a
                  href="https://www.rhcglobalbridge.com/courses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-slate-800 hover:underline"
                >
                  Tous les cours sur RHCglobalBridge.com →
                </a>
              </div>
            </div>
            <div className="shrink-0">
              <Image
                src="/images/logo/rhc-global-bridge-logo.png"
                alt="RHC Global Bridge – connexion aux cours et programmes de transition au Collège Richmond Hill"
                width={140}
                height={70}
                className="h-14 w-auto"
              />
            </div>
          </div>
        </ScrollReveal>

        <hr className="my-12 tablet:my-20 border-slate-200" />

        <ScrollReveal as="section" className="mb-12 tablet:mb-20">
          <FAQSection locale="fr" localePrefix="/fr" />
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-16 tablet:mb-24" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl tablet:mb-6 tablet:text-3xl">
            Nous joindre
          </h2>
          <p className="mb-5 max-w-2xl text-slate-600 tablet:mb-6">
            Une question ou besoin d&apos;aide? N&apos;hésitez pas à nous contacter à l&apos;aide du formulaire
            ci-dessous. Nous vous répondrons sous peu.
          </p>
          <div className="grid gap-8 tablet:gap-10 lg:grid-cols-2">
            <ContactForm locale="fr" />
            <ContactBlock locale="fr" />
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="mb-12 tablet:mb-16" aria-labelledby="about-heading">
          <h2 id="about-heading" className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl">
            À propos
          </h2>
          <p className="max-w-3xl text-slate-600">
            Le Collège Richmond Hill de gestion des soins de santé et de la technologie s&apos;engage à
            offrir une formation de qualité pour permettre à chacun de réaliser ses objectifs académiques
            et professionnels. Nous privilégions l&apos;apprentissage pratique et les compétences reconnues
            par l&apos;industrie.
          </p>
          <Link
            href="/fr/contact"
            className="mt-4 inline-block font-medium text-slate-800 hover:underline"
          >
            En savoir plus →
          </Link>
        </ScrollReveal>

        <ScrollReveal as="blockquote" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 italic text-slate-600 shadow-sm tablet:p-8">
          <p>
            &ldquo;Je suis vraiment reconnaissant des connaissances et des compétences acquises au Collège
            Richmond Hill. Les cours sont concrets et utiles pour ma carrière, et les formateurs sont
            excellents.&rdquo;
          </p>
          <footer className="mt-4 not-italic text-slate-500">— Un diplômé</footer>
        </ScrollReveal>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/" className="text-slate-600 underline hover:text-slate-800">
            Version anglaise
          </Link>
        </p>
      </div>
    </>
  );
}
