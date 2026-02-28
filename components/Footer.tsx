import Link from "next/link";

const footerLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/course-offerings", label: "Course Offerings" },
  { href: "/bridging-programs", label: "Bridging Programs" },
  { href: "/conferences", label: "Conferences" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Richmond Hill College
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Richmond Hill College of Healthcare and Technology Management is dedicated to
              empowering individuals through quality education in healthcare and technology
              management. With a focus on practical learning and industry-relevant skills, we
              are committed to helping our students achieve their academic and professional
              goals.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Location
            </h3>
            <address className="mt-2 not-italic text-slate-600">
              <p>1 Sala Drive</p>
              <p>Richmond Hill, Ontario, Canada</p>
              <p className="mt-2">
                Phone:{" "}
                <a href="tel:+18553286065" className="hover:text-slate-900">
                  Toll-Free +1 855 (328) 6065
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:info@richmondhillcollege.ca" className="hover:text-slate-900">
                  info@richmondhillcollege.ca
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Quick links
            </h3>
            <ul className="mt-2 space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-slate-900">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Richmond Hill College of Healthcare and Technology
          Management.
        </div>
      </div>
    </footer>
  );
}
