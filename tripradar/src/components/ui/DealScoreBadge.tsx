import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dealScoreMeta } from '@/lib/utils'

const toneMap = {
  mint: 'from-mint-400/90 to-brand-400/90 text-ink-950',
  brand: 'from-brand-400/90 to-iris-500/90 text-ink-950',
  gold: 'from-gold-300/90 to-gold-500/90 text-ink-950',
  coral: 'from-coral-400/90 to-grape-500/90 text-white',
}

interface DealScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function DealScoreBadge({
  score,
  size = 'md',
  showLabel = true,
  className,
}: DealScoreBadgeProps) {
  const { label, tone } = dealScoreMeta(score)
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1',
    lg: 'text-sm px-3 py-1.5 gap-1.5',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-gradient-to-r font-semibold shadow-lg shadow-black/30 ring-1 ring-white/20',
        toneMap[tone],
        sizes[size],
        className,
      )}
    >
      <Sparkles className={size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3'} />
      <span className="tabular-nums font-bold">{score}</span>
      {showLabel && <span className="font-medium opacity-80">· {label}</span>}
    </span>
  )
}
