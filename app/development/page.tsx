'use client'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import {
  CodeRegular,
  SearchRegular,
  LayerRegular,
  RocketRegular,
  CheckboxCheckedRegular,
  ShieldRegular,
  ArrowSyncRegular,
  ArrowRightRegular,
  ServerRegular,
  PhoneRegular,
  DesktopRegular,
  FlashRegular
} from "@fluentui/react-icons"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function DevelopmentPage() {
  const router = useRouter()

  const processSteps = [
    {
      icon: SearchRegular,
      title: "Discovery & Planning",
      description: "We begin with a thorough analysis of your requirements, creating detailed specifications and project roadmaps that align with your business goals.",
      highlights: ["Requirements Analysis", "Project Roadmap", "Technology Selection"]
    },
    {
      icon: LayerRegular,
      title: "Architecture Design",
      description: "Our architects design scalable and maintainable solutions using industry best practices and modern design patterns.",
      highlights: ["System Architecture", "Database Design", "API Design"]
    },
    {
      icon: CodeRegular,
      title: "Development",
      description: "Using modern technologies and agile methodologies, we bring your solution to life through iterative development cycles.",
      highlights: ["Agile Sprints", "Code Reviews", "Version Control"]
    },
    {
      icon: CheckboxCheckedRegular,
      title: "Quality Assurance",
      description: "Rigorous testing ensures your software meets the highest standards of quality, security, and reliability.",
      highlights: ["Automated Testing", "Performance Testing", "Security Audits"]
    },
    {
      icon: RocketRegular,
      title: "Deployment",
      description: "We manage smooth deployments with CI/CD pipelines and minimal disruption to your operations.",
      highlights: ["CI/CD Setup", "Cloud Deployment", "Monitoring"]
    },
    {
      icon: ArrowSyncRegular,
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and optimization keep your software running optimally and secure.",
      highlights: ["24/7 Monitoring", "Regular Updates", "Technical Support"]
    }
  ]

  const technicalExpertise = [
    {
      icon: DesktopRegular,
      title: "Web Development",
      technologies: ["React", "Next.js", "Vue.js", "Node.js", "TypeScript"],
      color: "from-accent to-primary"
    },
    {
      icon: PhoneRegular,
      title: "Mobile Development",
      technologies: ["React Native", "iOS", "Android", "Flutter"],
      color: "from-accent to-primary"
    },
    {
      icon: ServerRegular,
      title: "Backend Systems",
      technologies: ["Python", "Java", ".NET", "Go", "Microservices"],
      color: "from-accent to-primary"
    },
    {
      icon: ShieldRegular,
      title: "Security & DevOps",
      technologies: ["CI/CD", "Docker", "Kubernetes", "AWS", "Azure"],
      color: "from-accent to-primary"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 px-4 bg-gradient-to-b from-accent/5 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center space-y-6"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold sm:text-5xl lg:text-6xl text-primary tracking-tight"
              >
                Development Excellence
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
              >
                Building reliable, practical software for agribusiness and industrial organizations. From concept to deployment, we deliver quality solutions that modernize operations and drive measurable results.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button
                  size="lg"
                  onClick={() => router.push('/contact')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Start Your Project
                  <ArrowRightRegular className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Development Process Section */}
        <section className="py-20 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Development Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                A systematic approach that ensures quality, efficiency, and successful project delivery at every stage.
              </p>
            </motion.div>

            <div className="space-y-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-2 border-accent hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Step Number & Icon */}
                          <div className="bg-gradient-to-br from-accent/10 to-accent/20 p-8 md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-accent">
                            <div className="relative mb-4">
                              <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md">
                                <Icon className="h-10 w-10 text-accent" />
                              </div>
                            </div>
                            <h3 className="font-bold text-lg text-center text-primary">{step.title}</h3>
                          </div>

                          {/* Content */}
                          <div className="p-8 md:w-3/4">
                            <p className="text-gray-700 mb-6 leading-relaxed">
                              {step.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {step.highlights.map((highlight, hIndex) => (
                                <span
                                  key={hIndex}
                                  className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
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
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Technical Excellence</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Our development capabilities span multiple technologies and platforms, ensuring we can build the perfect solution for your needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalExpertise.map((expertise, index) => {
                const Icon = expertise.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-2 border-accent hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${expertise.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <h3 className="font-bold text-lg mb-3 text-primary">{expertise.title}</h3>

                        <div className="space-y-2">
                          {expertise.technologies.map((tech, tIndex) => (
                            <div key={tIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                              {tech}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Development Project?</h2>
              <p className="max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
                Let's discuss how we can build reliable, practical software that modernizes your operations and delivers measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
                  onClick={() => router.push('/contact')}
                >
                  Discuss Your Project
                  <ArrowRightRegular className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                  onClick={() => router.push('/product')}
                >
                  View Our Solutions
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
