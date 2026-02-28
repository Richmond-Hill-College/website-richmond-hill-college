import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abstract Proceeding Book",
  description:
    "Abstract proceeding book for Nursing and Healthcare 2025. Conference abstracts and proceedings.",
};

export default function AbstractProceedingBookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Abstract Proceeding Book</h1>
      <p className="mt-4 text-slate-600">
        Conference abstract proceeding book for the Advancing Nursing and Healthcare
        Conference: A Global Dialogue (November 28–30, 2025, Toronto).
      </p>
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="mt-6 inline-block font-medium text-slate-800 hover:underline"
      >
        View conference overview
      </Link>
    </div>
  );
}
