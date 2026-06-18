import type { Metadata } from "next";
import Image from "next/image";

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about country artist Mackenzie Carpenter, from her roots in Hull, Georgia to her debut album Hey Country Queen.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About | Mackenzie Carpenter",
    description:
      "Learn about country artist Mackenzie Carpenter, from her roots in Hull, Georgia to her debut album Hey Country Queen.",
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Mackenzie Carpenter",
    description:
      "Learn about country artist Mackenzie Carpenter, from her roots in Hull, Georgia to her debut album Hey Country Queen.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <div className="min-h-screen bg-blush">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Dark header band matching other pages */}
      <div
        className="h-[130px] md:h-[165px] bg-cover bg-center bg-fixed max-md:bg-scroll relative"
        style={{
          backgroundImage: "url('/backgrounds/MackenzieCarpenter_PoolParallax.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="pt-8 md:pt-16 pb-20 md:pb-28 px-8 md:px-10">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <div className="w-full md:w-[45%] shrink-0">
            <Image
              src="/backgrounds/MackenzieCarpenter_MirrorPlate.jpg"
              alt="Mackenzie Carpenter posing in front of a mirror"
              width={900}
              height={1200}
              className="w-full rounded-2xl object-cover"
            />
          </div>

          <div className="w-full md:w-[55%] flex flex-col justify-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl mb-8 text-suede text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About Mackenzie Carpenter
            </h1>

            <div className="space-y-6 text-suede/90 leading-[1.9] text-justify" style={{ fontFamily: '"Switzer", "Albert Sans", sans-serif', fontSize: '18px' }}>
              <p>
                Raised in the small town of Hull, Georgia, Mackenzie Carpenter grew up writing songs with her brothers and singing in church, shaping a voice that felt honest before it ever felt polished. That foundation became the heartbeat of her debut album, Hey Country Queen, a 13-song introduction that blended humor, heartbreak, and sharp storytelling, earning more than 85 million streams and recognition as one of Holler&apos;s Best Country Albums of 2025. But if Country Queen was the crown, her next chapter is the aura.
              </p>
              <p>
                Mackenzie&apos;s new releases mark an evolution that confidently wears a magnetic and contagious presence. It&apos;s the sound of a woman you notice before you understand why. Aspirational but undeniably human, close enough to recognize yourself in her, while luminous in a way that makes you fall in love with who you&apos;re becoming.
              </p>
              <p>
                Still rooted in classic Country storytelling, this new project expands the atmosphere around it. The production feels warm and charming. The writing cuts deeper but lands softer, and a rare duality exists throughout. It&apos;s playful yet iconic, and grounded yet glowing. Mackenzie moves from barefoot honesty to center stage confidence without changing a single thing about who she is. This music leans into nuance: the tucked-hair glance, the laugh that spills out without apology, the ache beneath the wit. It feels like sunshine blended with a secret, both effortlessly cool and undeniably alluring.
              </p>
              <p>
                Beyond her own artistry, Mackenzie continues shaping the next wave of Country music as a trusted co-writer behind Megan Moroney&apos;s &ldquo;I&apos;m Not Pretty,&rdquo; &ldquo;Indifferent,&rdquo; the CMA-nominated &ldquo;You Had To Be There&rdquo; (with Kenny Chesney), and multiple tracks on Moroney&apos;s latest album. Her breakout duet &ldquo;I Wish You Would&rdquo; (ft. Midland) was hailed as one of 2025&apos;s most irresistible collaborations, cementing her as both a compelling voice and a sought-after pen. Named to MusicRow&apos;s &lsquo;Next Big Thing&rsquo; Artists Class, Spotify&apos;s Hot Country Artists to Watch, and CMT&apos;s Next Women of Country, Carpenter has shared stages with Miranda Lambert, Jordan Davis, Parker McCollum and more, and continues into 2026 on select dates of Riley Green&apos;s Cowboy As It Gets Tour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
