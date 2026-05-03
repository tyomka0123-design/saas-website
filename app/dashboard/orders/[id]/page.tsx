import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ArrowLeft, Calendar, DollarSign, FileText, Globe, Mail, Phone, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Badge } from '@/components/ui/badge'

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !order) {
    notFound()
  }

  const infoItems = [
    { icon: Globe, label: 'Website Type', value: order.website_type },
    { icon: DollarSign, label: 'Budget', value: order.budget },
    { icon: Calendar, label: 'Deadline', value: order.deadline || 'Not specified' },
    { icon: FileText, label: 'Pages', value: order.pages || 'Not specified' },
    { icon: Mail, label: 'Contact Email', value: order.contact_email },
    { icon: Phone, label: 'Phone', value: order.phone || 'Not provided' },
  ]

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to orders</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{order.business_name}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-muted-foreground">
              Order created on {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          {order.quote_price && (
            <div className="text-left sm:text-right p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm text-muted-foreground">Quote Price</p>
              <p className="text-2xl font-bold text-accent">${order.quote_price.toLocaleString()}</p>
              {order.paid && (
                <Badge className="mt-1 bg-success/20 text-success border-success/20">Paid</Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoItems.map((item) => (
          <Card key={item.label} className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium break-all">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Design Style */}
      {order.design_style && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Design Style</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{order.design_style}</p>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      {order.features && order.features.length > 0 && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Requested Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {order.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg">Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {order.description}
          </p>
        </CardContent>
      </Card>

      {/* References */}
      {order.references && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Reference Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap break-all">
              {order.references}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Status Timeline */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg">Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              { status: 'pending', label: 'Pending' },
              { status: 'in_review', label: 'In Review' },
              { status: 'invoice_sent', label: 'Invoice Sent' },
              { status: 'paid', label: 'Paid' },
              { status: 'in_progress', label: 'In Progress' },
              { status: 'completed', label: 'Completed' },
            ].map((step, index) => {
              const statusOrder = ['pending', 'in_review', 'invoice_sent', 'paid', 'in_progress', 'completed']
              const currentIndex = statusOrder.indexOf(order.status)
              const stepIndex = statusOrder.indexOf(step.status)
              const isActive = stepIndex <= currentIndex

              return (
                <div
                  key={step.status}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    isActive
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-secondary/50 border-border text-muted-foreground'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isActive ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm">{step.label}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
