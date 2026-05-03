'use client'

import { motion } from 'framer-motion'

export function CdnGridBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-start justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_46%)]" />

      <div className="absolute top-[50%] h-[650px] w-[1080px] max-w-[96vw] -translate-y-1/2 opacity-95 [perspective:950px] max-md:top-[48%] max-md:h-[560px] max-md:w-[920px] max-md:max-w-[150vw]">
        <div className="relative h-full w-full [transform-style:preserve-3d]">
          <div className="absolute inset-0 border border-white/[0.13]" />
          <div className="absolute inset-0 [transform:translateZ(-260px)] border border-white/[0.10]" />

          <div className="absolute inset-0 origin-left [transform:rotateY(58deg)] border-r border-white/[0.12]" />
          <div className="absolute inset-0 origin-right [transform:rotateY(-58deg)] border-l border-white/[0.12]" />
          <div className="absolute inset-0 origin-top [transform:rotateX(-58deg)] border-b border-white/[0.12]" />
          <div className="absolute inset-0 origin-bottom [transform:rotateX(58deg)] border-t border-white/[0.12]" />

          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 h-full w-px bg-white/[0.105]"
              style={{ left: `${12.5 + i * 12.5}%` }}
            />
          ))}

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 h-px w-full bg-white/[0.105]"
              style={{ top: `${16.6 + i * 16.6}%` }}
            />
          ))}

          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`depth-${i}`}
              className="absolute left-1/2 top-1/2 h-px w-[128%] origin-left bg-white/[0.075]"
              style={{
                transform: `rotate(${[-28, -18, -9, 0, 9, 18, 28][i]}deg) translateX(-50%)`,
              }}
            />
          ))}

          <motion.div
            className="absolute left-[6%] top-[76%] h-[16px] w-[250px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-sky-300 to-cyan-100 shadow-[0_0_38px_rgba(56,189,248,0.55)] blur-[0.15px] max-md:h-[12px] max-md:w-[190px]"
            animate={{
              x: ['-180px', '160px', '520px'],
              y: ['90px', '20px', '-35px'],
              opacity: [0, 0.95, 0],
              scale: [0.7, 1, 0.58],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute right-[8%] top-[11%] h-[16px] w-[245px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-emerald-300 to-teal-100 shadow-[0_0_38px_rgba(45,212,191,0.5)] blur-[0.15px] max-md:h-[12px] max-md:w-[185px]"
            animate={{
              x: ['180px', '-35px', '-360px'],
              y: ['-80px', '8px', '120px'],
              opacity: [0, 0.92, 0],
              scale: [0.7, 1, 0.6],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.75,
            }}
          />

          <motion.div
            className="absolute right-[2%] top-[43%] h-[13px] w-[160px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-blue-300 to-sky-100 shadow-[0_0_30px_rgba(96,165,250,0.48)] blur-[0.15px] max-md:h-[10px] max-md:w-[125px]"
            animate={{
              x: ['170px', '10px', '-320px'],
              y: ['-14px', '10px', '58px'],
              opacity: [0, 0.88, 0],
              scale: [0.72, 1, 0.68],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.6,
            }}
          />

          <motion.div
            className="absolute left-[34%] top-[6%] h-[13px] w-[165px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-red-400 to-red-200 shadow-[0_0_30px_rgba(248,113,113,0.42)] blur-[0.15px] max-md:h-[10px] max-md:w-[120px]"
            animate={{
              x: ['-120px', '8px', '170px'],
              y: ['-65px', '8px', '100px'],
              opacity: [0, 0.75, 0],
              scale: [0.75, 1, 0.65],
            }}
            transition={{
              duration: 3.25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.35,
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[18%] bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[18%] bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
