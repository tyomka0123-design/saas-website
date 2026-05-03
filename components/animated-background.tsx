'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Dotted grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.5 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Thin geometric lines - horizontal */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-lines" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>

      {/* Diagonal geometric lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.04]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diagonal-lines" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>

      {/* Soft glow gradient - top left */}
      <motion.div
        className="absolute -top-[300px] -left-[300px] w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.15 250 / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft glow gradient - top right cyan */}
      <motion.div
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, oklch(0.6 0.14 195 / 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Soft glow gradient - bottom center */}
      <motion.div
        className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(ellipse, oklch(0.5 0.12 280 / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Animated light beam 1 - moves slowly left to right */}
      <motion.div
        className="absolute top-0 w-[2px] h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, oklch(0.7 0.15 250 / 0.3) 50%, transparent 100%)',
        }}
        animate={{
          x: ['-10vw', '110vw'],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 5,
        }}
      />

      {/* Animated light beam 2 - diagonal */}
      <motion.div
        className="absolute top-0 w-[1px] h-[200%] origin-top"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, oklch(0.75 0.14 195 / 0.25) 30%, oklch(0.75 0.14 195 / 0.25) 70%, transparent 100%)',
          transform: 'rotate(25deg)',
        }}
        animate={{
          x: ['-20vw', '120vw'],
          opacity: [0, 0.5, 0.5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 8,
          repeatDelay: 10,
        }}
      />

      {/* Animated light beam 3 - horizontal sweep */}
      <motion.div
        className="absolute left-0 w-full h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, oklch(0.65 0.12 220 / 0.2) 50%, transparent 100%)',
        }}
        animate={{
          y: ['-10vh', '110vh'],
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
          repeatDelay: 7,
        }}
      />

      {/* Subtle spotlight effect */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.03]"
        style={{
          background: 'radial-gradient(ellipse at center, white 0%, transparent 70%)',
        }}
      />

      {/* Corner accent - top left */}
      <div 
        className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle at 0% 0%, oklch(0.7 0.15 250) 0%, transparent 50%)',
        }}
      />

      {/* Corner accent - bottom right */}
      <div 
        className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle at 100% 100%, oklch(0.75 0.14 195) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.08 0 0) 100%)',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
