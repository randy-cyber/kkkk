import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, Star, Calendar, Thermometer, ArrowRight } from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { SmartImage } from '@/components/ui/SmartImage'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { PriceChart } from '@/components/ui/PriceChart'
import { Button } from '@/components/ui/Button'
import { destinations } from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'

const continents = ['All', 'Europe', 'Asia', 'Africa']
const vibes = ['Beach', 'City', 'Adventure', 'Romance', 'Luxury', 'Culture', 'Nature']

export default function Destinations() {
  const [continent, setContinent] = useState('All')
  const [query, setQuery] = useState('')
  const featured = destinations[4] // Reykjavík — highest deal score

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchContinent = continent === 'All' || d.continent === continent
      const matchQuery =
        !query ||
        `${d.city} ${d.country} ${d.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
      return matchContinent && matchQuery
    })
  }, [continent, query])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-6"
    >
      {/* Hero header */}
      <motion.div variants={revealItem} className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-grape-300 ring-1 ring-white/10">
          <Sparkles className="h-3.5 w-3.5" /> Curated by Radar AI
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-5xl">
          Find your <span className="font-serif italic font-medium text-gradient">dream</span>{' '}
          destination
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
          Browse the world by vibe and budget. Every spot is scored and timed for the perfect
          booking moment.
        </p>
      </motion.div>

      {/* Search + filters */}
      <motion.div variants={revealItem} className="glass rounded-3xl p-4">
        <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 focus-within:ring-brand-400/50">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city, country or vibe…"
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setContinent(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                continent === c
                  ? 'bg-gradient-to-r from-brand-400 to-iris-500 text-ink-950'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10',
              )}
            >
              {c}
            </button>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {vibes.map((v) => (
              <button
                key={v}
                onClick={() => setQuery(v)}
                className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400 ring-1 ring-white/8 transition-colors hover:text-white"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured destination */}
      <motion.div
        variants={revealItem}
        className="glass grid gap-5 overflow-hidden rounded-3xl p-4 lg:grid-cols-2"
      >
        <div className="relative h-64 overflow-hidden rounded-2xl lg:h-auto">
          <SmartImage
            src={featured.image}
            alt={featured.city}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
          <div className="absolute left-4 top-4">
            <DealScoreBadge score={featured.dealScore} size="lg" />
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-300">
              Deal of the week
            </p>
            <h3 className="font-display text-3xl font-bold text-white">{featured.city}</h3>
            <p className="text-sm text-slate-300">{featured.country}</p>
          </div>
        </div>

        <div className="flex flex-col p-2">
          <p className="text-sm leading-relaxed text-slate-300">{featured.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {featured.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/6 px-2.5 py-1 text-xs font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat icon={<Star className="h-4 w-4 text-gold-400" />} value={String(featured.rating)} label="Rating" />
            <Stat icon={<Calendar className="h-4 w-4 text-iris-400" />} value={featured.bestMonth} label="Best time" />
            <Stat icon={<Thermometer className="h-4 w-4 text-coral-400" />} value={`${featured.tempC}°C`} label="Avg temp" />
          </div>

          <div className="mt-4 flex-1">
            <p className="mb-1 text-xs font-medium text-slate-400">12-month fare history & forecast</p>
            <PriceChart data={featured.history} height={160} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
            <div>
              <span className="text-xs text-slate-400">round trip from</span>
              <p className="font-display text-2xl font-bold text-white">
                {formatPrice(featured.fromPrice)}
              </p>
            </div>
            <Button iconRight={<ArrowRight className="h-4 w-4" />}>Plan this trip</Button>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={revealItem}>
        <p className="mb-4 text-sm text-slate-400">
          <span className="font-semibold text-white">{filtered.length}</span> destinations
          {continent !== 'All' && ` in ${continent}`}
        </p>
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl py-16 text-center text-slate-400">
            No destinations match that search yet. Try another vibe.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <DestinationCard dest={d} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-3">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-1 truncate text-sm font-bold text-white">{value}</p>
      <p className="text-[10px] text-slate-400">{label}</p>
    </div>
  )
}
