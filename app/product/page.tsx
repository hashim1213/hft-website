'use client'
import { motion } from "framer-motion"
import { 
  Globe,
  Smartphone,
  Brain,
  Users,
  Code,
  LifeBuoy,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  const solutions = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom web applications and platforms built with cutting-edge technologies to deliver exceptional user experiences.",
      features: [
        "Responsive Design",
        "Progressive Web Apps",
        "E-commerce Solutions",
        "Content Management"
      ],
      href: '/web'
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that bring your ideas to life on iOS and Android devices.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-Platform Apps",
        "App Store Launch"
      ],
      href: '/mobile'
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Leverage the power of artificial intelligence to automate processes and gain valuable insights from your data.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Predictive Analytics",
        "AI Automation"
      ],
      href: '/ai'
    }
  ];

  const services = [
    {
      icon: Users,
      title: "Consulting",
      description: "Strategic technology consulting to help you make informed decisions and plan your digital transformation.",
      features: [
        "Technology Assessment",
        "Digital Strategy",
        "Architecture Planning",
        "Process Optimization"
      ],
      href: '/consulting'
    },
    {
      icon: Code,
      title: "Development",
      description: "Full-cycle software development services from concept to deployment, ensuring quality and scalability.",
      features: [
        "Custom Development",
        "API Integration",
        "Cloud Solutions",
        "DevOps Services"
      ],
      href: '/development'
    },
    {
      icon: LifeBuoy,
      title: "Support",
      description: "Comprehensive technical support and maintenance to keep your systems running smoothly and efficiently.",
      features: [
        "24/7 Support",
        "Performance Monitoring",
        "Security Updates",
        "System Maintenance"
      ],
      href: '/support'
    }
  ];

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
                Solutions & Services
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Empowering businesses with innovative technology solutions and comprehensive services for digital transformation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={solution.href}>
                      <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 space-y-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-xl">{solution.title}</h3>
                          <p className="text-gray-600">{solution.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-medium">Capabilities:</h4>
                            <ul className="grid grid-cols-1 gap-2">
                              {solution.features.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Professional Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={service.href}>
                      <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 space-y-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-xl">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-medium">Features:</h4>
                            <ul className="grid grid-cols-1 gap-2">
                              {service.features.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
                Let's discuss how our solutions and services can help you achieve your business goals.
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

      <Footer />
    </div>
  )
}