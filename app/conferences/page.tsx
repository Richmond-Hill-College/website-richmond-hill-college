import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { GeneratedVisual } from "@/components/GeneratedVisual";

export const metadata: Metadata = createPageMetadata({
  title: "Conferences",
  description:
    "Conferences and events at Richmond Hill College. Scientific conferences, meetings, and workshops with national and international participants.",
  path: "conferences",
  image: "/images/generated/library/nursing-conference.png",
  imageWidth: 1672,
  imageHeight: 941,
});

export default function ConferencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f6520a]">
            Knowledge, practice, and professional connection
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Conferences and Meetings
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Richmond Hill College organizes scientific conferences, meetings, and workshops
            that bring together national and international participants across healthcare,
            technology, and professional practice.
          </p>
          <Link href="/conferences/nursing-and-healthcare-2025" className="cta-primary mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold">
            Explore the 2025 conference archive
          </Link>
        </div>
        <GeneratedVisual
          visualKey="nursingConference"
          priority
          className="rounded-2xl shadow-xl ring-1 ring-slate-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

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
          className="cta-primary mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}
