// components/utm-capture.tsx
"use client";
import { useEffect } from "react";

export function UtmCapture() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
    keys.forEach((k) => {
      const v = url.searchParams.get(k);
      if (v) sessionStorage.setItem(k, v);
    });
    // garde aussi la landing courante
    sessionStorage.setItem("landingPage", window.location.pathname);
  }, []);
  return null;
}
