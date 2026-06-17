/** Tiny classnames joiner (no extra dep). Falsy values are dropped. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return currencyFmt.format(value)
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

/** Maps a 0–100 deal score to a label + tailwind-friendly token set. */
export function dealScoreMeta(score: number) {
  if (score >= 90) return { label: 'Steal', tone: 'mint' as const }
  if (score >= 78) return { label: 'Great', tone: 'brand' as const }
  if (score >= 62) return { label: 'Good', tone: 'gold' as const }
  return { label: 'Fair', tone: 'coral' as const }
}

/** Deterministic pseudo-random so SSR/build output is stable. */
export function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
