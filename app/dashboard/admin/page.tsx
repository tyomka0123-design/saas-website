'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { AdminPanelClient } from './admin-panel-client'

export default function DashboardAdminPage() {
  const router = useRouter()
  const { user, canAccessAdmin, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !canAccessAdmin())) {
      router.push('/dashboard')
    }
  }, [user, isLoading, canAccessAdmin, router])

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-white animate-spin"></div>
          </div>
          <p className="text-white/50 text-sm">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || !canAccessAdmin()) {
    return null
  }

  return <AdminPanelClient />
}
