export const CURRENCY = {
  PLN: "PLN",
  EUR: "EUR",
  USD: "USD",
} as const;

export const CATEGORIES = ["computers", "phones", "tv", "appliances", "accessories"] as const;

export const MANUFACTURERS = ["Apple", "Samsung", "Sony", "Bosch", "Xiaomi", "Lenovo"] as const;

export const FEATURES = [
  "bluetooth",
  "wifi",
  "usbC",
  "waterproof",
  "wireless",
  "ecoFriendly",
  "premium",
] as const;

export const VAT_RATES = [23, 8, 5, 0] as const;
