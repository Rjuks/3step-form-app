import { z } from "zod";

import { CATEGORIES, CURRENCY, FEATURES, MANUFACTURERS, VAT_RATES } from "@/constants/consts";
import { createPriceSchema, createQuantitySchema, isNonNegativeInteger } from "@/schemas/common";
import { grossFromNet, netFromGross, parseMoneyToCents } from "@/utils/price";

import type pl from "../../messages/pl.json";

type ValidationMessages = typeof pl.validation;

export const createProductSchemas = (error: ValidationMessages) => {
  const priceSchema = createPriceSchema(error.required, error.price);
  const quantitySchema = createQuantitySchema(error.quantity);

  const firstStepInformationSchema = z.object({
    name: z.string().trim().min(3, error.name),
    sku: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9]{1,24}$/, error.sku),
    description: z.string(),
    manufacturer: z.string().pipe(z.enum(MANUFACTURERS, { error: error.manufacturer })),
    category: z.string().pipe(z.enum(CATEGORIES, { error: error.category })),
    features: z.array(z.string().pipe(z.enum(FEATURES))).min(1, error.features),
  });

  const secondStepPricingSchema = z
    .object({
      netPrice: priceSchema,
      grossPrice: priceSchema,
      priceSource: z.enum(["netPrice", "grossPrice"]),
      vatRate: z.number().refine((value) => VAT_RATES.some((rate) => rate === value), error.vat),
      currency: z.string().pipe(z.enum(CURRENCY, { error: error.currency })),
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
        context.addIssue({ code: "custom", path: [derivedField], message: error.priceRelation });
      }
    });

  const thirdStepAvailabilitySchema = z
    .object({
      isAvailable: z.boolean(),
      isLimited: z.boolean(),
      stockQuantity: z.string(),
      minQuantity: quantitySchema,
      maxQuantity: quantitySchema,
    })
    .superRefine((value, context) => {
      if (value.isLimited && !isNonNegativeInteger(value.stockQuantity)) {
        context.addIssue({ code: "custom", path: ["stockQuantity"], message: error.stock });
      }

      if (
        isNonNegativeInteger(value.minQuantity) &&
        isNonNegativeInteger(value.maxQuantity) &&
        Number(value.minQuantity) > Number(value.maxQuantity)
      ) {
        context.addIssue({ code: "custom", path: ["minQuantity"], message: error.minQuantity });
        context.addIssue({ code: "custom", path: ["maxQuantity"], message: error.maxQuantity });
      }
    });

  return {
    firstStepInformationSchema,
    secondStepPricingSchema,
    createProductSchema: firstStepInformationSchema
      .and(secondStepPricingSchema)
      .and(thirdStepAvailabilitySchema),
  };
};

export type ProductFormValues = z.input<
  ReturnType<typeof createProductSchemas>["createProductSchema"]
>;
export type ProductFormData = z.output<
  ReturnType<typeof createProductSchemas>["createProductSchema"]
>;
