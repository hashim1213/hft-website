'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Gift } from 'lucide-react';

type Product = {
  name: string;
  description: string;
  icon: string;
  appStoreLink: string;
}

const ProductItem = ({ name, description, icon, appStoreLink }: Product) => (
  <motion.a
    href={appStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent rounded-3xl transform -rotate-6 transition-transform group-hover:rotate-3" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent rounded-3xl transform rotate-3 transition-transform group-hover:-rotate-6" />
      <div className="relative w-20 h-20 rounded-3xl overflow-hidden">
        <Image
          src={icon}
          alt={`${name} app icon`}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
    </div>

    <div className="mt-6 text-center max-w-xs">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>
      <div className="inline-flex items-center text-blue-600 opacity-75 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">Download Free</span>
        <ExternalLink className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </motion.a>
);

export default function ProductsSection() {
  const products: Product[] = [
    {
      name: "CanMade",
      description: "A revolutionary app that helps consumers identify Canadian-made products with a simple scan, supporting local manufacturing and conscientious shopping.",
      icon: "/canmade.png",
      appStoreLink: "https://apps.apple.com/ca/app/canmade/id6473916103"
    },
    {
      name: "FlashIQ",
      description: "A smart flashcard study app that allows users to study any subjects. Uses the latest and best study methods.",
      icon: "/flashiq.png",
      appStoreLink: "https://flashiqapp.com"
    },
    {
      name: "SnapTrack",
      description: "Habit tracking app that allows users to track their habits one snap at a time.",
      icon: "/snaptrack.png",
      appStoreLink: "https://apps.apple.com/ca/app/snaptrack-habit-tracker/id6740051692"
    },
    {
      name: "SwiftRide",
      description: "Winnipeg Transit app that allows users to find their next bus on time.",
      icon: "/swiftride.jpg",
      appStoreLink: "https://apps.apple.com/ca/app/swiftride-winnipeg-transit/id6472630133"
    }
  ];

  return (
    <section id="products" className="py-24">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-2 text-blue-600 font-medium mb-4">
            <Gift className="w-5 h-5" />
            <span>Community Apps</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Built for the Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in giving back. These apps are our contribution to making everyday life a little easier for everyone.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {products.map((product) => (
            <ProductItem
              key={product.name}
              {...product}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}