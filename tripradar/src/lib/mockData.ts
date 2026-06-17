/* ──────────────────────────────────────────────────────────────────────────
   TripRadar mock dataset
   All UI runs on this until the Supabase backend is connected.
   Images are served from Unsplash (stable photo IDs) with graceful fallbacks.
   ────────────────────────────────────────────────────────────────────────── */

export type Trend = 'up' | 'down' | 'flat'

/** Build an Unsplash CDN url for a given photo id. */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export interface PricePoint {
  /** short month/day label */
  t: string
  price: number
  /** the model's predicted price, used for forecast styling */
  predicted?: number
}

export interface Destination {
  id: string
  city: string
  country: string
  continent: string
  image: string
  blurb: string
  tags: string[]
  fromPrice: number
  trend: Trend
  trendPct: number
  dealScore: number
  bestMonth: string
  tempC: number
  rating: number
  history: PricePoint[]
}

export interface Flight {
  id: string
  airline: string
  airlineCode: string
  logoColor: string
  from: string
  fromCode: string
  to: string
  toCode: string
  depart: string
  arrive: string
  duration: string
  stops: number
  stopCity?: string
  price: number
  prevPrice: number
  dealScore: number
  cabin: string
  emissions: 'low' | 'avg' | 'high'
  prediction: 'rising' | 'falling' | 'stable'
  history: PricePoint[]
}

export interface Hotel {
  id: string
  name: string
  city: string
  country: string
  image: string
  gallery: string[]
  stars: number
  rating: number
  reviews: number
  pricePerNight: number
  prevPrice: number
  dealScore: number
  tags: string[]
  amenities: string[]
  distance: string
}

export interface WatchItem {
  id: string
  type: 'flight' | 'hotel' | 'destination'
  title: string
  subtitle: string
  image: string
  currentPrice: number
  targetPrice: number
  changePct: number
  trend: Trend
  dealScore: number
  history: PricePoint[]
}

export interface PriceAlert {
  id: string
  route: string
  type: 'flight' | 'hotel'
  from: string
  to: string
  image: string
  threshold: number
  currentPrice: number
  active: boolean
  triggered: boolean
  frequency: 'instant' | 'daily' | 'weekly'
  createdAt: string
  history: PricePoint[]
}

/* helper to synthesize a believable price-history series */
function makeHistory(base: number, volatility: number, trendBias = 0): PricePoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const out: PricePoint[] = []
  for (let i = 0; i < 12; i++) {
    const wave = Math.sin(i / 1.7) * volatility
    const drift = trendBias * i
    const price = Math.max(40, Math.round(base + wave + drift + (i % 3 === 0 ? volatility * 0.4 : 0)))
    const point: PricePoint = { t: months[i], price }
    if (i >= 9) point.predicted = Math.round(price + trendBias * 4 + (i - 9) * trendBias * 2)
    out.push(point)
  }
  return out
}

