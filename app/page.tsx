"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDialog from '@/components/BookingDialog';
import BlogSection from '@/components/BlogSection';
import GridBackground from "@/components/ui/grid-background";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

export default function Website() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-1">
        <GridBackground>
          <section id="home" className="min-h-screen flex items-center justify-center pt-16">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center space-y-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                  <Icons.Code className="w-4 h-4 mr-2" />
                  Software Solutions
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl">
                  Building Tomorrow's
                  <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Software Solutions
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  We create custom software solutions enhanced by AI to help businesses automate,
                  optimize, and scale their operations efficiently.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <BookingDialog />
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
                    >
                      Contact Us
                      <Icons.ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
          <TechStackCarousel />
        </GridBackground>
        
        {/* Blog Section */}
        <center>
          <BlogSection />
        </center>
      </main>
      <center>
        <Footer />
      </center>
    </div>
  );
}