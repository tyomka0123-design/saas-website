'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '2,500',
    description: 'Perfect for small businesses and personal brands',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '2 rounds of revisions',
      '30-day support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '5,500',
    description: 'Ideal for growing businesses and e-commerce',
    features: [
      'Up to 15 pages',
      'Custom animations',
      'Advanced SEO',
      'E-commerce ready',
      'Booking system',
      'Analytics dashboard',
      'Unlimited revisions',
      '90-day support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited pages',
      'Custom web application',
      'Database integration',
      'Admin panel',
      'API development',
      'Priority support',
      'Dedicated manager',
      '1-year maintenance',
    ],
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-wide uppercase mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
          >
            Transparent Pricing, No Surprises
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Choose the package that fits your needs. All prices are starting points.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative p-6 sm:p-8 rounded-2xl border ${
                plan.popular
                  ? 'border-accent bg-accent/5 glow'
                  : 'border-border bg-card/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                {plan.price === 'Custom' ? (
                  <span className="text-4xl font-bold">Custom</span>
                ) : (
                  <>
                    <span className="text-muted-foreground">$</span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> USD</span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className={`w-full min-h-[48px] ${plan.popular ? 'glow' : ''}`}
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
