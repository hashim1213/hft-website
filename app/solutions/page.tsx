'use client'
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SolutionsPage() {
  

  const solutions = {
    software: [
      {
        icon: Icons.Code,
        title: "Custom Software Development",
        description: "Tailored software solutions designed to address your specific business challenges and opportunities.",
        features: [
          "Enterprise Software Solutions",
          "Web Applications",
          "API Development & Integration",
          "Legacy System Modernization"
        ]
      },
      {
        icon: Icons.Smartphone,
        title: "Mobile Development",
        description: "Cross-platform mobile applications that deliver seamless experiences across all devices.",
        features: [
          "iOS and Android Development",
          "Progressive Web Apps",
          "Mobile-First Solutions",
          "App Store Optimization"
        ]
      },
      {
        icon: Icons.Layout,
        title: "UI/UX Design",
        description: "User-centered design that combines aesthetics with functionality to create engaging digital experiences.",
        features: [
          "User Interface Design",
          "User Experience Optimization",
          "Prototyping & Testing",
          "Design Systems"
        ]
      }
    ],
    ai: [
      {
        icon: Icons.Brain,
        title: "AI Integration",
        description: "Advanced artificial intelligence solutions that automate processes and enhance decision-making.",
        features: [
          "Machine Learning Implementation",
          "Natural Language Processing",
          "Predictive Analytics",
          "AI-Powered Automation"
        ]
      },
      {
        icon: Icons.Bot,
        title: "Chatbots & Virtual Assistants",
        description: "Intelligent conversational interfaces that improve customer service and operational efficiency.",
        features: [
          "Custom Chatbot Development",
          "Virtual Assistant Integration",
          "Conversation Flow Design",
          "Multi-Platform Support"
        ]
      },
      {
        icon: Icons.BarChart,
        title: "Data Analytics",
        description: "Comprehensive data analysis solutions that transform raw data into actionable insights.",
        features: [
          "Business Intelligence",
          "Data Visualization",
          "Real-time Analytics",
          "Performance Monitoring"
        ]
      }
    ],
    cloud: [
      {
        icon: Icons.Cloud,
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure that ensures reliability, security, and performance.",
        features: [
          "Cloud Migration",
          "Infrastructure as Code",
          "Multi-Cloud Strategy",
          "Cloud Cost Optimization"
        ]
      },
      {
        icon: Icons.Shield,
        title: "Security",
        description: "Robust security measures that protect your digital assets and ensure compliance.",
        features: [
          "Security Assessments",
          "Compliance Implementation",
          "Threat Detection",
          "Security Training"
        ]
      },
      {
        icon: Icons.LifeBuoy,
        title: "Managed Services",
        description: "Comprehensive IT management and support to keep your systems running smoothly.",
        features: [
          "24/7 Monitoring",
          "System Maintenance",
          "Performance Optimization",
          "Technical Support"
        ]
      }
    ]
  }

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
                Enterprise Solutions
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Comprehensive technology solutions designed to drive innovation and accelerate business growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Tabs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <Tabs defaultValue="software" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:max-w-[600px] mx-auto">
                <TabsTrigger value="software">Software Development</TabsTrigger>
                <TabsTrigger value="ai">AI & Analytics</TabsTrigger>
                <TabsTrigger value="cloud">Cloud & Security</TabsTrigger>
              </TabsList>

              {Object.entries(solutions).map(([key, items]) => (
                <TabsContent key={key} value={key} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {items.map((solution, index) => {
                      const Icon = solution.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <CardTitle>{solution.title}</CardTitle>
                              <CardDescription>{solution.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {solution.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Icons.CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
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
                Let&apos;s discuss how our solutions can help you achieve your business goals.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
                <Icons.ArrowRight className="ml-2 h-4 w-4" />
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