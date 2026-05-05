'use client'

import { motion } from 'framer-motion'
import { User, Mail, Calendar, Shield, Bell, Palette, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ROLE_COLORS, UserRole } from '@/lib/types'

function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
      {role === 'founder' && <Sparkles className="h-3 w-3" />}
      {role}
    </span>
  )
}

function SettingsCard({ 
  title, 
  description, 
  icon: Icon, 
  children,
  delay 
}: { 
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="p-3 rounded-xl bg-white/[0.05]">
          <Icon className="h-5 w-5 text-white/70" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-white/40 mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default function SettingsPage() {
  const { user, orders } = useAuth()

  const userOrders = orders.filter(o => o.userId === user?.id)

  return (
    <div className="p-6 md:p-8 max-w-3xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <SettingsCard
        title="Profile Information"
        description="Your personal information associated with this account"
        icon={User}
        delay={0.1}
      >
        <div className="space-y-5">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-gradient-to-br from-white/20 to-white/5 ring-2 ring-white/10">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-white/50">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user?.name || 'User'}</h3>
              <RoleBadge role={user?.role || 'user'} />
            </div>
          </div>
          
          {/* Info Fields */}
          <div className="grid gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Full Name</label>
              <div className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center text-white/70">
                {user?.name || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email Address</label>
              <div className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center text-white/70">
                {user?.email || 'Not set'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <Calendar className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-xs text-white/40">Member since</p>
              <p className="text-sm font-medium text-white">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown'}
              </p>
            </div>
          </div>

          <p className="text-sm text-white/40">
            To update your profile information, please contact our support team.
          </p>
        </div>
      </SettingsCard>

      {/* Account Stats */}
      <SettingsCard
        title="Account Statistics"
        description="Your activity on the platform"
        icon={Shield}
        delay={0.2}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
            <p className="text-2xl font-bold text-white">{userOrders.length}</p>
            <p className="text-xs text-white/40 mt-1">Total Orders</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
            <p className="text-2xl font-bold text-green-400">{userOrders.filter(o => o.status === 'completed').length}</p>
            <p className="text-xs text-white/40 mt-1">Completed</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center">
            <p className="text-2xl font-bold text-purple-400">{userOrders.filter(o => o.status === 'in_progress').length}</p>
            <p className="text-xs text-white/40 mt-1">In Progress</p>
          </div>
        </div>
      </SettingsCard>

      {/* Account Status */}
      <SettingsCard
        title="Account Status"
        description="Your account health and status"
        icon={Mail}
        delay={0.3}
      >
        <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div>
            <p className="font-medium text-green-400">Active Account</p>
            <p className="text-sm text-white/40">Your account is in good standing</p>
          </div>
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
          </div>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard
        title="Notifications"
        description="Manage how you receive notifications"
        icon={Bell}
        delay={0.4}
      >
        <div className="space-y-3">
          {[
            { label: 'Order Updates', description: 'Get notified when your order status changes', enabled: true },
            { label: 'Email Notifications', description: 'Receive important updates via email', enabled: true },
            { label: 'Marketing Emails', description: 'Receive news about new features and offers', enabled: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-white/40">{item.description}</p>
              </div>
              <button
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  item.enabled ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    item.enabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 rounded-xl bg-red-500/10">
            <Palette className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
            <p className="text-sm text-white/40 mt-0.5">Irreversible actions for your account</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <div>
            <p className="font-medium text-white">Delete Account</p>
            <p className="text-sm text-white/40">
              Permanently delete your account and all associated data
            </p>
          </div>
          <button
            disabled
            className="px-5 py-2.5 rounded-xl bg-red-500/20 text-red-400 font-medium text-sm opacity-50 cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  )
}
