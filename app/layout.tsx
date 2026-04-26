import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModaCert | Luxury Authentication for Bags, Watches, Shoes & More",
  description:
    "Authenticate designer handbags, shoes, watches, clothing, jewelry, and accessories with ModaCert's expert luxury verification workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
