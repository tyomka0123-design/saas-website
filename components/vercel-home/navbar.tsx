'use client'

import { useEffect, useState } from 'react'
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
  Menu,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Triangle,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const menus = {
  Services: {
    columns: [
      {
        title: 'Web Services',
        items: [
          { icon: Store, label: 'Business Websites', desc: 'Premium websites for local brands' },
          { icon: CalendarCheck, label: 'Appointment Booking', desc: 'Let clients book online 24/7' },
          { icon: LayoutDashboard, label: 'Client Dashboards', desc: 'Private portals for customers' },
          { icon: Search, label: 'SEO & Speed', desc: 'Fast pages built to rank better' },
          { icon: Mail, label: 'Lead Capture', desc: 'Forms, emails, and client requests' },
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
    ],
  },
}

const navItems = [
  { label: 'Services', href: '#services', dropdown: true },
  { label: 'Process', href: '#process', dropdown: true },
  { label: 'Workflows', href: '#workflow', dropdown: true },
  { label: 'Pricing', href: '#pricing', dropdown: false },
  { label: 'Reviews', href: '#testimonials', dropdown: false },
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

  return (
    <header
      onMouseLeave={() => {
        setActiveMenu(null)
        setHoveredItem(null)
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 vercel-nav-blur ${
        scrolled ? 'bg-black/80 border-b border-white/[0.07]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Triangle className="w-5 h-5 fill-white text-white" />
            <span className="font-semibold text-white text-[15px]">Apex Studio</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <button
                  key={item.label}
                  onMouseEnter={() => setActiveMenu(item.label as keyof typeof menus)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 ${
                    activeMenu === item.label
                      ? 'bg-white/[0.12] text-white'
                      : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3 h-3 opacity-60 transition-transform ${
                      activeMenu === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1.5 rounded-full text-[13px] font-medium text-white/65 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-[13px] font-medium text-white/70 hover:text-white transition-colors px-3 py-1.5">
            Log In
          </Link>
          <Link href="/register" className="vercel-btn-white text-[13px] py-1.5 px-4 rounded-md">
            Start Project
          </Link>
        </div>

        <button
          className="lg:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {activeMenu && (
  <div className="hidden lg:block absolute left-1/2 top-[58px] w-[768px] -translate-x-1/2 rounded-2xl border border-white/[0.10] bg-black/95 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden">

    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex w-full"
        animate={{
          x:
            activeMenu === 'Services'
              ? '0%'
              : activeMenu === 'Process'
              ? '-100%'
              : '-200%',
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => (
          <div
            key={menuKey}
            className="w-full shrink-0 p-5 grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${menus[menuKey].columns.length}, minmax(0, 1fr))`,
            }}
          >
            {menus[menuKey].columns.map((column) => (
              <div key={column.title}>
                <p className="mb-3 px-2 text-[13px] text-white/40">
                  {column.title}
                </p>

                <div className="space-y-1">
                  {column.items.map((item) => {
                    const Icon = item.icon
                    const active = hoveredItem === item.label

                    return (
                      <a
                        href="#"
                        key={item.label}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        className="group flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.055]"
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
                            active
                              ? 'bg-white text-black border-white'
                              : 'bg-white/[0.03] text-white/55 border-white/[0.08] group-hover:text-white group-hover:border-white/20'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-[14px] font-medium text-white">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-[12px] leading-snug text-white/42">
                            {item.desc}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)}
      </AnimatePresence>

      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/[0.07] px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
              {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
            </a>
          ))}
          <div className="pt-3 flex gap-3 border-t border-white/[0.07] mt-3">
            <Link href="/login" className="flex-1 text-center text-[13px] font-medium text-white/70 hover:text-white py-2 transition-colors">
              Log In
            </Link>
            <Link href="/register" className="flex-1 vercel-btn-white text-[13px] py-2 text-center justify-center">
              Start Project
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
