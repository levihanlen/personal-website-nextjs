import type { Metadata } from "next";
import "./globals.css";
import { PageLayout } from "./clientComponents";
import { Libre_Franklin } from "next/font/google";
const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

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
      </body>
    </html>
  );
}
