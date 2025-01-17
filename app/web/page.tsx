'use client'
import { motion } from "framer-motion"
import { 
  Code, 
  Globe,
  Laptop,
  Monitor,
  Brain,
  Lock,
  BarChart,
  ArrowRight,
  Search,
  Layout,
  Rocket
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WebDevPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl font-bold sm:text-5xl">
                Web Development Services
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Creating modern, high-performance web applications that drive business growth and enhance user engagement.
              </p>
              <Button 
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Web Development Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive web development solutions tailored to your business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Custom Web Applications",
                  description: "Scalable and secure web applications built with modern technologies to meet your specific business requirements.",
                  features: ["React & Next.js", "API Integration", "Cloud Deployment"]
                },
                {
                  icon: Laptop,
                  title: "E-commerce Solutions",
                  description: "Feature-rich online stores with secure payment integration and inventory management systems.",
                  features: ["Secure Payments", "Product Management", "Order Processing"]
                },
                {
                  icon: Monitor,
                  title: "Corporate Websites",
                  description: "Professional websites that showcase your brand and drive customer engagement.",
                  features: ["Responsive Design", "CMS Integration", "SEO Optimization"]
                },
                {
                  icon: Brain,
                  title: "Performance Optimization",
                  description: "Optimize your web applications for speed, reliability, and user experience.",
                  features: ["Load Time Optimization", "Core Web Vitals", "Performance Monitoring"]
                },
                {
                  icon: Lock,
                  title: "Security Implementation",
                  description: "Implement robust security measures to protect your web applications and user data.",
                  features: ["SSL/TLS", "Data Encryption", "Security Audits"]
                },
                {
                  icon: BarChart,
                  title: "Analytics & Reporting",
                  description: "Integrate analytics tools to track performance and user behavior.",
                  features: ["User Analytics", "Conversion Tracking", "Custom Reports"]
                }
              ].map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-none shadow-lg h-full">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Development Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to delivering high-quality web solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Search,
                  title: "Discovery",
                  description: "Understanding your requirements and planning the solution architecture."
                },
                {
                  icon: Layout,
                  title: "Design",
                  description: "Creating intuitive user interfaces and engaging user experiences."
                },
                {
                  icon: Code,
                  title: "Development",
                  description: "Building your solution using modern web technologies and best practices."
                },
                {
                  icon: Rocket,
                  title: "Deployment",
                  description: "Launching your application with comprehensive testing and optimization."
                }
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to Build Your Web Solution?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let&apos;s discuss how we can help you create a powerful web presence that drives results.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <center>
      <Footer />
      </center>
    </div>
  )
}