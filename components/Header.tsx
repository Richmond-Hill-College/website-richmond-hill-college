import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/course-offerings", label: "Course Offerings" },
  { href: "/bridging-programs", label: "Bridging Programs" },
  { href: "/conferences", label: "Conferences" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Richmond Hill College home">
          <Image
            src="/images/logo/rhc-logo.png"
            alt="Richmond Hill College"
            width={140}
            height={70}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
