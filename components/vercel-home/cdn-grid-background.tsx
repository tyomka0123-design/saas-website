'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface LightBeamProps {
  className?: string
  delay?: number
  duration?: number
  path: { x: string[]; y: string[] }
  color: string
}

function LightBeam({ className, delay = 0, duration = 4, path, color }: LightBeamProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        x: path.x,
        y: path.y,
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1.1, 1.1, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute z-10 h-[2px] w-[150px] pointer-events-none ${className}`}
    >
      {/* Основний промінь з градієнтом */}
      <div 
        className="h-full w-full rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, white, ${color}, transparent)`,
          boxShadow: `0 0 25px 2px ${color}`,
          filter: 'blur(0.5px)'
        }}
      />
      {/* Додаткове розсіяне сяйво (halo) */}
      <div 
        className="absolute inset-0 h-full w-full blur-[12px] opacity-40"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export function CdnGridBackground() {
  return (
    <div className="relative h-[800px] w-full overflow-hidden bg-[#020202] flex items-center justify-center">
      {/* 1. Глобальний фоновий градієнт для м'якості */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111,transparent_70%)]" />

      {/* 2. Контейнер з перспективою */}
      <div 
        className="relative h-full w-full overflow-hidden [perspective:1000px]"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 85%)',
        }}
      >
        <div className="absolute inset-0 h-full w-full [transform:rotateX(35deg)] origin-center">
          
          {/* 3. Оптимізована сітка (CSS Grid Pattern) */}
          <div 
            className="absolute inset-[-100%] opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* 4. Промені світла (Beams) */}
          <div className="absolute inset-0 mix-blend-screen">
            <LightBeam 
              color="#38bdf8" // Cyan
              path={{ x: ['10%', '50%', '80%'], y: ['20%', '40%', '10%'] }}
              duration={5}
              delay={0}
            />
            <LightBeam 
              color="#fb7185" // Rose
              path={{ x: ['90%', '40%', '10%'], y: ['30%', '60%', '80%'] }}
              duration={7}
              delay={1}
            />
            <LightBeam 
              color="#34d399" // Emerald
              path={{ x: ['20%', '60%', '90%'], y: ['80%', '50%', '40%'] }}
              duration={6}
              delay={3}
            />
            <LightBeam 
              color="#818cf8" // Indigo
              path={{ x: ['50%', '20%', '40%'], y: ['10%', '30%', '70%'] }}
              duration={8}
              delay={2}
            />
          </div>
        </div>
      </div>

      {/* 5. Віньєтка та фінальні градієнти (Vercel Style) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_90%)]" />
      
      {/* Декоративне центральне світло */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
    </div>
  )
}
