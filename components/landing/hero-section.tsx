'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Premium Web Development</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
        >
          We Build Websites
          <br />
          <span className="gradient-text">That Convert</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
        >
          Custom-crafted digital experiences for ambitious brands. From stunning portfolios 
          to powerful e-commerce platforms, we turn your vision into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild className="glow text-base px-8 min-h-[48px]">
            <Link href="/register">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-base px-8 min-h-[48px]">
            <Link href="#services">View Our Work</Link>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading brands worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
            {['Acme Corp', 'Quantum', 'Vertex', 'Nexus', 'Pulse'].map((brand) => (
              <span key={brand} className="text-lg sm:text-xl font-semibold tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
