export const parseMoneyToCents = (value: string): number | null => {
  const normalized = value.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(normalized)) return null;

  const cents = Math.round(Number(normalized.replace(",", ".")) * 100);
  return Number.isSafeInteger(cents) ? cents : null;
};

export const centsToInput = (cents: number): string => {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
};

export const grossFromNet = (netCents: number, vatRate: number): number => {
  return Math.round((netCents * (100 + vatRate)) / 100);
};

export const netFromGross = (grossCents: number, vatRate: number): number => {
  return Math.round((grossCents * 100) / (100 + vatRate));
};

export const formatPrice = (cents: number, currency: string): string => {
  return `${centsToInput(cents).replace(".", ",")} ${currency}`;
};
