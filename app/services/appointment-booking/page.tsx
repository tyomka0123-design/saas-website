'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Database,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Phone,
  Repeat2,
  Settings2,
  Shield,
  Smartphone,
  UserRound,
  Zap,
} from 'lucide-react'

const capabilities = [
  {
    icon: CalendarCheck,
    title: 'Real-time booking flow',
    description:
      'Clients choose service, date, time, and submit in one smooth flow without confusion or friction.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first experience',
    description:
      'The whole booking journey is designed to feel fast and clean on phones, where most appointments happen.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin dashboard',
    description:
      'View bookings, manage availability, confirm requests, and control the system from one private panel.',
  },
  {
    icon: Repeat2,
    title: 'Smart availability logic',
    description:
      'Custom time slots, blocked dates, working hours, service duration, and booking limits built around your business.',
  },
  {
    icon: Mail,
    title: 'Automated notifications',
    description:
      'Email confirmations, reminders, admin alerts, and follow-ups reduce manual work and missed appointments.',
  },
  {
    icon: CreditCard,
    title: 'Deposits and payments',
    description:
      'Accept deposits or full payments before the appointment using secure checkout integrations when needed.',
  },
]

const bookingFlow = [
  {
    step: '01',
    title: 'Choose service',
    text: 'Client selects the service, team member, location, or category depending on your workflow.',
  },
  {
    step: '02',
    title: 'Pick a time',
    text: 'Only available slots are shown, with custom rules for duration, breaks, and working hours.',
  },
  {
    step: '03',
    title: 'Confirm details',
    text: 'Client enters contact info, notes, and any required form details before submitting.',
  },
  {
    step: '04',
    title: 'Automatic follow-up',
    text: 'The system sends confirmations, reminders, and internal notifications instantly.',
  },
]

const useCases = [
  'Barbershops and salons',
  'Clinics and consultations',
  'Car detailing and service shops',
  'Cleaning businesses',
  'Coaches and agencies',
  'Private service providers',
  'Studios and fitness sessions',
  'Any business that books time',
]

const systemBlocks = [
  {
    icon: UserRound,
    title: 'Client-facing interface',
    description:
      'A premium front-end booking page that feels like a real product, not a cheap plugin.',
  },
  {
    icon: Database,
    title: 'Booking database',
    description:
      'Appointments, users, services, notes, statuses, and time data stored in a structured backend.',
  },
  {
    icon: Settings2,
    title: 'Business rules engine',
    description:
      'Custom logic for slot generation, limits, service duration, staff availability, and edge cases.',
  },
  {
    icon: Shield,
    title: 'Protected admin controls',
    description:
      'Private access for your team to manage bookings, edit schedules, and monitor activity securely.',
  },
]

const outcomes = [
  'Fewer missed calls and manual messages',
  'Cleaner experience for new clients',
  'Higher trust through polished UX',
  'Better internal organization',
  'Less admin work every week',
  'Scalable system for future growth',
]

export default function AppointmentBookingPage() {
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
        <div className="absolute left-0 right-0 top-[120px] h-[1px] bg-white/[0.03]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.03]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">
              <CalendarCheck className="h-3.5 w-3.5" />
              Booking Systems
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[0.95]">
              Appointment booking
              <br />
              that feels like
              <br />
              a real SaaS product.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
              We build premium booking systems for businesses that want more than a basic calendar.
              Clean UX, custom logic, admin controls, automations, and a structure that actually
              fits how your business works.
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
                Book a Call
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
              { value: '24/7', label: 'booking access' },
              { value: '100%', label: 'custom workflow logic' },
              { value: '1 panel', label: 'for admin control' },
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
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What this system can do</h2>
            <p className="mt-4 text-white/55">
              Not just a booking form. A structured appointment workflow with premium UX and real
              business logic underneath.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((item, index) => {
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
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] text-white/70 transition group-hover:text-white">
                    <Icon className="h-5 w-5" />
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
                <Clock3 className="h-3.5 w-3.5" />
                Client Journey
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                A booking flow people instantly understand.
              </h2>

              <p className="mt-5 max-w-xl text-white/55">
                The whole experience is built to remove confusion. Clients see exactly what to do,
                when they are available to book, and what happens next.
              </p>

              <div className="mt-8 space-y-4">
                {bookingFlow.map((item, index) => (
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
                    <div className="text-sm text-white/40">Booking Preview</div>
                    <div className="mt-1 text-lg font-medium">Schedule an appointment</div>
                  </div>
                  <div className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/45">
                    Live flow
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Service', value: 'Consultation call' },
                    { label: 'Date', value: 'Friday, May 16' },
                    { label: 'Time', value: '2:30 PM' },
                  ].map((field, index) => (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="rounded-2xl border border-white/[0.08] bg-black/40 p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.16em] text-white/35">{field.label}</div>
                      <div className="mt-2 text-sm font-medium text-white/85">{field.value}</div>
                    </motion.div>
                  ))}

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {['10:00', '11:30', '2:30'].map((slot, index) => (
                      <motion.div
                        key={slot}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                        className={`rounded-xl border px-3 py-3 text-center text-sm ${
                          slot === '2:30'
                            ? 'border-white text-black bg-white'
                            : 'border-white/[0.08] bg-white/[0.03] text-white/65'
                        }`}
                      >
                        {slot}
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-medium text-black">
                      Confirm booking
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
                    <div className="text-sm text-white/40">Admin View</div>
                    <div className="mt-1 text-lg font-medium">Today’s appointments</div>
                  </div>
                  <div className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/45">
                    Private
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Sarah Thompson', type: 'Hair appointment', time: '10:30 AM', status: 'Confirmed' },
                    { name: 'Michael Reed', type: 'Consultation', time: '1:00 PM', status: 'Pending' },
                    { name: 'Emily Carter', type: 'Follow-up session', time: '3:30 PM', status: 'Paid' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-white/70">
                        {item.name.charAt(0)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{item.name}</div>
                        <div className="truncate text-xs text-white/45">{item.type}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-white/45">{item.time}</div>
                        <div className="mt-1 text-xs font-medium text-white/75">{item.status}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/50">
                <Settings2 className="h-3.5 w-3.5" />
                Internal System
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Not just client booking. Full control behind the scenes.
              </h2>

              <p className="mt-5 text-white/55">
                We can build the system around your exact workflow — confirmations, status updates,
                intake questions, payment steps, schedule blocks, and team management.
              </p>

              <div className="mt-8 space-y-4">
                {systemBlocks.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] text-white/70">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/50">{item.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
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
                Who this is perfect for
              </h2>
              <p className="mt-4 max-w-xl text-white/55">
                If your business books time, visits, sessions, calls, services, or appointments,
                this system can be shaped around it.
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
              <h3 className="text-xl font-medium">Business outcomes</h3>
              <p className="mt-3 text-sm leading-7 text-white/50">
                A professional booking system is not only about looking better. It changes how the
                business operates day to day.
              </p>

              <div className="mt-8 space-y-4">
                {outcomes.map((item, index) => (
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

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-white/60" />
                    Less manual handling
                  </div>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Fewer calls, fewer back-and-forth messages, more structure.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="h-4 w-4 text-white/60" />
                    Better communication
                  </div>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Confirmation and reminder flows keep both sides clear.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-white/80">
              <Zap className="h-5 w-5" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Want a booking system built around your business?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/55">
              We can design and build a premium appointment system that fits your services,
              schedule, client flow, and future growth — without making it look cheap or generic.
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
