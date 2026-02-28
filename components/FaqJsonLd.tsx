import { siteUrl } from "@/lib/site-url";
import type { FaqEntry } from "@/lib/faq";

/** FAQPage schema for the /faq index. */
export function FaqPageJsonLd({ entries }: { entries: FaqEntry[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Single Question schema for a /faq/[slug] page. */
export function FaqQuestionJsonLd({
  question,
  answer,
  slug,
}: {
  question: string;
  answer: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question,
    url: `${siteUrl}/faq/${slug}`,
    acceptedAnswer: { "@type": "Answer", text: answer },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
