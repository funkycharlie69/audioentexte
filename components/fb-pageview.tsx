// components/fb-pageview.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function FbPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).fbq) return;

    const url = pathname + (search?.toString() ? `?${search}` : "");

    // Global de-dupe to handle StrictMode and multiple renders/layouts
    if ((window as any).__fbqLastPV === url) return;

    (window as any).fbq("track", "PageView");
    (window as any).__fbqLastPV = url;
  }, [pathname, search?.toString()]);

  return null;
}
