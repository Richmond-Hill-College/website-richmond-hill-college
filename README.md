# Richmond Hill College – Website

Next.js site (App Router) rebuilt from richmondhillcollege.ca, with **2-way sync** between GitHub and Vercel. All images are stored locally; SEO via metadata, sitemap, robots, and JSON-LD.

## App routes & sitemap

- **Sitemap:** XML at [`app/sitemap.ts`](app/sitemap.ts) (served as `/sitemap.xml`). Human-readable list at [`app/sitemap/page.tsx`](app/sitemap/page.tsx) (served as `/sitemap`). When adding a new page, add its path, priority, and label to [`lib/sitemap-routes.ts`](lib/sitemap-routes.ts) so both sitemap.xml and the sitemap page stay in sync; product pages come from [`lib/products.ts`](lib/products.ts).
- **Routes:** `/`, `/about-us`, `/about-us/team`, `/programs`, `/course-offerings`, `/bridging-programs`, `/my-account`, `/contact`, `/conferences`, `/conferences/nursing-and-healthcare-2025` (+ sub-pages: conference-main-page, registration, submit-abstract, invitation-letter, sponsorship, accommodations, program-table, abstract-proceeding-book, venue, contact-1), `/courses`, `/courses/categories`, `/courses/category/[slug]`, `/courses/[slug]`, `/products`, `/products/category/[category]`, `/product/[id]/[slug]`, `/faq`, `/faq/categories`, `/faq/category/[slug]`, `/faq/[slug]`, `/sitemap`.

## SEO, favicon & link previews

- **Favicon & Apple touch icon:** Generated in [`app/icon.tsx`](app/icon.tsx) and [`app/apple-icon.tsx`](app/apple-icon.tsx) (brand “RHC” on slate). Next.js serves these automatically.
- **URL thumbnails (OG/Twitter):** Default 1200×630 image from [`app/opengraph-image.tsx`](app/opengraph-image.tsx) and [`app/twitter-image.tsx`](app/twitter-image.tsx). Pages can override with a custom image path via the SEO helper.
- **SEO for new pages:** Use [`lib/seo.ts`](lib/seo.ts) `createPageMetadata()` in every new page so title, description, canonical URL, Open Graph, and Twitter card are set consistently. Then add the new route to [`lib/sitemap-routes.ts`](lib/sitemap-routes.ts) (and to the sitemap page; both sitemap.xml and `/sitemap` read from that file).

  ```ts
  import type { Metadata } from "next";
  import { createPageMetadata } from "@/lib/seo";

  export const metadata: Metadata = createPageMetadata({
    title: "Page Title",
    description: "Short description under ~160 characters.",
    path: "your-path",           // for canonical URL
    image: "/images/hero/…",     // optional; omit to use default OG image
  });
  ```

## 2-way sync (GitHub ↔ Vercel)

1. **Connect the repo in Vercel**
   - [Vercel Dashboard](https://vercel.com/dashboard) → **Add New** → **Project**
   - Import **Richmond-Hill-College/website-richmond-hill-college**
   - Vercel will detect Next.js and set build settings
   - Deploy

2. **What 2-way sync gives you**
   - **GitHub → Vercel:** Every push to the connected branch (e.g. `main`) triggers a production deploy. Pull requests get preview deployments.
   - **Vercel → GitHub:** (Optional) Use Vercel’s Git integration so preview/production URLs and status appear in GitHub (checks, comments).

3. **Local ↔ Vercel (optional)**
   - Install CLI: `npm i -g vercel`
   - In this repo: `vercel link` and pick the same Vercel project
   - Then `vercel` deploys a preview; `vercel --prod` deploys production. The `.vercel` folder is gitignored.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

- **Via GitHub:** Push to the connected branch; Vercel deploys automatically.
- **Via CLI:** `vercel` (preview) or `vercel --prod` (production), after `vercel link`.
