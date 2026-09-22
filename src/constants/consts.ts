export const ITEMS_PER_PAGE = 5;

export const CURRENCY = {
  PLN: "PLN",
  EUR: "EUR",
  USD: "USD",
} as const;

export const CATEGORIES = ["computers", "phones", "tv", "appliances", "accessories"] as const;

export const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  computers: "Komputery",
  phones: "Telefony",
  tv: "RTV",
  appliances: "AGD",
  accessories: "Akcesoria",
};

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

export const FEATURE_LABELS: Record<(typeof FEATURES)[number], string> = {
  bluetooth: "Bluetooth",
  wifi: "WiFi",
  usbC: "USB-C",
  waterproof: "Wodoodporny",
  wireless: "Bezprzewodowy",
  ecoFriendly: "Ekologiczny",
  premium: "Premium",
};

export const VAT_RATES = [23, 8, 5, 0] as const;
