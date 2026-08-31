import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-photobooth-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-photobooth-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bytesavy Photobooths | Corporate Photo Activations | Bytesavy Entertainment",
  description:
    "Premium corporate photo experiences, holiday party photo booths, brand activations, executive headshots, and team photoshoots across Toronto and the GTA. Studio-quality imagery with white-glove production.",
  keywords: [
    "corporate photo booth Toronto",
    "corporate event photo booth",
    "brand activation photo booth",
    "conference photo booth Toronto",
    "trade show photo booth",
    "product launch photo booth",
    "branded photo booth rental",
    "photo booth lead capture",
    "corporate photo booth GTA",
    "corporate holiday party photo booth",
    "executive headshots Toronto",
    "corporate team photoshoot",
    "on location portrait studio",
    "corporate photo booth Mississauga",
    "360 photo booth Toronto",
    "experiential marketing Toronto",
    "Bytesavy Entertainment",
    "Bytesavy Photobooths",
  ],
  openGraph: {
    type: "website",
    title: "Bytesavy Photobooths | Corporate Photo Activations",
    description:
      "Elevated photo experiences, brand activations, and on-location portrait studios for corporate events and remarkable teams across Toronto and the GTA.",
    url: "https://bytesavy.com/photobooths",
    images: [
      {
        url: "/photobooths/corporate-gala.jpg",
        width: 2200,
        height: 1468,
        alt: "Premium corporate gala photo experience by Bytesavy",
      },
    ],
    siteName: "Bytesavy Photobooths",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://bytesavy.com/photobooths",
  },
};

export default function PhotoboothsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} font-[family-name:var(--font-photobooth-body)]`}>
      {children}
    </div>
  );
}
