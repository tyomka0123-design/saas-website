import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  FolderOpen,
  Globe2,
  MessageSquare,
  Plus,
  Rocket,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/dashboard/status-badge'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

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

  const firstName =
    profile?.full_name?.split(' ')[0] ||
    user.user_metadata?.full_name?.split(' ')[0] ||
    'Artem'

  const currentOrder = orders?.[0]

  const stats = [
    { label: 'Total Orders', value: totalOrders || 0, icon: FolderOpen },
    { label: 'Active Projects', value: activeOrders || 0, icon: Clock },
    { label: 'Completed', value: completedOrders || 0, icon: CheckCircle2 },
  ]

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_55%_100%,rgba(168,85,247,0.16),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
              Client workspace
            </div>

            <h1 className="max-w-2xl text-3xl font-bold tracking-[-0.05em] text-white md:text-5xl">
              Welcome back, {firstName}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/45 md:text-base">
              Track your website orders, project progress, files, updates, and launch status in one clean workspace.
            </p>
          </div>

          <Button asChild className="h-11 rounded-lg bg-white px-5 font-medium text-black hover:bg-white/90">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
                <stat.icon className="h-5 w-5 text-white/80" />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-white/42">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.1),transparent_30%)]" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                  Current Project
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  Your latest website build status
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Live
              </div>
            </div>

            {currentOrder ? (
              <div className="space-y-5">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {currentOrder.business_name}
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    {currentOrder.website_type}
                  </p>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div className="h-full w-[56%] rounded-full bg-white" />
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  {['Brief', 'Design', 'Build', 'Launch'].map((step, index) => (
                    <div
                      key={step}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3"
                    >
                      <p className="text-[11px] text-white/35">Step {index + 1}</p>
                      <p className="mt-1 text-sm font-medium text-white">{step}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/dashboard/orders/${currentOrder.id}`}
                  className="inline-flex items-center text-sm font-medium text-white hover:underline"
                >
                  View project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <Rocket className="mb-4 h-8 w-8 text-white/70" />
                <h3 className="text-lg font-semibold text-white">Start your first project</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
                  Submit your first website order and track everything from here.
                </p>
                <Button asChild className="mt-5 rounded-lg bg-white text-black hover:bg-white/90">
                  <Link href="/dashboard/new-order">Create Order</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
            Quick Actions
          </h2>

          <div className="mt-5 space-y-3">
            {[
              { href: '/dashboard/new-order', icon: Plus, title: 'New Order', text: 'Start a new website project' },
              { href: '/dashboard/files', icon: UploadCloud, title: 'Upload Files', text: 'Send content, photos, brand assets' },
              { href: '/dashboard/messages', icon: MessageSquare, title: 'Message Team', text: 'Ask questions or send updates' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 transition hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06]">
                  <item.icon className="h-5 w-5 text-white/75" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/40">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
          <div className="mb-5 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-white/70" />
            <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
              Build Stack
            </h2>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-black p-4 font-mono text-sm">
            {[
              'project.status = "active"',
              'design.system = "premium"',
              'stack = ["Next.js", "Supabase", "Vercel"]',
              'goal = "speed + trust + conversion"',
            ].map((line, index) => (
              <div key={line} className="flex gap-3 py-1.5">
                <span className="w-5 text-right text-white/20">{index + 1}</span>
                <span className="text-white/65">{line}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Globe2, label: 'Deploy' },
              { icon: Sparkles, label: 'Polish' },
              { icon: CheckCircle2, label: 'Review' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 text-center"
              >
                <item.icon className="mx-auto h-5 w-5 text-white/65" />
                <p className="mt-2 text-xs text-white/45">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-white/40">Latest project requests</p>
            </div>

            <Link
              href="/dashboard/orders"
              className="inline-flex items-center text-sm text-white/60 hover:text-white"
            >
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="p-4">
            {orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 transition hover:bg-white/[0.05]"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-white">
                        {order.business_name}
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        {order.website_type} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <StatusBadge status={order.status} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <FileText className="mx-auto h-9 w-9 text-white/25" />
                <h3 className="mt-4 font-medium text-white">No orders yet</h3>
                <p className="mt-1 text-sm text-white/40">
                  Your first order will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
