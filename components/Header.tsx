"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";

const LOGO_SRC = "/images/logo/rhc-logo.png";
const LOGO_ALT = "Richmond Hill College – healthcare and technology management logo";

type NavLink = { href: string; label: string; labelFr?: string };
type NavItem =
  | { type: "link"; href: string; label: string; labelFr?: string }
  | { type: "dropdown"; label: string; labelFr?: string; children: NavLink[] };

const navItems: NavItem[] = [
  { type: "link", href: "/", label: "Home", labelFr: "Accueil" },
  {
    type: "dropdown",
    label: "About",
    labelFr: "À propos",
    children: [
      { href: "/about-us", label: "About Us", labelFr: "À propos" },
      { href: "/about-us/team", label: "Our Team", labelFr: "Notre équipe" },
      { href: "/message-from-the-president", label: "Message from the President", labelFr: "Message de la présidente" },
    ],
  },
  {
    type: "dropdown",
    label: "Programs & Courses",
    labelFr: "Programmes et cours",
    children: [
      { href: "/programs", label: "Programs", labelFr: "Programmes" },
      { href: "/course-offerings", label: "Course Offerings", labelFr: "Offre de cours" },
      { href: "/bridging-programs", label: "Bridging Programs", labelFr: "Programmes de transition" },
      { href: "/courses", label: "Courses", labelFr: "Cours" },
      { href: "/courses/categories", label: "Course Categories", labelFr: "Catégories de cours" },
      { href: "/products", label: "Products & Registration", labelFr: "Produits et inscription" },
    ],
  },
  { type: "link", href: "/conferences", label: "Conferences", labelFr: "Conférences" },
  {
    type: "dropdown",
    label: "Help",
    labelFr: "Aide",
    children: [
      { href: "/faq", label: "FAQ", labelFr: "FAQ" },
      { href: "/contact", label: "Contact", labelFr: "Contact" },
    ],
  },
  { type: "link", href: "/my-account", label: "Account", labelFr: "Mon compte" },
];

const mobilePressStateClass =
  "transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.99] active:bg-slate-100";

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

function prefixHref(prefix: string, href: string) {
  const path = prefix + (href === "/" ? "" : href);
  return path || "/";
}

