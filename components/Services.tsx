'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    name: "Custom Web Applications",
    description: "Tailored solutions designed to solve specific business challenges and improve operational efficiency.",
    features: [
      "User-centered design",
      "Optimized for all devices",
      "Integration with existing systems",
      "Secure data management"
    ]
  },
  {
    name: "Mobile App Development",
    description: "Native and cross-platform applications built to deliver exceptional user experiences on iOS and Android.",
    features: [
      "Intuitive interfaces",
      "Offline functionality",
      "Push notifications",
      "Seamless updates"
    ]
  },
  {
    name: "Process Automation",
    description: "Streamlined workflows that reduce manual tasks and minimize errors across your business operations.",
    features: [
      "Workflow optimization",
      "Form automation",
      "Document processing",
      "Data validation"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-blue-600 font-medium">Services & Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Crafted Solutions for Real Business Problems
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We don't just write code—we build strategic assets that give your business a competitive advantage. Our solutions are designed to scale with your growth and adapt to changing market conditions.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Deep industry knowledge across retail, healthcare, manufacturing, and finance",
                "Expertise in both customer-facing applications and internal operational tools",
                "Focus on security, compliance, and data privacy by design",
                "Performance optimization for speed and reliability"
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <Button asChild>
              <Link href="/services">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gray-100 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative z-10 bg-white p-3 rounded-xl border border-gray-200 shadow-lg">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src="/dashboard-example.jpg" // Replace with actual image
                  alt="Custom dashboard example"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">97% client satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}