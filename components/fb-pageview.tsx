// components/fb-pageview.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function FbPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = pathname + (search?.toString() ? `?${search}` : "");

    // Avoid duplicates from StrictMode re-renders / preloads
    if ((window as any).__fbqLastPV === url) return;

    let attempts = 0;
    let cancelled = false;

    const fire = () => {
      if (cancelled) return;
      const fbq = (window as any).fbq;
      if (typeof fbq === "function") {
        // De-dupe one last time right before sending
        if ((window as any).__fbqLastPV === url) return;
        fbq("track", "PageView");
        (window as any).__fbqLastPV = url;
        return;
      }
      // Wait up to ~3s for fbq to be available (pixel loads async)
      if (attempts++ < 30) setTimeout(fire, 100);
    };

    fire();
    return () => {
      cancelled = true;
    };
  }, [pathname, search?.toString()]);

  return null;
}
