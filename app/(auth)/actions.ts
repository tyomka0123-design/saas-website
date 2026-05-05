'use server'

import { redirect } from 'next/navigation'

// Demo mode - these actions simulate what would happen with a real database
// Replace with actual Supabase calls when you connect the database

export async function register(formData: FormData) {
  const fullName = String(formData.get('fullName') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  if (!fullName || !email || !password) {
    return { error: 'Please fill in all required fields' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  // In demo mode, just redirect to login
  // The client-side auth context will handle the actual "registration"
  redirect('/login?registered=true')
}

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  // In demo mode, redirect to dashboard
  // The client-side auth context handles actual login
  redirect('/dashboard')
}

export async function logout() {
  redirect('/login')
}
