import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import BandsintownWidget from "@/components/BandsintownWidget";

export default function Home() {
  return (
    <>
      {/* SECTION 1 - Hero Slider */}
      <h1 className="sr-only">Mackenzie Carpenter - Official Website</h1>
      <HeroSlider />

      {/* SECTION 2 - About */}
      <section aria-label="About Mackenzie Carpenter" data-bg="light" className="bg-blush py-[72px] md:py-24 px-8 md:px-10">
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
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-8 text-suede text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About Mackenzie Carpenter
            </h2>

            <div className="space-y-6 text-suede/90 leading-[1.9] text-justify" style={{ fontFamily: '"Switzer", "Albert Sans", sans-serif', fontSize: '18px' }}>
              <p>
                Raised in the small town of Hull, Georgia, Mackenzie Carpenter grew up writing songs with her brothers and singing in church, shaping a voice that felt honest before it ever felt polished. That foundation became the heartbeat of her debut album, Hey Country Queen, a 13-song introduction that blended humor, heartbreak, and sharp storytelling, earning more than 85 million streams and recognition as one of Holler&apos;s Best Country Albums of 2025. But if Country Queen was the crown, her next chapter is the aura.
              </p>
              <p>
                Mackenzie&apos;s new releases mark an evolution that confidently wears a magnetic and contagious presence. It&apos;s the sound of a woman you notice before you understand why. Aspirational&#x2013;but undeniably human&#x2013;close enough to recognize yourself in her, while luminous in a way that makes you fall in love with who you&apos;re becoming.
              </p>
              <p>
                Still rooted in classic Country storytelling, this new project expands the atmosphere around it. The production feels warm and charming. The writing cuts deeper but lands softer, and a rare duality exists throughout. It&apos;s playful yet iconic, and grounded yet glowing. Mackenzie moves from barefoot honesty to center stage confidence without changing a single thing about who she is. This music leans into nuance: the tucked-hair glance, the laugh that spills out without apology, the ache beneath the wit. It feels like sunshine blended with a secret, both effortlessly cool and undeniably alluring.
              </p>
              <p>
                Beyond her own artistry, Mackenzie continues shaping the next wave of Country music as a trusted co-writer behind Megan Moroney&apos;s &ldquo;I&apos;m Not Pretty,&rdquo; &ldquo;Indifferent,&rdquo; the CMA-nominated &ldquo;You Had To Be There&rdquo; (with Kenny Chesney), and multiple tracks on Moroney&apos;s latest album. Her breakout duet &ldquo;I Wish You Would&rdquo; (ft. Midland) was hailed as one of 2025&apos;s most irresistible collaborations, cementing her as both a compelling voice and a sought-after pen. Named to MusicRow&apos;s &lsquo;Next Big Thing&rsquo; Artists Class, Spotify&apos;s Hot Country Artists to Watch, and CMT&apos;s Next Women of Country, Carpenter has shared stages with Miranda Lambert, Jordan Davis, Parker McCollum and more &#x2013; and continues into 2026 on select dates of Riley Green&apos;s Cowboy As It Gets Tour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - Parallax Image */}
      <section
        data-bg="parallax"
        className="h-[60vh] md:h-[75vh] bg-cover bg-center bg-fixed max-md:bg-scroll"
        style={{
          backgroundImage:
            "url('/backgrounds/MackenzieCarpenter_CloseUpPlate.JPG')",
        }}
        role="presentation"
      />

      {/* SECTION 4 - Tour */}
      <section aria-label="Tour dates" data-bg="dark" className="tour-bg relative bg-cover bg-center bg-fixed max-md:bg-scroll py-[72px] md:py-24 px-6"
      >
        <div className="absolute inset-0 bg-black/35 md:bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-10 text-ivory"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tour
          </h2>

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
      </section>
    </>
  );
}
