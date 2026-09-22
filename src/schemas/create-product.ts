import { z } from "zod";

import { CATEGORIES, CURRENCY, FEATURES, MANUFACTURERS, VAT_RATES } from "@/constants/consts";
import { isNonNegativeInteger, priceSchema, quantitySchema } from "@/schemas/common";
import { grossFromNet, netFromGross, parseMoneyToCents } from "@/utils/price";

export const firstStepInformationSchema = z.object({
  name: z.string().trim().min(3, "Podaj nazwę o długości co najmniej 3 znaków."),
  sku: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]{1,24}$/, "SKU musi mieć 1–24 znaki i zawierać tylko litery oraz cyfry."),
  description: z.string(),
  manufacturer: z.string().pipe(z.enum(MANUFACTURERS, { error: "Wybierz producenta." })),
  category: z.string().pipe(z.enum(CATEGORIES, { error: "Wybierz kategorię." })),
  features: z
    .array(z.string().pipe(z.enum(FEATURES)))
    .min(1, "Wybierz co najmniej jedną cechę produktu."),
});

export const secondStepPricingSchema = z
  .object({
    netPrice: priceSchema,
    grossPrice: priceSchema,
    priceSource: z.enum(["netPrice", "grossPrice"]),
    vatRate: z
      .number()
      .refine((value) => VAT_RATES.some((rate) => rate === value), "Wybierz poprawną stawkę VAT."),
    currency: z.string().pipe(z.enum(CURRENCY, { error: "Wybierz walutę." })),
  })
  .superRefine((value, context) => {
    const netCents = parseMoneyToCents(value.netPrice);
    const grossCents = parseMoneyToCents(value.grossPrice);
    if (netCents === null || grossCents === null) return;

    const derivedField = value.priceSource === "netPrice" ? "grossPrice" : "netPrice";
    const expectedCents =
      value.priceSource === "netPrice"
        ? grossFromNet(netCents, value.vatRate)
        : netFromGross(grossCents, value.vatRate);
    const actualCents = derivedField === "grossPrice" ? grossCents : netCents;

    if (expectedCents !== actualCents) {
      context.addIssue({
        code: "custom",
        path: [derivedField],
        message: "Cena nie odpowiada wybranej stawce VAT.",
      });
    }
  });

export const thirdStepAvailabilitySchema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.string(),
    minQuantity: quantitySchema,
    maxQuantity: quantitySchema,
  })
  .superRefine((value, context) => {
    if (value.isLimited && !isNonNegativeInteger(value.stockQuantity)) {
      context.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: "Wpisz nieujemną, całkowitą ilość na magazynie.",
      });
    }

    if (
      isNonNegativeInteger(value.minQuantity) &&
      isNonNegativeInteger(value.maxQuantity) &&
      Number(value.minQuantity) > Number(value.maxQuantity)
    ) {
      context.addIssue({
        code: "custom",
        path: ["minQuantity"],
        message: "Minimum nie może być większe od maksimum.",
      });
      context.addIssue({
        code: "custom",
        path: ["maxQuantity"],
        message: "Maksimum nie może być mniejsze od minimum.",
      });
    }
  });

export const createProductSchema = firstStepInformationSchema
  .and(secondStepPricingSchema)
  .and(thirdStepAvailabilitySchema);

export type ProductFormValues = z.input<typeof createProductSchema>;
