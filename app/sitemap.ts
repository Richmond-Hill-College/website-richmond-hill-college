import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getAllProducts, getProductCategories } from "@/lib/products";
import { staticRoutes } from "@/lib/sitemap-routes";
import {
  getCourseSlugs,
  getCourseCategories,
} from "@/lib/rhc-global-bridge-courses";
import { getFaqSlugs, getFaqCategories } from "@/lib/faq";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority }) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const products = getAllProducts();
  for (const p of products) {
    entries.push({
      url: `${siteUrl}/product/${p.id}/${p.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const productCategories = getProductCategories();
  for (const { category } of productCategories) {
    entries.push({
      url: `${siteUrl}/products/category/${category}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  const courseSlugs = await getCourseSlugs();
  for (const slug of courseSlugs) {
    entries.push({
      url: `${siteUrl}/courses/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  const courseCategories = await getCourseCategories();
  for (const cat of courseCategories) {
    entries.push({
      url: `${siteUrl}/courses/category/${cat.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.72,
    });
  }

  const faqSlugs = getFaqSlugs();
  for (const slug of faqSlugs) {
    entries.push({
      url: `${siteUrl}/faq/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const faqCategories = getFaqCategories();
  for (const cat of faqCategories) {
    entries.push({
      url: `${siteUrl}/faq/category/${cat.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.68,
    });
  }

  return entries;
}
