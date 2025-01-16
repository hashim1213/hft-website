'use client'
import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import * as Icons from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'

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
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold sm:text-4xl">Get in Touch</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to build your next software solution? Let&apos;s discuss how we can help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      Thank you for your message! We&apos;ll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Your Name"
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Company Name"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="you@company.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Type</label>
                    <Select
                      value={formData.projectType}
                      onValueChange={handleProjectTypeChange}
                    >
                      <SelectTrigger>
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
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="Tell us about your project requirements"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Icons.ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Why Work With Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {whyWorkWithUs.map((item, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="mt-1">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icons.Check className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-primary text-white">
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                  <CardDescription className="text-white/80">
                    Prefer to reach out directly?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icons.Mail className="h-5 w-5" />
                      <span>Hello@bytesavvytech.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icons.Phone className="h-5 w-5" />
                      <span>+1 (204) 596-9355</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icons.MapPin className="h-5 w-5" />
                      <span>Brandon, Manitoba</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}