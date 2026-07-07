"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import MiniSearch from "minisearch";
import type { SearchDoc } from "@/lib/search-index";

type Props = {
  /** Build-time docs passed from a server component to avoid bundling all data twice. */
  docs: SearchDoc[];
  locale?: "en" | "fr";
};

const TYPE_LABEL_EN: Record<SearchDoc["type"], string> = {
  page: "Page",
  course: "Course",
  faq: "FAQ",
  product: "Product",
};
const TYPE_LABEL_FR: Record<SearchDoc["type"], string> = {
  page: "Page",
  course: "Cours",
  faq: "FAQ",
  product: "Produit",
};

export function SiteSearch({ docs, locale = "en" }: Props) {
  const isFr = locale === "fr";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const mini = useMemo(() => {
    // Filter by locale so EN search doesn't surface FR results and vice versa
    const localeDocs = docs.filter((d) => d.locale === locale);
    const m = new MiniSearch<SearchDoc>({
      fields: ["title", "description"],
      storeFields: ["title", "description", "url", "type"],
      idField: "id",
      searchOptions: {
        prefix: true,
        fuzzy: 0.2,
        boost: { title: 2 },
      },
    });
    m.addAll(localeDocs);
    return m;
  }, [docs, locale]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim() ? mini.search(query.trim()).slice(0, 30) : [];

  const t = isFr
    ? {
        placeholder: "Rechercher cours, programmes, FAQ…",
        empty: "Aucun résultat. Essayez un autre terme.",
        instructions: "Tapez pour rechercher dans tout le site.",
      }
    : {
        placeholder: "Search courses, programs, FAQ…",
        empty: "No results. Try a different term.",
        instructions: "Type to search the entire site.",
      };

  const typeLabel = isFr ? TYPE_LABEL_FR : TYPE_LABEL_EN;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <label htmlFor="site-search-input" className="sr-only">{t.placeholder}</label>
      <input
        id="site-search-input"
        ref={inputRef}
        type="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.placeholder}
        className="w-full min-h-[48px] rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-rhc-primary focus:outline-none focus:ring-2 focus:ring-rhc-primary/30"
      />
      {!query.trim() && (
        <p className="mt-3 text-sm text-slate-500">{t.instructions}</p>
      )}
      {query.trim() && results.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">{t.empty}</p>
      )}
      <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
        {results.map((r) => {
          // r contains stored fields plus minisearch metadata
          const doc = r as unknown as SearchDoc;
          return (
            <li key={doc.id}>
              <Link
                href={doc.url}
                className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-600">
                    {typeLabel[doc.type]}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{doc.title}</span>
                </span>
                {doc.description && (
                  <span className="line-clamp-2 text-sm text-slate-600">{doc.description}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
