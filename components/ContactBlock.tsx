import { LocationMap } from "@/components/LocationMap";

const DIRECTIONS_LINK =
  "https://www.google.com/maps/dir//1+Sala+Drive,Richmond+Hill,Ontario,Canada";

export function ContactBlock() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Location</h3>
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
            Get directions
          </a>
        </p>
        <p className="mt-2">
          Phone:{" "}
          <a href="tel:+18553286065" className="text-slate-800 hover:underline">
            Toll-Free +1 855 (328) 6065
          </a>
        </p>
        <p>
          Email:{" "}
          <a href="mailto:info@richmondhillcollege.ca" className="text-slate-800 hover:underline">
            info@richmondhillcollege.ca
          </a>
        </p>
      </address>
    </section>
  );
}
