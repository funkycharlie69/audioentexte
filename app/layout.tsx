// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import Script from "next/script";
import { FbPageView } from "../components/fb-pageview"; // relative path avoids alias issues
import "./globals.css";

export const metadata: Metadata = {
  title: "AudioEnTexte - Transcription Audio Française de Qualité",
  description:
    "La meilleure solution gratuite de transcription audio en texte en français. Transformez vos enregistrements en texte et résumés email de haute qualité.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#0891b2",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = "798924695922408";

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Performance hints */}
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Meta Pixel INIT ONLY (no PageView here) */}
        {pixelId && (
          <Script
            id="fb-pixel-init"
            strategy="beforeInteractive"  // allowed & intended in app/layout :contentReference[oaicite:4]{index=4}
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              `,
            }}
          />
        )}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>

        {/* Fire PageView exactly once per real URL (initial load + client navigations) */}
        <Suspense fallback={null}>
          <FbPageView />
        </Suspense>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
