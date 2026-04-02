"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  "Agricultural",
  "Oil & Gas",
  "Construction",
  "Mining",
  "Industrial",
  "Plumbing",
  "Electrical"
];

export default function RotatingIndustry() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="inline-block italic"
        >
          {industries[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