/* ── Destinations ─────────────────────────────────────────────── */
export const destinations: Destination[] = [
  {
    id: 'santorini',
    city: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    image: img('1570077188670-e3a8d69ac5ff'),
    blurb: 'Whitewashed cliffs, cobalt domes and the most photographed sunset on Earth.',
    tags: ['Romance', 'Islands', 'Sunsets'],
    fromPrice: 612,
    trend: 'down',
    trendPct: -12,
    dealScore: 92,
    bestMonth: 'September',
    tempC: 26,
    rating: 4.9,
    history: makeHistory(720, 90, -9),
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    image: img('1540959733332-eab4deabeeaf'),
    blurb: 'Neon canyons, Michelin ramen counters and centuries-old shrines, all at once.',
    tags: ['City', 'Food', 'Culture'],
    fromPrice: 884,
    trend: 'up',
    trendPct: 7,
    dealScore: 74,
    bestMonth: 'November',
    tempC: 18,
    rating: 4.8,
    history: makeHistory(820, 70, 8),
  },
  {
    id: 'bali',
    city: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    image: img('1537996194471-e657df975ab4'),
    blurb: 'Emerald rice terraces, surf breaks and clifftop temples above the Indian Ocean.',
    tags: ['Beach', 'Wellness', 'Nature'],
    fromPrice: 738,
    trend: 'down',
    trendPct: -8,
    dealScore: 86,
    bestMonth: 'May',
    tempC: 30,
    rating: 4.7,
    history: makeHistory(810, 80, -6),
  },
  {
    id: 'maldives',
    city: 'Malé Atolls',
    country: 'Maldives',
    continent: 'Asia',
    image: img('1514282401047-d79a71a590e8'),
    blurb: 'Overwater villas, bioluminescent shores and impossibly clear turquoise lagoons.',
    tags: ['Luxury', 'Beach', 'Honeymoon'],
    fromPrice: 1290,
    trend: 'flat',
    trendPct: 1,
    dealScore: 68,
    bestMonth: 'February',
    tempC: 29,
    rating: 4.9,
    history: makeHistory(1290, 60, 1),
  },
  {
    id: 'reykjavik',
    city: 'Reykjavík',
    country: 'Iceland',
    continent: 'Europe',
    image: img('1504829857797-ddff29c27927'),
    blurb: 'Chase the aurora, soak in geothermal lagoons and drive the otherworldly Ring Road.',
    tags: ['Adventure', 'Aurora', 'Nature'],
    fromPrice: 549,
    trend: 'down',
    trendPct: -15,
    dealScore: 94,
    bestMonth: 'October',
    tempC: 6,
    rating: 4.8,
    history: makeHistory(680, 95, -11),
  },
  {
    id: 'marrakech',
    city: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    image: img('1597212618440-806262de4f6b'),
    blurb: 'Labyrinthine souks, riad courtyards and spice-scented air at the edge of the Sahara.',
    tags: ['Culture', 'Markets', 'Desert'],
    fromPrice: 458,
    trend: 'down',
    trendPct: -6,
    dealScore: 88,
    bestMonth: 'April',
    tempC: 24,
    rating: 4.6,
    history: makeHistory(520, 70, -5),
  },
  {
    id: 'amalfi',
    city: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    image: img('1533105079780-92b9be482077'),
    blurb: 'Lemon groves, pastel villages stacked on cliffs and long Tyrrhenian lunches.',
    tags: ['Coast', 'Romance', 'Food'],
    fromPrice: 690,
    trend: 'up',
    trendPct: 5,
    dealScore: 71,
    bestMonth: 'June',
    tempC: 25,
    rating: 4.8,
    history: makeHistory(640, 75, 6),
  },
  {
    id: 'capetown',
    city: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    image: img('1580060839134-75a5edca2e99'),
    blurb: 'Table Mountain, vineyard valleys and two oceans meeting at the Cape of Good Hope.',
    tags: ['Nature', 'Wine', 'Adventure'],
    fromPrice: 812,
    trend: 'down',
    trendPct: -10,
    dealScore: 90,
    bestMonth: 'March',
    tempC: 23,
    rating: 4.7,
    history: makeHistory(910, 85, -8),
  },
]

