'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { CdnGridBackground } from './cdn-grid-background'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame = 0
    let particles: Array<{ x: number; y: number; vx: number; vy: number; opacity: number; size: number }> = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: window.innerWidth < 768 ? 34 : 64 }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        opacity: Math.random() * 0.22 + 0.04,
        size: Math.random() * 1.3 + 0.45,
      }))
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = rect.width
        if (p.x > rect.width) p.x = 0
        if (p.y < 0) p.y = rect.height
        if (p.y > rect.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(255,255,255,${0.035 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }} />
      <CdnGridBackground />
      <div className="absolute inset-0 vercel-hero-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-20">
        <div className="vercel-animate-fade-in-up flex justify-center mb-8">
          <a href="#services" className="vercel-tag-badge group">
            <Sparkles className="w-3 h-3 text-white/60" />
            <span>Premium web development for ambitious brands</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <h1 className="vercel-animate-fade-in-up vercel-delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-6">
          <span className="vercel-gradient-text">Build & deploy</span>
          <br />
          <span className="vercel-gradient-text">the best web</span>
          <br />
          <span className="vercel-gradient-text">experiences</span>
        </h1>

        <p className="vercel-animate-fade-in-up vercel-delay-200 text-[17px] sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Apex Studio creates premium websites, dashboards, and digital platforms that look expensive, load fast, and convert visitors into clients.
        </p>

        <div className="vercel-animate-fade-in-up vercel-delay-300 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/register" className="vercel-btn-white text-[15px] px-6 py-3 rounded-lg w-full sm:w-auto justify-center">
            Start Project
          </Link>
          <a href="#services" className="vercel-btn-outline text-[15px] px-6 py-3 rounded-lg w-full sm:w-auto justify-center">
            View Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="vercel-animate-fade-in-up vercel-delay-400 mt-5 text-[13px] text-white/30">
          Custom code · Premium UI · Built for conversion
        </p>

        <div className="vercel-animate-fade-in-up vercel-delay-500 mt-16 max-w-lg mx-auto">
          <div className="vercel-code-block text-left overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[11px] text-white/30 font-mono">terminal</span>
            </div>
            <div className="p-4 space-y-1.5 font-mono text-[13px]">
              <div className="flex gap-3">
                <span className="text-white/30">$</span>
                <span className="text-white/80">npm run build</span>
              </div>
              <div className="flex gap-3">
                <span className="text-white/30">$</span>
                <span className="text-white/80">vercel deploy --prod</span>
              </div>
              <div className="text-green-400/80 text-[12px] mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 inline-block" />
                Production ready in 12s
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
