"use client";

import { useForm } from "@tanstack/react-form";
import { useLocale, useMessages, type Locale } from "next-intl";
import { useMemo } from "react";

import {
  createProductSchemas,
  type ProductFormData,
  type ProductFormValues,
} from "@/schemas/create-product";
import type { Product } from "@/types/product";
import { centsToInput, grossFromNet } from "@/utils/price";

const defaultValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: "",
  category: "",
  features: [],
  netPrice: "",
  grossPrice: "",
  priceSource: "netPrice",
  vatRate: 23,
  currency: "PLN",
  isAvailable: true,
  isLimited: false,
  stockQuantity: "",
  minQuantity: "1",
  maxQuantity: "10",
};

const valuesFromProduct = (product: Product, locale: Locale): ProductFormValues => ({
  name: product.name,
  sku: product.sku,
  description: product.description,
  manufacturer: product.manufacturer,
  category: product.category,
  features: product.features,
  netPrice: centsToInput(product.netPriceCents, locale),
  grossPrice: centsToInput(product.grossPriceCents, locale),
  priceSource:
    grossFromNet(product.netPriceCents, product.vatRate) === product.grossPriceCents
      ? "netPrice"
      : "grossPrice",
  vatRate: product.vatRate,
  currency: product.currency,
  isAvailable: product.isAvailable,
  isLimited: product.isLimited,
  stockQuantity: product.stockQuantity === null ? "" : String(product.stockQuantity),
  minQuantity: String(product.minQuantity),
  maxQuantity: String(product.maxQuantity),
});

const validateStep = (
  value: ProductFormValues,
  step: number,
  schemas: ReturnType<typeof createProductSchemas>,
) => {
  const schema =
    step === 0
      ? schemas.firstStepInformationSchema
      : step === 1
        ? schemas.secondStepPricingSchema
        : schemas.createProductSchema;

  const result = schema.safeParse(value);
  if (result.success) return undefined;

  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fields[field]) fields[field] = issue.message;
  }
  return { fields };
};

export const useProductForm = (
  step: number,
  onContinue: () => void,
  onSave: (value: ProductFormData) => void,
  product?: Product,
) => {
  const locale = useLocale();
  const schemas = createProductSchemas(useMessages().validation);
  const initialValues = useMemo(
    () => (product ? valuesFromProduct(product, locale) : defaultValues),
    [product, locale],
  );

  return useForm({
    defaultValues: initialValues,
    validators: {
      onChange: ({ value }) => validateStep(value, step, schemas),
      onSubmit: ({ value }) => validateStep(value, step, schemas),
    },
    onSubmit: ({ value }) => {
      if (step < 2) onContinue();
      else onSave(schemas.createProductSchema.parse(value));
    },
  });
};

export type ProductFormApi = ReturnType<typeof useProductForm>;
