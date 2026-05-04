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
      className="pointer-events-none absolute z-10"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size * 0.35,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.85, 0.85, 0],
        y: [30, 0, -30, -60],
        x: [0, 15, -10, 5],
        rotate: [rotation - 5, rotation, rotation + 5, rotation],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {/* Parallelogram/chevron shape */}
      <div
        className="h-full w-full"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}aa 100%)`,
          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
          boxShadow: `0 0 30px ${color}66`,
        }}
      />
    </motion.div>
  )
}

export function CdnGridBackground() {
  // Generate grid lines
  const horizontalLines = 25
  const verticalLines = 20

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Main perspective grid */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '800px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="absolute inset-x-[-50%] top-[15%] h-[150%]"
          style={{
            transform: 'rotateX(65deg)',
            transformOrigin: 'center top',
          }}
        >
          {/* Grid SVG */}
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Horizontal lines */}
            {Array.from({ length: horizontalLines }).map((_, i) => {
              const y = (i / (horizontalLines - 1)) * 100
              const opacity = 0.15 + (i / horizontalLines) * 0.1
              return (
                <line
                  key={`h-${i}`}
                  x1="0%"
                  y1={`${y}%`}
                  x2="100%"
                  y2={`${y}%`}
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity={opacity}
                />
              )
            })}

            {/* Vertical lines converging to horizon */}
            {Array.from({ length: verticalLines }).map((_, i) => {
              const startX = (i / (verticalLines - 1)) * 100
              const opacity = 0.1 + Math.abs(i - verticalLines / 2) / verticalLines * 0.15
              return (
                <line
                  key={`v-${i}`}
                  x1={`${startX}%`}
                  y1="0%"
                  x2={`${startX}%`}
                  y2="100%"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity={opacity}
                />
              )
            })}
          </svg>
        </div>
      </div>

      {/* Corner arc lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Top left corner arc */}
        <path
          d="M -100 0 Q 150 150, 450 250"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 0 -50 Q 200 100, 500 180"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          fill="none"
        />

        {/* Top right corner arc */}
        <path
          d="M 1540 0 Q 1290 150, 990 250"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 1440 -50 Q 1240 100, 940 180"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          fill="none"
        />

        {/* Bottom left corner arc */}
        <path
          d="M -100 900 Q 150 750, 450 650"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="none"
        />

        {/* Bottom right corner arc */}
        <path
          d="M 1540 900 Q 1290 750, 990 650"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Floating chevrons - positioned away from center */}
      <FloatingChevron
        color="#5eead4"
        size={90}
        rotation={-35}
        position={{ x: '18%', y: '65%' }}
        delay={0}
        duration={10}
      />
      <FloatingChevron
        color="#38bdf8"
        size={110}
        rotation={40}
        position={{ x: '78%', y: '22%' }}
        delay={2}
        duration={11}
      />
      <FloatingChevron
        color="#67e8f9"
        size={75}
        rotation={25}
        position={{ x: '60%', y: '72%' }}
        delay={4}
        duration={9}
      />
      <FloatingChevron
        color="#22d3ee"
        size={65}
        rotation={-25}
        position={{ x: '12%', y: '28%' }}
        delay={1}
        duration={12}
      />
      <FloatingChevron
        color="#06b6d4"
        size={85}
        rotation={50}
        position={{ x: '85%', y: '58%' }}
        delay={3}
        duration={10}
      />

      {/* Center darkening for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}
