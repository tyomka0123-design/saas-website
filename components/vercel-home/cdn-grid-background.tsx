'use client'

import { motion } from 'framer-motion'

const sideLines = [0, 1, 2, 3, 4, 5]
const depthLines = [0, 1, 2, 3]

const beams = [
  { side: 'left', delay: 0, color: 'from-cyan-300 via-sky-400 to-transparent' },
  { side: 'right', delay: 1.35, color: 'from-teal-300 via-cyan-400 to-transparent' },
  { side: 'top', delay: 2.45, color: 'from-rose-400 via-red-500 to-transparent' },
  { side: 'bottom', delay: 3.2, color: 'from-blue-300 via-cyan-400 to-transparent' },
]

export function CdnGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.012)_32%,transparent_68%)]" />

      <div className="relative h-[780px] w-[1120px] max-w-[92vw] opacity-95 [perspective:900px] max-md:h-[620px] max-md:w-[92vw]">
        <svg viewBox="0 0 1120 780" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="52%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.035)" />
            </linearGradient>
            <radialGradient id="centerFade" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </radialGradient>
          </defs>

          <rect x="160" y="70" width="800" height="560" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x="330" y="180" width="460" height="340" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.085)" strokeWidth="1" />

          {depthLines.map((_, i) => {
            const t = (i + 1) / 5
            const x = 160 + (330 - 160) * t
            const y = 70 + (180 - 70) * t
            const w = 800 - (800 - 460) * t
            const h = 560 - (560 - 340) * t
            return <rect key={`depth-${i}`} x={x} y={y} width={w} height={h} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          })}

          <line x1="160" y1="70" x2="330" y2="180" stroke="rgba(255,255,255,0.08)" />
          <line x1="960" y1="70" x2="790" y2="180" stroke="rgba(255,255,255,0.08)" />
          <line x1="160" y1="630" x2="330" y2="520" stroke="rgba(255,255,255,0.08)" />
          <line x1="960" y1="630" x2="790" y2="520" stroke="rgba(255,255,255,0.08)" />

          {sideLines.map((_, i) => {
            const t = (i + 1) / 7
            return (
              <g key={`grid-${i}`}>
                <line x1={160 + 800 * t} y1="70" x2={330 + 460 * t} y2="180" stroke="rgba(255,255,255,0.055)" />
                <line x1={160 + 800 * t} y1="630" x2={330 + 460 * t} y2="520" stroke="rgba(255,255,255,0.055)" />
                <line x1="160" y1={70 + 560 * t} x2="330" y2={180 + 340 * t} stroke="rgba(255,255,255,0.055)" />
                <line x1="960" y1={70 + 560 * t} x2="790" y2={180 + 340 * t} stroke="rgba(255,255,255,0.055)" />
              </g>
            )
          })}
        </svg>

        {beams.map((beam, i) => (
          <motion.div
            key={i}
            className={`absolute h-[18px] w-[118px] rounded-full bg-gradient-to-r ${beam.color} blur-[0.2px] shadow-[0_0_26px_rgba(80,220,255,0.38)]`}
            initial={false}
            animate={
              beam.side === 'left'
                ? { x: [-120, 260, 440], y: [510, 440, 375], scale: [0.7, 1.05, 0.18], opacity: [0, 1, 0] }
                : beam.side === 'right'
                  ? { x: [1040, 790, 610], y: [235, 285, 365], scale: [0.7, 1.05, 0.18], opacity: [0, 1, 0] }
                  : beam.side === 'top'
                    ? { x: [520, 545, 555], y: [-45, 115, 250], scale: [0.55, 0.95, 0.18], opacity: [0, 0.9, 0] }
                    : { x: [440, 500, 555], y: [700, 560, 455], scale: [0.7, 1.05, 0.18], opacity: [0, 1, 0] }
            }
            transition={{ duration: 2.8, delay: beam.delay, repeat: Infinity, repeatDelay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        <div className="absolute inset-x-[27%] top-[23%] h-[43%] border border-white/[0.06] bg-black/20 shadow-[0_0_80px_rgba(0,0,0,0.55)]" />
      </div>
    </div>
  )
}
