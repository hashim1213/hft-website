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
  Check
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-40 pb-24 px-4 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <span className="text-blue-600 font-medium">Our Expertise</span>
              <h1 className="text-4xl font-bold sm:text-5xl text-gray-900 mt-2">
                Solutions & Services
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Empowering businesses with innovative technology solutions and comprehensive services for digital transformation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We develop custom software solutions that address specific business challenges and create competitive advantages.
              </p>
            </div>
            
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
                    <Link href={solution.href} className="block h-full group">
                      <div className="border border-gray-200 rounded-2xl p-8 h-full bg-white hover:shadow-md transition-shadow group-hover:border-blue-100">
                        <div className="flex items-center mb-6">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-xl text-gray-900 ml-4 group-hover:text-blue-600 transition-colors">
                            {solution.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{solution.description}</p>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Capabilities:</h4>
                          <ul className="space-y-3">
                            {solution.features.map((feature, i) => (
                              <li key={i} className="text-gray-700 flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-8 text-blue-600 font-medium flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our comprehensive range of services ensures your technology investments deliver maximum value at every stage.
              </p>
            </div>
            
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
                    <Link href={service.href} className="block h-full group">
                      <div className="border border-gray-200 rounded-2xl p-8 h-full bg-white hover:shadow-md transition-shadow group-hover:border-blue-100">
                        <div className="flex items-center mb-6">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-xl text-gray-900 ml-4 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Features:</h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, i) => (
                              <li key={i} className="text-gray-700 flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-8 text-blue-600 font-medium flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
              <p className="max-w-2xl mx-auto text-gray-400">
                Let's discuss how our custom software solutions can address your specific challenges and drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
             
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}