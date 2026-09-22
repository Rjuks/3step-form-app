import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/toast";
import { routing } from "@/i18n/routing";

import "@/styles/globals.css";

export const metadata: Metadata = { title: "3step-form-app" };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body>
        <NextIntlClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster
            position="bottom-right"
            offset={{ right: 24, bottom: 24 }}
            mobileOffset={{ right: 16, bottom: 16, left: 16 }}
            duration={3000}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
