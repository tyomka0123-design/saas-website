'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { number: '01', title: 'Discovery', description: 'We dive deep into your brand, goals, and target audience to understand exactly what you need.' },
  { number: '02', title: 'Strategy', description: 'Our team crafts a comprehensive plan including sitemap, wireframes, and technical specifications.' },
  { number: '03', title: 'Design', description: 'We create stunning visual designs that capture your brand essence and engage your audience.' },
  { number: '04', title: 'Development', description: 'Our engineers build your site with clean code, optimal performance, and best practices.' },
  { number: '05', title: 'Launch', description: 'After thorough testing, we deploy your site and provide training on managing your new platform.' },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" ref={ref} className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-wide uppercase mb-4"
          >
            Our Process
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance"
          >
            From Vision to Reality
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg"
          >
            A proven methodology that delivers exceptional results every time.
          </motion.p>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-3 sm:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                  <span className="text-white font-semibold text-sm">{step.number}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop timeline */}
        <div className="relative hidden sm:block">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative flex gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-2 border-accent flex items-center justify-center z-10">
                  <span className="text-accent font-bold">{step.number}</span>
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
