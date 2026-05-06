'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart3,
  CalendarCheck,
  ChevronDown,
  Code2,
  Database,
  FileText,
  Globe,
  LayoutDashboard,
  Mail,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Triangle,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const menus = {
  Services: {
    columns: [
      {
        title: 'Web Services',
        items: [
          { icon: Store, label: 'Business Websites', desc: 'Premium websites for local brands', href: '/services/business-websites' },
          { icon: CalendarCheck, label: 'Appointment Booking', desc: 'Let clients book online 24/7', href: '/services/appointment-booking' },
          { icon: LayoutDashboard, label: 'Client Dashboards', desc: 'Private portals for customers', href: '/services/client-dashboards' },
          { icon: Search, label: 'SEO & Speed', desc: 'Fast pages built to rank better', href: '/services/seo-speed' },
        ],
      },
      {
        title: 'Platform',
        items: [
          { icon: Code2, label: 'Custom Code', desc: 'No templates, no cheap builders' },
          { icon: Database, label: 'Database Logic', desc: 'Orders, users, bookings, admin data' },
          { icon: ShieldCheck, label: 'Secure Auth', desc: 'Login, accounts, protected routes' },
          { icon: BarChart3, label: 'Analytics', desc: 'Track leads and website performance' },
        ],
      },
      {
        title: 'For Business',
        items: [
          { icon: Users, label: 'Local Businesses', desc: 'Restaurants, salons, shops, services' },
          { icon: Rocket, label: 'Launch Package', desc: 'Design, build, deploy, optimize' },
          { icon: Zap, label: 'Conversion UI', desc: 'Pages made to turn visitors into clients' },
        ],
      },
    ],
  },
  Process: {
    columns: [
      {
        title: 'How It Works',
        items: [
          { icon: FileText, label: '1. Discovery', desc: 'We define your business goal' },
          { icon: Sparkles, label: '2. Design Direction', desc: 'Premium look, clear structure' },
          { icon: Code2, label: '3. Development', desc: 'Clean Next.js code and responsive UI' },
          { icon: Rocket, label: '4. Launch', desc: 'Deploy online and connect your domain' },
        ],
      },
      {
        title: 'Delivery',
        items: [
          { icon: CalendarCheck, label: 'Booking Setup', desc: 'Appointments, requests, forms' },
          { icon: LayoutDashboard, label: 'Admin Controls', desc: 'Manage orders and clients' },
          { icon: Globe, label: 'Live Website', desc: 'Hosted, fast, and production ready' },
          { icon: ShieldCheck, label: 'Private Access', desc: 'Only you can manage the system' },
        ],
      },
      {
        title: 'After Launch',
        items: [
          { icon: BarChart3, label: 'Performance', desc: 'Review speed and conversion' },
          { icon: Mail, label: 'Lead Review', desc: 'Check forms and client flow' },
          { icon: Zap, label: 'Optimization', desc: 'Improve what brings results' },
        ],
      },
    ],
  },
  Workflows: {
    columns: [
      {
        title: 'Automation',
        items: [
          { icon: CalendarCheck, label: 'Booking Flow', desc: 'Client chooses time and sends details' },
          { icon: Mail, label: 'Email Notifications', desc: 'Get notified when clients submit forms' },
          { icon: Database, label: 'Order Storage', desc: 'Save every client request safely' },
          { icon: Workflow, label: 'Business Logic', desc: 'Custom workflows for your service' },
        ],
      },
      {
        title: 'Management',
        items: [
          { icon: LayoutDashboard, label: 'Admin Panel', desc: 'See clients, orders, payments' },
          { icon: BarChart3, label: 'Performance View', desc: 'Track what is working' },
          { icon: ShieldCheck, label: 'Private Access', desc: 'Only you can manage the system' },
        ],
      },
      {
        title: 'Growth',
        items: [
          { icon: Search, label: 'SEO Tracking', desc: 'Understand how people find you' },
          { icon: Rocket, label: 'Launch Updates', desc: 'Improve sections over time' },
          { icon: Users, label: 'Client Journey', desc: 'Make visitors become clients' },
        ],
      },
    ],
  },
}

