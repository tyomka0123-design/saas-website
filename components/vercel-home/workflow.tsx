'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const tabs = ['Landing Page', 'Business Site', 'Dashboard', 'E-commerce', 'Bookings', 'Automation']

const cards = [
  {
    title: 'Next.js Templates',
    logo: 'N',
    color: 'white',
    glow: 'rgba(255,255,255,0.12)',
    grid: 'rgba(255,255,255,0.22)',
  },
  {
    title: 'Supabase Templates',
    logo: 'S',
    color: '#3ecf8e',
    glow: 'rgba(62,207,142,0.18)',
    grid: 'rgba(62,207,142,0.22)',
  },
  {
    title: 'React Templates',
    logo: '⚛',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.18)',
    grid: 'rgba(56,189,248,0.22)',
  },
  {
    title: 'Nuxt Templates',
    logo: '△',
    color: '#00dc82',
    glow: 'rgba(0,220,130,0.18)',
    grid: 'rgba(0,220,130,0.22)',
  },
  {
    title: 'Astro Templates',
    logo: 'A',
    color: 'white',
    glow: 'rgba(255,255,255,0.12)',
    grid: 'rgba(255,255,255,0.20)',
  },
  {
    title: 'Python Templates',
    logo: 'Py',
    color: '#facc15',
    glow: 'rgba(250,204,21,0.16)',
    grid: 'rgba(250,204,21,0.20)',
  },
]

export function Workflow() {
  const [active, setActive] = useState('Landing Page')

  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_48%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-white/20">
            Workflow
          </p>

          <h2 className="bg-gradient-to-b from-white to-white/45 bg-clip-text text-[44px] font-bold tracking-[-0.05em] text-transparent md:text-[64px]">
            Your stack, your way
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/45 md:text-[17px]">
            Build a simple website now, then scale it into a real client portal,
            dashboard, booking system, or paid platform.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full border px-5 py-2 text-[13px] font-medium transition ${
                active === tab
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.1] bg-white/[0.035] text-white/45 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.a
              href="#services"
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative h-[245px] overflow-hidden border border-white/[0.11] bg-black transition hover:border-white/[0.22]"
            >
              <div
                className="absolute inset-x-0 top-0 h-[150px]"
                style={{
                  background: `linear-gradient(to bottom, ${card.glow}, rgba(0,0,0,0.15))`,
                }}
              />

              <div
                className="absolute inset-x-0 top-0 h-[150px] opacity-70"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, ${card.grid} 1px, transparent 1px),
                    linear-gradient(to bottom, ${card.grid} 1px, transparent 1px)
                  `,
                  backgroundSize: '96px 56px',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              />

              <div className="absolute right-0 top-0 h-[72px] w-[72px] border-l border-b border-white/[0.12] bg-black/40 [clip-path:polygon(0_0,100%_0,100%_100%)]" />

              <div
                className="absolute left-1/2 top-[72px] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed bg-black/45"
                style={{
                  borderColor: card.grid,
                  boxShadow: `0 0 42px ${card.glow}`,
                }}
              >
                <div
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/[0.18] bg-black text-[24px] font-bold"
                  style={{ color: card.color }}
                >
                  {card.logo}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-black px-7 py-7">
                <h3 className="text-[22px] font-bold tracking-[-0.04em] text-white">
                  {card.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-[13px] font-medium text-white/28 transition group-hover:text-white/70">
                  Build with this
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#services"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-7 text-[14px] font-semibold text-white/80 transition hover:bg-white/[0.07]"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
