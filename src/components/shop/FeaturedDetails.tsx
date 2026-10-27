"use client";

import { useState, type ReactNode } from "react";
import { formatMoney, type FeaturedItem, type ShopProduct, type ShopVariant } from "@/lib/merch/shop";

// Copy, sizes, and buy buttons for whichever tee is on top of the hero pile.
// The tee picker is passed in as children and sits between sizes and buttons.
export default function FeaturedDetails({
  item,
  onAdd,
  onOpen,
  onInteract,
  children,
}: {
  item: FeaturedItem;
  onAdd: (product: ShopProduct, variant: ShopVariant, quantity: number) => void;
  onOpen: (product: ShopProduct) => void;
  onInteract: () => void;
  children: ReactNode;
}) {
  const { product } = item;
  const sizes = product.options.find((o) => o.name === "Size")?.values ?? [];
  const sizeIndex = product.options.findIndex((o) => o.name === "Size");
  const [size, setSize] = useState(sizes[0]);
  const variant = product.variants.find((v) => v.options[sizeIndex] === size) ?? product.variants[0];

  return (
    // Copy and sizes, then the tee picker, then the buttons.
    <div className="flex flex-col text-center md:text-left">
      <div className="motion-safe:animate-[navFadeIn_600ms_ease-out]">
        {/* Reserves two lines on desktop so the panel does not jump between long and short names */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05] mb-4 md:min-h-[2.1em] md:flex md:items-end">
          {product.title}
        </h2>
        <p className="text-xl text-blush mb-2">{formatMoney(variant.price)}</p>
        <p className="text-ivory/70 mb-8">Heavyweight garment-dyed tee in Ivory.</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5" role="group" aria-label="Size">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onInteract();
                setSize(s);
              }}
              aria-pressed={size === s}
              className={`min-w-[56px] px-4 py-3 text-[14px] border transition-colors ${
                size === s ? "bg-ivory text-black border-ivory" : "border-ivory/35 text-ivory hover:border-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {children}

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto md:mx-0">
        <button
          type="button"
          onClick={() => {
            onInteract();
            onAdd(product, variant, 1);
          }}
          className="flex-1 bg-ivory text-black py-4 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-blush transition-colors"
        >
          Add to Bag
        </button>
        <button
          type="button"
          onClick={() => {
            onInteract();
            onOpen(product);
          }}
          className="flex-1 border border-ivory/50 text-ivory py-4 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-ivory hover:text-black transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
