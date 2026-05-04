'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const fullName = String(formData.get('fullName') || '')
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const phoneCode = String(formData.get('phoneCode') || '')
  const phone = String(formData.get('phone') || '')
  const country = String(formData.get('country') || '')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 🔐 створюємо юзера
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
  })

  if (error || !data.user) {
    return { error: error?.message || 'Could not create account' }
  }

  // 👤 запис у profiles
  const { error: profileError } = await supabase.from('profiles').insert({
    id: data.user.id,
    full_name: fullName,
    email,
    phone_code: phoneCode,
    phone,
    country,
  })

  if (profileError) {
    return { error: profileError.message }
  }

  // 🚀 редірект
  redirect('/login')
}

export async function logout() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  await supabase.auth.signOut()

  redirect('/login')
}
