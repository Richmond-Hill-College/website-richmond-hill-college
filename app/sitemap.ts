import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getAllProducts, getProductCategories } from "@/lib/products";
import { staticRoutes } from "@/lib/sitemap-routes";
import { withLocale } from "@/lib/i18n-routing";
import {
  getCourseSlugs,
  getCourseCategories,
} from "@/lib/rhc-global-bridge-courses";
import { getFaqSlugs, getFaqCategories } from "@/lib/faq";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const pushLocalizedEntries = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ) => {
    const canonicalEn = `${siteUrl}${withLocale(path ? `/${path}` : "/", "en")}`;
    const canonicalFr = `${siteUrl}${withLocale(path ? `/${path}` : "/", "fr")}`;
    const alternates = {
      languages: {
        en: canonicalEn,
        fr: canonicalFr,
        "x-default": canonicalEn,
      },
    };

    entries.push({
      url: canonicalEn,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });
    entries.push({
      url: canonicalFr,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });
  };

  for (const route of staticRoutes) {
    pushLocalizedEntries(route.path, route.priority, "weekly");
  }

  const products = getAllProducts();
  for (const p of products) {
    pushLocalizedEntries(`product/${p.id}/${p.slug}`, 0.7, "weekly");
  }

  const productCategories = getProductCategories();
  for (const { category } of productCategories) {
    pushLocalizedEntries(`products/category/${category}`, 0.7, "weekly");
  }

  const courseSlugs = await getCourseSlugs();
  for (const slug of courseSlugs) {
    pushLocalizedEntries(`courses/${slug}`, 0.75, "weekly");
  }

  const courseCategories = await getCourseCategories();
  for (const cat of courseCategories) {
    pushLocalizedEntries(`courses/category/${cat.slug}`, 0.72, "weekly");
  }

  const faqSlugs = getFaqSlugs();
  for (const slug of faqSlugs) {
    pushLocalizedEntries(`faq/${slug}`, 0.7, "monthly");
  }

  const faqCategories = getFaqCategories();
  for (const cat of faqCategories) {
    pushLocalizedEntries(`faq/category/${cat.slug}`, 0.68, "monthly");
  }

  return entries;
}
