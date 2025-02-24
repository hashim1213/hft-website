"use client";
import React from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MediaSection = () => {
  const mediaItems = [
    {
      source: "Winnipeg Sun",
      title: "Manitoban creates app that detects products made in Canada",
      url: "https://winnipegsun.com/news/provincial/manitoban-creates-app-that-detects-products-made-in-canada",
      logo: "wpg_sun.png"
    },
    {
      source: "Winnipeg Free Press",
      title: "Touchscreen on pulse of buy-Canadian surge",
      url: "https://www.winnipegfreepress.com/business/2025/02/14/touchscreen-on-pulse-of-buy-canadian-surge",
      logo: "free_press.jpg"
    },
    {
      source: "Brandon Sun",
      title: "Brandonite develops app to help shoppers buy Canadian",
      url: "https://www.brandonsun.com/local/2025/02/15/brandonite-develops-app-to-help-shoppers-buy-canadian",
      logo: "brandon_sun.png"
    },
    {
      source: "CBC Radio",
      title: "New app CanMade developed in Brandon",
      url: "https://www.cbc.ca/listen/live-radio/1-101-radio-noon-manitoba/clip/16129218-new-app-canmade-developed-brandon",
      logo: "cbc.jpg"
    }
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 text-primary"
              >
                <Newspaper className="w-5 h-5" />
                <span className="font-medium">Press Coverage</span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              >
                In the Media
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Read about us in the media 
              </motion.p>
            </div>

            {/* Media Grid */}
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {mediaItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:bg-gray-50 border border-gray-200 shadow-sm flex flex-col h-full"
                >
                  <div className="mb-4 flex items-center justify-center h-16">
                    <img
                      src={item.logo}
                      alt={`${item.source} logo`}
                      className="max-h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">{item.source}</h3>
                  <p className="text-gray-600 text-sm flex-1">{item.title}</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    Read Article
                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;