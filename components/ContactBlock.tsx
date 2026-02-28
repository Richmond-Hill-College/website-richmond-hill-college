"use client";

import { LocationMap } from "@/components/LocationMap";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n-routing";

const DIRECTIONS_LINK =
  "https://www.google.com/maps/dir//1+Sala+Drive,Richmond+Hill,Ontario,Canada";

export function ContactBlock() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy =
    locale === "fr"
      ? {
          heading: "Emplacement",
          directions: "Obtenir l'itineraire",
          phone: "Telephone",
          email: "Courriel",
        }
      : {
          heading: "Location",
          directions: "Get directions",
          phone: "Phone",
          email: "Email",
        };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{copy.heading}</h3>
      <div className="mt-3">
        <LocationMap />
      </div>
      <address className="mt-4 not-italic text-slate-600">
        <p>Richmond Hill College</p>
        <p>1 Sala Drive, Richmond Hill, Ontario, Canada</p>
        <p className="mt-2">
          <a
            href={DIRECTIONS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800 hover:underline"
          >
            {copy.directions}
          </a>
        </p>
        <p className="mt-2">
          {copy.phone}:{" "}
          <a href="tel:+18553286065" className="text-slate-800 hover:underline">
            Toll-Free +1 855 (328) 6065
          </a>
        </p>
        <p>
          {copy.email}:{" "}
          <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 hover:underline">
            info@richmondhillcollege.ca
          </a>
        </p>
      </address>
    </section>
  );
}
