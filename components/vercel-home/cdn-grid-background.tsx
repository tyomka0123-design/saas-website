'use client'

import { motion } from 'framer-motion'

export function CdnGridBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden flex items-center justify-center">

      {/* CENTER FADE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />

      {/* 3D ROOM */}
      <div className="relative w-[1100px] max-w-[92vw] h-[650px] mt-20 [perspective:900px]">
        <div className="w-full h-full [transform-style:preserve-3d] relative">

          {/* BACK WALL */}
          <div className="absolute left-[20%] top-[18%] w-[60%] h-[54%] border border-white/[0.08]" />

          {/* FLOOR */}
          <div className="absolute bottom-0 left-[20%] w-[60%] h-[30%] border-b border-x border-white/[0.08]" />

          {/* CEILING */}
          <div className="absolute top-0 left-[20%] w-[60%] h-[18%] border-t border-x border-white/[0.08]" />

          {/* LEFT WALL */}
          <div className="absolute left-0 top-0 w-[30%] h-full border-l border-y border-white/[0.07] [transform:skewY(18deg)] origin-right" />

          {/* RIGHT WALL */}
          <div className="absolute right-0 top-0 w-[30%] h-full border-r border-y border-white/[0.07] [transform:skewY(-18deg)] origin-left" />

          {/* GRID BACK */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-[18%] h-[54%] w-px bg-white/[0.07]"
              style={{ left: `${30 + i * 10}%` }}
            />
          ))}

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-[20%] w-[60%] h-px bg-white/[0.07]"
              style={{ top: `${32 + i * 12}%` }}
            />
          ))}

          {/* ======================= */}
          {/* 🔥 REAL LIGHT BEAMS */}
          {/* ======================= */}

          {/* LEFT FLOOR BEAM */}
          <motion.div
            className="absolute left-[5%] bottom-[5%] w-[220px] h-[20px] rounded-full blur-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(56,189,248,1), rgba(56,189,248,0.4), transparent)',
              transform: 'skewX(-25deg)',
            }}
            animate={{
              x: ['-20%', '120%'],
              opacity: [0, 1, 0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* RIGHT WALL BEAM */}
          <motion.div
            className="absolute right-[5%] top-[40%] w-[160px] h-[16px] rounded-full blur-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(96,165,250,1), rgba(96,165,250,0.4), transparent)',
              transform: 'skewX(-25deg)',
            }}
            animate={{
              x: ['-40%', '100%'],
              y: ['0%', '-20%'],
              opacity: [0, 1, 0.6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* TOP BEAM (GREEN LIKE VERCEL) */}
          <motion.div
            className="absolute right-[15%] top-[5%] w-[200px] h-[18px] rounded-full blur-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(45,212,191,1), rgba(45,212,191,0.4), transparent)',
              transform: 'skewX(-25deg)',
            }}
            animate={{
              x: ['-20%', '120%'],
              opacity: [0, 1, 0.6, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

        </div>
      </div>
    </div>
  )
}
