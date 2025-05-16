'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function CommunityInitiatives() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {/* Left Column */}
            <div className="space-y-6">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-flex items-center gap-2 text-blue-600"
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Community Impact</span>
              </motion.div>

              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
              >
                Empowering Nonprofits Through Technology
              </motion.h2>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg text-gray-600"
              >
                Every year, we select 1-2 nonprofit organizations for pro bono digital transformation support. Our mission is to amplify the impact of those who serve our community.
              </motion.p>
            </div>

            {/* Right Column */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="border border-gray-200 rounded-2xl p-8 space-y-6 shadow-sm bg-white"
            >
              <h3 className="text-2xl font-semibold text-gray-900">
                Have a Project in Mind?
              </h3>
              
              <p className="text-gray-600">
                If you&apos;re a nonprofit organization looking to enhance your digital presence or streamline your operations, we&apos;d love to hear from you. We offer:
              </p>

              <ul className="space-y-4">
                {[
                  'Custom website development',
                  'Software consulting and solutions',
                  'Digital strategy guidance',
                  'Technical implementation support'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 space-y-4">
                <a 
                  href="mailto:community@bytesavy.com"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  community@bytesavy.com
                </a>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 flex-1">
                    <Link href="/contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}