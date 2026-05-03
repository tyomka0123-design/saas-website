import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Plus, FolderOpen, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SystemArchitectureVisual } from '@/components/dashboard/system-architecture-visual'
import { StatusBadge } from '@/components/dashboard/status-badge'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', user.email)
    .maybeSingle()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)

  const { count: activeOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)
    .in('status', ['pending', 'in_review', 'invoice_sent', 'paid', 'in_progress'])

  const { count: completedOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)
    .eq('status', 'completed')

  const stats = [
    { label: 'Total Orders', value: totalOrders || 0, icon: FolderOpen },
    { label: 'Active Projects', value: activeOrders || 0, icon: Clock },
    { label: 'Completed', value: completedOrders || 0, icon: CheckCircle2 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {(user.user_metadata?.full_name || 'Artem Pasieka').split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Here's an overview of your projects"}
          </p>
        </div>
        <Button asChild className="glow min-h-[48px]">
          <Link href="/dashboard/new-order">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SystemArchitectureVisual />

      {/* Recent Orders */}
      <Card className="bg-card/50 border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{order.business_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.website_type} &bull; {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No orders yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start your first project with us today
              </p>
              <Button asChild>
                <Link href="/dashboard/new-order">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Order
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
