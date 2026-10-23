import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import content from "@/lib/conference-2026-content.json";
import { siteUrl } from "@/lib/site-url";
import styles from "./Conference2026Archive.module.css";

export type Conference2026Page = keyof typeof content;
const root = "/conferences/nursing-and-healthcare-2026";
const banner = "/images/webador/advancing_nursing_and_healthecare_conference_canada-high.png";
const links = [
  [root, "Overview"],
  [`${root}/confernce-main-pages`, "Conference details"],
  [`${root}/sponsership-and-partnership`, "Sponsorship and partnership"],
] as const;

export function conference2026Metadata(page: Conference2026Page): Metadata {
  const item = content[page];
  const canonical = `${siteUrl}${item.path}`;
  return {
    // Preserve existing indexed titles, including legacy spelling, without
    // adding the root layout title suffix a second time.
    title: { absolute: item.originalTitle },
    description: item.description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
    openGraph: {
      title: item.originalTitle, description: item.description, url: canonical,
      type: "website", locale: "en_CA", siteName: "Richmond Hill College",
      images: [{ url: banner, width: 1536, height: 532, alt: "Nursing and Healthcare Conference, September 17–19, 2026, Toronto" }],
    },
    twitter: { card: "summary_large_image", title: item.originalTitle, description: item.description, images: [banner] },
  };
}

export function Conference2026Archive({ page }: { page: Conference2026Page }) {
  const item = content[page];
  return (
    <article lang="en" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 tablet:px-8 tablet:py-14 lg:px-8">
      <Link href="/conferences" className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900">
        ← Conferences
      </Link>
      <div className="mt-6 overflow-hidden rounded-2xl bg-slate-950 shadow-sm">
        <Image src={banner} alt="The 2nd International Conference on Advancing Nursing and Healthcare, September 17–19, 2026, Toronto, Canada" width={1536} height={532} priority sizes="(max-width: 1152px) 100vw, 1152px" className="h-auto w-full" />
      </div>
      <nav aria-label="2026 conference sections" className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-6">
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={href === item.path ? "page" : undefined} className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${href === item.path ? "bg-rhc-primary-dark text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            {label}
          </Link>
        ))}
      </nav>
      <aside aria-label="Past conference" className="mt-7 rounded-xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm leading-6 text-slate-700">
        <strong className="block text-slate-900">2026 conference archive · September 17–19, 2026 · Toronto, Canada</strong>
        Registration and sponsorship applications for this edition are closed. <Link href="/contact" className="font-semibold underline underline-offset-2">Contact us about future conferences.</Link>
      </aside>
      <h1 className="mt-8 max-w-5xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{item.heading}</h1>
      <div className={`${styles.content} mt-7`}>
        {item.blocks.map((block, index) => "images" in block && block.images ? (
          <div key={index} className="my-7 flex flex-wrap items-center gap-4" aria-label="Conference image gallery">
            {block.images.map((image) => (
              <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={block.images.length > 1 ? "96px" : "260px"} className={block.images.length > 1 ? "h-14 w-24 rounded object-contain" : "h-auto w-56 max-w-full rounded object-contain"} />
            ))}
          </div>
        ) : block.type === "html" ? (
          // Generated offline by scripts/restore-conference-2026.py from an
          // explicit semantic allowlist; no remote scripts/forms/inline styles.
          <section key={index} className="min-w-0" dangerouslySetInnerHTML={{ __html: "html" in block ? block.html ?? "" : "" }} />
        ) : "src" in block && block.src ? (
          <figure key={index} className="my-6 max-w-sm">
            <Image src={block.src} alt={block.alt ?? ""} width={block.width ?? 600} height={block.height ?? 400} sizes="(max-width: 640px) 90vw, 384px" className="h-auto max-w-full object-contain" />
          </figure>
        ) : null)}
      </div>
      {page === "details" && (
        <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <a href="/downloads/conference-2026/abstract-template.docx" className="font-semibold text-slate-800 underline underline-offset-4">Download the abstract template (Word document)</a>
        </p>
      )}
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-7">
        <Link href="/contact" className="cta-primary inline-flex rounded-lg px-5 py-3 text-sm font-semibold">Contact the conference team</Link>
        <Link href="/conferences/nursing-and-healthcare-2025" className="text-sm font-semibold text-slate-700 underline underline-offset-4">View the 2025 conference archive</Link>
      </div>
    </article>
  );
}
