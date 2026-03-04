import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getAllProducts, getProductCategories } from "@/lib/products";
import { staticRoutes } from "@/lib/sitemap-routes";
import {
  getCourseSlugs,
  getCourseSlugsFr,
  getCourseCategories,
} from "@/lib/rhc-global-bridge-courses";
import { getFaqSlugs, getFaqCategories } from "@/lib/faq";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority } of staticRoutes) {
    const enUrl = path ? `${siteUrl}/${path}` : siteUrl;
    const frUrl = path ? `${siteUrl}/fr/${path}` : `${siteUrl}/fr`;
    entries.push({ url: enUrl, lastModified, changeFrequency: "weekly", priority });
    entries.push({ url: frUrl, lastModified, changeFrequency: "weekly", priority });
  }

  const products = getAllProducts();
  for (const p of products) {
    entries.push({ url: `${siteUrl}/product/${p.id}/${p.slug}`, lastModified, changeFrequency: "weekly", priority: 0.7 });
    entries.push({ url: `${siteUrl}/fr/product/${p.id}/${p.slug}`, lastModified, changeFrequency: "weekly", priority: 0.7 });
  }

  const productCategories = getProductCategories();
  for (const { category } of productCategories) {
    entries.push({ url: `${siteUrl}/products/category/${category}`, lastModified, changeFrequency: "weekly", priority: 0.7 });
    entries.push({ url: `${siteUrl}/fr/products/category/${category}`, lastModified, changeFrequency: "weekly", priority: 0.7 });
  }

  const courseSlugs = await getCourseSlugs();
  const courseSlugsFr = await getCourseSlugsFr();
  for (const slug of courseSlugs) {
    entries.push({ url: `${siteUrl}/courses/${slug}`, lastModified, changeFrequency: "weekly", priority: 0.75 });
  }
  for (const slugFr of courseSlugsFr) {
    entries.push({ url: `${siteUrl}/fr/courses/${slugFr}`, lastModified, changeFrequency: "weekly", priority: 0.75 });
  }

  const courseCategories = await getCourseCategories();
  for (const cat of courseCategories) {
    entries.push({ url: `${siteUrl}/courses/category/${cat.slug}`, lastModified, changeFrequency: "weekly", priority: 0.72 });
    entries.push({ url: `${siteUrl}/fr/courses/category/${cat.slug}`, lastModified, changeFrequency: "weekly", priority: 0.72 });
  }

  const faqSlugs = getFaqSlugs("en");
  const faqSlugsFr = getFaqSlugs("fr");
  for (const slug of faqSlugs) {
    entries.push({ url: `${siteUrl}/faq/${slug}`, lastModified, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const slug of faqSlugsFr) {
    entries.push({ url: `${siteUrl}/fr/faq/${slug}`, lastModified, changeFrequency: "monthly", priority: 0.7 });
  }

  const faqCategories = getFaqCategories("en");
  const faqCategoriesFr = getFaqCategories("fr");
  for (const cat of faqCategories) {
    entries.push({ url: `${siteUrl}/faq/category/${cat.slug}`, lastModified, changeFrequency: "monthly", priority: 0.68 });
  }
  for (const cat of faqCategoriesFr) {
    entries.push({ url: `${siteUrl}/fr/faq/category/${cat.slug}`, lastModified, changeFrequency: "monthly", priority: 0.68 });
  }

  return entries;
}
