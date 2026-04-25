'use client'

import { motion } from "framer-motion"
import { Brain, BookOpen, TrendingUp, Users, Lightbulb, Target, CheckCircle, ArrowRight, Award, Clock, Zap } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 }}
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 px-4 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/ag_img.webp"
              alt="Agricultural Technology"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/85 to-primary/90"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center space-y-6"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
              >
                Bytesavy Academy
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              >
                Master practical AI skills. Learn prompting, tools, and real-world applications with on-demand courses and optional live sessions.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                    Book Live Session
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: "On-Demand", label: "Learning" },
                  { value: "100%", label: "Practical" },
                  { value: "Live", label: "Sessions Available" },
                  { value: "Lifetime", label: "Access" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What You'll Learn</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Practical AI skills you can use immediately in your business and daily work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "AI Fundamentals",
                  description: "Understand AI buzzwords, what different models do, and how to choose the right tools for your needs.",
                  topics: ["LLMs vs traditional AI", "GPT, Claude, Gemini explained", "When to use which model"]
                },
                {
                  icon: Zap,
                  title: "Prompt Engineering Mastery",
                  description: "Learn how to get AI to do exactly what you want with proper prompting techniques and strategies.",
                  topics: ["Writing effective prompts", "Advanced techniques", "Common mistakes to avoid"]
                },
                {
                  icon: TrendingUp,
                  title: "AI for Business Tasks",
                  description: "Use AI for sales, management, marketing, and everyday business operations to boost productivity.",
                  topics: ["AI for sales outreach", "Management workflows", "Content creation & automation"]
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
                  >
                    <Card className="border-2 border-accent/20 shadow-lg hover:shadow-xl hover:border-accent transition-all h-full">
                      <CardContent className="p-8">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                        <ul className="space-y-3">
                          {item.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>{topic}</span>
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

        {/* Curriculum Overview */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Course Library</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access all courses on-demand and learn at your own pace
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  module: "Course 1",
                  title: "AI Buzzwords Decoded",
                  duration: "Self-paced",
                  lessons: [
                    "What are LLMs, GPT, and Transformers?",
                    "Understanding tokens, context windows, and parameters",
                    "RAG, Fine-tuning, and Embeddings explained",
                    "Demystifying AI jargon for business professionals"
                  ]
                },
                {
                  module: "Course 2",
                  title: "Mastering AI Prompts",
                  duration: "Self-paced",
                  lessons: [
                    "How to write effective prompts that get results",
                    "Advanced prompting techniques and frameworks",
                    "Chain-of-thought and few-shot prompting",
                    "Prompt templates for common business tasks"
                  ]
                },
                {
                  module: "Course 3",
                  title: "AI Tools & Model Selection",
                  duration: "Self-paced",
                  lessons: [
                    "ChatGPT vs Claude vs Gemini - Which to use when",
                    "Specialized AI tools for different tasks",
                    "How to evaluate AI tools for your needs",
                    "Cost vs capability trade-offs"
                  ]
                },
                {
                  module: "Course 4",
                  title: "AI for Sales & Management",
                  duration: "Self-paced",
                  lessons: [
                    "Using AI for sales outreach and follow-ups",
                    "AI-powered CRM and pipeline management",
                    "Automating reports and management tasks",
                    "AI for hiring, onboarding, and team coordination"
                  ]
                },
                {
                  module: "Course 5",
                  title: "Vibe Coding - Build Apps with AI",
                  duration: "Self-paced",
                  lessons: [
                    "Using AI to write code (even if you can't code)",
                    "Building simple apps with AI assistance",
                    "Debugging and improving AI-generated code",
                    "No-code tools vs AI-assisted coding"
                  ]
                }
              ].map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-all">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="text-sm font-semibold text-accent mb-2">{module.module}</div>
                          <h3 className="text-2xl font-bold text-primary">{module.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {module.lessons.map((lesson, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Enroll */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Who Is This For?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Anyone looking to leverage AI to work smarter and faster
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Business Owners",
                  description: "Use AI to automate tasks, make better decisions, and scale your business"
                },
                {
                  icon: TrendingUp,
                  title: "Sales & Marketing Professionals",
                  description: "Leverage AI for outreach, content creation, and customer engagement"
                },
                {
                  icon: Users,
                  title: "Managers & Team Leads",
                  description: "Streamline operations, reporting, and team coordination with AI"
                },
                {
                  icon: Brain,
                  title: "Anyone Curious About AI",
                  description: "No technical background needed - learn practical AI from scratch"
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
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary to-accent text-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Bytesavy Academy?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Learn practical AI skills that you can use immediately
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "100% Practical Content",
                  description: "No theory fluff - everything you learn can be applied to real work immediately"
                },
                {
                  icon: Zap,
                  title: "On-Demand Access",
                  description: "Learn at your own pace, whenever works for you. Lifetime access to all content"
                },
                {
                  icon: Award,
                  title: "Live Expert Sessions",
                  description: "Book 1-on-1 or group sessions with AI experts when you need personalized help"
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description: "Join a network of professionals learning and implementing AI in their work"
                },
                {
                  icon: Clock,
                  title: "No Prerequisites",
                  description: "Start from zero - no coding or technical background required"
                },
                {
                  icon: TrendingUp,
                  title: "Real-World Examples",
                  description: "Learn with actual use cases from sales, management, content, and more"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <Icon className="h-10 w-10 text-white mb-4" />
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center space-y-8 bg-gradient-to-br from-gray-50 to-white border-2 border-accent/20 rounded-2xl p-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Ready to Master Practical AI?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start learning today with on-demand courses. Book live sessions when you need personalized guidance. No long-term commitments required.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 shadow-lg">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 text-lg px-8 py-6">
                    Book a Live Session
                  </Button>
                </Link>
              </div>
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Learn at your pace</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Live expert support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>No prerequisites</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
