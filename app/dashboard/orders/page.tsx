import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Plus, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your website projects
          </p>
        </div>
        <Button asChild className="glow min-h-[48px]">
          <Link href="/dashboard/new-order">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Orders */}
      {orders && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="block"
            >
              <Card className="bg-card/50 border-border hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg truncate">
                          {order.business_name}
                        </h3>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>{order.website_type}</span>
                        <span>&bull;</span>
                        <span>Budget: {order.budget}</span>
                        <span>&bull;</span>
                        <span>Created: {new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {order.quote_price && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Quote</p>
                        <p className="text-xl font-bold">${order.quote_price.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="bg-card/50 border-border">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Ready to start your project? Create your first order and we&apos;ll bring your vision to life.
              </p>
              <Button asChild className="glow">
                <Link href="/dashboard/new-order">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Order
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
