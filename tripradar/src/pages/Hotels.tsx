import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Search, LayoutGrid, Rows3, Star } from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { HotelCard, HotelRowCard } from '@/components/cards/HotelCard'
import { SmartImage } from '@/components/ui/SmartImage'
import { Button } from '@/components/ui/Button'
import { hotels } from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'

const quickFilters = ['Free cancellation', 'Pool', 'Spa', 'Breakfast', '5★', 'Beachfront', 'Pet-friendly']

export default function Hotels() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const cheapest = Math.min(...hotels.map((h) => h.pricePerNight))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-6"
    >
      {/* Search */}
      <motion.div variants={revealItem} className="glass rounded-3xl p-4 sm:p-5">
        <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <Field label="Destination" value="Santorini, Greece" icon={<MapPin className="h-3.5 w-3.5" />} />
          <Field label="Check-in / out" value="Oct 2 — Oct 7" icon={<Calendar className="h-3.5 w-3.5" />} />
          <Field label="Guests" value="2 adults · 1 room" icon={<Users className="h-3.5 w-3.5" />} />
          <Button size="lg" icon={<Search className="h-5 w-5" />}>
            Search
          </Button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {quickFilters.map((q) => (
            <button
              key={q}
              className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-white/8 transition-colors hover:bg-white/10 hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured banner */}
      <motion.div
        variants={revealItem}
        className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10"
      >
        <SmartImage
          src={hotels[3].image}
          alt={hotels[3].name}
          className="h-52 w-full sm:h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-6 sm:p-10">
          <span className="w-fit rounded-full bg-gold-400/20 px-2.5 py-1 text-xs font-semibold text-gold-300 ring-1 ring-gold-400/30">
            Editor's pick
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            {hotels[3].name}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-300">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" /> {hotels[3].rating} ·{' '}
            {hotels[3].city}
          </p>
          <p className="mt-3 text-lg font-bold text-white">
            {formatPrice(hotels[3].pricePerNight)}
            <span className="text-sm font-normal text-slate-300"> / night</span>
          </p>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={revealItem} className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-white">{hotels.length} stays</span> · from{' '}
          <span className="font-semibold text-mint-400">{formatPrice(cheapest)}</span>/night
        </p>
        <div className="flex items-center gap-2">
          <select className="rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-white/10 focus:outline-none">
            <option>Sort: Recommended</option>
            <option>Price: low to high</option>
            <option>Deal Score</option>
            <option>Top rated</option>
          </select>
          <div className="flex gap-1 rounded-xl bg-white/5 p-1">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-lg',
                view === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400',
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-lg',
                view === 'list' ? 'bg-white/10 text-white' : 'text-slate-400',
              )}
            >
              <Rows3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div variants={revealItem}>
        {view === 'grid' ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {hotels.map((h) => (
              <HotelRowCard key={h.id} hotel={h} />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Field({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white/4 px-4 py-2.5 ring-1 ring-white/8 transition-colors hover:bg-white/8">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
        {icon}
        {value}
      </p>
    </div>
  )
}
