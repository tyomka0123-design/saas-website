import { Navbar } from '@/components/vercel-home/navbar'
import { Pricing } from '@/components/vercel-home/pricing'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-14">
        <Pricing />
      </div>
    </main>
  )
}
