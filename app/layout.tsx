import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModaCert | Bag Authentication",
  description:
    "Authenticate designer handbags with ModaCert's bag-only launch flow for brand selection, rates, photo guidance, and static upload steps.",
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
