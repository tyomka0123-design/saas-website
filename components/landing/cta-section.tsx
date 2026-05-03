'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12 lg:p-20 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-glow-cyan/10 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready to Build Something
              <br />
              <span className="gradient-text">Exceptional?</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Let&apos;s discuss your project and create a digital experience that sets you apart from the competition.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="glow text-base px-8 min-h-[48px]">
                <Link href="/register">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base px-8 min-h-[48px]">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
