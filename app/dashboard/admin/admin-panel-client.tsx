'use client'

import { useMemo, useState } from 'react'
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Mail,
  Search,
  Shield,
  Users,
  X,
  SlidersHorizontal,
  ExternalLink,
  ReceiptText,
} from 'lucide-react'
import { updateOrder, updateUserProfile } from './actions'
import { StatusBadge } from '@/components/dashboard/status-badge'

const statuses = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_review', label: 'In Review' },
  { value: 'invoice_sent', label: 'Invoice Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

const editableStatuses = statuses.filter((s) => s.value !== 'all')

function money(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function AdminPanelClient({
  orders,
  profiles,
  user,
}: {
  orders: any[]
  profiles: any[]
  user: any
}) {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [usersOpen, setUsersOpen] = useState(false)
  const [orderSearch, setOrderSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [userSearch, setUserSearch] = useState('')

  const profilesById = new Map(profiles.map((p) => [p.id, p]))

  const filteredOrders = useMemo(() => {
    const q = orderSearch.toLowerCase()

    return orders.filter((order) => {
      const client = profilesById.get(order.user_id)

      const matchesSearch =
        order.business_name?.toLowerCase().includes(q) ||
        order.contact_email?.toLowerCase().includes(q) ||
        order.website_type?.toLowerCase().includes(q) ||
        order.description?.toLowerCase().includes(q) ||
        client?.full_name?.toLowerCase().includes(q) ||
        client?.email?.toLowerCase().includes(q)

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, orderSearch, statusFilter, profilesById])

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase()

    return profiles.filter((profile) => {
      return (
        profile.full_name?.toLowerCase().includes(q) ||
        profile.email?.toLowerCase().includes(q) ||
        profile.role?.toLowerCase().includes(q)
      )
    })
  }, [profiles, userSearch])

  const totalOrders = orders.length
  const paidOrders = orders.filter((o) => o.paid).length
  const unpaidOrders = totalOrders - paidOrders
  const activeOrders = orders.filter((o) =>
    ['pending', 'in_review', 'invoice_sent', 'in_progress'].includes(o.status)
  ).length

  const totalRevenue = orders.reduce((sum, order) => {
    if (!order.paid) return sum
    return sum + Number(order.quote_price || 0)
  }, 0)

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card/70 p-5">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground mb-3">
              <Shield className="w-3.5 h-3.5" />
              Founder workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Manage orders, clients, quotes, invoices, payments, and project progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setUsersOpen(true)}
              className="h-10 rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Manage Users
            </button>

            <div className="h-10 rounded-lg border border-border bg-background px-4 text-sm flex items-center gap-2 text-muted-foreground">
              <span>{user.fullName}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard label="Orders" value={totalOrders} icon={BriefcaseBusiness} />
        <StatCard label="Active" value={activeOrders} icon={Clock3} />
        <StatCard label="Paid" value={paidOrders} icon={CheckCircle2} />
        <StatCard label="Revenue" value={money(totalRevenue)} icon={DollarSign} />
      </section>

      <section className="rounded-2xl border border-border bg-card/70 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Orders</h2>
              <p className="text-sm text-muted-foreground">
                {filteredOrders.length} shown · {totalOrders} total · {unpaidOrders} unpaid
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="h-10 rounded-lg border border-border bg-background px-3 flex items-center gap-2 min-w-[260px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search orders..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <div className="h-10 rounded-lg border border-border bg-background px-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent outline-none text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:grid grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr_0.4fr] px-5 py-3 border-b border-border text-xs text-muted-foreground">
          <span>Project</span>
          <span>Client</span>
          <span>Email</span>
          <span>Status</span>
          <span>Quote</span>
          <span></span>
        </div>

        <div className="divide-y divide-border">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const client = profilesById.get(order.user_id)

              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full text-left px-5 py-4 hover:bg-secondary/40 transition-colors grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr_0.4fr] gap-3 xl:items-center"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {order.business_name || 'Untitled project'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {order.website_type || 'Website project'} · {order.budget || 'No budget'}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground truncate">
                    {client?.full_name || 'Unknown'}
                  </p>

                  <p className="text-sm text-muted-foreground truncate">
                    {order.contact_email || client?.email || 'No email'}
                  </p>

                  <div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {order.quote_price ? money(Number(order.quote_price)) : '—'}
                  </div>

                  <div className="flex xl:justify-end">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              )
            })
          ) : (
            <div className="py-16 text-center">
              <ReceiptText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          client={profilesById.get(selectedOrder.user_id)}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {usersOpen && (
        <UsersModal
          profiles={filteredUsers}
          orders={orders}
          search={userSearch}
          setSearch={setUserSearch}
          onClose={() => setUsersOpen(false)}
        />
      )}
    </div>
  )
}

