import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { buildSearchDocs } from "@/lib/search-index";
import { SiteSearch } from "@/components/SiteSearch";

export const metadata: Metadata = createPageMetadata({
  title: "Rechercher",
  description: "Recherchez parmi les cours, programmes, FAQ et pages du Collège Richmond Hill.",
  path: "search",
  locale: "fr",
  index: false,
});

export default function SearchPageFr() {
  const docs = buildSearchDocs();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Rechercher</h1>
      <p className="mt-2 text-slate-600">
        Trouvez cours, programmes, FAQ et pages dans tout le site.
      </p>
      <div className="mt-8">
        <SiteSearch docs={docs} locale="fr" />
      </div>
    </div>
  );
}
