import { z } from "zod";

import { parseMoneyToCents } from "@/utils/price";

export const isNonNegativeInteger = (value: string) =>
  /^\d+$/.test(value.trim()) && Number.isSafeInteger(Number(value));

export const createPriceSchema = (requiredMessage: string, invalidPriceMessage: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine((value) => parseMoneyToCents(value) !== null, invalidPriceMessage);

export const createQuantitySchema = (invalidQuantityMessage: string) =>
  z.string().refine(isNonNegativeInteger, invalidQuantityMessage);
