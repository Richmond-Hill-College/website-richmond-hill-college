import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { TEAM_MEMBERS } from "@/lib/team";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the leadership at Richmond Hill College. Dr. Soheila Hafezi leads our mission to empower internationally educated learners through Global Bridge Programs.",
  path: "about-us/team",
});

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 tablet:px-8 tablet:py-20 lg:px-8">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li>
            <Link href="/about-us" className="hover:text-slate-900">
              About Us
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">Our Team</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tablet:text-4xl">
        Our Team
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5">
        Leadership and key people at Richmond Hill College of Healthcare and Technology Management.
      </p>

      <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-1 tablet:gap-8">
        {TEAM_MEMBERS.map((member) => (
          <li
            key={member.name}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {member.href ? (
                    <Link
                      href={member.href}
                      className="text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
                    >
                      {member.name}
                    </Link>
                  ) : (
                    member.name
                  )}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-3 text-slate-600">{member.bio}</p>
                )}
              </div>
              {member.href && (
                <Link
                  href={member.href}
                  className="mt-4 shrink-0 text-sm font-medium text-slate-700 hover:text-slate-900 sm:mt-0"
                >
                  Read more →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 tablet:mt-12">
        <Link href="/about-us" className="text-slate-600 hover:text-slate-900">
          ← About Us
        </Link>
      </p>
    </div>
  );
}
