'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, Eye, EyeOff, Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatedBackground } from '@/components/animated-background'
import { register } from '../actions'
import { toast } from 'sonner'

const countries = [
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine' },
  { flag: '🇮🇪', code: '+353', name: 'Ireland' },
  { flag: '🇩🇪', code: '+49', name: 'Germany' },
  { flag: '🇫🇷', code: '+33', name: 'France' },
  { flag: '🇮🇹', code: '+39', name: 'Italy' },
  { flag: '🇪🇸', code: '+34', name: 'Spain' },
  { flag: '🇵🇱', code: '+48', name: 'Poland' },
  { flag: '🇳🇱', code: '+31', name: 'Netherlands' },
  { flag: '🇧🇪', code: '+32', name: 'Belgium' },
  { flag: '🇨🇭', code: '+41', name: 'Switzerland' },
  { flag: '🇦🇹', code: '+43', name: 'Austria' },
  { flag: '🇸🇪', code: '+46', name: 'Sweden' },
  { flag: '🇳🇴', code: '+47', name: 'Norway' },
  { flag: '🇩🇰', code: '+45', name: 'Denmark' },
  { flag: '🇫🇮', code: '+358', name: 'Finland' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇳🇿', code: '+64', name: 'New Zealand' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates' },
  { flag: '🇹🇷', code: '+90', name: 'Turkey' },
  { flag: '🇮🇱', code: '+972', name: 'Israel' },
  { flag: '🇯🇵', code: '+81', name: 'Japan' },
  { flag: '🇰🇷', code: '+82', name: 'South Korea' },
  { flag: '🇨🇳', code: '+86', name: 'China' },
  { flag: '🇮🇳', code: '+91', name: 'India' },
  { flag: '🇧🇷', code: '+55', name: 'Brazil' },
  { flag: '🇲🇽', code: '+52', name: 'Mexico' },
  { flag: '🇦🇷', code: '+54', name: 'Argentina' },
]

function CornerPlus({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 0V16" stroke="currentColor" strokeWidth="1" />
      <path d="M0 8H16" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function CountryDropdown({
  value,
  onChange,
  type = 'phone',
}: {
  value: (typeof countries)[number]
  onChange: (country: (typeof countries)[number]) => void
  type?: 'phone' | 'country'
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return countries.filter((country) =>
      `${country.name} ${country.code}`.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-md border border-white/[0.14] bg-black px-3 text-left text-sm text-white outline-none transition hover:border-white/[0.25]"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span>{value.flag}</span>
          <span className="font-medium">{type === 'phone' ? value.code : value.name}</span>
          {type === 'phone' && <span className="truncate text-white/45">{value.name}</span>}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-white/45" />
      </button>

      {open && (
  <div className="absolute left-0 top-[56px] z-50 w-full min-w-[280px] overflow-hidden rounded-2xl border border-white/[0.14] bg-black shadow-[0_20px_80px_rgba(0,0,0,0.8)] md:w-[340px]">
          <div className="border-b border-white/[0.1] p-3">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-white/[0.18] px-3">
              <Search className="h-4 w-4 text-white/35" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          <div className="max-h-[290px] overflow-y-auto">
            {filtered.map((country) => (
              <button
                key={`${country.name}-${country.code}`}
                type="button"
                onClick={() => {
                  onChange(country)
                  setOpen(false)
                  setSearch('')
                }}
                className="flex w-full items-center gap-3 border-b border-white/[0.08] px-4 py-4 text-left text-sm transition hover:bg-white/[0.06]"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="font-semibold text-white">{country.code}</span>
                <span className="text-white/70">{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phoneCountry, setPhoneCountry] = useState(countries[0])
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  async function handleSubmit(formData: FormData) {
    const password = String(formData.get('password') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    formData.set('phoneCode', phoneCountry.code)
    formData.set('country', selectedCountry.name)

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
        <div className="relative grid w-full overflow-visible border border-white/[0.12] bg-black/80 md:grid-cols-[1.05fr_0.95fr]">
          <div className="pointer-events-none absolute left-0 top-0 hidden h-[92px] w-full border-b border-white/[0.1] md:grid md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.07] last:border-r-0" />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[92px] w-full border-t border-white/[0.1] md:grid md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/[0.07] last:border-r-0" />
            ))}
          </div>

          <CornerPlus className="pointer-events-none absolute -left-[8px] top-[84px] z-20 hidden h-4 w-4 text-white/65 md:block" />
          <CornerPlus className="pointer-events-none absolute -bottom-[8px] -right-[8px] z-20 hidden h-4 w-4 text-white/65 md:block" />

          <div className="relative p-8 pt-28 md:min-h-[720px] md:border-r md:border-white/[0.1] md:p-12 md:pt-36">
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
            className="relative bg-[#050505]/90 p-8 md:min-h-[720px] md:p-12 md:pt-36"
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
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-12 border-white/[0.14] bg-black text-white placeholder:text-white/30 focus-visible:ring-white/35" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/85">Your name</Label>
                  <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required className="h-12 border-white/[0.14] bg-black text-white placeholder:text-white/30 focus-visible:ring-white/35" />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/85">
                    Phone <span className="text-white/35">(optional)</span>
                  </Label>
                  <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
                    <CountryDropdown value={phoneCountry} onChange={setPhoneCountry} type="phone" />
                    <Input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Phone number"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                      }}
                      className="h-12 border-white/[0.14] bg-black text-white placeholder:text-white/30 focus-visible:ring-white/35"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/85">Country</Label>
                <CountryDropdown value={selectedCountry} onChange={setSelectedCountry} type="country" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/85">Password</Label>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Create password" required minLength={8} className="h-12 border-white/[0.14] bg-black pr-10 text-white placeholder:text-white/30 focus-visible:ring-white/35" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/85">Confirm password</Label>
                  <div className="relative">
                    <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Repeat password" required minLength={8} className="h-12 border-white/[0.14] bg-black pr-10 text-white placeholder:text-white/30 focus-visible:ring-white/35" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/35">Password must be at least 8 characters</p>

              <Button type="submit" disabled={isLoading} className="h-12 w-full rounded-full bg-white font-semibold text-black hover:bg-white/90">
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
