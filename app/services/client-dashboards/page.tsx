'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  FileText,
  FolderKanban,
  Gauge,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Receipt,
  Settings2,
  Shield,
  Sparkles,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react'

const dashboardFeatures = [
  {
    icon: LayoutDashboard,
    iconClass: 'text-sky-400',
    title: 'Private client portal',
    description:
      'A secure dashboard where each client can log in, view progress, access files, and manage their project in one place.',
  },
  {
    icon: FolderKanban,
    iconClass: 'text-violet-400',
    title: 'Project tracking',
    description:
      'Show stages, timelines, status changes, progress blocks, and internal milestones with a clean premium interface.',
  },
  {
    icon: FileText,
    iconClass: 'text-emerald-400',
    title: 'Files and deliverables',
    description:
      'Give clients instant access to documents, design files, invoices, assets, exports, and final deliverables.',
  },
  {
    icon: MessageSquare,
    iconClass: 'text-amber-400',
    title: 'Client communication',
    description:
      'Keep feedback, requests, notes, and updates inside the portal instead of losing them in random chats.',
  },
  {
    icon: CreditCard,
    iconClass: 'text-pink-400',
    title: 'Invoices and payments',
    description:
      'Display invoices, payment status, deposit information, and billing actions inside the dashboard flow.',
  },
  {
    icon: Bell,
    iconClass: 'text-cyan-400',
    title: 'Live updates',
    description:
      'Notify clients when a phase changes, a file is uploaded, an invoice is ready, or feedback is needed.',
  },
]

const portalFlow = [
  {
    step: '01',
    title: 'Client logs in',
    text: 'Each user gets secure access only to their own project, files, updates, and billing data.',
  },
  {
    step: '02',
    title: 'Dashboard overview',
    text: 'They instantly see current status, timeline, pending actions, and recent activity.',
  },
  {
    step: '03',
    title: 'Review and respond',
    text: 'Clients can view assets, approve work, leave feedback, or upload what your team needs next.',
  },
  {
    step: '04',
    title: 'Stay organized',
    text: 'Everything remains structured and accessible in one system instead of scattered conversations.',
  },
]

const modules = [
  {
    icon: Receipt,
    iconClass: 'text-sky-400',
    title: 'Billing module',
    description:
      'Invoices, deposits, paid and unpaid statuses, downloadable receipts, and payment reminders.',
  },
  {
    icon: Users,
    iconClass: 'text-violet-400',
    title: 'Team and client roles',
    description:
      'Different access levels for admins, staff, and clients with permission-based visibility.',
  },
  {
    icon: Wallet,
    iconClass: 'text-emerald-400',
    title: 'Order and service data',
    description:
      'Store project details, packages, add-ons, notes, requests, and key business metadata.',
  },
  {
    icon: Shield,
    iconClass: 'text-amber-400',
    title: 'Protected access',
    description:
      'Authentication, secure routes, private resources, and a structured backend behind the UI.',
  },
]

const useCases = [
  'Web development agencies',
  'Design studios',
  'Marketing teams',
  'Service businesses with active clients',
  'Freelancers with premium workflows',
  'Consulting and strategy projects',
  'Custom software businesses',
  'Any business managing client delivery',
]

const benefits = [
  'Looks more premium and trustworthy',
  'Reduces messy communication',
  'Improves client experience',
  'Makes your process easier to scale',
  'Creates a real product feel',
  'Keeps files and billing organized',
]

