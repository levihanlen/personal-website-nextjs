import type { Metadata } from "next";
import "./globals.css";
import { Libre_Franklin } from "next/font/google";
import { PageLayout } from "./comp/PageLayout";
const libreFranklin = Libre_Franklin({ subsets: ["latin"] });
// const ebGaramond = EB_Garamond({ subsets: ["latin"] });

import { Analytics } from "@vercel/analytics/next";

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
        <PageLayout>{children}</PageLayout>
        <Analytics />
      </body>
    </html>
  );
}
