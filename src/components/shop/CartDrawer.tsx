"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Lock, Tag, X } from "lucide-react";
import { useModalDialog } from "./useModalDialog";
import CartLineItem from "./CartLineItem";
import {
  checkoutUrl,
  formatMoney,
  shortTitle,
  type CartLine,
  type FeaturedItem,
  type ShopProduct,
  type ShopVariant,
} from "@/lib/merch/shop";

interface Props {
  open: boolean;
  lines: CartLine[];
  products: ShopProduct[];
  featured: FeaturedItem[];
  onClose: () => void;
  onAdd: (product: ShopProduct, variant: ShopVariant, quantity: number) => void;
  onOpenProduct: (product: ShopProduct) => void;
  onUpdateQuantity: (variantId: number, quantity: number) => void;
}

export default function CartDrawer({
  open,
  lines,
  products,
  featured,
  onClose,
  onAdd,
  onOpenProduct,
  onUpdateQuantity,
}: Props) {
  const { ref, dialogProps } = useModalDialog(open, onClose);
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState("");
  const subtotal = lines.reduce((sum, l) => sum + l.variant.price * l.quantity, 0);
  const count = lines.reduce((n, l) => n + l.quantity, 0);

  const inBag = new Set(lines.map((l) => l.product.handle));
  const addOns = products.filter((p) => !inBag.has(p.handle));

  return (
    <dialog
      ref={ref}
      {...dialogProps}
      aria-label="Shopping bag"
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-[460px] bg-ivory text-suede p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm
        open:translate-x-0 starting:open:translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <div className="flex flex-col h-full">
        <header className="relative shrink-0 px-6 pt-8 pb-6 bg-black text-ivory overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-70 scale-110"
            style={{ backgroundImage: "url('/backgrounds/MackenzieCarpenter_PoolParallax.jpg')" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-blush mb-2">
                <span key={count} className="inline-block motion-safe:animate-[bagBump_450ms_ease-out]">{count}</span>{" "}
                {count === 1 ? "piece" : "pieces"}
              </p>
              <h2 className="text-[42px] leading-none">Your Bag</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bag"
              className="w-11 h-11 -mr-2 flex items-center justify-center hover:bg-ivory/10 transition-colors"
            >
              <X size={24} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {lines.length === 0 ? (
            <div className="px-6 pt-12 pb-6 text-center">
              {/* A small fanned pile of the face tees, echoing the hero */}
              <div className="relative w-56 h-40 mx-auto mb-8" aria-hidden="true">
                {featured.map((f, i) => (
                  <Image
                    key={f.product.handle}
                    src={f.image.src}
                    alt=""
                    width={f.image.width}
                    height={f.image.height}
                    sizes="140px"
                    loading="eager"
                    className={`absolute inset-0 m-auto w-32 h-auto drop-shadow-[0_10px_12px_rgba(70,36,22,0.25)] ${
                      ["z-30 -rotate-6", "z-20 rotate-[12deg] translate-x-12 translate-y-2", "z-10 -rotate-[18deg] -translate-x-12 translate-y-3"][i]
                    }`}
                  />
                ))}
              </div>
              <p className="text-3xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Nothing here yet
              </p>
              <p className="text-suede/70 mb-8">Start with one of the face tees, or browse the full collection below.</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-black text-ivory px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-suede transition-colors"
              >
                Shop the Face Tees <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <ul className="px-6">
              {lines.map((line) => (
                <CartLineItem
                  key={line.variantId}
                  line={line}
                  onOpen={() => onOpenProduct(line.product)}
                  onUpdateQuantity={(q) => onUpdateQuantity(line.variantId, q)}
                />
              ))}
            </ul>
          )}

          {addOns.length > 0 && (
            <section aria-labelledby="addons-heading" className="py-7">
              <h3 id="addons-heading" className="px-6 text-2xl mb-4">
                {lines.length ? "Complete the Look" : "Shop the Collection"}
              </h3>
              <ul className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 scroll-px-6">
                {addOns.map((p) => {
                  // One tap adds pieces with a single option; anything with sizes opens the viewer.
                  const oneTap = p.variants.length === 1;
                  return (
                    <li key={p.handle} className="snap-start shrink-0 w-[138px] flex flex-col">
                      <button
                        type="button"
                        onClick={() => onOpenProduct(p)}
                        aria-label={`View ${p.title}`}
                        className="group relative aspect-[4/5] bg-[radial-gradient(circle_at_50%_40%,#FFF9F1,#F8DDCE)] overflow-hidden"
                      >
                        <Image
                          src={p.cutout.src}
                          alt=""
                          fill
                          sizes="138px"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                        />
                      </button>
                      <p className="text-[13px] leading-tight mt-2 line-clamp-2 min-h-[2lh]">{shortTitle(p.title)}</p>
                      <p className="text-[12px] text-suede/60 mt-0.5">
                        {p.minPrice !== p.maxPrice && "From "}
                        {formatMoney(p.minPrice)}
                      </p>
                      <button
                        type="button"
                        onClick={() => (oneTap ? onAdd(p, p.variants[0], 1) : onOpenProduct(p))}
                        aria-label={oneTap ? `Add ${p.title} to bag` : `Choose options for ${p.title}`}
                        className="mt-2.5 border border-suede/30 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-suede hover:text-ivory hover:border-suede transition-colors"
                      >
                        {oneTap ? "+ Add" : "Choose Size"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="shrink-0 border-t border-suede/15 px-6 pt-4 pb-6 bg-ivory shadow-[0_-16px_32px_rgba(70,36,22,0.08)]">
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setCodeOpen((o) => !o)}
                aria-expanded={codeOpen}
                className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-suede/70 hover:text-suede"
              >
                <Tag size={14} aria-hidden="true" /> {code.trim() ? `Code: ${code.trim().toUpperCase()}` : "Add a discount code"}
              </button>
              {codeOpen && (
                <div className="mt-3 flex motion-safe:animate-[navFadeIn_250ms_ease-out]">
                  <label htmlFor="discount-code" className="sr-only">Discount code</label>
                  <input
                    id="discount-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setCodeOpen(false)}
                    placeholder="Discount code"
                    autoComplete="off"
                    className="flex-1 min-w-0 bg-white border border-suede/20 px-3 py-2.5 text-[14px] uppercase placeholder:normal-case placeholder:text-suede/40 focus:outline-none focus:border-suede"
                  />
                  <button
                    type="button"
                    onClick={() => setCodeOpen(false)}
                    className="px-4 bg-suede text-ivory text-[12px] font-semibold uppercase tracking-[0.1em] hover:bg-black"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">Subtotal</span>
              <span className="text-3xl tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
                {formatMoney(subtotal)}
              </span>
            </div>
            <p className="text-[13px] text-suede/60 mt-1 mb-5">
              {code.trim() ? "Your code is applied at checkout. " : ""}Shipping and taxes calculated at checkout.
            </p>
            <a
              href={checkoutUrl(lines, code)}
              className="group flex items-center justify-center gap-2.5 bg-black text-ivory py-4 text-[13px] font-semibold uppercase tracking-[0.12em] hover:bg-suede transition-colors"
            >
              <Lock size={14} aria-hidden="true" />
              Checkout
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-[12px] text-suede/50 text-center mt-3">Secure checkout by Shopify. Shop Pay installments available.</p>
          </footer>
        )}
      </div>
    </dialog>
  );
}
