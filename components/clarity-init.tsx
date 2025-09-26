"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

declare global {
  interface Window { __clarityInited?: boolean }
}

export function ClarityInit() {
  useEffect(() => {
    try {
      const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
      if (!id) return;
      if (!window.__clarityInited) {
        Clarity.init(id);             // boot Clarity once
        window.__clarityInited = true;
      }
    } catch (e) {
      console.error("Clarity init error", e);
    }
  }, []);

  return null;
}
