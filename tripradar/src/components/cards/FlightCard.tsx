import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Plane, Clock, TrendingDown, TrendingUp, Bell } from 'lucide-react'
import type { Flight } from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { Sparkline } from '@/components/ui/PriceChart'

const emissionLabel = { low: 'Low CO₂', avg: 'Avg CO₂', high: 'High CO₂' }
const emissionTone = {
  low: 'text-mint-400 bg-mint-400/10',
  avg: 'text-gold-300 bg-gold-400/10',
  high: 'text-coral-400 bg-coral-400/10',
}

export function FlightCard({ flight }: { flight: Flight }) {
  const saved = flight.prevPrice - flight.price
  const predict =
    flight.prediction === 'rising'
      ? { text: 'Price rising — book now', tone: 'text-coral-400', Icon: TrendingUp }
      : flight.prediction === 'falling'
        ? { text: 'Price may drop — wait', tone: 'text-mint-400', Icon: TrendingDown }
        : { text: 'Price stable', tone: 'text-slate-400', Icon: Clock }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="glass group relative overflow-hidden rounded-3xl p-5 hover:ring-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-sm font-bold text-ink-950',
              flight.logoColor,
            )}
          >
            {flight.airlineCode}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">{flight.airline}</p>
            <p className="text-xs text-slate-400">
              {flight.cabin} · {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
            </p>
          </div>
        </div>
        <DealScoreBadge score={flight.dealScore} size="sm" />
      </div>

      {/* route timeline */}
      <div className="mt-5 flex items-center gap-3">
        <div className="text-left">
          <p className="text-2xl font-bold tracking-tight text-white">{flight.depart}</p>
          <p className="text-xs font-medium text-slate-400">{flight.fromCode}</p>
        </div>
        <div className="relative flex-1">
          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
            <span className="flex-1 border-t border-dashed border-white/15" />
            <Plane className="h-3.5 w-3.5 rotate-90 text-brand-300" />
            <span className="flex-1 border-t border-dashed border-white/15" />
          </div>
          <p className="mt-1 text-center text-[11px] text-slate-400">
            {flight.duration}
            {flight.stopCity ? ` · via ${flight.stopCity}` : ''}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold tracking-tight text-white">{flight.arrive}</p>
          <p className="text-xs font-medium text-slate-400">{flight.toCode}</p>
        </div>
      </div>

      <div className="-mx-1 mt-3 h-11 opacity-80">
        <Sparkline data={flight.history} height={44} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
            emissionTone[flight.emissions],
          )}
        >
          <Leaf className="h-3 w-3" />
          {emissionLabel[flight.emissions]}
        </span>
        <span className={cn('inline-flex items-center gap-1 text-[11px] font-medium', predict.tone)}>
          <predict.Icon className="h-3 w-3" />
          {predict.text}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-white/8 pt-4">
        <div>
          {saved > 0 && (
            <p className="text-xs text-slate-500 line-through">{formatPrice(flight.prevPrice)}</p>
          )}
          <p className="text-2xl font-bold text-white">
            {formatPrice(flight.price)}
            {saved > 0 && (
              <span className="ml-2 text-xs font-semibold text-mint-400">
                save {formatPrice(saved)}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Add price alert"
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-400 to-iris-500 px-4 text-sm font-semibold text-ink-950 transition-transform hover:brightness-110 active:scale-95">
            Select <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
