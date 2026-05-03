import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { ArrowLeft, Building2, Globe, Calendar, DollarSign, FileText, Mail, Phone, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { AdminOrderActions } from './actions-form'

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: order } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .eq('id', id)
    .single()
  
  if (!order) {
    notFound()
  }

  const features = order.features || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.business_name}</h1>
            <p className="text-muted-foreground">
              Order #{order.id.slice(0, 8)} • {order.profiles?.full_name || order.profiles?.email}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Building2 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-medium">{order.business_name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Globe className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website Type</p>
                    <p className="font-medium">{order.website_type}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <DollarSign className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Range</p>
                    <p className="font-medium">{order.budget}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium">{order.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Pages</p>
                    <p className="font-medium">{order.pages}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Globe className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Design Style</p>
                    <p className="font-medium">{order.design_style}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Required Features</p>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature: string) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Project Description</p>
                <p className="text-foreground whitespace-pre-wrap">
                  {order.description || 'No description provided'}
                </p>
              </div>

              {/* References */}
              {order.references && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Reference Links</p>
                  <p className="text-foreground whitespace-pre-wrap">{order.references}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${order.contact_email}`} className="font-medium text-accent hover:underline">
                    {order.contact_email}
                  </a>
                </div>
              </div>
              
              {order.phone && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${order.phone}`} className="font-medium text-accent hover:underline">
                      {order.phone}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="space-y-6">
          <AdminOrderActions order={order} />
          
          {/* Order Timeline */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Order Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Invoice Sent</p>
                <p className="font-medium">{order.invoice_sent ? 'Yes' : 'No'}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className={`font-medium ${order.paid ? 'text-green-400' : 'text-yellow-400'}`}>
                  {order.paid ? 'Paid' : 'Unpaid'}
                </p>
              </div>
              
              {order.quote_price && (
                <div>
                  <p className="text-sm text-muted-foreground">Quoted Price</p>
                  <p className="font-medium text-green-400">${order.quote_price}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
