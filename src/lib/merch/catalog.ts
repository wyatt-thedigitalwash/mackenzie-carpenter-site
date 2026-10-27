import catalog from "./catalog.json";
import type { FeaturedItem, ShopCategory, ShopProduct } from "./shop";

// Static snapshot of the Shopify store (extracted 2026-09-24). Server-only:
// swapping getProducts() for live Storefront API queries later should not
// require changes to the shop UI.

const CATEGORY_BY_TYPE: Record<string, ShopCategory> = {
  "T-Shirt": "Apparel",
  "Tank Top": "Apparel",
  Sweatshirt: "Apparel",
  Hats: "Hats",
  Bags: "Accessories",
  Accessories: "Accessories",
};

// Some Printify descriptions open with just the product name as a lone line
// (e.g. `Mack Carp's Classic Face Tee`). That duplicates the title, so only
// keep intros that read as actual sentences.
function cleanIntro(intro: string) {
  return /[.!?]/.test(intro) ? intro : "";
}

export function getProducts(): ShopProduct[] {
  return catalog.products.map((p) => ({
    handle: p.handle,
    title: p.title,
    category: CATEGORY_BY_TYPE[p.productType] ?? "Accessories",
    productType: p.productType,
    featured: p.featured,
    intro: cleanIntro(p.description.intro),
    features: p.description.features,
    care: p.description.care,
    options: p.options,
    variants: p.variants.map((v) => ({
      id: v.id,
      title: v.title,
      options: v.options,
      price: v.price,
      available: v.available,
      image: v.imageSrc,
    })),
    images: p.images.map(({ src, width, height, alt }) => ({ src, width, height, alt })),
    cutout: p.cutout,
    minPrice: p.priceRange.min,
    maxPrice: p.priceRange.max,
  }));
}

// The folded face tees shown in the stacked hero, top of the pile first.
export function getFeatured(products: ShopProduct[]): FeaturedItem[] {
  return catalog.store.featured.flatMap(({ handle, image }) => {
    const product = products.find((p) => p.handle === handle);
    return product ? [{ product, image }] : [];
  });
}
