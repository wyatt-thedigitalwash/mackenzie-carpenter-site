// Tour dates from the Bandsintown public API, fetched on the server.
//
// This replaces the Bandsintown JavaScript widget, which loaded Bandsintown's
// own Google Tag Manager container and tracking pixel in every visitor's
// browser before any cookie consent. Fetching server-side means the visitor's
// browser never contacts Bandsintown until they click through to an event.

const APP_ID = "umg_bigmachinelabelgroup_mackenziecarpenter";
const ARTIST_ID = "15503409";
const CAME_FROM = "267";

export interface BandsintownEvent {
  id: string;
  datetime: string;
  title: string;
  url: string;
  venue: { name: string; city: string; region: string; country: string; location: string };
  offers: { type: string; status: string; url: string }[];
}

export async function getUpcomingEvents(): Promise<BandsintownEvent[]> {
  try {
    const res = await fetch(
      `https://rest.bandsintown.com/artists/id_${ARTIST_ID}/events?app_id=${APP_ID}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as BandsintownEvent[]) : [];
  } catch {
    return [];
  }
}

/** "Sun, Apr 25, 2027" -- formatted from the event's local date, no timezone shift. */
export function formatEventDate(datetime: string): string {
  const [y, m, d] = datetime.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Indio, CA" for US dates, "London, Canada" elsewhere (matches the old widget). */
export function formatLocation(venue: BandsintownEvent["venue"]): string {
  const us = venue.country === "United States";
  if (us && venue.region) return `${venue.city}, ${venue.region}`;
  return venue.country ? `${venue.city}, ${venue.country}` : venue.location;
}

/** The event's display name: festival/show title when it has one, else the venue. */
export function eventName(event: BandsintownEvent): string {
  return event.title?.trim() || event.venue.name;
}

/** Bandsintown event page (the API already returns it with our app_id). */
export function eventUrl(event: BandsintownEvent): string {
  return event.url;
}

export function rsvpUrl(event: BandsintownEvent): string {
  return `${event.url}&trigger=rsvp_going`;
}

/** Ticket link, or null when nothing is on sale yet (then show Notify Me). */
export function ticketUrl(event: BandsintownEvent): string | null {
  const offer = event.offers.find((o) => o.type === "Tickets" && o.status === "available") ?? event.offers[0];
  return offer?.url ?? null;
}

export function notifyUrl(event: BandsintownEvent): string {
  return `${event.url}&trigger=notify_me`;
}

export const ARTIST_PAGE = `https://www.bandsintown.com/a/${ARTIST_ID}?came_from=${CAME_FROM}&app_id=${APP_ID}`;
