"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookingDialog from "@/components/BookingDialog"
import BlogSection from "@/components/BlogSection"
import Image from "next/image"
import MediaSection from '@/components/MediaSection'
import Script from 'next/script'
import ServicesSection from "@/components/Services"
import { organizationSchema, localBusinessSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/structured-data"
import { useState, useEffect } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 }}
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Hero slideshow images
const heroImages = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg"
]

// Comprehensive JSON-LD Schema for SEO, AEO, and GEO
const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    localBusinessSchema,
    faqSchema,
    howToSchema,
    {
      "@type": "WebSite",
      "@id": "https://bytesavy.com/#website",
      "url": "https://bytesavy.com",
      "name": "Bytesavy - Custom Software Development & AI Solutions in Canada",
      "description": "Leading Canadian software development company offering custom web apps, mobile applications, AI integration, and enterprise solutions. Serving businesses across Toronto, Vancouver, Montreal, Calgary, and all of Canada.",
      "publisher": {
        "@id": "https://bytesavy.com/#organization"
      },
      "inLanguage": "en-CA",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://bytesavy.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfessionalService",
      "name": "Bytesavy Software Development Services",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Innovation Drive",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "postalCode": "M5V 3A8",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.6426,
        "longitude": -79.3871
      },
      "url": "https://bytesavy.com",
      "telephone": "+1-647-XXX-XXXX",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ]
};

export default function Website() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Structured Data for AI Understanding */}
      <Script
        id="json-ld-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        strategy="beforeInteractive"
      />

      <Header />

      <main className="flex-1">

        {/* Hero Section - Reduced padding */}
        <section
          id="hero"
          className="pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-white relative"
          aria-label="Hero section"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column - Text content */}
              <motion.div
                className="max-w-xl"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 tracking-tight"
                >
                  Your <span className="italic font-serif">Operations Have Evolved</span>. Your Software Should Too.
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-primary mb-8 leading-relaxed"
                >
                  Bytesavy partners with agribusiness and industrial organizations to replace outdated systems with practical, modern software built to perform in real-world conditions from day one.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <BookingDialog
                    onOpenChange={() => {}}
                  />

                  <Link href="/product" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
                    >
                      Our Solutions
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trusted by section - integrated into hero */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-8 pt-6 border-t border-gray-100"
                >
                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    {/* Manitoba Crop Alliance Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                      <Image
                        src="/MCA_logo.png"
                        alt="Manitoba Crop Alliance"
                        width={140}
                        height={48}
                        className="h-9 w-auto object-contain"
                      />
                    </div>

                    {/* Alberta Grains Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                      <Image
                        src="/ab_grains.png"
                        alt="Alberta Grains"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain"
                      />
                    </div>

                    {/* South East Research Farm Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100">
                      <Image
                        src="/serf.jpg"
                        alt="South East Research Farm"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right column - Image Slideshow */}
              <motion.div
                className="relative"
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`ByteSavy - Custom Software Development ${index + 1}`}
                        fill
                        className="object-cover rounded-2xl"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-accent/10 to-transparent rounded-2xl" />
                    </div>
                  ))}

                  {/* Slideshow dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Wave Divider - Positioned at bottom of hero */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
            {/* First Wave Layer (Green) - Bigger */}
            <svg
              className="block w-full h-[180px]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M0,0 Q300,50 600,20 T1200,0 L1200,120 L0,120 Z"
                fill="#5EA852"
                opacity="0.7"
              />
            </svg>

            {/* Second Wave Layer (Primary Navy Blue) */}
            <svg
              className="block w-full h-[120px] -mt-28"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M0,10 Q300,60 600,30 T1200,10 L1200,120 L0,120 Z"
                fill="#01345F"
                opacity="0.8"
              />
            </svg>

            {/* Third Wave Layer (White - matches services bg) */}
            <svg
              className="block w-full h-[120px] -mt-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M0,25 Q300,75 600,45 T1200,25 L1200,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* Services Section - Reduced spacing, added background */}
        <section className="bg-white pt-0 md:pt-0 pb-12 md:pb-16">
          <ServicesSection/>
        </section>

        {/* Blog Section - Clean spacing, removed weird bottom div */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <BlogSection />
          </div>
        </section>

        {/* Media Section - has its own padding and background */}
        <MediaSection />
      </main>

      <Footer />
    </div>
  )
}