'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Loader2, 
  Check, 
  Briefcase,
  Palette,
  FileText,
  Sparkles,
  ChevronRight,
  Layers,
  ShoppingCart,
  LayoutDashboard,
  Rocket,
  Globe,
  Zap,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

const steps = [
  { id: 1, title: 'Project Type', icon: Briefcase },
  { id: 2, title: 'Details', icon: FileText },
  { id: 3, title: 'Design', icon: Palette },
  { id: 4, title: 'Review', icon: Sparkles },
]

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', icon: Layers, description: 'Single page to showcase your product or service' },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase, description: 'Showcase your work and projects' },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, description: 'Online store with products and checkout' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Admin panel or analytics dashboard' },
  { id: 'saas', label: 'SaaS Platform', icon: Rocket, description: 'Full-featured web application' },
  { id: 'other', label: 'Other', icon: Globe, description: 'Something unique and custom' },
]

const budgetRanges = [
  { value: '$500 - $1,000', label: 'Starter', description: 'Simple landing page or portfolio' },
  { value: '$1,000 - $2,500', label: 'Basic', description: 'Multi-page website with forms' },
  { value: '$2,500 - $5,000', label: 'Standard', description: 'Custom design with animations' },
  { value: '$5,000 - $10,000', label: 'Premium', description: 'Complex functionality & integrations' },
  { value: '$10,000+', label: 'Enterprise', description: 'Full-scale platform development' },
]

const priorityOptions = [
  { value: 'low', label: 'Low', description: 'Flexible timeline', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  { value: 'medium', label: 'Medium', description: 'Standard delivery', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'high', label: 'High', description: 'Priority support', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { value: 'urgent', label: 'Urgent', description: 'Rush delivery', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
]

const featuresList = [
  { id: 'animations', label: 'Custom Animations', icon: Sparkles },
  { id: 'seo', label: 'SEO Optimization', icon: Zap },
  { id: 'responsive', label: 'Responsive Design', icon: LayoutDashboard },
  { id: 'cms', label: 'Content Management', icon: FileText },
  { id: 'auth', label: 'User Authentication', icon: Briefcase },
  { id: 'payments', label: 'Payment Integration', icon: ShoppingCart },
  { id: 'analytics', label: 'Analytics Setup', icon: Rocket },
  { id: 'hosting', label: 'Hosting & Domain', icon: Globe },
]

export default function NewOrderPage() {
  const router = useRouter()
  const { addOrder } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    websiteType: '' as 'landing' | 'portfolio' | 'ecommerce' | 'dashboard' | 'saas' | 'other' | '',
    title: '',
    description: '',
    budget: '',
    deadline: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    features: [] as string[],
    designNotes: '',
  })

  const updateForm = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.websiteType !== ''
      case 2: return formData.title !== '' && formData.description !== '' && formData.budget !== ''
      case 3: return true
      case 4: return true
      default: return false
    }
  }

  const handleSubmit = async () => {
    if (!formData.websiteType) return
    
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
        notes: formData.designNotes,
      })

      if (order) {
        toast.success('Order submitted successfully!')
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
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to dashboard</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Order</h1>
        <p className="text-white/50 mt-1">
          Tell us about your project and we&apos;ll get back to you within 24 hours
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all
                    ${currentStep >= step.id 
                      ? 'bg-white border-white text-black' 
                      : 'bg-white/[0.03] border-white/[0.1] text-white/40'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </motion.div>
                <span className={`mt-2 text-xs font-medium hidden sm:block ${currentStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-3 h-0.5 rounded-full bg-white/[0.1] overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Project Type */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">What type of website do you need?</h2>
              <p className="text-white/50 text-sm">Select the option that best describes your project</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {websiteTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateForm('websiteType', type.id)}
                  className={`
                    p-5 rounded-2xl border text-left transition-all
                    ${formData.websiteType === type.id
                      ? 'bg-white/[0.08] border-white/30'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${formData.websiteType === type.id ? 'bg-white text-black' : 'bg-white/[0.05] text-white/60'}`}>
                      <type.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{type.label}</h3>
                      <p className="text-sm text-white/40 mt-1">{type.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Project Details</h2>
              <p className="text-white/50 text-sm">Tell us more about your project requirements</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  placeholder="e.g., E-commerce Website for Fashion Brand"
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  placeholder="Describe your project goals, target audience, and any specific requirements..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Budget Range *</label>
                  <div className="space-y-2">
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget.value}
                        onClick={() => updateForm('budget', budget.value)}
                        className={`
                          w-full p-3 rounded-xl border text-left transition-all
                          ${formData.budget === budget.value
                            ? 'bg-white/[0.08] border-white/30'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">{budget.label}</p>
                            <p className="text-xs text-white/40">{budget.description}</p>
                          </div>
                          <span className="text-xs text-white/60">{budget.value}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Deadline (Optional)</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => updateForm('deadline', e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Priority</label>
                    <div className="grid grid-cols-2 gap-2">
                      {priorityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateForm('priority', option.value)}
                          className={`
                            p-2.5 rounded-xl border text-center transition-all text-xs
                            ${formData.priority === option.value
                              ? option.color
                              : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.15]'
                            }
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Design */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Design & Features</h2>
              <p className="text-white/50 text-sm">Select the features you need for your project</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">Features Needed</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {featuresList.map((feature) => (
                  <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFeature(feature.id)}
                    className={`
                      p-4 rounded-xl border text-center transition-all
                      ${formData.features.includes(feature.id)
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:border-white/[0.15]'
                      }
                    `}
                  >
                    <feature.icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-xs font-medium">{feature.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Design Notes (Optional)</label>
              <textarea
                value={formData.designNotes}
                onChange={(e) => updateForm('designNotes', e.target.value)}
                placeholder="Any specific design preferences, color schemes, or reference websites..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Review Your Order</h2>
              <p className="text-white/50 text-sm">Make sure everything looks correct before submitting</p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-medium text-white/50 mb-3">Project Type</h3>
                <p className="text-lg font-semibold text-white capitalize">
                  {websiteTypes.find(t => t.id === formData.websiteType)?.label}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-medium text-white/50 mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-white/40">Title</p>
                    <p className="text-white font-medium">{formData.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Description</p>
                    <p className="text-white/70 text-sm">{formData.description}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-white/40">Budget</p>
                      <p className="text-white font-medium">{formData.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Priority</p>
                      <p className="text-white font-medium capitalize">{formData.priority}</p>
                    </div>
                    {formData.deadline && (
                      <div>
                        <p className="text-xs text-white/40">Deadline</p>
                        <p className="text-white font-medium">{new Date(formData.deadline).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {formData.features.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="text-sm font-medium text-white/50 mb-3">Selected Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map(featureId => {
                      const feature = featuresList.find(f => f.id === featureId)
                      return feature ? (
                        <span key={featureId} className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium">
                          {feature.label}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between mt-10 pt-6 border-t border-white/[0.06]"
      >
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < 4 ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Submit Order
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
