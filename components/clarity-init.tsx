"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";

declare global { interface Window { __clarityInited?: boolean } }

export function ClarityInit() {
  const pathname = usePathname();

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (!projectId) return;

    // Init once
    if (!window.__clarityInited) {
      Clarity.init(projectId);
      window.__clarityInited = true;
    }

    // --- Anonymous user id (per browser) ---
    let uid = localStorage.getItem("aet_uid");
    if (!uid) {
      uid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
        ? crypto.randomUUID()
        : String(Date.now());
      localStorage.setItem("aet_uid", uid);
    }

    // --- Session id (per tab/session) ---
    let sid = sessionStorage.getItem("aet_sid");
    if (!sid) {
      sid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
        ? crypto.randomUUID()
        : `s-${Date.now()}`;
      sessionStorage.setItem("aet_sid", sid);
    }

    const pageId = pathname || window.location.pathname;

    // Identify on each page (Clarity recommends per page)
    try { (Clarity as any).identify?.(uid, sid, pageId); } catch {}
    if (typeof window !== "undefined" && (window as any).clarity) {
      (window as any).clarity("identify", uid, sid, pageId);
    }
  }, [pathname]);

  return null;
}
