import type { Metadata } from "next";
import Link from "next/link";
import ShopClient from "@/components/shop/ShopClient";
import { getFeatured, getProducts } from "@/lib/merch/catalog";

const SITE_URL = "https://mackenziecarpentermusic.com";

const DESCRIPTION =
  "Shop official Mackenzie Carpenter merch, including tees, hats, crewnecks, totes, and koozies.";

export const metadata: Metadata = {
  title: "Merch",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/shop` },
  // Mockup built from a static catalog snapshot. Remove once wired to the
  // Storefront API and linked from the main nav.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Merch | Mackenzie Carpenter",
    description: DESCRIPTION,
    url: `${SITE_URL}/shop`,
    type: "website",
    siteName: "Mackenzie Carpenter",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merch | Mackenzie Carpenter",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function ShopPage() {
  const products = getProducts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Merch", item: `${SITE_URL}/shop` },
    ],
  };

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-cover bg-center bg-fixed max-md:bg-contain max-md:bg-top max-md:bg-repeat-y max-md:bg-scroll"
      style={{ backgroundImage: "url('/backgrounds/MackenzieCarpenter_PoolParallax.jpg')" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Deepens the water toward the bottom so the grid copy stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/55" />

      <div className="relative z-10">
        {/* Visually hidden page title (keeps one h1 for SEO and screen readers);
            the padding clears the floating header so the tee stack leads the page */}
        <div className="pt-[150px] md:pt-[170px]">
          <h1 className="sr-only">Merch</h1>
        </div>

        <ShopClient products={products} featured={getFeatured(products)} />

        <section className="px-5 md:px-8 pb-24 md:pb-32">
          <div className="mx-auto max-w-3xl text-center border-t border-ivory/20 pt-16 md:pt-20">
            <h2 className="text-3xl md:text-4xl text-ivory mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              First Dibs on New Drops
            </h2>
            <p className="text-ivory/80 max-w-lg mx-auto mb-8">
              Join the fan club for early access to new merch, presales, and exclusive content.
            </p>
            <Link
              href="/fan-club"
              className="inline-block bg-ivory text-black px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-blush transition-colors"
            >
              Join the Fan Club
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
