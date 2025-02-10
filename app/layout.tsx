import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Font configurations
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://bytesavy.com"), // Replace with your actual domain
  title: {
    default: "Bytesavy | AI-Powered Digital Solutions",
    template: "%s | Bytesavy"
  },
  description: "Bytesavy is a leading technology company specializing in AI-driven digital solutions, web development, mobile apps, and enterprise software. Transform your business with our innovative solutions.",
  applicationName: "Bytesavy",
  authors: [{ name: "Bytesavy Team" }],
  generator: "Next.js",
  keywords: [
    "AI solutions",
    "web development",
    "mobile apps",
    "digital transformation",
    "enterprise software",
    "technology consulting",
    "artificial intelligence",
    "custom software",
    "business solutions",
    "digital innovation", 
    "CanMade", 
    "Made in Canada"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Bytesavy",
  publisher: "Bytesavy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "technology",
  
  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Bytesavy",
    title: "Bytesavy - Transforming Ideas into Digital Reality",
    description: "Innovative AI-powered digital solutions for modern businesses. Web development, mobile apps, and enterprise software solutions.",
    url: "https://bytesavy.com",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Bytesavy - Digital Solutions",
        type: "image/jpeg",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Bytesavy - AI-Powered Digital Solutions",
    description: "Transform your business with our innovative digital solutions.",
    creator: "@bytesavy",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
  },
  
  // Verification for search consoles
  verification: {
    google: "google-site-verification=DLrueMlBQzQDCnrb_b-xUISr4bJjfdJNc0txUZNl4D8"
  },
  
  // Alternate languages
  alternates: {
    canonical: "https://bytesavy.com",
    languages: {
      "en-US": "https://bytesavy.com",
      // Add more language versions if available
    },
  },
     
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  
  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Preconnect to important third-party domains */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}