'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, Triangle } from 'lucide-react'

const steps = [
  { label: 'Design', status: 'done', time: '3.2s' },
  { label: 'Build', status: 'done', time: '1.8s' },
  { label: 'Deploy', status: 'done', time: '0.4s' },
  { label: 'Live', status: 'active', time: '' },
]

const metrics = [
  { label: 'Performance', value: '98', good: true },
  { label: 'Load Speed', value: '0.8s', good: true },
  { label: 'Layout Shift', value: '0.001', good: true },
  { label: 'Response Time', value: '28ms', good: true },
]

export function Deploy() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
    }, 1200)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <section ref={sectionRef} className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="vercel-section-label mb-4">Deploy</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight vercel-gradient-text mb-6">
              Ship faster than<br />ever before
            </h2>
            <p className="text-white/45 text-[16px] leading-relaxed mb-8">
              From first design to a live production website. Your site gets built with a real codebase, clean components, and a deployment-ready workflow.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Responsive design for every screen',
                'Fast deployment through Vercel',
                'Clean Next.js architecture',
                'Premium animations and micro-interactions',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-white/70" />
                  </div>
                  <span className="text-[14px] text-white/60">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/register" className="vercel-btn-white text-[14px] px-5 py-2.5 rounded-lg">
              Start Project
            </Link>
          </div>

          <div className="space-y-4">
            <div className="vercel-code-block p-5">
              <div className="flex items-center gap-2 mb-4">
                <Triangle className="w-4 h-4 fill-white text-white" />
                <span className="text-[13px] font-medium text-white/70">apex-site — Production</span>
                <span className="ml-auto text-[11px] text-green-400/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Ready
                </span>
              </div>

              <div className="space-y-2">
                {steps.map((step, i) => (
                  <div
                    key={step.label}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 ${i <= activeStep ? 'bg-white/[0.04]' : 'opacity-30'}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        i < activeStep ? 'bg-white/20' : i === activeStep ? 'bg-white/10 ring-2 ring-white/20' : 'bg-white/5'
                      }`}
                    >
                      {i < activeStep ? (
                        <Check className="w-3 h-3 text-white/80" />
                      ) : i === activeStep ? (
                        <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      )}
                    </div>
                    <span className={`text-[13px] font-medium flex-1 ${i <= activeStep ? 'text-white/80' : 'text-white/30'}`}>
                      {step.label}
                    </span>
                    {step.time && i < activeStep && <span className="text-[11px] text-white/30 font-mono">{step.time}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="vercel-code-block p-5">
              <p className="text-[12px] text-white/30 font-semibold uppercase tracking-wider mb-4">Core Web Vitals</p>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((m) => (
                  <div key={m.label} className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                    <div className="text-[11px] text-white/30 mb-1">{m.label}</div>
                    <div className="text-[16px] font-semibold text-green-400">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
