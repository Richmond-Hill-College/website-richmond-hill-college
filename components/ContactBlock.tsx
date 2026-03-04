import { LocationMap } from "@/components/LocationMap";

const DIRECTIONS_LINK =
  "https://www.google.com/maps/dir//1+Sala+Drive,Richmond+Hill,Ontario,Canada";

const copyEn = {
  location: "Location",
  getDirections: "Get directions",
  phone: "Phone:",
  email: "Email:",
};

const copyFr = {
  location: "Emplacement",
  getDirections: "Itinéraire",
  phone: "Téléphone :",
  email: "Courriel :",
};

type ContactBlockProps = { locale?: "en" | "fr" };

export function ContactBlock({ locale = "en" }: ContactBlockProps) {
  const t = locale === "fr" ? copyFr : copyEn;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{t.location}</h3>
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
            {t.getDirections}
          </a>
        </p>
        <p className="mt-2">
          {t.phone}{" "}
          <a href="tel:+18553286065" className="text-slate-800 hover:underline">
            Toll-Free +1 855 (328) 6065
          </a>
        </p>
        <p>
          {t.email}{" "}
          <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 hover:underline">
            info@richmondhillcollege.ca
          </a>
        </p>
      </address>
    </section>
  );
}
