import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
      ))}
    </span>
  )
}
