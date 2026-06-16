import type { Metadata } from "next";
import BandsintownWidget from "@/components/BandsintownWidget";

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  title: "Tour",
  description:
    "See Mackenzie Carpenter live. Find upcoming tour dates, venues, and tickets for her 2026 shows.",
  alternates: { canonical: `${SITE_URL}/tour` },
  openGraph: {
    title: "Tour | Mackenzie Carpenter",
    description:
      "See Mackenzie Carpenter live. Find upcoming tour dates, venues, and tickets for her 2026 shows.",
    url: `${SITE_URL}/tour`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour | Mackenzie Carpenter",
    description:
      "See Mackenzie Carpenter live. Find upcoming tour dates, venues, and tickets for her 2026 shows.",
    images: ["/og-image.png"],
  },
};

export default function TourPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tour", item: `${SITE_URL}/tour` },
    ],
  };

  return (
    <div className="tour-bg min-h-screen relative bg-cover bg-center bg-fixed max-md:bg-scroll">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="absolute inset-0 bg-black/35 md:bg-black/50" />

      <div className="relative z-10 pt-[180px] md:pt-[240px] pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-10 text-ivory"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tour
          </h1>

          <a
            href="https://www.bandsintown.com/a/15503409-mackenzie-carpenter?app_id=umg_bigmachinelabelgroup_mackenziecarpenter&came_from=267&trigger=track&utm_campaign=track&utm_medium=web&utm_source=widget"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blush text-black text-sm font-semibold uppercase tracking-widest px-8 py-3.5 mb-10 transition-opacity hover:opacity-80"
          >
            Track on Bandsintown
          </a>

          <BandsintownWidget />

          <a
            href="https://www.bandsintown.com/a/15503409-mackenzie-carpenter?came_from=267&trigger=play_my_city"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blush text-black text-sm font-semibold uppercase tracking-widest px-16 py-3 mt-10 transition-opacity hover:opacity-80"
          >
            Play My City
          </a>
        </div>
      </div>
    </div>
  );
}
