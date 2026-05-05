'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { ROLE_COLORS, UserRole } from '@/lib/types'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
  { href: '/dashboard/orders', label: 'My Orders', icon: <ShoppingCart className="h-[18px] w-[18px]" /> },
  { href: '/dashboard/new-order', label: 'New Order', icon: <PlusCircle className="h-[18px] w-[18px]" /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-[18px] w-[18px]" /> },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: <Shield className="h-[18px] w-[18px]" />, adminOnly: true },
]

function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <motion.span 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}
    >
      {role === 'founder' && <Sparkles className="h-2.5 w-2.5" />}
      {role}
    </motion.span>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout, canAccessAdmin } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && !canAccessAdmin()) return false
    return true
  })

  const SidebarContent = () => (
    <>
      {/* Logo & Brand */}
      <div className="p-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative h-9 w-9 rounded-[10px] bg-white flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 76 65" className="h-4 w-4 text-black" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-[15px] tracking-tight">Apex Studio</span>
            <span className="text-white/40 text-[11px]">Client Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">Menu</span>
        </div>
        
        {filteredNavItems.map((item, index) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="relative block"
              >
                <motion.div
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator bar */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className={`transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  
                  {/* Admin badge */}
                  {item.adminOnly && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 font-semibold border border-purple-500/20">
                      ADMIN
                    </span>
                  )}
                  
                  {/* New order highlight */}
                  {item.href === '/dashboard/new-order' && !isActive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="relative">
          <motion.button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-[10px] 
              transition-all duration-200
              ${isProfileOpen ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}
            `}
            whileTap={{ scale: 0.98 }}
          >
            {/* Avatar */}
            <div className="relative h-10 w-10 rounded-[10px] overflow-hidden bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/10 flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white/50" />
                </div>
              )}
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-black" />
            </div>
            
            <div className="flex-1 text-left min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{user?.name || 'Guest'}</p>
              <div className="mt-0.5">
                <RoleBadge role={user?.role || 'user'} />
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isProfileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-white/30" />
            </motion.div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute bottom-full left-0 right-0 mb-2 p-1.5 rounded-[12px] bg-[#151515] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <p className="text-[11px] text-white/30 truncate">{user?.email}</p>
                </div>
                
                <Link
                  href="/dashboard/settings"
                  onClick={() => {
                    setIsProfileOpen(false)
                    setIsMobileOpen(false)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.05] rounded-[8px] transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Link>
                
                <button
                  onClick={() => {
                    logout()
                    setIsProfileOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[8px] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-[10px] bg-black/90 border border-white/10 text-white backdrop-blur-sm md:hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-5 w-5" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col md:hidden"
          >
            <motion.button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-[260px] bg-[#0a0a0a] border-r border-white/[0.06] flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
