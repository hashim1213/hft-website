'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function CommunityInitiatives() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      
      <div className="container relative px-4 md:px-6">
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
                className="inline-flex items-center gap-2 text-primary"
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Community Impact</span>
              </motion.div>

              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              >
                Empowering Nonprofits Through Technology
              </motion.h2>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-xl text-gray-600"
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
              className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-900">
                Have a Project in Mind?
              </h3>
              
              <p className="text-gray-600">
                If you're a nonprofit organization looking to enhance your digital presence or streamline your operations, we'd love to hear from you. We offer:
              </p>

              <ul className="space-y-4">
                {[
                  'Custom website development',
                  'Software consulting and solutions',
                  'Digital strategy guidance',
                  'Technical implementation support'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 space-y-4">
                <a 
                  href="mailto:community@bytesavy.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  community@bytesavy.com
                </a>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
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