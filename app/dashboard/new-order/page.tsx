'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Loader2, 
  Check, 
  Briefcase,
  FileText,
  ShoppingCart,
  LayoutDashboard,
  Globe,
  Layers,
  Rocket,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', icon: Layers },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'saas', label: 'SaaS Platform', icon: Rocket },
  { id: 'other', label: 'Other', icon: Globe },
]

const budgetRanges = [
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export default function NewOrderPage() {
  const router = useRouter()
  const { addOrder } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    websiteType: '' as 'landing' | 'portfolio' | 'ecommerce' | 'dashboard' | 'saas' | 'other' | '',
    title: '',
    description: '',
    budget: '',
    deadline: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
  })

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isValid = formData.websiteType && formData.title && formData.description && formData.budget

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    
    setIsLoading(true)
    
    try {
      const order = addOrder({
        title: formData.title,
        description: formData.description,
        websiteType: formData.websiteType as 'landing' | 'portfolio' | 'ecommerce' | 'dashboard' | 'saas' | 'other',
        budget: formData.budget,
        deadline: formData.deadline ? new Date(formData.deadline) : undefined,
        priority: formData.priority,
        status: 'pending',
      })

      if (order) {
        toast.success('Order created successfully')
        router.push('/dashboard/orders')
      } else {
        toast.error('Failed to create order')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-xl font-semibold text-white">New Order</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Create a new project request</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Website Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">Project Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {websiteTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => updateForm('websiteType', type.id)}
                className={`
                  flex items-center gap-2.5 p-3 rounded-md border text-left transition-colors text-sm
                  ${formData.websiteType === type.id
                    ? 'bg-neutral-800 border-neutral-700 text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }
                `}
              >
                <type.icon className="h-4 w-4 flex-shrink-0" />
                <span>{type.label}</span>
                {formData.websiteType === type.id && (
                  <Check className="h-3.5 w-3.5 ml-auto text-green-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateForm('title', e.target.value)}
            placeholder="e.g., E-commerce Website for Fashion Brand"
            className="w-full h-10 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateForm('description', e.target.value)}
            placeholder="Describe your project goals and requirements..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 resize-none text-sm"
          />
        </div>

        {/* Budget & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Budget</label>
            <select
              value={formData.budget}
              onChange={(e) => updateForm('budget', e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-700 text-sm appearance-none cursor-pointer"
            >
              <option value="">Select budget</option>
              {budgetRanges.map((budget) => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Deadline (Optional)</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => updateForm('deadline', e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-700 text-sm"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Priority</label>
          <div className="flex gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateForm('priority', option.value)}
                className={`
                  flex-1 py-2 rounded-md border text-sm font-medium transition-colors
                  ${formData.priority === option.value
                    ? 'bg-neutral-800 border-neutral-700 text-white'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4">
          <Link href="/dashboard">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-neutral-800 text-neutral-400 text-sm font-medium hover:text-white hover:border-neutral-700 transition-colors"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Order'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
