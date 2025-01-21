'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  icon: string;
  appStoreLink: string;
}

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, icon, appStoreLink }) => (
  <motion.a
    href={appStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-24 h-24 rounded-xl overflow-hidden mb-4">
      <img
        src={icon}
        alt={`${name} icon`}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
    <p className="text-gray-600 text-center mb-4">{description}</p>
    <div className="flex items-center text-primary">
      <span className="mr-2">View in App Store</span>
      <ExternalLink className="w-4 h-4" />
    </div>
  </motion.a>
);

const ProductsSection: React.FC = () => {
  const products: Product[] = [
    {
      name: "FlashIQ",
      description: "Short description of your first app and its key features.",
      icon: "/flashiq.png",
      appStoreLink: "https://flashiqapp.com"
    },
    {
      name: "SnapTrack",
      description: "Short description of your second app and its key features.",
      icon: "/snaptrack.png",
      appStoreLink: "https://apps.apple.com/ca/app/snaptrack-habit-tracker/id6740051692"
    },
    {
      name: "SwiftRide",
      description: "Short description of your third app and its key features.",
      icon: "/swiftride.jpg",
      appStoreLink: "https://apps.apple.com/ca/app/swiftride-winnipeg-transit/id6472630133"
    }
  ];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Apps we built 
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are commited to helping our community by building apps that make thier lives easier
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;