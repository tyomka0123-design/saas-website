'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatedBackground } from '@/components/animated-background'
import { register } from '../actions'
import { toast } from 'sonner'

const phoneCountries = [
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine' },
  { flag: '🇩🇪', code: '+49', name: 'Germany' },
  { flag: '🇫🇷', code: '+33', name: 'France' },
  { flag: '🇵🇱', code: '+48', name: 'Poland' },
  { flag: '🇮🇹', code: '+39', name: 'Italy' },
  { flag: '🇪🇸', code: '+34', name: 'Spain' },
  { flag: '🇳🇱', code: '+31', name: 'Netherlands' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates' },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    formData.set('phoneCode', phoneCountry.code)

    const result = await register(formData)

    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] items-center px-4 py-24">
        <div className="relative grid w-full border border-white/[0.12] bg-black/75 md:grid-cols-[1.05fr_0.95fr]">
          <div className="pointer-events-none absolute left-0 top-0 hidden h-[92px] w-full border-b border-white/[0.1] md:grid md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.08] last:border-r-0" />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[92px] w-full border-t border-white/[0.1] md:grid md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.08] last:border-r-0" />
            ))}
          </div>

          <svg className="pointer-events-none absolute -left-[8px] top-[84px] z-20 hidden h-4 w-4 text-white/70 md:block" viewBox="0 0 16 16" fill="none">
            <path d="M8 0V16" stroke="currentColor" strokeWidth="1" />
            <path d="M0 8H16" stroke="currentColor" strokeWidth="1" />
          </svg>

          <svg className="pointer-events-none absolute -bottom-[8px] -right-[8px] z-20 hidden h-4 w-4 text-white/70 md:block" viewBox="0 0 16 16" fill="none">
            <path d="M8 0V16" stroke="currentColor" strokeWidth="1" />
            <path d="M0 8H16" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="border-b border-white/[0.1] p-8 pt-28 md:min-h-[720px] md:border-b-0 md:border-r md:p-12 md:pt-36">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <h1 className="max-w-[430px] text-[42px] font-bold leading-[0.98] tracking-[-0.055em] md:text-[56px]">
              Create your
              <br />
              Apex Studio
              <br />
              account.
            </h1>

            <div className="mt-10 space-y-8 text-[15px] leading-7 text-white/55">
              {[
                ['Track your project.', 'See updates, progress, and next steps inside your dashboard.'],
                ['Work faster.', 'Share files, requirements, and feedback in one clean place.'],
                ['Premium client access.', 'Built for serious brands and custom web projects.'],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-white" />
                  <p>
                    <span className="text-white">{title}</span> {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-2 border-t border-white/[0.1] pt-8">
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em]">24/7</p>
                <p className="mt-2 text-sm text-white/40">Dashboard access</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em]">Fast</p>
                <p className="mt-2 text-sm text-white/40">Project updates</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative bg-[#050505]/90 p-8 pt-10 shadow-[0_0_80px_rgba(255,255,255,0.035)] md:min-h-[720px] md:p-12 md:pt-36"
          >
            <div className="mb-8">
              <Link href="/" className="mb-8 inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-black">
                  <span className="text-lg font-bold">A</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">Apex Studio</span>
              </Link>

              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                Register your account
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Enter your details and we’ll set up your client dashboard.
              </p>
            </div>

            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/85">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="h-12 border-white/[0.14] bg-black text-white placeholder:text-white/30 focus-visible:ring-white/35"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/85">Your name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                    className="h-12 border-white/[0.14] bg-black text-white placeholder:text-white/30 focus-visible:ring-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/85">
                    Phone number <span className="text-white/35">(optional)</span>
                  </Label>

                  <div className="flex h-12 overflow-hidden rounded-md border border-white/[0.14] bg-black focus-within:ring-2 focus-within:ring-white/35">
                    <select
                      value={phoneCountry.code + phoneCountry.name}
                      onChange={(e) => {
                        const selected = phoneCountries.find(
                          (country) => country.code + country.name === e.target.value
                        )
                        if (selected) setPhoneCountry(selected)
                      }}
                      className="w-[92px] border-r border-white/[0.14] bg-black px-2 text-sm text-white outline-none"
                    >
                      {phoneCountries.map((country) => (
                        <option key={country.code + country.name} value={country.code + country.name}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="6045550123"
                      autoComplete="tel"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                      }}
                      className="h-full border-0 bg-black text-white placeholder:text-white/30 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white/85">Country</Label>
                <select
                  id="country"
                  name="country"
                  defaultValue="Canada"
                  className="h-12 w-full rounded-md border border-white/[0.14] bg-black px-3 text-sm text-white outline-none focus:ring-2 focus:ring-white/35"
                >
                  {phoneCountries.map((country) => (
                    <option key={country.name}>{country.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/85">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    className="h-12 border-white/[0.14] bg-black pr-10 text-white placeholder:text-white/30 focus-visible:ring-white/35"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-white/35">Must be at least 8 characters</p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-full bg-white font-semibold text-black transition hover:bg-white/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>

            <div className="mt-8 border-t border-white/[0.1] pt-6">
              <p className="text-sm text-white/40">
                Already have an account?{' '}
                <Link href="/login" className="text-white hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
