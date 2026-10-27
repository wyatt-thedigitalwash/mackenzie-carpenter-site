import Image from "next/image";
import { formatMoney, type ShopProduct } from "@/lib/merch/shop";

function sizeSummary(product: ShopProduct) {
  const size = product.options.find((o) => o.name === "Size");
  if (product.category !== "Apparel" || !size || size.values.length < 2) return null;
  return `${size.values[0]} - ${size.values[size.values.length - 1]}`;
}

// Products float on the pool background as cutouts. Alternating tilts keep the
// grid feeling loose, like pieces laid out by hand.
const TILTS = ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]"];

export default function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: ShopProduct;
  index: number;
  onOpen: () => void;
}) {
  const sizes = sizeSummary(product);
  const price =
    product.minPrice === product.maxPrice ? formatMoney(product.minPrice) : `From ${formatMoney(product.minPrice)}`;

  return (
    <article className="group relative text-center">
      <div className="relative aspect-square">
        {/* Soft light pooling under the piece on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-[12%] rounded-full bg-ivory/0 blur-3xl transition-colors duration-500 group-hover:bg-ivory/15"
        />
        <div className="absolute inset-[10%] flex items-center justify-center">
          <Image
            src={product.cutout.src}
            alt={product.cutout.alt}
            width={product.cutout.width}
            height={product.cutout.height}
            sizes="(min-width: 1024px) 30vw, 45vw"
            className={`max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.45)] transition-[translate,rotate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              TILTS[index % TILTS.length]
            } group-hover:-translate-y-3 group-hover:rotate-0 group-hover:scale-[1.04]`}
          />
        </div>
        {product.featured && (
          <span className="absolute top-[6%] left-[4%] rotate-[-6deg] bg-red text-ivory text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1">
            Fan Favorite
          </span>
        )}
      </div>

      <div className="pt-2">
        <h3 className="text-xl md:text-2xl leading-snug text-ivory">
          {/* Stretched button: its ::after covers the whole card so the image is clickable too */}
          <button
            type="button"
            onClick={onOpen}
            style={{ fontFamily: "var(--font-heading)" }}
            className="group-hover:underline underline-offset-[6px] decoration-1 decoration-ivory/60 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold"
          >
            {product.title}
          </button>
        </h3>
        <p className="mt-2 text-[15px] text-blush">{price}</p>
        {sizes && <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-ivory/50">{sizes}</p>}
      </div>
    </article>
  );
}
