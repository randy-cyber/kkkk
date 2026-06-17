import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Wallet,
  Eye,
  BellRing,
  Plane,
} from 'lucide-react'
import { staggerContainer, revealItem } from '@/lib/motion'
import { PriceChart } from '@/components/ui/PriceChart'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { TrendPill } from '@/components/ui/TrendPill'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { FlightCard } from '@/components/cards/FlightCard'
import { SmartImage } from '@/components/ui/SmartImage'
import { Button } from '@/components/ui/Button'
import {
  dashboardStats,
  marketIndex,
  destinations,
  flights,
  watchlist,
} from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

const statIcons = [Eye, BellRing, Wallet, Sparkles]

export default function Dashboard() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-6"
    >
      {/* Greeting */}
      <motion.div variants={revealItem} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Welcome back, Alex 👋
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Fares are <span className="font-semibold text-mint-400">trending down</span> across your
            watchlist. Two deals just hit their target price.
          </p>
        </div>
        <Link to="/app/destinations">
          <Button variant="glass" iconRight={<ArrowRight className="h-4 w-4" />}>
            Plan a new trip
          </Button>
        </Link>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={revealItem} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((s, i) => {
          const Icon = statIcons[i]
          return (
            <div key={s.label} className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/6">
                  <Icon className="h-5 w-5 text-brand-300" />
                </span>
                <TrendPill trend={s.trend} value={s.delta} invert={false} />
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-sm text-slate-400">{s.label}</p>
              <p className="text-xs text-slate-500">{s.hint}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Market index */}
        <motion.div variants={revealItem} className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">TripRadar Fare Index</p>
              <p className="text-xs text-slate-400">
                Global fare pressure · last 12 months · forecast dashed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-mint-400/12 px-2.5 py-1 text-xs font-semibold text-mint-400">
                <TrendingDown className="h-3.5 w-3.5" /> -8% YoY
              </span>
              {['1M', '6M', '1Y'].map((r, i) => (
                <button
                  key={r}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                    i === 2 ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <PriceChart data={marketIndex} height={260} />
          </div>
        </motion.div>

        {/* Deal feed */}
        <motion.div variants={revealItem} className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Live deal feed</p>
            <span className="flex items-center gap-1.5 text-xs text-mint-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-400" /> live
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {watchlist.map((w) => (
              <div key={w.id} className="flex items-center gap-3 rounded-2xl bg-white/4 p-2.5">
                <SmartImage src={w.image} alt={w.title} className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{w.title}</p>
                  <p className="truncate text-xs text-slate-400">{formatPrice(w.currentPrice)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <DealScoreBadge score={w.dealScore} size="sm" showLabel={false} />
                  <TrendPill trend={w.trend} value={`${w.changePct > 0 ? '+' : ''}${w.changePct}%`} />
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/app/watchlist"
            className="mt-4 flex items-center justify-center gap-1 rounded-xl bg-white/5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
          >
            View watchlist <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Best flight deals */}
      <motion.div variants={revealItem}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <Plane className="h-5 w-5 text-brand-300" /> Top flight deals for you
          </h3>
          <Link to="/app/flights" className="text-sm font-medium text-brand-300 hover:text-brand-400">
            See all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {flights.slice(0, 3).map((f) => (
            <FlightCard key={f.id} flight={f} />
          ))}
        </div>
      </motion.div>

      {/* Trending destinations */}
      <motion.div variants={revealItem}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <TrendingUp className="h-5 w-5 text-grape-400" /> Trending destinations
          </h3>
          <Link
            to="/app/destinations"
            className="text-sm font-medium text-brand-300 hover:text-brand-400"
          >
            Explore
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((d) => (
            <DestinationCard key={d.id} dest={d} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
