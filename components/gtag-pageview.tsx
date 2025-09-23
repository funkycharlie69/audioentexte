// components/gtag-pageview.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GtagPageView() {
  const pathname = usePathname();
  const search = useSearchParams();
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID || "AW-17593383683";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (!gtag) return;

    const url = pathname + (search?.toString() ? `?${search}` : "");
    if ((window as any).__gtagLastPV === url) return; // de-dupe

    gtag("config", gtagId, {
      page_path: url,
    });
    (window as any).__gtagLastPV = url;
  }, [pathname, search?.toString(), gtagId]);

  return null;
}
