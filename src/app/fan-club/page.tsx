import type { Metadata } from "next";
import FanClubForm from "@/components/FanClubForm";

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  title: "Fan Club",
  description:
    "Join Mackenzie Carpenter's fan club for presale ticket access, exclusive updates, and new music announcements.",
  alternates: { canonical: `${SITE_URL}/fan-club` },
  openGraph: {
    title: "Fan Club | Mackenzie Carpenter",
    description:
      "Join Mackenzie Carpenter's fan club for presale ticket access, exclusive updates, and new music announcements.",
    url: `${SITE_URL}/fan-club`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fan Club | Mackenzie Carpenter",
    description:
      "Join Mackenzie Carpenter's fan club for presale ticket access, exclusive updates, and new music announcements.",
    images: ["/og-image.png"],
  },
};

export default function FanClubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Fan Club", item: `${SITE_URL}/fan-club` },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed max-md:bg-scroll relative bg-center md:bg-[center_40%]"
      style={{
        backgroundImage: "url('/backgrounds/MackenzieCarpenter_InPoolPlate.JPG')",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="absolute inset-0 bg-black/35 md:bg-black/50" />

      <div className="relative z-10 pt-[180px] md:pt-[240px] pb-20 md:pb-28 px-5 md:px-8">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-ivory text-center mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Fan Club
        </h1>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-ivory/80 text-lg mb-8">
            Sign up to be the first to know about new music, tour dates, presales, and exclusive content.
          </p>

          <FanClubForm />
        </div>
      </div>
    </div>
  );
}
