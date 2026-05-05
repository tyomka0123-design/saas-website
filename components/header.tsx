'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Reviews' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-black">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-black">
              <span className="text-sm font-bold">A</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Apex Studio
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {showAuthButtons && (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="flex h-8 items-center justify-center rounded-md px-3 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="flex h-8 items-center justify-center rounded-md bg-white px-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="rounded-md p-2 text-white/70 transition hover:bg-white/[0.06] hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.08] bg-black md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-white/60 hover:bg-white/[0.06] hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {showAuthButtons && (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-4">
                  <Link
                    href="/login"
                    className="flex h-9 items-center justify-center rounded-md border border-white/[0.12] text-sm text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>

                  <Link
                    href="/register"
                    className="flex h-9 items-center justify-center rounded-md bg-white text-sm font-medium text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
