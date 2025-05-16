'use client'
import { motion } from "framer-motion"
import { Check, Code2, Brain, BarChart, Smartphone, Cloud, Shield, Users, Target, Workflow, Award } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-16 px-4 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold sm:text-5xl text-gray-900">
                Transforming Ideas into Digital Reality
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We specialize in developing innovative software solutions that help businesses thrive in the digital age, with a focus on AI integration and cutting-edge technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  At Bytesavy, we are dedicated to empowering businesses through innovative software solutions. Our mission is to bridge the gap between advanced technology and practical business applications, making cutting-edge solutions accessible and impactful.
                </p>
                <div className="space-y-5 mt-8">
                  {[
                    {
                      title: "Innovation",
                      description: "Continuously pushing boundaries with emerging technologies"
                    },
                    {
                      title: "Excellence",
                      description: "Delivering exceptional quality in every project"
                    },
                    {
                      title: "Partnership",
                      description: "Building lasting relationships with our clients"
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl z-10" />
                <Image
                  src="/mission-image.jpg"
                  alt="Mission visualization"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine technical excellence with industry knowledge to deliver solutions that drive business growth and innovation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Code2,
                  title: "Custom Software Development",
                  description: "Tailored solutions built with modern technologies and best practices"
                },
                {
                  icon: Brain,
                  title: "AI Integration",
                  description: "Implementing intelligent solutions to automate and enhance business processes"
                },
                {
                  icon: BarChart,
                  title: "Data Analytics",
                  description: "Converting raw data into actionable business insights"
                },
                {
                  icon: Smartphone,
                  title: "Mobile Development",
                  description: "Creating responsive and intuitive mobile applications"
                },
                {
                  icon: Cloud,
                  title: "Cloud Solutions",
                  description: "Scalable and secure cloud infrastructure implementation"
                },
                {
                  icon: Shield,
                  title: "Cybersecurity",
                  description: "Protecting digital assets with robust security measures"
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
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-100 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We believe in a collaborative approach that combines technical expertise with a deep understanding of our clients&apos; business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  icon: Users,
                  title: "Collaborative",
                  description: "Working closely with clients to understand their vision"
                },
                {
                  icon: Target,
                  title: "Goal-Oriented",
                  description: "Focusing on delivering measurable business value"
                },
                {
                  icon: Workflow,
                  title: "Agile Process",
                  description: "Adapting quickly to changing requirements"
                },
                {
                  icon: Award,
                  title: "Quality First",
                  description: "Maintaining high standards in every delivery"
                }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to transform your business?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Let&apos;s collaborate to build custom software solutions that address your unique challenges and drive growth.
              </p>
              <div className="mt-8">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}