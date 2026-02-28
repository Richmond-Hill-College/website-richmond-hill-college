import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { getAllProducts } from "@/lib/products";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 0.9 },
  { path: "about-us", priority: 0.8 },
  { path: "programs", priority: 0.8 },
  { path: "course-offerings", priority: 0.8 },
  { path: "bridging-programs", priority: 0.8 },
  { path: "contact", priority: 0.8 },
  { path: "conferences", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/conference-main-page", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/registration", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/submit-abstract", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/invitation-letter", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/sponsorship", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/accommodations", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/program-table", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/abstract-proceeding-book", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/venue", priority: 0.8 },
  { path: "conferences/nursing-and-healthcare-2025/contact-1", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
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

  return entries;
}
