'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { AnimatedBackground } from '@/components/animated-background'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (success) {
        toast.success('Welcome back!')
        router.push('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
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
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>

          {/* Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <svg viewBox="0 0 76 65" className="h-5 w-5 text-black" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
                <span className="font-semibold text-xl tracking-tight text-white">Apex Studio</span>
              </Link>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-white/50">Sign in to access your dashboard</p>
            </div>

            {/* Demo hint */}
            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-400">
                <strong>Demo Mode:</strong> Enter any email and password to log in. Use <code className="bg-blue-500/20 px-1 rounded">artpas01@gmail.com</code> to access the Founder dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                  <Link
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl bg-white text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-white/50 mt-6">
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
