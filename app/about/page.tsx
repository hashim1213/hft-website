'use client'
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold sm:text-5xl">
                Transforming Ideas into Digital Reality
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We specialize in developing innovative software solutions that help businesses thrive in the digital age, with a focus on AI integration and cutting-edge technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-gray-600">
                  At Bytesavy, we are dedicated to empowering businesses through innovative software solutions. Our mission is to bridge the gap between advanced technology and practical business applications, making cutting-edge solutions accessible and impactful.
                </p>
                <div className="space-y-4">
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
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icons.Check className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{value.title}</h3>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="absolute inset-4 bg-white/40 backdrop-blur-lg rounded-lg border border-white/20" />
                <Icons.Code className="h-24 w-24 text-primary relative" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine technical excellence with industry knowledge to deliver solutions that drive business growth and innovation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Icons.Code2,
                  title: "Custom Software Development",
                  description: "Tailored solutions built with modern technologies and best practices"
                },
                {
                  icon: Icons.Brain,
                  title: "AI Integration",
                  description: "Implementing intelligent solutions to automate and enhance business processes"
                },
                {
                  icon: Icons.BarChart,
                  title: "Data Analytics",
                  description: "Converting raw data into actionable business insights"
                },
                {
                  icon: Icons.Smartphone,
                  title: "Mobile Development",
                  description: "Creating responsive and intuitive mobile applications"
                },
                {
                  icon: Icons.Cloud,
                  title: "Cloud Solutions",
                  description: "Scalable and secure cloud infrastructure implementation"
                },
                {
                  icon: Icons.Shield,
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
                    <Card className="border-none shadow-lg h-full">
                      <CardContent className="pt-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe in a collaborative approach that combines technical expertise with a deep understanding of our clients&apos; business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Icons.Users,
                  title: "Collaborative",
                  description: "Working closely with clients to understand their vision"
                },
                {
                  icon: Icons.Target,
                  title: "Goal-Oriented",
                  description: "Focusing on delivering measurable business value"
                },
                {
                  icon: Icons.Workflow,
                  title: "Agile Process",
                  description: "Adapting quickly to changing requirements"
                },
                {
                  icon: Icons.Award,
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
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}