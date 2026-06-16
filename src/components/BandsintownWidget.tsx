"use client";

import { useEffect, useRef } from "react";

export default function BandsintownWidget({ limit }: { limit?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const widget = document.createElement("a");
    widget.className = "bit-widget-initializer";
    widget.setAttribute("data-artist-name", "id_15503409");
    widget.setAttribute("data-app-id", "umg_bigmachinelabelgroup_mackenziecarpenter");
    widget.setAttribute("data-display-local-dates", "false");
    widget.setAttribute("data-display-past-dates", "false");
    widget.setAttribute("data-auto-style", "false");
    widget.setAttribute("data-text-color", "#F5ECE1");
    widget.setAttribute("data-link-color", "#F5ECE1");
    widget.setAttribute("data-background-color", "transparent");
    widget.setAttribute("data-display-limit", String(limit ?? 100));
    widget.setAttribute("data-link-text-color", "#000000");
    widget.setAttribute("data-display-lineup", "false");
    widget.setAttribute("data-display-play-my-city", "false");
    widget.setAttribute("data-separator-color", "rgba(245,236,225,0.2)");
    container.appendChild(widget);

    const script = document.createElement("script");
    script.src = "https://widget.bandsintown.com/main.min.js";
    script.charset = "utf-8";
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [limit]);

  return <div ref={containerRef} />;
}
