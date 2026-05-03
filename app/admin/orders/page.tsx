import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { FileText, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and review all customer orders
        </p>
      </div>

      {/* Orders List */}
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`}>
              <Card className="bg-card border-border hover:border-accent/50 transition-all duration-200 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {order.business_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.website_type} • {order.pages} pages
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Client: {order.profiles?.full_name || order.profiles?.email || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{order.budget}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <StatusBadge status={order.status} />
                      
                      {order.quote_price && (
                        <span className="text-sm font-medium text-green-400">
                          ${order.quote_price}
                        </span>
                      )}
                      
                      {order.paid && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          Paid
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
            <p className="text-muted-foreground">
              Orders from customers will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
