"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import { CATEGORIES, CURRENCY, FEATURES, MANUFACTURERS, VAT_RATES } from "@/constants/consts";
import { MOCK_PRODUCTS } from "@/mocks";
import type { Product } from "@/types/product";

const STORAGE_KEY = "3step-form-app:products:v1";

const storedProductSchema = z
  .object({
    id: z.string().min(1),
    name: z.string(),
    sku: z.string(),
    description: z.string(),
    manufacturer: z.enum(MANUFACTURERS),
    category: z.enum(CATEGORIES),
    features: z.array(z.enum(FEATURES)),
    netPriceCents: z.number().int().nonnegative(),
    grossPriceCents: z.number().int().nonnegative(),
    vatRate: z.number().refine((rate) => VAT_RATES.some((vat) => vat === rate)),
    currency: z.enum(CURRENCY),
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.number().int().nonnegative().nullable(),
    minQuantity: z.number().int().nonnegative(),
    maxQuantity: z.number().int().nonnegative(),
  })
  .refine((product) => product.maxQuantity >= product.minQuantity);

const readAddedProducts = (): Product[] => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      const result = storedProductSchema.safeParse(item);
      if (!result.success) return [];
      if (MOCK_PRODUCTS.some((mock) => mock.id === result.data.id)) return [];
      return [result.data];
    });
  } catch {
    return [];
  }
};

export const useProducts = () => {
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // localStorage is read after mount so the server markup stays the same.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddedProducts(readAddedProducts());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addedProducts));
    } catch {
      // The product stays in memory for this session.
    }
  }, [loaded, addedProducts]);

  const addProduct = (product: Product) => {
    setAddedProducts((current) => [product, ...current]);
  };

  const updateProduct = (product: Product) => {
    setAddedProducts((current) => current.map((item) => (item.id === product.id ? product : item)));
  };

  const deleteProduct = (id: string) => {
    setAddedProducts((current) => current.filter((item) => item.id !== id));
  };

  return {
    products: [...addedProducts, ...MOCK_PRODUCTS],
    addedProductIds: new Set(addedProducts.map((product) => product.id)),
    loaded,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
