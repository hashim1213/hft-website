'use client'

import { motion } from "framer-motion"
import { 
  Brain,
  Bot,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  BarChart,
  Search,
  Code,
  Zap,
  Star,
  Database,
  PieChart
} from "lucide-react"
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
        <section className="relative pt-32 md:pt-40 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl">
                Artificial Intelligence Solutions
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Transform your business operations with advanced AI technologies tailored to your specific needs.
              </p>
              <Button 
                size="lg"
                onClick={() => router.push('/contact')}
              >
                Explore AI Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
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
                  icon: Database,
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
                  icon: Search,
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
                  icon: BarChart,
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
                    <Card className="border-none shadow-lg h-full">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{solution.title}</h3>
                        <p className="text-gray-600 mb-4">{solution.description}</p>
                        <ul className="space-y-2">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <ChevronRight className="h-4 w-4 text-primary" />
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
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">AI Implementation Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our systematic approach ensures successful AI integration into your business operations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Search,
                  title: "Assessment",
                  description: "Analyzing your business needs and identifying AI opportunities."
                },
                {
                  icon: Code,
                  title: "Development",
                  description: "Creating custom AI solutions tailored to your requirements."
                },
                {
                  icon: Zap,
                  title: "Integration",
                  description: "Seamlessly implementing AI systems into your workflow."
                },
                {
                  icon: Star,
                  title: "Optimization",
                  description: "Continuous improvement and refinement of AI performance."
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
              <h2 className="text-3xl font-bold">Ready to Transform Your Business with AI?</h2>
              <p className="max-w-2xl mx-auto text-white/80">
                Let&apos;s discuss how our AI solutions can help you achieve your business objectives.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => router.push('/contact')}
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