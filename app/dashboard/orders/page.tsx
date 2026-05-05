'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Plus, 
  ShoppingCart, 
  Search,
  ArrowRight,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG, WEBSITE_TYPES, OrderStatus } from '@/lib/types'

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

export default function OrdersPage() {
  const { user, orders } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const userOrders = orders.filter(o => o.userId === user?.id)
  
  const filteredOrders = userOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...Object.entries(ORDER_STATUS_CONFIG).map(([value, config]) => ({
      value,
      label: config.label,
    })),
  ]

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">My Orders</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Track and manage your projects</p>
        </div>
        
        <Link href="/dashboard/new-order">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
            <Plus className="h-4 w-4" />
            New Order
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors text-sm"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 h-10 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-sm"
          >
            <span>{statusOptions.find(o => o.value === statusFilter)?.label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isFilterOpen && (
            <div className="absolute top-full mt-1 right-0 w-44 p-1 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl z-20">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setStatusFilter(option.value)
                    setIsFilterOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded text-sm transition-colors ${
                    statusFilter === option.value
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        <div className="rounded-lg bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800">
          {filteredOrders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <div className="flex items-center justify-between p-4 hover:bg-neutral-800/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-md bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                      {order.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                      <span>{WEBSITE_TYPES[order.websiteType]?.label || order.websiteType}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={order.status} />
                  <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-lg bg-neutral-900 border border-neutral-800">
          <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mx-auto mb-3">
            <ShoppingCart className="w-5 h-5 text-neutral-500" />
          </div>
          <p className="text-sm font-medium text-white mb-1">
            {searchQuery || statusFilter !== 'all' ? 'No orders found' : 'No orders yet'}
          </p>
          <p className="text-xs text-neutral-500 mb-4">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your filters'
              : 'Create your first order to get started'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Link href="/dashboard/new-order">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black text-sm font-medium">
                <Plus className="h-3.5 w-3.5" />
                Create Order
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
