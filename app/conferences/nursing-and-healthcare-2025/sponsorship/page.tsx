import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Sponsorship opportunities for Nursing and Healthcare 2025. Partner with the Advancing Nursing and Healthcare Conference.",
};

export default function SponsorshipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Sponsorship</h1>
      <p className="mt-4 text-slate-600">
        Partner with the Advancing Nursing and Healthcare Conference: A Global Dialogue.
        Gold, silver, and bronze sponsorship packages available.
      </p>
      <Link
        href="/conferences/nursing-and-healthcare-2025/contact-1"
        className="mt-6 inline-block font-medium text-slate-800 hover:underline"
      >
        Contact us for sponsorship
      </Link>
    </div>
  );
}
