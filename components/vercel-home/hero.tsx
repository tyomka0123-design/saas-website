'use client'

import { motion } from 'framer-motion'
import { CdnGridBackground } from './cdn-grid-background'

function VercelLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 76 65" fill="currentColor">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black">
      <CdnGridBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[42px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[56px] md:text-[72px]"
        >
          A self-driving
          <br />
          delivery network
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mt-10 max-w-[500px] text-[17px] leading-relaxed text-white/50 md:text-[19px]"
        >
          The global CDN optimized
          <br />
          for every app and agent.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="/register"
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-white px-6 text-[15px] font-medium text-black transition-all hover:bg-white/90"
          >
            <VercelLogo className="h-4 w-4" />
            Start Deploying
          </a>

          <a
            href="#demo"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-black/50 px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/5"
          >
            Get a Demo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
