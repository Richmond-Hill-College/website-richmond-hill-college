import type { Metadata } from "next";
import Link from "next/link";
import content from "@/lib/conference-2025-archive.json";
import { siteUrl } from "@/lib/site-url";
import { ContactForm } from "@/components/ContactForm";
import styles from "./Conference2026Archive.module.css";

type ArchivePage = keyof typeof content;
const root = "/conferences/nursing-and-healthcare-2025";

export function conference2025Metadata(page: ArchivePage): Metadata {
  const item = content[page];
  const canonical = `${siteUrl}${item.path}`;
  return {
    title: { absolute: item.title }, description: item.description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
    openGraph: { title: item.title, description: item.description, url: canonical, type: "website", locale: "en_CA" },
    twitter: { card: "summary", title: item.title, description: item.description },
  };
}

export function Conference2025Archive({ page }: { page: ArchivePage }) {
  const item = content[page];
  return (
    <article lang="en" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={root} className="font-semibold text-slate-700 underline">← 2025 conference archive</Link>
      <aside aria-label="Past conference" className="my-7 rounded-xl border border-sky-200 bg-sky-50 p-5 text-slate-700">
        <strong className="block text-slate-900">2025 conference archive · November 28–30, 2025 · Toronto, Canada</strong>
        Registration, abstract submissions and invitation-letter requests for this edition are closed.
        The original information below is retained as a historical record, including past prices, deadlines and provisional venue information.
      </aside>
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{item.heading}</h1>
      <nav aria-label="2025 archive sections" className="my-6 flex flex-wrap gap-3">
        {Object.entries(content).map(([key, section]) => (
          <Link key={key} href={section.path} aria-current={key === page ? "page" : undefined} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 underline">{section.heading}</Link>
        ))}
      </nav>
      <div className={`${styles.content} overflow-x-auto`} dangerouslySetInnerHTML={{ __html: item.html }} />
      {page === "contact-1" && <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6"><ContactForm /></div>}
      <p className="mt-10 border-t border-slate-200 pt-6"><Link href="/contact" className="font-semibold underline">Contact Richmond Hill College about archived records or future conferences</Link></p>
    </article>
  );
}
