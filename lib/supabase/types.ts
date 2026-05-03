export type OrderStatus = 
  | 'pending'
  | 'in_review'
  | 'invoice_sent'
  | 'paid'
  | 'in_progress'
  | 'completed'

export type UserRole = 'user' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  business_name: string
  website_type: string
  budget: string
  deadline: string | null
  pages: string | null
  design_style: string | null
  features: string[]
  description: string
  contact_email: string
  phone: string | null
  references: string | null
  status: OrderStatus
  quote_price: number | null
  invoice_sent: boolean
  paid: boolean
  admin_notes: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'status' | 'quote_price' | 'invoice_sent' | 'paid' | 'admin_notes'> & {
          status?: OrderStatus
          quote_price?: number | null
          invoice_sent?: boolean
          paid?: boolean
          admin_notes?: string | null
        }
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'user_id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      order_status: OrderStatus
      user_role: UserRole
    }
  }
}
