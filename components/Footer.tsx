"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function prefixHref(prefix: string, href: string) {
  const path = prefix + (href === "/" ? "" : href);
  return path || "/";
}

const footerLinkGroups = [
  {
    heading: "About",
    headingFr: "À propos",
    links: [
      { href: "/about-us", label: "About Us", labelFr: "À propos" },
      { href: "/about-us/team", label: "Our Team", labelFr: "Notre équipe" },
      { href: "/contact", label: "Contact", labelFr: "Contact" },
    ],
  },
  {
    heading: "Programs & Courses",
    headingFr: "Programmes et cours",
    links: [
      { href: "/programs", label: "Programs", labelFr: "Programmes" },
      { href: "/course-offerings", label: "Course Offerings", labelFr: "Offre de cours" },
      { href: "/bridging-programs", label: "Bridging Programs", labelFr: "Programmes de transition" },
      { href: "/courses", label: "Courses", labelFr: "Cours" },
      { href: "/courses/categories", label: "Course Categories", labelFr: "Catégories de cours" },
      { href: "/products", label: "Products & Registration", labelFr: "Produits et inscription" },
      { href: "/conferences", label: "Conferences", labelFr: "Conférences" },
    ],
  },
  {
    heading: "Resources",
    headingFr: "Ressources",
    links: [
      { href: "/my-account", label: "Account", labelFr: "Mon compte" },
      { href: "/faq", label: "FAQ", labelFr: "FAQ" },
      { href: "/faq/categories", label: "FAQ by Category", labelFr: "FAQ par catégorie" },
      { href: "/support", label: "Support", labelFr: "Support" },
    ],
  },
  {
    heading: "Legal",
    headingFr: "Mentions légales",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy", labelFr: "Politique de confidentialité" },
      { href: "/terms-of-service", label: "Terms of Service", labelFr: "Conditions d'utilisation" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname() ?? "/";
  const localePrefix = pathname.startsWith("/fr") ? "/fr" : "";
  const isFr = localePrefix === "/fr";

  return (
    <footer
      className="relative border-t-4 border-[var(--rhc-primary)] bg-[var(--rhc-primary-dark)] text-slate-200"
      role="contentinfo"
    >
      {/* Subtle gradient overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "linear-gradient(135deg, var(--rhc-primary) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 tablet:px-8 tablet:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 tablet:gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link
              href={prefixHref(localePrefix, "/")}
              aria-label={isFr ? "Accueil Richmond Hill College" : "Richmond Hill College home"}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rhc-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rhc-primary-dark)]"
            >
              <Image
                src="/images/logo/rhc-global-bridge-logo.png"
                alt=""
                aria-hidden
                width={160}
                height={80}
                className="h-14 w-auto opacity-95 hover:opacity-100 lg:h-16"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 lg:text-base">
              {isFr
                ? "Le Collège Richmond Hill de gestion des soins de santé et de la technologie s'engage à offrir une formation de qualité pour permettre à chacun de réaliser ses objectifs académiques et professionnels. Nous privilégions l'apprentissage pratique et les compétences reconnues par l'industrie."
                : "Richmond Hill College of Healthcare and Technology Management is dedicated to empowering individuals through quality education in healthcare and technology management. We focus on practical learning and industry-relevant skills to help students achieve their academic and professional goals."}
            </p>
          </div>

          {/* Link groups */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-4 lg:gap-6">
            {footerLinkGroups.map((group) => {
              const heading = isFr ? (group.headingFr ?? group.heading) : group.heading;
              return (
                <nav key={group.heading} aria-label={heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    {heading}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {group.links.map((link) => {
                      const label = isFr ? (link.labelFr ?? link.label) : link.label;
                      return (
                        <li key={link.href}>
                          <Link
                            href={prefixHref(localePrefix, link.href)}
                            className="inline-flex min-h-[44px] items-center text-sm text-slate-300 transition-colors hover:text-[var(--rhc-primary)] focus:outline-none focus-visible:text-[var(--rhc-primary)] tablet:min-h-[40px]"
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </div>

          {/* Contact card */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              {isFr ? "Nous joindre" : "Get in touch"}
            </h3>
            <address className="mt-3 not-italic text-sm text-slate-300">
              <p className="font-medium text-white">1 Sala Drive</p>
              <p>Richmond Hill, Ontario, Canada</p>
              <p className="mt-3">
                <a
                  href="tel:+18553286065"
                  className="text-slate-300 transition-colors hover:text-[var(--rhc-primary)] focus:outline-none focus-visible:text-[var(--rhc-primary)]"
                >
                  Toll-Free +1 855 (328) 6065
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="mailto:info@richmondhillcollege.ca"
                  className="break-all text-slate-300 transition-colors hover:text-[var(--rhc-primary)] focus:outline-none focus-visible:text-[var(--rhc-primary)]"
                >
                  info@richmondhillcollege.ca
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Richmond Hill College of
            Healthcare and Technology Management
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
            <Link
              href={prefixHref(localePrefix, "/privacy-policy")}
              className="text-slate-400 transition-colors hover:text-slate-200"
            >
              {isFr ? "Confidentialité" : "Privacy"}
            </Link>
            <Link
              href={prefixHref(localePrefix, "/terms-of-service")}
              className="text-slate-400 transition-colors hover:text-slate-200"
            >
              {isFr ? "Conditions" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
