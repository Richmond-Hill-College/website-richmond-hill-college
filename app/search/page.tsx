import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { buildSearchDocs } from "@/lib/search-index";
import { SiteSearch } from "@/components/SiteSearch";

export const metadata: Metadata = createPageMetadata({
  title: "Search",
  description: "Search Richmond Hill College courses, programs, FAQ, and pages.",
  path: "search",
  index: false, // search results pages don't belong in the index
});

export default function SearchPage() {
  const docs = buildSearchDocs();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Search</h1>
      <p className="mt-2 text-slate-600">
        Find courses, programs, FAQs, and pages across the site.
      </p>
      <div className="mt-8">
        <SiteSearch docs={docs} locale="en" />
      </div>
    </div>
  );
}
