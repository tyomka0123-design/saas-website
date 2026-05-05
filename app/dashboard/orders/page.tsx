'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  ShoppingCart, 
  Search,
  Filter,
  ArrowRight,
  Calendar,
  DollarSign,
  LayoutGrid,
  List,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG, WEBSITE_TYPES, OrderStatus } from '@/lib/types'

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors = {
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    urgent: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${colors[priority as keyof typeof colors] || colors.low}`}>
      {priority}
    </span>
  )
}

export default function OrdersPage() {
  const { user, orders } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter user's orders
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
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Orders</h1>
          <p className="text-white/50 mt-1">
            Track and manage all your website projects
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

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm">{statusOptions.find(o => o.value === statusFilter)?.label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute top-full mt-2 right-0 w-48 p-1 rounded-xl bg-[#151515] border border-white/[0.08] shadow-2xl z-20"
              >
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value)
                      setIsFilterOpen(false)
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      statusFilter === option.value
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/[0.1] text-white' : 'text-white/40 hover:text-white'}`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/[0.1] text-white' : 'text-white/40 hover:text-white'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Orders List/Grid */}
      {filteredOrders.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}
        >
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
            >
              <Link href={`/dashboard/orders/${order.id}`}>
                <div className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {order.title}
                        </h3>
                        <p className="text-sm text-white/40 capitalize">
                          {WEBSITE_TYPES[order.websiteType]?.label || order.websiteType}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                  
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {order.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <StatusBadge status={order.status} />
                    <PriorityBadge priority={order.priority} />
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {order.budget}
                      </span>
                    </div>
                    {order.deadline && (
                      <span className="text-xs text-orange-400">
                        Due: {new Date(order.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-5">
            <ShoppingCart className="w-10 h-10 text-white/30" />
          </div>
          <h3 className="font-semibold text-lg text-white mb-2">
            {searchQuery || statusFilter !== 'all' ? 'No orders found' : 'No orders yet'}
          </h3>
          <p className="text-white/40 mb-6 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Ready to start your project? Create your first order and we\'ll bring your vision to life.'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Link href="/dashboard/new-order">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium text-sm"
              >
                <Plus className="h-4 w-4" />
                Create Your First Order
              </motion.button>
            </Link>
          )}
        </motion.div>
      )}
    </div>
  )
}
