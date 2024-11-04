import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Laptop, Rocket, Send, Server, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%201-N3xayoSHf58sXPCoR2bnRExQya9mZc.png"
            alt="HF&T Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <span className="sr-only">HF&T</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#services">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#portfolio">
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transforming Ideas into Digital Reality
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  HF&T specializes in crafting innovative software solutions that drive business growth and digital transformation.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-primary" size="lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Expert Software Solutions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We deliver comprehensive software development services tailored to your business needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Laptop className="h-12 w-12 text-primary" />
                  <CardTitle>Custom Software Development</CardTitle>
                  <CardDescription>Tailored solutions designed to meet your specific business requirements.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Server className="h-12 w-12 text-primary" />
                  <CardTitle>Enterprise Solutions</CardTitle>
                  <CardDescription>Scalable and robust applications for large-scale operations.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Code className="h-12 w-12 text-primary" />
                  <CardTitle>API Development</CardTitle>
                  <CardDescription>Secure and efficient APIs that power your digital ecosystem.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm">Our Companies</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Innovation Ecosystem</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our family of innovative companies driving technological advancement.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <Card>
                      <CardHeader>
                        <CardTitle>ByteSavvy</CardTitle>
                        <CardDescription>
                          Innovative solutions for modern business challenges.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <Rocket className="h-8 w-8 text-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Cutting-edge Technology Solutions
                            </p>
                            <p className="text-sm text-gray-500">
                              Transforming businesses through digital innovation
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader>
                        <CardTitle>ByteAG</CardTitle>
                        <CardDescription>
                          Advanced solutions for agricultural technology.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <Sparkles className="h-8 w-8 text-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Smart Agriculture Solutions
                            </p>
                            <p className="text-sm text-gray-500">
                              Revolutionizing farming with technology
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card>
                      <CardHeader>
                        <CardTitle>FlashIQ</CardTitle>
                        <CardDescription>
                          Intelligent solutions for rapid development.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <Send className="h-8 w-8 text-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Rapid Development Platform
                            </p>
                            <p className="text-sm text-gray-500">
                              Accelerating digital transformation
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Let's Build Something Amazing</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to transform your ideas into reality? Get in touch with our team today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-4">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your Name"
                    type="text"
                  />
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your Email"
                    type="email"
                  />
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                    placeholder="Your Message"
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 HF&T. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}