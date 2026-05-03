import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/lib/supabase/types'

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  in_review: {
    label: 'In Review',
    className: 'bg-glow-cyan/10 text-glow-cyan border-glow-cyan/20',
  },
  invoice_sent: {
    label: 'Invoice Sent',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  paid: {
    label: 'Paid',
    className: 'bg-success/10 text-success border-success/20',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-glow/10 text-glow border-glow/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success border-success/20',
  },
}

interface StatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
