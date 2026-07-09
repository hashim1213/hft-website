'use client'
import { motion } from "framer-motion"
import { CheckmarkRegular, CodeRegular, BrainCircuitRegular, DataBarVerticalRegular, PhoneRegular, CloudRegular, ShieldRegular, PeopleRegular, TargetRegular, FlowRegular, TrophyRegular, MicRegular } from "@fluentui/react-icons"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

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
                          <CheckmarkRegular className="w-4 h-4 text-accent" />
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
              <h2 className="text-3xl font-bold text-primary mb-4 sm:text-4xl">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Delivering practical software with real-world impact, from custom builds to helping teams put AI to work.
              </p>
            </motion.div>

            {/* Featured: AI Speaking & Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12">
                <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MicRegular className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-primary sm:text-3xl">AI Speaking &amp; Consulting</h3>
                    <p className="max-w-2xl text-gray-600">
                      Practical guidance for companies on how to adopt and use AI. Keynote talks, workshops, and hands-on consulting that cut through the hype and show your team where AI delivers real value.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["Keynotes & Talks", "Team Workshops", "AI Strategy", "Hands-on Adoption"].map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CodeRegular,
                  title: "Custom Software Development",
                  description: "Tailored solutions built with modern technologies and best practices"
                },
                {
                  icon: BrainCircuitRegular,
                  title: "AI Integration",
                  description: "Implementing intelligent solutions to automate and enhance business processes"
                },
                {
                  icon: DataBarVerticalRegular,
                  title: "Data Analytics",
                  description: "Converting raw data into actionable business insights"
                },
                {
                  icon: PhoneRegular,
                  title: "Mobile Development",
                  description: "Creating responsive and intuitive mobile applications"
                },
                {
                  icon: CloudRegular,
                  title: "Cloud Solutions",
                  description: "Scalable and secure cloud infrastructure implementation"
                },
                {
                  icon: ShieldRegular,
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
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-accent"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-primary">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
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
                  icon: PeopleRegular,
                  title: "Collaborative",
                  description: "Working closely with clients to understand their vision"
                },
                {
                  icon: TargetRegular,
                  title: "Goal-Oriented",
                  description: "Focusing on delivering measurable business value"
                },
                {
                  icon: FlowRegular,
                  title: "Agile Process",
                  description: "Adapting quickly to changing requirements"
                },
                {
                  icon: TrophyRegular,
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
                Built by people who understand both technology and the industries we serve.
              </p>
            </motion.div>

            {/* Team grid - all equal */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hashim - with collapsible bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-64 bg-gray-100">
                  <Image src="/hashim.jpg" alt="Hashim Farooq" fill className="object-cover" style={{ objectPosition: "center top" }} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Hashim Farooq</h3>
                  <p className="text-sm font-medium text-accent mb-2">Founder &amp; CEO</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">Serial entrepreneur building the digital future for legacy industries since grade 9.</p>
                  <Dialog>
                    <DialogTrigger className="text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer">
                      Read more &rarr;
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogTitle className="sr-only">About Hashim Farooq</DialogTitle>
                      <div className="grid md:grid-cols-[200px_1fr] gap-6">
                        <div className="relative h-[250px] md:h-full rounded-xl overflow-hidden">
                          <Image src="/hashim.jpg" alt="Hashim Farooq" fill className="object-cover object-top" />
                        </div>
                        <div>
                          <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-1">Founder &amp; CEO</p>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hashim Farooq</h3>
                          <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                            <p>
                              Hashim grew up in rural Manitoba, where he saw firsthand how traditional industries operated without modern digital tools. That perspective shaped everything he builds today. He started developing apps and digital products in grade 9, driven by a desire to solve real problems with technology.
                            </p>
                            <p>
                              He studied Computer Science at Brandon University, then spent several years at Cargill, one of the world&apos;s largest agricultural companies, gaining deep insight into enterprise operations and the challenges facing legacy industries at scale.
                            </p>
                            <p>
                              A serial entrepreneur, Hashim has founded two startups and in 2025 was named one of Manitoba&apos;s Most Fascinating People. Today, he leads the team at Bytesavy Technologies, helping organizations modernize their operations and build the digital future with practical, reliable software.
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              {/* Other team members */}
              {[
                {
                  name: "Bryce Cotton",
                  role: "Software Engineer",
                  bio: "Building scalable and efficient software solutions with expertise in modern development practices.",
                  image: "/Bryce.jpg",
                  imageStyle: undefined
                },
                {
                  name: "Contracted Specialists",
                  role: "Engaged Based on Project Needs",
                  bio: "Specialized engineers, designers, and domain experts brought in to match each project.",
                  image: "/consultants.avif",
                  imageStyle: undefined
                },
                {
                  name: "Speedy the Fish",
                  role: "Company Pet & Morale Officer",
                  bio: "Keeping the team inspired with his calm presence and reminding everyone to go with the flow.",
                  image: "/Speedy2.png",
                  imageStyle: { transform: "scale(1.2)", objectPosition: "center 0%" } as React.CSSProperties
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-64 bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      style={member.imageStyle}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* You, the Client - full width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-[280px_1fr] gap-0">
                <div className="relative h-[250px] md:h-full bg-white flex items-center justify-center">
                  <Image src="/teamwork-client.jpg" alt="You, the Client" fill className="object-contain p-8" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">Always Part of Our Team</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">You, the Client</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our clients are always part of our team. We believe the best software is built through true collaboration, where your expertise in your business meets our expertise in technology.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gray-950 text-white">
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