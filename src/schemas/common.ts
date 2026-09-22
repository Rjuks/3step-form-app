import { z } from "zod";

import { parseMoneyToCents } from "@/utils/price";

export const isNonNegativeInteger = (value: string) =>
  /^\d+$/.test(value.trim()) && Number.isSafeInteger(Number(value));

export const priceSchema = z
  .string()
  .trim()
  .min(1, "To pole jest wymagane.")
  .refine(
    (value) => parseMoneyToCents(value) !== null,
    "Wpisz nieujemną kwotę z maksymalnie dwoma miejscami po przecinku.",
  );

export const quantitySchema = z
  .string()
  .refine(isNonNegativeInteger, "Wpisz nieujemną liczbę całkowitą.");
