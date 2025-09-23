// components/gtag-pageview.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GtagPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  const gtagId   = process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683";
  const convLabel = process.env.NEXT_PUBLIC_GADS_PV_LABEL || "2688CIqm16AbEIP2lsVB";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (!gtag) return;

    const url = pathname + (search?.toString() ? `?${search}` : "");

    // De-dupe pageview + conversion per URL
    if ((window as any).__gtagLastPV === url) return;

    // 1) Send SPA page_view
    gtag("config", gtagId, { page_path: url });

    // 2) Fire conversion for page view
    gtag("event", "conversion", {
      send_to: `${gtagId}/${convLabel}`,
      value: 0.0,          // keep or change
      currency: "EUR",     // keep consistent with your action setup
    });

    (window as any).__gtagLastPV = url;
  }, [pathname, search?.toString(), gtagId, convLabel]);

  return null;
}
