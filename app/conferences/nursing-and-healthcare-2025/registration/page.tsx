import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register for Nursing and Healthcare 2025. Advancing Nursing and Healthcare Conference, Toronto, November 28–30, 2025.",
};

export default function RegistrationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Nursing and Healthcare 2025
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Registration</h1>
      <p className="mt-4 text-slate-600">
        Register for the Advancing Nursing and Healthcare Conference: A Global Dialogue.
        Toronto, Canada — November 28–30, 2025. Early-bird rates available.
      </p>
      <p className="mt-4 text-slate-600">
        Choose your registration type (oral presentation, poster, virtual, student, non-presenting)
        and complete your registration via our product/registration pages.
      </p>
      <Link
        href="/conferences/nursing-and-healthcare-2025"
        className="mt-6 inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        View conference details
      </Link>
    </div>
  );
}
