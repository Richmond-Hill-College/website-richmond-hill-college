import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[#192640] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#243b5a] focus:outline-none focus:ring-2 focus:ring-[#192640] focus:ring-offset-2"
      >
        Back to home
      </Link>
    </div>
  );
}
