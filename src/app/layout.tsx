import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import CookieConsent from "@/components/consent/CookieConsent";
import TermsGate from "@/components/consent/TermsGate";
import RouteTracker from "@/components/consent/RouteTracker";
import AnchorScroll from "@/components/shared/AnchorScroll";
import { MenuProvider } from "@/lib/MenuContext";
import { HeaderThemeProvider } from "@/lib/HeaderThemeContext";
import "./globals.css";

// TODO: Wire Switzer-Regular via next/font/local once the regular weight
// .woff2 file is added to public/fonts. Switzer-BoldItalic is loaded via
// @font-face in globals.css and used only for header nav links.

const SITE_URL = "https://mackenziecarpentermusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mackenzie Carpenter | Official Website",
    template: "%s | Mackenzie Carpenter",
  },
  description:
    "The official website of Mackenzie Carpenter. Stream new music, watch videos, get tour dates, shop merch, and join the fan club.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Mackenzie Carpenter",
    url: SITE_URL,
    title: "Mackenzie Carpenter | Official Website",
    description:
      "The official website of Mackenzie Carpenter. Stream new music, watch videos, get tour dates, shop merch, and join the fan club.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mackenzie Carpenter | Official Website",
    description:
      "The official website of Mackenzie Carpenter. Stream new music, watch videos, get tour dates, shop merch, and join the fan club.",
    images: ["/og-image.png"],
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/ese4jod.css" />
        <link
          rel="preload"
          href="/fonts/Switzer-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Switzer-BoldItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />

        {/* Analytics and advertising tags (GTM, Google Ads, GA4, Meta, TikTok)
            are NOT loaded here. They are injected only after the visitor
            consents -- see components/consent/injectScripts.ts. */}
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Mackenzie Carpenter",
              url: SITE_URL,
              image: `${SITE_URL}/og-image.png`,
              genre: "Country",
              description:
                "Big Machine Label Group country artist from Hull, Georgia. Known for Hey Country Queen, I Wish You Would (ft. Midland), and more.",
              sameAs: [
                "https://www.instagram.com/mackcarpmusic/",
                "https://www.facebook.com/mackcarpmusic",
                "https://www.tiktok.com/@mackcarpmusic",
                "https://twitter.com/mackcarpmusic",
                "https://www.youtube.com/channel/UCl94YL0Os0pta5M5-RP2aLQ",
                "https://open.spotify.com/artist/1gYlQ5LjfQz9QPaCApCsDZ",
                "https://music.apple.com/us/artist/mackenzie-carpenter/1545066309",
                "https://music.amazon.com/artists/B08QRYW4B1/mackenzie-carpenter",
              ],
            }),
          }}
        />

        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <RouteTracker />
        <AnchorScroll />

        <MenuProvider>
          <HeaderThemeProvider>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
          </HeaderThemeProvider>
          <Footer />
          <MobileBottomBar />
          {/* Cookie consent banner. Shows once per new visitor, persisted in
              localStorage; injects nothing before consent is granted. */}
          <CookieConsent />
          {/* Arbitration / class-action notice, shown once right after the cookie
              decision so it is never buried only in the footer. */}
          <TermsGate />
        </MenuProvider>
      </body>
    </html>
  );
}
