"use client";

import { useForm } from "@tanstack/react-form";

import {
  createProductSchema,
  firstStepInformationSchema,
  secondStepPricingSchema,
  type ProductFormValues,
} from "@/schemas/create-product";

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

const validateStep = (value: ProductFormValues, step: number) => {
  const schema =
    step === 0
      ? firstStepInformationSchema
      : step === 1
        ? secondStepPricingSchema
        : createProductSchema;

  const result = schema.safeParse(value);
  if (result.success) return undefined;

  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fields[field]) fields[field] = issue.message;
  }
  return { fields };
};

export const useProductForm = (step: number, onSubmit: (value: ProductFormValues) => void) => {
  return useForm({
    defaultValues,
    validators: {
      onChange: ({ value }) => validateStep(value, step),
      onSubmit: ({ value }) => validateStep(value, step),
    },
    onSubmit: ({ value }) => onSubmit(value),
  });
};

export type ProductFormApi = ReturnType<typeof useProductForm>;
