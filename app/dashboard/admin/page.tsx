import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminPanelClient } from './admin-panel-client'

export default async function DashboardAdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  if (user.email !== 'artpas01@gmail.com') redirect('/dashboard')

  const { data: ordersData } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: profilesData } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminPanelClient
      orders={ordersData || []}
      profiles={profilesData || []}
      user={{
        email: user.email,
        fullName: user.user_metadata?.full_name || 'Artem Pasieka',
      }}
    />
  )
}
