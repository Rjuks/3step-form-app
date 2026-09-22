import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/toast";

import "@/styles/globals.css";

export const metadata: Metadata = { title: "3step-form-app" };

type Props = { children: React.ReactNode };

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="pl" className={GeistSans.variable}>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster
          position="bottom-right"
          offset={{ right: 24, bottom: 24 }}
          mobileOffset={{ right: 16, bottom: 16, left: 16 }}
          duration={3000}
        />
      </body>
    </html>
  );
};

export default RootLayout;
