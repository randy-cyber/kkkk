import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { Trend } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface TrendPillProps {
  trend: Trend
  value: string
  /** when true, a falling price is "good" (green) — used for fares */
  invert?: boolean
  className?: string
}

export function TrendPill({ trend, value, invert = true, className }: TrendPillProps) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const good = invert ? trend === 'down' : trend === 'up'
  const tone =
    trend === 'flat'
      ? 'text-slate-300 bg-white/8'
      : good
        ? 'text-mint-400 bg-mint-400/12'
        : 'text-coral-400 bg-coral-400/12'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
        tone,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {value}
    </span>
  )
}
