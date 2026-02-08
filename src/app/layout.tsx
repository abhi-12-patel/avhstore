import "./globals.css";

import type { Metadata } from "next";
import Providers from "./providers";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AVH Store - Exquisite Jewelry for Every Occasion",
  description: "Fine jewelry crafted with exceptional attention to detail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
