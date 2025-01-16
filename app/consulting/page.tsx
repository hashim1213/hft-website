'use client'
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
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
        <section className="relative pt-24 pb-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl font-bold sm:text-5xl">
                Strategic Technology Consulting
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Partner with our experienced consultants to transform your business through innovative technology solutions and strategic guidance.
              </p>
              <Button 
                size="lg" 
                className="mt-4"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
                <Icons.ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Consulting Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We follow a structured approach to understand your needs, develop solutions, and drive successful implementation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Icons.Search,
                  title: "Discovery",
                  description: "We begin with a thorough analysis of your business objectives, challenges, and current technology landscape to identify opportunities for improvement."
                },
                {
                  icon: Icons.Lightbulb,
                  title: "Strategy Development",
                  description: "Our team develops a comprehensive strategy tailored to your goals, incorporating industry best practices and innovative solutions."
                },
                {
                  icon: Icons.Brain,
                  title: "Solution Design",
                  description: "We create detailed implementation plans and architectural designs that align with your business requirements and technical constraints."
                },
                {
                  icon: Icons.Target,
                  title: "Implementation Support",
                  description: "Our consultants provide guidance and oversight throughout the implementation process to ensure successful execution."
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
                  >
                    <Card className="border-none shadow-lg h-full">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
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
                  icon: Icons.Brain,
                  title: "Technology Strategy",
                  points: [
                    "Digital Transformation Planning",
                    "Technology Roadmap Development",
                    "Innovation Strategy",
                    "Risk Assessment"
                  ]
                },
                {
                  icon: Icons.Settings,
                  title: "Solution Architecture",
                  points: [
                    "System Design & Integration",
                    "Cloud Architecture",
                    "Security Architecture",
                    "Performance Optimization"
                  ]
                },
                {
                  icon: Icons.Workflow,
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
                    <Card className="border-none shadow-lg h-full">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-4">{service.title}</h3>
                        <ul className="space-y-2">
                          {service.points.map((point, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-600">
                              <Icons.CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
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
              <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Schedule a consultation to discuss how our expertise can help you achieve your technology goals.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/contact'}
              >
                Get Started
                <Icons.ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}