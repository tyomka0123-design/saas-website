'use client'

import { ArrowRight, Eye, Lock, PanelTop, SearchCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  { title: 'Next.js Templates', logo: 'N', color: '#fff', tint: 'rgba(255,255,255,0.06)', line: 'rgba(255,255,255,0.20)' },
  { title: 'Svelte Templates', logo: 'S', color: '#ff3e00', tint: 'rgba(255,62,0,0.10)', line: 'rgba(255,62,0,0.24)' },
  { title: 'React Templates', logo: '⚛', color: '#38bdf8', tint: 'rgba(56,189,248,0.10)', line: 'rgba(56,189,248,0.25)' },
  { title: 'Nuxt Templates', logo: '△', color: '#00dc82', tint: 'rgba(0,220,130,0.10)', line: 'rgba(0,220,130,0.25)' },
  { title: 'Astro Templates', logo: 'A', color: '#fff', tint: 'rgba(255,255,255,0.06)', line: 'rgba(255,255,255,0.20)' },
  { title: 'Python Templates', logo: 'Py', color: '#facc15', tint: 'rgba(250,204,21,0.10)', line: 'rgba(250,204,21,0.24)' },
]

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="relative z-10 mx-auto max-w-[1160px] border-x border-white/[0.105] px-4 md:px-0">
        <div className="grid gap-0 md:grid-cols-[320px_1fr]">
          <div className="border-white/[0.105] md:border-r md:px-10">
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
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">GH</span>
                    <span className="-ml-1 flex h-4 w-4 items-center justify-center rounded-[2px] bg-[#0070f3] text-[10px] font-bold text-white">V</span>
                    <span className="-ml-1 flex h-4 w-4 items-center justify-center text-[15px]">🦊</span>
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
                    <div key={item.text} className="grid grid-cols-[18px_1fr] gap-4 text-[17px] leading-7 text-white/72">
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
                  className="group relative h-[168px] overflow-visible border border-white/[0.13] bg-black"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-x-0 top-0 h-[102px]"
                      style={{
                        background: `linear-gradient(to bottom, ${card.tint}, rgba(0,0,0,0.05) 72%, rgba(0,0,0,0))`,
                      }}
                    />

                    <div
                      className="absolute inset-x-0 top-0 h-[102px] opacity-80"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, ${card.line} 1px, transparent 1px),
                          linear-gradient(to bottom, ${card.line} 1px, transparent 1px)
                        `,
                        backgroundSize: '92px 43px',
                        backgroundPosition: '0 0',
                      }}
                    />

                    <div
                      className="absolute inset-x-0 top-0 h-[102px] opacity-55"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, transparent 0 48%, ${card.line} 48% 48.4%, transparent 48.4%),
                          linear-gradient(to bottom, transparent 0 50%, ${card.line} 50% 50.4%, transparent 50.4%)
                        `,
                      }}
                    />

                    <div className="absolute inset-x-0 top-[102px] h-px bg-white/[0.08]" />

                    <div className="absolute inset-x-0 bottom-0 h-[65px] bg-black" />

                    <div className="absolute right-[-1px] top-[-1px] h-[56px] w-[56px] border-l border-b border-white/[0.14] bg-black [clip-path:polygon(0_0,100%_100%,100%_0)]" />

                    <div className="absolute right-[55px] top-0 h-px w-[calc(100%-55px)] bg-white/[0.08]" />
                    <div className="absolute right-0 top-[55px] h-[calc(100%-55px)] w-px bg-white/[0.08]" />
                  </div>

                  <div
                    className="absolute left-1/2 top-[55px] flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed bg-black/55 transition duration-150 group-hover:scale-[1.04]"
                    style={{ borderColor: card.line }}
                  >
                    <div
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/[0.22] bg-black text-[20px] font-bold"
                      style={{
                        color: card.color,
                        boxShadow: `0 0 34px ${card.tint}`,
                      }}
                    >
                      {card.logo}
                    </div>
                  </div>

                  <h3 className="absolute left-5 bottom-5 text-[17px] font-semibold tracking-[-0.04em] text-white">
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
