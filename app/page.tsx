"use client"

import { motion } from "framer-motion"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
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
      "name": "Bytesavy Technologies - Agricultural Software Development Partner",
      "description": "We accelerate operational efficiency and growth for agricultural organizations with custom software solutions built for real-world conditions.",
      "publisher": {
        "@id": "https://bytesavy.com/#organization"
      },
      "inLanguage": "en-CA"
    }
  ]
};

export default function Website() {
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
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white">
          {/* Botanical Illustration Background */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-32 w-[1080px] h-[1080px] pointer-events-none opacity-70 hidden lg:block">
            <Image
              src="/canola_wire.png"
              alt="Canola botanical illustration"
              fill
              className="object-contain saturate-150 brightness-110"
              priority
            />
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
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]"
                >
                  The agricultural software modernization partner
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed"
                >
                  Bytesavy Technologies accelerates operational efficiency and growth with custom software solutions built for agriculture.
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
                  <p className="text-sm text-gray-500 mb-6">Trusted by leading agricultural organizations</p>
                  <div className="flex flex-wrap items-center gap-12">
                    <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/MCA_logo.png"
                        alt="Manitoba Crop Alliance"
                        width={140}
                        height={50}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                    <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/ab_grains.png"
                        alt="Alberta Grains"
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                      <Image
                        src="/serf.jpg"
                        alt="South East Research Farm"
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain"
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
              <p className="text-lg text-gray-600">End-to-end solutions across your agricultural workflow</p>
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
                The seamless blend of technology, data and agricultural expertise
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              {[
                {
                  title: "Custom Software Development",
                  description: "Purpose-built applications that modernize agricultural operations, reduce manual work and drive measurable results.",
                  links: [
                    { name: "Web Development", href: "/web" },
                    { name: "Mobile Applications", href: "/mobile" },
                    { name: "System Integration", href: "/solutions" }
                  ]
                },
                {
                  title: "Process Automation",
                  description: "Intelligent automation and AI-powered workflows that eliminate repetitive tasks and improve accuracy across your operations.",
                  links: [
                    { name: "Workflow Automation", href: "/ai" },
                    { name: "Data Processing", href: "/ai" }
                  ]
                },
                {
                  title: "Legacy System Modernization",
                  description: "Transform outdated systems into modern, cloud-based solutions that scale with your business and integrate seamlessly.",
                  links: [
                    { name: "System Modernization", href: "/consulting" },
                    { name: "Cloud Migration", href: "/development" }
                  ]
                },
                {
                  title: "Support & Maintenance",
                  description: "Expert ongoing support and proactive maintenance to ensure your software performs reliably when you need it most.",
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
                        <ArrowForwardIcon sx={{ fontSize: 16, marginLeft: '0.5rem' }} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study / Results Section - Dark with Image */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    CASE STUDY
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Delivering practical software with real-world impact
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Our custom solutions help agricultural organizations modernize operations, streamline workflows, and achieve measurable results from day one.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 24, color: 'hsl(var(--accent))', marginTop: '0.25rem' }} className="flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Reduced data entry time by 60%</p>
                      <p className="text-sm text-gray-400">Through intelligent automation and process optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 24, color: 'hsl(var(--accent))', marginTop: '0.25rem' }} className="flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Improved reporting accuracy</p>
                      <p className="text-sm text-gray-400">Real-time dashboards replacing manual spreadsheets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 24, color: 'hsl(var(--accent))', marginTop: '0.25rem' }} className="flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Seamless mobile access</p>
                      <p className="text-sm text-gray-400">Field teams working offline with automatic sync</p>
                    </div>
                  </div>
                </div>
                <Link href="/about">
                  <Button className="bg-accent hover:bg-accent/90 text-white border-0">
                    Learn more about our approach
                    <ArrowForwardIcon sx={{ fontSize: 16, marginLeft: '0.5rem' }} />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-96 md:h-[500px] rounded-lg overflow-hidden"
              >
                <Image
                  src="/hero1.jpg"
                  alt="Agricultural technology in action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
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
                  Transformation built for agriculture
                </h2>
                <p className="text-xl text-gray-600">Our approach to agricultural software development</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Agricultural expertise",
                    description: "We understand the unique challenges of agricultural operations and build software that works in real-world field conditions."
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
                        <CheckCircleIcon sx={{ fontSize: 24, color: 'hsl(var(--accent))' }} />
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

        {/* Final CTA - Green Accent */}
        <section className="py-24 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to modernize your operations?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's discuss how custom software can transform your agricultural business.
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

      <Footer />
    </div>
  )
}
