'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Cloud,
  Gauge,
  Globe,
  Rocket,
  Shield,
  Zap,
} from 'lucide-react'

type PlanKey = 'hobby' | 'pro' | 'enterprise'

type FeatureRow = {
  label: string
  hobby: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}

type FeatureSection = {
  eyebrow: string
  title: string
  description: string
  groups: {
    title: string
    rows: FeatureRow[]
  }[]
}

const topPlans = [
  {
    key: 'hobby' as const,
    title: 'Hobby',
    subtitle: 'The perfect starting place for your web app or personal project.',
    price: 'Free forever.',
    button: 'Start Project',
    buttonStyle:
      'border border-white/[0.12] bg-black text-white hover:bg-white/[0.04]',
    features: [
      'Import your repo, deploy in seconds',
      'Automatic CI/CD',
      'Web Application Firewall',
      'Global, automated CDN',
      'Fluid compute',
      'DDoS Mitigation',
      'Traffic & performance insights',
    ],
  },
  {
    key: 'pro' as const,
    title: 'Pro',
    badge: 'Popular',
    subtitle: 'Everything you need to build and scale your app.',
    price: '$20/mo + additional usage',
    button: 'Start a free trial',
    buttonStyle: 'bg-[#0A84FF] text-white hover:bg-[#117df0]',
    features: [
      '$20 of included usage credit',
      'Advanced spend management',
      'Team collaboration',
      'Faster builds + no queues',
      'Cold start prevention',
      'Enterprise add-ons',
    ],
  },
  {
    key: 'enterprise' as const,
    title: 'Enterprise',
    subtitle:
      'Critical security, performance, observability, platform SLAs, and support.',
    price: 'Custom',
    button: 'Get a demo',
    secondaryButton: 'Request Trial',
    buttonStyle: 'bg-white text-black hover:bg-white/90',
    features: [
      'Guest & Team access controls',
      'SCIM & Directory Sync',
      'Managed WAF Rulesets',
      'Multi-region compute & failover',
      '99.99% SLA',
      'Advanced Support',
    ],
  },
]

