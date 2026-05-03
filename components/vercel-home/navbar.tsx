'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Triangle, X } from 'lucide-react'

const navItems = [
  { label: 'Services', hasDropdown: true, href: '#services' },
  { label: 'Process', hasDropdown: true, href: '#process' },
  { label: 'Workflows', hasDropdown: true, href: '#workflow' },
  { label: 'Pricing', hasDropdown: false, href: '#pricing' },
  { label: 'Reviews', hasDropdown: false, href: '#testimonials' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
              </a>
            ))}
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
              {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
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
