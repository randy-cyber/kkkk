import { motion } from 'framer-motion'
import { MapPin, Heart } from 'lucide-react'
import type { Hotel } from '@/lib/mockData'
import { formatPrice, formatCompact } from '@/lib/utils'
import { SmartImage } from '@/components/ui/SmartImage'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { Stars } from '@/components/ui/Stars'

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const saved = hotel.prevPrice - hotel.pricePerNight
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="glass group relative overflow-hidden rounded-3xl hover:ring-glow"
    >
      <div className="relative">
        <SmartImage
          src={hotel.image}
          alt={hotel.name}
          className="h-52 w-full transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <DealScoreBadge score={hotel.dealScore} size="sm" />
        </div>
        <button
          aria-label="Save hotel"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink-950/40 text-white backdrop-blur-md transition-colors hover:bg-coral-400/80"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1.5 rounded-full bg-ink-950/55 px-2.5 py-1 backdrop-blur-md">
            <span className="text-sm font-bold text-white tabular-nums">{hotel.rating}</span>
            <span className="text-[11px] text-slate-300">
              · {formatCompact(hotel.reviews)} reviews
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Stars count={hotel.stars} />
        </div>
        <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-white">{hotel.name}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3 w-3" /> {hotel.city}, {hotel.country}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/6 px-2 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/8 pt-3">
          <p className="text-[11px] text-slate-500">{hotel.distance}</p>
          <div className="text-right">
            {saved > 0 && (
              <p className="text-[11px] text-slate-500 line-through">{formatPrice(hotel.prevPrice)}</p>
            )}
            <p className="text-lg font-bold text-white">
              {formatPrice(hotel.pricePerNight)}
              <span className="text-xs font-normal text-slate-400"> /night</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function HotelRowCard({ hotel }: { hotel: Hotel }) {
  const saved = hotel.prevPrice - hotel.pricePerNight
  return (
    <motion.article
      whileHover={{ x: 2 }}
      className="glass group flex gap-4 overflow-hidden rounded-3xl p-3 hover:ring-glow"
    >
      <div className="relative shrink-0">
        <SmartImage src={hotel.image} alt={hotel.name} className="h-36 w-44 rounded-2xl sm:w-56" />
        <div className="absolute left-2 top-2">
          <DealScoreBadge score={hotel.dealScore} size="sm" showLabel={false} />
        </div>
      </div>
      <div className="flex flex-1 flex-col py-1">
        <Stars count={hotel.stars} />
        <h3 className="mt-1 line-clamp-1 text-base font-semibold text-white">{hotel.name}</h3>
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3 w-3" /> {hotel.city}, {hotel.country} · {hotel.distance}
        </p>
        <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
          {hotel.amenities.map((a) => (
            <span
              key={a}
              className="rounded-full bg-white/6 px-2 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-center gap-1.5 rounded-full bg-white/6 px-2 py-0.5">
            <span className="text-sm font-bold text-white tabular-nums">{hotel.rating}</span>
            <span className="text-[10px] text-slate-400">{formatCompact(hotel.reviews)}</span>
          </div>
          <div className="text-right">
            {saved > 0 && (
              <p className="text-[11px] text-slate-500 line-through">
                {formatPrice(hotel.prevPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-white">
              {formatPrice(hotel.pricePerNight)}
              <span className="text-xs font-normal text-slate-400"> /night</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
