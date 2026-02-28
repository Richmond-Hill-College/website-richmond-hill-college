import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Conferences and events at Richmond Hill College. Scientific conferences, meetings, and workshops with national and international participants.",
};

export default function ConferencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Conferences and Meetings
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        Welcome to the Conferences and Events page of Richmond Hill College. Here, we introduce
        our organized scientific conferences, meetings, and workshops that invite national and
        international participants.
      </p>

      <section className="mt-12" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="text-2xl font-bold text-slate-900">
          Upcoming Conferences
        </h2>
        <p className="mt-4 text-slate-600">
          Stay updated on our upcoming conferences that cover various topics such as technology,
          business, and healthcare. Join us and network with industry experts from around the
          world.
        </p>
        <Link
          href="/conferences/nursing-and-healthcare-2025"
          className="mt-4 inline-block font-medium text-slate-800 hover:underline"
        >
          Conferences List
        </Link>
      </section>

      <section className="mt-12" aria-labelledby="past-heading">
        <h2 id="past-heading" className="text-2xl font-bold text-slate-900">
          Past Conferences
        </h2>
        <p className="mt-4 text-slate-600">
          Learn about the successful events we have organized in the past, including keynote
          speakers, panel discussions, and workshops. Get insights into the knowledge shared
          and connections made.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="workshops-heading">
        <h2 id="workshops-heading" className="text-2xl font-bold text-slate-900">
          Customized Workshops
        </h2>
        <p className="mt-4 text-slate-600">
          Explore our customized workshops tailored to meet the specific needs of your
          organization. Enhance your team&apos;s skills and knowledge with our interactive
          and engaging sessions.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Join Us at Our Next Conference</h2>
        <p className="mt-2 text-slate-600">
          Don&apos;t miss out on the opportunity to participate in our upcoming conferences.
          Register now to secure your spot and expand your professional network.
        </p>
        <Link
          href="/conferences/nursing-and-healthcare-2025/registration"
          className="mt-4 inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}
