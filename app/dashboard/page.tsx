import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Code2,
  FileText,
  FolderOpen,
  Globe,
  Layers3,
  LockKeyhole,
  MessageSquare,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wand2,
  BarChart3,
  CalendarClock,
  BellRing,
  LifeBuoy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/dashboard/status-badge'

type ProjectStep = {
  label: string
  description: string
  done: boolean
}

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
    .limit(6)

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
    'Client'

  const currentOrder = orders?.[0]

  const steps: ProjectStep[] = [
    {
      label: 'Strategy',
      description: 'Goals, positioning, and website direction',
      done: !!currentOrder,
    },
    {
      label: 'Design',
      description: 'Premium layout, visual system, and structure',
      done: !!currentOrder && activeOrders !== 0,
    },
    {
      label: 'Development',
      description: 'Fast, scalable, conversion-ready implementation',
      done: false,
    },
    {
      label: 'Launch',
      description: 'QA, deployment, and final polish',
      done: false,
    },
  ]

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders || 0,
      icon: FolderOpen,
      description: 'All submitted website requests',
    },
    {
      label: 'Active Projects',
      value: activeOrders || 0,
      icon: Clock3,
      description: 'Projects currently in progress',
    },
    {
      label: 'Completed',
      value: completedOrders || 0,
      icon: CheckCircle2,
      description: 'Delivered and finalized projects',
    },
  ]

  const quickActions = [
    {
      href: '/dashboard/new-order',
      icon: Plus,
      title: 'Create New Order',
      text: 'Submit a new website request and outline the scope clearly.',
    },
    {
      href: '/dashboard/files',
      icon: UploadCloud,
      title: 'Upload Brand Assets',
      text: 'Send logos, content, images, references, and documents.',
    },
    {
      href: '/dashboard/messages',
      icon: MessageSquare,
      title: 'Message the Team',
      text: 'Ask questions, send feedback, and keep progress moving.',
    },
    {
      href: '/dashboard/support',
      icon: LifeBuoy,
      title: 'Get Support',
      text: 'Need help with your project, files, or next steps? Reach out here.',
    },
  ]

  const standards = [
    {
      icon: Rocket,
      title: 'Performance-first',
      text: 'Clean architecture, fast load times, and a premium experience that feels reliable.',
    },
    {
      icon: ShieldCheck,
      title: 'Serious delivery',
      text: 'Clear milestones, structured workflow, and a professional client process from start to finish.',
    },
    {
      icon: Wand2,
      title: 'Product-level polish',
      text: 'Thoughtful UI, visual consistency, and high-trust presentation across every screen.',
    },
    {
      icon: LockKeyhole,
      title: 'Stable systems',
      text: 'Scalable builds designed to support growth, updates, and future expansion.',
    },
  ]

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.11),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(99,102,241,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-24 top-32 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-16 h-56 w-56 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[1.1fr_0.9fr] xl:p-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.95)] animate-pulse" />
                Client workspace
              </div>

              <div className="mt-6 max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                  Serious project control,
                  <span className="block text-white/92">built for premium clients.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52 md:text-base">
                  Welcome back, {firstName}. Track project status, files, communication, approvals,
                  and delivery in one refined dashboard designed to feel clean, trustworthy, and high-end.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Link href="/dashboard/new-order">
                    <Plus className="mr-2 h-4 w-4" />
                    Start New Project
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-xl border-white/[0.12] bg-white/[0.03] px-5 text-sm font-medium text-white hover:bg-white/[0.06]"
                >
                  <Link href="/dashboard/orders">
                    View All Orders
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Structured delivery', value: '01' },
                { label: 'Premium presentation', value: '02' },
                { label: 'Clear communication', value: '03' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">{item.value}</p>
                  <p className="mt-2 text-sm font-medium text-white/86">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/50 p-4 md:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_78%_20%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_70%_78%,rgba(129,140,248,0.14),transparent_24%)]" />
              <div className="absolute right-[-48px] top-[-48px] h-44 w-44 rounded-full border border-white/[0.08] [animation:spin_18s_linear_infinite]" />
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-white/[0.08] [animation:spin_12s_linear_infinite_reverse]" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">Workspace status</p>
                    <p className="mt-1 text-sm font-medium text-white">Client dashboard connected</p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Live
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/[0.08] bg-[#070707] p-4 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.045]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                        <Layers3 className="h-5 w-5 text-white/78" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Project Pipeline</p>
                        <p className="text-xs text-white/40">Clear stages and delivery flow</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {steps.map((step, index) => (
                        <div key={step.label} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                              step.done
                                ? 'border-emerald-400/30 bg-emerald-400/12 text-emerald-300'
                                : 'border-white/[0.1] bg-white/[0.03] text-white/50'
                            }`}
                          >
                            {step.done ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white/90">{step.label}</p>
                            <p className="text-xs leading-5 text-white/42">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[#070707] p-4 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.045]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                        <BarChart3 className="h-5 w-5 text-white/78" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Delivery Signals</p>
                        <p className="text-xs text-white/40">What the workspace is tracking</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        { label: 'Project visibility', value: 'High', width: 'w-[88%]' },
                        { label: 'Asset readiness', value: 'Stable', width: 'w-[70%]' },
                        { label: 'Launch alignment', value: 'Active', width: 'w-[76%]' },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="text-white/48">{row.label}</span>
                            <span className="text-white/72">{row.value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/[0.06]">
                            <div
                              className={`h-2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.7),rgba(59,130,246,0.9))] ${row.width}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/34">Delivery model</p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">
                      Designed to feel premium before the launch even happens.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/46">
                      The goal is not only to build a site, but to present the project in a way that gives the client trust, clarity, and momentum.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/34">Visual layer</p>
                    <div className="mt-4 flex items-end gap-2">
                      <div className="h-12 w-10 rounded-t-xl bg-white/90" />
                      <div className="h-20 w-10 rounded-t-xl bg-white/65" />
                      <div className="h-28 w-10 rounded-t-xl bg-blue-400/90" />
                      <div className="h-16 w-10 rounded-t-xl bg-indigo-300/70" />
                    </div>
                    <p className="mt-4 text-xs leading-5 text-white/48">
                      Clean dark foundation with restrained color accents for a serious SaaS feel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40">
                <stat.icon className="h-5 w-5 text-white/82" />
              </div>
              <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/36">
                Live
              </div>
            </div>

            <div className="mt-7">
              <p className="text-4xl font-semibold tracking-[-0.06em] text-white">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white/82">{stat.label}</p>
              <p className="mt-1 text-sm leading-6 text-white/42">{stat.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050505] p-6 md:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.11),transparent_25%),radial-gradient(circle_at_95%_0%,rgba(59,130,246,0.16),transparent_28%)]" />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">Current project</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {currentOrder ? currentOrder.business_name : 'Your workspace is ready'}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/46">
                  {currentOrder
                    ? 'Your most recent order is shown below with the latest project context and next-stage structure.'
                    : 'You do not have an active order yet. Once you submit a project, this area will show the build status, workflow, and next steps.'}
                </p>
              </div>

              <div className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-white/58">
                {currentOrder ? 'Active workspace' : 'Awaiting first order'}
              </div>
            </div>

            {currentOrder ? (
              <div className="mt-7 grid gap-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
                  <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/34">Project type</p>
                        <p className="mt-2 text-lg font-medium text-white">{currentOrder.website_type}</p>
                      </div>
                      <StatusBadge status={currentOrder.status} />
                    </div>

                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-white/52">Progress overview</span>
                        <span className="text-white/82">56%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-white/[0.06]">
                        <div className="h-2.5 w-[56%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.95),rgba(59,130,246,0.85))]" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {steps.map((step, index) => (
                        <div
                          key={step.label}
                          className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                        >
                          <div className="flex items-center gap-2">
                            {step.done ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                            ) : (
                              <CircleDashed className="h-4 w-4 text-white/45" />
                            )}
                            <p className="text-sm font-medium text-white">
                              {index + 1}. {step.label}
                            </p>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-white/42">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/34">Project focus</p>
                    <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">
                      Clean structure, premium feel, and strong client confidence.
                    </h3>

                    <div className="mt-5 space-y-3">
                      {[
                        'Clear page structure and content hierarchy',
                        'Modern, trustworthy visual presentation',
                        'Strong performance and scalable implementation',
                        'Smooth delivery path from idea to launch',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-black/35 p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                          <p className="text-sm leading-6 text-white/70">{item}</p>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="mt-5 h-11 rounded-xl border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                    >
                      <Link href={`/dashboard/orders/${currentOrder.id}`}>
                        Open Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: CalendarClock,
                      title: 'Timeline visibility',
                      text: 'Project stages are organized so the client always sees what comes next.',
                    },
                    {
                      icon: BellRing,
                      title: 'Status clarity',
                      text: 'Each request is easier to understand, review, and follow through the dashboard.',
                    },
                    {
                      icon: Globe,
                      title: 'Launch mindset',
                      text: 'The workspace is built around completion, quality, and real delivery.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-4"
                    >
                      <item.icon className="h-5 w-5 text-white/74" />
                      <p className="mt-4 text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/42">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.88fr]">
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40">
                    <Rocket className="h-6 w-6 text-white/80" />
                  </div>

                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em] text-white">
                    Start your first premium build
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/46">
                    Submit your first order to unlock a more complete client workflow with tracking, assets, communication, and structured delivery stages.
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {[
                      'Business details and project scope',
                      'Goals, references, and positioning',
                      'Brand assets, images, and copy',
                      'Structured review and launch process',
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/[0.08] bg-black/35 p-4">
                        <p className="text-sm text-white/72">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="mt-6 h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
                  >
                    <Link href="/dashboard/new-order">Create Order</Link>
                  </Button>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/45 p-5">
                  <div className="rounded-[22px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/34">Workspace preview</p>
                    <div className="mt-5 space-y-3">
                      <div className="h-10 rounded-xl border border-white/[0.08] bg-white/[0.06]" />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-24 rounded-2xl border border-white/[0.08] bg-white/[0.05]" />
                        <div className="h-24 rounded-2xl border border-white/[0.08] bg-blue-500/10" />
                        <div className="h-24 rounded-2xl border border-white/[0.08] bg-white/[0.05]" />
                      </div>
                      <div className="h-36 rounded-2xl border border-white/[0.08] bg-white/[0.04]" />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-white/44">
                    A more complete dashboard experience starts once a project is submitted.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">Quick actions</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                  Move your project forward
                </h2>
              </div>
              <Sparkles className="h-5 w-5 text-white/48" />
            </div>

            <div className="mt-5 space-y-3">
              {quickActions.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-[22px] border border-white/[0.08] bg-black/35 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                    <item.icon className="h-5 w-5 text-white/78" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/42">{item.text}</p>
                  </div>

                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/28 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-[#050505] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">Build standards</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
              What this workspace is built around
            </h2>

            <div className="mt-5 grid gap-3">
              {standards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-500 hover:border-white/[0.14]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/40">
                      <item.icon className="h-4.5 w-4.5 text-white/75" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/42">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">Client flow</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                How delivery is structured
              </h2>
            </div>
            <Code2 className="h-5 w-5 text-white/42" />
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                number: '01',
                title: 'Project submitted',
                text: 'Scope, goals, and key details enter the workspace in a structured format.',
              },
              {
                number: '02',
                title: 'Assets and communication',
                text: 'Files, references, and feedback stay organized in one place instead of getting lost.',
              },
              {
                number: '03',
                title: 'Build and review',
                text: 'The project moves through design, implementation, and refinement with visibility.',
              },
              {
                number: '04',
                title: 'Launch readiness',
                text: 'Final delivery becomes cleaner, more confident, and more professional for the client.',
              },
            ].map((item) => (
              <div key={item.number} className="flex gap-4 rounded-[22px] border border-white/[0.08] bg-black/35 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-xs font-medium text-white/72">
                  {item.number}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/42">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/[0.08] bg-[#050505]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">Orders</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                Recent project activity
              </h2>
            </div>

            <Link
              href="/dashboard/orders"
              className="inline-flex items-center text-sm text-white/58 transition hover:text-white"
            >
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="p-4">
            {orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order, index) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="group flex items-center justify-between gap-4 rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/35 text-sm font-medium text-white/70">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-white">
                          {order.business_name}
                        </h3>
                        <p className="mt-1 text-sm text-white/42">
                          {order.website_type}
                        </p>
                        <p className="mt-1 text-xs text-white/30">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <ArrowRight className="h-4 w-4 text-white/24 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <FileText className="mx-auto h-10 w-10 text-white/24" />
                <h3 className="mt-4 text-lg font-medium text-white">No orders yet</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                  Once you submit your first project request, recent activity will appear here with status updates and direct access.
                </p>

                <Button
                  asChild
                  className="mt-6 h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Link href="/dashboard/new-order">Create Your First Order</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
