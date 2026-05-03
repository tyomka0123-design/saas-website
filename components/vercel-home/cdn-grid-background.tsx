'use client'

import { motion } from 'framer-motion'

export function CdnGridBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-start justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_42%)]" />

      <div className="absolute top-[64px] h-[650px] w-[1060px] max-w-[92vw] opacity-90 [perspective:900px]">
        <div className="relative h-full w-full [transform-style:preserve-3d]">
          <div className="absolute inset-0 border border-white/[0.10]" />

          <div className="absolute left-0 top-0 h-full w-full [transform:translateZ(-260px)] border border-white/[0.08]" />

          <div className="absolute left-0 top-0 h-full w-full origin-left [transform:rotateY(58deg)] border-r border-white/[0.09]" />
          <div className="absolute right-0 top-0 h-full w-full origin-right [transform:rotateY(-58deg)] border-l border-white/[0.09]" />
          <div className="absolute left-0 top-0 h-full w-full origin-top [transform:rotateX(-58deg)] border-b border-white/[0.09]" />
          <div className="absolute left-0 bottom-0 h-full w-full origin-bottom [transform:rotateX(58deg)] border-t border-white/[0.09]" />

          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 h-full w-px bg-white/[0.08]"
              style={{ left: `${12.5 + i * 12.5}%` }}
            />
          ))}

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 h-px w-full bg-white/[0.08]"
              style={{ top: `${16.6 + i * 16.6}%` }}
            />
          ))}

          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`depth-${i}`}
              className="absolute left-1/2 top-1/2 h-px w-[125%] origin-left bg-white/[0.055]"
              style={{
                transform: `rotate(${[-28, -18, -9, 0, 9, 18, 28][i]}deg) translateX(-50%)`,
              }}
            />
          ))}

          <motion.div
            className="absolute left-[8%] top-[78%] h-[22px] w-[190px] -skew-x-[24deg] rounded-sm bg-gradient-to-r from-cyan-300 via-sky-400 to-transparent blur-[0.2px]"
            animate={{
              x: ['-170px', '260px', '760px'],
              y: ['110px', '35px', '-35px'],
              opacity: [0, 1, 0],
              scale: [0.7, 1, 0.65],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute right-[3%] top-[20%] h-[20px] w-[155px] -skew-x-[24deg] rounded-sm bg-gradient-to-r from-teal-300 via-cyan-300 to-transparent"
            animate={{
              x: ['260px', '70px', '-260px'],
              y: ['-90px', '-10px', '80px'],
              opacity: [0, 0.9, 0],
              scale: [0.65, 1, 0.75],
            }}
            transition={{
              duration: 5.1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.1,
            }}
          />

          <motion.div
            className="absolute right-[2%] top-[42%] h-[18px] w-[125px] -skew-x-[24deg] rounded-sm bg-gradient-to-r from-sky-300 via-blue-400 to-transparent"
            animate={{
              x: ['220px', '40px', '-420px'],
              y: ['-20px', '18px', '70px'],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.2,
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[22%] bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[22%] bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
