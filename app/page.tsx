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
import CommunityInitiatives from "@/components/CommunityInitiatives"
import CanmadeSection from '@/components/CanmadeSection'
import MediaSection from '@/components/MediaSection'
import Script from 'next/script'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ByteSavy",
  description: "ByteSavy is a Canadian technology company specializing in AI-driven solutions including CanMade - an innovative tool for identifying Canadian products.",
  url: "https://bytesavy.com",
  logo: "https://bytesavy.com/logo.png",
  sameAs: [
    "https://www.linkedin.com/company/bytesavy",
    "https://twitter.com/bytesavy"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brandon",
    addressRegion: "MB",
    addressCountry: "CA"
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "contact@bytesavy.com"
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://bytesavy.com"
  },
  award: [
    {
      "@type": "Award",
      name: "Featured in Winnipeg Sun",
      description: "Manitoban creates app that detects products made in Canada"
    },
    {
      "@type": "Award",
      name: "Featured in Winnipeg Free Press",
      description: "Touchscreen on pulse of buy-Canadian surge"
    }
  ]
};

export default function Website() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <main className="flex-1">
        <section 
          id="hero" 
          className="relative min-h-screen flex items-center overflow-hidden"
          aria-label="Hero section"
        >
          <Image
            src="/bg12.jpg"
            alt="ByteSavy - Transforming Ideas into Digital Reality"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j..." 
          />
          
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-20 container mx-auto px-4 md:px-6">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center justify-center w-fit px-4 py-1.5 mb-6 text-sm font-medium text-primary-foreground bg-white/10 backdrop-blur-sm rounded-full"
              >
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Canadian Innovation</span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white mb-6"
              >
                Transforming Ideas into
                <span className="block text-primary-foreground">Digital Reality</span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="max-w-[700px] text-white/90 text-lg md:text-xl mb-8 mx-auto"
              >
                We blend creativity with cutting-edge AI technology to build transformative digital solutions. 
                Discover CanMade - our revolutionary app for identifying Canadian products.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <BookingDialog onOpenChange={() => {}} />
                
                <Link href="/contact" passHref>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20 w-full sm:w-auto"
                  >
                    Explore Our Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <MediaSection />
        <CanmadeSection />
        
        <section className="w-full bg-muted py-20">
          <div className="container mx-auto px-4 md:px-6">
            <CommunityInitiatives />
          </div>
        </section>
        
        <section className="w-full bg-background py-20">
          <div className="container mx-auto px-4 md:px-6">
            <ProductsSection />
          </div>
        </section>
        
        <section className="w-full bg-muted py-20 rounded-b-3xl mb-8">
          <div className="container mx-auto px-4 md:px-6">
            <BlogSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}