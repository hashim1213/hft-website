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
        <section className="relative pt-48 pb-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-bold sm:text-5xl text-primary">
                Transforming Ideas into Digital Reality
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We specialize in developing practical software solutions for agribusiness and industrial organizations, with a focus on AI integration and modern technology that performs in real-world conditions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission and Vision */}
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
                <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  Bytesavy designs and delivers custom software that modernizes outdated operations for agribusiness and industrial organizations. By listening first, building practical tools, and working alongside clients as long-term partners, Bytesavy creates technology that performs reliably in real-world conditions and generates measurable impact from day one.
                </p>

                <h2 className="text-3xl font-bold text-primary mt-12">Our Vision</h2>
                <p className="text-lg text-gray-600">
                  To be the trusted technology partner transforming traditional industries through practical, modern software that drives efficiency, profitability, and long-term resilience.
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
                        <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-1">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl z-10" />
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
              <h2 className="text-3xl font-bold text-primary mb-4">Our Expertise</h2>
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
                    <Card className="border border-accent shadow-lg hover:shadow-xl hover:border-primary transition-all h-full">
                      <CardContent className="p-6">
                        <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
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
              <h2 className="text-3xl font-bold text-primary mb-4">Our Approach</h2>
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
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our diverse team of experts brings together years of experience in software development, AI integration, and industry-specific solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  name: "Hashim Farooq",
                  role: "CEO & Founder",
                  bio: "Leading the vision to transform traditional industries through practical, modern software solutions.",
                  image: "/team/hashim.jpg"
                },
                {
                  name: "Bryce Cotton",
                  role: "Software Engineer",
                  bio: "Building scalable and efficient software solutions with expertise in modern development practices.",
                  image: "/team/bryce.jpg"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-all h-full overflow-hidden">
                    <CardContent className="p-0">
                      {/* Team Member Photo */}
                      <div className="relative w-full h-64 bg-gradient-to-br from-accent/20 to-primary/10 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="h-24 w-24 text-gray-300" />
                        </div>
                        {/* Uncomment when you add real images */}
                        {/* <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        /> */}
                      </div>

                      {/* Team Member Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                        <p className="text-sm font-medium text-accent mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Ready to Transform Your Operations?</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Let&apos;s collaborate to build practical software solutions that modernize your operations and drive measurable results.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/90 transition-colors"
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