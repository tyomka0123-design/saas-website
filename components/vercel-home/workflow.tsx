'use client'

import { ArrowRight, Eye, Lock, PanelTop, SearchCheck } from 'lucide-react'
import { motion } from 'framer-motion'

function Logo({ type, color }: { type: string; color: string }) {
  if (type === 'next') return <span className="text-[24px] font-light">N</span>
  if (type === 'svelte') return <span className="text-[30px] font-black">S</span>
  if (type === 'react') return <span className="text-[30px]">⚛</span>
  if (type === 'nuxt') return <span className="text-[28px] font-bold">△</span>
  if (type === 'astro') return <span className="text-[28px] font-black">A</span>
  return <span className="text-[22px] font-bold">Py</span>
}

const cards = [
  {
    title: 'Next.js Templates',
    type: 'next',
    color: '#ffffff',
    tint: 'rgba(255,255,255,0.07)',
    line: 'rgba(255,255,255,0.24)',
  },
  {
    title: 'Svelte Templates',
    type: 'svelte',
    color: '#ff3e00',
    tint: 'rgba(255,62,0,0.12)',
    line: 'rgba(255,62,0,0.28)',
  },
  {
    title: 'React Templates',
    type: 'react',
    color: '#38bdf8',
    tint: 'rgba(56,189,248,0.12)',
    line: 'rgba(56,189,248,0.30)',
  },
  {
    title: 'Nuxt Templates',
    type: 'nuxt',
    color: '#00dc82',
    tint: 'rgba(0,220,130,0.12)',
    line: 'rgba(0,220,130,0.30)',
  },
  {
    title: 'Astro Templates',
    type: 'astro',
    color: '#ffffff',
    tint: 'rgba(255,255,255,0.07)',
    line: 'rgba(255,255,255,0.24)',
  },
  {
    title: 'Python Templates',
    type: 'python',
    color: '#facc15',
    tint: 'rgba(250,204,21,0.12)',
    line: 'rgba(250,204,21,0.30)',
  },
]

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="relative z-10 mx-auto max-w-[1160px] border-x border-white/[0.11] px-4 md:px-0">
        <div className="grid gap-0 md:grid-cols-[320px_1fr]">
          <div className="border-white/[0.11] md:border-r md:px-10">
            <div className="max-w-[280px] pt-10 md:pt-12">
              <h2 className="text-[40px] font-bold leading-[1.04] tracking-[-0.06em] text-white md:text-[46px]">
                Deploy your
                <br />
                first app in
                <br />
                seconds.
              </h2>

              <div className="mt-10 space-y-8">
                <div className="flex gap-4 text-[17px] leading-7 text-white/72">
                  <div className="mt-1 flex h-5 min-w-[54px] items-center">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                      GH
                    </span>
                    <span className="-ml-1 flex h-4 w-4 items-center justify-center rounded-[2px] bg-[#0070f3] text-[10px] font-bold text-white">
                      V
                    </span>
                    <span className="-ml-1 flex h-4 w-4 items-center justify-center text-[15px]">
                      🦊
                    </span>
                  </div>
                  <p>Deploy automatically from git or with our CLI</p>
                </div>

                {[
                  { icon: PanelTop, text: 'Wide range support for the most popular frameworks' },
                  { icon: SearchCheck, text: 'Previews for every push' },
                  { icon: Lock, text: 'Automatic HTTPS for all your domains' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.text}
                      className="grid grid-cols-[18px_1fr] gap-4 text-[17px] leading-7 text-white/72"
                    >
                      <Icon className="mt-1 h-4 w-4 text-white/90" strokeWidth={1.8} />
                      <p>{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-10 md:px-10 md:pt-12">
            <div className="grid gap-7 sm:grid-cols-2">
              {cards.map((card, index) => (
                <motion.a
                  href="#services"
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative h-[176px] overflow-hidden border border-white/[0.14] bg-black"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[104px]"
                    style={{
                      background: `linear-gradient(to bottom, ${card.tint}, rgba(0,0,0,0.03) 72%, rgba(0,0,0,0))`,
                    }}
                  />

                  <svg className="absolute left-0 top-0 h-[104px] w-full" preserveAspectRatio="none">
                    <line x1="0" y1="34" x2="100%" y2="34" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />
                    <line x1="0" y1="68" x2="100%" y2="68" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />

                    <line x1="16%" y1="0" x2="16%" y2="104" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />
                    <line x1="38%" y1="0" x2="38%" y2="104" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />
                    <line x1="60%" y1="0" x2="60%" y2="104" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />
                    <line x1="82%" y1="0" x2="82%" y2="104" stroke={card.line} strokeWidth="1" strokeDasharray="4 6" />
                  </svg>

                  <div className="absolute right-[-1px] top-[-1px] h-[58px] w-[58px]">
                    <div className="absolute right-0 top-0 h-full w-full border-l border-b border-white/[0.15] bg-black/40 [clip-path:polygon(0_0,100%_100%,100%_0)]" />
                    <div className="absolute right-[57px] top-0 h-px w-[999px] bg-white/[0.08]" />
                    <div className="absolute right-0 top-[57px] h-[999px] w-px bg-white/[0.08]" />
                  </div>

                  <div className="absolute inset-x-0 top-[104px] h-px bg-white/[0.08]" />
                  <div className="absolute inset-x-0 bottom-0 h-[72px] bg-black" />

                  <div
                    className="absolute left-1/2 top-[55px] flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed bg-black/60 transition duration-150 group-hover:scale-[1.04]"
                    style={{
                      borderColor: card.line,
                      boxShadow: `0 0 34px ${card.tint}`,
                    }}
                  >
                    <div
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.24] bg-black font-bold"
                      style={{ color: card.color }}
                    >
                      <Logo type={card.type} color={card.color} />
                    </div>
                  </div>

                  <h3 className="absolute left-5 bottom-5 text-[18px] font-semibold tracking-[-0.04em] text-white">
                    {card.title}
                  </h3>
                </motion.a>
              ))}
            </div>

            <div className="mt-24 grid gap-7 md:grid-cols-[1fr_300px]">
              <a
                href="/register"
                className="group flex h-[92px] items-center justify-between rounded-full border border-white/[0.14] bg-black px-9 text-[42px] font-bold tracking-[-0.06em] text-white transition hover:border-white/[0.24]"
              >
                Start Deploying
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition group-hover:scale-105">
                  <ArrowRight className="h-7 w-7" />
                </span>
              </a>

              <div className="flex flex-col justify-center gap-3">
                <a href="/register" className="flex h-11 items-center justify-center rounded-full bg-white text-[14px] font-semibold text-black">
                  Talk to an Expert
                </a>
                <a href="#services" className="flex h-11 items-center justify-center rounded-full border border-white/[0.14] text-[14px] font-medium text-white/70">
                  Get an Enterprise Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
