'use client'
import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowRight, Check, Mail, Phone, MapPin } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'
import { motion } from "framer-motion"

interface FormData {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  projectType: '',
  message: ''
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProjectTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID || '',
        {
          from_name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          project_type: formData.projectType,
          message: formData.message,
          to_name: 'Admin'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )

      if (result.status === 200) {
        setSuccess(true)
        setFormData(initialFormData)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      console.error('Contact form error:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const whyWorkWithUs = [
    {
      title: "Technical Excellence",
      description: "Expert development team with deep technical expertise."
    },
    {
      title: "AI Integration",
      description: "Enhance your software with cutting-edge AI capabilities."
    },
    {
      title: "Agile Development",
      description: "Flexible, iterative approach to deliver value faster."
    },
    {
      title: "Ongoing Support",
      description: "Comprehensive maintenance and support services."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-40 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold sm:text-5xl text-gray-900">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to build your next software solution? Let&apos;s discuss how we can help you transform your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-900">Contact Us</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <AlertDescription>
                        Thank you for your message! We&apos;ll get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                          placeholder="Your Name"
                          type="text"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                          placeholder="Company Name"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        placeholder="you@company.com"
                        type="email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Project Type</label>
                      <Select
                        value={formData.projectType}
                        onValueChange={handleProjectTypeChange}
                      >
                        <SelectTrigger className="border-gray-200 focus:ring-blue-600">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="ai">AI Integration</SelectItem>
                          <SelectItem value="analytics">Data Analytics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        placeholder="Tell us about your project requirements"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-900">Why Work With Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {whyWorkWithUs.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="mt-0.5">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 bg-gray-900 text-white shadow-md">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-white">Quick Contact</CardTitle>
                    <CardDescription className="text-gray-300">
                      Prefer to reach out directly?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <a href="mailto:sales@bytesavy.com" className="flex items-center gap-3 hover:text-blue-300 transition-colors">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <span>sales@bytesavy.com</span>
                      </a>
                      <a href="tel:+12045969355" className="flex items-center gap-3 hover:text-blue-300 transition-colors">
                        <Phone className="h-5 w-5 text-blue-400" />
                        <span>+1 (204) 596-9355</span>
                      </a>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <span>Brandon, Manitoba</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}