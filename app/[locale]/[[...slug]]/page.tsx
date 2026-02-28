import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/app/page";
import AboutUsPage from "@/app/about-us/page";
import TeamPage from "@/app/about-us/team/page";
import MessageFromThePresidentPage from "@/app/message-from-the-president/page";
import ProgramsPage from "@/app/programs/page";
import CourseOfferingsPage from "@/app/course-offerings/page";
import BridgingProgramsPage from "@/app/bridging-programs/page";
import BridgeCanadianCertificationPage from "@/app/bridge-canadian-certification/page";
import CanadianCertificationInternationallyEducatedPage from "@/app/canadian-certification-internationally-educated/page";
import MyAccountPage from "@/app/my-account/page";
import CoursesIndexPage from "@/app/courses/page";
import CourseCategoriesPage from "@/app/courses/categories/page";
import CourseDetailPage from "@/app/courses/[slug]/page";
import CourseCategoryPage from "@/app/courses/category/[slug]/page";
import ProductsIndexPage from "@/app/products/page";
import ProductCategoryPage from "@/app/products/category/[category]/page";
import ProductPage from "@/app/product/[id]/[slug]/page";
import ContactPage from "@/app/contact/page";
import SupportPage from "@/app/support/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import TermsOfServicePage from "@/app/terms-of-service/page";
import FaqPage from "@/app/faq/page";
import FaqCategoriesPage from "@/app/faq/categories/page";
import FaqSlugPage from "@/app/faq/[slug]/page";
import FaqCategoryPage from "@/app/faq/category/[slug]/page";
import ConferencesPage from "@/app/conferences/page";
import NursingHealthcare2025Page from "@/app/conferences/nursing-and-healthcare-2025/page";
import ConferenceMainPage from "@/app/conferences/nursing-and-healthcare-2025/conference-main-page/page";
import RegistrationPage from "@/app/conferences/nursing-and-healthcare-2025/registration/page";
import SubmitAbstractPage from "@/app/conferences/nursing-and-healthcare-2025/submit-abstract/page";
import InvitationLetterPage from "@/app/conferences/nursing-and-healthcare-2025/invitation-letter/page";
import SponsorshipPage from "@/app/conferences/nursing-and-healthcare-2025/sponsorship/page";
import AccommodationsPage from "@/app/conferences/nursing-and-healthcare-2025/accommodations/page";
import ProgramTablePage from "@/app/conferences/nursing-and-healthcare-2025/program-table/page";
import AbstractProceedingBookPage from "@/app/conferences/nursing-and-healthcare-2025/abstract-proceeding-book/page";
import VenuePage from "@/app/conferences/nursing-and-healthcare-2025/venue/page";
import ConferenceContactPage from "@/app/conferences/nursing-and-healthcare-2025/contact-1/page";
import SitemapPage from "@/app/sitemap/page";
import { getCourseBySlug, getCourseCategories, getCourseSlugs } from "@/lib/rhc-global-bridge-courses";
import { getFaqBySlug, getFaqCategories, getFaqSlugs } from "@/lib/faq";
import { getAllProducts, getProductByIdAndSlug, getProductCategories } from "@/lib/products";
import {
  isLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n-routing";
import { createPageMetadata } from "@/lib/seo";
import { getStaticRouteSeo } from "@/lib/localized-seo";
import { staticRoutes } from "@/lib/sitemap-routes";

type Params = {
  locale: string;
  slug?: string[];
};

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

function normalizePath(slug?: string[]): string {
  if (!slug || slug.length === 0) return "";
  return slug.join("/");
}

function firstSearchValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isStaticRoute(path: string): boolean {
  return staticRoutes.some((route) => route.path === path);
}

function notFoundMetadata(locale: Locale): Metadata {
  return createPageMetadata({
    title: locale === "fr" ? "Page introuvable" : "Page Not Found",
    description:
      locale === "fr"
        ? "La page demandee est introuvable."
        : "The requested page could not be found.",
    path: "",
    index: false,
    locale,
  });
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const [courseSlugs, courseCategories] = await Promise.all([
    getCourseSlugs(),
    getCourseCategories(),
  ]);
  const faqSlugs = getFaqSlugs();
  const faqCategories = getFaqCategories();
  const products = getAllProducts();
  const productCategories = getProductCategories();

  const allPaths = new Set<string>(staticRoutes.map((route) => route.path));

  for (const product of products) {
    allPaths.add(`product/${product.id}/${product.slug}`);
  }
  for (const category of productCategories) {
    allPaths.add(`products/category/${category.category}`);
  }
  for (const slug of courseSlugs) {
    allPaths.add(`courses/${slug}`);
  }
  for (const category of courseCategories) {
    allPaths.add(`courses/category/${category.slug}`);
  }
  for (const slug of faqSlugs) {
    allPaths.add(`faq/${slug}`);
  }
  for (const category of faqCategories) {
    allPaths.add(`faq/category/${category.slug}`);
  }

  return SUPPORTED_LOCALES.flatMap((locale) =>
    Array.from(allPaths).map((path) =>
      path ? { locale, slug: path.split("/") } : { locale }
    )
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return notFoundMetadata("en");

  const locale = rawLocale;
  const path = normalizePath(slug);
  const segments = path ? path.split("/") : [];

  if (isStaticRoute(path)) {
    const copy = getStaticRouteSeo(path, locale);
    return createPageMetadata({
      title: copy.title,
      description: copy.description,
      path,
      locale,
    });
  }

  if (segments[0] === "product" && segments.length === 3) {
    const [, id, slugPart] = segments;
    const product = getProductByIdAndSlug(id, slugPart);
    if (!product) return notFoundMetadata(locale);
    return createPageMetadata({
      title: product.title,
      description: product.description,
      path,
      locale,
    });
  }

  if (segments[0] === "products" && segments[1] === "category" && segments.length === 3) {
    const category = segments[2];
    const categoryMeta = getProductCategories().find((item) => item.category === category);
    if (!categoryMeta) return notFoundMetadata(locale);

    return createPageMetadata({
      title:
        locale === "fr"
          ? `${categoryMeta.label} - Produits`
          : `${categoryMeta.label} - Products`,
      description:
        locale === "fr"
          ? `Parcourez les options de ${categoryMeta.label.toLowerCase()} pour les conferences et evenements.`
          : `Browse ${categoryMeta.label.toLowerCase()} options for conferences and events.`,
      path,
      locale,
    });
  }

  if (segments[0] === "courses" && segments[1] === "category" && segments.length === 3) {
    const category = segments[2];
    const categoryMeta = (await getCourseCategories()).find((item) => item.slug === category);
    if (!categoryMeta) return notFoundMetadata(locale);

    return createPageMetadata({
      title: locale === "fr" ? `${categoryMeta.name} - Cours` : `${categoryMeta.name} - Courses`,
      description:
        locale === "fr"
          ? `Parcourez ${categoryMeta.count} programme${categoryMeta.count !== 1 ? "s" : ""} passerelle dans ${categoryMeta.name}.`
          : `Browse ${categoryMeta.count} bridging program${categoryMeta.count !== 1 ? "s" : ""} in ${categoryMeta.name}.`,
      path,
      locale,
    });
  }

  if (segments[0] === "courses" && segments.length === 2 && segments[1] !== "categories") {
    const course = await getCourseBySlug(segments[1]);
    if (!course) return notFoundMetadata(locale);

    const description =
      locale === "fr"
        ? `${course.name}. Programme passerelle professionnel aligne sur les normes canadiennes.`
        : `${course.name}. Professional bridging program aligned with Canadian standards.`;

    return createPageMetadata({
      title: course.name,
      description,
      path,
      locale,
      image: course.image,
      imageWidth: 1200,
      imageHeight: 630,
    });
  }

  if (segments[0] === "faq" && segments[1] === "category" && segments.length === 3) {
    const category = getFaqCategories().find((item) => item.slug === segments[2]);
    if (!category) return notFoundMetadata(locale);
    return createPageMetadata({
      title: locale === "fr" ? `${category.name} - FAQ` : `${category.name} - FAQ`,
      description:
        locale === "fr"
          ? `Questions frequentes sur ${category.name.toLowerCase()} a Richmond Hill College.`
          : `Frequently asked questions about ${category.name.toLowerCase()} at Richmond Hill College.`,
      path,
      locale,
    });
  }

  if (segments[0] === "faq" && segments.length === 2 && segments[1] !== "categories") {
    const faq = getFaqBySlug(segments[1]);
    if (!faq) return notFoundMetadata(locale);
    return createPageMetadata({
      title: faq.question,
      description: faq.answer.slice(0, 160),
      path,
      locale,
    });
  }

  return notFoundMetadata(locale);
}

export default async function LocalizedCatchAllPage({ params, searchParams }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const path = normalizePath(slug);
  const segments = path ? path.split("/") : [];
  const resolvedSearchParams = await searchParams;

  switch (path) {
    case "":
      return <HomePage locale={rawLocale} />;
    case "about-us":
      return <AboutUsPage />;
    case "about-us/team":
      return <TeamPage />;
    case "message-from-the-president":
      return <MessageFromThePresidentPage />;
    case "programs":
      return <ProgramsPage />;
    case "course-offerings":
      return <CourseOfferingsPage />;
    case "bridging-programs":
      return <BridgingProgramsPage />;
    case "bridge-canadian-certification":
      return <BridgeCanadianCertificationPage />;
    case "canadian-certification-internationally-educated":
      return <CanadianCertificationInternationallyEducatedPage />;
    case "my-account":
      return <MyAccountPage />;
    case "courses":
      return (
        <CoursesIndexPage
          searchParams={Promise.resolve({
            category: firstSearchValue(resolvedSearchParams.category),
          })}
        />
      );
    case "courses/categories":
      return <CourseCategoriesPage />;
    case "products":
      return <ProductsIndexPage />;
    case "contact":
      return <ContactPage />;
    case "support":
      return <SupportPage />;
    case "privacy-policy":
      return <PrivacyPolicyPage />;
    case "terms-of-service":
      return <TermsOfServicePage />;
    case "faq":
      return <FaqPage />;
    case "faq/categories":
      return <FaqCategoriesPage />;
    case "conferences":
      return <ConferencesPage />;
    case "conferences/nursing-and-healthcare-2025":
      return <NursingHealthcare2025Page />;
    case "conferences/nursing-and-healthcare-2025/conference-main-page":
      return <ConferenceMainPage />;
    case "conferences/nursing-and-healthcare-2025/registration":
      return <RegistrationPage />;
    case "conferences/nursing-and-healthcare-2025/submit-abstract":
      return <SubmitAbstractPage />;
    case "conferences/nursing-and-healthcare-2025/invitation-letter":
      return <InvitationLetterPage />;
    case "conferences/nursing-and-healthcare-2025/sponsorship":
      return <SponsorshipPage />;
    case "conferences/nursing-and-healthcare-2025/accommodations":
      return <AccommodationsPage />;
    case "conferences/nursing-and-healthcare-2025/program-table":
      return <ProgramTablePage />;
    case "conferences/nursing-and-healthcare-2025/abstract-proceeding-book":
      return <AbstractProceedingBookPage />;
    case "conferences/nursing-and-healthcare-2025/venue":
      return <VenuePage />;
    case "conferences/nursing-and-healthcare-2025/contact-1":
      return <ConferenceContactPage />;
    case "sitemap":
      return <SitemapPage />;
    default:
      break;
  }

  if (segments[0] === "product" && segments.length === 3) {
    const [, id, slugPart] = segments;
    return <ProductPage params={Promise.resolve({ id, slug: slugPart })} />;
  }

  if (segments[0] === "products" && segments[1] === "category" && segments.length === 3) {
    return <ProductCategoryPage params={Promise.resolve({ category: segments[2] })} />;
  }

  if (segments[0] === "courses" && segments[1] === "category" && segments.length === 3) {
    return <CourseCategoryPage params={Promise.resolve({ slug: segments[2] })} />;
  }

  if (segments[0] === "courses" && segments.length === 2 && segments[1] !== "categories") {
    return <CourseDetailPage params={Promise.resolve({ slug: segments[1] })} />;
  }

  if (segments[0] === "faq" && segments[1] === "category" && segments.length === 3) {
    return <FaqCategoryPage params={Promise.resolve({ slug: segments[2] })} />;
  }

  if (segments[0] === "faq" && segments.length === 2 && segments[1] !== "categories") {
    return <FaqSlugPage params={Promise.resolve({ slug: segments[1] })} />;
  }

  notFound();
}
