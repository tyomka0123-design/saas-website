'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/dashboard/orders', label: 'My Orders', icon: <ShoppingCart className="h-4 w-4" /> },
  { href: '/dashboard/new-order', label: 'New Order', icon: <PlusCircle className="h-4 w-4" /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  { href: '/dashboard/admin', label: 'Admin Panel', icon: <Shield className="h-4 w-4" />, adminOnly: true },
]

function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${colors.bg} ${colors.text}`}>
      {role}
    </span>
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
      {/* Logo */}
      <div className="h-14 px-4 flex items-center border-b border-neutral-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-6 w-6 bg-white rounded flex items-center justify-center">
            <svg viewBox="0 0 76 65" className="h-3 w-3 text-black" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Apex Studio</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors
                ${isActive 
                  ? 'bg-neutral-800 text-white' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }
              `}
            >
              <span className={isActive ? 'text-white' : 'text-neutral-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.adminOnly && (
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-medium">
                  ADMIN
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-2 border-t border-neutral-800">
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`
              w-full flex items-center gap-2.5 p-2 rounded-md text-left transition-colors
              ${isProfileOpen ? 'bg-neutral-800' : 'hover:bg-neutral-800/50'}
            `}
          >
            <div className="h-8 w-8 rounded-md bg-neutral-800 flex items-center justify-center flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full rounded-md object-cover" />
              ) : (
                <UserIcon className="h-4 w-4 text-neutral-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{user?.name || 'Guest'}</p>
              <RoleBadge role={user?.role || 'user'} />
            </div>
            
            <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 p-1 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl">
              <div className="px-2.5 py-1.5 border-b border-neutral-800 mb-1">
                <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
              </div>
              
              <Link
                href="/dashboard/settings"
                onClick={() => {
                  setIsProfileOpen(false)
                  setIsMobileOpen(false)
                }}
                className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Link>
              
              <button
                onClick={() => {
                  logout()
                  setIsProfileOpen(false)
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-3 left-3 z-50 p-2 rounded-md bg-neutral-900 border border-neutral-800 text-white md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col md:hidden">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-3 right-3 p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarContent />
        </aside>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-56 bg-neutral-950 border-r border-neutral-800 flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
