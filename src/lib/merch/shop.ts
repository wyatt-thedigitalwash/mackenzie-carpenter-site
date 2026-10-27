// Shared shop types and helpers. Safe to import from client components (no
// catalog data lives here). The shapes mirror what the Storefront API returns.

export const STORE_DOMAIN = "https://mackcarpmerch.myshopify.com";

export type ShopCategory = "Apparel" | "Hats" | "Accessories";

export const CATEGORIES: ShopCategory[] = ["Apparel", "Hats", "Accessories"];

export interface ShopImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ShopVariant {
  id: number;
  title: string;
  options: string[];
  price: number;
  available: boolean;
  image: string | null;
}

export interface ShopProduct {
  handle: string;
  title: string;
  category: ShopCategory;
  productType: string;
  featured: boolean;
  intro: string;
  features: string[];
  care: string[];
  options: { name: string; values: string[] }[];
  variants: ShopVariant[];
  images: ShopImage[];
  /** Background-removed primary image, used where products sit on the water */
  cutout: ShopImage;
  minPrice: number;
  maxPrice: number;
}

export interface FeaturedItem {
  product: ShopProduct;
  image: ShopImage;
}

export interface CartLine {
  variantId: number;
  quantity: number;
  product: ShopProduct;
  variant: ShopVariant;
}

export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

// Shopify cart permalink: /cart/{variantId}:{qty},... builds a cart and drops
// the shopper straight into Shopify checkout. The live build replaces this
// with the Storefront API cart's checkoutUrl.
// An optional ?discount= param pre-applies a discount code at checkout.
export function checkoutUrl(lines: { variantId: number; quantity: number }[], discountCode?: string) {
  const items = lines.map((l) => `${l.variantId}:${l.quantity}`).join(",");
  const code = discountCode?.trim();
  return `${STORE_DOMAIN}/cart/${items}${code ? `?discount=${encodeURIComponent(code)}` : ""}`;
}

// Swatch fills for the store's color option values. Two-tone hats list crown
// then brim, rendered as a split swatch.
export const COLOR_SWATCHES: Record<string, string[]> = {
  Pepper: ["#5E5F59"],
  Ivory: ["#F3EDDC"],
  "Solid White Blend": ["#FBFBF9"],
  Natural: ["#EEE4CF"],
  "Red / Natural": ["#EEE4CF", "#C8272D"],
  "Navy / Natural": ["#EEE4CF", "#1F2A48"],
};

// "Mackenzie Carpenter Canvas Tote" -> "Canvas Tote", for tight spaces
export function shortTitle(title: string) {
  return title.replace("Mackenzie Carpenter ", "");
}
