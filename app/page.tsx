"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookingDialog from "@/components/BookingDialog"
import BlogSection from "@/components/BlogSection"
import ProductsSection from "@/components/ProductsSection"
import Image from "next/image"
import MediaSection from '@/components/MediaSection'
import Script from 'next/script'
import ServicesSection from "@/components/Services"
import { organizationSchema, localBusinessSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/structured-data"

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
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Enhanced Structured Data for AI Understanding */}
      <Script
        id="json-ld-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        strategy="beforeInteractive"
      />

      <Header />
      
      <main className="flex-1">
        
        <section 
          id="hero" 
          className="pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden"
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
                <motion.div 
                  variants={fadeInUp}
                  className="inline-flex items-center justify-center w-fit px-4 py-1.5 mb-6 text-sm font-medium bg-gray-100 text-gray-800 rounded-full"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  <span>Custom Software Development</span>
                </motion.div>
                
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
                >
                  Bytesavy
                  <span className="block text-2xl md:text-3xl font-normal mt-2 text-gray-700">
                    A custom software studio
                  </span>
                </motion.h1>
                
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  We build custom software solutions that solve your unique business challenges and drive measurable results. Our expert team delivers tailored applications that streamline operations and accelerate growth.
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
                      className="group border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 w-full sm:w-auto"
                    >
                      Our Solutions
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>

                  </motion.div>
                
                {/* Trusted by section - integrated into hero */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-2 pt-4"
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
              
              {/* Right column - Image with chat bubble */}
              <motion.div
                className="relative"
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/bg12.jpg" // Keep using your existing image
                    alt="ByteSavy - Custom Software Development"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-lg"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg" />
                </div>
                
                {/* Chat bubble overlay - similar to Bard's design */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg max-w-xs">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">BS</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        "Let us transform your business operations with custom software that addresses your specific needs and challenges."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
     
        

        <ServicesSection/>
       
        <section className="w-full bg-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <ProductsSection />
          </div>
        </section>
        
        <section className="w-full bg-white py-20 relative mb-8">
          <div className="container mx-auto px-4 md:px-6">
            <BlogSection />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-b-3xl"></div>
        </section>
      </main>
      <MediaSection />
      <Footer />
    </div>
  )
}