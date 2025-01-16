'use client'

import { motion } from "framer-motion"
import { 
  Smartphone,
  AppWindow,
  Repeat,
  Shield,
  ArrowRight,
  Bell,
  Gauge,
  Store,
  Cloud
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MobileAppsPage() {
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
              <div className="flex justify-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <AppWindow className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl">
                Mobile App Development
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Creating innovative mobile experiences for iOS and Android platforms that engage users and drive business growth.
              </p>
              <Button 
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Discuss Your App Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Mobile Development Expertise</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive mobile development solutions tailored to your business objectives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  title: "Native App Development",
                  description: "High-performance native applications for iOS and Android platforms.",
                  features: [
                    "Swift & SwiftUI for iOS",
                    "Kotlin for Android",
                    "Platform-Specific Features"
                  ]
                },
                {
                  icon: Repeat,
                  title: "Cross-Platform Solutions",
                  description: "Efficient development for multiple platforms using modern frameworks.",
                  features: [
                    "React Native Development",
                    "Single Codebase",
                    "Cross-Platform Compatibility"
                  ]
                },
                {
                  icon: Cloud,
                  title: "Backend Integration",
                  description: "Robust backend services and API integration for mobile apps.",
                  features: [
                    "Cloud Infrastructure",
                    "API Development",
                    "Data Synchronization"
                  ]
                },
                {
                  icon: Bell,
                  title: "Push Notifications",
                  description: "Engage users with timely and relevant notifications.",
                  features: [
                    "Real-time Updates",
                    "User Segmentation",
                    "Engagement Analytics"
                  ]
                },
                {
                  icon: Shield,
                  title: "Security & Privacy",
                  description: "Implementing robust security measures for mobile applications.",
                  features: [
                    "Data Encryption",
                    "Secure Authentication",
                    "Privacy Compliance"
                  ]
                },
                {
                  icon: Gauge,
                  title: "Performance Optimization",
                  description: "Ensuring smooth performance and efficient resource usage.",
                  features: [
                    "Load Time Optimization",
                    "Battery Efficiency",
                    "Memory Management"
                  ]
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
              <h2 className="text-3xl font-bold mb-4">Development Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our systematic approach ensures the delivery of high-quality mobile applications.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
              {[
                {
                  title: "Research & Planning",
                  description: "Understanding your requirements and planning the mobile app architecture.",
                  alignment: "right"
                },
                {
                  title: "UI/UX Design",
                  description: "Creating intuitive interfaces and engaging user experiences.",
                  alignment: "left"
                },
                {
                  title: "Development",
                  description: "Building your application using modern mobile technologies.",
                  alignment: "right"
                },
                {
                  title: "Testing & QA",
                  description: "Comprehensive testing across devices and platforms.",
                  alignment: "left"
                },
                {
                  title: "Deployment",
                  description: "Publishing your app to the App Store and Google Play.",
                  alignment: "right"
                },
                {
                  title: "Maintenance",
                  description: "Ongoing support and updates to ensure optimal performance.",
                  alignment: "left"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: step.alignment === "left" ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative mb-8 lg:mb-16 ${
                    step.alignment === "left" ? "lg:pr-1/2" : "lg:pl-1/2 lg:ml-auto"
                  }`}
                >
                  <Card className={`border-none shadow-lg max-w-lg ${
                    step.alignment === "left" ? "lg:mr-8" : "lg:ml-8"
                  }`}>
                    <CardContent className="p-6">
                      <div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <h2 className="text-3xl font-bold">Transform Your Mobile Presence</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let&apos;s discuss how we can help you create a powerful mobile application that engages users and drives growth.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Mobile Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}