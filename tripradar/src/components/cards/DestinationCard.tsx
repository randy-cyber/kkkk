import { motion } from 'framer-motion'
import { MapPin, Thermometer, Star, CalendarCheck } from 'lucide-react'
import type { Destination } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { SmartImage } from '@/components/ui/SmartImage'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { TrendPill } from '@/components/ui/TrendPill'

export function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative h-80 overflow-hidden rounded-3xl ring-1 ring-white/10 hover:ring-white/25"
    >
      <SmartImage
        src={dest.image}
        alt={`${dest.city}, ${dest.country}`}
        className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />

      <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
        <DealScoreBadge score={dest.dealScore} size="sm" />
        <span className="flex items-center gap-1 rounded-full bg-ink-950/45 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-gold-400 text-gold-400" /> {dest.rating}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-brand-300">
          <MapPin className="h-3 w-3" /> {dest.continent}
        </p>
        <h3 className="mt-0.5 font-display text-2xl font-bold text-white">{dest.city}</h3>
        <p className="text-sm text-slate-300">{dest.country}</p>

        <p className="mt-2 line-clamp-2 text-xs text-slate-300/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {dest.blurb}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <CalendarCheck className="h-3 w-3 text-iris-400" /> {dest.bestMonth}
          </span>
          <span className="flex items-center gap-1">
            <Thermometer className="h-3 w-3 text-coral-400" /> {dest.tempC}°C
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            <span className="text-[11px] text-slate-400">from</span>
            <p className="text-lg font-bold text-white">{formatPrice(dest.fromPrice)}</p>
          </div>
          <TrendPill trend={dest.trend} value={`${dest.trendPct > 0 ? '+' : ''}${dest.trendPct}%`} />
        </div>
      </div>
    </motion.article>
  )
}
