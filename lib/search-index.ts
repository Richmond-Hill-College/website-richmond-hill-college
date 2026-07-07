/**
 * Build-time search index. Aggregates content from existing data files into a
 * flat list of records. The /search page consumes this and feeds it to
 * MiniSearch for instant client-side search.
 *
 * Why build-time, not runtime: this is a static-feeling site. Indexing on
 * every request would burn CPU; indexing once at build keeps page load fast.
 */
import { products } from "@/lib/products";
import { RHC_GLOBAL_BRIDGE_COURSES_FALLBACK } from "@/lib/rhc-global-bridge-courses";
import { FAQ_ENTRIES, FAQ_ENTRIES_FR } from "@/lib/faq";
import { staticRoutes } from "@/lib/sitemap-routes";

export type SearchDoc = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "page" | "course" | "faq" | "product";
  locale: "en" | "fr";
};

function strip(html: string | undefined | null): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildSearchDocs(): SearchDoc[] {
  const out: SearchDoc[] = [];

  // Static pages — both locales
  for (const r of staticRoutes) {
    out.push({
      id: `page:en:${r.path || "home"}`,
      title: r.label,
      description: r.label,
      url: r.path ? `/${r.path}` : "/",
      type: "page",
      locale: "en",
    });
    out.push({
      id: `page:fr:${r.path || "home"}`,
      title: r.labelFr,
      description: r.labelFr,
      url: r.path ? `/fr/${r.path}` : "/fr",
      type: "page",
      locale: "fr",
    });
  }

  // Courses — EN slug + FR slug both indexed so search works in both locales
  for (const c of RHC_GLOBAL_BRIDGE_COURSES_FALLBACK) {
    const desc = [c.category, c.duration].filter(Boolean).join(" — ");
    out.push({
      id: `course:en:${c.id}`,
      title: c.name,
      description: desc,
      url: `/courses/${c.slug}`,
      type: "course",
      locale: "en",
    });
    if (c.slugFr) {
      out.push({
        id: `course:fr:${c.id}`,
        title: c.name,
        description: desc,
        url: `/fr/courses/${c.slugFr}`,
        type: "course",
        locale: "fr",
      });
    }
  }

  // Products
  for (const p of products) {
    out.push({
      id: `product:${p.id}`,
      title: p.title,
      description: strip(p.description ?? ""),
      url: `/product/${p.id}/${p.slug}`,
      type: "product",
      locale: "en",
    });
  }

  // FAQ entries
  for (const f of FAQ_ENTRIES) {
    out.push({
      id: `faq:en:${f.slug}`,
      title: f.question,
      description: strip(f.answer),
      url: `/faq/${f.slug}`,
      type: "faq",
      locale: "en",
    });
  }
  for (const f of FAQ_ENTRIES_FR) {
    out.push({
      id: `faq:fr:${f.slug}`,
      title: f.question,
      description: strip(f.answer),
      url: `/fr/faq/${f.slug}`,
      type: "faq",
      locale: "fr",
    });
  }

  return out;
}
