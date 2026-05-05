'use client'

import { User, Mail, Calendar, Shield } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ROLE_COLORS, UserRole } from '@/lib/types'

function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${colors.bg} ${colors.text}`}>
      {role}
    </span>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-neutral-900 border border-neutral-800">
      <div className="px-5 py-4 border-b border-neutral-800">
        <h2 className="text-sm font-medium text-white">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const { user, orders } = useAuth()
  const userOrders = orders.filter(o => o.userId === user?.id)

  return (
    <div className="p-6 max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage your account</p>
      </div>

      {/* Profile */}
      <Section title="Profile">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-14 w-14 rounded-lg bg-neutral-800 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full rounded-lg object-cover" />
            ) : (
              <User className="h-6 w-6 text-neutral-400" />
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-white">{user?.name || 'User'}</h3>
            <RoleBadge role={user?.role || 'user'} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-neutral-500 mb-1.5 block">Name</label>
            <div className="h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 flex items-center text-sm text-neutral-300">
              {user?.name || 'Not set'}
            </div>
          </div>
          
          <div>
            <label className="text-xs text-neutral-500 mb-1.5 block">Email</label>
            <div className="h-10 px-3 rounded-md bg-neutral-800 border border-neutral-700 flex items-center text-sm text-neutral-300">
              {user?.email || 'Not set'}
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 text-xs text-neutral-500">
            <Calendar className="w-3.5 h-3.5" />
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }) : 'Unknown'}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section title="Statistics">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-md bg-neutral-800 text-center">
            <p className="text-xl font-semibold text-white">{userOrders.length}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Total</p>
          </div>
          <div className="p-3 rounded-md bg-neutral-800 text-center">
            <p className="text-xl font-semibold text-green-400">{userOrders.filter(o => o.status === 'completed').length}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Completed</p>
          </div>
          <div className="p-3 rounded-md bg-neutral-800 text-center">
            <p className="text-xl font-semibold text-blue-400">{userOrders.filter(o => o.status === 'in_progress').length}</p>
            <p className="text-xs text-neutral-500 mt-0.5">In Progress</p>
          </div>
        </div>
      </Section>

      {/* Account Status */}
      <Section title="Account Status">
        <div className="flex items-center justify-between p-3 rounded-md bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-400">Active</p>
              <p className="text-xs text-neutral-500">Account in good standing</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <div className="space-y-2">
          {[
            { label: 'Order Updates', enabled: true },
            { label: 'Email Notifications', enabled: true },
            { label: 'Marketing Emails', enabled: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm text-neutral-300">{item.label}</span>
              <button
                className={`relative w-9 h-5 rounded-full transition-colors ${item.enabled ? 'bg-blue-500' : 'bg-neutral-700'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? 'left-4' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
