"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    desktop: "/banners/MackenzieCarpenter_HighPony_DesktopHero.jpg",
    mobile: "/banners/MackenzieCarpenter_HighPony_MobileHero.jpg",
    href: "https://mackenziecarpenter.ffm.to/highpony",
    alt: "High Pony",
  },
  {
    desktop: "/banners/MackenzieCarpenter_AllInAlready_DesktopHero.jpg",
    mobile: "/banners/MackenzieCarpenter_AllInAlready_MobileHero.jpg",
    href: "https://mackenziecarpenter.ffm.to/allinalready.OWE",
    alt: "All In Already",
  },
  {
    desktop: "/banners/MackenzieCarpenter_DrunkCigs_DesktopHero.jpg",
    mobile: "/banners/MackenzieCarpenter_DrunkCigs_MobileHero.jpg",
    href: "https://mackenziecarpenter.lnk.to/DrunkCigsWE",
    alt: "Drunk Cigs",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative w-full h-screen min-[900px]:h-auto overflow-hidden"
      data-bg="dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop: aspect-ratio container to prevent CLS */}
      <div className="hidden min-[900px]:block" style={{ aspectRatio: "16 / 9" }} />

      {SLIDES.map((slide, i) => (
        <a
          key={slide.alt}
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
          tabIndex={i === current ? 0 : -1}
        >
          {/* Desktop image */}
          <Image
            src={slide.desktop}
            alt={slide.alt}
            fill
            className="hidden min-[900px]:block object-contain"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Mobile image */}
          <Image
            src={slide.mobile}
            alt={slide.alt}
            fill
            className="object-cover object-top min-[900px]:hidden"
            priority={i === 0}
            sizes="100vw"
          />
        </a>
      ))}

      {/* Prev arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-ivory/60 hover:text-ivory transition-colors cursor-pointer p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-ivory/60 hover:text-ivory transition-colors cursor-pointer p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={40} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.alt}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
              i === current ? "bg-ivory" : "bg-ivory/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
