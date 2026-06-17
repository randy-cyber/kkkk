import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeftRight,
  Calendar,
  Users,
  Search,
  SlidersHorizontal,
  TrendingDown,
  Sparkles,
} from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { FlightCard } from '@/components/cards/FlightCard'
import { PriceChart } from '@/components/ui/PriceChart'
import { Button } from '@/components/ui/Button'
import { flights } from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'

const sorts = ['Best', 'Cheapest', 'Fastest', 'Deal Score']
const stopsFilter = ['Any stops', 'Nonstop', '1 stop']
const cabins = ['Economy', 'Premium', 'Business', 'First']

export default function Flights() {
  const [sort, setSort] = useState('Best')
  const cheapest = Math.min(...flights.map((f) => f.price))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-6"
    >
      {/* Search panel */}
      <motion.div variants={revealItem} className="glass rounded-3xl p-4 sm:p-5">
        <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_auto]">
          <Field label="From" value="New York" sub="JFK" />
          <button className="hidden place-items-center self-end pb-3 text-slate-400 hover:text-white lg:grid">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <Field label="To" value="Paris" sub="CDG" />
          <Field label="Depart" value="Oct 2" icon={<Calendar className="h-3.5 w-3.5" />} />
          <Field label="Travelers" value="1 Adult" icon={<Users className="h-3.5 w-3.5" />} />
          <Button size="lg" className="self-end" icon={<Search className="h-5 w-5" />}>
            Search
          </Button>
        </div>
      </motion.div>

      {/* Prediction banner */}
      <motion.div
        variants={revealItem}
        className="glass relative overflow-hidden rounded-3xl p-5"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint-400/20 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-grape-400 to-brand-400">
              <Sparkles className="h-5 w-5 text-ink-950" />
            </span>
            <div>
              <p className="font-semibold text-white">Radar prediction: book now</p>
              <p className="text-sm text-slate-300">
                JFK → CDG fares are <span className="font-semibold text-mint-400">14% below</span>{' '}
                their 90-day average and expected to rise after this weekend.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-400/12 px-3 py-1.5 text-sm font-semibold text-mint-400">
            <TrendingDown className="h-4 w-4" /> 92% confidence
          </span>
        </div>
        <div className="mt-3">
          <PriceChart data={flights[0].history} height={150} showAxis={false} />
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <motion.aside variants={revealItem} className="glass h-fit rounded-3xl p-5 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>

          <FilterGroup title="Stops" options={stopsFilter} defaultIndex={0} />
          <FilterGroup title="Cabin" options={cabins} defaultIndex={0} />

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Max price</p>
            <input type="range" min={150} max={900} defaultValue={750} className="mt-3 w-full accent-brand-400" />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>{formatPrice(150)}</span>
              <span className="font-semibold text-white">{formatPrice(750)}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Airlines</p>
            <div className="mt-2 space-y-2">
              {['Aurora Air', 'Zen Pacific', 'Meridian', 'Nimbus'].map((a) => (
                <label key={a} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-brand-400" />
                  {a}
                </label>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Results */}
        <motion.div variants={revealItem} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-white">{flights.length} flights</span> · cheapest{' '}
              <span className="font-semibold text-mint-400">{formatPrice(cheapest)}</span>
            </p>
            <div className="flex gap-1 rounded-xl bg-white/5 p-1">
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                    sort === s ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {flights.map((f) => (
              <FlightCard key={f.id} flight={f} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Field({
  label,
  value,
  sub,
  icon,
}: {
  label: string
  value: string
  sub?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white/4 px-4 py-2.5 ring-1 ring-white/8 transition-colors hover:bg-white/8">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
        {icon}
        {value}
        {sub && <span className="text-xs font-normal text-slate-400">· {sub}</span>}
      </p>
    </div>
  )
}

function FilterGroup({
  title,
  options,
  defaultIndex,
}: {
  title: string
  options: string[]
  defaultIndex: number
}) {
  const [active, setActive] = useState(defaultIndex)
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
              active === i
                ? 'bg-brand-400/20 text-brand-200 ring-1 ring-brand-400/40'
                : 'bg-white/5 text-slate-400 hover:text-white',
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
