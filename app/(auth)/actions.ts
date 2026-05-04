'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function register(formData: FormData) {
  const fullName = String(formData.get('fullName') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  const phoneCode = String(formData.get('phoneCode') || '')
  const phone = String(formData.get('phone') || '')
  const country = String(formData.get('country') || '')

  if (!fullName || !email || !password) {
    return { error: 'Please fill in all required fields' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (signUpError) {
    return { error: signUpError.message }
  }

  const user = signUpData.user

  if (!user) {
    return { error: 'User was not created' }
  }

  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    full_name: fullName,
    email,
    phone_code: phoneCode,
    phone,
    country,
  })

  if (profileError) {
    return { error: profileError.message }
  }

  redirect('/login')
}

export async function login(formData: FormData) {
  redirect('/dashboard')
}

export async function logout() {
  redirect('/login')
}
