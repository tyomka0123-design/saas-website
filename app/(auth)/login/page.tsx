'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { AnimatedBackground } from '@/components/animated-background'
import { login } from '../actions'
import { toast } from 'sonner'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    const result = await login(formData)

    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
              <Link href="/" className="mb-6 inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <svg viewBox="0 0 76 65" className="h-5 w-5 text-black" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>

                <span className="text-xl font-semibold tracking-tight text-white">
                  Apex Studio
                </span>
              </Link>

              <h1 className="mb-2 text-2xl font-bold text-white">Welcome back</h1>
              <p className="text-white/50">Sign in to access your dashboard</p>
            </div>

            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>

                  <Link
                    href="#"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 pr-12 text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              {"Don't have an account? "}
              <Link href="/register" className="text-white hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}
