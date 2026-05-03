'use client'

import { useEffect, useRef } from 'react'
import { BarChart2, Cpu, GitBranch, Globe, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Website Launches',
    description: 'From idea to live website fast. Clean Next.js code, responsive layout, and deployment-ready setup.',
    gradient: 'from-yellow-500/10 to-transparent',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Globe,
    title: 'Premium Global Experience',
    description: 'Fast pages, polished animations, and a serious brand feel that works on desktop and mobile.',
    gradient: 'from-blue-500/10 to-transparent',
    iconColor: 'text-blue-400',
  },
  {
    icon: Shield,
    title: 'Trust-First Design',
    description: 'Modern sections, clear pricing, real conversion flow, and a layout that makes your business look credible.',
    gradient: 'from-green-500/10 to-transparent',
    iconColor: 'text-green-400',
  },
  {
    icon: GitBranch,
    title: 'Custom Codebase',
    description: 'No templates, no builders. A scalable architecture that can grow into dashboards, bookings, and payments.',
    gradient: 'from-orange-500/10 to-transparent',
    iconColor: 'text-orange-400',
  },
  {
    icon: BarChart2,
    title: 'Conversion Mindset',
    description: 'Every section is built to guide visitors toward action — not just to look pretty.',
    gradient: 'from-pink-500/10 to-transparent',
    iconColor: 'text-pink-400',
  },
  {
    icon: Cpu,
    title: 'Product-Level Polish',
    description: 'Micro-interactions, premium spacing, clean typography, and visual depth like modern SaaS products.',
    gradient: 'from-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400',
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handler = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    card.addEventListener('mousemove', handler)
    return () => card.removeEventListener('mousemove', handler)
  }, [])

  const Icon = feature.icon

  return (
    <div ref={cardRef} className="vercel-feature-card p-7 vercel-animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} border border-white/[0.06] mb-5`}>
        <Icon className={`w-5 h-5 ${feature.iconColor}`} />
      </div>
      <h3 className="text-[15px] font-semibold text-white mb-2.5">{feature.title}</h3>
      <p className="text-[13px] text-white/45 leading-relaxed">{feature.description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="services" className="py-24 border-t border-white/[0.06] relative">
      <div className="absolute inset-0 vercel-grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="vercel-section-label mb-4">Platform</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight vercel-gradient-text mb-5">
            Everything you need<br />to ship great products
          </h2>
          <p className="text-white/45 text-[16px] max-w-xl mx-auto">
            Apex Studio builds more than landing pages. You get a serious digital system designed for speed, trust, and sales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
