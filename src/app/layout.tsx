import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@/components/site/Analytics";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Fresh Miswak Delivered`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | Fresh Miswak Delivered`,
    description: siteConfig.description,
    images: [
      {
        url: "/product/subscription-box.webp",
        width: 1600,
        height: 1600,
        alt: "An open Miswak Club subscription box holding kraft-wrapped Miswak sticks.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Fresh Miswak Delivered`,
    description: siteConfig.description,
    images: ["/product/subscription-box.webp"],
  },
  icons: {
    icon: [{ url: "/brand/mark-mc.png", type: "image/png" }],
    apple: [{ url: "/brand/mark-mc.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#183d2b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
