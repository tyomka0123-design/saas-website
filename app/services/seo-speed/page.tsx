import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Globe,
  Layers3,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

export default function SeoSpeedPage() {
  const pillars = [
    {
      icon: Search,
      title: 'Technical SEO',
      text: 'Clean structure, semantic markup, metadata, indexing signals, and a stronger search foundation.',
    },
    {
      icon: Gauge,
      title: 'Page Speed',
      text: 'Faster load times, lighter pages, and smoother performance across desktop and mobile.',
    },
    {
      icon: Globe,
      title: 'Local Visibility',
      text: 'Pages built to help local businesses look more credible and rank more clearly in their area.',
    },
    {
      icon: BarChart3,
      title: 'Conversion Signals',
      text: 'Better page hierarchy, stronger trust, and layouts that turn more visitors into real leads.',
    },
  ]

  const metrics = [
    { value: '< 2s', label: 'target load feel' },
    { value: 'Core', label: 'web vitals focused' },
    { value: 'Clean', label: 'indexable structure' },
  ]

  const features = [
    'Semantic page structure',
    'Metadata and Open Graph setup',
    'Clean heading hierarchy',
    'Fast-loading sections and media',
    'Mobile-first performance',
    'Technical SEO foundations',
    'Local business optimization',
    'Conversion-oriented page flow',
  ]

  const workflow = [
    {
      title: 'Audit the current website',
      text: 'We review structure, speed, layout friction, indexing basics, and technical weaknesses.',
    },
    {
      title: 'Fix the foundation',
      text: 'We improve page architecture, headings, metadata, image loading, and technical consistency.',
    },
    {
      title: 'Improve performance',
      text: 'We reduce unnecessary weight, refine rendering, and create a faster, more stable experience.',
    },
    {
      title: 'Strengthen search readiness',
      text: 'We prepare the site for stronger visibility, local relevance, and better search clarity.',
    },
  ]

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-black">
        <div className="grid xl:grid-cols-[1.08fr_0.92fr]">
          <div className="relative border-b border-white/[0.07] xl:border-b-0 xl:border-r">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:62px_62px]" />
            <div className="absolute left-[14%] top-[14%] h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
            <div className="absolute right-[12%] top-[20%] h-40 w-40 rounded-full bg-blue-500/[0.08] blur-3xl" />
            <div className="absolute bottom-[10%] left-[34%] h-52 w-52 rounded-full bg-cyan-500/[0.05] blur-3xl" />

            <div className="relative px-6 py-10 md:px-10 md:py-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.9)]" />
                Search visibility
              </div>

              <h1 className="mt-8 max-w-4xl text-[44px] font-semibold leading-[0.95] tracking-[-0.07em] text-white md:text-[76px]">
                SEO & speed
                <span className="block text-white/72">
                  that make your website rank and feel expensive.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/42 md:text-[15px]">
                We build and optimize pages that load faster, look more trustworthy, and give your
                business a stronger chance to perform in search. The goal is not only traffic, but
                a cleaner site that feels premium from the first second.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] px-5 text-sm font-medium text-white transition hover:bg-white/[0.05]"
                >
                  Discuss your website
                </Link>
              </div>

              <div className="mt-10 grid gap-3 md:grid-cols-3">
                {metrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] px-4 py-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <p className="text-[30px] font-semibold leading-none tracking-[-0.05em] text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm text-white/42">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:62px_62px]" />

            <div className="relative flex h-full min-h-[420px] items-center justify-center p-6 md:p-10">
              <div className="relative h-[360px] w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />

                <div className="absolute left-0 right-0 top-[70px] h-px bg-white/[0.06]" />
                <div className="absolute left-0 right-0 top-[145px] h-px bg-white/[0.06]" />
                <div className="absolute left-0 right-0 top-[220px] h-px bg-white/[0.06]" />
                <div className="absolute left-[90px] top-0 bottom-0 w-px bg-white/[0.06]" />
                <div className="absolute left-[220px] top-0 bottom-0 w-px bg-white/[0.06]" />
                <div className="absolute left-[350px] top-0 bottom-0 w-px bg-white/[0.06]" />

                <div className="absolute left-[54px] top-[255px] h-[2px] w-[112px] rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.85)]" />
                <div className="absolute left-[164px] top-[210px] h-[2px] w-[96px] rotate-[-24deg] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                <div className="absolute left-[248px] top-[154px] h-[2px] w-[112px] rotate-[-18deg] rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
                <div className="absolute left-[352px] top-[112px] h-[2px] w-[88px] rotate-[-12deg] rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.85)]" />

                <div className="absolute left-[48px] top-[248px] h-4 w-4 rounded-full border border-blue-400/30 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-blue-400" />
                </div>
                <div className="absolute left-[155px] top-[203px] h-4 w-4 rounded-full border border-cyan-400/30 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-cyan-400" />
                </div>
                <div className="absolute left-[240px] top-[147px] h-4 w-4 rounded-full border border-white/20 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-white" />
                </div>
                <div className="absolute left-[344px] top-[105px] h-4 w-4 rounded-full border border-blue-400/30 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-blue-400" />
                </div>

                <div className="absolute left-6 top-6 rounded-full border border-white/[0.08] bg-black px-3 py-1 text-xs text-white/60">
                  Technical SEO
                </div>
                <div className="absolute right-6 top-6 rounded-full border border-white/[0.08] bg-black px-3 py-1 text-xs text-white/60">
                  Performance
                </div>
                <div className="absolute bottom-6 left-6 rounded-full border border-white/[0.08] bg-black px-3 py-1 text-xs text-white/60">
                  Local visibility
                </div>
                <div className="absolute bottom-6 right-6 rounded-full border border-white/[0.08] bg-black px-3 py-1 text-xs text-white/60">
                  Conversion
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-white/[0.07] bg-black p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
              <item.icon className="h-4.5 w-4.5 text-white/78" />
            </div>

            <h3 className="mt-6 text-lg font-medium tracking-[-0.03em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/42">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-black">
          <div className="border-b border-white/[0.07] px-6 py-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/32">What you get</p>
            <h2 className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.05em] text-white">
              Built for ranking and trust.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2">
            {features.map((item, index) => (
              <div
                key={item}
                className={`flex items-center gap-3 px-6 py-4 ${
                  index % 2 === 0 ? 'sm:border-r sm:border-white/[0.07]' : ''
                } ${index < features.length - 2 ? 'border-b border-white/[0.07]' : ''}`}
              >
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-white/72" />
                <span className="text-sm text-white/68">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-black">
          <div className="border-b border-white/[0.07] px-6 py-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/32">Workflow</p>
            <h2 className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.05em] text-white">
              How we improve your site.
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-5">
              {workflow.map((item, index) => (
                <div key={item.title} className="relative pl-12">
                  {index !== workflow.length - 1 && (
                    <div className="absolute left-[7px] top-7 h-[calc(100%+18px)] w-px bg-white/[0.07]" />
                  )}

                  <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/[0.1] bg-black">
                    <Circle className="h-2.5 w-2.5 fill-white text-white" />
                  </div>

                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/42">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-black">
        <div className="grid xl:grid-cols-[1fr_1fr]">
          <div className="border-b border-white/[0.07] p-6 md:p-8 xl:border-b-0 xl:border-r">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/32">Why it matters</p>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.02] tracking-[-0.06em] text-white md:text-[46px]">
              A faster website feels more premium.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/42">
              Speed is not only technical. It changes how your brand feels. A faster, cleaner,
              better-structured website creates more trust, stronger retention, and better
              conversion potential.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {[
                {
                  icon: Zap,
                  title: 'More responsive feel',
                  text: 'Visitors feel the difference immediately when the site loads faster and moves cleaner.',
                },
                {
                  icon: Search,
                  title: 'Stronger search foundation',
                  text: 'Better structure gives search engines a clearer understanding of the site.',
                },
                {
                  icon: LineChart,
                  title: 'Higher lead quality',
                  text: 'Cleaner flow and better trust often improve how visitors interact with your pages.',
                },
                {
                  icon: ShieldCheck,
                  title: 'More professional presence',
                  text: 'A refined technical foundation makes the whole business feel more serious.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <item.icon className="h-4.5 w-4.5 text-white/76" />
                  <h3 className="mt-4 text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/42">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-6 md:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="relative flex h-full min-h-[380px] items-center justify-center">
              <div className="relative h-[280px] w-full max-w-[520px] rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                <div className="absolute left-8 right-8 top-12 h-px bg-white/[0.07]" />
                <div className="absolute left-8 right-8 top-24 h-px bg-white/[0.07]" />
                <div className="absolute left-8 right-8 top-36 h-px bg-white/[0.07]" />
                <div className="absolute left-8 right-8 top-48 h-px bg-white/[0.07]" />

                <div className="absolute left-14 top-[186px] h-[2px] w-[92px] rounded-full bg-white/70" />
                <div className="absolute left-[146px] top-[162px] h-[2px] w-[84px] -rotate-[22deg] rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
                <div className="absolute left-[224px] top-[128px] h-[2px] w-[86px] -rotate-[14deg] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
                <div className="absolute left-[304px] top-[104px] h-[2px] w-[86px] -rotate-[10deg] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.45)]" />

                <div className="absolute left-14 top-[179px] h-4 w-4 rounded-full border border-white/20 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-white" />
                </div>
                <div className="absolute left-[138px] top-[155px] h-4 w-4 rounded-full border border-blue-400/30 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-blue-400" />
                </div>
                <div className="absolute left-[216px] top-[121px] h-4 w-4 rounded-full border border-cyan-400/30 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-cyan-400" />
                </div>
                <div className="absolute left-[296px] top-[97px] h-4 w-4 rounded-full border border-white/20 bg-black">
                  <div className="absolute inset-[4px] rounded-full bg-white" />
                </div>

                <div className="absolute left-8 top-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black px-3 py-1 text-xs text-white/58">
                  <Sparkles className="h-3.5 w-3.5" />
                  Search + performance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
