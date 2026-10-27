"use client";

import { ShoppingBag } from "lucide-react";

interface Props<T extends string> {
  filters: { label: T; count: number }[];
  active: T;
  onChange: (filter: T) => void;
  itemCount: number;
  onOpenBag: () => void;
}

export default function FilterBar<T extends string>({ filters, active, onChange, itemCount, onOpenBag }: Props<T>) {
  return (
    <div className="sticky top-3 md:top-5 z-30 mx-auto max-w-[1200px]">
      <div className="flex items-stretch justify-between gap-2 p-1.5 bg-black/45 backdrop-blur-xl border border-ivory/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <nav aria-label="Filter products" className="flex overflow-x-auto no-scrollbar">
          {filters.map((f) => {
            const isActive = active === f.label;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => onChange(f.label)}
                aria-pressed={isActive}
                className={`shrink-0 flex items-start gap-1 px-2.5 sm:px-3.5 md:px-6 py-2.5 md:py-3 text-[15px] sm:text-[17px] md:text-[21px] leading-none transition-colors duration-300 ${
                  isActive ? "bg-ivory text-black" : "text-ivory/70 hover:text-ivory hover:bg-ivory/10"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {f.label}
                <sup className={`hidden sm:inline text-[11px] font-sans top-0 ${isActive ? "text-black/50" : "text-ivory/40"}`}>
                  {f.count}
                </sup>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onOpenBag}
          className="shrink-0 flex items-center gap-2 sm:gap-2.5 pl-2.5 pr-2 sm:pl-3.5 md:pl-5 md:pr-2.5 bg-blush text-black hover:bg-ivory transition-colors"
          aria-label={`Open bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        >
          <ShoppingBag size={19} strokeWidth={1.6} aria-hidden="true" />
          <span className="hidden sm:inline text-[13px] font-semibold uppercase tracking-[0.1em]">Bag</span>
          {/* Keyed on the count so the badge replays its bump each time an item lands */}
          <span
            key={itemCount}
            className={`min-w-[26px] h-[26px] px-1.5 inline-flex items-center justify-center text-[12px] font-semibold ${
              itemCount > 0 ? "bg-red text-ivory motion-safe:animate-[bagBump_450ms_ease-out]" : "bg-black/10 text-black/60"
            }`}
          >
            {itemCount}
          </span>
        </button>
      </div>
    </div>
  );
}
