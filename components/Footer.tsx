"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAlternateLocale, getLocaleFromPathname, stripLocalePrefix, withLocale } from "@/lib/i18n-routing";

function getFooterLinkGroups(locale: "en" | "fr") {
  if (locale === "fr") {
    return [
      {
        heading: "A propos",
        links: [
          { href: "/about-us", label: "A propos" },
          { href: "/about-us/team", label: "Notre equipe" },
          { href: "/contact", label: "Contact" },
        ],
      },
      {
        heading: "Programmes et cours",
        links: [
          { href: "/programs", label: "Programmes" },
          { href: "/course-offerings", label: "Offre de cours" },
          { href: "/bridging-programs", label: "Programmes passerelles" },
          { href: "/courses", label: "Cours" },
          { href: "/courses/categories", label: "Categories de cours" },
          { href: "/products", label: "Produits et inscriptions" },
          { href: "/conferences", label: "Conferences" },
        ],
      },
      {
        heading: "Ressources",
        links: [
          { href: "/my-account", label: "Compte" },
          { href: "/faq", label: "FAQ" },
          { href: "/faq/categories", label: "FAQ par categorie" },
          { href: "/support", label: "Soutien" },
        ],
      },
      {
        heading: "Juridique",
        links: [
          { href: "/privacy-policy", label: "Politique de confidentialite" },
          { href: "/terms-of-service", label: "Conditions d'utilisation" },
        ],
      },
    ];
  }

  return [
    {
      heading: "About",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/about-us/team", label: "Our Team" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      heading: "Programs & Courses",
      links: [
        { href: "/programs", label: "Programs" },
        { href: "/course-offerings", label: "Course Offerings" },
        { href: "/bridging-programs", label: "Bridging Programs" },
        { href: "/courses", label: "Courses" },
        { href: "/courses/categories", label: "Course Categories" },
        { href: "/products", label: "Products & Registration" },
        { href: "/conferences", label: "Conferences" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { href: "/my-account", label: "Account" },
        { href: "/faq", label: "FAQ" },
        { href: "/faq/categories", label: "FAQ by Category" },
        { href: "/support", label: "Support" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms-of-service", label: "Terms of Service" },
      ],
    },
  ];
}

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const alternateLocale = getAlternateLocale(locale);
  const footerLinkGroups = getFooterLinkGroups(locale);
  const languageSwitchHref = withLocale(stripLocalePrefix(pathname || "/"), alternateLocale);
  const copy =
    locale === "fr"
      ? {
          description:
            "Richmond Hill College of Healthcare and Technology Management est dedie a l'autonomisation des personnes grace a une education de qualite en sante et en gestion des technologies.",
          contactHeading: "Nous joindre",
          languageSwitch: "English",
          privacy: "Confidentialite",
          terms: "Conditions",
        }
      : {
          description:
            "Richmond Hill College of Healthcare and Technology Management is dedicated to empowering individuals through quality education in healthcare and technology management. We focus on practical learning and industry-relevant skills to help students achieve their academic and professional goals.",
          contactHeading: "Get in touch",
          languageSwitch: "Francais",
          privacy: "Privacy",
          terms: "Terms",
        };

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
            <Link href={withLocale("/", locale)} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rhc-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rhc-primary-dark)]">
              <Image
                src="/images/logo/rhc-global-bridge-logo.png"
                alt="Richmond Hill College Global Bridge – healthcare and technology education"
                width={160}
                height={80}
                className="h-14 w-auto opacity-95 hover:opacity-100 lg:h-16"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 lg:text-base">
              {copy.description}
            </p>
          </div>

          {/* Link groups */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-4 lg:gap-6">
            {footerLinkGroups.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {group.heading}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {group.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={withLocale(href, locale)}
                        className="inline-flex min-h-[44px] items-center text-sm text-slate-300 transition-colors hover:text-[var(--rhc-primary)] focus:outline-none focus-visible:text-[var(--rhc-primary)] tablet:min-h-[40px]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Contact card */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              {copy.contactHeading}
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
              href={withLocale("/privacy-policy", locale)}
              className="text-slate-400 transition-colors hover:text-slate-200"
            >
              {copy.privacy}
            </Link>
            <Link
              href={withLocale("/terms-of-service", locale)}
              className="text-slate-400 transition-colors hover:text-slate-200"
            >
              {copy.terms}
            </Link>
            <Link
              href={languageSwitchHref}
              className="text-slate-300 transition-colors hover:text-white"
              hrefLang={alternateLocale}
              lang={alternateLocale}
            >
              {copy.languageSwitch}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
