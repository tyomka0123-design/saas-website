'use client'

import { motion } from 'framer-motion'

interface FloatingChevronProps {
  color: string
  size: number
  rotation: number
  position: { x: string; y: string }
  delay: number
  duration: number
}

function FloatingChevron({ color, size, rotation, position, delay, duration }: FloatingChevronProps) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size * 0.4,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
        y: [20, 0, -20, -40],
        x: [0, 10, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <svg
        viewBox="0 0 100 40"
        fill="none"
        style={{
          transform: `rotate(${rotation}deg)`,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M0 20 L40 0 L100 0 L60 20 L100 40 L40 40 Z"
          fill={`url(#grad-${color.replace('#', '')})`}
        />
      </svg>
    </motion.div>
  )
}

export function CdnGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Perspective grid container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 40%',
        }}
      >
        {/* Grid plane */}
        <div
          className="absolute left-1/2 top-1/2 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: 'translateX(-50%) translateY(-30%) rotateX(75deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Horizontal lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const y = (i / 40) * 100
              const opacity = Math.max(0.08, 0.25 - (Math.abs(y - 50) / 50) * 0.2)
              return (
                <line
                  key={`h-${i}`}
                  x1="0%"
                  y1={`${y}%`}
                  x2="100%"
                  y2={`${y}%`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                  opacity={opacity}
                />
              )
            })}
          </svg>

          {/* Vertical lines (converging to center) */}
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 30 }).map((_, i) => {
              const x = ((i - 15) / 15) * 60 + 50
              const opacity = Math.max(0.06, 0.2 - Math.abs((i - 15) / 15) * 0.15)
              return (
                <line
                  key={`v-${i}`}
                  x1={`${x}%`}
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                  opacity={opacity}
                />
              )
            })}
          </svg>
        </div>
      </div>

      {/* Curved horizon lines - outer arcs */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Top left arc */}
        <path
          d="M 0 200 Q 200 300 400 350"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Top right arc */}
        <path
          d="M 1440 200 Q 1240 300 1040 350"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bottom curves */}
        <path
          d="M 0 700 Q 300 650 600 680"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M 1440 700 Q 1140 650 840 680"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Floating chevrons */}
      <FloatingChevron
        color="#5eead4"
        size={80}
        rotation={-30}
        position={{ x: '25%', y: '70%' }}
        delay={0}
        duration={8}
      />
      <FloatingChevron
        color="#38bdf8"
        size={100}
        rotation={45}
        position={{ x: '80%', y: '30%' }}
        delay={1.5}
        duration={9}
      />
      <FloatingChevron
        color="#67e8f9"
        size={70}
        rotation={15}
        position={{ x: '55%', y: '75%' }}
        delay={3}
        duration={7}
      />
      <FloatingChevron
        color="#6366f1"
        size={60}
        rotation={-45}
        position={{ x: '15%', y: '35%' }}
        delay={2}
        duration={10}
      />
      <FloatingChevron
        color="#22d3ee"
        size={90}
        rotation={20}
        position={{ x: '70%', y: '60%' }}
        delay={4}
        duration={8.5}
      />

      {/* Center fade for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)',
        }}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_70%,#000_100%)]" />
    </div>
  )
}
