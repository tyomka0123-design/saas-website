'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { CdnGridBackground } from './cdn-grid-background'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-24">
      <CdnGridBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-black/55 px-4 py-2 text-[13px] text-white/55 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Premium web development for ambitious brands
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[820px] border border-white/[0.06] bg-black px-6 py-14 shadow-[0_0_120px_rgba(0,0,0,0.9)]">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-[48px] font-bold leading-[0.98] tracking-[-0.055em] text-transparent sm:text-[70px] md:text-[86px]"
          >
            Build & deploy
            <br />
            the best web
            <br />
            experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-8 max-w-[660px] text-[15px] leading-7 text-white/48 md:text-[17px]"
          >
            Apex Studio creates premium websites, dashboards, and digital platforms that
            look expensive, load fast, and convert visitors into clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="/register"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-black transition hover:scale-[1.02] sm:w-auto"
            >
              Start Project
            </a>

            <a
              href="#services"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-black/45 px-7 text-[15px] font-medium text-white/75 transition hover:bg-white/[0.07] sm:w-auto"
            >
              View Services
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <p className="mt-7 text-[13px] text-white/25">
            Custom code · Premium UI · Built for conversion
          </p>
        </div>
      </div>
    </section>
  )
}
