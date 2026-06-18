import type { Metadata } from "next";
import Image from "next/image";

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Stream all of Mackenzie Carpenter's music, including Hey Country Queen, All In Already, and Drunk Cigs, on Spotify, Apple Music, and more.",
  alternates: { canonical: `${SITE_URL}/music` },
  openGraph: {
    title: "Music | Mackenzie Carpenter",
    description:
      "Stream all of Mackenzie Carpenter's music, including Hey Country Queen, All In Already, and Drunk Cigs, on Spotify, Apple Music, and more.",
    url: `${SITE_URL}/music`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Mackenzie Carpenter",
    description:
      "Stream all of Mackenzie Carpenter's music, including Hey Country Queen, All In Already, and Drunk Cigs, on Spotify, Apple Music, and more.",
    images: ["/og-image.png"],
  },
};

const RELEASES = [
  { title: "All In Already", cover: "MackenzieCarpenter_AllInAlready_Cover.jpg", href: "https://mackenziecarpenter.ffm.to/allinalready.OWE" },
  { title: "Drunk Cigs", cover: "MackenzieCarpenter_DrunkCigs_Cover.jpg", href: "https://mackenziecarpenter.lnk.to/DrunkCigsWE" },
  { title: "Hey Country Queen", cover: "MackenzieCarpenter_HotCountryQueen_Cover.jpg", href: "https://mackenzie.lnk.to/HeyCountryQueenWE" },
  { title: "I Wish You Would (ft. Midland)", cover: "MackenzieCarpenter_IWishYouWould_Cover.jpg", href: "https://mackenzie.lnk.to/IWishYouWouldWE" },
  { title: "Dozen Red Flags", cover: "MackenzieCarpenter_DozenRedFlags_Cover.jpg", href: "https://mackenzie.lnk.to/DozenRedFlagsWE" },
  { title: "Boots On", cover: "MackenzieCarpenter_BootsOn_Cover.jpg", href: "https://mackenzie.lnk.to/BootsOnWE" },
  { title: "Only Girl", cover: "MackenzieCarpenter_OnlyGirl_Cover.jpg", href: "https://mackenzie.lnk.to/OnlyGirlWE" },
  { title: "Sound Of A Heartbreak", cover: "MackenzieCarpenter_SoundOfAHeartBreak_Cover.jpg", href: "https://MackenzieCarpenter.lnk.to/SoundOfAHeartBreakWE" },
  { title: "Country Girls (Just Wanna Have Fun) REMIX", cover: "MackenzieCarpenter_CountryGirlsRemix_Cover.jpg", href: "https://mackenzie.lnk.to/CountryGirls_REMIXWE" },
  { title: "Country Girls (Just Wanna Have Fun)", cover: "MackenzieCarpenter_CountryGirls_Cover.jpg", href: "https://mackenzie.lnk.to/CountryGirlsWE" },
  { title: "Mackenzie Carpenter EP", cover: "MackenzieCarpenter_EP_Cover.jpg", href: "https://mackenzie.lnk.to/DebutEPWE" },
  { title: "Don't Mess With Exes", cover: "MackenzieCarpenter_DontMessWithExes_Cover.jpg", href: "https://mackenzie.lnk.to/DontMessWithExesWE" },
  { title: "Jesus, I'm Jealous (Acoustic)", cover: "MackenzieCarpenter_JesusImJealousAccoustic_Cover.jpg", href: "https://mackenzie.lnk.to/Jesus_AcousticWE" },
  { title: "Jesus, I'm Jealous", cover: "MackenzieCarpenter_JesusImJealous_Cover.jpg", href: "https://mackenzie.lnk.to/JesusWE" },
  { title: "Huntin' Season (Acoustic)", cover: "MackenzieCarpenter_HuntinSeasonAccoustic_Cover.jpg", href: "https://mackenzie.lnk.to/HuntinSeason_AcousticWE" },
  { title: "Huntin' Season", cover: "MackenzieCarpenter_HuntinSeason_Cover.jpg", href: "https://mackenzie.lnk.to/HuntinSeasonWE" },
  { title: "Can't Nobody (Acoustic)", cover: "MackenzieCarpenter_CantNobodyAcoustic_Cover.jpg", href: "https://mackenzie.lnk.to/CantNobody_AcousticWE" },
  { title: "Can't Nobody", cover: "MackenzieCarpenter_CantNobody_Cover.jpg", href: "https://lnk.to/CantNobodyWE" },
];

export default function MusicPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Music", item: `${SITE_URL}/music` },
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
          Music
        </h1>

        <div className="mx-auto max-w-[1150px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {RELEASES.map((release) => (
            <a
              key={release.title}
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={`/covers/${release.cover}`}
                alt={`Mackenzie Carpenter - ${release.title}`}
                width={600}
                height={600}
                className="w-full aspect-square object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