export default function ClientDashboardsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.05]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-[120px] h-px bg-white/[0.03]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">
              <LayoutDashboard className="h-3.5 w-3.5 text-sky-400" />
              Client Portals
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[0.95]">
              Client dashboards
              <br />
              that make your
              <br />
              business feel premium.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
              We build private client dashboards that look like real software products — with
              project tracking, files, invoices, updates, and secure access in one polished system.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[15px] font-medium text-black transition hover:bg-white/90"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.14] px-6 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] hover:text-white"
              >
                Discuss your portal
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-16 grid gap-4 md:grid-cols-3"
          >
            {[
              { value: '1 login', label: 'for each client' },
              { value: '24/7', label: 'access to project data' },
              { value: '1 system', label: 'for files, billing, updates' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-6 text-left"
              >
                <div className="text-3xl font-semibold tracking-tight">{item.value}</div>
                <div className="mt-1 text-sm text-white/45">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What the dashboard can include
            </h2>
            <p className="mt-4 text-white/55">
              This is not just a page with some text blocks. It is a structured portal built around
              your real delivery workflow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dashboardFeatures.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/[0.12] hover:bg-white/[0.03]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03]">
                    <Icon className={`h-5 w-5 ${item.iconClass}`} />
                  </div>

                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/50">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/50">
                <UserRound className="h-3.5 w-3.5 text-violet-400" />
                Client Experience
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                A client portal that feels simple, clear, and expensive.
              </h2>

              <p className="mt-5 max-w-xl text-white/55">
                The goal is not to impress with random complexity. The goal is to make the client
                feel confident, informed, and fully inside a professional system.
              </p>

              <div className="mt-8 space-y-4">
                {portalFlow.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] text-sm font-semibold text-white/80">
                      {item.step}
                    </div>

                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/50">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02]"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '42px 42px',
                }}
              />

              <div className="relative p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/40">Portal Preview</div>
                    <div className="mt-1 text-lg font-medium">Client Dashboard</div>
                  </div>
                  <div className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/45">
                    Secure access
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Current status
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/85">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      In development
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Next action
                    </div>
                    <div className="mt-3 text-sm font-medium text-white/85">
                      Review homepage draft
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Files
                    </div>
                    <div className="mt-3 text-sm font-medium text-white/85">12 uploaded items</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Invoice
                    </div>
                    <div className="mt-3 text-sm font-medium text-white/85">Deposit paid</div>
                  </motion.div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/40 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-medium">Project timeline</div>
                    <div className="text-xs text-white/40">72% complete</div>
                  </div>

                  <div className="h-2 rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: '10%' }}
                      whileInView={{ width: '72%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-2 rounded-full bg-sky-400"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-white/45">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2">
                      Discovery
                    </div>
                    <div className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-sky-300">
                      Design + Build
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2">
                      Launch
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '44px 44px',
                }}
              />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/40">System Modules</div>
                    <div className="mt-1 text-lg font-medium">Portal architecture</div>
                  </div>
                  <div className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/45">
                    Structured backend
                  </div>
                </div>

                <div className="space-y-3">
                  {modules.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.06 }}
                        className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-4"
                      >
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                          <Icon className={`h-5 w-5 ${item.iconClass}`} />
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="mt-1 text-xs leading-6 text-white/45">{item.description}</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/50">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                Business Structure
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Your process becomes more scalable when it lives inside software.
              </h2>

              <p className="mt-5 text-white/55">
                A client dashboard turns your service into a stronger product experience. Instead of
                handling every update manually, you build a cleaner system clients actually enjoy using.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-sm text-white/72"
                  >
                    <Check className="h-4 w-4 text-emerald-400" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03]">
                    <Gauge className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-medium">Premium service, product-level feel</div>
                    <div className="text-sm text-white/45">
                      Clients feel the difference when the workflow is built properly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Perfect for service businesses that manage real clients
              </h2>
              <p className="mt-4 max-w-xl text-white/55">
                If you deliver work over time, share files, collect approvals, send invoices, or
                keep clients updated, this type of dashboard can save time and raise trust.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {useCases.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-sm text-white/72"
                  >
                    <ChevronRight className="h-4 w-4 text-white/35" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/50">
                <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                Portal Value
              </div>

              <h3 className="text-xl font-medium">What clients actually feel</h3>
              <p className="mt-3 text-sm leading-7 text-white/50">
                The portal is not only useful for you internally. It changes how your brand is perceived externally.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'The business feels organized.',
                  'The process feels premium.',
                  'The project feels active and transparent.',
                  'The client feels more confident paying and continuing.',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                      <Check className="h-3 w-3 text-white/70" />
                    </div>
                    <p className="text-sm leading-7 text-white/68">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04]">
              <LayoutDashboard className="h-5 w-5 text-sky-400" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Want your own premium client dashboard?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/55">
              We can build a private portal tailored to your business — project tracking, files,
              invoices, updates, permissions, and a real product feel from start to finish.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[15px] font-medium text-black transition hover:bg-white/90"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/[0.15] px-6 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] hover:text-white"
              >
                Discuss your project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
