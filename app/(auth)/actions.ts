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

  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existingUser) {
    return { error: 'Account with this email already exists' }
  }

  const { error } = await supabase.from('profiles').insert({
    full_name: fullName,
    email,
    password,
    phone_code: phoneCode,
    phone,
    country,
    role: 'client',
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login')
}

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .eq('password', password)
    .maybeSingle()

  if (error || !data) {
    return { error: 'Invalid email or password' }
  }

  redirect('/dashboard')
}

export async function logout() {
  redirect('/login')
}