/* ── Flights ──────────────────────────────────────────────────── */
export const flights: Flight[] = [
  {
    id: 'fl-1',
    airline: 'Aurora Air',
    airlineCode: 'AA',
    logoColor: 'from-brand-400 to-iris-500',
    from: 'New York',
    fromCode: 'JFK',
    to: 'Paris',
    toCode: 'CDG',
    depart: '21:40',
    arrive: '10:55',
    duration: '7h 15m',
    stops: 0,
    price: 428,
    prevPrice: 512,
    dealScore: 93,
    cabin: 'Economy',
    emissions: 'low',
    prediction: 'rising',
    history: makeHistory(520, 60, -8),
  },
  {
    id: 'fl-2',
    airline: 'Zen Pacific',
    airlineCode: 'ZP',
    logoColor: 'from-grape-400 to-coral-400',
    from: 'San Francisco',
    fromCode: 'SFO',
    to: 'Tokyo',
    toCode: 'HND',
    depart: '11:05',
    arrive: '15:30',
    duration: '11h 25m',
    stops: 0,
    price: 712,
    prevPrice: 689,
    dealScore: 76,
    cabin: 'Economy',
    emissions: 'avg',
    prediction: 'falling',
    history: makeHistory(700, 70, 4),
  },
  {
    id: 'fl-3',
    airline: 'Meridian',
    airlineCode: 'MD',
    logoColor: 'from-gold-400 to-coral-400',
    from: 'London',
    fromCode: 'LHR',
    to: 'Cape Town',
    toCode: 'CPT',
    depart: '19:20',
    arrive: '08:05',
    duration: '11h 45m',
    stops: 1,
    stopCity: 'DXB',
    price: 596,
    prevPrice: 731,
    dealScore: 89,
    cabin: 'Economy',
    emissions: 'avg',
    prediction: 'rising',
    history: makeHistory(720, 80, -10),
  },
  {
    id: 'fl-4',
    airline: 'Nimbus',
    airlineCode: 'NB',
    logoColor: 'from-brand-300 to-mint-400',
    from: 'Berlin',
    fromCode: 'BER',
    to: 'Reykjavík',
    toCode: 'KEF',
    depart: '07:50',
    arrive: '09:40',
    duration: '3h 50m',
    stops: 0,
    price: 184,
    prevPrice: 233,
    dealScore: 95,
    cabin: 'Economy',
    emissions: 'low',
    prediction: 'rising',
    history: makeHistory(230, 40, -9),
  },
  {
    id: 'fl-5',
    airline: 'Solstice',
    airlineCode: 'SO',
    logoColor: 'from-iris-400 to-grape-500',
    from: 'Dubai',
    fromCode: 'DXB',
    to: 'Malé',
    toCode: 'MLE',
    depart: '03:10',
    arrive: '08:25',
    duration: '4h 15m',
    stops: 0,
    price: 322,
    prevPrice: 305,
    dealScore: 67,
    cabin: 'Business',
    emissions: 'high',
    prediction: 'stable',
    history: makeHistory(312, 35, 2),
  },
  {
    id: 'fl-6',
    airline: 'Aurora Air',
    airlineCode: 'AA',
    logoColor: 'from-brand-400 to-iris-500',
    from: 'Toronto',
    fromCode: 'YYZ',
    to: 'Lisbon',
    toCode: 'LIS',
    depart: '22:15',
    arrive: '09:30',
    duration: '6h 15m',
    stops: 0,
    price: 389,
    prevPrice: 458,
    dealScore: 84,
    cabin: 'Economy',
    emissions: 'low',
    prediction: 'falling',
    history: makeHistory(450, 55, -6),
  },
]

