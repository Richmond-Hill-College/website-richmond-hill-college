import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Invitation Letter",
  description:
    "Request an invitation letter for Nursing and Healthcare 2025. Visa support for conference attendees.",
  path: "conferences/nursing-and-healthcare-2025/invitation-letter",
});

export default function InvitationLetterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Invitation Letter</h1>
      <p className="mt-4 text-slate-600">
        Request an official invitation letter for visa purposes to attend the Advancing
        Nursing and Healthcare Conference: A Global Dialogue (November 28–30, 2025, Toronto).
      </p>
      <Link
        href="/conferences/nursing-and-healthcare-2025/contact-1"
        className="mt-6 inline-block font-medium text-slate-800 hover:underline"
      >
        Contact the conference team
      </Link>
    </div>
  );
}
