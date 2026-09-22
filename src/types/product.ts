import type { CATEGORIES, CURRENCY, FEATURES, MANUFACTURERS } from "@/constants/consts";

type Category = (typeof CATEGORIES)[number];
type Manufacturer = (typeof MANUFACTURERS)[number];
type Feature = (typeof FEATURES)[number];
type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  manufacturer: Manufacturer;
  category: Category;
  features: Feature[];
  netPriceCents: number;
  grossPriceCents: number;
  vatRate: number;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity: number | null;
  minQuantity: number;
  maxQuantity: number;
};