const navItems = [
  { label: 'Services', dropdown: true },
  { label: 'Process', dropdown: true },
  { label: 'Workflows', dropdown: true },
  { label: 'Pricing', dropdown: false },
  { label: 'Reviews', dropdown: false },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<keyof typeof menus | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const menuIndex =
    activeMenu === 'Services' ? 0 : activeMenu === 'Process' ? 1 : activeMenu === 'Workflows' ? 2 : 0

  return (
    <header
      onMouseLeave={() => {
        setActiveMenu(null)
        setHoveredItem(null)
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
  <Image
    src="/koryx-logo.png"
    alt="Koryx logo"
    width={160}
    height={40}
    className="h-auto w-[140px] object-contain"
    priority
  />
</Link>

          <nav className="hidden lg:flex items-center gap-1">
  {navItems.map((item) =>
    item.dropdown ? (
      <button
        key={item.label}
        onMouseEnter={() => {
          setHoveredItem(null)
          setActiveMenu(item.label as keyof typeof menus)
        }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
          activeMenu === item.label
            ? 'bg-white/[0.12] text-white'
            : 'text-white/65 hover:text-white'
        }`}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
    ) : (
      <Link
        key={item.label}
        href={item.label === 'Pricing' ? '/pricing' : '#testimonials'}
        className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-white/65 hover:text-white"
      >
        {item.label}
      </Link>
    )
  )}
</nav>
        </div>

        <div className="hidden lg:flex items-center gap-2">
  <Link
    href="/ai"
    className="flex h-8 items-center justify-center rounded-md border border-white/[0.16] bg-black px-3 text-[13px] font-medium text-white/80 hover:border-white/[0.28] hover:bg-white/[0.04] hover:text-white"
  >
    Ask AI
  </Link>

  <Link
    href="/login"
    className="flex h-8 items-center justify-center rounded-md border border-white/[0.16] bg-black px-3 text-[13px] font-medium text-white/80 hover:border-white/[0.28] hover:bg-white/[0.04] hover:text-white"
  >
    Log In
  </Link>

  <Link
    href="/register"
    className="flex h-8 items-center justify-center rounded-md bg-white px-3 text-[13px] font-medium text-black hover:bg-white/90"
  >
    Sign Up
  </Link>
</div>

        <button
  className="lg:hidden z-[1001] relative h-7 w-7"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
>
  <span
    className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] bg-white rounded-full transition-all duration-300 ${
      mobileOpen ? 'rotate-45' : '-translate-y-[6px] -translate-x-1/2'
    }`}
    style={{ transformOrigin: 'center' }}
  />
  <span
    className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] bg-white rounded-full transition-all duration-300 ${
      mobileOpen ? 'opacity-0' : '-translate-x-1/2'
    }`}
  />
  <span
    className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] bg-white rounded-full transition-all duration-300 ${
      mobileOpen ? '-rotate-45' : 'translate-y-[6px] -translate-x-1/2'
    }`}
    style={{ transformOrigin: 'center' }}
  />
</button>
      </div>

      {activeMenu && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          className="hidden lg:block absolute left-[180px] top-[58px] w-[760px] rounded-2xl border border-white/[0.1] bg-black/95 backdrop-blur-xl overflow-hidden"
        >
          <div className="relative w-full h-[340px] overflow-hidden">
            <motion.div
              className="flex h-full"
              initial={false}
              animate={{ x: `-${menuIndex * 100}%` }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => (
                <div key={menuKey} className="w-full h-full shrink-0 grid grid-cols-3 gap-8 px-6 py-6">
                  {menus[menuKey].columns.map((column) => (
                    <div key={column.title} className="min-w-0">
                      <p className="mb-4 text-[13px] text-white/40">{column.title}</p>
                      <div className="space-y-3">
                        {column.items.map((item) => {
                          const Icon = item.icon
                          const active = hoveredItem === item.label

                          return (
                            <Link
                              href={item.href || '#'}
                              key={item.label}
                              onMouseEnter={() => setHoveredItem(item.label)}
                              className="flex min-h-[50px] items-start gap-3"
                            >
                              <div
                                className={`mt-0.5 flex h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-75 ${
                                  active
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.02] text-white/55 border-white/[0.09]'
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                              </div>
                              <div className="min-w-0 pt-[1px]">
                                <p className="text-[14px] leading-5 font-medium text-white">{item.label}</p>
                                <p className="mt-0.5 text-[12px] leading-[17px] text-white/40">{item.desc}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-[999] bg-black text-white overflow-y-auto"
          >
            <div className="min-h-screen px-[23px] pt-[118px] pb-24">
              <div className="space-y-[12px] mb-[42px]">
  <Link
    href="/ai"
    onClick={() => setMobileOpen(false)}
    className="flex h-[48px] items-center justify-center rounded-[9px] border border-white/[0.16] text-[15px] font-semibold text-white/70"
  >
    Ask AI
  </Link>

  <Link
    href="/login"
    onClick={() => setMobileOpen(false)}
    className="flex h-[48px] items-center justify-center rounded-[9px] border border-white/[0.16] text-[15px] font-semibold text-white/70"
  >
    Log In
  </Link>

  <Link
    href="/register"
    onClick={() => setMobileOpen(false)}
    className="flex h-[48px] items-center justify-center rounded-[9px] bg-white text-[15px] font-semibold text-black"
  >
    Sign Up
  </Link>
</div>

              <div className="space-y-[24px]">
                {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => (
                  <div key={menuKey}>
                    <button
                      onClick={() => setActiveMenu(activeMenu === menuKey ? null : menuKey)}
                      className="flex w-full items-center justify-between text-[20px] font-normal leading-none text-white/55"
                    >
                      {menuKey}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeMenu === menuKey ? 'rotate-180' : '-rotate-90'
                        }`}
                        strokeWidth={1.8}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {activeMenu === menuKey && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 space-y-4">
                            {menus[menuKey].columns.flatMap((column) => column.items).map((item, index) => {
                              const Icon = item.icon

                              return (
                                <motion.a
                                  href="#"
                                  key={`${menuKey}-${item.label}`}
                                  onClick={() => setMobileOpen(false)}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.18, delay: index * 0.015 }}
                                  className="flex items-center gap-4 text-white/65"
                                >
                                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.7} />
                                  <span className="text-[15px] leading-none">{item.label}</span>
                                </motion.a>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <Link
  href="/pricing"
  onClick={() => setMobileOpen(false)}
  className="block text-[20px] leading-none text-white/55"
>
  Pricing
</Link>

                <a
                  href="#testimonials"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[20px] leading-none text-white/55"
                >
                  Reviews
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
