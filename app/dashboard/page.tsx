'use client'

import Link from 'next/link'
import { 
  Plus, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ArrowUpRight,
  Activity,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG } from '@/lib/types'

function StatsCard({ 
  label, 
  value, 
  change,
  icon: Icon, 
}: { 
  label: string
  value: number | string
  change?: string
  icon: React.ElementType
}) {
  return (
    <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-md bg-neutral-800">
          <Icon className="h-4 w-4 text-neutral-400" />
        </div>
        {change && (
          <span className="text-xs text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-sm text-neutral-500 mt-1">{label}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: keyof typeof ORDER_STATUS_CONFIG }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

export default function DashboardPage() {
  const { user, orders } = useAuth()

  const userOrders = orders.filter(o => o.userId === user?.id)
  const totalOrders = userOrders.length
  const pendingOrders = userOrders.filter(o => o.status === 'pending' || o.status === 'reviewing').length
  const inProgressOrders = userOrders.filter(o => o.status === 'in_progress').length
  const completedOrders = userOrders.filter(o => o.status === 'completed').length
  
  const recentOrders = userOrders.slice(0, 5)

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Here&apos;s what&apos;s happening with your projects
          </p>
        </div>
        
        <Link href="/dashboard/new-order">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
            <Plus className="h-4 w-4" />
            New Order
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Orders" value={totalOrders} icon={ShoppingCart} change="+12%" />
        <StatsCard label="In Progress" value={inProgressOrders} icon={Clock} />
        <StatsCard label="Pending" value={pendingOrders} icon={Activity} />
        <StatsCard label="Completed" value={completedOrders} icon={CheckCircle2} change="+8%" />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-lg bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
            <h2 className="text-sm font-medium text-white">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 transition-colors">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="divide-y divide-neutral-800">
              {recentOrders.map((order) => (
                <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                  <div className="flex items-center justify-between px-5 py-3.5 hover:bg-neutral-800/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-neutral-800 flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-neutral-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{order.title}</p>
                        <p className="text-xs text-neutral-500">
                          {order.websiteType} · {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-5 h-5 text-neutral-500" />
              </div>
              <p className="text-sm font-medium text-white mb-1">No orders yet</p>
              <p className="text-xs text-neutral-500 mb-4">Start your first project</p>
              <Link href="/dashboard/new-order">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                  <Plus className="h-3.5 w-3.5" />
                  Create Order
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-neutral-900 border border-neutral-800">
          <div className="px-5 py-4 border-b border-neutral-800">
            <h2 className="text-sm font-medium text-white">Quick Actions</h2>
          </div>
          <div className="p-3 space-y-1.5">
            <Link href="/dashboard/new-order">
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-neutral-800">
                    <Plus className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">New Order</p>
                    <p className="text-xs text-neutral-500">Start a project</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </div>
            </Link>
            
            <Link href="/dashboard/orders">
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-neutral-800">
                    <ShoppingCart className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">View Orders</p>
                    <p className="text-xs text-neutral-500">Manage projects</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </div>
            </Link>

            <Link href="/dashboard/settings">
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-neutral-800">
                    <Activity className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Settings</p>
                    <p className="text-xs text-neutral-500">Account settings</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
