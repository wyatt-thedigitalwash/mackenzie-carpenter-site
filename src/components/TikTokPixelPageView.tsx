"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ttq?: { page: (...args: unknown[]) => void; track: (...args: unknown[]) => void };
  }
}

export default function TikTokPixelPageView() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip the first render — the inline script already fires ttq.page() on load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    // Fire a pageview on client-side route changes
    if (typeof window.ttq?.page === "function") {
      window.ttq.page();
    }
  }, [pathname]);

  return null;
}
