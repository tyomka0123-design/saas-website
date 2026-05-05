// Role hierarchy: Founder > Administrator > Manager > User
export type UserRole = 'founder' | 'administrator' | 'manager' | 'user'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: Date
  lastLogin?: Date
}

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  title: string
  description: string
  websiteType: 'landing' | 'portfolio' | 'ecommerce' | 'dashboard' | 'saas' | 'other'
  budget: string
  deadline?: Date
  status: OrderStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  attachments?: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type OrderStatus = 
  | 'pending'
  | 'reviewing' 
  | 'in_progress'
  | 'on_hold'
  | 'completed'
  | 'cancelled'

export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  inProgressOrders: number
  completedOrders: number
  revenue: number
  averageCompletionTime: number
}

// Role permissions
export const ROLE_PERMISSIONS = {
  founder: {
    canManageUsers: true,
    canAssignRoles: true,
    canDeleteUsers: true,
    canManageAllOrders: true,
    canViewAnalytics: true,
    canAccessAdmin: true,
    canChangeFounder: false, // Nobody can change founder
    assignableRoles: ['administrator', 'manager', 'user'] as UserRole[],
  },
  administrator: {
    canManageUsers: true,
    canAssignRoles: true,
    canDeleteUsers: false,
    canManageAllOrders: true,
    canViewAnalytics: true,
    canAccessAdmin: true,
    canChangeFounder: false,
    assignableRoles: ['manager', 'user'] as UserRole[],
  },
  manager: {
    canManageUsers: false,
    canAssignRoles: false,
    canDeleteUsers: false,
    canManageAllOrders: true,
    canViewAnalytics: true,
    canAccessAdmin: true,
    canChangeFounder: false,
    assignableRoles: [] as UserRole[],
  },
  user: {
    canManageUsers: false,
    canAssignRoles: false,
    canDeleteUsers: false,
    canManageAllOrders: false,
    canViewAnalytics: false,
    canAccessAdmin: false,
    canChangeFounder: false,
    assignableRoles: [] as UserRole[],
  },
} as const

export const FOUNDER_EMAIL = 'artpas01@gmail.com'

export const ROLE_COLORS = {
  founder: { bg: 'bg-gradient-to-r from-amber-500 to-orange-500', text: 'text-white', border: 'border-amber-500' },
  administrator: { bg: 'bg-gradient-to-r from-purple-500 to-indigo-500', text: 'text-white', border: 'border-purple-500' },
  manager: { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white', border: 'border-blue-500' },
  user: { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' },
} as const

export const ORDER_STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  reviewing: { label: 'Reviewing', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  in_progress: { label: 'In Progress', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  on_hold: { label: 'On Hold', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  completed: { label: 'Completed', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
} as const

export const WEBSITE_TYPES = {
  landing: { label: 'Landing Page', icon: 'Layers' },
  portfolio: { label: 'Portfolio', icon: 'Briefcase' },
  ecommerce: { label: 'E-commerce', icon: 'ShoppingCart' },
  dashboard: { label: 'Dashboard', icon: 'LayoutDashboard' },
  saas: { label: 'SaaS Platform', icon: 'Rocket' },
  other: { label: 'Other', icon: 'Globe' },
} as const
