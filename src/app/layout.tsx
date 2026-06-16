import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        {/* ADOBE FONTS KIT: replace with <link rel="stylesheet" href="https://use.typekit.net/KITID.css"> when kit is ready */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
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

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNQ86MV');`}
        </Script>

        {/* Google Ads (AW-17574370157) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17574370157"
          strategy="afterInteractive"
        />
        <Script id="gtag-ads" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-17574370157');`}
        </Script>

        {/* GA4 label stream (G-FVWZ0RM4DH) on separate audDataLayer */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FVWZ0RM4DH&l=audDataLayer"
          strategy="afterInteractive"
        />
        <Script id="gtag-aud" strategy="afterInteractive">
          {`window.audDataLayer=window.audDataLayer||[];function audGtag(){audDataLayer.push(arguments);}audGtag('js',new Date());audGtag('config','G-FVWZ0RM4DH');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNQ86MV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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

        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
