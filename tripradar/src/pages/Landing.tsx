import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Plane,
  BedDouble,
  Sparkles,
  BellRing,
  LineChart,
  ShieldCheck,
  Star,
  Quote,
  Globe2,
  Check,
  Menu,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { Reveal } from '@/components/ui/Reveal'
import { staggerContainer, revealItem } from '@/lib/motion'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { PriceChart } from '@/components/ui/PriceChart'
import { destinations, marketIndex, img } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

const features = [
  {
    icon: LineChart,
    title: 'Fare prediction',
    desc: 'Our model watches billions of price points and tells you whether to book now or wait — with a confidence score.',
    tone: 'from-brand-400 to-iris-500',
  },
  {
    icon: Sparkles,
    title: 'Deal Score™',
    desc: 'Every flight, hotel and trip gets a 0–100 score so you instantly know a steal from a tourist trap.',
    tone: 'from-gold-300 to-coral-400',
  },
  {
    icon: BellRing,
    title: 'Instant price alerts',
    desc: 'Set a target price once. We ping you the moment a fare or room drops below it — across 900+ providers.',
    tone: 'from-grape-400 to-iris-500',
  },
  {
    icon: Globe2,
    title: 'Dream destinations',
    desc: 'Tell us a vibe and a budget. Radar surfaces where to go and exactly when fares hit their floor.',
    tone: 'from-mint-400 to-brand-400',
  },
]

const stats = [
  { value: '$1.2B', label: 'Saved for travelers' },
  { value: '900+', label: 'Booking sources' },
  { value: '4.9★', label: 'App Store rating' },
  { value: '2.4M', label: 'Trips tracked' },
]

const testimonials = [
  {
    quote:
      'TripRadar told me to wait three days on a Tokyo fare. It dropped $260. I have never trusted an app this much.',
    name: 'Maya Chen',
    role: 'Design Lead, Figma',
    img: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote:
      'The Deal Score is genuinely uncanny. I booked a 94-score riad in Marrakech and it was the trip of my life.',
    name: 'Daniel Okafor',
    role: 'Founder, Northwind',
    img: 'https://i.pravatar.cc/80?img=12',
  },
  {
    quote:
      'It feels less like a booking site and more like having a travel hedge fund in my pocket.',
    name: 'Sofia Andersson',
    role: 'Product, Spotify',
    img: 'https://i.pravatar.cc/80?img=32',
  },
]

