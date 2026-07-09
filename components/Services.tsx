'use client';

import { motion } from 'framer-motion';
import { CheckmarkRegular, ArrowRightRegular } from '@fluentui/react-icons';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    name: "Custom Web Applications",
    description: "Tailored solutions designed to solve specific business challenges and improve operational efficiency.",
    image: "/screenshot1.png",
    link: "/web",
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
    image: "/screen2.jpg",
    link: "/mobile",
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
    image: "/screen3.webp",
    link: "/ai",
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
    <section className="pt-12 pb-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Link key={index} href={service.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow group border border-accent cursor-pointer"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckmarkRegular className="w-4 h-4 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Explore Our Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/product">
              Explore Our Services
              <ArrowRightRegular className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}