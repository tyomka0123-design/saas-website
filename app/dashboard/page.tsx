'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Activity,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG } from '@/lib/types'

// Animated counter component
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value}{suffix}
    </motion.span>
  )
}

// Stats card with glow effect
function StatsCard({ 
  label, 
  value, 
  change,
  icon: Icon, 
  color,
  delay 
}: { 
  label: string
  value: number | string
  change?: string
  icon: React.ElementType
  color: string
  delay: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
      <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          {change && (
            <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" />
              {change}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-white">
            <AnimatedNumber value={typeof value === 'number' ? value : 0} />
            {typeof value === 'string' && value}
          </p>
          <p className="text-sm text-white/50">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Activity chart component (simplified visual)
function ActivityChart() {
  const data = [35, 50, 45, 70, 55, 80, 65, 90, 75, 95, 85, 100]
  const maxValue = Math.max(...data)
  
  return (
    <div className="flex items-end gap-1.5 h-24">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500/50 to-blue-400/80 hover:from-blue-500 hover:to-blue-400 transition-colors cursor-pointer"
        />
      ))}
    </div>
  )
}

// Order status badge
function StatusBadge({ status }: { status: keyof typeof ORDER_STATUS_CONFIG }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  )
}

// Quick action button
function QuickAction({ href, icon: Icon, label, description }: {
  href: string
  icon: React.ElementType
  label: string
  description: string
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.1] transition-colors">
            <Icon className="h-5 w-5 text-white/70" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-white/40">{description}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
        </div>
      </motion.div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user, orders } = useAuth()

  // Calculate stats
  const userOrders = orders.filter(o => o.userId === user?.id)
  const totalOrders = userOrders.length
  const pendingOrders = userOrders.filter(o => o.status === 'pending' || o.status === 'reviewing').length
  const inProgressOrders = userOrders.filter(o => o.status === 'in_progress').length
  const completedOrders = userOrders.filter(o => o.status === 'completed').length
  
  const recentOrders = userOrders.slice(0, 5)

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: ShoppingCart, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'In Progress', value: inProgressOrders, icon: Clock, color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Review', value: pendingOrders, icon: Zap, color: 'from-orange-500 to-orange-600' },
    { label: 'Completed', value: completedOrders, icon: CheckCircle2, color: 'from-green-500 to-green-600', change: '+8%' },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-white/50 mt-1">
            Here&apos;s what&apos;s happening with your projects
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/dashboard/new-order">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Order
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.label} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Activity Overview</h2>
              <p className="text-sm text-white/40">Your project activity this month</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">Last 30 days</span>
              <Activity className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <ActivityChart />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold text-white">{totalOrders}</p>
                <p className="text-xs text-white/40">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{completedOrders}</p>
                <p className="text-xs text-white/40">Completed</p>
              </div>
            </div>
            <Link 
              href="/dashboard/orders"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <QuickAction 
              href="/dashboard/new-order" 
              icon={Plus} 
              label="Create New Order"
              description="Start a new project"
            />
            <QuickAction 
              href="/dashboard/orders" 
              icon={ShoppingCart} 
              label="View All Orders"
              description="Manage your projects"
            />
            <QuickAction 
              href="/dashboard/settings" 
              icon={Calendar} 
              label="Schedule Meeting"
              description="Book a consultation"
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link 
            href="/dashboard/orders"
            className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <Link href={`/dashboard/orders/${order.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                          {order.title}
                        </h3>
                        <p className="text-xs text-white/40">
                          {order.websiteType} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="font-medium text-white mb-2">No orders yet</h3>
            <p className="text-sm text-white/40 mb-6">
              Start your first project with us today
            </p>
            <Link href="/dashboard/new-order">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium text-sm"
              >
                <Plus className="h-4 w-4" />
                Create Order
              </motion.button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
