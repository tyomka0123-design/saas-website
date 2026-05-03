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
import { motion } from 'framer-motion'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 border-b border-white/[0.07]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Triangle className="w-5 h-5 fill-white text-white" />
            <span className="font-semibold text-white text-[15px]">Apex Studio</span>
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
                <a
                  key={item.label}
                  className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-white/65 hover:text-white"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-white/70 text-[13px]">Log In</span>
          <button className="bg-white text-black px-4 py-1.5 rounded-md text-[13px] font-medium">
            Start Project
          </button>
        </div>

        <button className="lg:hidden z-[1001] text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
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
              transition={{ duration: 0.14, ease: [0.25, 1, 0.5, 1] }}
            >
              {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => (
                <div
                  key={menuKey}
                  className="w-full h-full shrink-0 grid grid-cols-3 gap-8 px-6 py-6"
                >
                  {menus[menuKey].columns.map((column) => (
                    <div key={column.title} className="min-w-0">
                      <p className="mb-4 text-[13px] text-white/40">{column.title}</p>

                      <div className="space-y-3">
                        {column.items.map((item) => {
                          const Icon = item.icon
                          const active = hoveredItem === item.label

                          return (
                            <a
                              href="#"
                              key={item.label}
                              onMouseEnter={() => setHoveredItem(item.label)}
                              className="flex min-h-[50px] items-start gap-3"
                            >
                              <div
                                className={`mt-0.5 flex h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
                                  active
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.02] text-white/55 border-white/[0.09]'
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                              </div>

                              <div className="min-w-0 pt-[1px]">
                                <p className="text-[14px] leading-5 font-medium text-white">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 text-[12px] leading-[17px] text-white/40">
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
        </motion.div>
      )}
      
      {mobileOpen && (
  <div className="lg:hidden fixed inset-0 z-[999] bg-black text-white overflow-y-auto">
    <div className="min-h-screen px-6 pt-[140px] pb-28">
      <button
        onClick={() => setMobileOpen(false)}
        className="fixed right-6 top-[92px] z-[1000] flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.14] bg-black text-white/80"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="space-y-3 mb-12">
        <Link
          href="/register"
          onClick={() => setMobileOpen(false)}
          className="flex h-14 items-center justify-center rounded-lg bg-white text-[17px] font-semibold text-black"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          onClick={() => setMobileOpen(false)}
          className="flex h-14 items-center justify-center rounded-lg border border-white/[0.16] text-[17px] font-semibold text-white/80"
        >
          Log In
        </Link>
      </div>

      <div className="space-y-1">
        {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => (
          <div key={menuKey}>
            <button
              onClick={() => setActiveMenu(activeMenu === menuKey ? null : menuKey)}
              className="flex w-full items-center justify-between py-4 text-[28px] font-normal text-white/55"
            >
              {menuKey}
              <ChevronDown
                className={`h-6 w-6 transition-transform ${
                  activeMenu === menuKey ? 'rotate-180' : '-rotate-90'
                }`}
              />
            </button>

            {activeMenu === menuKey && (
              <div className="pb-5">
                {menus[menuKey].columns.flatMap((column) => column.items).map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      href="#"
                      key={`${menuKey}-${item.label}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 py-4 text-white/70"
                    >
                      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.8} />
                      <span className="text-[25px] leading-none">{item.label}</span>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        <a href="#pricing" className="block py-4 text-[28px] text-white/55">
          Pricing
        </a>

        <a href="#testimonials" className="block py-4 text-[28px] text-white/55">
          Reviews
        </a>
      </div>

      <div className="mt-10 border-t border-white/[0.12] pt-6">
        <div className="flex items-center justify-between">
          <span className="text-[24px] text-white/55">Theme</span>
          <div className="rounded-full border border-white/[0.14] px-4 py-2 text-white/50">
            ◐
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </header>
  )
}
