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
import { useState, ChangeEvent, FormEvent } from "react"
import emailjs from '@emailjs/browser'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/contexts/LanguageContext"
import RotatingIndustry from "@/components/RotatingIndustry"
import SEOFaq from "@/components/SEOFaq"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

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
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', projectType: '', message: '' });

  const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError('');
    setContactSuccess(false);
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID || '',
        { from_name: contactForm.name, email: contactForm.email, company: contactForm.company || 'Not provided', project_type: contactForm.projectType, message: contactForm.message, to_name: 'Admin' },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      if (result.status === 200) {
        setContactSuccess(true);
        setContactForm({ name: '', company: '', email: '', projectType: '', message: '' });
      } else { throw new Error('Failed'); }
    } catch { setContactError('Failed to send message. Please try again.'); }
    finally { setContactLoading(false); }
  };

  const services = [
    {
      title: "Custom Software Development",
      description: "Purpose-built applications that modernize your operations, reduce manual work and drive measurable results.",
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
  ];

  const processSteps = [
    { title: "Meeting", description: "We explore your business for automation and growth opportunities." },
    { title: "Prototype", description: "We turn ideas into blueprints and designs for validation." },
    { title: "Development", description: "Engineers build modern solutions for speed and security." },
    { title: "Launch", description: "We ensure a flawless go-live experience after stress testing." },
    { title: "Maintenance", description: "We provide ongoing optimization to keep your tech ahead." },
  ];


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
        <section className="relative pt-40 pb-28 md:pt-48 md:pb-36 overflow-hidden rounded-2xl mx-1 mt-1">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="space-y-6"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg"
                >
                  The <RotatingIndustry /> software{" "}
                  <br className="hidden md:block" />
                  modernization partner
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                >
                  From sleek web applications to autonomous AI workflows. We bridge the gap between complex engineering and seamless user experience.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                  <BookingDialog onOpenChange={() => {}} />
                  <Link href="/about">
                    <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white text-gray-900 gap-2">
                      View Our Work
                      <ArrowRightRegular className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logo Ticker */}
        <section className="py-8 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-center gap-12 flex-wrap">
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/MCA_logo.png" alt="Manitoba Crop Alliance" width={140} height={50} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/ab_grains.png" alt="Alberta Grains" width={140} height={50} className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/serf_logo.png" alt="South East Research Farm" width={140} height={50} className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/cattleos_logo.png" alt="CattleOS" width={140} height={50} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/logo_red.avif" alt="Partner" width={140} height={50} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/timesule_logo.png" alt="TimeSule" width={140} height={50} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/ruralroots_logo.webp" alt="Rural Roots Canada" width={140} height={50} className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src="/seniors_logo.png" alt="Seniors for Seniors" width={50} height={50} className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-14"
              >
                <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 italic leading-tight">
                  The seamless blend of technology, data and industry expertise
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <div className="space-y-3">
                      {service.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="flex items-center text-primary hover:text-accent font-medium text-sm group"
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
          </div>
        </section>

        {/* Stats + Mission Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-10 border border-gray-100"
                >
                  <div className="text-center mb-8">
                    <span className="text-7xl md:text-8xl font-bold text-gray-900">10+</span>
                    <p className="text-sm text-accent font-semibold uppercase tracking-wider mt-2">Projects Delivered</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">100%</p>
                      <p className="text-sm text-gray-500 mt-1">On-Time Delivery</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">3+</p>
                      <p className="text-sm text-gray-500 mt-1">Years in Business</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500 font-medium">5/5 Client Rating</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    We don&apos;t just build software. We forge the digital future of your business.
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our team of designers, developers, and thinkers driven by one purpose: to craft reliable software that solves real problems.
                  </p>
                  <BookingDialog onOpenChange={() => {}} />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm text-gray-500 mb-8">/Our Process</p>
              <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Left - Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden"
                >
                  <Image
                    src="/process-meeting.png"
                    alt="Client consultation meeting"
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </motion.div>

                {/* Right - Title + Steps with connecting line */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
                    From initial spark to scalable reality.
                  </h2>

                  <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-accent via-primary to-accent opacity-30" />

                    <div className="space-y-8">
                      {processSteps.map((step, index) => (
                        <div key={index} className="flex gap-5 relative">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-accent bg-white flex items-center justify-center z-10">
                            <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                          </div>
                          <div className="pt-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section - Dark */}
        <section className="py-24 bg-gray-950 rounded-t-[3rem]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Featured Work
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* BlueBook App - Featured */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors md:col-span-2"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Alberta BlueBook App</h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        A cross-platform agricultural reference app built for iOS, Android, and web, giving farmers and agronomists quick access to crop protection product information, selector charts, and guides.
                      </p>
                      <div className="space-y-2 mb-6">
                        {["iOS, Android, and web app", "Product search across crops and pests", "Offline-capable selector charts and guides", "Personalized favorites and quick reference tools"].map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckmarkCircleRegular className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                            <p className="text-sm text-gray-300">{feature}</p>
                          </div>
                        ))}
                      </div>
                      <a href="https://www.bluebookapp.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                        Visit bluebookapp.ca
                        <ArrowRightRegular className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    {/* Device mockups */}
                    <div className="relative min-h-[300px]">
                      <div className="relative z-10 w-full">
                        <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                          <div className="bg-gray-800 px-3 py-2 flex items-center gap-2 border-b border-gray-700">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-red-400/60" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                              <div className="w-2 h-2 rounded-full bg-green-400/60" />
                            </div>
                            <div className="flex-1 mx-2">
                              <div className="bg-gray-700 rounded-md px-3 py-0.5 text-[10px] text-gray-400 truncate">
                                bluebookapp.ca
                              </div>
                            </div>
                          </div>
                          <Image src="/bluebook-app.png" alt="BlueBook App web" width={1366} height={900} className="w-full h-auto block" />
                        </div>
                      </div>
                      <div className="absolute -bottom-4 right-0 z-20 w-[50%]">
                        <div className="rounded-xl border-2 border-gray-700 bg-gray-800 p-[3px] shadow-2xl">
                          <div className="rounded-lg overflow-hidden">
                            <Image src="/bluebook-tablet.png" alt="BlueBook App tablet" width={1024} height={768} className="w-full h-auto block" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-6 left-2 z-30 w-[18%]">
                        <div className="rounded-[1rem] border-2 border-gray-700 bg-gray-800 p-[2px] shadow-2xl">
                          <div className="rounded-[0.8rem] overflow-hidden">
                            <Image src="/bluebook-mobile.jpg" alt="BlueBook App mobile" width={390} height={844} className="w-full h-auto block" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Levy Database */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">Levy Database</h3>
                  <p className="text-gray-400 leading-relaxed mb-5">
                    A comprehensive system designed for levy collection organizations, streamlining the entire levy management process.
                  </p>
                  <div className="space-y-3 mb-6">
                    {["Complete customer management system", "Automated levy collection and refund processing", "Organization management for collecting entities", "On-prem deployment with local SMTP setup for emails", "Real-time reporting and compliance tracking"].map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckmarkCircleRegular className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                        <p className="text-sm text-gray-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5 border-t border-gray-800">
                    <p className="text-xs text-accent uppercase font-semibold tracking-wider mb-2">Impact</p>
                    <p className="text-sm text-gray-400">Simplified levy operations from collection to refund, enabling organizations to manage their processes efficiently and transparently.</p>
                  </div>
                </motion.div>

                {/* Research Database */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">Agriculture Research DB</h3>
                  <p className="text-gray-400 leading-relaxed mb-5">
                    A powerful database platform for managing the complete research grant lifecycle, from application to milestone tracking.
                  </p>
                  <div className="space-y-3 mb-6">
                    {["Comprehensive grant management system", "Researcher and organization tracking", "Event, project, and milestone coordination", "On-prem deployment with local SMTP setup for emails", "Streamlined application and approval workflows"].map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckmarkCircleRegular className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                        <p className="text-sm text-gray-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5 border-t border-gray-800">
                    <p className="text-xs text-accent uppercase font-semibold tracking-wider mb-2">Impact</p>
                    <p className="text-sm text-gray-400">Transformed grant operations with smoother application processing, approval workflows, and ongoing grant maintenance for research organizations.</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>


        {/* Differentiators Section */}
        <section className="py-24 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(112,161,95,0.08)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(14,76,117,0.08)_0%,_transparent_50%)]" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">
                  Where others stop, We Continue.
                </h2>
              </motion.div>

              <div className="w-full text-left border border-gray-800 rounded-xl overflow-hidden">
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
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid md:grid-cols-[240px_1fr] gap-4 md:gap-8 px-8 py-6 ${index !== 3 ? "border-b border-gray-800" : ""}`}
                  >
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Common Questions
                </h2>
              </motion.div>
              <Accordion type="single" collapsible className="grid md:grid-cols-2 gap-x-8">
                {[
                  { q: "How long for a custom software project?", a: "Timelines vary by scope. Most projects launch within 8-16 weeks from kickoff to deployment." },
                  { q: "How do we structure our pricing?", a: "We offer fixed-price project quotes and ongoing retainer options depending on your needs." },
                  { q: "Will you access the development team?", a: "Yes, you work directly with our engineering team throughout the project with regular check-ins." },
                  { q: "Can you integrate AI into our legacy systems?", a: "Absolutely. We specialize in modernizing legacy systems with AI capabilities without disrupting operations." },
                  { q: "Do you offer MVP or phased development?", a: "Yes, we recommend phased approaches to validate early and scale with confidence." },
                  { q: "What technologies do you specialize in?", a: "Next.js, React, React Native, Python, Node.js, PostgreSQL, Firebase, AWS, and modern AI frameworks." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left text-sm font-semibold text-gray-900 hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <SEOFaq />
        </section>

        {/* Blog Section */}
        <section className="py-24 bg-white ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <p className="text-sm text-gray-500 mb-3">/Insights Blog</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Strategic insights on AI, Tech,<br />and Growth.
                </h2>
              </motion.div>
              <BlogSection />
            </div>
          </div>
        </section>

        {/* Large Text Marquee */}
        <section className="py-8 bg-white overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="text-6xl md:text-8xl font-bold text-gray-100 mx-8">
              Solutions built for real-world impact
            </span>
            <span className="text-6xl md:text-8xl font-bold text-gray-100 mx-8">
              Solutions built for real-world impact
            </span>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Let&apos;s Talk
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {t('cta.subtitle')}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckmarkCircleRegular className="w-5 h-5 text-accent" />
                      <span className="text-gray-700">Production-Ready: We deliver stable, secure code.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckmarkCircleRegular className="w-5 h-5 text-accent" />
                      <span className="text-gray-700">Scalable Architecture: Built to grow with your business.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckmarkCircleRegular className="w-5 h-5 text-accent" />
                      <span className="text-gray-700">Direct Founder Access: Work directly with our technical leads.</span>
                    </div>
                  </div>
                  <BookingDialog onOpenChange={() => {}} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                >
                  {contactError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{contactError}</AlertDescription>
                    </Alert>
                  )}
                  {contactSuccess && (
                    <Alert className="mb-4 bg-accent/10 text-accent border-accent">
                      <AlertDescription>Thank you! We&apos;ll get back to you soon.</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                        <input name="name" value={contactForm.name} onChange={handleContactChange} className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="Your Name" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Company</label>
                        <input name="company" value={contactForm.company} onChange={handleContactChange} className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="Company Name" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                      <input name="email" value={contactForm.email} onChange={handleContactChange} className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="you@company.com" type="email" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Project Type</label>
                      <Select value={contactForm.projectType} onValueChange={(v) => setContactForm(prev => ({ ...prev, projectType: v }))}>
                        <SelectTrigger className="border-gray-200 focus:ring-accent">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="ai">AI Integration</SelectItem>
                          <SelectItem value="analytics">Data Analytics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                      <textarea name="message" value={contactForm.message} onChange={handleContactChange} className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="Tell us about your project" required />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={contactLoading}>
                      {contactLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Section */}
        <MediaSection />
      </main>

      <Footer />
    </div>
  )
}
