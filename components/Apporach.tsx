'use client';

import { motion } from 'framer-motion';
import { Code, Lightbulb, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const processSteps = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Discovery & Strategy",
    description: "We start by deeply understanding your business challenges, conducting stakeholder interviews, and analyzing your current systems to define clear success metrics."
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Agile Development",
    description: "Our iterative approach delivers functional software in short cycles, allowing you to see progress early and provide feedback that shapes the final product."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborative Partnership",
    description: "You'll work directly with our developers—no account managers or middlemen—ensuring clear communication and faster decision-making."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Long-term Support",
    description: "We don't just deliver and disappear. We provide ongoing maintenance, updates, and strategic guidance to help your software evolve with your business."
  }
];

export default function OurApproachSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-medium"
          >
            Our Approach
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6"
          >
            Where Creativity Meets Technical Excellence
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Unlike traditional development firms, we blend creative problem-solving with technical expertise to build software that's both innovative and reliable. We take pride in our transparent process and commitment to delivering measurable business outcomes.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Makes Us Different</h3>
            
            <ul className="space-y-5">
              {[
                "Local expertise with global standards — based in Manitoba with experience building enterprise solutions",
                "Dedicated small team structure — the same developers work on your project from start to finish",
                "Technical founders who code — we understand both business strategy and implementation details",
                "Fixed price projects with transparent milestones — no surprise costs or scope creep",
                "Design-centered approach — creating intuitive interfaces that users actually enjoy"
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Development Process</h3>
            
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-600">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Let's discuss how our custom software solutions can address your specific challenges and drive measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-blue-600 hover:bg-blue-700">
              <Link href="/product">
                Our Solutions
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}