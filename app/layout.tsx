import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Font configurations with enhanced performance
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"],
});

// Enhanced viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

// Enhanced metadata for AI and traditional SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bytesavy.com"),
  title: {
    default: "Bytesavy | AI-Powered Digital Solutions & Software Development",
    template: "%s | Bytesavy - Expert Digital Solutions"
  },
  description: "Bytesavy is a premier technology company specializing in AI-driven digital solutions, custom web development, mobile applications, and enterprise software. We transform businesses through innovative technology solutions, machine learning implementations, and cutting-edge software development. Trusted by startups and Fortune 500 companies.",
  
  // Enhanced application metadata
  applicationName: "Bytesavy Digital Solutions",
  authors: [
    { name: "Bytesavy Development Team", url: "https://bytesavy.com/about" },
    { name: "Hashim Farooq", url: "https://bytesavy.com/team" }
  ],
  generator: "Next.js 14",
  
  // Comprehensive keywords for AI understanding
  keywords: [
    // Core services
    "AI solutions", "artificial intelligence development", "machine learning consulting",
    "web development", "custom web applications", "responsive web design",
    "mobile app development", "iOS development", "Android development", "React Native",
    "enterprise software", "business automation", "digital transformation",
    
    // Technical expertise
    "Next.js development", "React development", "TypeScript development",
    "Node.js backend", "API development", "cloud solutions", "AWS services",
    "database design", "Firebase development", "full-stack development",
    
    // Industry terms
    "software consulting", "technology consulting", "startup development",
    "SaaS development", "e-commerce solutions", "fintech development",
    "healthcare software", "EdTech solutions", "PropTech development",
    
    // Location and certification
    "Canadian software company", "Toronto tech company", "CanMade certified",
    "Made in Canada", "North American software development",
    
    // AI-specific terms
    "ChatGPT integration", "OpenAI development", "LLM implementation",
    "natural language processing", "computer vision", "predictive analytics",
    "AI automation", "intelligent systems", "ML model deployment"
  ],
  
  referrer: "origin-when-cross-origin",
  creator: "Bytesavy Digital Solutions Inc.",
  publisher: "Bytesavy",
  
  // Enhanced format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  category: "Business Technology Solutions",
  classification: "Software Development & AI Consulting",
  
  // Enhanced Open Graph for social sharing
  openGraph: {
    type: "website",
    siteName: "Bytesavy - AI-Powered Digital Solutions",
    title: "Bytesavy - Transforming Ideas into Intelligent Digital Reality",
    description: "Expert AI-powered digital solutions for modern businesses. Custom software development, machine learning implementation, and enterprise-grade applications. Trusted by industry leaders worldwide.",
    url: "https://bytesavy.com",
    locale: "en_CA",
    countryName: "Canada",
    emails: ["hello@bytesavy.com"],
    phoneNumbers: ["+1-647-XXX-XXXX"], // Add your actual number
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bytesavy - AI-Powered Digital Solutions for Modern Businesses",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Bytesavy Logo - Digital Innovation",
        type: "image/jpeg",
      },
    ],
  },
  
  // Enhanced Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@bytesavy",
    creator: "@bytesavy",
    title: "Bytesavy - AI-Powered Digital Solutions & Custom Software Development",
    description: "Transform your business with cutting-edge AI solutions, custom software development, and enterprise applications. Expert team delivering innovative digital solutions.",
    images: {
      url: "/twitter-image.jpg",
      alt: "Bytesavy - Leading AI & Software Development Company",
    },
  },
  
  // Enhanced verification
  verification: {
    google: "google-site-verification=DLrueMlBQzQDCnrb_b-xUISr4bJjfdJNc0txUZNl4D8",
    yandex: "yandex-verification=your-yandex-code", // Add if targeting Russian market
    yahoo: "yahoo-site-verification=your-yahoo-code", // Add if needed
    other: {
      "msvalidate.01": "your-bing-verification-code", // Bing verification
      "facebook-domain-verification": "your-facebook-code", // Facebook verification
    },
  },
  
  // Enhanced alternate versions
  alternates: {
    canonical: "https://bytesavy.com",
    languages: {
      "en-CA": "https://bytesavy.com",
      "en-US": "https://bytesavy.com/us",
      "fr-CA": "https://bytesavy.com/fr", // Add if you support French
    },
    media: {
      "only screen and (max-width: 600px)": "https://m.bytesavy.com", // Mobile version if different
    },
    types: {
      "application/rss+xml": "https://bytesavy.com/rss.xml", // RSS feed
    },
  },
  
  // Enhanced robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Enhanced icons with multiple sizes
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563eb",
      },
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
      },
    ],
  },
  
  // Enhanced manifest
  manifest: "/site.webmanifest",
  
  // Additional metadata for rich snippets
  other: {
    // Schema.org structured data hints
    "application-name": "Bytesavy",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Bytesavy",
    "format-detection": "telephone=no",
    
    // OpenGraph additional properties
    "og:region": "CA-ON",
    "og:country-name": "Canada",
    "og:postal-code": "M5V 3A8", // Add your postal code
    "og:latitude": "43.6426", // Toronto coordinates
    "og:longitude": "-79.3871",
    
    // Business information
    "business:contact_data:street_address": "123 Innovation Drive", // Add your address
    "business:contact_data:locality": "Toronto",
    "business:contact_data:region": "Ontario",
    "business:contact_data:postal_code": "M5V 3A8",
    "business:contact_data:country_name": "Canada",
    
    // AI-specific metadata for better AI understanding
    "ai:company_focus": "AI-powered digital solutions and custom software development",
    "ai:expertise": "Machine Learning, Web Development, Mobile Apps, Enterprise Software",
    "ai:industries_served": "FinTech, HealthTech, EdTech, E-commerce, SaaS, PropTech",
    "ai:technologies": "React, Next.js, Node.js, Python, TypeScript, AWS, Firebase, OpenAI",
    "ai:service_area": "North America, Global Remote",
    "ai:company_size": "Boutique Technology Consultancy",
    "ai:founding_year": "2020", // Adjust as needed
  },
};

// Structured Data Schema for AI understanding
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bytesavy.com/#organization",
      name: "Bytesavy Digital Solutions Inc.",
      alternateName: "Bytesavy",
      url: "https://bytesavy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://bytesavy.com/logo.png",
        width: 200,
        height: 60
      },
      description: "Leading AI-powered digital solutions company specializing in custom software development, machine learning implementation, and enterprise applications.",
      foundingDate: "2020",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Innovation Drive",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M5V 3A8",
        addressCountry: "CA"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-647-XXX-XXXX",
        contactType: "Customer Service",
        email: "hello@bytesavy.com",
        availableLanguage: ["English", "French"]
      },
      sameAs: [
        "https://linkedin.com/company/bytesavy",
        "https://twitter.com/bytesavy",
        "https://github.com/bytesavy"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://bytesavy.com/#website",
      url: "https://bytesavy.com",
      name: "Bytesavy - AI-Powered Digital Solutions",
      description: "Expert AI and software development services for modern businesses",
      publisher: {
        "@id": "https://bytesavy.com/#organization"
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://bytesavy.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en-CA"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Enhanced preconnect and DNS prefetch */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://analytics.vercel.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://firebase.googleapis.com" />
        
        {/* Structured Data for AI and search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Additional SEO meta tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="geography" content="Toronto, Ontario, Canada" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="worldwide" />
        
        {/* Microsoft specific */}
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme color for different browsers */}
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        
        {/* Prevent automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Cache control for better performance */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        
        {/* Analytics and Performance Monitoring */}
        <Analytics />
        
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}