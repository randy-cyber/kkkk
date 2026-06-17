# TripRadar — Travel, predicted. ✈️

A premium, mobile-first travel platform UI. TripRadar watches fares and rooms,
scores every deal, and tells you the exact moment to book. This phase is a
**world-class front-end built entirely on mock data** — the backend (Supabase)
is wired up but intentionally inert until connected.

> Designed to feel like a startup that has already raised $10M: glassmorphism,
> aurora gradients, smooth motion, dark mode, and premium typography throughout.

## ✨ Features

| Page | Route | Highlights |
| --- | --- | --- |
| **Landing** | `/` | Hero with live fare-forecast preview, feature grid, destination showcase, AI teaser, testimonials, pricing, CTA |
| **Dashboard** | `/app` | Stat cards, TripRadar Fare Index chart, live deal feed, top flight deals, trending destinations |
| **Flight search** | `/app/flights` | Smart search bar, AI booking prediction, filters, flight cards with sparklines |
| **Hotel search** | `/app/hotels` | Grid/list views, editor's pick banner, quick filters, deal-scored hotel cards |
| **AI assistant** | `/app/assistant` | Interactive "Radar AI" chat with typing indicator, suggestion chips, scripted replies |
| **Watchlist** | `/app/watchlist` | Tracked items, progress-to-target bars, price sparklines |
| **Price alerts** | `/app/alerts` | Create/toggle alerts, triggered states, threshold tracking |
| **Dream destinations** | `/app/destinations` | Filter by continent/vibe, featured deal, 12-month fare history & forecast |

## 🧰 Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-first theme, custom design tokens)
- **React Router 7** — routing
- **Framer Motion** — page transitions, scroll reveals, micro-interactions
- **Recharts** — price-history & forecast charts
- **Lucide React** — icons
- **Supabase** — client configured for the upcoming backend (mock-data fallback)

## 🎨 Design system

- **Palette:** deep ink backgrounds with brand (cyan → indigo → violet) and gold/coral accents
- **Glassmorphism** surfaces (`.glass`, `.glass-strong`) with backdrop blur
- **Animated aurora** background + fine grid
- **Typography:** Sora (display), Inter (body), Fraunces italic (editorial accents)
- **Deal Score™** badges, trend pills, and reusable flight/hotel/destination cards

Tokens live in `src/index.css`; shared primitives in `src/components/ui`.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the build
npm run lint
```

## 🔌 Connecting Supabase (later)

The app needs no credentials to run. When you're ready for the backend:

```bash
cp .env.example .env.local
# set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

`src/lib/supabase.ts` exposes `supabase` and `isSupabaseConfigured` so feature
code can branch on availability without crashing.

## 📁 Structure

```
src/
  components/
    cards/      FlightCard, HotelCard, DestinationCard
    layout/     AppLayout (sidebar, topbar, mobile nav), navItems
    ui/         Button, DealScoreBadge, PriceChart, SmartImage, AuroraBackground, …
    Logo.tsx
  lib/
    mockData.ts   destinations, flights, hotels, watchlist, alerts, chat
    motion.ts     shared Framer Motion variants
    supabase.ts   client (inert until configured)
    utils.ts      cn(), formatters, deal-score helpers
  pages/          Landing, Dashboard, Flights, Hotels, Assistant, Watchlist, Alerts, Destinations
  main.tsx        router + lazy-loaded routes
```

---

Built for travelers who hate overpaying.
