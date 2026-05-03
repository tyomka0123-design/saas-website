import { Deploy } from '@/components/vercel-home/deploy'
import { Features } from '@/components/vercel-home/features'
import { Footer } from '@/components/vercel-home/footer'
import { Hero } from '@/components/vercel-home/hero'
import { LogoCloud } from '@/components/vercel-home/logo-cloud'
import { Navbar } from '@/components/vercel-home/navbar'
import { Testimonials } from '@/components/vercel-home/testimonials'
import { Workflow } from '@/components/vercel-home/workflow'

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <Deploy />
      <Workflow />
      <Testimonials />
      <Footer />
    </div>
  )
}
