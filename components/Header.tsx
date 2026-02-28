"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";

const LOGO_SRC = "/images/logo/rhc-logo.png";
const LOGO_ALT = "Richmond Hill College – healthcare and technology management logo";

type NavLink = { href: string; label: string };
type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "dropdown"; label: string; children: NavLink[] };

const navItems: NavItem[] = [
  { type: "link", href: "/", label: "Home" },
  {
    type: "dropdown",
    label: "About",
    children: [
      { href: "/about-us", label: "About Us" },
      { href: "/about-us/team", label: "Our Team" },
      { href: "/message-from-the-president", label: "Message from the President" },
    ],
  },
  {
    type: "dropdown",
    label: "Programs & Courses",
    children: [
      { href: "/programs", label: "Programs" },
      { href: "/course-offerings", label: "Course Offerings" },
      { href: "/bridging-programs", label: "Bridging Programs" },
      { href: "/courses", label: "Courses" },
      { href: "/courses/categories", label: "Course Categories" },
      { href: "/products", label: "Products & Registration" },
    ],
  },
  { type: "link", href: "/conferences", label: "Conferences" },
  {
    type: "dropdown",
    label: "Help",
    children: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  { type: "link", href: "/my-account", label: "Account" },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DesktopDropdown({ label, links }: { label: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    let cleanup: (() => void) | undefined;
    const id = setTimeout(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("click", handleClickOutside);
      cleanup = () => document.removeEventListener("click", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(id);
      cleanup?.();
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 tablet:px-4 tablet:text-[15px]"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`dropdown-${label.replace(/\s+/g, "-")}`}
        id={`dropdown-trigger-${label.replace(/\s+/g, "-")}`}
      >
        {label}
        <ChevronDown open={open} />
      </button>
      {/* -mt-1 pt-1 bridges the gap so hover from button to panel stays inside container */}
      <div
        id={`dropdown-${label.replace(/\s+/g, "-")}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={`dropdown-trigger-${label.replace(/\s+/g, "-")}`}
        className={
          "absolute right-0 top-full z-[100] -mt-1 pt-1 min-w-[200px] transition-[opacity,visibility] duration-150 " +
          (open ? "visible opacity-100" : "invisible pointer-events-none opacity-0")
        }
      >
        <div className="rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
        {links.map(({ href, label: linkLabel }) => (
          <Link
            key={href}
            href={href}
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            onClick={() => setOpen(false)}
          >
            {linkLabel}
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItems({ navItems: items, onLinkClick }: { navItems: NavItem[]; onLinkClick: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      {items.map((item) => {
        if (item.type === "link") {
          const isContact = item.href === "/contact";
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={
                isContact
                  ? "mt-2 rounded-lg px-6 py-3 min-h-[48px] inline-flex items-center justify-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640] border-b border-slate-100 pb-3"
                  : "py-3 text-base font-medium text-slate-700 hover:text-slate-900 border-b border-slate-100"
              }
              style={
                isContact
                  ? {
                      backgroundColor: "#f6520a",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
                    }
                  : undefined
              }
            >
              {item.label}
            </Link>
          );
        }
        const isOpen = expanded === item.label;
        return (
          <div key={`mobile-${item.label}`} className="border-b border-slate-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(isOpen ? null : item.label);
              }}
              className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-slate-700 hover:text-slate-900"
              aria-expanded={isOpen}
            >
              {item.label}
              <ChevronDown open={isOpen} />
            </button>
            <div className={isOpen ? "block" : "hidden"}>
              {item.children.map(({ href, label: linkLabel }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onLinkClick}
                  className="block py-2.5 pl-4 text-[15px] text-slate-600 hover:text-slate-900"
                >
                  {linkLabel}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-6 w-6 flex-col items-center justify-center gap-1.5" aria-hidden>
      <span
        className={
          "block h-0.5 w-5 origin-center bg-slate-700 transition-all duration-200 ease-out " +
          (open ? "translate-y-2 rotate-45" : "translate-y-0 rotate-0")
        }
      />
      <span
        className={
          "block h-0.5 w-5 bg-slate-700 transition-all duration-200 ease-out " +
          (open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100")
        }
      />
      <span
        className={
          "block h-0.5 w-5 origin-center bg-slate-700 transition-all duration-200 ease-out " +
          (open ? "-translate-y-2 -rotate-45" : "translate-y-0 rotate-0")
        }
      />
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-2 sm:h-16 sm:px-6 tablet:px-8 tablet:gap-6">
        <Link
          href="/"
          className="flex h-8 min-w-[120px] shrink-0 items-center gap-2 sm:h-9 tablet:h-10 tablet:min-w-[140px]"
          aria-label="Richmond Hill College home"
        >
          {logoError ? (
            <span className="text-lg font-bold text-rhc-primary-dark sm:text-xl">RHC</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width={140}
              height={70}
              className="h-8 w-auto sm:h-9 tablet:h-10"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        {/* Desktop nav only (lg+); tablet and phone use hamburger */}
        <nav className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-1 overflow-visible lg:gap-4" aria-label="Main navigation">
          {navItems.map((item, index) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 tablet:px-4 tablet:text-[15px]"
              >
                {item.label}
              </Link>
            ) : (
              <DesktopDropdown key={`dropdown-${index}`} label={item.label} links={item.children} />
            )
          )}
        </nav>

        {/* Desktop CTA (lg+): matches hero CTA style */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640] tablet:min-h-[44px] tablet:px-5 tablet:py-2.5 tablet:text-sm"
          style={{
            backgroundColor: "#f6520a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        >
          Contact
        </Link>

        {/* Mobile & tablet: hamburger button (hidden on lg+ desktop) */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile & tablet menu panel — collapsed height when closed so header stays compact */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={
          "lg:hidden grid transition-[grid-template-rows] duration-200 ease-out " +
          (menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          <div
            className={
              "border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 transition-opacity duration-200 " +
              (menuOpen ? "opacity-100" : "opacity-0")
            }
          >
            <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
            <MobileNavItems navItems={navItems} onLinkClick={closeMenu} />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
