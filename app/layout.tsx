import type { Metadata, Viewport } from "next";

import { ConsentAwareAnalytics } from "@/components/cookies/ConsentAwareAnalytics";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { defaultMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <CookieConsentProvider>
          <I18nProvider>{children}</I18nProvider>
          <ConsentAwareAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