/* ── Hotels ───────────────────────────────────────────────────── */
export const hotels: Hotel[] = [
  {
    id: 'ho-1',
    name: 'Cliffside Aether Suites',
    city: 'Santorini',
    country: 'Greece',
    image: img('1582719478250-c89cae4dc85b'),
    gallery: [img('1582719478250-c89cae4dc85b', 600), img('1571896349842-33c89424de2d', 600)],
    stars: 5,
    rating: 9.6,
    reviews: 2841,
    pricePerNight: 540,
    prevPrice: 680,
    dealScore: 91,
    tags: ['Infinity Pool', 'Caldera View'],
    amenities: ['Pool', 'Spa', 'Breakfast', 'Wi-Fi'],
    distance: '0.3 km to Oia center',
  },
  {
    id: 'ho-2',
    name: 'Andaz Shibuya Sky',
    city: 'Tokyo',
    country: 'Japan',
    image: img('1566073771259-6a8506099945'),
    gallery: [img('1566073771259-6a8506099945', 600), img('1551882547-ff40c63fe5fa', 600)],
    stars: 5,
    rating: 9.4,
    reviews: 5120,
    pricePerNight: 410,
    prevPrice: 470,
    dealScore: 82,
    tags: ['Skyline View', 'Onsen'],
    amenities: ['Gym', 'Bar', 'Wi-Fi', 'Spa'],
    distance: '2 min to Shibuya Stn',
  },
  {
    id: 'ho-3',
    name: 'Jungle Canopy Resort',
    city: 'Ubud, Bali',
    country: 'Indonesia',
    image: img('1540541338287-41700207dee6'),
    gallery: [img('1540541338287-41700207dee6', 600), img('1596436889106-be35e843f974', 600)],
    stars: 5,
    rating: 9.5,
    reviews: 3387,
    pricePerNight: 268,
    prevPrice: 360,
    dealScore: 93,
    tags: ['Private Villa', 'Rice Terrace'],
    amenities: ['Pool', 'Spa', 'Breakfast', 'Yoga'],
    distance: '4 km to Ubud center',
  },
  {
    id: 'ho-4',
    name: 'Lagoon Overwater Villas',
    city: 'North Malé Atoll',
    country: 'Maldives',
    image: img('1439066615861-d1af74d74000'),
    gallery: [img('1439066615861-d1af74d74000', 600), img('1582719508461-905c673771fd', 600)],
    stars: 5,
    rating: 9.8,
    reviews: 1894,
    pricePerNight: 1180,
    prevPrice: 1180,
    dealScore: 64,
    tags: ['Overwater', 'House Reef'],
    amenities: ['Diving', 'Spa', 'Butler', 'Wi-Fi'],
    distance: '35 min seaplane',
  },
  {
    id: 'ho-5',
    name: 'Aurora Glass Lodge',
    city: 'Reykjavík',
    country: 'Iceland',
    image: img('1518562180175-34a163b1a9a6'),
    gallery: [img('1518562180175-34a163b1a9a6', 600), img('1531168556467-80aace4d0144', 600)],
    stars: 4,
    rating: 9.3,
    reviews: 1442,
    pricePerNight: 320,
    prevPrice: 415,
    dealScore: 90,
    tags: ['Aurora Glass Roof', 'Geothermal'],
    amenities: ['Hot Tub', 'Breakfast', 'Wi-Fi', 'Tours'],
    distance: '25 min to Blue Lagoon',
  },
  {
    id: 'ho-6',
    name: 'Riad Lumière',
    city: 'Marrakech',
    country: 'Morocco',
    image: img('1539020140153-e479b8c22e70'),
    gallery: [img('1539020140153-e479b8c22e70', 600), img('1551918120-9739cb430c6d', 600)],
    stars: 5,
    rating: 9.2,
    reviews: 2104,
    pricePerNight: 230,
    prevPrice: 295,
    dealScore: 87,
    tags: ['Rooftop Plunge', 'Medina'],
    amenities: ['Pool', 'Hammam', 'Breakfast', 'Wi-Fi'],
    distance: '0.6 km to Jemaa el-Fnaa',
  },
]

/* ── Watchlist ────────────────────────────────────────────────── */
export const watchlist: WatchItem[] = [
  {
    id: 'w-1',
    type: 'flight',
    title: 'JFK → CDG',
    subtitle: 'Aurora Air · Nonstop · Sep 12–22',
    image: img('1502602898657-3e91760cbb34', 600),
    currentPrice: 428,
    targetPrice: 400,
    changePct: -16,
    trend: 'down',
    dealScore: 93,
    history: makeHistory(520, 60, -8),
  },
  {
    id: 'w-2',
    type: 'hotel',
    title: 'Cliffside Aether Suites',
    subtitle: 'Santorini · 5 nights · Oct 2–7',
    image: img('1570077188670-e3a8d69ac5ff', 600),
    currentPrice: 540,
    targetPrice: 500,
    changePct: -21,
    trend: 'down',
    dealScore: 91,
    history: makeHistory(680, 70, -10),
  },
  {
    id: 'w-3',
    type: 'destination',
    title: 'Tokyo, Japan',
    subtitle: 'Bundle · Flight + 6 nights',
    image: img('1540959733332-eab4deabeeaf', 600),
    currentPrice: 1640,
    targetPrice: 1500,
    changePct: 7,
    trend: 'up',
    dealScore: 74,
    history: makeHistory(1540, 90, 9),
  },
  {
    id: 'w-4',
    type: 'flight',
    title: 'BER → KEF',
    subtitle: 'Nimbus · Nonstop · Oct 18–25',
    image: img('1504829857797-ddff29c27927', 600),
    currentPrice: 184,
    targetPrice: 175,
    changePct: -21,
    trend: 'down',
    dealScore: 95,
    history: makeHistory(230, 40, -9),
  },
]

