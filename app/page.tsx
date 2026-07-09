"use client"

import { motion } from "framer-motion"
import { ArrowRightRegular, CheckmarkCircleRegular } from '@fluentui/react-icons'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookingDialog from "@/components/BookingDialog"
import BlogSection from "@/components/BlogSection"
import Image from "next/image"
import MediaSection from '@/components/MediaSection'
import Script from 'next/script'
import { organizationSchema, localBusinessSchema, faqSchema, howToSchema } from "@/lib/structured-data"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import RotatingIndustry from "@/components/RotatingIndustry"
import SEOFaq from "@/components/SEOFaq"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 }}
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// JSON-LD Schema for SEO
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
      "name": "Bytesavy Technologies - Legacy Industry Software Development Partner",
      "description": "We accelerate operational efficiency and growth for legacy industry organizations with custom software solutions built for real-world conditions.",
      "publisher": {
        "@id": "https://bytesavy.com/#organization"
      },
      "inLanguage": "en-CA"
    }
  ]
};

export default function Website() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Script
        id="json-ld-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        strategy="beforeInteractive"
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-white">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="space-y-8"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg"
                >
                  The <RotatingIndustry /> software modernization partner
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md"
                >
                  Bytesavy Technologies accelerates operational efficiency and growth with custom software solutions built for your industry.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="pt-2"
                >
                  <BookingDialog onOpenChange={() => {}} />
                </motion.div>

                {/* Trusted by logos */}
                <motion.div
                  variants={fadeInUp}
                  className="pt-8"
                >
                  <p className="text-sm text-white/80 mb-6 drop-shadow-md">{t('hero.trusted')}</p>
                  <div className="flex flex-wrap items-center gap-12">
                    <div className="opacity-80 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/MCA_logo.png"
                        alt="Manitoba Crop Alliance"
                        width={140}
                        height={50}
                        className="h-10 w-auto object-contain brightness-0 invert drop-shadow-md"
                      />
                    </div>
                    <div className="opacity-80 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/ab_grains.png"
                        alt="Alberta Grains"
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain brightness-0 invert drop-shadow-md"
                      />
                    </div>
                    <div className="opacity-80 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/serf_logo.png"
                        alt="South East Research Farm"
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain brightness-0 invert drop-shadow-md"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Software Lifecycle Journey - Visual Timeline with Curve */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Software that supports your <span className="italic">entire operation</span>
              </h2>
              <p className="text-lg text-gray-600">End-to-end solutions across your operational workflow</p>
            </motion.div>

            {/* Desktop horizontal curve */}
            <div className="max-w-6xl mx-auto relative hidden md:block" style={{ height: '180px' }}>
              {/* SVG with Curve Path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 180" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                    <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                    <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Main curve path */}
                <path
                  d="M 50 70 Q 150 30, 250 50 Q 350 70, 480 40 Q 610 10, 730 35 Q 850 60, 960 40 Q 1070 20, 1150 10"
                  stroke="url(#curveGradient)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Vertical dotted lines from curve to text */}
                <line x1="140" y1="57" x2="140" y2="110" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="360" y1="57" x2="360" y2="110" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="600" y1="20" x2="600" y2="110" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="850" y1="50" x2="850" y2="110" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="1080" y1="17" x2="1080" y2="110" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
              </svg>

              {/* Text labels positioned below */}
              <div className="absolute bottom-0 left-0 right-0">
                {[
                  {
                    title: "Plan",
                    description: "Strategic planning and requirements gathering.",
                    xPos: 140
                  },
                  {
                    title: "Build",
                    description: "Custom development tailored to your needs.",
                    xPos: 360
                  },
                  {
                    title: "Deploy",
                    description: "Seamless integration with existing systems.",
                    xPos: 600
                  },
                  {
                    title: "Optimize",
                    description: "Continuous improvement and scaling.",
                    xPos: 850
                  },
                  {
                    title: "Support",
                    description: "Ongoing maintenance and expert assistance.",
                    xPos: 1080
                  }
                ].map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="absolute text-center"
                    style={{
                      left: `calc(${(stage.xPos / 1200) * 100}% - 90px)`,
                      width: '180px'
                    }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed hidden md:block">{stage.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile vertical layout */}
            <div className="md:hidden max-w-md mx-auto">
              {[
                {
                  title: "Plan",
                  description: "Strategic planning and requirements gathering."
                },
                {
                  title: "Build",
                  description: "Custom development tailored to your needs."
                },
                {
                  title: "Deploy",
                  description: "Seamless integration with existing systems."
                },
                {
                  title: "Optimize",
                  description: "Continuous improvement and scaling."
                },
                {
                  title: "Support",
                  description: "Ongoing maintenance and expert assistance."
                }
              ].map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-4 mb-8 last:mb-0"
                >
                  {/* Vertical line with dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0"></div>
                    {index < 4 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-accent to-primary opacity-50 mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{stage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Card Based */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('services.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              {[
                {
                  title: t('services.custom.title'),
                  description: t('services.custom.description'),
                  links: [
                    { name: "Web Development", href: "/web" },
                    { name: "Mobile Applications", href: "/mobile" },
                    { name: "System Integration", href: "/solutions" }
                  ]
                },
                {
                  title: t('services.automation.title'),
                  description: t('services.automation.description'),
                  links: [
                    { name: "Workflow Automation", href: "/ai" },
                    { name: "Data Processing", href: "/ai" }
                  ]
                },
                {
                  title: t('services.legacy.title'),
                  description: t('services.legacy.description'),
                  links: [
                    { name: "System Modernization", href: "/consulting" },
                    { name: "Cloud Migration", href: "/development" }
                  ]
                },
                {
                  title: t('services.support.title'),
                  description: t('services.support.description'),
                  links: [
                    { name: "Technical Support", href: "/support" },
                    { name: "System Monitoring", href: "/support" }
                  ]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    {service.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="flex items-center text-primary hover:text-primary/80 font-medium group"
                      >
                        <span>{link.name}</span>
                        <ArrowRightRegular className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study / Results Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                  Delivering practical software with real-world impact
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our custom solutions help legacy industry organizations modernize operations, streamline workflows, and achieve measurable results from day one.
                </p>
              </motion.div>

              {/* BlueBook App Feature Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-8 mb-8 transition-colors hover:border-accent"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Alberta BlueBook App</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      A cross-platform agricultural reference app built for iOS, Android, and web, giving farmers and agronomists quick access to crop protection product information, selector charts, and guides.
                    </p>
                    <div className="space-y-3 mb-6">
                      {[
                        "iOS, Android, and web app",
                        "Product search across crops and pests",
                        "Offline-capable selector charts and guides",
                        "Personalized favorites and quick reference tools",
                      ].map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckmarkCircleRegular className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-xs text-accent uppercase font-semibold tracking-wider mb-2">Impact</p>
                      <p className="text-sm text-gray-600">Modernized how agricultural professionals access critical product data, replacing outdated print references with a fast, searchable digital platform available anywhere.</p>
                    </div>
                    <a href="https://www.bluebookapp.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-accent hover:underline">
                      Visit bluebookapp.ca
                      <ArrowRightRegular className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="relative w-full min-h-[400px]">
                    {/* Desktop/Web - Browser window */}
                    <div className="relative z-10 w-full">
                      <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200">
                        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          </div>
                          <div className="flex-1 mx-2">
                            <div className="bg-white rounded-md px-3 py-1 text-[10px] text-gray-500 border border-gray-200 truncate">
                              bluebookapp.ca
                            </div>
                          </div>
                        </div>
                        <Image
                          src="/bluebook-app.png"
                          alt="BlueBook App web version"
                          width={1366}
                          height={900}
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                    {/* Tablet - overlaid bottom-right */}
                    <div className="absolute -bottom-6 right-0 z-20 w-[55%]">
                      <div className="rounded-xl border-2 border-gray-900 bg-gray-900 p-[3px] shadow-2xl">
                        <div className="rounded-lg overflow-hidden">
                          <Image
                            src="/bluebook-tablet.png"
                            alt="BlueBook App tablet version"
                            width={1024}
                            height={768}
                            className="w-full h-auto block"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Mobile - overlaid bottom-left */}
                    <div className="absolute -bottom-8 left-4 z-30 w-[18%]">
                      <div className="rounded-[1.2rem] border-2 border-gray-900 bg-gray-900 p-[3px] relative shadow-2xl">
                        <div className="absolute top-[25%] -right-[3px] w-[2px] h-5 rounded-full bg-gray-700" />
                        <div className="absolute top-[20%] -left-[3px] w-[2px] h-3 rounded-full bg-gray-700" />
                        <div className="absolute top-[32%] -left-[3px] w-[2px] h-5 rounded-full bg-gray-700" />
                        <div className="rounded-[0.9rem] overflow-hidden">
                          <Image
                            src="/bluebook-mobile.jpg"
                            alt="BlueBook App mobile version"
                            width={390}
                            height={844}
                            className="w-full h-auto block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Levy Database",
                    description: "A comprehensive system designed for levy collection organizations, streamlining the entire levy management process.",
                    features: [
                      "Complete customer management system",
                      "Automated levy collection and refund processing",
                      "Organization management for collecting entities",
                      "Real-time reporting and compliance tracking",
                    ],
                    impact: "Simplified levy operations from collection to refund, enabling organizations to manage their processes efficiently and transparently.",
                  },
                  {
                    title: "Research Database",
                    description: "A powerful database platform for managing the complete research grant lifecycle, from application to milestone tracking.",
                    features: [
                      "Comprehensive grant management system",
                      "Researcher and organization tracking",
                      "Event, project, and milestone coordination",
                      "Streamlined application and approval workflows",
                    ],
                    impact: "Transformed grant operations with smoother application processing, approval workflows, and ongoing grant maintenance for research organizations.",
                  },
                ].map((product, index) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-accent"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-3 text-primary">{product.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckmarkCircleRegular className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--accent))' }} />
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-200">
                      <p className="text-xs text-accent uppercase font-semibold tracking-wider mb-2">Impact</p>
                      <p className="text-sm text-gray-600">{product.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center mt-12"
              >
                <Link href="/about">
                  <Button className="bg-accent hover:bg-accent/90 text-white border-0">
                    Learn more about our approach
                    <ArrowRightRegular className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Transformation Differentiators */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Transformation built for legacy industries
                </h2>
                <p className="text-xl text-gray-600">Our approach to legacy industry software development</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Industry expertise",
                    description: "We understand the unique challenges of legacy industry operations and build software that works in real-world conditions."
                  },
                  {
                    title: "Built to last",
                    description: "No shortcuts. We create robust, maintainable software that performs reliably for years, not months."
                  },
                  {
                    title: "Practical and outcome-focused",
                    description: "Every feature serves a purpose. We focus on delivering tangible results that improve your bottom line."
                  },
                  {
                    title: "Seamless integration",
                    description: "Our solutions work with your existing systems and processes, minimizing disruption during implementation."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <CheckmarkCircleRegular className="w-6 h-6" style={{ color: 'hsl(var(--accent))' }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('cta.subtitle')}
              </p>
              <BookingDialog onOpenChange={() => {}} />
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <BlogSection />
          </div>
        </section>

        {/* Media Section */}
        <MediaSection />
      </main>

      {/* SEO FAQ - Hidden but accessible to search engines */}
      <SEOFaq />

      <Footer />
    </div>
  )
}
