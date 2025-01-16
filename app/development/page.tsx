'use client'
import { motion } from "framer-motion"
import { 
  Code, 
  Search,
  Layers,
  Rocket,
  CheckSquare,
  Shield,
  RefreshCcw,
  ArrowRight,
  Server,
  Smartphone,
  Monitor
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DevelopmentPage() {
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
                Development Excellence
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We transform complex requirements into elegant software solutions through our proven development process and technical expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Development Process Section */}
        <section className="py-16 px-4">
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
                A systematic approach that ensures quality, efficiency, and successful project delivery.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

              {/* Process Steps */}
              {[
                {
                  icon: Search,
                  title: "Discovery & Planning",
                  description: "We begin with a thorough analysis of your requirements, creating detailed specifications and project roadmaps.",
                  alignment: "right"
                },
                {
                  icon: Layers,
                  title: "Architecture Design",
                  description: "Our architects design scalable and maintainable solutions that align with your business objectives.",
                  alignment: "left"
                },
                {
                  icon: Code,
                  title: "Development",
                  description: "Using modern technologies and best practices, we bring your solution to life through iterative development cycles.",
                  alignment: "right"
                },
                {
                  icon: CheckSquare,
                  title: "Quality Assurance",
                  description: "Rigorous testing ensures your software meets the highest standards of quality and reliability.",
                  alignment: "left"
                },
                {
                  icon: Rocket,
                  title: "Deployment",
                  description: "We manage smooth deployments with minimal disruption to your operations.",
                  alignment: "right"
                },
                {
                  icon: RefreshCcw,
                  title: "Maintenance & Support",
                  description: "Ongoing support and updates keep your software running optimally.",
                  alignment: "left"
                }
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: step.alignment === "left" ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative mb-8 lg:mb-16 ${
                      step.alignment === "left" ? "lg:pr-1/2" : "lg:pl-1/2 lg:ml-auto"
                    }`}
                  >
                    <Card className={`border-none shadow-lg max-w-lg ${
                      step.alignment === "left" ? "lg:mr-8" : "lg:ml-8"
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Technical Excellence</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our development capabilities span multiple technologies and platforms.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Monitor,
                  title: "Web Development",
                  technologies: "React, Next.js, Node.js"
                },
                {
                  icon: Smartphone,
                  title: "Mobile Development",
                  technologies: "React Native, iOS, Android"
                },
                {
                  icon: Server,
                  title: "Backend Systems",
                  technologies: "Python, Java, .NET"
                },
                {
                  icon: Shield,
                  title: "Security & DevOps",
                  technologies: "CI/CD, Cloud Security"
                }
              ].map((expertise, index) => {
                const Icon = expertise.icon
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
                    <h3 className="font-semibold mb-2">{expertise.title}</h3>
                    <p className="text-gray-600">{expertise.technologies}</p>
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
              <h2 className="text-3xl font-bold">Start Your Development Project</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let's discuss how we can help bring your software vision to life.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/contact'}
              >
                Discuss Your Project
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