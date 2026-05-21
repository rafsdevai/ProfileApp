import type { Metadata } from "next";

import { I18nProvider } from "@/components/I18nProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rafaelstefanache.com"),
  title:
    "Rafael Stefanache | AI Automation Developer & Full-Stack Developer Romania",
  description:
    "AI Automation Developer, FastAPI Developer and Full-Stack Developer in Romania building custom web applications, SaaS products, AI workflow automation and Informatics mentoring for Atestat projects.",
  keywords: [
    "AI Automation Developer",
    "Full-Stack Developer Romania",
    "FastAPI Developer",
    "Custom Web Applications",
    "SaaS Developer",
    "AI Consultant Romania",
    "AI Workflow Automation",
    "Informatics Mentoring Romania",
    "Atestat Informatica Mentor",
    "Rafael Stefanache",
  ],
  authors: [{ name: "Rafael Stefanache" }],
  creator: "Rafael Stefanache",
  publisher: "Rafael Stefanache",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Rafael Stefanache | AI Automation Developer & Full-Stack Developer Romania",
    description:
      "Practical AI workflow automation, custom web applications, SaaS development and Informatics mentoring in Romania.",
    url: "/",
    siteName: "Rafael Stefanache Portfolio",
    images: [
      {
        url: "/images/hero-rafael.png",
        width: 1200,
        height: 630,
        alt: "Rafael Stefanache, AI Automation Developer and Full-Stack Developer Romania",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Rafael Stefanache | AI Automation Developer & Full-Stack Developer Romania",
    description:
      "AI workflow automation, FastAPI development, custom web applications, SaaS products and Informatics mentoring.",
    images: ["/images/hero-rafael.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