const plans = [
  {
    name: 'Explorer',
    price: 'Free',
    sub: 'forever',
    features: ['3 active price alerts', 'Deal Scores', 'Basic fare history', 'Web app'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    sub: '/ month',
    features: [
      'Unlimited alerts',
      'AI fare prediction',
      'Radar AI assistant',
      'Watchlist & bundles',
      'Priority deal feed',
    ],
    cta: 'Go Pro',
    highlight: true,
  },
  {
    name: 'Concierge',
    price: '$39',
    sub: '/ month',
    features: ['Everything in Pro', 'Human concierge', 'Auto-rebooking', 'Lounge & upgrade alerts'],
    cta: 'Talk to us',
    highlight: false,
  },
]

function MarketingNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#destinations" className="transition-colors hover:text-white">
            Destinations
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/app" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/app">
            <Button size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>
              Launch app
            </Button>
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-2 md:hidden">
          {['Features', 'Destinations', 'Pricing'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="relative px-4 pt-36 pb-20 sm:pt-44">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={revealItem} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-white/10">
              <span className="flex h-1.5 w-1.5">
                <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-mint-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
              </span>
              Series A · $10M raised to make travel predictable
            </span>
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl"
          >
            Travel,{' '}
            <span className="font-serif italic font-medium text-gradient">predicted.</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-xl text-lg text-slate-300"
          >
            TripRadar watches every fare and room on Earth, scores the deals, and tells you the
            exact moment to book. Stop guessing. Start arriving.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/app">
              <Button size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
                Find my next deal
              </Button>
            </Link>
            <Link to="/app/assistant">
              <Button variant="glass" size="lg" icon={<Sparkles className="h-5 w-5 text-grape-400" />}>
                Ask Radar AI
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating search + preview composition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          {/* Search bar */}
          <div className="glass-strong relative z-20 mx-auto -mb-10 grid max-w-3xl gap-2 rounded-3xl p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
            {[
              { label: 'From', value: 'New York (JFK)' },
              { label: 'To', value: 'Anywhere' },
              { label: 'When', value: 'Oct 2 — Oct 9' },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl px-4 py-2.5 text-left hover:bg-white/5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {f.label}
                </p>
                <p className="text-sm font-semibold text-white">{f.value}</p>
              </div>
            ))}
            <Button size="lg" className="h-full" iconRight={<ArrowRight className="h-5 w-5" />}>
              Search
            </Button>
          </div>

          {/* Dashboard glass preview */}
          <div className="glass relative overflow-hidden rounded-[2rem] p-4 pt-14 ring-1 ring-white/10">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="glass-strong rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Fare forecast · JFK → CDG</p>
                    <p className="font-display text-2xl font-bold text-white">{formatPrice(428)}</p>
                  </div>
                  <DealScoreBadge score={93} size="lg" />
                </div>
                <div className="mt-2">
                  <PriceChart data={marketIndex} height={180} />
                </div>
                <p className="mt-1 text-center text-xs text-slate-400">
                  <span className="text-grape-400">— — —</span> forecast suggests booking within{' '}
                  <span className="font-semibold text-mint-400">3 days</span>
                </p>
              </div>

              <div className="space-y-3">
                {destinations.slice(0, 3).map((d) => (
                  <div key={d.id} className="glass-strong flex items-center gap-3 rounded-2xl p-3">
                    <img
                      src={img(d.image.split('photo-')[1].split('?')[0], 200)}
                      alt={d.city}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{d.city}</p>
                      <p className="truncate text-xs text-slate-400">from {formatPrice(d.fromPrice)}</p>
                    </div>
                    <DealScoreBadge score={d.dealScore} size="sm" showLabel={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* floating accents */}
          <div className="animate-float absolute -left-6 top-1/3 hidden lg:block">
            <div className="glass-strong flex items-center gap-2 rounded-2xl px-3 py-2 shadow-2xl">
              <Plane className="h-4 w-4 text-brand-300" />
              <span className="text-xs font-semibold text-white">Fare dropped $84</span>
            </div>
          </div>
          <div className="animate-float absolute -right-4 bottom-1/4 hidden lg:block [animation-delay:-3s]">
            <div className="glass-strong flex items-center gap-2 rounded-2xl px-3 py-2 shadow-2xl">
              <BedDouble className="h-4 w-4 text-grape-400" />
              <span className="text-xs font-semibold text-white">5★ riad · score 94</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="relative overflow-x-clip">
      <AuroraBackground />
      <MarketingNav />
      <Hero />

      {/* Trust bar */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-slate-500">
            Backed by world-class investors & trusted by travelers from
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400">
            {['Sequoia', 'a16z', 'Stripe', 'Airbnb', 'Booking', 'Spotify'].map((b) => (
              <span key={b} className="font-display text-xl font-bold opacity-50 grayscale">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-6">
        <Reveal>
          <div className="glass mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
              The TripRadar edge
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              An unfair advantage on every trip
            </h2>
            <p className="mt-4 text-slate-300">
              Four systems working together so you always book at the perfect moment, for the
              perfect price.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={revealItem}
                className="glass group relative overflow-hidden rounded-3xl p-7 transition-all hover:ring-glow"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.tone} shadow-lg`}
                >
                  <f.icon className="h-6 w-6 text-ink-950" strokeWidth={2.4} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.desc}</p>
                <ArrowRight className="absolute right-6 top-7 h-5 w-5 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-brand-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-grape-400">
                Trending now
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                Where fares are falling
              </h2>
            </div>
            <Link to="/app/destinations">
              <Button variant="glass" iconRight={<ArrowRight className="h-4 w-4" />}>
                Explore all
              </Button>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((d, i) => (
              <Reveal key={d.id} delay={i * 0.05}>
                <DestinationCard dest={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI teaser */}
      <section className="px-4 py-20">
        <Reveal>
          <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-grape-500/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grape-400/20 to-coral-400/20 px-3 py-1 text-xs font-semibold text-grape-300 ring-1 ring-white/10">
                  <Sparkles className="h-3.5 w-3.5" /> Meet Radar AI
                </span>
                <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
                  Your personal travel strategist
                </h2>
                <p className="mt-4 text-slate-300">
                  Describe a vibe, a budget, or a hard deadline. Radar plans the route, predicts the
                  price curve, and tells you exactly when to pull the trigger.
                </p>
                <Link to="/app/assistant" className="mt-6 inline-block">
                  <Button size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
                    Chat with Radar
                  </Button>
                </Link>
              </div>
              <div className="glass-strong space-y-3 rounded-3xl p-5">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-brand-400 to-iris-500 px-4 py-2.5 text-sm font-medium text-ink-950">
                  Warm beach under $900 in October?
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/8 px-4 py-3 text-sm text-slate-200">
                  Lock Bali at <span className="font-semibold text-brand-300">$738</span> (Deal Score
                  86). My model sees fares climbing after Oct 4 — book within 9 days. 🌴
                </div>
                <div className="flex gap-2">
                  {['Bali · $738', 'Marrakech · $458'].map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
              Loved by 2.4 million travelers
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="glass h-full rounded-3xl p-6">
                  <Quote className="h-7 w-7 text-brand-400/60" />
                  <blockquote className="mt-3 text-sm leading-relaxed text-slate-200">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full ring-2 ring-white/15" />
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">Pricing</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Pays for itself on the first trip
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div
                  className={`relative h-full rounded-3xl p-7 ${
                    p.highlight
                      ? 'glass-strong ring-2 ring-brand-400/50'
                      : 'glass ring-1 ring-white/10'
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-iris-500 px-3 py-1 text-[11px] font-bold text-ink-950">
                      MOST POPULAR
                    </span>
                  )}
                  <p className="font-display text-lg font-bold text-white">{p.name}</p>
                  <p className="mt-3">
                    <span className="font-display text-4xl font-extrabold text-white">{p.price}</span>
                    <span className="text-sm text-slate-400"> {p.sub}</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-400/15">
                          <Check className="h-3 w-3 text-brand-300" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/app" className="mt-7 block">
                    <Button variant={p.highlight ? 'primary' : 'glass'} className="w-full">
                      {p.cta}
                    </Button>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-iris-600 via-grape-500 to-brand-500 p-10 text-center sm:p-16">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
            <div className="relative">
              <ShieldCheck className="mx-auto h-10 w-10 text-white" />
              <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
                Never overpay for travel again
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Join millions who let TripRadar time the market for them. Free to start — no card
                required.
              </p>
              <Link to="/app" className="mt-8 inline-block">
                <Button variant="glass" size="lg" className="bg-white text-ink-950 hover:bg-white">
                  Launch TripRadar <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              The intelligent travel platform. Travel, predicted.
            </p>
          </div>
          {[
            { h: 'Product', items: ['Flights', 'Hotels', 'Radar AI', 'Price Alerts'] },
            { h: 'Company', items: ['About', 'Careers', 'Press', 'Blog'] },
            { h: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-sm font-semibold text-white">{col.h}</p>
              <ul className="mt-3 space-y-2">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© 2026 TripRadar, Inc. All rights reserved.</p>
          <p className="text-xs text-slate-500">Made for travelers who hate overpaying.</p>
        </div>
      </footer>
    </div>
  )
}
