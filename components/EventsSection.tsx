import { Calendar, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getUpcomingEvents } from "@/lib/eventbrite";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function EventsSection() {
  const events = await getUpcomingEvents();
  if (events.length === 0) return null;

  return (
    <ScrollReveal as="section" className="mb-16 tablet:mb-24" aria-labelledby="events-heading">
      <div className="mb-10 text-center tablet:mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Events & conferences
        </span>
        <h2
          id="events-heading"
          className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl tablet:text-3xl lg:text-4xl"
        >
          Upcoming Events
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 tablet:mt-5 tablet:max-w-xl">
          Join us at our upcoming conferences, workshops, and professional development events.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 tablet:gap-8 lg:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
          >
            {event.image && (
              <div className="relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden bg-slate-100">
                {/* Eventbrite image URLs are dynamic; a regular image keeps them
                    contained even when the upstream URL format changes. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700">
                {event.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                {event.description}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                  {formatDate(event.start)}
                  {event.start !== event.end && ` – ${formatDate(event.end)}`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                  {formatTime(event.start)}
                </span>
              </div>
              <div className="mt-auto pt-4">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#192640]"
                >
                  Register on Eventbrite
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href={`https://www.eventbrite.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary-outline inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rhc-primary focus:ring-offset-2"
        >
          View all events on Eventbrite
        </a>
      </div>
    </ScrollReveal>
  );
}
