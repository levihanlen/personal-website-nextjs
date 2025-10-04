import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { libreFranklin } from "./utils/fonts";

export const metadata: Metadata = {
  title: "Levi Hanlen - Learn anything",
  description:
    "Curated articles, productivity tips, and practical guides to help you master new skills and achieve your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${libreFranklin.className} bg-lightest text-darkest`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
