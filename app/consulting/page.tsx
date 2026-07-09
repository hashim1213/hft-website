'use client'
import { motion } from "framer-motion"
import { ArrowRightRegular, BrainCircuitRegular, CheckmarkCircleRegular, FlowRegular } from "@fluentui/react-icons"
import { Settings } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ConsultingPage() {
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
              <h1 className="text-4xl font-bold sm:text-5xl text-primary">
                Strategic Technology Consulting
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Expert guidance to help agribusiness and industrial organizations modernize operations, select the right technology, and plan for long-term success.
              </p>
              <Button
                size="lg"
                className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
                <ArrowRightRegular className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">Consulting Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A structured approach to understand your needs, develop solutions, and drive successful implementation.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-accent via-primary to-accent -translate-x-1/2 rounded-full" />

              {[
                {
                  step: 1,
                  title: "Discovery",
                  description: "Thorough analysis of your business objectives, challenges, and current technology landscape to identify opportunities."
                },
                {
                  step: 2,
                  title: "Strategy Development",
                  description: "Comprehensive strategy tailored to your goals, incorporating industry best practices and practical solutions."
                },
                {
                  step: 3,
                  title: "Solution Design",
                  description: "Detailed implementation plans and architectural designs that align with your business requirements."
                },
                {
                  step: 4,
                  title: "Implementation Support",
                  description: "Guidance and oversight throughout the implementation process to ensure successful execution."
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
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 mt-2">
                          <ArrowRightRegular className="h-6 w-6 text-primary rotate-90" />
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

        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Consulting Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our consulting services are designed to address your specific technology needs and drive business growth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BrainCircuitRegular,
                  title: "Technology Strategy",
                  points: [
                    "Digital Transformation Planning",
                    "Technology Roadmap Development",
                    "Innovation Strategy",
                    "Risk Assessment"
                  ]
                },
                {
                  icon: Settings,
                  title: "Solution Architecture",
                  points: [
                    "System Design & Integration",
                    "Cloud Architecture",
                    "Security Architecture",
                    "Performance Optimization"
                  ]
                },
                {
                  icon: FlowRegular,
                  title: "Process Optimization",
                  points: [
                    "Business Process Analysis",
                    "Workflow Automation",
                    "Efficiency Improvement",
                    "Change Management"
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
                        <h3 className="font-semibold mb-4 text-primary">{service.title}</h3>
                        <ul className="space-y-2">
                          {service.points.map((point, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-600">
                              <CheckmarkCircleRegular className="h-4 w-4 text-accent flex-shrink-0" />
                              <span>{point}</span>
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
              <h2 className="text-3xl font-bold">Ready to Plan Your Technology Roadmap?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Schedule a consultation to discuss how strategic guidance can help you modernize operations and select the right solutions.
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => window.location.href = '/contact'}
              >
                Get Started
                <ArrowRightRegular className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}