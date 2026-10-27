import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatMoney, shortTitle, type CartLine } from "@/lib/merch/shop";

export default function CartLineItem({
  line,
  onOpen,
  onUpdateQuantity,
}: {
  line: CartLine;
  onOpen: () => void;
  onUpdateQuantity: (quantity: number) => void;
}) {
  const { product, variant, quantity } = line;

  return (
    <li className="flex gap-4 py-5 border-b border-suede/10 motion-safe:animate-[navFadeIn_400ms_ease-out]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${product.title}`}
        className="group relative w-[92px] h-[108px] shrink-0 bg-[radial-gradient(circle_at_50%_40%,#FFF9F1,#F8DDCE)] overflow-hidden"
      >
        <Image
          src={product.cutout.src}
          alt=""
          fill
          sizes="92px"
          className="object-contain p-2.5 drop-shadow-[0_8px_8px_rgba(70,36,22,0.2)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        />
      </button>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="text-left text-[18px] leading-snug hover:underline underline-offset-4 decoration-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {shortTitle(product.title)}
          </button>
          <p className="text-[15px] shrink-0 tabular-nums">{formatMoney(variant.price * quantity)}</p>
        </div>

        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {variant.options.map((o) => (
              <span key={o} className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 bg-suede/[0.06] text-suede/70">
                {o}
              </span>
            ))}
          </div>
        )}
        {quantity > 1 && <p className="text-[12px] text-suede/50 mt-1.5">{formatMoney(variant.price)} each</p>}

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-center border border-suede/20" role="group" aria-label={`Quantity for ${product.title}`}>
            <button
              type="button"
              onClick={() => onUpdateQuantity(quantity - 1)}
              aria-label={quantity === 1 ? `Remove ${product.title}` : "Decrease quantity"}
              className="w-9 h-9 flex items-center justify-center hover:bg-suede/5"
            >
              {quantity === 1 ? <Trash2 size={13} aria-hidden="true" /> : <Minus size={13} aria-hidden="true" />}
            </button>
            <span className="w-7 text-center text-[14px] tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(Math.min(10, quantity + 1))}
              aria-label="Increase quantity"
              className="w-9 h-9 flex items-center justify-center hover:bg-suede/5"
            >
              <Plus size={13} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onUpdateQuantity(0)}
            className="text-[11px] uppercase tracking-[0.12em] text-suede/50 hover:text-red transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
