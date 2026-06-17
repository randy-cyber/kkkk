import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Plane, Compass, Wand2, TrendingDown } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { DealScoreBadge } from '@/components/ui/DealScoreBadge'
import { SmartImage } from '@/components/ui/SmartImage'
import {
  assistantIntro,
  assistantSuggestions,
  destinations,
  type ChatMessage,
} from '@/lib/mockData'
import { cn, formatPrice } from '@/lib/utils'

let idCounter = 0
const nextId = () => `m-${++idCounter}`

const cannedReply = (prompt: string): ChatMessage => {
  const lower = prompt.toLowerCase()
  if (lower.includes('iceland') || lower.includes('road trip')) {
    return {
      id: nextId(),
      role: 'assistant',
      content:
        "A 7-day Iceland Ring Road in October is a dream — and fares are near their floor. Fly BER → KEF for $184 (Deal Score 95). Days 1–2 Golden Circle + Blue Lagoon, 3–4 South Coast waterfalls & black sand, 5 Jökulsárlón glacier lagoon, 6–7 aurora hunting from a glass lodge. Aurora forecast peaks Oct 18–22.",
      chips: ['BER → KEF · $184', 'Aurora Glass Lodge · $320', 'Save itinerary'],
    }
  }
  if (lower.includes('tokyo') || lower.includes('when should i book')) {
    return {
      id: nextId(),
      role: 'assistant',
      content:
        "For NYC → Tokyo, hold. My model has fares falling ~6% over the next 11 days as airlines add autumn capacity. I'd set an alert at $640 and book the moment it triggers. Cherry tip: November has the best price-to-weather ratio of the year.",
      chips: ['Set alert · $640', 'Tokyo · Deal 74', 'Show fare history'],
    }
  }
  return {
    id: nextId(),
    role: 'assistant',
    content:
      "Three strong calls under budget. Bali ($738, Deal Score 86) is trending down 8% — book within 9 days. Marrakech ($458) sits near its yearly floor and pairs desert with coast. Cape Town ($812, score 90) opens its dry season. I'd lock Bali before fares climb after Oct 4. 🌴",
    chips: ['Bali · $738', 'Marrakech · $458', 'Cape Town · $812'],
  }
}

const capabilities = [
  { icon: Wand2, label: 'Plan a trip' },
  { icon: TrendingDown, label: 'Time the market' },
  { icon: Compass, label: 'Discover spots' },
  { icon: Plane, label: 'Compare routes' },
]

export default function Assistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: 'assistant', content: assistantIntro },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    const value = text.trim()
    if (!value || typing) return
    setMessages((m) => [...m, { id: nextId(), role: 'user', content: value }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, cannedReply(value)])
      setTyping(false)
    }, 1100)
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_320px]">
      {/* Chat column */}
      <div className="glass flex h-[calc(100dvh-9.5rem)] min-h-[560px] flex-col overflow-hidden rounded-3xl">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
          <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-grape-400 to-brand-400">
            <Sparkles className="h-5 w-5 text-ink-950" />
          </span>
          <div>
            <p className="font-semibold text-white">Radar AI</p>
            <p className="flex items-center gap-1.5 text-xs text-mint-400">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" /> online · powered by mock data
            </p>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
            >
              {m.role === 'assistant' ? (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-grape-400 to-brand-400">
                  <Sparkles className="h-4 w-4 text-ink-950" />
                </span>
              ) : (
                <img
                  src="https://i.pravatar.cc/60?img=68"
                  alt="You"
                  className="h-8 w-8 shrink-0 rounded-xl"
                />
              )}
              <div className={cn('max-w-[78%]', m.role === 'user' && 'items-end')}>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'rounded-br-md bg-gradient-to-r from-brand-400 to-iris-500 font-medium text-ink-950'
                      : 'rounded-bl-md bg-white/8 text-slate-200',
                  )}
                >
                  {m.content}
                </div>
                {m.chips && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.chips.map((c) => (
                      <button
                        key={c}
                        onClick={() => send(c)}
                        className="rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-white/10 transition-colors hover:bg-white/12 hover:text-white"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-grape-400 to-brand-400">
                  <Sparkles className="h-4 w-4 text-ink-950" />
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/8 px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* suggestions + input */}
        <div className="border-t border-white/8 p-3 sm:p-4">
          {messages.length <= 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {assistantSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 focus-within:ring-brand-400/50"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Radar anything about your next trip…"
              className="flex-1 bg-transparent px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-brand-400 to-iris-500 text-ink-950 transition-transform hover:brightness-110 active:scale-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Side panel */}
      <div className="hidden space-y-4 lg:block">
        <div className="glass rounded-3xl p-5">
          <Logo compact className="mb-3" />
          <p className="text-sm font-semibold text-white">What Radar can do</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {capabilities.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/8"
              >
                <c.icon className="h-5 w-5 text-brand-300" />
                <p className="mt-2 text-xs font-medium text-slate-200">{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <p className="text-sm font-semibold text-white">Radar's picks today</p>
          <div className="mt-3 space-y-3">
            {destinations.slice(4, 7).map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <SmartImage src={d.image} alt={d.city} className="h-12 w-12 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{d.city}</p>
                  <p className="text-xs text-slate-400">from {formatPrice(d.fromPrice)}</p>
                </div>
                <DealScoreBadge score={d.dealScore} size="sm" showLabel={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
