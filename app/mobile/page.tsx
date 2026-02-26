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
        <section className="relative pt-32 md:pt-40 pb-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Store className="h-8 w-8 text-accent" />
                </div>
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <AppWindow className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl text-primary">
                Mobile App Development
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Practical mobile applications for agribusiness and industrial teams who need reliable tools in the field and on the floor.
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
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
                    <Card className="border border-accent shadow-lg h-full hover:shadow-xl transition-shadow">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-semibold mb-2 text-primary">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
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
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">Development Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven step-by-step process that delivers results from planning to launch.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-accent via-primary to-accent -translate-x-1/2 rounded-full" />

              {[
                {
                  step: 1,
                  title: "Research & Planning",
                  description: "Understanding your requirements and planning the mobile app architecture."
                },
                {
                  step: 2,
                  title: "UI/UX Design",
                  description: "Creating intuitive interfaces and engaging user experiences."
                },
                {
                  step: 3,
                  title: "Development",
                  description: "Building your application using modern mobile technologies."
                },
                {
                  step: 4,
                  title: "Testing & QA",
                  description: "Comprehensive testing across devices and platforms."
                },
                {
                  step: 5,
                  title: "Deployment",
                  description: "Publishing your app to the App Store and Google Play."
                },
                {
                  step: 6,
                  title: "Maintenance",
                  description: "Ongoing support and updates to ensure optimal performance."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    {/* Step Number Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{item.step}</span>
                      </div>
                      {/* Arrow indicator for desktop */}
                      {index < 5 && (
                        <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-2">
                          <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                        </div>
                      )}
                    </div>

                    {/* Content Card */}
                    <Card className="flex-1 border-2 border-accent hover:border-primary transition-colors shadow-md hover:shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
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
              <h2 className="text-3xl font-bold">Ready to Equip Your Team with Mobile Tools?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let's discuss how practical mobile applications can help your team work more efficiently in the field and on-site.
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
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