"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, stripLocalePrefix, withLocale } from "@/lib/i18n-routing";

function getNavItems(locale: "en" | "fr") {
  if (locale === "fr") {
    return [
      { href: "/", label: "Accueil", icon: HomeIcon },
      { href: "/programs", label: "Programmes", icon: ProgramsIcon },
      { href: "/courses", label: "Cours", icon: CoursesIcon },
      { href: "/conferences", label: "Conferences", icon: ConferencesIcon },
      { href: "/contact", label: "Contact", icon: ContactIcon },
    ];
  }

  return [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/programs", label: "Programs", icon: ProgramsIcon },
    { href: "/courses", label: "Courses", icon: CoursesIcon },
    { href: "/conferences", label: "Conferences", icon: ConferencesIcon },
    { href: "/contact", label: "Contact", icon: ContactIcon },
  ];
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={active ? 2 : 1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function ProgramsIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={active ? 2 : 1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  );
}

function CoursesIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={active ? 2 : 1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
      />
    </svg>
  );
}

function ConferencesIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={active ? 2 : 1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    </svg>
  );
}

function ContactIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={active ? 2 : 1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const navItems = getNavItems(locale);
  const normalizedPathname = stripLocalePrefix(pathname || "/");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      aria-label={locale === "fr" ? "Navigation mobile inferieure" : "Mobile bottom navigation"}
    >
      <div className="safe-area-pb border-t border-slate-200 bg-white/95 shadow-[0_-4px_6px_-1px_rgba(15,23,42,0.05)] backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-2 pt-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/"
                ? normalizedPathname === "/"
                : normalizedPathname === href || normalizedPathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={withLocale(href, locale)}
                className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white rounded-lg"
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={
                    isActive
                      ? "text-rhc-primary"
                      : "text-slate-500 transition-colors duration-150 hover:text-slate-700"
                  }
                >
                  <Icon active={isActive} />
                </span>
                <span
                  className={
                    "text-[10px] font-medium tabular-nums " +
                    (isActive ? "text-rhc-primary" : "text-slate-500")
                  }
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
