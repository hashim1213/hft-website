'use client'

import { motion } from "framer-motion"
import {
  Bot,
  MessageSquare,
  PieChart
} from "lucide-react"
import { BrainCircuitRegular, ChevronRightRegular, ArrowRightRegular, DataBarVerticalRegular, SearchRegular, CodeRegular, FlashRegular, DatabaseRegular } from "@fluentui/react-icons"
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AIPage() {
  const router = useRouter()

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
                AI Integration & Automation
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Practical AI solutions that automate repetitive tasks, improve decision-making, and help agribusiness and industrial organizations work smarter.
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => router.push('/contact')}
              >
                Explore AI Solutions
                <ArrowRightRegular className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* AI Solutions */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our AI Capabilities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive artificial intelligence solutions engineered to enhance efficiency and drive innovation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "Natural Language Processing",
                  description: "Advanced text analysis and generation capabilities for enhanced communication.",
                  features: [
                    "Text Analysis & Classification",
                    "Sentiment Analysis",
                    "Language Generation",
                    "Automated Responses"
                  ]
                },
                {
                  icon: PieChart,
                  title: "Predictive Analytics",
                  description: "Data-driven insights to anticipate trends and make informed decisions.",
                  features: [
                    "Trend Analysis",
                    "Market Predictions",
                    "Risk Assessment",
                    "Business Intelligence"
                  ]
                },
                {
                  icon: Bot,
                  title: "Intelligent Automation",
                  description: "Streamline operations with AI-powered process automation.",
                  features: [
                    "Workflow Automation",
                    "Task Optimization",
                    "Resource Management",
                    "Process Efficiency"
                  ]
                },
                {
                  icon: DatabaseRegular,
                  title: "Machine Learning",
                  description: "Custom ML models designed for your specific business challenges.",
                  features: [
                    "Pattern Recognition",
                    "Anomaly Detection",
                    "Predictive Modeling",
                    "Data Classification"
                  ]
                },
                {
                  icon: SearchRegular,
                  title: "Computer Vision",
                  description: "Advanced image and video analysis capabilities.",
                  features: [
                    "Object Detection",
                    "Image Recognition",
                    "Visual Inspection",
                    "Video Analysis"
                  ]
                },
                {
                  icon: DataBarVerticalRegular,
                  title: "Data Analytics",
                  description: "Transform raw data into actionable business insights.",
                  features: [
                    "Data Processing",
                    "Statistical Analysis",
                    "Visualization",
                    "Report Generation"
                  ]
                }
              ].map((solution, index) => {
                const Icon = solution.icon
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
                        <h3 className="font-semibold mb-2 text-primary">{solution.title}</h3>
                        <p className="text-gray-600 mb-4">{solution.description}</p>
                        <ul className="space-y-2">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <ChevronRightRegular className="w-4 h-4 text-accent" />
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

        {/* Implementation Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary">Implementation Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven step-by-step process for successful AI integration into your operations.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-accent via-primary to-accent -translate-x-1/2 rounded-full" />

              {[
                {
                  step: 1,
                  title: "Assessment",
                  description: "Analyzing your business needs and identifying AI opportunities that will deliver real value."
                },
                {
                  step: 2,
                  title: "Development",
                  description: "Creating custom AI solutions tailored to your specific requirements and workflows."
                },
                {
                  step: 3,
                  title: "Integration",
                  description: "Seamlessly implementing AI systems into your existing operations without disruption."
                },
                {
                  step: 4,
                  title: "Optimization",
                  description: "Continuous improvement and refinement of AI performance based on real-world results."
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
                          <ArrowRightRegular className="w-6 h-6 text-primary rotate-90" />
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
              <h2 className="text-3xl font-bold">Ready to Automate and Optimize with AI?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let's discuss how practical AI solutions can reduce manual work and help your team make better, faster decisions.
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => router.push('/contact')}
              >
                Schedule a Consultation
                <ArrowRightRegular className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}