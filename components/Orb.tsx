"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface OrbProps {
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
}

// Reduced particles for better performance
const particlePositions = [
  { left: 20, top: 30 },
  { left: 40, top: 45 },
  { left: 60, top: 25 },
  { left: 80, top: 40 },
]

export default function Orb({
  hue = 91,
  hoverIntensity = 0.7,
  rotateOnHover = true,
  forceHoverState = false
}: OrbProps) {
  const [isHovered, setIsHovered] = useState(forceHoverState)

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      onMouseEnter={() => !forceHoverState && setIsHovered(true)}
      onMouseLeave={() => !forceHoverState && setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1 + (hoverIntensity * 0.1) : 1,
        }}
        transition={{
          scale: { duration: 0.4, ease: "easeOut" }
        }}
        className="relative w-full h-full"
        style={{ willChange: 'transform' }}
      >
        {/* Main orb with simplified gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%,
              hsl(${hue}, 70%, 60%),
              hsl(${hue}, 60%, 50%) 50%,
              hsl(${hue}, 50%, 35%)
            )`,
            boxShadow: `
              0 0 60px hsl(${hue}, 70%, 50%, 0.3),
              inset 0 0 60px hsl(${hue}, 80%, 70%, 0.2)
            `,
          }}
        >
          {/* Highlight */}
          <div
            className="absolute top-[15%] left-[20%] w-1/3 h-1/3 rounded-full blur-2xl"
            style={{
              background: `radial-gradient(circle, hsl(${hue}, 80%, 80%, 0.5), transparent)`,
            }}
          />

          {/* Single animated ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            className="absolute inset-0 rounded-full border-2 opacity-25"
            style={{
              borderColor: `hsl(${hue}, 70%, 60%)`,
              willChange: 'transform',
            }}
          />

          {/* Reduced floating particles */}
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                background: `hsl(${hue}, 70%, 60%)`,
                boxShadow: `0 0 8px hsl(${hue}, 70%, 60%)`,
                willChange: 'transform, opacity',
              }}
            />
          ))}

          {/* Simplified shimmer effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3
            }}
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{ willChange: 'transform' }}
          >
            <div
              className="absolute inset-0 w-1/4"
              style={{
                background: `linear-gradient(90deg,
                  transparent,
                  hsl(${hue}, 80%, 80%, 0.2),
                  transparent
                )`,
                transform: "skewX(-20deg)",
              }}
            />
          </motion.div>
        </div>

        {/* Simplified outer glow */}
        <div
          className="absolute inset-[-15%] rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle, hsl(${hue}, 70%, 50%, 0.3), transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
