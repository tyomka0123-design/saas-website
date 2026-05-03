const testimonials = [
  {
    quote: 'Apex Studio gave our brand the premium feeling we were missing. The site feels fast, serious, and clean on every screen.',
    author: 'Sarah Chen',
    role: 'Founder at Acme Corp',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
  {
    quote: 'The developer experience was smooth. We went from rough idea to a polished launch-ready website way faster than expected.',
    author: 'Marcus Johnson',
    role: 'Lead Engineer at Flux',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
  {
    quote: 'The preview links and clean workflow made feedback easy. Every update looked more premium than the last.',
    author: 'Priya Patel',
    role: 'VP Product at Forge',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
  {
    quote: 'Our landing page finally looks like a real product, not a basic template. That changed how clients react to us.',
    author: 'Alex Torres',
    role: 'Owner at Nova',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
  {
    quote: 'The animations are subtle and expensive-looking. It feels like a modern SaaS site instead of a normal small business website.',
    author: 'Lily Zhang',
    role: 'Marketing Lead at Orbit',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
  {
    quote: 'We needed speed, structure, and better conversion. Apex delivered a clean system that we can keep scaling.',
    author: 'Jordan Kim',
    role: 'Operations at Pulse',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="vercel-section-label mb-4">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight vercel-gradient-text mb-5">
            Loved by clients<br />worldwide
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <div key={i} className="vercel-feature-card p-6 break-inside-avoid vercel-animate-fade-in-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <p className="text-[14px] text-white/55 leading-relaxed mb-5">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10" />
                <div>
                  <div className="text-[13px] font-medium text-white">{t.author}</div>
                  <div className="text-[11px] text-white/35">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
