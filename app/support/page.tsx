'use client'
import { motion } from "framer-motion"
import { 
  LifeBuoy, 
  Clock,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  Shield,
  Zap
} from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <LifeBuoy className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold sm:text-5xl">
                24/7 Technical Support
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Dedicated technical support to ensure your systems run smoothly and efficiently.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="min-w-[200px]">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  description: "Round-the-clock support for critical issues and system maintenance."
                },
                {
                  icon: Shield,
                  title: "Proactive Monitoring",
                  description: "Continuous system monitoring to prevent potential issues before they occur."
                },
                {
                  icon: Zap,
                  title: "Rapid Response",
                  description: "Quick resolution times with defined SLAs for different priority levels."
                }
              ].map((feature, index) => {
                const Icon = feature.icon
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
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Support Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Support Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A structured approach to resolving technical issues efficiently and effectively.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  {
                    title: "Issue Reporting",
                    description: "Submit support requests through our dedicated portal, email, or phone."
                  },
                  {
                    title: "Initial Response",
                    description: "Receive acknowledgment and priority assessment within guaranteed timeframes."
                  },
                  {
                    title: "Resolution",
                    description: "Our technical team works to resolve the issue according to defined SLAs."
                  },
                  {
                    title: "Follow-up",
                    description: "Verification and feedback to ensure complete resolution and satisfaction."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Contact Methods</CardTitle>
                    <CardDescription>
                      Multiple ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "Email Support",
                        detail: "hello@bytesavvytech.com",
                        description: "Urgent email support with 1-hour response time for critical issues"
                      },
                      {
                        icon: Phone,
                        title: "Phone Support",
                        detail: "Unavaliable at this time",
                        description: "Phone support is unavaliable at this time please use our email"
                      },
                      {
                        icon: MessageCircle,
                        title: "Live Chat",
                        detail: "24/7 support for issues",
                        description: "this feature is only avaliable to enterprise user"
                      }
                    ].map((method, index) => {
                      const Icon = method.icon
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{method.title}</h4>
                            <p className="text-sm text-primary">{method.detail}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Common questions about our support services and processes.
              </p>
            </motion.div>

            <Accordion type="single" collapsible>
              {[
                {
                  question: "What are your support hours?",
                  answer: "We provide urgent support for critical issues. Regular technical support is available Monday through Friday, 9 AM to 6 PM EST."
                },
                {
                  question: "What is your response time for critical issues?",
                  answer: "For critical issues, we guarantee an initial response within 1 hour. Resolution times vary based on the complexity of the issue."
                },
                {
                  question: "How do I escalate an urgent issue?",
                  answer: "Urgent issues can be escalated through our support portal, by phone, or by marking your email as high priority. Our team monitors all channels continuously."
                },
                {
                  question: "What information should I include in a support request?",
                  answer: "Please include a detailed description of the issue, steps to reproduce, any error messages, and the impact on your operations. Screenshots or logs are also helpful."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <center>
      <Footer />
      </center>
    </div>
  )
}