// app/layout.tsx
import type { Metadata, Viewport } from "next";
import type React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import Script from "next/script";
import { FbPageView } from "../components/fb-pageview";
import "./globals.css";
import { GtagPageView } from "../components/gtag-pageview";
import { ClarityInit } from "@/components/clarity-init";
import { UtmCapture } from "@/components/utm-capture";

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

// ✅ garder uniquement ce qui relève du SEO/social ici
export const metadata: Metadata = {
  title: "AudioEnTexte - Transcription Audio Française de Qualité",
  description:
    "La meilleure solution gratuite de transcription audio en texte en français. Transformez vos enregistrements en texte et résumés email de haute qualité.",
  openGraph: {
    title: "AudioEnTexte - Transcription Audio Française",
    description:
      "Transformez vos enregistrements français en transcriptions parfaites et résumés email professionnels.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioEnTexte - Transcription Audio Française",
    description: "La première solution optimisée pour le français. Rejoignez la liste d'attente !",
  },
  robots: { index: true, follow: true },
};

// ✅ déplacer viewport + themeColor ici
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0891b2",
  // optionnel: colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = "798924695922408";
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Meta Pixel INIT ONLY */}
        {pixelId && (
          <Script
            id="fb-pixel-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');`,
            }}
          />
        )}

        {/* Google tag (Ads) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683"}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // Disable auto page_view to avoid duplicates in SPA
              gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683"}', { send_page_view: false });`,
          }}
        />
      </head>
      <body  className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${vt323.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Suspense fallback={null}><FbPageView /></Suspense>
        <Suspense fallback={null}><GtagPageView /></Suspense>
        <Suspense fallback={null}><ClarityInit /></Suspense>
        <UtmCapture />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
