import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sasi Maligai Kadai | Premium Tea, Snacks & Everyday Essentials",
  description: "Experience the rich taste and legacy of Sasi Maligai Kadai. Serving premium quality fresh teas, authentic South Indian bites, and hand-picked daily grocery essentials.",
  keywords: ["Sasi Maligai Kadai", "tea shop", "premium tea", "groceries", "Jolarpet tea shop", "filter coffee", "snacks"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
