import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit Abstract",
  description:
    "Submit your abstract for Nursing and Healthcare 2025. Advancing Nursing and Healthcare Conference, Toronto, November 28–30, 2025.",
};

export default function SubmitAbstractPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Submit Abstract</h1>
      <p className="mt-4 text-slate-600">
        Submit your research abstract to contribute to the scientific program of the
        Advancing Nursing and Healthcare Conference: A Global Dialogue.
      </p>
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="mt-6 inline-block font-medium text-slate-800 hover:underline"
      >
        View conference details
      </Link>
    </div>
  );
}
