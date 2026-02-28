import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact the Nursing and Healthcare 2025 conference team. Questions about registration, abstracts, or logistics.",
  path: "conferences/nursing-and-healthcare-2025/contact-1",
});

export default function ConferenceContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Conference Contact</h1>
      <p className="mt-4 text-slate-600">
        Have a question about the Advancing Nursing and Healthcare Conference? Reach out for
        support with registration, abstracts, accommodation, visas, and logistics.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <ContactForm />
        </div>
        <ContactBlock />
      </div>
    </div>
  );
}
