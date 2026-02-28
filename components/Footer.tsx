import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/about-us/team", label: "Our Team" },
  { href: "/programs", label: "Programs" },
  { href: "/course-offerings", label: "Course Offerings" },
  { href: "/bridging-programs", label: "Bridging Programs" },
  { href: "/courses", label: "Courses" },
  { href: "/courses/categories", label: "Course Categories" },
  { href: "/products", label: "Products & Registration" },
  { href: "/conferences", label: "Conferences" },
  { href: "/my-account", label: "Account" },
  { href: "/faq", label: "FAQ" },
  { href: "/faq/categories", label: "FAQ by Category" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 tablet:px-8 tablet:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 tablet:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/images/logo/rhc-global-bridge-logo.png"
              alt="Richmond Hill College Global Bridge logo – healthcare and technology education platform"
              width={140}
              height={70}
              className="h-14 w-auto"
            />
            <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
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
                  <Link href={href} className="inline-flex min-h-[44px] items-center text-sm text-slate-600 hover:text-slate-900 tablet:min-h-[40px]">
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
