'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Mail,
  Search,
  Shield,
  Users,
  X,
  Filter,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  MoreHorizontal,
  Trash2,
  Edit3,
  UserCog,
  ShoppingCart,
  Calendar,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG, ROLE_COLORS, UserRole, OrderStatus, ROLE_PERMISSIONS } from '@/lib/types'

// Status badge component
function StatusBadge({ status }: { status: OrderStatus }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  )
}

// Role badge component
function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
      {role === 'founder' && <Sparkles className="h-2.5 w-2.5" />}
      {role}
    </span>
  )
}

// Stats card with animation
function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  change,
  color,
  delay 
}: { 
  label: string
  value: string | number
  icon: React.ElementType
  change?: string
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
      <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          {change && (
            <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3 w-3" />
              {change}
            </div>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-white/50 mt-1">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Activity chart component
function MiniChart() {
  const data = [30, 50, 40, 70, 55, 80, 65]
  const maxValue = Math.max(...data)
  
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-500/50 to-purple-400/80"
        />
      ))}
    </div>
  )
}

export function AdminPanelClient() {
  const { user, users, orders, updateUserRole, deleteUser, updateOrder, deleteOrder, getPermissions } = useAuth()
  const permissions = getPermissions()
  
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'users'>('overview')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [orderSearch, setOrderSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [userSearch, setUserSearch] = useState('')
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'reviewing').length
  const inProgressOrders = orders.filter(o => o.status === 'in_progress').length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const totalUsers = users.length

  // Filter orders
  const filteredOrders = useMemo(() => {
    const q = orderSearch.toLowerCase()
    return orders.filter(order => {
      const matchesSearch = 
        order.title.toLowerCase().includes(q) ||
        order.userName.toLowerCase().includes(q) ||
        order.userEmail.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, orderSearch, statusFilter])

  // Filter users
  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase()
    return users.filter(u => 
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    )
  }, [users, userSearch])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...Object.entries(ORDER_STATUS_CONFIG).map(([value, config]) => ({
      value,
      label: config.label,
    })),
  ]

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    updateOrder(orderId, { status })
    setSelectedOrder(null)
  }

  const handleUpdateUserRole = (userId: string, role: UserRole) => {
    const success = updateUserRole(userId, role)
    if (success) {
      setEditingUser(null)
    }
  }

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId)
      setSelectedOrder(null)
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
  ]

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium mb-3">
            <Shield className="w-3.5 h-3.5" />
            {user?.role === 'founder' ? 'Founder' : user?.role === 'administrator' ? 'Administrator' : 'Manager'} Workspace
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-white/50 mt-1">
            Manage orders, users, and monitor platform activity
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'orders' | 'users')}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab.id
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }
            `}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Overview Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                label="Total Orders" 
                value={totalOrders} 
                icon={BriefcaseBusiness} 
                color="from-blue-500 to-blue-600"
                change="+12%"
                delay={0}
              />
              <StatCard 
                label="Pending" 
                value={pendingOrders} 
                icon={Clock3} 
                color="from-orange-500 to-orange-600"
                delay={0.1}
              />
              <StatCard 
                label="Completed" 
                value={completedOrders} 
                icon={CheckCircle2} 
                color="from-green-500 to-green-600"
                change="+8%"
                delay={0.2}
              />
              <StatCard 
                label="Total Users" 
                value={totalUsers} 
                icon={Users} 
                color="from-purple-500 to-purple-600"
                delay={0.3}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                  <span className="text-xs text-white/40">Last 7 days</span>
                </div>
                <MiniChart />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                  <div>
                    <p className="text-xl font-bold text-white">{totalOrders}</p>
                    <p className="text-xs text-white/40">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-400">{completedOrders}</p>
                    <p className="text-xs text-white/40">Completed</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple-400">{inProgressOrders}</p>
                    <p className="text-xs text-white/40">In Progress</p>
                  </div>
                </div>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    View all
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 4).map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <ShoppingCart className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white truncate max-w-[150px]">{order.title}</p>
                          <p className="text-xs text-white/40">{order.userName}</p>
                        </div>
                      </div>
                      <StatusBadge status={order.status} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
                  className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">{statusOptions.find(o => o.value === statusFilter)?.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isStatusFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isStatusFilterOpen && (
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
                            setIsStatusFilterOpen(false)
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
            </div>

            {/* Orders Table */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs text-white/40 font-medium">
                <span>Project</span>
                <span>Client</span>
                <span>Status</span>
                <span>Date</span>
                <span>Actions</span>
              </div>
              
              <div className="divide-y divide-white/[0.04]">
                {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 items-center">
                      <div>
                        <p className="font-medium text-white">{order.title}</p>
                        <p className="text-xs text-white/40 mt-1">{order.websiteType} - {order.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/70">{order.userName}</p>
                        <p className="text-xs text-white/40">{order.userEmail}</p>
                      </div>
                      <div>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="text-sm text-white/50">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className="p-2 rounded-lg hover:bg-white/[0.05] text-white/50 hover:text-white transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        {permissions.canManageAllOrders && (
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="py-16 text-center">
                    <ShoppingCart className="h-10 w-10 mx-auto text-white/20 mb-3" />
                    <p className="font-medium text-white">No orders found</p>
                    <p className="text-sm text-white/40 mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((u, index) => {
                const userOrdersCount = orders.filter(o => o.userId === u.id).length
                const canEditThisUser = permissions.canAssignRoles && u.role !== 'founder'
                const canDeleteThisUser = permissions.canDeleteUsers && u.role !== 'founder' && u.id !== user?.id
                
                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/10">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-white/50 text-lg font-semibold">
                              {u.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{u.name}</p>
                          <RoleBadge role={u.role} />
                        </div>
                      </div>
                      
                      {(canEditThisUser || canDeleteThisUser) && (
                        <div className="relative">
                          <button
                            onClick={() => setEditingUser(editingUser === u.id ? null : u.id)}
                            className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                          
                          <AnimatePresence>
                            {editingUser === u.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-full right-0 mt-1 w-48 p-1 rounded-xl bg-[#151515] border border-white/[0.08] shadow-2xl z-20"
                              >
                                {canEditThisUser && permissions.assignableRoles.map(role => (
                                  <button
                                    key={role}
                                    onClick={() => handleUpdateUserRole(u.id, role)}
                                    disabled={u.role === role}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                      u.role === role
                                        ? 'text-white/30 cursor-not-allowed'
                                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                                  >
                                    <UserCog className="h-4 w-4" />
                                    Set as {role}
                                  </button>
                                ))}
                                {canDeleteThisUser && (
                                  <button
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Delete User
                                  </button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/50">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <ShoppingCart className="h-4 w-4" />
                        <span>{userOrdersCount} orders</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(u.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Edit Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#0f0f0f] border border-white/[0.08] shadow-2xl overflow-hidden"
            >
              {(() => {
                const order = orders.find(o => o.id === selectedOrder)
                if (!order) return null
                
                return (
                  <>
                    <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{order.title}</h3>
                        <p className="text-sm text-white/40">{order.userName}</p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs text-white/40 mb-2">Update Status</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateOrderStatus(order.id, status as OrderStatus)}
                              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                                order.status === status
                                  ? config.color
                                  : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.15]'
                              }`}
                            >
                              {config.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-white/[0.06]">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/40 text-xs mb-1">Type</p>
                            <p className="text-white capitalize">{order.websiteType}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs mb-1">Budget</p>
                            <p className="text-white">{order.budget}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs mb-1">Priority</p>
                            <p className="text-white capitalize">{order.priority}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs mb-1">Created</p>
                            <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
