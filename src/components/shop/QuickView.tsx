"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, CreditCard, Lock, Minus, Package, Plus, X } from "lucide-react";
import { useModalDialog } from "./useModalDialog";
import ProductGallery from "./ProductGallery";
import Accordion from "./Accordion";
import { COLOR_SWATCHES, formatMoney, shortTitle, type ShopProduct, type ShopVariant } from "@/lib/merch/shop";

interface Props {
  product: ShopProduct | null;
  products: ShopProduct[];
  onClose: () => void;
  onAdd: (product: ShopProduct, variant: ShopVariant, quantity: number) => void;
  onSelect: (product: ShopProduct) => void;
}

const ADDED_MS = 650;

export default function QuickView({ product, products, onClose, onAdd, onSelect }: Props) {
  const { ref, dialogProps } = useModalDialog(product !== null, onClose);

  return (
    <dialog
      ref={ref}
      {...dialogProps}
      aria-label={product?.title}
      className="p-0 bg-ivory text-suede overflow-hidden backdrop:bg-black/70 backdrop:backdrop-blur-sm
        max-md:m-0 max-md:mt-auto max-md:w-full max-md:max-w-none max-md:h-dvh max-md:max-h-none
        md:m-auto md:w-[min(1180px,calc(100%-3rem))] md:max-w-none md:h-[min(840px,calc(100dvh-3rem))] md:max-h-none
        transition-[opacity,scale,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        starting:open:opacity-0 md:starting:open:scale-95 max-md:starting:open:translate-y-full"
    >
      {/* Keyed so selections, scroll, and gallery reset whenever a different product opens */}
      {product && (
        <QuickViewBody
          key={product.handle}
          product={product}
          products={products}
          onClose={onClose}
          onAdd={onAdd}
          onSelect={onSelect}
        />
      )}
    </dialog>
  );
}

function QuickViewBody({ product, products, onClose, onAdd, onSelect }: Props & { product: ShopProduct }) {
  const [selected, setSelected] = useState<string[]>(product.variants[0].options);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const variant = product.variants.find((v) => v.options.every((o, i) => o === selected[i])) ?? product.variants[0];
  const focusImage = product.images.findIndex((img) => img.src === variant.image);
  const pairs = products
    .filter((p) => p.handle !== product.handle)
    .sort((a, b) => Number(a.category === product.category) - Number(b.category === product.category))
    .slice(0, 3);

  function add() {
    if (added) return;
    setAdded(true);
    timer.current = setTimeout(() => onAdd(product, variant, quantity), ADDED_MS);
  }

  return (
    <div className="relative h-full overflow-y-auto md:overflow-hidden md:grid md:grid-cols-[1.1fr_1fr]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed md:absolute top-3 right-3 z-20 w-11 h-11 flex items-center justify-center bg-ivory shadow-[0_4px_14px_rgba(70,36,22,0.12)] text-suede hover:bg-black hover:text-ivory transition-colors"
      >
        <X size={20} strokeWidth={1.6} aria-hidden="true" />
      </button>

      <div className="md:h-full md:min-h-0">
        <ProductGallery product={product} focusImage={focusImage} />
      </div>

      <div className="md:h-full md:overflow-y-auto">
        <div className="px-6 pt-8 md:px-12 md:pt-14 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-suede/60">{product.productType}</p>
            {product.featured && (
              <span className="bg-red text-ivory text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5">
                Fan Favorite
              </span>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl leading-[1.05] mb-4 pr-10">{product.title}</h2>
          <p className="text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {formatMoney(variant.price)}
          </p>
          {product.intro && <p className="text-[15px] leading-relaxed text-suede/80 mb-8">{product.intro}</p>}

          {product.options.map((option, oi) => {
            const isColor = option.name === "Color";
            return (
              <fieldset key={option.name} className="mb-7">
                <legend className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-3">
                  {option.name}
                  <span className="ml-2 font-normal normal-case tracking-normal text-suede/60">{selected[oi]}</span>
                </legend>
                {(isColor || option.values.length > 1) && (
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selected[oi] === value;
                      const select = () => setSelected((prev) => prev.map((v, i) => (i === oi ? value : v)));
                      if (isColor) {
                        const fills = COLOR_SWATCHES[value] ?? ["#ccc"];
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={select}
                            aria-label={value}
                            aria-pressed={isSelected}
                            className={`w-11 h-11 p-1 border transition-colors ${isSelected ? "border-suede" : "border-suede/20 hover:border-suede/50"}`}
                          >
                            {/* Rotated fill inside a clipping box gives two-tone colors a diagonal split */}
                            <span className="block w-full h-full overflow-hidden border border-black/10">
                              <span className="flex w-full h-full -rotate-45 scale-[1.42]">
                                {fills.map((f) => (
                                  <span key={f} className="flex-1" style={{ background: f }} />
                                ))}
                              </span>
                            </span>
                          </button>
                        );
                      }
                      // Show the price on a size only when it differs from the base price
                      const v = product.variants.find((pv) => pv.options[oi] === value);
                      const priceNote = v && v.price !== product.minPrice ? formatMoney(v.price) : null;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={select}
                          aria-pressed={isSelected}
                          className={`min-w-[62px] px-4 py-3 border transition-colors flex flex-col items-center leading-tight ${
                            isSelected ? "bg-suede text-ivory border-suede" : "border-suede/25 hover:border-suede"
                          }`}
                        >
                          <span className="text-[14px]">{value}</span>
                          {priceNote && (
                            <span className={`text-[10px] mt-0.5 ${isSelected ? "text-ivory/70" : "text-suede/50"}`}>
                              {priceNote}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            );
          })}

          {/* Sticks to the bottom of the sheet on mobile until scrolled into place */}
          <div className="max-md:sticky max-md:bottom-0 max-md:-mx-6 max-md:px-6 max-md:py-4 max-md:bg-ivory/95 max-md:backdrop-blur max-md:border-t max-md:border-suede/10 flex gap-3 mb-6 z-10">
            <div className="flex items-center border border-suede/25" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="px-3 h-full hover:bg-suede/5"
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="px-3 h-full hover:bg-suede/5"
              >
                <Plus size={15} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              disabled={!variant.available}
              onClick={add}
              className={`relative flex-1 overflow-hidden py-4 text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                added ? "bg-suede text-ivory" : "bg-black text-ivory hover:bg-suede"
              }`}
            >
              {!variant.available ? (
                "Sold Out"
              ) : added ? (
                <span className="inline-flex items-center gap-2 motion-safe:animate-[navFadeIn_300ms_ease-out]">
                  <Check size={16} aria-hidden="true" /> Added to Bag
                </span>
              ) : (
                `Add to Bag  ·  ${formatMoney(variant.price * quantity)}`
              )}
            </button>
          </div>

          <ul className="grid grid-cols-3 gap-2 mb-8 text-center">
            {[
              { Icon: Package, label: "Made to order" },
              { Icon: Lock, label: "Secure checkout" },
              { Icon: CreditCard, label: "Shop Pay installments" },
            ].map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 py-3 bg-blush/50 text-[11px] leading-tight uppercase tracking-[0.08em] text-suede/80"
              >
                <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          {product.features.length > 0 && (
            <Accordion title="Details" defaultOpen>
              <ul className="space-y-1.5 list-disc pl-5">
                {product.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Accordion>
          )}
          {product.care.length > 0 && (
            <Accordion title="Care">
              <ul className="space-y-1.5 list-disc pl-5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Accordion>
          )}
          <Accordion title="Made to Order">
            Every piece is printed when you order it, just for you, so it may take a little longer to ship than
            off-the-shelf merch. Shipping and taxes are calculated at checkout.
          </Accordion>

          <div className="border-t border-suede/15 pt-7 mt-2">
            <h3 className="text-2xl mb-5">Pairs Well With</h3>
            <ul className="grid grid-cols-3 gap-3">
              {pairs.map((p) => (
                <li key={p.handle}>
                  <button type="button" onClick={() => onSelect(p)} className="group w-full text-left">
                    <span className="relative block aspect-square bg-blush overflow-hidden">
                      <Image
                        src={p.cutout.src}
                        alt=""
                        fill
                        sizes="140px"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      />
                    </span>
                    <span className="block text-[13px] leading-tight mt-2 group-hover:underline underline-offset-2">
                      {shortTitle(p.title)}
                    </span>
                    <span className="block text-[12px] text-suede/60 mt-0.5">{formatMoney(p.minPrice)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
