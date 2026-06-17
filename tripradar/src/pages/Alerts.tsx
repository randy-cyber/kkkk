import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  BedDouble,
  BellRing,
  Plus,
  CheckCircle2,
  Clock,
  Zap,
  TrendingDown,
} from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { SmartImage } from '@/components/ui/SmartImage'
import { Sparkline } from '@/components/ui/PriceChart'
import { Button } from '@/components/ui/Button'
import { priceAlerts, type PriceAlert } from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'

const freqIcon = { instant: Zap, daily: Clock, weekly: Clock }

export default function Alerts() {
  const [alerts, setAlerts] = useState(priceAlerts)
  const active = alerts.filter((a) => a.active).length
  const triggered = alerts.filter((a) => a.triggered).length

  const toggle = (id: string) =>
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl space-y-6"
    >
      <motion.div variants={revealItem} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Price alerts</h2>
          <p className="mt-1 text-sm text-slate-400">
            {active} active · {triggered} triggered this week. We watch 900+ sources for you 24/7.
          </p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />}>New alert</Button>
      </motion.div>

      {/* Create alert quick form */}
      <motion.div variants={revealItem} className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <BellRing className="h-4 w-4 text-brand-300" /> Create a price alert
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_140px_auto]">
          <input
            placeholder="From (e.g. JFK)"
            className="rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-brand-400/50"
          />
          <input
            placeholder="To (e.g. CDG)"
            className="rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-brand-400/50"
          />
          <input
            placeholder="Target $"
            className="rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-brand-400/50"
          />
          <Button>Set alert</Button>
        </div>
      </motion.div>

      {/* Alerts list */}
      <div className="space-y-4">
        {alerts.map((a) => (
          <motion.div key={a.id} variants={revealItem}>
            <AlertRow alert={a} onToggle={() => toggle(a.id)} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AlertRow({ alert, onToggle }: { alert: PriceAlert; onToggle: () => void }) {
  const TypeIcon = alert.type === 'flight' ? Plane : BedDouble
  const FreqIcon = freqIcon[alert.frequency]
  const diff = alert.currentPrice - alert.threshold
  const met = alert.currentPrice <= alert.threshold

  return (
    <div
      className={cn(
        'glass flex flex-col gap-4 rounded-3xl p-4 transition-all sm:flex-row sm:items-center',
        !alert.active && 'opacity-60',
        met && alert.active && 'ring-glow',
      )}
    >
      <div className="relative shrink-0">
        <SmartImage src={alert.image} alt={alert.route} className="h-16 w-16 rounded-2xl" />
        <span className="absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-lg bg-ink-900 ring-1 ring-white/15">
          <TypeIcon className="h-3 w-3 text-brand-300" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-white">{alert.route}</p>
          {alert.triggered && (
            <span className="inline-flex items-center gap-1 rounded-full bg-mint-400/15 px-2 py-0.5 text-[10px] font-semibold text-mint-400">
              <CheckCircle2 className="h-3 w-3" /> triggered
            </span>
          )}
        </div>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
          <FreqIcon className="h-3 w-3" /> {alert.frequency} · created {alert.createdAt}
        </p>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="text-slate-400">
            target <span className="font-semibold text-white">{formatPrice(alert.threshold)}</span>
          </span>
          <span className="text-slate-400">
            now{' '}
            <span className={cn('font-semibold', met ? 'text-mint-400' : 'text-white')}>
              {formatPrice(alert.currentPrice)}
            </span>
          </span>
          {met ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-mint-400">
              <TrendingDown className="h-3.5 w-3.5" /> {formatPrice(Math.abs(diff))} below target
            </span>
          ) : (
            <span className="text-xs text-slate-500">{formatPrice(diff)} to go</span>
          )}
        </div>
      </div>

      <div className="h-10 w-28 shrink-0 opacity-80">
        <Sparkline data={alert.history} height={40} />
      </div>

      {/* toggle */}
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={alert.active}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          alert.active ? 'bg-gradient-to-r from-brand-400 to-iris-500' : 'bg-white/15',
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform',
            alert.active ? 'translate-x-6' : 'translate-x-1',
          )}
        />
      </button>
    </div>
  )
}
