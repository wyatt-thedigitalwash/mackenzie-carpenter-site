"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixelPageView() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip the first render — the inline script already fires PageView on load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    // Fire PageView on client-side route changes
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
