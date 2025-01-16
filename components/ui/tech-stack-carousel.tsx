import React from 'react';
import { motion } from 'framer-motion';
import StackIcon from "tech-stack-icons";

const TechStackCarousel = () => {
  const techStacks = [
    { name: 'nextjs', label: 'Next.js' },
    { name: 'reactjs', label: 'React' },
    { name: 'typescript', label: 'TypeScript' },
    { name: 'js', label: 'JavaScript' },
    { name: 'html5', label: 'HTML' },
    { name: 'css3', label: 'CSS' },
    { name: 'tailwindcss', label: 'Tailwind' },
    { name: 'python', label: 'Python' },
    { name: 'flask', label: 'Flask' },
    { name: 'aws', label: 'AWS' },
    { name: 'firebase', label: 'Firebase' },
    { name: 'mongodb', label: 'MongoDB' },
    { name: 'mysql', label: 'MySQL' },
    { name: 'postgresql', label: 'PostgreSQL' },
    { name: 'android', label: 'Android' },
    { name: 'kubernetes', label: 'Kubernetes' },
    { name: 'docker', label: 'Docker' },
    { name: 'digitalocean', label: 'Digital Ocean' },
    { name: 'nodejs', label: 'Node.js' }
  ];

  // Duplicate the items three times to ensure smooth infinite scrolling
  const duplicatedStacks = [...techStacks, ...techStacks, ...techStacks];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50/50 py-12 mt-8">
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      
      {/* Single Row - Moving Left */}
      <motion.div
        className="flex space-x-16"
        animate={{
          x: [-100, -(100 * techStacks.length)],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedStacks.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex flex-col items-center justify-center space-y-2 min-w-[100px] group"
          >
            <div className="relative hover:scale-110 transition-transform duration-200">
              <StackIcon
                name={tech.name}
                className="w-12 h-12"
              />
            </div>
            <span className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {tech.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Title */}
   
    </div>
  );
};

export default TechStackCarousel;