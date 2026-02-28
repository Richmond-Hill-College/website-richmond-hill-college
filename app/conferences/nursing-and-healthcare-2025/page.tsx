import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Nursing and Healthcare 2025",
  description:
    "Advancing Nursing and Healthcare Conference: A Global Dialogue. Toronto, Canada, November 28–30, 2025. Register, submit abstracts, and join healthcare professionals worldwide.",
  path: "conferences/nursing-and-healthcare-2025",
});

const navItems = [
  { href: "/conferences/nursing-and-healthcare-2025/conference-main-page", label: "Main Page" },
  { href: "/conferences/nursing-and-healthcare-2025/registration", label: "Registration" },
  { href: "/conferences/nursing-and-healthcare-2025/submit-abstract", label: "Submit Abstract" },
  { href: "/conferences/nursing-and-healthcare-2025/invitation-letter", label: "Invitation Letter" },
  { href: "/conferences/nursing-and-healthcare-2025/sponsorship", label: "Sponsorship" },
  { href: "/conferences/nursing-and-healthcare-2025/accommodations", label: "Accommodations" },
  { href: "/conferences/nursing-and-healthcare-2025/program-table", label: "Program Table" },
  { href: "/conferences/nursing-and-healthcare-2025/abstract-proceeding-book", label: "Abstract Proceeding Book" },
  { href: "/conferences/nursing-and-healthcare-2025/venue", label: "Venue" },
  { href: "/conferences/nursing-and-healthcare-2025/contact-1", label: "Contact" },
];

export default function NursingHealthcare2025Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-6" aria-label="Conference sections">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            {label}
          </Link>
        ))}
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Nursing and Healthcare 2025
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Advancing Nursing and Healthcare Conference: A Global Dialogue
      </p>
      <p className="mt-1 text-slate-600">Toronto, Canada — November 28–30, 2025</p>

      <section className="mt-10" aria-labelledby="welcome-heading">
        <h2 id="welcome-heading" className="text-2xl font-bold text-slate-900">
          Welcome Message from the Conference Chairman
        </h2>
        <p className="mt-4 text-slate-600">
          Dear Esteemed Colleagues, Distinguished Guests, and Healthcare Visionaries,
        </p>
        <p className="mt-2 text-slate-600">
          On behalf of the Organizing Committee and Scientific Committee, it is my great honor
          and privilege to welcome you to the Advancing Nursing and Healthcare Conference:
          A Global Dialogue, taking place in Toronto, Canada, from November 28–30, 2025.
        </p>
        <p className="mt-2 text-slate-600">
          This conference represents a pivotal gathering of nurses, healthcare
          professionals, researchers, policymakers, and industry leaders from across the
          globe, united by a shared mission: to advance the future of nursing and
          interdisciplinary healthcare through innovation, collaboration, and evidence-based
          practice.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="why-heading">
        <h3 id="why-heading" className="text-xl font-bold text-slate-900">
          Why This Conference Matters
        </h3>
        <p className="mt-2 text-slate-600">
          In an era of rapid technological advancements, evolving healthcare policies, and
          unprecedented global health challenges, the role of nursing has never been more
          critical. This conference is designed to foster meaningful dialogue, knowledge
          exchange, and actionable strategies to address the pressing issues facing our
          profession. Whether you are a clinician, educator, researcher, or administrator,
          your voice and expertise are vital to shaping the next chapter of healthcare.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="themes-heading">
        <h3 id="themes-heading" className="text-xl font-bold text-slate-900">
          Key Themes &amp; Opportunities
        </h3>
        <p className="mt-2 text-slate-600">
          Over three dynamic days, we will delve into the following core themes:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong className="text-slate-800">Innovations in Nursing Practice</strong> —
            Discover cutting-edge methodologies, digital health solutions, and transformative
            technologies redefining patient care.
          </li>
          <li>
            <strong className="text-slate-800">Healthcare Policy and Management</strong> —
            Examine the intersection of policy, leadership, and frontline delivery to
            optimize healthcare systems worldwide.
          </li>
          <li>
            <strong className="text-slate-800">Mental Health and Wellbeing</strong> — Address
            the escalating demand for mental health support—for both patients and healthcare
            providers—in diverse settings.
          </li>
          <li>
            <strong className="text-slate-800">Patient Safety and Quality Care</strong> —
            Share best practices, protocols, and research to enhance outcomes and reduce
            risks in clinical environments.
          </li>
          <li>
            <strong className="text-slate-800">Global Health Challenges</strong> — Collaborate
            on strategies to strengthen nursing&apos;s role in pandemic response, health
            equity, and humanitarian crises.
          </li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="expect-heading">
        <h3 id="expect-heading" className="text-xl font-bold text-slate-900">
          What to Expect
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
          <li>Engaging Keynotes: Hear from renowned experts driving change in healthcare.</li>
          <li>Interactive Workshops: Gain hands-on experience with emerging tools and techniques.</li>
          <li>Research Presentations: Explore groundbreaking studies and evidence-based solutions.</li>
          <li>Networking Opportunities: Connect with peers to build lasting professional relationships.</li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="next-heading">
        <h3 id="next-heading" className="text-xl font-bold text-slate-900">
          Next Steps
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
          <li>Register early to take advantage of extended early-bird rates and allow time for visa processing.</li>
          <li>Submit your abstract to contribute to the scientific program.</li>
          <li>Reach out to our team for support with accommodation, visas, and logistics.</li>
        </ul>
      </section>

      <p className="mt-8 text-slate-600">
        Warm regards,
        <br />
        <strong>Soheil Najafi Mehri, RN, MSN, PhD</strong>
        <br />
        Chairman, Nursing and Healthcare Conference: A Global Dialogue
        <br />
        Richmond Hill College of Healthcare and Technology Management, Richmond Hill, ON, Canada
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/conferences/nursing-and-healthcare-2025/registration"
          className="cta-primary rounded-md px-4 py-2 text-sm font-medium"
        >
          Register Now
        </Link>
        <Link
          href="/conferences/nursing-and-healthcare-2025/conference-main-page"
          className="inline-block font-medium text-slate-800 hover:underline"
        >
          More Information
        </Link>
      </div>
    </div>
  );
}
