import { motion } from 'framer-motion'
import { Plane, BedDouble, Compass, Target, Bell, Trash2, Plus } from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { SmartImage } from '@/components/ui/SmartImage'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { TrendPill } from '@/components/ui/TrendPill'
import { Sparkline } from '@/components/ui/PriceChart'
import { Button } from '@/components/ui/Button'
import { watchlist, type WatchItem } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

const typeIcon = { flight: Plane, hotel: BedDouble, destination: Compass }

export default function Watchlist() {
  const reachedTarget = watchlist.filter((w) => w.currentPrice <= w.targetPrice).length
  const totalSaved = watchlist.reduce(
    (acc, w) => acc + Math.max(0, Math.round((w.currentPrice * -w.changePct) / 100)),
    0,
  )

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-6"
    >
      <motion.div variants={revealItem} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Your watchlist</h2>
          <p className="mt-1 text-sm text-slate-400">
            {watchlist.length} items tracked ·{' '}
            <span className="font-semibold text-mint-400">{reachedTarget} at target price</span>
          </p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />}>Track something new</Button>
      </motion.div>

      {/* Summary strip */}
      <motion.div variants={revealItem} className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Tracked items', value: String(watchlist.length), tone: 'text-white' },
          { label: 'At / below target', value: String(reachedTarget), tone: 'text-mint-400' },
          { label: 'Potential savings', value: formatPrice(totalSaved), tone: 'text-gradient' },
        ].map((s) => (
          <div key={s.label} className="glass rounded-3xl p-5">
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${s.tone}`}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Items */}
      <div className="grid gap-4 lg:grid-cols-2">
        {watchlist.map((w) => (
          <motion.div key={w.id} variants={revealItem}>
            <WatchRow item={w} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function WatchRow({ item }: { item: WatchItem }) {
  const Icon = typeIcon[item.type]
  const atTarget = item.currentPrice <= item.targetPrice
  const progress = Math.min(100, Math.round((item.targetPrice / item.currentPrice) * 100))

  return (
    <div className="glass overflow-hidden rounded-3xl p-4 transition-all hover:ring-glow">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <SmartImage src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl" />
          <span className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-xl bg-ink-900 ring-1 ring-white/15">
            <Icon className="h-3.5 w-3.5 text-brand-300" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{item.title}</p>
              <p className="truncate text-xs text-slate-400">{item.subtitle}</p>
            </div>
            <DealScoreBadge score={item.dealScore} size="sm" showLabel={false} />
          </div>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-xl font-bold text-white">{formatPrice(item.currentPrice)}</p>
              <p className="flex items-center gap-1 text-[11px] text-slate-400">
                <Target className="h-3 w-3" /> target {formatPrice(item.targetPrice)}
              </p>
            </div>
            <TrendPill trend={item.trend} value={`${item.changePct > 0 ? '+' : ''}${item.changePct}%`} />
          </div>
        </div>
      </div>

      {/* progress to target */}
      <div className="mt-3">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>{atTarget ? 'Target reached 🎉' : 'Progress to target'}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
          <div
            className={`h-full rounded-full ${
              atTarget ? 'bg-mint-400' : 'bg-gradient-to-r from-brand-400 to-iris-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="-mx-1 mt-2 h-10 opacity-80">
        <Sparkline data={item.history} height={40} />
      </div>

      <div className="mt-2 flex items-center gap-2 border-t border-white/8 pt-3">
        <Button variant="glass" size="sm" className="flex-1" icon={<Bell className="h-4 w-4" />}>
          Edit alert
        </Button>
        <button className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-coral-400/15 hover:text-coral-400">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