const sections: FeatureSection[] = [
  {
    eyebrow: 'Managed Infrastructure',
    title: 'Vercel Delivery Network',
    description: 'Ultra-fast, secure by default global application delivery.',
    groups: [
      {
        title: 'Vercel Network',
        rows: [
          { label: 'Global Points of Presence', hobby: true, pro: true, enterprise: true },
          { label: 'Vercel Regions', hobby: true, pro: true, enterprise: true },
          { label: 'Automatic Routing', hobby: true, pro: true, enterprise: true },
          { label: 'HTTPS Certificates', hobby: true, pro: true, enterprise: true },
          { label: 'TLS/SSL Encryption', hobby: true, pro: true, enterprise: true },
          { label: 'Traffic Load Balancing', hobby: true, pro: true, enterprise: true },
          { label: 'Private Inter-Region Network', hobby: true, pro: true, enterprise: true },
          { label: 'Automatic Region Failover', hobby: true, pro: true, enterprise: true },
        ],
      },
      {
        title: 'Configurable Routing',
        rows: [
          { label: 'Reverse Proxy', hobby: true, pro: true, enterprise: true },
          { label: 'Rewrites', hobby: true, pro: true, enterprise: true },
          { label: 'Redirects', hobby: true, pro: true, enterprise: true },
          { label: 'Middleware Support', hobby: true, pro: true, enterprise: true },
          { label: 'Edge Requests', hobby: '1M / month included', pro: '10M / month included', enterprise: 'Custom' },
          { label: 'Fast Data Transfer', hobby: '100 GB / month included', pro: '1TB / month included', enterprise: 'Custom' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Managed Infrastructure',
    title: 'Vercel Firewall',
    description: 'Customizable security to protect your applications.',
    groups: [
      {
        title: 'Web Application Firewall',
        rows: [
          { label: 'Custom Firewall Rules', hobby: 'Up to 3', pro: 'Up to 40', enterprise: 'Up to 1,000' },
          { label: 'IP Blocking', hobby: 'Up to 3', pro: 'Up to 100', enterprise: 'Up to 1,000' },
          { label: 'System Bypass Rules', hobby: '—', pro: 'Up to 25', enterprise: 'Up to 100' },
          { label: 'Rate Limiting', hobby: '1M allowed requests included / month', pro: 'Starting at $0.50 per 1M', enterprise: 'Custom' },
          { label: 'OWASP Core Ruleset (managed)', hobby: '—', pro: '—', enterprise: 'Custom' },
        ],
      },
      {
        title: 'Bot Management',
        rows: [
          { label: 'Automated DDoS Mitigation', hobby: true, pro: true, enterprise: true },
          { label: 'AI Bots (managed ruleset)', hobby: true, pro: true, enterprise: true },
          { label: 'Bot Protection (managed ruleset)', hobby: true, pro: true, enterprise: true },
          { label: 'BotID', hobby: 'Basic checks included', pro: '$1 per 1,000 Deep Analysis checks', enterprise: 'Custom' },
          { label: 'Attack Challenge Mode', hobby: true, pro: true, enterprise: true },
        ],
      },
    ],
  },
  {
    eyebrow: 'Managed Infrastructure',
    title: 'Content, Caching & Optimization',
    description: 'Store and cache content close to your customers.',
    groups: [
      {
        title: 'Content Delivery',
        rows: [
          { label: 'Zero-config CDN cache', hobby: true, pro: true, enterprise: true },
          { label: 'Automated Compression', hobby: true, pro: true, enterprise: true },
          { label: 'Background Revalidation', hobby: true, pro: true, enterprise: true },
          { label: 'Stale-While-Revalidate', hobby: true, pro: true, enterprise: true },
        ],
      },
      {
        title: 'Optimization',
        rows: [
          { label: 'ISR Reads', hobby: '1M / month included', pro: 'Starting at $0.40 per 1M', enterprise: 'Custom' },
          { label: 'ISR Writes', hobby: '200,000 / month included', pro: 'Starting at $4 per 1M', enterprise: 'Custom' },
          { label: 'Image Transformations', hobby: '5,000 / month included', pro: 'Starting at $0.05 per 1K', enterprise: 'Custom' },
          { label: 'Image Cache Reads', hobby: '300,000 / month included', pro: 'Starting at $0.40 per 1M', enterprise: 'Custom' },
          { label: 'Image Cache Writes', hobby: '100,000 / month included', pro: 'Starting at $4.00 per 1M', enterprise: 'Custom' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Managed Infrastructure',
    title: 'Vercel Compute',
    description: 'Dynamic, scalable functions to power your application.',
    groups: [
      {
        title: 'Vercel Functions',
        rows: [
          { label: 'Active CPU', hobby: '4 hours / month included', pro: 'Starting at $0.128 per hour', enterprise: 'Custom' },
          { label: 'Provisioned Memory', hobby: '360 GB-hrs / month included', pro: 'Starting at $0.0106 per GB-hour', enterprise: 'Custom' },
          { label: 'Invocations', hobby: '1M / month included', pro: 'Starting at $0.60 per 1M', enterprise: 'Custom' },
        ],
      },
      {
        title: 'Vercel Sandbox',
        rows: [
          { label: 'Active CPU', hobby: '5 hours / month included', pro: 'Starting at $0.128 per hour', enterprise: 'Custom' },
          { label: 'Provisioned Memory', hobby: '420 GB-hours / month included', pro: 'Starting at $0.0212 per GB-hr', enterprise: 'Custom' },
          { label: 'Creation', hobby: '5,000 / month included', pro: 'Starting at $0.60 per 1M', enterprise: 'Custom' },
          { label: 'Network', hobby: '20 GB / month included', pro: 'Starting at $0.15 per GB', enterprise: 'Custom' },
          { label: 'Concurrent Sandboxes', hobby: '10', pro: '2000', enterprise: 'Custom' },
        ],
      },
    ],
  },
]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="h-4 w-4 text-white/70" />
  }

  if (value === false) {
    return <span className="text-white/20">—</span>
  }

  return <span className="text-center text-sm leading-6 text-white/70">{value}</span>
}

function PlanButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-between rounded-full px-5 text-[15px] font-medium transition ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="ml-4 h-4 w-4" />
    </Link>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-black px-4 pb-28 pt-12 text-white">
      <div className="mx-auto max-w-[1100px] border-x border-white/[0.08]">
        <div className="border-b border-t border-white/[0.08] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[42px] font-semibold tracking-[-0.06em] md:text-[64px] md:leading-[1.02]">
              Find the right build for your business.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-white/50">
              Same Vercel-style structure, but adapted for Apex Studio packages and custom web development systems.
            </p>
          </div>
        </div>

        <div className="grid border-b border-white/[0.08] md:grid-cols-3">
          {topPlans.map((plan, index) => (
            <div
              key={plan.key}
              className={`relative border-white/[0.08] px-8 pb-8 pt-10 ${
                index !== topPlans.length - 1 ? 'md:border-r' : ''
              } ${plan.key === 'pro' ? 'bg-white/[0.02]' : ''}`}
            >
              {plan.badge && (
                <div className="absolute left-0 top-0 rounded-br-lg bg-white px-4 py-2 text-sm font-medium text-black">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-[22px] font-semibold">{plan.title}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/55">{plan.subtitle}</p>
              <p className="mt-2 text-[18px] font-medium text-white">{plan.price}</p>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-[3px]">
                      <Check className="h-4 w-4 text-white/75" />
                    </div>
                    <p className="text-[15px] leading-7 text-white/65">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <PlanButton
                  href={plan.key === 'enterprise' ? '/register' : '/register'}
                  className={plan.buttonStyle}
                >
                  {plan.button}
                </PlanButton>

                {plan.secondaryButton && (
                  <Link
                    href="/register"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04]"
                  >
                    {plan.secondaryButton}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-b border-white/[0.08] px-8 py-12 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.03em] md:text-[22px]">
                Stay in control of your spending.
                <span className="font-normal text-white/55">
                  {' '}
                  Choose the package that fits now, then scale into portals, payments, automations, and custom logic later.
                </span>
              </h3>

                            <Link
                href="/register"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] md:w-fit"
              >
                Learn about scaling
              </Link>
            </div>

            <div className="relative h-[180px] rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="absolute inset-x-6 top-6 h-[2px] rounded-full bg-[#0A84FF]" />
              <div className="absolute left-6 top-4 rounded-full border border-[#0A84FF] bg-[#0A84FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#72AEFF]">
                LIMIT
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3">
                {[22, 44, 78, 112, 132, 148, 148, 148].map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md border ${
                      i >= 5
                        ? 'border-[#0A84FF] bg-[#0A84FF]/10'
                        : 'border-white/[0.18] bg-white/[0.03]'
                    }`}
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/[0.08] px-8 py-12 md:px-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:52px_52px]" />

              <div className="relative flex h-full items-end gap-6">
                {[
                  { label: '3s', active: true, h: 116 },
                  { label: 'idle', active: false, h: 150 },
                  { label: '2s', active: true, h: 86 },
                  { label: 'idle', active: false, h: 150 },
                  { label: '1.5s', active: true, h: 58 },
                  { label: 'idle', active: false, h: 150 },
                  { label: '3s', active: true, h: 40 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex w-full items-end justify-center rounded-md border ${
                      item.active
                        ? 'border-[#0A84FF] bg-[#0A84FF]/10'
                        : 'border-white/[0.08] bg-white/[0.03]'
                    }`}
                    style={{ height: item.h }}
                  >
                    <span
                      className={`mb-3 rounded-md px-2 py-1 text-xs ${
                        item.active
                          ? 'border border-[#0A84FF] bg-[#0A84FF]/10 text-[#72AEFF]'
                          : 'text-white/30'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.03em] md:text-[22px]">
                No idle time. No wasted spend.
                <span className="font-normal text-white/55">
                  {' '}
                  Pay for the package and functionality you actually need — from clean websites to advanced systems with dashboards and automation.
                </span>
              </h3>

              <Link
                href="/register"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] md:w-fit"
              >
                Learn about advanced builds
              </Link>
            </div>
          </div>
        </div>

        <div className="sticky top-14 z-20 border-b border-white/[0.08] bg-black/95 backdrop-blur">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="border-r border-white/[0.08] px-6 py-5 text-[14px] text-white/55">
              Features
            </div>

            <div className="border-r border-white/[0.08] px-6 py-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold">Basic</span>
                <Link
                  href="/register"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-white/[0.12] bg-black px-4 text-[14px] font-medium text-white/80 transition hover:bg-white/[0.04]"
                >
                  Start Project
                </Link>
              </div>
            </div>

            <div className="border-r border-white/[0.08] px-6 py-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold">Pro</span>
                <Link
                  href="/register"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-[#0A84FF] px-4 text-[14px] font-medium text-white transition hover:bg-[#117df0]"
                >
                  Start a free trial
                </Link>
              </div>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold">Enterprise</span>
                <Link
                  href="/register"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition hover:bg-white/90"
                >
                  Get a demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="border-b border-white/[0.08]">
            <div className="border-b border-white/[0.08] px-8 py-12 md:px-10">
              <p className="font-mono text-[13px] text-white/35">{section.eyebrow}</p>
              <h3 className="mt-3 flex items-center gap-2 text-[22px] font-semibold tracking-[-0.03em]">
                {section.title === 'Vercel Delivery Network' && <Globe className="h-5 w-5 text-white/70" />}
                {section.title === 'Vercel Firewall' && <Shield className="h-5 w-5 text-white/70" />}
                {section.title === 'Content, Caching & Optimization' && <Cloud className="h-5 w-5 text-white/70" />}
                {section.title === 'Vercel Compute' && <Rocket className="h-5 w-5 text-white/70" />}
                {section.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[17px] leading-8 text-white/50">
                {section.description}
              </p>
            </div>

            {section.groups.map((group) => (
              <div key={group.title}>
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-white/[0.08]">
                  <div className="border-r border-white/[0.08] px-6 py-5">
                    <p className="text-[15px] font-semibold text-white">{group.title}</p>
                  </div>
                  <div className="border-r border-white/[0.08]" />
                  <div className="border-r border-white/[0.08]" />
                  <div />
                </div>

                {group.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-white/[0.08] last:border-b-0"
                  >
                    <div className="border-r border-white/[0.08] px-6 py-4">
                      <p className="text-[15px] leading-7 text-white/82">{row.label}</p>
                    </div>

                    <div className="flex items-center justify-center border-r border-white/[0.08] px-6 py-4 text-center">
                      <CellValue value={row.hobby} />
                    </div>

                    <div className="flex items-center justify-center border-r border-white/[0.08] px-6 py-4 text-center">
                      <CellValue value={row.pro} />
                    </div>

                    <div className="flex items-center justify-center px-6 py-4 text-center">
                      <CellValue value={row.enterprise} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="border-r border-white/[0.08] px-6 py-5 text-[15px] text-white/55">
            Features
          </div>

          <div className="border-r border-white/[0.08] px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-semibold">Basic</span>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/[0.12] bg-black px-4 text-[14px] font-medium text-white/80 transition hover:bg-white/[0.04]"
              >
                Start Project
              </Link>
            </div>
          </div>

          <div className="border-r border-white/[0.08] px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-semibold">Pro</span>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full bg-[#0A84FF] px-4 text-[14px] font-medium text-white transition hover:bg-[#117df0]"
              >
                Start a free trial
              </Link>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-semibold">Enterprise</span>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition hover:bg-white/90"
              >
                Get a demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
