"use client"

import { ArrowRight, Lock, PanelTop, SearchCheck } from "lucide-react"
import { motion } from "framer-motion"

function CardLogo({ type }: { type: string }) {
  if (type === "next") return <span className="text-[25px] font-light text-white">N</span>
  if (type === "svelte") return <span className="text-[27px] font-black text-[#ff3e00]">S</span>
  if (type === "react") return <span className="text-[29px] text-[#61dafb]">⚛</span>
  if (type === "nuxt") return <span className="text-[30px] font-bold text-[#00dc82]">△</span>
  if (type === "astro") return <span className="text-[29px] font-black text-white">A</span>
  return <span className="text-[21px] font-bold text-[#ffd43b]">Py</span>
}

const cards = [
  {
    title: "Next.js Templates",
    type: "next",
    glow: "rgba(255,255,255,0.07)",
    line: "rgba(255,255,255,0.13)",
    bg: "rgba(255,255,255,0.025)",
  },
  {
    title: "Svelte Templates",
    type: "svelte",
    glow: "rgba(255,62,0,0.13)",
    line: "rgba(255,62,0,0.16)",
    bg: "rgba(255,62,0,0.055)",
  },
  {
    title: "React Templates",
    type: "react",
    glow: "rgba(56,189,248,0.13)",
    line: "rgba(56,189,248,0.16)",
    bg: "rgba(56,189,248,0.055)",
  },
  {
    title: "Nuxt Templates",
    type: "nuxt",
    glow: "rgba(0,220,130,0.13)",
    line: "rgba(0,220,130,0.16)",
    bg: "rgba(0,220,130,0.055)",
  },
  {
    title: "Astro Templates",
    type: "astro",
    glow: "rgba(255,255,255,0.07)",
    line: "rgba(255,255,255,0.13)",
    bg: "rgba(255,255,255,0.025)",
  },
  {
    title: "Python Templates",
    type: "python",
    glow: "rgba(250,204,21,0.13)",
    line: "rgba(250,204,21,0.16)",
    bg: "rgba(250,204,21,0.055)",
  },
]

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-28 text-white">
      <div className="relative z-10 mx-auto max-w-[1160px] border-x border-white/[0.09] px-4 md:px-0">
        <div className="grid gap-0 md:grid-cols-[320px_1fr]">
          <div className="border-white/[0.09] md:border-r md:px-10">
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
                  { icon: PanelTop, text: "Wide range support for the most popular frameworks" },
                  { icon: SearchCheck, text: "Previews for every push" },
                  { icon: Lock, text: "Automatic HTTPS for all your domains" },
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
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative h-[176px] overflow-hidden bg-black"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 border border-white/[0.115]" />

                  <div
                    className="pointer-events-none absolute right-0 top-0 h-[34px] w-[34px] border-b border-l border-white/[0.115] bg-black"
                  />

                  <div
                    className="absolute left-0 right-0 top-0 h-[104px]"
                    style={{
                      background: `
                        linear-gradient(to bottom, ${card.bg}, rgba(0,0,0,0.15) 76%, transparent),
                        radial-gradient(circle at 50% 38%, ${card.glow}, transparent 43%)
                      `,
                    }}
                  />

                  <svg
                    className="pointer-events-none absolute left-0 top-0 h-[104px] w-full"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="34" x2="100%" y2="34" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />
                    <line x1="0" y1="68" x2="100%" y2="68" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />

                    <line x1="16%" y1="0" x2="16%" y2="104" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />
                    <line x1="38%" y1="0" x2="38%" y2="104" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />
                    <line x1="61%" y1="0" x2="61%" y2="104" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />
                    <line x1="84%" y1="0" x2="84%" y2="104" stroke={card.line} strokeWidth="0.45" strokeDasharray="1.5 7" />
                  </svg>

                  <div className="absolute inset-x-0 top-[104px] h-px bg-white/[0.075]" />
                  <div className="absolute inset-x-0 bottom-0 h-[72px] bg-black" />

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div
                      className="absolute left-1/2 top-[52px] h-[130px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                      style={{ background: card.glow }}
                    />
                    <div className="absolute inset-0 bg-white/[0.018]" />
                  </div>

                  <div
                    className="absolute left-1/2 top-[56px] flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed bg-black/75 transition duration-200 group-hover:scale-[1.03]"
                    style={{
                      borderColor: card.line,
                      boxShadow: `0 0 22px ${card.glow}`,
                    }}
                  >
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.16] bg-black">
                      <CardLogo type={card.type} />
                    </div>
                  </div>

                  <h3 className="absolute bottom-[21px] left-5 text-[18px] font-semibold tracking-[-0.045em] text-white">
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
                <a
                  href="/register"
                  className="flex h-11 items-center justify-center rounded-full bg-white text-[14px] font-semibold text-black"
                >
                  Talk to an Expert
                </a>
                <a
                  href="#services"
                  className="flex h-11 items-center justify-center rounded-full border border-white/[0.14] text-[14px] font-medium text-white/70"
                >
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
