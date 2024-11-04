'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Calendar, Laptop, Rocket, Send, Server, Sparkles, ChevronDown, Star, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [bookingStep, setBookingStep] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'portfolio', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const bounds = element.getBoundingClientRect()
          return bounds.top <= 100 && bounds.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const BookingDialog = () => {
    const steps = [
      {
        title: "Select Service",
        description: "Choose the type of consultation you need",
        content: (
          <div className="grid gap-4">
            {['Strategy Session', 'Technical Review', 'Project Planning'].map((service) => (
              <Card key={service} className="cursor-pointer hover:border-primary transition-all"
                    onClick={() => setBookingStep(2)}>
                <CardHeader>
                  <CardTitle className="text-lg">{service}</CardTitle>
                  <CardDescription>45-minute free consultation</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )
      },
      {
        title: "Choose Date & Time",
        description: "Select your preferred consultation time",
        content: (
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(7)].map((_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() + i + 1)
                  return (
                    <SelectItem key={i} value={date.toLocaleDateString()}>
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-3 gap-2">
              {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="hover:bg-primary hover:text-white transition-all"
                  onClick={() => setBookingStep(3)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )
      },
      {
        title: "Your Details",
        description: "Fill in your information to confirm the booking",
        content: (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setBookingStep(4); }}>
            <input
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              placeholder="Full Name"
              required
            />
            <input
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              placeholder="Email"
              type="email"
              required
            />
            <input
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              placeholder="Phone (optional)"
              type="tel"
            />
            <textarea
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              placeholder="What would you like to discuss?"
              rows={3}
            />
            <Button type="submit" className="w-full">Confirm Booking</Button>
          </form>
        )
      },
      {
        title: "Confirmed!",
        description: "Your consultation has been scheduled",
        content: (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">You're all set!</h3>
            <p className="text-gray-600">
              We've sent you an email with the details and calendar invite.
              Looking forward to speaking with you!
            </p>
          </div>
        )
      }
    ]

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" size="lg">
            Book Free Consultation
            <Calendar className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{steps[bookingStep - 1].title}</DialogTitle>
            <DialogDescription>
              {steps[bookingStep - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {steps[bookingStep - 1].content}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className={`fixed w-full px-4 lg:px-6 h-16 flex items-center transition-all duration-300 z-50 
        ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/logo.png"
            alt="HF&T Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <span className="sr-only">HF&T</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          {['Home', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <Link
              key={item}
              className={`text-sm font-medium relative group ${
                activeSection === item.toLowerCase() ? 'text-primary' : ''
              }`}
              href={`#${item.toLowerCase()}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <section id="home" className="w-full min-h-screen flex items-center justify-center py-24 md:py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-pulse" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center p-2 bg-white/50 backdrop-blur-sm rounded-full"
                >
                  <Star className="h-6 w-6 text-yellow-400" />
                  <span className="ml-2 text-sm font-medium">Trusted by Fortune 500 Companies</span>
                </motion.div>
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl/none bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Transforming Ideas into
                  <br />
                  Digital Reality
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  HF&T specializes in crafting innovative software solutions that drive business growth and digital transformation.
                </p>
              </div>
              <div className="space-x-4">
                <BookingDialog />
                <Button variant="outline" size="lg" className="hover:bg-primary/5">
                  Our Portfolio
                </Button>
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12"
              >
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services section with improved cards and animations */}
        <section id="services" className="w-full py-24 md:py-32 relative">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center"
              {...fadeInUp}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Expert Software Solutions</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We deliver comprehensive software development services tailored to your business needs.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-3">
              {[
                {
                  icon: Laptop,
                  title: "Custom Software",
                  description: "Tailored solutions designed to meet your specific business requirements.",
                  features: ["Scalable Architecture", "Modern UI/UX", "Cloud-Native"]
                },
                {
                  icon: Server,
                  title: "Enterprise Solutions",
                  description: "Robust applications for large-scale operations.",
                  features: ["High Availability", "Security First", "24/7 Support"]
                },
                {
                  icon: Code,
                  title: "API Development",
                  description: "Secure and efficient APIs that power your digital ecosystem.",
                  features: ["RESTful & GraphQL", "Documentation", "Version Control"]
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-none bg-white/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader>
                      <div className="relative h-12 w-12 mb-4">
                        <service.icon className="h-12 w-12 text-primary absolute transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <Check className="h-4 w-4 text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio section with improved carousel */}
        <section id="portfolio" className="w-full py-24 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center"
              {...fadeInUp}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Our Companies
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Innovation Ecosystem</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our family of innovative companies driving technological advancement.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto max-w-6xl py-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {[
                    {
                      title: "ByteSavvy",
                      description: "Innovative solutions for modern business challenges.",
                      icon: Rocket,
                      subtitle: "Cutting-edge Technology Solutions",
                      text: "Transforming businesses through digital innovation",
                      stats: [
                        { label: "Clients", value: "200+" },
                        { label: "Projects", value: "500+" },
                        { label: "Success Rate", value: "98%" }
                      ]
                    },
                    {
                      title: "ByteAG",
                      description: "Advanced solutions for agricultural technology.",
                      icon: Sparkles,
                      subtitle: "Smart Agriculture Solutions",
                      text: "Revolutionizing farming with technology",
                      stats: [
                        { label: "Farms", value: "150+" },
                        { label: "Yield Increase", value: "40%" },
                        { label: "ROI", value: "3x" }
                      ]
                    },
                    {
                      title: "FlashIQ",
                      description: "Intelligent solutions for rapid development.",
                      icon: Send,
                      subtitle: "Rapid Development Platform",
                      text: "Accelerating digital transformation",
                      stats: [
                        { label: "Dev Time", value: "-60%" },
                        { label: "Users", value: "10k+" },
                        { label: "Deployments", value: "1M+" }
                      ]
                    }
                  ].map((company) => (
                    <CarouselItem key={company.title}>
                      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {company.title}
                              </CardTitle>
                              <CardDescription className="text-base">
                                {company.description}
                              </CardDescription>
                            </div>
                            <company.icon className="h-12 w-12 text-primary animate-pulse" />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{company.subtitle}</h4>
                            <p className="text-sm text-gray-500">{company.text}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {company.stats.map((stat, i) => (
                              <div key={i} className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" className="w-full hover:bg-primary hover:text-white">
                            Learn More
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 hover:bg-primary hover:text-white" />
                <CarouselNext className="right-4 hover:bg-primary hover:text-white" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="container px-4 md:px-6 relative">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center"
              {...fadeInUp}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Let's Build Something Amazing</h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to transform your ideas into reality? Get in touch with our team today.
                </p>
              </div>
              <div className="w-full max-w-lg space-y-2">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <input
                            className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Your Name"
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            className="flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Your Email"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="project">Project Discussion</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea
                          className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[100px]"
                          placeholder="Your Message"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Team
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Development
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    contact@hft.com
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-gray-500 hover:text-primary transition-colors" href="#">
                    +1 (555) 123-4567
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500 text-center">© 2024 HF&T. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}