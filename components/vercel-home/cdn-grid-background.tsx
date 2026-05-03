'use client'

import { motion } from 'framer-motion'

function LightBeam({
  className,
  delay = 0,
  duration = 3.8,
  x,
  y,
  scale,
}: {
  className: string
  delay?: number
  duration?: number
  x: string[]
  y: string[]
  scale?: number[]
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[0.5px] ${className}`}
      animate={{
        x,
        y,
        opacity: [0, 0.15, 0.95, 0.45, 0],
        scale: scale ?? [0.72, 0.95, 1, 0.72],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: [0.45, 0, 0.2, 1],
        delay,
      }}
    >
      <div className="absolute inset-0 rounded-full bg-inherit blur-[10px] opacity-70" />
      <div className="absolute inset-[2px] rounded-full bg-white/35 blur-[2px]" />
    </motion.div>
  )
}

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

          {/* PREMIUM LIGHT BEAMS */}
          <LightBeam
            className="left-[5%] top-[76%] h-[10px] w-[270px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-cyan-200 to-sky-400 shadow-[0_0_42px_rgba(56,189,248,0.55)] max-md:h-[8px] max-md:w-[190px]"
            x={['-210px', '120px', '520px']}
            y={['105px', '28px', '-36px']}
            scale={[0.65, 1, 0.62]}
            duration={3.2}
          />

          <LightBeam
            className="right-[7%] top-[13%] h-[10px] w-[260px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-emerald-200 to-teal-400 shadow-[0_0_42px_rgba(45,212,191,0.52)] max-md:h-[8px] max-md:w-[185px]"
            x={['210px', '-24px', '-370px']}
            y={['-92px', '8px', '126px']}
            scale={[0.66, 1, 0.6]}
            duration={3.6}
            delay={0.65}
          />

          <LightBeam
            className="right-[1%] top-[43%] h-[8px] w-[180px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-blue-200 to-sky-400 shadow-[0_0_34px_rgba(96,165,250,0.5)] max-md:h-[7px] max-md:w-[130px]"
            x={['185px', '10px', '-330px']}
            y={['-18px', '10px', '58px']}
            scale={[0.7, 1, 0.65]}
            duration={2.9}
            delay={1.45}
          />

          <LightBeam
            className="left-[34%] top-[6%] h-[8px] w-[165px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-rose-200 to-red-400 shadow-[0_0_32px_rgba(248,113,113,0.38)] max-md:h-[7px] max-md:w-[118px]"
            x={['-120px', '6px', '168px']}
            y={['-65px', '8px', '98px']}
            scale={[0.72, 1, 0.62]}
            duration={3.4}
            delay={2.25}
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
