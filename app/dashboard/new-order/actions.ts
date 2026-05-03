'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface OrderFormData {
  businessName: string
  websiteType: string
  budget: string
  deadline: string
  pages: string
  designStyle: string
  features: string[]
  description: string
  contactEmail: string
  phone: string
  references: string
}

export async function createOrder(data: OrderFormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      business_name: data.businessName,
      website_type: data.websiteType,
      budget: data.budget,
      deadline: data.deadline || null,
      pages: data.pages || null,
      design_style: data.designStyle || null,
      features: data.features,
      description: data.description,
      contact_email: data.contactEmail,
      phone: data.phone || null,
      references: data.references || null,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/orders')
  redirect('/dashboard/orders')
}
