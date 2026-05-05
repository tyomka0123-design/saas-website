import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    'Artem Pasieka'

  const founderEmail = process.env.NEXT_PUBLIC_FOUNDER_EMAIL?.toLowerCase()
  const isAdmin = user.email?.toLowerCase() === founderEmail

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isAdmin={isAdmin}
        userName={fullName}
        userEmail={user.email}
      />
      <main className="lg:pl-72 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