function DesktopDropdown({
  label,
  links,
  localePrefix,
}: {
  label: string;
  links: NavLink[];
  localePrefix: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const scheduleClose = useCallback(() => {
    closeTimeoutRef.current = setTimeout(closeMenu, 150);
  }, [closeMenu]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, closeMenu]);

  const dropdownId = `dropdown-${label.replace(/\s+/g, "-")}`;
  const triggerId = `dropdown-trigger-${label.replace(/\s+/g, "-")}`;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="min-h-[40px] min-w-[36px] flex items-center justify-center gap-0.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:px-3 xl:text-sm"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={dropdownId}
        id={triggerId}
      >
        {label}
        <ChevronDown open={open} />
      </button>
      <div
        id={dropdownId}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={triggerId}
        className={
          "absolute right-0 top-full z-[100] min-w-[200px] pt-0.5 " +
          "transition-[opacity,visibility] duration-150 " +
          (open ? "visible opacity-100" : "invisible pointer-events-none opacity-0")
        }
      >
        <div className="rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {links.map(({ href, label: linkLabel }) => (
            <Link
              key={href}
              href={prefixHref(localePrefix, href)}
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              onClick={closeMenu}
            >
              {linkLabel}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItems({
  navItems: items,
  onLinkClick,
  localePrefix,
}: {
  navItems: NavItem[];
  onLinkClick: () => void;
  localePrefix: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const isFr = localePrefix === "/fr";
  const label = (item: NavItem) => (isFr ? (item.labelFr ?? item.label) : item.label);
  const linkLabel = (link: NavLink) => (isFr ? (link.labelFr ?? link.label) : link.label);
  return (
    <>
      {items.map((item) => {
        const itemLabel = label(item);
        if (item.type === "link") {
          const isContact = item.href === "/contact";
          return (
            <Link
              key={item.href}
              href={prefixHref(localePrefix, item.href)}
              onClick={onLinkClick}
              className={
                isContact
                  ? "mt-2 rounded-lg px-6 py-3 min-h-[48px] inline-flex items-center justify-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-[opacity,transform,box-shadow] duration-150 hover:opacity-95 active:scale-[0.99] active:opacity-90 active:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640] border-b border-slate-100 pb-3"
                  : `block w-full rounded-md px-2 py-3 text-base font-medium text-slate-700 hover:text-slate-900 active:text-slate-900 border-b border-slate-100 ${mobilePressStateClass}`
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
              {itemLabel}
            </Link>
          );
        }
        const isOpen = expanded === itemLabel;
        return (
          <div key={`mobile-${itemLabel}`} className="border-b border-slate-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(isOpen ? null : itemLabel);
              }}
              className={`flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-base font-medium text-slate-700 hover:text-slate-900 active:text-slate-900 ${mobilePressStateClass}`}
              aria-expanded={isOpen}
            >
              {itemLabel}
              <ChevronDown open={isOpen} />
            </button>
            <div className={isOpen ? "block" : "hidden"}>
              {item.children.map((link) => (
                <Link
                  key={link.href}
                  href={prefixHref(localePrefix, link.href)}
                  onClick={onLinkClick}
                  className={`block rounded-md px-4 py-2.5 text-[15px] text-slate-600 hover:text-slate-900 active:text-slate-900 ${mobilePressStateClass}`}
                >
                  {linkLabel(link)}
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

function LanguageSwitch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const pathname = usePathname() ?? "/";
  const [clientPath, setClientPath] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window.location.pathname;
    if (w && w !== "/" && (pathname === "/" || pathname === "")) setClientPath(w);
    else setClientPath(null);
  }, [pathname]);
  const pathForFr = clientPath ?? pathname;
  const isFrench = pathForFr.startsWith("/fr");
  const enPath = isFrench ? (pathForFr.replace(/^\/fr\/?/, "/") || "/") : pathForFr;
  const frPath = isFrench ? pathForFr : (pathForFr === "/" || pathForFr === "" ? "/fr" : `/fr${pathForFr}`);

  const linkClass =
    variant === "desktop"
      ? "min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
      : "flex items-center gap-2 rounded-md px-2 py-3 text-base font-medium border-b border-slate-100";

  return (
    <div
      className={
        variant === "desktop"
          ? "hidden lg:flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50/80 p-0.5"
          : "flex items-center gap-1 border-b border-slate-100 pb-3"
      }
      role="group"
      aria-label="Language"
    >
      <Link
        href={enPath}
        className={`${linkClass} ${!isFrench ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"} ${variant === "mobile" ? mobilePressStateClass : ""}`}
        aria-current={!isFrench ? "page" : undefined}
      >
        EN
      </Link>
      <span className="text-slate-300 select-none" aria-hidden>
        |
      </span>
      <Link
        href={frPath}
        className={`${linkClass} ${isFrench ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"} ${variant === "mobile" ? mobilePressStateClass : ""}`}
        aria-current={isFrench ? "page" : undefined}
      >
        FR
      </Link>
    </div>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const localePrefix = pathname.startsWith("/fr") ? "/fr" : "";
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
          href={localePrefix || "/"}
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

        {/* Desktop nav only (lg+); single row, no wrap; min-w-0 so it can shrink in flex */}
        <nav className="hidden lg:flex lg:flex-nowrap lg:items-center lg:justify-end lg:gap-2 xl:gap-3 min-w-0 overflow-visible" aria-label="Main navigation">
          {navItems.map((item, index) => {
            const isFr = localePrefix === "/fr";
            const label = (item.type === "link" ? (item.labelFr ?? item.label) : (item.labelFr ?? item.label)) as string;
            const children = item.type === "dropdown" ? item.children.map((link) => ({ ...link, label: (isFr ? link.labelFr ?? link.label : link.label) })) : [];
            return item.type === "link" ? (
              <Link
                key={item.href}
                href={prefixHref(localePrefix, item.href)}
                className="min-h-[40px] min-w-[36px] flex items-center justify-center rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:px-3 xl:text-sm"
              >
                {label}
              </Link>
            ) : (
              <DesktopDropdown
                key={`dropdown-${index}`}
                label={label}
                links={children}
                localePrefix={localePrefix}
              />
            );
          })}
        </nav>

        {/* Language switch: EN | FR (desktop) */}
        <LanguageSwitch variant="desktop" />

        {/* Desktop CTA (lg+): matches hero CTA style */}
        <Link
          href={localePrefix + "/contact"}
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
          aria-label={
            localePrefix === "/fr"
              ? menuOpen
                ? "Fermer le menu"
                : "Ouvrir le menu"
              : menuOpen
                ? "Close menu"
                : "Open menu"
          }
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile & tablet menu panel — max-height so expanded sub-pages are visible and scrollable */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={
          "lg:hidden overflow-hidden transition-[max-height] duration-200 ease-out " +
          (menuOpen ? "max-h-[min(80vh,600px)]" : "max-h-0")
        }
      >
        <div
          className={
            "border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 transition-opacity duration-200 overflow-y-auto " +
            (menuOpen ? "opacity-100" : "opacity-0")
          }
        >
          <nav className="flex flex-col px-4 py-4" aria-label="Mobile navigation">
            <div className="mb-3">
              <LanguageSwitch variant="mobile" />
            </div>
            <MobileNavItems
              navItems={navItems}
              onLinkClick={closeMenu}
              localePrefix={localePrefix}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
