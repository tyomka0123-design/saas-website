'use client'

import { motion } from 'framer-motion'

interface LightBeamProps {
  delay?: number
  duration?: number
  path: { x: string[]; y: string[] }
  color: string
  className?: string
}

function LightBeam({ delay = 0, duration = 4, path, color, className = '' }: LightBeamProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        x: path.x,
        y: path.y,
        opacity: [0, 0.9, 0.9, 0],
        scale: [0.75, 1, 1, 0.75],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={`pointer-events-none absolute z-10 h-[2px] w-[150px] ${className}`}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, white, ${color}, transparent)`,
          boxShadow: `0 0 24px 2px ${color}`,
          filter: 'blur(0.4px)',
        }}
      />

      <div
        className="absolute inset-0 h-full w-full rounded-full blur-[14px] opacity-45"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export function CdnGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_55%)]" />

      {/* 3D grid */}
      <div
        className="absolute inset-0 overflow-hidden [perspective:1000px]"
        style={{
          maskImage: 'radial-gradient(circle at 50% 48%, black 18%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 48%, black 18%, transparent 82%)',
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[820px] w-[1400px] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(58deg)] [transform-style:preserve-3d]">
          <div
            className="absolute inset-[-40%] opacity-[0.22]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.28) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.28) 1px, transparent 1px)
              `,
              backgroundSize: '72px 72px',
            }}
          />

          <div className="absolute inset-0 mix-blend-screen">
            <LightBeam
              color="#38bdf8"
              path={{ x: ['8%', '45%', '75%'], y: ['78%', '50%', '28%'] }}
              duration={4.2}
              delay={0}
              className="-skew-x-[24deg]"
            />

            <LightBeam
              color="#34d399"
              path={{ x: ['78%', '55%', '28%'], y: ['20%', '40%', '62%'] }}
              duration={4.8}
              delay={0.8}
              className="-skew-x-[24deg]"
            />

            <LightBeam
              color="#60a5fa"
              path={{ x: ['86%', '62%', '38%'], y: ['48%', '52%', '58%'] }}
              duration={4.4}
              delay={1.6}
              className="-skew-x-[24deg]"
            />

            <LightBeam
              color="#fb7185"
              path={{ x: ['28%', '42%', '56%'], y: ['18%', '34%', '52%'] }}
              duration={5.2}
              delay={2.2}
              className="-skew-x-[24deg]"
            />
          </div>
        </div>
      </div>

      {/* center dark space for text */}
      <div className="absolute left-1/2 top-[48%] h-[430px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.9)_48%,transparent_72%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.25)_55%,#000_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