function OrderModal({
  order,
  client,
  onClose,
}: {
  order: any
  client: any
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {order.business_name || 'Untitled project'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {client?.full_name || 'Unknown client'} · {order.contact_email || client?.email || 'No email'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg border border-border hover:bg-secondary flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={updateOrder} className="p-5 space-y-5">
          <input type="hidden" name="id" value={order.id} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <MiniBox label="Type" value={order.website_type || '—'} />
            <MiniBox label="Budget" value={order.budget || '—'} />
            <MiniBox label="Pages" value={order.pages || '—'} />
            <MiniBox label="Deadline" value={order.deadline || '—'} />
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-2">Description</p>
            <p className="text-sm whitespace-pre-wrap">
              {order.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <select
                name="status"
                defaultValue={order.status}
                className="w-full h-11 rounded-lg border border-border bg-card px-3 outline-none"
              >
                {editableStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Quote Price</span>
              <input
                name="quote_price"
                type="number"
                step="0.01"
                defaultValue={order.quote_price || ''}
                className="w-full h-11 rounded-lg border border-border bg-card px-3 outline-none"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 h-11">
              <input
                name="invoice_sent"
                type="checkbox"
                defaultChecked={order.invoice_sent}
                className="accent-white"
              />
              Invoice Sent
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 h-11">
              <input
                name="paid"
                type="checkbox"
                defaultChecked={order.paid}
                className="accent-white"
              />
              Paid
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-sm text-muted-foreground">Private Admin Notes</span>
            <textarea
              name="admin_notes"
              defaultValue={order.admin_notes || ''}
              placeholder="Private notes..."
              className="min-h-[120px] w-full rounded-lg border border-border bg-card px-3 py-2 outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-white text-black font-semibold hover:bg-white/85 transition-colors"
          >
            Save Order
          </button>
        </form>
      </div>
    </div>
  )
}

function UsersModal({
  profiles,
  orders,
  search,
  setSearch,
  onClose,
}: {
  profiles: any[]
  orders: any[]
  search: string
  setSearch: (value: string) => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-sm text-muted-foreground">
              Search, review, and update user access.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg border border-border hover:bg-secondary flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 h-11">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-border">
          {profiles.map((profile) => {
            const userOrders = orders.filter((order) => order.user_id === profile.id)
            const userPaidOrders = userOrders.filter((order) => order.paid).length

            return (
              <form
                key={profile.id}
                action={updateUserProfile}
                className="p-5 grid lg:grid-cols-[1fr_1fr_auto] gap-4 items-end hover:bg-secondary/40"
              >
                <input type="hidden" name="id" value={profile.id} />

                <div>
                  <p className="font-semibold">{profile.full_name || 'No name'}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    {profile.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {userOrders.length} orders · {userPaidOrders} paid · {profile.role}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    name="full_name"
                    defaultValue={profile.full_name || ''}
                    className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none"
                  />

                  <select
                    name="role"
                    defaultValue={profile.role}
                    className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="h-10 rounded-lg bg-white text-black px-5 text-sm font-semibold hover:bg-white/85"
                >
                  Save
                </button>
              </form>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

function InfoSmall({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  )
}

function MiniBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  )
}
