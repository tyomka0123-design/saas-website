'use client'

import { useEffect, useState } from 'react'
import { AskAIPanel } from './ask-ai-panel'
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
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

// Featured items for Services with brand colors
const featuredServices = [
  { label: 'Next.js', desc: 'React framework for production', color: 'bg-white', textColor: 'text-black', icon: '▲' },
  { label: 'Tailwind', desc: 'Utility-first CSS framework', color: 'bg-[#06B6D4]', textColor: 'text-white', icon: '◆' },
  { label: 'Vercel', desc: 'Deploy with zero config', color: 'bg-gradient-to-br from-violet-500 to-pink-500', textColor: 'text-white', icon: '▲' },
  { label: 'TypeScript', desc: 'JavaScript with types', color: 'bg-[#3178C6]', textColor: 'text-white', icon: 'TS' },
]

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
        title: 'Development',
        items: [
          { icon: Code2, label: 'Custom Code', desc: 'No templates, handcrafted builds' },
          { icon: Database, label: 'Backend Systems', desc: 'APIs, databases, server logic' },
          { icon: Globe, label: 'Domain & Hosting', desc: 'Deploy and connect your domain' },
        ],
      },
      {
        title: 'Solutions',
        items: [
          { icon: Users, label: 'Small Business', desc: 'Perfect for local services' },
          { icon: Rocket, label: 'Startup Launch', desc: 'MVP to market in weeks' },
          { icon: Sparkles, label: 'Premium Design', desc: 'Stand out from competitors' },
        ],
      },
    ],
    featured: featuredServices,
  },
  Process: {
    columns: [
      {
        title: 'Project Stages',
        items: [
          { icon: FileText, label: 'Brief & Strategy', desc: 'Define goals and requirements' },
          { icon: Sparkles, label: 'UI/UX Design', desc: 'Wireframes and visual mockups' },
          { icon: Code2, label: 'Build & Code', desc: 'Development with modern stack' },
          { icon: Rocket, label: 'Deploy & Go Live', desc: 'Launch your website online' },
        ],
      },
      {
        title: 'Deliverables',
        items: [
          { icon: Globe, label: 'Live Website', desc: 'Fully functional production site' },
          { icon: LayoutDashboard, label: 'Admin Access', desc: 'Manage content yourself' },
          { icon: FileText, label: 'Documentation', desc: 'How to use your website' },
        ],
      },
      {
        title: 'Support',
        items: [
          { icon: Mail, label: 'Direct Contact', desc: 'Quick responses via email' },
          { icon: Zap, label: 'Fast Fixes', desc: 'Bug fixes within 24 hours' },
          { icon: ShieldCheck, label: 'Maintenance', desc: 'Keep your site up to date' },
        ],
      },
    ],
  },
  Workflows: {
    columns: [
      {
        title: 'Client Tools',
        items: [
          { icon: CalendarCheck, label: 'Online Booking', desc: 'Clients schedule appointments' },
          { icon: FileText, label: 'Contact Forms', desc: 'Capture leads and inquiries' },
          { icon: Users, label: 'Client Portal', desc: 'Private area for customers' },
        ],
      },
      {
        title: 'Business Tools',
        items: [
          { icon: LayoutDashboard, label: 'Dashboard', desc: 'Overview of your business' },
          { icon: Database, label: 'Data Management', desc: 'Orders, clients, inventory' },
          { icon: BarChart3, label: 'Reports', desc: 'Insights and analytics' },
        ],
      },
      {
        title: 'Automation',
        items: [
          { icon: Mail, label: 'Email Alerts', desc: 'Get notified of new requests' },
          { icon: Workflow, label: 'Auto-responses', desc: 'Instant client confirmations' },
          { icon: Zap, label: 'Integrations', desc: 'Connect third-party tools' },
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
  const [askAIOpen, setAskAIOpen] = useState(false)
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
  <button
  type="button"
  onClick={() => setAskAIOpen(true)}
  className="flex h-8 items-center justify-center rounded-md border border-white/[0.16] bg-black px-3 text-[13px] font-medium text-white/80 hover:border-white/[0.28] hover:bg-white/[0.04] hover:text-white"
>
  Ask AI
</button>

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
          className="hidden lg:block absolute left-[180px] top-[58px] w-[860px] rounded-2xl border border-white/[0.1] bg-black/95 backdrop-blur-xl overflow-hidden"
        >
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${menuIndex * 100}%` }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {(['Services', 'Process', 'Workflows'] as const).map((menuKey) => {
                const menu = menus[menuKey]
                const hasFeatured = 'featured' in menu && menu.featured
                
                return (
                  <div key={menuKey} className="w-full shrink-0">
                    <div className="grid grid-cols-3 gap-8 px-6 py-6">
                      {menu.columns.map((column) => (
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
                    
                    {/* Featured tech stack cards for Services */}
                    {hasFeatured && (
                      <div className="border-t border-white/[0.08] px-6 py-4">
                        <p className="mb-3 text-[13px] text-white/40">Built With</p>
                        <div className="grid grid-cols-4 gap-3">
                          {menu.featured.map((tech) => (
                            <div
                              key={tech.label}
                              className="group flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04]"
                            >
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${tech.color} ${tech.textColor} text-xs font-bold`}
                              >
                                {tech.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-white">{tech.label}</p>
                                <p className="truncate text-[11px] text-white/40">{tech.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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
  <button
  type="button"
  onClick={() => {
    setMobileOpen(false)
    setAskAIOpen(true)
  }}
  className="flex h-[48px] w-full items-center justify-center rounded-[9px] border border-white/[0.16] text-[15px] font-semibold text-white/70"
>
  Ask AI
</button>

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
                                <motion.div
  key={`${menuKey}-${item.label}`}
  initial={{ opacity: 0, x: -8 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.18, delay: index * 0.015 }}
>
  <Link
    href={item.href || '#'}
    onClick={() => setMobileOpen(false)}
    className="flex items-center gap-4 text-white/65"
  >
    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.7} />
    <span className="text-[15px] leading-none">{item.label}</span>
  </Link>
</motion.div>
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
      <AskAIPanel open={askAIOpen} onClose={() => setAskAIOpen(false)} />
    </header>
  )
}
