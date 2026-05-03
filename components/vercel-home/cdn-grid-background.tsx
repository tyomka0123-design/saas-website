'use client'

import { motion } from 'framer-motion'
import React from 'react'

// Компонент променя світла
function LightBeam({ 
  className, 
  delay = 0, 
  duration = 4, 
  path, 
  color 
}: { 
  className?: string; 
  delay?: number; 
  duration?: number; 
  path: { x: string[]; y: string[] }; 
  color: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        x: path.x,
        y: path.y,
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1.2, 1.2, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute z-0 h-[1.5px] w-[200px] pointer-events-none ${className}`}
    >
      <div 
        className="h-full w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, white, ${color}, transparent)`,
          boxShadow: `0 0 30px 2px ${color}`,
        }}
      />
    </motion.div>
  )
}

export function VercelHero() {
  return (
    // Головний контейнер на весь екран
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020202] flex items-center justify-center">
      
      {/* --- ФОНОВИЙ ШАР (GRID & LIGHTS) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Глоу-ефект в центрі */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1d4ed815,transparent_50%)]" />

        {/* Контейнер з перспективою для сітки */}
        <div 
          className="absolute inset-0 [perspective:1000px]"
          style={{
            maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 90%)',
          }}
        >
          <div className="absolute inset-0 h-full w-full [transform:rotateX(45deg)] origin-center">
            {/* Сама сітка */}
            <div 
              className="absolute inset-[-100%] opacity-[0.2]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />

            {/* Промені, що літають по сітці */}
            <div className="absolute inset-0 mix-blend-plus-lighter">
              <LightBeam 
                color="#0ea5e9" 
                path={{ x: ['10%', '60%', '90%'], y: ['10%', '50%', '20%'] }} 
                duration={6} 
              />
              <LightBeam 
                color="#ec4899" 
                path={{ x: ['80%', '40%', '10%'], y: ['20%', '80%', '90%'] }} 
                duration={8} 
                delay={1} 
              />
              <LightBeam 
                color="#22c55e" 
                path={{ x: ['20%', '50%', '80%'], y: ['90%', '40%', '30%'] }} 
                duration={7} 
                delay={2} 
              />
            </div>
          </div>
        </div>

        {/* Затемнення країв (Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#020202_80%)]" />
      </div>

      {/* --- КОНТЕНТНИЙ ШАР (ТЕКСТ) --- */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          Deploy to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">the Edge</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
        >
          Your high-performance web applications, delivered globally with the 
          simplicity of a single command.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 bg-black text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            Documentation
          </button>
        </motion.div>
      </div>
    </div>
  )
}
