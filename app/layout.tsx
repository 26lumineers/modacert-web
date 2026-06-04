import type { Metadata } from "next";
import { Aboreto, Jomolhari, Jost } from "next/font/google";
import { ApiLoadingOverlay } from "./_lib/api-loading";
import "./globals.css";

const logoFont = Aboreto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo-next",
});

const displayFont = Jomolhari({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-next",
});

const bodyFont = Jost({
  subsets: ["latin"],
  variable: "--font-body-next",
});

export const metadata: Metadata = {
  title: "ModaCert | Luxury Authentication",
  description:
    "Authenticate designer bags, fashion, watches, jewelry, and accessories through ModaCert's expert-reviewed checkout workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${logoFont.variable} ${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full" suppressHydrationWarning>
        <ApiLoadingOverlay />
        {children}
      </body>
    </html>
  );
}
