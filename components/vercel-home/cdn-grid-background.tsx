'use client'

import { motion } from 'framer-motion'

function Beam({
  className,
  delay = 0,
  duration = 4,
}: {
  className: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute h-[18px] rounded-full ${className}`}
      initial={{ opacity: 0, x: 0, y: 0, scaleX: 0.65 }}
      animate={{
        opacity: [0, 0.9, 0.65, 0],
        x: ['0%', '42%', '88%', '118%'],
        y: ['0%', '-10%', '-20%', '-26%'],
        scaleX: [0.55, 1, 1.08, 0.7],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.42, 0, 0.18, 1],
      }}
    />
  )
}

export function CdnGridBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-start justify-center overflow-hidden bg-black">
      {/* soft center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.06),transparent_38%)]" />

      {/* 3D room */}
      <div className="absolute top-[72px] h-[650px] w-[1060px] max-w-[92vw] [perspective:920px]">
        <div className="relative h-full w-full [transform-style:preserve-3d]">
          {/* back panel */}
          <div className="absolute left-[18%] top-[20%] h-[52%] w-[64%] border border-white/[0.105] bg-black/35" />

          {/* outer frame */}
          <div className="absolute inset-0 border border-white/[0.095]" />

          {/* left wall */}
          <div className="absolute left-0 top-0 h-full w-[32%] origin-right border-y border-l border-white/[0.075] [transform:skewY(18deg)]" />

          {/* right wall */}
          <div className="absolute right-0 top-0 h-full w-[32%] origin-left border-y border-r border-white/[0.075] [transform:skewY(-18deg)]" />

          {/* ceiling */}
          <div className="absolute left-[18%] top-0 h-[20%] w-[64%] border-x border-t border-white/[0.075]" />

          {/* floor */}
          <div className="absolute bottom-0 left-[18%] h-[28%] w-[64%] border-x border-b border-white/[0.075]" />

          {/* vertical back grid */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`back-v-${i}`}
              className="absolute top-[20%] h-[52%] w-px bg-white/[0.075]"
              style={{ left: `${28.5 + i * 10.75}%` }}
            />
          ))}

          {/* horizontal back grid */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`back-h-${i}`}
              className="absolute left-[18%] h-px w-[64%] bg-white/[0.075]"
              style={{ top: `${33 + i * 13}%` }}
            />
          ))}

          {/* perspective side lines */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`left-depth-${i}`}
              className="absolute left-0 h-px w-[18%] origin-right bg-white/[0.07]"
              style={{
                top: `${20 + i * 17.3}%`,
                transform: 'rotate(18deg)',
              }}
            />
          ))}

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`right-depth-${i}`}
              className="absolute right-0 h-px w-[18%] origin-left bg-white/[0.07]"
              style={{
                top: `${20 + i * 17.3}%`,
                transform: 'rotate(-18deg)',
              }}
            />
          ))}

          {/* floor perspective lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`floor-line-${i}`}
              className="absolute bottom-0 h-[28%] w-px origin-top bg-white/[0.065]"
              style={{
                left: `${24 + i * 10.4}%`,
                transform: `skewX(${i < 3 ? 14 - i * 5 : -(i - 2) * 5}deg)`,
              }}
            />
          ))}

          {/* ceiling perspective lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`ceil-line-${i}`}
              className="absolute top-0 h-[20%] w-px origin-bottom bg-white/[0.055]"
              style={{
                left: `${24 + i * 10.4}%`,
                transform: `skewX(${i < 3 ? -14 + i * 5 : (i - 2) * 5}deg)`,
              }}
            />
          ))}

          {/* cyan beam - left floor */}
          <Beam
            duration={4.8}
            delay={0.2}
            className="
              left-[-7%] top-[78%] w-[230px] -skew-x-[24deg]
              bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.95),rgba(56,189,248,0.7),transparent)]
              shadow-[0_0_28px_rgba(56,189,248,0.38)]
              blur-[0.2px]
            "
          />

          {/* green beam - upper right */}
          <Beam
            duration={5.7}
            delay={1.4}
            className="
              left-[73%] top-[12%] w-[210px] -skew-x-[24deg]
              bg-[linear-gradient(90deg,transparent,rgba(94,234,212,0.95),rgba(45,212,191,0.55),transparent)]
              shadow-[0_0_30px_rgba(45,212,191,0.35)]
              blur-[0.2px]
            "
          />

          {/* blue beam - right wall */}
          <Beam
            duration={4.3}
            delay={2.4}
            className="
              left-[82%] top-[42%] w-[160px] -skew-x-[24deg]
              bg-[linear-gradient(90deg,transparent,rgba(147,197,253,0.95),rgba(59,130,246,0.5),transparent)]
              shadow-[0_0_26px_rgba(59,130,246,0.32)]
              blur-[0.2px]
            "
          />

          {/* tiny warm beam, very subtle */}
          <Beam
            duration={6.2}
            delay={3.1}
            className="
              left-[31%] top-[4%] w-[120px] -skew-x-[24deg]
              bg-[linear-gradient(90deg,transparent,rgba(248,113,113,0.45),rgba(248,113,113,0.25),transparent)]
              shadow-[0_0_20px_rgba(248,113,113,0.18)]
              blur-[0.4px]
            "
          />
        </div>
      </div>

      {/* dark masks */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[18%] bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[18%] bg-gradient-to-l from-black to-transparent" />

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  )
}
