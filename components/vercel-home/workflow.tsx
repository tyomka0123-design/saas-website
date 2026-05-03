import { ArrowRight } from 'lucide-react'

const tabs = ['Landing Page', 'Business Site', 'Dashboard', 'E-commerce', 'Bookings', 'Automation']

const frameworks = [
  { name: 'Next.js', desc: 'The React framework for premium web products', color: 'from-white/10' },
  { name: 'Supabase', desc: 'Authentication, database, and client workflows', color: 'from-green-500/10' },
  { name: 'Vercel', desc: 'Fast hosting and production deployments', color: 'from-blue-500/10' },
]

export function Workflow() {
  return (
    <section id="workflow" className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 vercel-grid-bg opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="vercel-section-label mb-4">Workflow</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight vercel-gradient-text mb-5">Your stack, your way</h2>
          <p className="text-white/45 text-[16px] max-w-xl mx-auto">
            Build a simple website now, then scale it into a real client portal, dashboard, booking system, or paid platform.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                i === 0 ? 'bg-white text-black' : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white/80 border border-white/[0.06]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {frameworks.map((fw) => (
            <div key={fw.name} className="vercel-feature-card p-6 group cursor-pointer">
              <div className={`h-32 rounded-lg bg-gradient-to-b ${fw.color} to-transparent mb-5 flex items-center justify-center relative overflow-hidden`}>
                <div className="space-y-2 w-full px-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="h-1.5 rounded-full bg-white/20" style={{ width: `${[40, 70, 55, 85][i]}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1">{fw.name}</h3>
              <p className="text-[13px] text-white/40">{fw.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-[12px] text-white/30 group-hover:text-white/60 transition-colors">
                Build with this <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#services" className="vercel-btn-outline text-[14px] px-6 py-2.5 rounded-lg">
            View all services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
