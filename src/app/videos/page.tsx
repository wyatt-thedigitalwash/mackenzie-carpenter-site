import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch official music videos and more from Mackenzie Carpenter.",
  alternates: { canonical: `${SITE_URL}/videos` },
  openGraph: {
    title: "Videos | Mackenzie Carpenter",
    description:
      "Watch official music videos and more from Mackenzie Carpenter.",
    url: `${SITE_URL}/videos`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videos | Mackenzie Carpenter",
    description:
      "Watch official music videos and more from Mackenzie Carpenter.",
    images: ["/og-image.png"],
  },
};

const VIDEOS = [
  { title: "All In Already (Official Video)", id: "tVf5CyQkwuQ" },
  { title: "Drunk Cigs", id: "B0xEZCRUrtU" },
  { title: "Gone Fishing", id: "WshkkG9oUnY" },
  { title: "Country Queen", id: "PHoRr4cw3LU" },
  { title: "I Wish You Would ft. Midland", id: "bdolHTaNDAg" },
  { title: "Dozen Red Flags", id: "Na5K6qQN1bw" },
  { title: "Cowgirl Like Me (Lyric Video)", id: "iWO0SHkVdKs" },
  { title: "Red Wine Blue (Lyric Video)", id: "spHcr4Ip6xM" },
  { title: "The Other Side (Lyric Video)", id: "LId-ce7UQ6w" },
  { title: "Guys Like You (Lyric Video)", id: "JTPOtyu-AC4" },
  { title: "Boots On (Lyric Video)", id: "PWrMDVcpv_k" },
  { title: "Only Girl (Official Music Video)", id: "2mtBQigLBC4" },
  { title: "Sound Of A Heartbreak (Lyric Video)", id: "m2uA1oDe7HA" },
  { title: "Country Girls (Just Wanna Have Fun) (Remix)", id: "JjmSlqVOM68" },
  { title: "Country Girls (Just Wanna Have Fun) (Official Music Video)", id: "61s35TCMOA4" },
  { title: "Introducing Mackenzie Carpenter (The Short Film)", id: "91zPhArt6NE" },
  { title: "Throw You Back", id: "cEVVihU-D_k" },
  { title: "Introducing Mackenzie Carpenter (The Interview)", id: "-Ddhxj3Yzng" },
  { title: "Don't Mess With Exes (Official Music Video)", id: "aIQ_Fqsc720" },
  { title: "Jesus, I'm Jealous", id: "nnWpHsaF-4s" },
  { title: "Huntin' Season (Official Music Video)", id: "pOaumsPTIjk" },
  { title: "Can't Nobody (Acoustic / Audio)", id: "uibhxi1jraM" },
  { title: "Can't Nobody (Lyric Video)", id: "EMJoBoQmHrg" },
];

export default function VideosPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Videos", item: `${SITE_URL}/videos` },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed max-md:bg-contain max-md:bg-top max-md:bg-repeat-y max-md:bg-scroll relative"
      style={{
        backgroundImage: "url('/backgrounds/MackenzieCarpenter_PoolParallax.jpg')",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 pt-[180px] md:pt-[240px] pb-20 md:pb-28 px-5 md:px-8">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-ivory text-center mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Videos
        </h1>

        <VideoGrid videos={VIDEOS} />
      </div>
    </div>
  );
}
