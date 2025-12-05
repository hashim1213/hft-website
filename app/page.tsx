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

        {/* Hero Section - Reduced padding */}
        <section
          id="hero"
          className="pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
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
                  className="inline-flex items-center justify-center w-fit px-4 py-1.5 mb-6 text-sm font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
                  <span>Trusted by Canadian Businesses</span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
                >
                  Custom Software That
                  <span className="block text-blue-600">Solves Real Problems</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                >
                  We build tailored web and mobile applications for businesses in Agriculture, Healthcare, Manufacturing, and Retail. From process automation to customer-facing apps, we turn your operational challenges into competitive advantages.
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
                      View Our Work
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Key Benefits */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                      <p className="text-sm text-gray-600">Launch in weeks, not months</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Secure & Compliant</h3>
                      <p className="text-sm text-gray-600">Enterprise-grade security</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Built to Scale</h3>
                      <p className="text-sm text-gray-600">Grows with your business</p>
                    </div>
                  </div>
                </motion.div>

                {/* Trusted by section - integrated into hero */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 pt-8 border-t border-gray-200"
                >
                  <p className="text-sm font-medium text-gray-500 mb-6">TRUSTED BY LEADING ORGANIZATIONS</p>
                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    {/* Manitoba Crop Alliance Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                      <Image
                        src="/MCA_logo.png"
                        alt="Manitoba Crop Alliance"
                        width={140}
                        height={48}
                        className="h-10 w-auto object-contain"
                      />
                    </div>

                    {/* Alberta Grains Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                      <Image
                        src="/ab_grains.png"
                        alt="Alberta Grains"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain"
                      />
                    </div>

                    {/* South East Research Farm Logo */}
                    <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/bg12.jpg"
                    alt="ByteSavy - Custom Software Development"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent rounded-2xl" />
                </div>

                {/* Stats overlay - professional design */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl border border-gray-100 max-w-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-gray-900">50+</span>
                        <span className="text-sm text-gray-600">Projects</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Delivered across Canada
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust & Statistics Section */}
        <section className="py-16 md:py-20 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-gray-600 text-sm md:text-base">Years Experience</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 text-sm md:text-base">Projects Delivered</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600 text-sm md:text-base">Client Satisfaction</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm md:text-base">Support Available</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section - Reduced spacing, added background */}
        <section className="py-12 md:py-16 bg-white">
          <ServicesSection/>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Why Canadian Businesses Choose Bytesavy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                We combine technical expertise with deep industry knowledge to deliver solutions that actually work for your business.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
                <p className="text-gray-600">
                  Specialized knowledge in Agriculture, Healthcare, Manufacturing, and Retail sectors means we understand your unique challenges.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Partnership</h3>
                <p className="text-gray-600">
                  We're not just developers—we're your technology partner, committed to your long-term success with ongoing support and guidance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
                <p className="text-gray-600">
                  Successfully delivered 50+ projects across Canada with 100% client satisfaction—our results speak for themselves.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section - Subtle background for separation */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <ProductsSection />
          </div>
        </section>

        {/* Blog Section - Clean spacing, removed weird bottom div */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <BlogSection />
          </div>
        </section>

        {/* Media Section - has its own padding and background */}
        <MediaSection />

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Business with Custom Software?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8">
                  Let's discuss how we can build a tailored solution that addresses your unique challenges and drives measurable results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <BookingDialog onOpenChange={() => {}} />
                  <Link href="/contact" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm w-full sm:w-auto"
                    >
                      Send us a message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-sm text-blue-100">
                  Free consultation • No obligation • Tailored to your needs
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}