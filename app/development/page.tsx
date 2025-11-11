'use client'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import {
  Code,
  Search,
  Layers,
  Rocket,
  CheckSquare,
  Shield,
  RefreshCcw,
  ArrowRight,
  Server,
  Smartphone,
  Monitor,
  Zap
} from "lucide-react"
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
      icon: Search,
      title: "Discovery & Planning",
      description: "We begin with a thorough analysis of your requirements, creating detailed specifications and project roadmaps that align with your business goals.",
      highlights: ["Requirements Analysis", "Project Roadmap", "Technology Selection"]
    },
    {
      icon: Layers,
      title: "Architecture Design",
      description: "Our architects design scalable and maintainable solutions using industry best practices and modern design patterns.",
      highlights: ["System Architecture", "Database Design", "API Design"]
    },
    {
      icon: Code,
      title: "Development",
      description: "Using modern technologies and agile methodologies, we bring your solution to life through iterative development cycles.",
      highlights: ["Agile Sprints", "Code Reviews", "Version Control"]
    },
    {
      icon: CheckSquare,
      title: "Quality Assurance",
      description: "Rigorous testing ensures your software meets the highest standards of quality, security, and reliability.",
      highlights: ["Automated Testing", "Performance Testing", "Security Audits"]
    },
    {
      icon: Rocket,
      title: "Deployment",
      description: "We manage smooth deployments with CI/CD pipelines and minimal disruption to your operations.",
      highlights: ["CI/CD Setup", "Cloud Deployment", "Monitoring"]
    },
    {
      icon: RefreshCcw,
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and optimization keep your software running optimally and secure.",
      highlights: ["24/7 Monitoring", "Regular Updates", "Technical Support"]
    }
  ]

  const technicalExpertise = [
    {
      icon: Monitor,
      title: "Web Development",
      technologies: ["React", "Next.js", "Vue.js", "Node.js", "TypeScript"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      technologies: ["React Native", "iOS", "Android", "Flutter"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Server,
      title: "Backend Systems",
      technologies: ["Python", "Java", ".NET", "Go", "Microservices"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Security & DevOps",
      technologies: ["CI/CD", "Docker", "Kubernetes", "AWS", "Azure"],
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center space-y-6"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center justify-center w-fit px-4 py-1.5 mb-4 text-sm font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100"
              >
                <Zap className="w-4 h-4 mr-2 text-blue-600" />
                <span>Professional Software Development</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold sm:text-5xl lg:text-6xl text-gray-900 tracking-tight"
              >
                Development Excellence
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
              >
                We transform complex requirements into elegant software solutions through our proven development process and technical expertise. From concept to deployment, we deliver quality software that drives business growth.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button
                  size="lg"
                  onClick={() => router.push('/contact')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Step Number & Icon */}
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                            <div className="relative mb-4">
                              <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md">
                                <Icon className="h-10 w-10 text-blue-600" />
                              </div>
                            </div>
                            <h3 className="font-bold text-lg text-center text-gray-900">{step.title}</h3>
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
                                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
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
                    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${expertise.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <h3 className="font-bold text-lg mb-3 text-gray-900">{expertise.title}</h3>

                        <div className="space-y-2">
                          {expertise.technologies.map((tech, tIndex) => (
                            <div key={tIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
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
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Development Project?</h2>
              <p className="max-w-2xl mx-auto text-blue-50 text-lg leading-relaxed">
                Let's discuss how we can help bring your software vision to life with our proven development process and technical expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  onClick={() => router.push('/contact')}
                >
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
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
