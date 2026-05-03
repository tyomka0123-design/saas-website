'use client'

import { motion } from 'framer-motion'

export function CdnGridBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-start justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="absolute top-[72px] h-[650px] w-[1080px] max-w-[96vw] opacity-95 [perspective:950px] max-md:top-[92px] max-md:h-[560px] max-md:w-[900px] max-md:max-w-[145vw]">
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

          {/* Blue beam — знизу/зліва до центру, як у Vercel */}
          <motion.div
            className="absolute left-[7%] top-[76%] h-[18px] w-[230px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-sky-300 to-cyan-200 shadow-[0_0_34px_rgba(56,189,248,0.5)]"
            animate={{
              x: ['-160px', '180px', '560px'],
              y: ['95px', '25px', '-35px'],
              opacity: [0, 0.95, 0],
              scale: [0.7, 1, 0.6],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Green beam — зверху/справа до центру */}
          <motion.div
            className="absolute right-[8%] top-[9%] h-[18px] w-[230px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-emerald-300 to-teal-200 shadow-[0_0_34px_rgba(45,212,191,0.45)]"
            animate={{
              x: ['170px', '-40px', '-360px'],
              y: ['-80px', '10px', '130px'],
              opacity: [0, 0.9, 0],
              scale: [0.7, 1, 0.65],
            }}
            transition={{
              duration: 3.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />

          {/* Small blue side beam */}
          <motion.div
            className="absolute right-[2%] top-[42%] h-[14px] w-[150px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-blue-300 to-sky-200 shadow-[0_0_28px_rgba(96,165,250,0.45)]"
            animate={{
              x: ['170px', '10px', '-330px'],
              y: ['-12px', '12px', '60px'],
              opacity: [0, 0.85, 0],
              scale: [0.75, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.7,
            }}
          />

          {/* Red beam */}
          <motion.div
            className="absolute left-[34%] top-[5%] h-[15px] w-[160px] -skew-x-[28deg] rounded-sm bg-gradient-to-r from-transparent via-red-400 to-red-200 shadow-[0_0_30px_rgba(248,113,113,0.4)]"
            animate={{
              x: ['-120px', '10px', '180px'],
              y: ['-70px', '10px', '105px'],
              opacity: [0, 0.75, 0],
              scale: [0.75, 1, 0.65],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.4,
            }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[20%] bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
