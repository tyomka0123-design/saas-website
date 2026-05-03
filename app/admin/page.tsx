import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  Mail,
  Pencil,
  ReceiptText,
  Shield,
  Sparkles,
  UserCog,
  Users,
  WalletCards,
} from 'lucide-react'
import { updateOrder, updateUserProfile } from './actions'
import { StatusBadge } from '@/components/dashboard/status-badge'
import type { OrderStatus } from '@/lib/supabase/types'

const statuses: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_review', label: 'In Review' },
  { value: 'invoice_sent', label: 'Invoice Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

function money(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isAdmin = user.email === 'artpas01@gmail.com'

  if (!isAdmin) {
    redirect('/dashboard')
  }

  const { data: ordersData } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: profilesData } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const orders = ordersData || []
  const profiles = profilesData || []

  const profilesById = new Map(profiles.map((profile) => [profile.id, profile]))

  const totalOrders = orders.length
  const paidOrders = orders.filter((order) => order.paid).length
  const unpaidOrders = totalOrders - paidOrders
  const activeOrders = orders.filter((order) =>
    ['pending', 'in_review', 'invoice_sent', 'in_progress'].includes(order.status)
  ).length

  const totalRevenue = orders.reduce((sum, order) => {
    if (!order.paid) return sum
    return sum + Number(order.quote_price || 0)
  }, 0)

  const potentialRevenue = orders.reduce((sum, order) => {
    return sum + Number(order.quote_price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%)]" />

      <main className="relative px-4 sm:px-6 lg:px-10 py-8 space-y-8">
        <div className="flex flex-col gap-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-4">
                <Sparkles className="w-4 h-4 text-white" />
                Founder Control Center
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Admin Panel
              </h1>

              <p className="text-white/55 mt-4 max-w-2xl text-base sm:text-lg">
                Manage clients, website orders, payment status, invoices, project progress,
                quotes, and internal notes from one premium control room.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 min-w-[260px] shadow-[0_0_60px_rgba(255,255,255,0.06)]">
              <p className="text-sm text-white/45 mb-1">Founder</p>
              <p className="text-xl font-semibold">
                {user.user_metadata?.full_name || 'Artem Pasieka'}
              </p>
              <p className="text-sm text-white/45 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Total Orders</p>
                <p className="text-4xl font-bold mt-3">{totalOrders}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <BriefcaseBusiness className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Active Projects</p>
                <p className="text-4xl font-bold mt-3">{activeOrders}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Clock3 className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Paid Orders</p>
                <p className="text-4xl font-bold mt-3">{paidOrders}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Revenue</p>
                <p className="text-4xl font-bold mt-3">{money(totalRevenue)}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <DollarSign className="w-7 h-7" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center gap-3 mb-3">
              <WalletCards className="w-5 h-5" />
              <h2 className="font-semibold">Payment Overview</h2>
            </div>
            <p className="text-3xl font-bold">{money(potentialRevenue)}</p>
            <p className="text-sm text-white/45 mt-2">Potential revenue from quoted orders</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5" />
              <h2 className="font-semibold">Registered Users</h2>
            </div>
            <p className="text-3xl font-bold">{profiles.length}</p>
            <p className="text-sm text-white/45 mt-2">Total profiles inside your platform</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center gap-3 mb-3">
              <ReceiptText className="w-5 h-5" />
              <h2 className="font-semibold">Unpaid Orders</h2>
            </div>
            <p className="text-3xl font-bold">{unpaidOrders}</p>
            <p className="text-sm text-white/45 mt-2">Orders still waiting for payment</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <ReceiptText className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Client Orders</h2>
              </div>
              <p className="text-white/45 mt-2">
                Update status, mark invoices as sent, confirm payments, and keep private notes.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/60">
              {totalOrders} total / {unpaidOrders} unpaid
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => {
                const client = profilesById.get(order.user_id)

                return (
                  <form
                    key={order.id}
                    action={updateOrder}
                    className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 hover:border-white/25 hover:bg-white/[0.035] transition-all"
                  >
                    <input type="hidden" name="id" value={order.id} />

                    <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold">{order.business_name}</h3>
                          <StatusBadge status={order.status} />

                          {order.paid ? (
                            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">
                              Paid
                            </span>
                          ) : (
                            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                              Not Paid
                            </span>
                          )}

                          {order.invoice_sent && (
                            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                              Invoice Sent
                            </span>
                          )}
                        </div>

                        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs text-white/40">Client</p>
                            <p className="font-medium mt-1">
                              {client?.full_name || 'Unknown client'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs text-white/40">Email</p>
                            <p className="font-medium mt-1 truncate">
                              {order.contact_email || client?.email || 'No email'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs text-white/40">Type</p>
                            <p className="font-medium mt-1">{order.website_type}</p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs text-white/40">Budget</p>
                            <p className="font-medium mt-1">{order.budget}</p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-white/60" />
                            <p className="font-medium">Project Description</p>
                          </div>
                          <p className="text-sm text-white/55 whitespace-pre-wrap">
                            {order.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 text-sm text-white/50">
                          <div>Pages: {order.pages || 'Not specified'}</div>
                          <div>Deadline: {order.deadline || 'Not specified'}</div>
                          <div>Phone: {order.phone || 'Not provided'}</div>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 space-y-4">
                        <div className="flex items-center gap-2">
                          <Pencil className="w-4 h-4" />
                          <h4 className="font-semibold">Founder Controls</h4>
                        </div>

                        <label className="block space-y-2">
                          <span className="text-sm text-white/50">Project Status</span>
                          <select
                            name="status"
                            defaultValue={order.status}
                            className="w-full h-12 rounded-2xl border border-white/10 bg-black px-4 text-sm outline-none focus:border-white/40"
                          >
                            {statuses.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block space-y-2">
                          <span className="text-sm text-white/50">Quote Price</span>
                          <input
                            name="quote_price"
                            type="number"
                            step="0.01"
                            defaultValue={order.quote_price || ''}
                            placeholder="2500"
                            className="w-full h-12 rounded-2xl border border-white/10 bg-black px-4 text-sm outline-none focus:border-white/40"
                          />
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 h-12">
                            <input
                              name="invoice_sent"
                              type="checkbox"
                              defaultChecked={order.invoice_sent}
                              className="accent-white"
                            />
                            <span className="text-sm">Invoice</span>
                          </label>

                          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 h-12">
                            <input
                              name="paid"
                              type="checkbox"
                              defaultChecked={order.paid}
                              className="accent-white"
                            />
                            <span className="text-sm">Paid</span>
                          </label>
                        </div>

                        <label className="block space-y-2">
                          <span className="text-sm text-white/50">Private Admin Notes</span>
                          <textarea
                            name="admin_notes"
                            defaultValue={order.admin_notes || ''}
                            placeholder="Write internal notes..."
                            className="min-h-[130px] w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-white/40"
                          />
                        </label>

                        <button
                          type="submit"
                          className="w-full h-12 rounded-2xl bg-white text-black font-semibold hover:bg-white/85 transition-all shadow-[0_0_30px_rgba(255,255,255,0.14)]"
                        >
                          Save Order
                        </button>
                      </div>
                    </div>
                  </form>
                )
              })
            ) : (
              <div className="py-16 text-center">
                <ReceiptText className="w-12 h-12 mx-auto text-white/25 mb-4" />
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-white/45 mt-2">Client orders will appear here.</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <UserCog className="w-6 h-6" />
              <h2 className="text-2xl font-bold">User Management</h2>
            </div>
            <p className="text-white/45 mt-2">
              View registered clients and control basic profile access.
            </p>
          </div>

          <div className="p-4 sm:p-6 grid gap-4">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                const userOrders = orders.filter((order) => order.user_id === profile.id)
                const userPaidOrders = userOrders.filter((order) => order.paid).length

                return (
                  <form
                    key={profile.id}
                    action={updateUserProfile}
                    className="rounded-3xl border border-white/10 bg-black/40 p-5 grid xl:grid-cols-[1fr_1fr_auto] gap-4 items-end hover:border-white/25 transition-all"
                  >
                    <input type="hidden" name="id" value={profile.id} />

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                          {(profile.full_name || profile.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{profile.full_name || 'No name'}</p>
                          <div className="flex items-center gap-2 text-sm text-white/45">
                            <Mail className="w-3.5 h-3.5" />
                            {profile.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                          {userOrders.length} orders
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                          {userPaidOrders} paid
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                          {profile.role}
                        </span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="block space-y-2">
                        <span className="text-sm text-white/50">Full Name</span>
                        <input
                          name="full_name"
                          defaultValue={profile.full_name || ''}
                          className="w-full h-12 rounded-2xl border border-white/10 bg-black px-4 text-sm outline-none focus:border-white/40"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-white/50">Role</span>
                        <select
                          name="role"
                          defaultValue={profile.role}
                          className="w-full h-12 rounded-2xl border border-white/10 bg-black px-4 text-sm outline-none focus:border-white/40"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="h-12 rounded-2xl bg-white text-black px-6 font-semibold hover:bg-white/85 transition-all"
                    >
                      Save User
                    </button>
                  </form>
                )
              })
            ) : (
              <div className="py-16 text-center">
                <Shield className="w-12 h-12 mx-auto text-white/25 mb-4" />
                <p className="text-lg font-medium">No users found</p>
                <p className="text-white/45 mt-2">Registered profiles will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
