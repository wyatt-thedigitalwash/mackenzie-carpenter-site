import {
  ARTIST_PAGE,
  eventName,
  eventUrl,
  formatEventDate,
  formatLocation,
  getUpcomingEvents,
  notifyUrl,
  rsvpUrl,
  ticketUrl,
} from "@/lib/bandsintown";

// Server-rendered tour list (replaces the Bandsintown widget, which loaded
// Bandsintown's own tracking in the visitor's browser before consent).
// Matches the widget's look: desktop is one row per date (date | location |
// event | RSVP + Tickets); mobile stacks date / event / location with the
// buttons side by side underneath.

const text = "text-[#F5ECE1] uppercase tracking-[0.04em]";
const btnBase =
  "inline-block whitespace-nowrap text-center font-semibold uppercase leading-[1.2] tracking-[0.08em] transition-opacity hover:opacity-80";

export default async function TourDates({ limit }: { limit?: number }) {
  const events = (await getUpcomingEvents()).slice(0, limit ?? 100);

  return (
    <div className="px-[10px] text-left" style={{ fontFamily: "var(--font-body)" }}>
      <p className="mb-2 text-[18px] font-bold text-[#F5ECE1] md:text-[15px]">Upcoming Dates</p>

      {events.length === 0 ? (
        <p className={`py-8 text-center text-[16px] ${text}`}>
          No upcoming dates.{" "}
          <a href={ARTIST_PAGE} target="_blank" rel="noopener noreferrer" className="underline">
            Follow on Bandsintown
          </a>{" "}
          to hear about new shows.
        </p>
      ) : (
        <ul>
          {events.map((event) => {
            const tickets = ticketUrl(event);
            return (
              <li
                key={event.id}
                className="flex flex-col items-start gap-1 border-b border-dotted border-black/30 py-5 last:border-b-0 md:flex-row md:items-center md:gap-0 md:py-[30px]"
              >
                <a
                  href={eventUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 flex-col gap-1 md:flex-1 md:flex-row md:items-center md:gap-10"
                >
                  <span className={`text-[16px] font-bold md:flex-1 md:whitespace-nowrap ${text}`}>
                    {formatEventDate(event.datetime)}
                  </span>
                  <span className={`order-3 text-[15px] font-semibold md:order-none md:flex-1 md:whitespace-nowrap md:text-[16px] md:font-normal ${text}`}>
                    {formatLocation(event.venue)}
                  </span>
                  <span className={`order-2 text-[15px] md:order-none md:flex-1 md:text-[16px] ${text}`}>
                    {eventName(event)}
                  </span>
                </a>

                <div className="mt-3 flex w-full gap-[10px] md:ml-[72px] md:mt-0 md:w-auto md:flex-none">
                  <a
                    href={rsvpUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnBase} flex-1 border-2 border-[#F5ECE1] px-[26px] py-[14px] text-[15px] text-[#F5ECE1] md:flex-none md:border-0 md:bg-[#F5ECE1] md:py-3 md:text-[13px] md:text-black`}
                  >
                    RSVP
                  </a>
                  <a
                    href={tickets ?? notifyUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnBase} flex-1 bg-[#F5ECE1] px-[26px] py-[16px] text-[15px] text-black md:flex-none md:py-3 md:text-[13px]`}
                  >
                    {tickets ? "Tickets" : "Notify Me"}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
