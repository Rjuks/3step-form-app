import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, isLocale, localeCookie } from "@/i18n/config";

export default getRequestConfig(async () => {
  const storedLocale = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(storedLocale) ? storedLocale : defaultLocale;
  const messages =
    locale === "pl"
      ? (await import("../../messages/pl.json")).default
      : (await import("../../messages/en.json")).default;

  return { locale, messages };
});
