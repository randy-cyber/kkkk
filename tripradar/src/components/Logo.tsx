import { Radar } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-iris-500 shadow-lg shadow-iris-500/30">
        <Radar className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
        <span className="animate-pulse-ring absolute inset-0 rounded-xl ring-2 ring-brand-400/60" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-white">
          Trip<span className="text-gradient">Radar</span>
        </span>
      )}
    </span>
  )
}