/* ── Price alerts ─────────────────────────────────────────────── */
export const priceAlerts: PriceAlert[] = [
  {
    id: 'al-1',
    route: 'New York → Paris',
    type: 'flight',
    from: 'JFK',
    to: 'CDG',
    image: img('1502602898657-3e91760cbb34', 600),
    threshold: 420,
    currentPrice: 428,
    active: true,
    triggered: false,
    frequency: 'instant',
    createdAt: '3 days ago',
    history: makeHistory(520, 60, -8),
  },
  {
    id: 'al-2',
    route: 'Berlin → Reykjavík',
    type: 'flight',
    from: 'BER',
    to: 'KEF',
    image: img('1504829857797-ddff29c27927', 600),
    threshold: 190,
    currentPrice: 184,
    active: true,
    triggered: true,
    frequency: 'instant',
    createdAt: '1 week ago',
    history: makeHistory(230, 40, -9),
  },
  {
    id: 'al-3',
    route: 'Jungle Canopy Resort',
    type: 'hotel',
    from: 'Ubud',
    to: 'Bali',
    image: img('1537996194471-e657df975ab4', 600),
    threshold: 280,
    currentPrice: 268,
    active: true,
    triggered: true,
    frequency: 'daily',
    createdAt: '2 weeks ago',
    history: makeHistory(360, 50, -8),
  },
  {
    id: 'al-4',
    route: 'London → Cape Town',
    type: 'flight',
    from: 'LHR',
    to: 'CPT',
    image: img('1580060839134-75a5edca2e99', 600),
    threshold: 550,
    currentPrice: 596,
    active: false,
    triggered: false,
    frequency: 'weekly',
    createdAt: '1 month ago',
    history: makeHistory(720, 80, -10),
  },
]

/* ── Dashboard summary ────────────────────────────────────────── */
export const dashboardStats = [
  { label: 'Tracked trips', value: '14', delta: '+3', trend: 'up' as Trend, hint: 'this month' },
  { label: 'Active alerts', value: '8', delta: '+2', trend: 'up' as Trend, hint: 'watching now' },
  { label: 'Saved this year', value: '$4,280', delta: '+$612', trend: 'up' as Trend, hint: 'vs. avg fares' },
  { label: 'Avg deal score', value: '88', delta: '+5', trend: 'up' as Trend, hint: 'across watchlist' },
]

/** Aggregate market index for the dashboard hero chart. */
export const marketIndex: PricePoint[] = makeHistory(100, 14, -2).map((p) => ({
  ...p,
  price: Math.round(p.price),
}))

/* ── AI assistant scripted conversation ───────────────────────── */
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  chips?: string[]
}

export const assistantIntro =
  "Hi, I'm Radar — your AI travel strategist. Tell me a vibe, a budget, or a hard deadline and I'll find the moment to book."

export const assistantSuggestions = [
  'Find me a warm beach under $900 in October',
  'When should I book NYC → Tokyo?',
  'Plan a 7-day Iceland road trip',
  'Cheapest weekend in Europe next month',
]

export const sampleConversation: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'user',
    content: 'Find me a warm beach escape under $900 for late October.',
  },
  {
    id: 'm-2',
    role: 'assistant',
    content:
      "Three strong calls. Bali ($738, deal score 86) is trending down 8% — book within 9 days. Marrakech ($458) pairs desert + coast and is near its yearly floor. Cape Town ($812) opens its dry season with a 90 deal score. I'd lock Bali: my model sees fares rising after Oct 4.",
    chips: ['Bali · $738', 'Marrakech · $458', 'Cape Town · $812'],
  },
]
