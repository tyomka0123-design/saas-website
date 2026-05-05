'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bell,
  CheckCircle2,
  FileText,
  FolderOpen,
  Grid2X2,
  Inbox,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/app/(auth)/actions'

interface SidebarProps {
  isAdmin?: boolean
  userName?: string
  userEmail?: string
  role?: string
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Grid2X2 },
  { href: '/dashboard/orders', label: 'Projects', icon: FolderOpen },
  { href: '/dashboard/new-order', label: 'New Order', icon: Plus },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/files', label: 'Files', icon: FileText },
  { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

const initialNotifications = [
  {
    id: 1,
    title: 'Project request received',
    description: 'Your website order was created successfully.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Design review pending',
    description: 'Apex Studio will review your project details soon.',
    time: '12m ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Client dashboard is ready',
    description: 'You can now track projects, files, and updates here.',
    time: '1h ago',
    unread: false,
  },
]

export function Sidebar({ isAdmin, userName, userEmail, role }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  )

  function archiveNotification(id: number) {
    setNotifications((current) => current.filter((item) => item.id !== id))
  }

  function archiveAll() {
    setNotifications([])
  }

  const SidebarContent = () => (
    <>
      <div className="flex h-14 items-center border-b border-white/[0.08] px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            Apex Studio
          </span>
        </Link>
      </div>

      <div className="border-b border-white/[0.08] p-3">
        <div className="flex h-9 items-center gap-2 rounded-md border border-white/[0.1] bg-white/[0.03] px-2.5 text-white/40">
          <Search className="h-4 w-4" />
          <span className="text-sm">Find...</span>
          <span className="ml-auto rounded border border-white/[0.12] px-1.5 py-0.5 text-xs text-white/45">
            F
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex h-9 items-center gap-3 rounded-md px-3 text-[14px] font-medium transition-colors',
                  isActive
                    ? 'bg-white/[0.11] text-white'
                    : 'text-white/58 hover:bg-white/[0.07] hover:text-white'
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          {isAdmin === true && (
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex h-9 items-center gap-3 rounded-md px-3 text-[14px] font-medium transition-colors',
                pathname.startsWith('/dashboard/admin')
                  ? 'bg-white/[0.11] text-white'
                  : 'text-white/58 hover:bg-white/[0.07] hover:text-white'
              )}
            >
              <Shield className="h-4.5 w-4.5 shrink-0" />
              <span>Admin Panel</span>
            </Link>
          )}
        </div>
      </nav>

      <div className="border-t border-white/[0.08] p-2">
        <div className="relative flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-2 transition hover:bg-white/[0.06]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.11] text-sm font-semibold text-white">
              {(userName || userEmail || 'U').charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-4 text-white">
                {userName || 'User'}
              </p>
              <p className="truncate text-xs leading-4 text-white/42">
                {role || 'Client'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/50 transition hover:bg-white/[0.07] hover:text-white"
            aria-label="Account menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-white/50 transition hover:bg-white/[0.07] hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute bottom-11 left-0 z-50 w-[408px] overflow-hidden rounded-lg border border-white/[0.12] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
              <div className="flex h-11 items-center border-b border-white/[0.08]">
                <button className="h-full border-b border-blue-500 px-4 text-sm font-medium text-white">
                  Inbox
                  {unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-white/[0.12] px-1.5 py-0.5 text-xs text-white/70">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <button className="h-full px-4 text-sm text-white/45 transition hover:text-white">
                  Archive
                </button>

                <button className="h-full px-4 text-sm text-white/45 transition hover:text-white">
                  Comments
                </button>

                <button className="ml-auto mr-2 flex h-8 w-8 items-center justify-center rounded-md text-white/45 transition hover:bg-white/[0.07] hover:text-white">
                  <Settings className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-3 border-b border-white/[0.08] px-4 py-4 transition hover:bg-white/[0.055]"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400">
                        <Inbox className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium leading-5 text-white">
                              {item.title}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-white/50">
                              {item.description}
                            </p>
                            <p className="mt-1 text-xs text-white/35">{item.time}</p>
                          </div>

                          {item.unread && (
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                          )}

                          <button
                            type="button"
                            onClick={() => archiveNotification(item.id)}
                            className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/40 transition hover:bg-white/[0.08] hover:text-white group-hover:flex"
                            aria-label="Archive notification"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm font-medium text-white">No notifications</p>
                    <p className="mt-1 text-sm text-white/45">Everything is archived.</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={archiveAll}
                className="flex h-10 w-full items-center justify-center border-t border-white/[0.08] text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                Archive All
              </button>
            </div>
          )}
        </div>

        <form action={logout} className="mt-1">
          <button
            type="submit"
            className="flex h-9 w-full items-center gap-3 rounded-md px-3 text-[14px] font-medium text-white/50 transition hover:bg-white/[0.07] hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </form>
      </div>
    </>
  )

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/[0.08] bg-black px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="text-[15px] font-semibold text-white">Apex Studio</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-white/60 hover:bg-white/[0.07] hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed bottom-0 left-0 top-14 z-50 flex w-[292px] flex-col border-r border-white/[0.08] bg-black transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      <aside className="fixed bottom-0 left-0 top-0 hidden w-[292px] flex-col border-r border-white/[0.08] bg-black lg:flex">
        <SidebarContent />
      </aside>
    </>
  )
}
