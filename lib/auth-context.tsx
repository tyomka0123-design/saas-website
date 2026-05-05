'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole, ROLE_PERMISSIONS, FOUNDER_EMAIL, Order } from './types'

interface AuthContextType {
  user: User | null
  users: User[]
  orders: Order[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserRole: (userId: string, newRole: UserRole) => boolean
  deleteUser: (userId: string) => boolean
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'userName' | 'userEmail'>) => Order | null
  updateOrder: (orderId: string, updates: Partial<Order>) => boolean
  deleteOrder: (orderId: string) => boolean
  getPermissions: () => typeof ROLE_PERMISSIONS.user
  canAccessAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock data for demo purposes - replace with real database calls
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'artpas01@gmail.com',
    name: 'Artem',
    role: 'founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Artem',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'administrator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date(),
  },
  {
    id: '3',
    email: 'manager@example.com',
    name: 'Sarah Manager',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: new Date('2024-03-01'),
    lastLogin: new Date(),
  },
  {
    id: '4',
    email: 'user@example.com',
    name: 'John Client',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2024-03-15'),
    lastLogin: new Date(),
  },
  {
    id: '5',
    email: 'client2@example.com',
    name: 'Emily Stone',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    createdAt: new Date('2024-04-01'),
  },
]

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    userId: '4',
    userName: 'John Client',
    userEmail: 'user@example.com',
    title: 'E-commerce Website for Fashion Brand',
    description: 'Modern e-commerce platform with product catalog, cart, checkout, and admin panel.',
    websiteType: 'ecommerce',
    budget: '$5,000 - $10,000',
    deadline: new Date('2024-06-15'),
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: 'ord-002',
    userId: '5',
    userName: 'Emily Stone',
    userEmail: 'client2@example.com',
    title: 'Portfolio Website',
    description: 'Minimalist portfolio for a photographer with gallery and contact form.',
    websiteType: 'portfolio',
    budget: '$1,000 - $2,500',
    deadline: new Date('2024-05-20'),
    status: 'completed',
    priority: 'medium',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: 'ord-003',
    userId: '4',
    userName: 'John Client',
    userEmail: 'user@example.com',
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with charts, user management, and reporting features.',
    websiteType: 'dashboard',
    budget: '$10,000+',
    deadline: new Date('2024-07-01'),
    status: 'pending',
    priority: 'urgent',
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-04-12'),
  },
  {
    id: 'ord-004',
    userId: '5',
    userName: 'Emily Stone',
    userEmail: 'client2@example.com',
    title: 'Landing Page for Startup',
    description: 'High-converting landing page with animations and lead capture.',
    websiteType: 'landing',
    budget: '$500 - $1,000',
    status: 'reviewing',
    priority: 'low',
    createdAt: new Date('2024-04-14'),
    updatedAt: new Date('2024-04-14'),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('dashboard_user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        // Refresh user data from users array
        const currentUser = users.find(u => u.id === parsed.id)
        if (currentUser) {
          setUser(currentUser)
        }
      } catch {
        localStorage.removeItem('dashboard_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - in real app, verify with database
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (foundUser) {
      // Ensure founder role is always assigned to the correct email
      if (email.toLowerCase() === FOUNDER_EMAIL.toLowerCase() && foundUser.role !== 'founder') {
        foundUser.role = 'founder'
      }
      
      setUser(foundUser)
      localStorage.setItem('dashboard_user', JSON.stringify(foundUser))
      return true
    }
    
    // Auto-create user for demo
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: email.toLowerCase() === FOUNDER_EMAIL.toLowerCase() ? 'founder' : 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date(),
      lastLogin: new Date(),
    }
    
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    localStorage.setItem('dashboard_user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dashboard_user')
  }

  const getPermissions = () => {
    if (!user) return ROLE_PERMISSIONS.user
    return ROLE_PERMISSIONS[user.role]
  }

  const canAccessAdmin = () => {
    return getPermissions().canAccessAdmin
  }

  const updateUserRole = (userId: string, newRole: UserRole): boolean => {
    if (!user) return false
    
    const permissions = getPermissions()
    const targetUser = users.find(u => u.id === userId)
    
    if (!targetUser) return false
    
    // Cannot change founder role
    if (targetUser.role === 'founder' || newRole === 'founder') return false
    
    // Check if current user can assign this role
    if (!permissions.canAssignRoles) return false
    if (!permissions.assignableRoles.includes(newRole)) return false
    
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ))
    
    return true
  }

  const deleteUser = (userId: string): boolean => {
    if (!user) return false
    
    const permissions = getPermissions()
    const targetUser = users.find(u => u.id === userId)
    
    if (!targetUser) return false
    if (targetUser.role === 'founder') return false
    if (!permissions.canDeleteUsers) return false
    
    setUsers(prev => prev.filter(u => u.id !== userId))
    return true
  }

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'userName' | 'userEmail'>): Order | null => {
    if (!user) return null
    
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const updateOrder = (orderId: string, updates: Partial<Order>): boolean => {
    if (!user) return false
    
    const permissions = getPermissions()
    const order = orders.find(o => o.id === orderId)
    
    if (!order) return false
    
    // Users can only update their own orders
    if (!permissions.canManageAllOrders && order.userId !== user.id) return false
    
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, ...updates, updatedAt: new Date() } : o
    ))
    
    return true
  }

  const deleteOrder = (orderId: string): boolean => {
    if (!user) return false
    
    const permissions = getPermissions()
    const order = orders.find(o => o.id === orderId)
    
    if (!order) return false
    if (!permissions.canManageAllOrders && order.userId !== user.id) return false
    
    setOrders(prev => prev.filter(o => o.id !== orderId))
    return true
  }

  return (
    <AuthContext.Provider value={{
      user,
      users,
      orders,
      isLoading,
      login,
      logout,
      updateUserRole,
      deleteUser,
      addOrder,
      updateOrder,
      deleteOrder,
      getPermissions,
      canAccessAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
