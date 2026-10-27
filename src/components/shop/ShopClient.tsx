"use client";

import { useMemo, useState } from "react";
import FeaturedStack from "./FeaturedStack";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";
import CartDrawer from "./CartDrawer";
import {
  CATEGORIES,
  type CartLine,
  type FeaturedItem,
  type ShopCategory,
  type ShopProduct,
  type ShopVariant,
} from "@/lib/merch/shop";

type Filter = "All" | ShopCategory;

export default function ShopClient({ products, featured }: { products: ShopProduct[]; featured: FeaturedItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<ShopProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);

  const filters: { label: Filter; count: number }[] = useMemo(
    () => [
      { label: "All", count: products.length },
      ...CATEGORIES.map((c) => ({ label: c, count: products.filter((p) => p.category === c).length })),
    ],
    [products]
  );

  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);

  function addToCart(product: ShopProduct, variant: ShopVariant, quantity: number) {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === variant.id);
      if (existing) {
        return prev.map((l) => (l.variantId === variant.id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { variantId: variant.id, quantity, product, variant }];
    });
    setActive(null);
    setCartOpen(true);
  }

  function updateQuantity(variantId: number, quantity: number) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }

  return (
    <>
      <section aria-label="Featured tees" className="px-5 md:px-8 pb-24 md:pb-32">
        <FeaturedStack items={featured} onAdd={addToCart} onOpen={setActive} />
      </section>

      <section aria-labelledby="collection-heading" className="px-3 md:px-8 pb-20 md:pb-28">
        <h2 id="collection-heading" className="text-center text-4xl md:text-5xl text-ivory mb-8 md:mb-10">
          Shop the Collection
        </h2>

        <FilterBar
          filters={filters}
          active={filter}
          onChange={setFilter}
          itemCount={itemCount}
          onOpenBag={() => setCartOpen(true)}
        />

        <ul className="mx-auto max-w-[1200px] grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 md:gap-x-10 md:gap-y-12 pt-10 md:pt-14 px-2 md:px-0">
          {visible.map((product, i) => (
            <li key={product.handle}>
              <ProductCard product={product} index={i} onOpen={() => setActive(product)} />
            </li>
          ))}
        </ul>
      </section>

      <QuickView
        product={active}
        products={products}
        onClose={() => setActive(null)}
        onAdd={addToCart}
        onSelect={setActive}
      />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        products={products}
        featured={featured}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onOpenProduct={(product) => {
          setCartOpen(false);
          setActive(product);
        }}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}
