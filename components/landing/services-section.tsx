'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Globe, 
  ShoppingCart, 
  Palette, 
  Zap, 
  Shield, 
  BarChart 
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Business Websites',
    description: 'Professional websites that establish credibility and drive growth for your business.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'High-converting online stores with seamless checkout and inventory management.',
  },
  {
    icon: Palette,
    title: 'Brand Portfolios',
    description: 'Stunning visual showcases that highlight your work and attract premium clients.',
  },
  {
    icon: Zap,
    title: 'Web Applications',
    description: 'Custom web apps with powerful functionality tailored to your specific needs.',
  },
  {
    icon: Shield,
    title: 'Booking Systems',
    description: 'Integrated scheduling solutions for restaurants, clinics, and service businesses.',
  },
  {
    icon: BarChart,
    title: 'Landing Pages',
    description: 'Conversion-optimized pages that turn visitors into customers and subscribers.',
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-wide uppercase mb-4"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
          >
            Everything You Need to Succeed Online
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From concept to launch, we handle every aspect of your web presence.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group p-6 sm:p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-all duration-300 hover:border-accent/50"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
