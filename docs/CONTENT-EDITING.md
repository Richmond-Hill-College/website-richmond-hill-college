# Content editing guide

The site has no CMS — content lives in TypeScript data files under `lib/`. Each section below shows where to edit and what to update afterwards.

> **Workflow:** edit → run `npm run dev` to preview → commit + push → Vercel auto-deploys.

## Add or edit a course

File: `lib/rhc-global-bridge-courses.ts`

Each course is an object with `id`, `name`, `slug`, `category`, `image`, `price`, `duration`, `description`, etc. Add a new entry to the array. The course detail page is generated automatically from the slug.

If you add a new course **category**, also update the category navigation in `app/courses/categories/page.tsx`.

## Add or edit FAQ

File: `lib/faq.ts`

Two arrays: `faqsEn` and `faqsFr`. Each entry has `id`, `category`, `question`, `answer`. Categories are slugs — they show up as `/faq/category/{slug}`.

After editing, the FAQ landing page (`/faq`), category pages (`/faq/category/[slug]`), and individual question pages (`/faq/[slug]`) all update automatically.

## Add or edit a team member

File: `lib/team.ts`

Add an entry with `name`, `title`, `bio`, `image`. Place the image under `public/images/team/`.

## Edit hero carousel

File: `lib/hero.ts`

Each slide has `src`, `alt`, `title`, `subtitle`, `cta`. The first slide is also exported as `FIRST_HERO_IMAGE` and used as the default OpenGraph image, so make it a strong general-purpose photo.

## Add or edit a static page

1. Create `app/{your-path}/page.tsx`. Use `createPageMetadata` from `lib/seo.ts`.
2. Create `app/fr/{your-path}/page.tsx` for the French version. If FR is not ready, the catch-all redirects FR users to the EN URL — no action needed.
3. Add the path to `lib/sitemap-routes.ts` so it shows in `/sitemap` and `/sitemap.xml`.

```tsx
// app/your-path/page.tsx
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Your Page",
  description: "Short description under ~160 characters.",
  path: "your-path",
});

export default function YourPage() {
  return <main>...</main>;
}
```

## Update an announcement banner

File: `components/AnnouncementBanner.tsx`

Edit the message strings directly. Set the component to return `null` to hide it.

## Edit footer / header links

Files: `components/Footer.tsx` and `components/Header.tsx`. Look for the `links` arrays.

## Add an image

Place files under `public/images/{section}/{filename.jpg}`. Reference them with `/images/{section}/{filename.jpg}`. Use `next/image` for performance and responsive sizing:

```tsx
import Image from "next/image";

<Image
  src="/images/team/jane-doe.jpg"
  alt="Jane Doe, Director of Admissions"
  width={400}
  height={500}
/>
```

## Don't break

- **Don't edit `lib/sitemap-routes.ts` casually** — it controls SEO indexing.
- **Don't remove `index: false` from the conference subpages** — those are intentionally noindex.
- **Always pair EN and FR** — when adding a new path, either add both pages or rely on the catch-all redirect.
- **Test locally first** — `npm run dev` then click around before pushing.
