'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Home, Briefcase, Mail, BookOpen, Info } from "lucide-react"

const sitePages = [
  {
    category: "Main Pages",
    icon: Home,
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ]
  },
  {
    category: "Solutions",
    icon: Briefcase,
    links: [
      { name: "All Solutions", href: "/product" },
      { name: "Web Development", href: "/web" },
      { name: "Mobile Apps", href: "/mobile" },
      { name: "AI Integration", href: "/ai" },
    ]
  },
  {
    category: "Services",
    icon: FileText,
    links: [
      { name: "Consulting", href: "/consulting" },
      { name: "Development", href: "/development" },
      { name: "Support", href: "/support" },
    ]
  },
  {
    category: "Legal",
    icon: Info,
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/privacy" },
    ]
  }
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="relative pt-40 pb-16 px-4 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold sm:text-5xl text-gray-900">
                Sitemap
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Navigate through all pages on our website
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {sitePages.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.category}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary transition-colors" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
