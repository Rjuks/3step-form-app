export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";
export const localeCookie = "3step-form-app-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "pl" || value === "en";
}
