'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Database, Globe, CalendarCheck, Zap, ShieldCheck } from 'lucide-react'

const tabs = ['Landing Page', 'Business Site', 'Dashboard', 'E-commerce', 'Bookings', 'Automation']

const cards = [
  {
    title: 'Next.js',
    desc: 'The React framework for premium web products',
    icon: Code2,
    color: 'rgba(255,255,255,0.08)',
  },
  {
    title: 'Supabase',
    desc: 'Authentication, database, and client workflows',
    icon: Database,
    color: 'rgba(34,197,94,0.16)',
  },
  {
    title: 'Vercel',
    desc: 'Fast hosting and production deployments',
    icon: Globe,
    color: 'rgba(59,130,246,0.16)',
  },
  {
    title: 'Bookings',
    desc: 'Appointment systems for real businesses',
    icon: CalendarCheck,
    color: 'rgba(168,85,247,0.14)',
  },
  {
    title: 'Automation',
    desc: 'Emails, forms, admin actions, and client flow',
    icon: Zap,
    color: 'rgba(245,158,11,0.14)',
  },
  {
    title: 'Security',
    desc: 'Protected routes, accounts, and private dashboards',
    icon: ShieldCheck,
    color: 'rgba(20,184,166,0.14)',
  },
]

export function Workflow() {
  const [active, setActive] = useState('Landing Page')

  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_45%)]" />

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

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group relative overflow-hidden border border-white/[0.09] bg-white/[0.025] transition hover:border-white/[0.18]"
              >
                <div
                  className="relative h-[150px] border-b border-white/[0.07]"
                  style={{
                    background: `linear-gradient(to bottom, ${card.color}, rgba(0,0,0,0.25))`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.28]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)
                      `,
                      backgroundSize: '64px 46px',
                    }}
                  />

                  <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-white/[0.08] bg-black/35 [clip-path:polygon(0_0,100%_0,100%_100%)]" />

                  <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                    <Icon className="h-7 w-7 text-white/85" strokeWidth={1.7} />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-[17px] font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/42">{card.desc}</p>

                  <a
                    href="#services"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white/32 transition group-hover:text-white/75"
                  >
                    Build with this
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
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
