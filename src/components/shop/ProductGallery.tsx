"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShopImage, ShopProduct } from "@/lib/merch/shop";

interface Props {
  product: ShopProduct;
  /** Photo index (into product.images) to bring into view, e.g. when a variant changes */
  focusImage: number;
}

// Slide 0 is the background-removed cutout staged on a warm gradient; the
// rest are the store's photos. images[0] is the same shot as the cutout, so
// it is skipped.
function slidesFor(product: ShopProduct): { image: ShopImage; staged: boolean }[] {
  return [{ image: product.cutout, staged: true }, ...product.images.slice(1).map((image) => ({ image, staged: false }))];
}

export default function ProductGallery({ product, focusImage }: Props) {
  const slides = slidesFor(product);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function goTo(i: number) {
    const el = track.current;
    if (!el) return;
    const next = (i + slides.length) % slides.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }

  // Variant photos map onto slides 1:1, except images[0] which lives on slide 0.
  useEffect(() => {
    const el = track.current;
    if (el) el.scrollTo({ left: Math.max(focusImage, 0) * el.clientWidth, behavior: "smooth" });
  }, [focusImage]);

  function onScroll() {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  // Desktop hover zoom: point the zoom origin at the cursor. Written straight to
  // the element's style so mouse moves don't re-render the gallery.
  function onZoomMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--zx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--zy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div
      className="relative h-full flex flex-col md:flex-row-reverse bg-[radial-gradient(120%_90%_at_50%_35%,#FFF9F1_0%,#F8DDCE_70%,#EBC6B2_100%)]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div className="relative flex-1 min-h-0">
        <div
          ref={track}
          onScroll={onScroll}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label={`${product.title} photos`}
          className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar focus-visible:outline-offset-[-4px]"
        >
          {slides.map(({ image, staged }, i) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className="relative shrink-0 w-full h-full max-md:aspect-square snap-center overflow-hidden group/zoom md:cursor-zoom-in"
              onMouseMove={onZoomMove}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                priority={i === 0}
                className={`transition-[scale] duration-300 ease-out origin-[var(--zx,50%)_var(--zy,50%)] md:group-hover/zoom:scale-[1.8] ${
                  staged ? "object-contain p-[12%] drop-shadow-[0_30px_30px_rgba(70,36,22,0.28)]" : "object-cover bg-white"
                }`}
              />
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-ivory/85 backdrop-blur text-suede hover:bg-ivory transition-colors"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-ivory/85 backdrop-blur text-suede hover:bg-ivory transition-colors"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <p className="absolute left-4 bottom-4 bg-black/70 text-ivory text-[11px] tracking-[0.14em] px-2.5 py-1 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex md:flex-col gap-2 p-3 md:p-4 overflow-auto no-scrollbar shrink-0" role="group" aria-label="Choose photo">
          {slides.map(({ image, staged }, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`relative shrink-0 w-14 h-14 md:w-[68px] md:h-[68px] overflow-hidden transition-[opacity,outline-color] outline outline-1 outline-offset-2 ${
                i === index ? "outline-suede" : "outline-transparent opacity-60 hover:opacity-100"
              } ${staged ? "bg-ivory" : "bg-white"}`}
            >
              <Image src={image.src} alt="" fill sizes="68px" className={staged ? "object-contain p-1.5" : "object-cover"} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
