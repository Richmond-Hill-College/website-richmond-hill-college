const EVENTBRITE_API = "https://www.eventbriteapi.com/v3";

export interface EbImage {
  url: string;
}

export interface EbVenue {
  name: string;
  address: {
    localized_address_display: string;
    city: string;
    region: string;
    country: string;
  };
}

export interface EbEvent {
  id: string;
  name: { text: string };
  description: { text: string };
  url: string;
  start: { local: string; timezone: string };
  end: { local: string; timezone: string };
  status: string;
  logo: EbImage | null;
  venue_id: string | null;
}

export interface EventsResponse {
  events: EbEvent[];
  pagination: { page_number: number; page_count: number; total_items: number };
}

export interface RenderedEvent {
  id: string;
  name: string;
  description: string;
  url: string;
  start: string;
  end: string;
  timezone: string;
  image: string | null;
  status: string;
}

function eventbriteFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
  if (!token) {
    throw new Error("EVENTBRITE_PRIVATE_TOKEN is not set");
  }
  const url = `${EVENTBRITE_API}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: { revalidate: 3600 },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Eventbrite API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  });
}

export async function getOrganizationId(): Promise<string> {
  const data = await eventbriteFetch<{
    organizations: { id: string; name: string }[];
  }>("/users/me/organizations/");
  const org = data.organizations?.[0];
  if (!org) throw new Error("No Eventbrite organization found");
  return org.id;
}

export async function getOrganizationEvents(
  orgId: string,
  status: string = "live,started"
): Promise<EventsResponse> {
  return eventbriteFetch<EventsResponse>(
    `/organizations/${orgId}/events/?status=${status}&order_by=start_asc&page_size=6`
  );
}

function renderEvent(e: EbEvent): RenderedEvent {
  return {
    id: e.id,
    name: e.name.text,
    description: e.description.text.replace(/<[^>]*>/g, "").slice(0, 300),
    url: e.url,
    start: e.start.local,
    end: e.end.local,
    timezone: e.start.timezone,
    image: e.logo?.url ?? null,
    status: e.status,
  };
}

export async function getUpcomingEvents(): Promise<RenderedEvent[]> {
  try {
    const orgId = await getOrganizationId();
    const data = await getOrganizationEvents(orgId);
    if (!data?.events) return [];
    const now = Date.now();
    return data.events
      .map(renderEvent)
      .filter((event) => {
        const end = new Date(event.end).getTime();
        return Number.isFinite(end) && end >= now;
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 6);
  } catch {
    return [];
  }
}
