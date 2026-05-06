'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronRight, Store, CalendarCheck, LayoutDashboard, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

const sidebarItems = [
  {
    title: 'Web Services',
    items: [
      { label: 'Business Websites', href: '/services/business-websites', icon: Store },
      { label: 'Appointment Booking', href: '/services/appointment-booking', icon: CalendarCheck },
      { label: 'Client Dashboards', href: '/services/client-dashboards', icon: LayoutDashboard },
      { label: 'SEO & Speed', href: '/services/seo-speed', icon: Search },
    ],
  },
]

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.08] bg-black">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/koryx-logo.png"
                alt="Koryx logo"
                width={160}
                height={40}
                className="h-auto w-[120px] object-contain"
                priority
              />
            </Link>
            <ChevronRight className="h-4 w-4 text-white/30" />
            <span className="text-sm text-white/60">Services</span>
          </div>
          
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block fixed left-0 top-14 bottom-0 w-[280px] border-r border-white/[0.08] overflow-y-auto">
          <nav className="p-6">
            {sidebarItems.map((section) => (
              <div key={section.title} className="mb-8">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? 'bg-white/[0.08] text-white'
                              : 'text-white/60 hover:bg-white/[0.04] hover:text-white'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-14 z-40 bg-black">
            <nav className="p-6">
              {sidebarItems.map((section) => (
                <div key={section.title} className="mb-8">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive
                                ? 'bg-white/[0.08] text-white'
                                : 'text-white/60 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-[280px]">
          {children}
        </main>
      </div>
    </div>
  )
}
