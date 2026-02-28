export function ContactBlock() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Location</h3>
      <address className="mt-2 not-italic text-slate-600">
        <p>Richmond Hill College</p>
        <p>1 Sala Drive, Richmond Hill, Ontario, Canada</p>
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
