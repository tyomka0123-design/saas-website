'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Check, 
  Code2, 
  Globe, 
  Layers, 
  Palette, 
  Rocket, 
  Shield, 
  Smartphone, 
  Zap,
  Clock,
  HeartHandshake
} from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every website is designed from scratch. No templates, no generic layouts. Your brand deserves a unique digital presence.'
  },
  {
    icon: Code2,
    title: 'Modern Tech Stack',
    description: 'Built with Next.js, React, and Tailwind CSS. Fast, secure, and scalable infrastructure that grows with your business.'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Perfect experience on every device. Desktop, tablet, mobile — your website looks stunning everywhere.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with Core Web Vitals in mind. Fast loading means better user experience and SEO rankings.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'SSL certificates, secure hosting, and regular backups. Your website and data are protected 24/7.'
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Built-in SEO best practices. Meta tags, structured data, and clean code help you rank higher on Google.'
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We discuss your business goals, target audience, and vision for the website.'
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'You receive a custom design mockup based on your brand and requirements.'
  },
  {
    step: '03',
    title: 'Development',
    description: 'We build your website with clean code and modern technologies.'
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'Your website goes live with ongoing support and maintenance.'
  },
]

const benefits = [
  'No templates or page builders',
  'Pixel-perfect custom design',
  'Mobile-first approach',
  '100/100 PageSpeed score',
  'SEO-ready structure',
  'CMS integration available',
  'Analytics dashboard',
  'Ongoing maintenance',
]

export default function BusinessWebsitesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-white/60 mb-6">
              <Layers className="h-3 w-3" />
              Web Services
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 vercel-gradient-text">
              Business Websites
            </h1>
            
            <p className="text-lg lg:text-xl text-white/60 max-w-2xl mb-8 leading-relaxed">
              Premium custom websites for local businesses. No templates, no generic solutions. 
              We build digital experiences that convert visitors into customers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.15] text-white font-medium hover:bg-white/[0.05] transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '2-4', label: 'Weeks Delivery' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">What You Get</h2>
            <p className="text-white/60 max-w-xl">
              Every business website we build comes with enterprise-grade features and attention to detail.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 max-w-xl">
              A streamlined process designed to get your website live quickly without compromising on quality.
            </p>
          </div>
          
          <div className="space-y-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/[0.15] bg-white/[0.05] text-lg font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Why Choose Koryx</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                We are not a generic web agency. We specialize in building premium websites for local 
                businesses that need to stand out. Every project gets our full attention and expertise.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="h-4 w-4 text-white/40" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Fast Turnaround</div>
                    <div className="text-sm text-white/50">2-4 weeks from start to launch</div>
                  </div>
                </div>
                
                <div className="h-px bg-white/[0.08]" />
                
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Dedicated Support</div>
                    <div className="text-sm text-white/50">Direct communication, no middlemen</div>
                  </div>
                </div>
                
                <div className="h-px bg-white/[0.08]" />
                
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Launch Ready</div>
                    <div className="text-sm text-white/50">Hosting, domain, and SSL included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Book a free discovery call to discuss your project. No commitment, no pressure — 
              just a conversation about your business goals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.15] text-white font-medium hover:bg-white/[0.05] transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
