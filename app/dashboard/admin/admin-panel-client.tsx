'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock,
  Mail,
  Search,
  Users,
  X,
  ChevronDown,
  ShoppingCart,
  Calendar,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ORDER_STATUS_CONFIG, ROLE_COLORS, UserRole, OrderStatus, ROLE_PERMISSIONS } from '@/lib/types'

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = ORDER_STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

function RoleBadge({ role }: { role: UserRole }) {
  const colors = ROLE_COLORS[role]
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${colors.bg} ${colors.text}`}>
      {role}
    </span>
  )
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ElementType }) {
  return (
    <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between mb-2">
        <div className="p-1.5 rounded bg-neutral-800">
          <Icon className="h-4 w-4 text-neutral-400" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{label}</p>
    </div>
  )
}

export default function AdminPanelClient() {
  const { user, users, orders, updateOrderStatus, updateUserRole, canManageOrders, canManageUsers } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'users'>('overview')
  const [orderSearch, setOrderSearch] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<string | null>(null)

  const stats = useMemo(() => ({
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'reviewing').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalUsers: users.length,
  }), [orders, users])

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.title.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.description.toLowerCase().includes(orderSearch.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, orderSearch, statusFilter])

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    )
  }, [users, userSearch])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...Object.entries(ORDER_STATUS_CONFIG).map(([value, config]) => ({ value, label: config.label })),
  ]

  const availableRoles: UserRole[] = user?.role === 'founder' 
    ? ['administrator', 'manager', 'user']
    : user?.role === 'administrator'
      ? ['manager', 'user']
      : ['user']

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus)
    setEditingOrder(null)
  }

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole)
    setEditingUser(null)
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders', show: canManageOrders() },
    { id: 'users', label: 'Users', show: canManageUsers() },
  ].filter(tab => tab.show !== false)

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage orders and users</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-md bg-neutral-900 border border-neutral-800 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Orders" value={stats.totalOrders} icon={ShoppingCart} />
          <StatCard label="Pending" value={stats.pendingOrders} icon={Clock} />
          <StatCard label="Completed" value={stats.completedOrders} icon={CheckCircle2} />
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && canManageOrders() && (
        <div>
          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search orders..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 text-sm"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="flex items-center gap-2 h-10 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-sm"
              >
                {statusOptions.find(o => o.value === statusFilter)?.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-40 p-1 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl z-20">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setStatusFilter(option.value); setIsStatusDropdownOpen(false) }}
                      className={`w-full px-3 py-2 rounded text-sm text-left ${statusFilter === option.value ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredOrders.map((order) => {
                  const orderUser = users.find(u => u.id === order.userId)
                  return (
                    <tr key={order.id} className="hover:bg-neutral-800/50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-white">{order.title}</p>
                        <p className="text-xs text-neutral-500">{order.websiteType}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded bg-neutral-800 flex items-center justify-center">
                            <Mail className="h-3.5 w-3.5 text-neutral-400" />
                          </div>
                          <div>
                            <p className="text-sm text-white">{orderUser?.name || 'Unknown'}</p>
                            <p className="text-xs text-neutral-500">{orderUser?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            onClick={() => setEditingOrder(editingOrder === order.id ? null : order.id)}
                            className="cursor-pointer"
                          >
                            <StatusBadge status={order.status} />
                          </button>
                          {editingOrder === order.id && (
                            <div className="absolute top-full left-0 mt-1 p-1 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl z-20 min-w-[140px]">
                              {Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(order.id, status as OrderStatus)}
                                  className={`w-full px-3 py-1.5 rounded text-xs text-left transition-colors ${order.status === status ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                >
                                  {config.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-10 text-neutral-500 text-sm">No orders found</div>
            )}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && canManageUsers() && (
        <div>
          {/* Search */}
          <div className="relative mb-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 text-sm"
            />
          </div>

          {/* Users Table */}
          <div className="rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredUsers.map((u) => {
                  const userOrders = orders.filter(o => o.userId === u.id)
                  const canChangeRole = ROLE_PERMISSIONS[user?.role || 'user'].canChangeRoles && 
                    u.role !== 'founder' && u.id !== user?.id
                  
                  return (
                    <tr key={u.id} className="hover:bg-neutral-800/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="h-full w-full rounded object-cover" />
                            ) : (
                              <span className="text-xs font-medium text-neutral-400">
                                {u.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="text-sm font-medium text-white">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-400">{u.email}</td>
                      <td className="px-4 py-3 text-sm text-neutral-400">{userOrders.length}</td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          {canChangeRole ? (
                            <button onClick={() => setEditingUser(editingUser === u.id ? null : u.id)}>
                              <RoleBadge role={u.role} />
                            </button>
                          ) : (
                            <RoleBadge role={u.role} />
                          )}
                          {editingUser === u.id && canChangeRole && (
                            <div className="absolute top-full left-0 mt-1 p-1 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl z-20 min-w-[120px]">
                              <div className="px-2 py-1 border-b border-neutral-800 mb-1">
                                <p className="text-[10px] text-neutral-500 uppercase">Change role</p>
                              </div>
                              {availableRoles.map(role => (
                                <button
                                  key={role}
                                  onClick={() => handleRoleChange(u.id, role)}
                                  className={`w-full px-2 py-1.5 rounded text-xs text-left capitalize transition-colors ${u.role === role ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                >
                                  {role}
                                </button>
                              ))}
                              <button
                                onClick={() => setEditingUser(null)}
                                className="w-full mt-1 pt-1 border-t border-neutral-800 px-2 py-1.5 text-xs text-neutral-500 hover:text-white flex items-center gap-1"
                              >
                                <X className="h-3 w-3" />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-10 text-neutral-500 text-sm">No users found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
