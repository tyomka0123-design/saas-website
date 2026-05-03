'use client'

import { ArrowRight, Code2, Database, Eye, Github, Gitlab, Lock, Server } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  { title: 'Next.js Templates', logo: 'N', color: '#ffffff', tint: 'rgba(255,255,255,0.08)' },
  { title: 'Supabase Templates', logo: 'S', color: '#3ecf8e', tint: 'rgba(62,207,142,0.12)' },
  { title: 'React Templates', logo: '⚛', color: '#38bdf8', tint: 'rgba(56,189,248,0.12)' },
  { title: 'Nuxt Templates', logo: '△', color: '#00dc82', tint: 'rgba(0,220,130,0.12)' },
  { title: 'Astro Templates', logo: 'A', color: '#ffffff', tint: 'rgba(255,255,255,0.08)' },
  { title: 'Python Templates', logo: 'Py', color: '#facc15', tint: 'rgba(250,204,21,0.12)' },
]

const bullets = [
  {
    icon: Github,
    text: 'Deploy automatically from git or with your CLI',
  },
  {
    icon: Server,
    text: 'Wide range support for the most popular frameworks',
  },
  {
    icon: Eye,
    text: 'Previews for every push',
  },
  {
    icon: Lock,
    text: 'Automatic HTTPS for all your domains',
  },
]

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="absolute inset-y-0 left-[14%] w-px bg-white/[0.08]" />
      <div className="absolute inset-y-0 left-[43%] w-px bg-white/[0.08]" />
      <div className="absolute inset-y-0 right-[14%] w-px bg-white/[0.08]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

      <div className="relative z-10 mx-auto grid max-w-[1160px] gap-14 px-4 md:grid-cols-[300px_1fr] lg:gap-20">
        <div className="pt-5">
          <h2 className="max-w-[280px] text-[42px] font-bold leading-[1.02] tracking-[-0.06em] text-white md:text-[48px]">
            Deploy your
            <br />
            first app in
            <br />
            seconds.
          </h2>

          <div className="mt-10 space-y-8">
            {bullets.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.text} className="flex gap-3 text-[17px] leading-7 text-white/70">
                  <Icon className="mt-1 h-4 w-4 shrink-0 text-white" strokeWidth={1.8} />
                  <p>{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="grid gap-7 sm:grid-cols-2">
            {cards.map((card, index) => (
              <motion.a
                href="#services"
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative h-[168px] overflow-hidden border border-white/[0.11] bg-black transition hover:border-white/[0.22]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[102px]"
                  style={{
                    background: `linear-gradient(to bottom, ${card.tint}, rgba(0,0,0,0.18))`,
                  }}
                />

                <div
                  className="absolute inset-x-0 top-0 h-[102px] opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
                    `,
                    backgroundSize: '76px 42px',
                  }}
                />

                <div className="absolute right-0 top-0 h-[54px] w-[54px] border-l border-b border-white/[0.13] bg-black/30 [clip-path:polygon(0_0,100%_0,100%_100%)]" />

                <div className="absolute left-1/2 top-[54px] flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-white/[0.14] bg-black/50">
                  <div
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/[0.22] bg-black text-[18px] font-bold"
                    style={{ color: card.color }}
                  >
                    {card.logo}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.06] bg-black px-4 py-4">
                  <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-24 grid gap-7 md:grid-cols-[1fr_300px]">
            <a
              href="/register"
              className="group flex h-[92px] items-center justify-between rounded-full border border-white/[0.12] bg-black px-9 text-[42px] font-bold tracking-[-0.06em] text-white transition hover:border-white/[0.22]"
            >
              Start Deploying
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition group-hover:scale-105">
                <ArrowRight className="h-7 w-7" />
              </span>
            </a>

            <div className="flex flex-col justify-center gap-3">
              <a
                href="/register"
                className="flex h-11 items-center justify-center rounded-full bg-white text-[14px] font-semibold text-black"
              >
                Talk to an Expert
              </a>
              <a
                href="#services"
                className="flex h-11 items-center justify-center rounded-full border border-white/[0.12] text-[14px] font-medium text-white/70"
              >
                Get an Enterprise Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
