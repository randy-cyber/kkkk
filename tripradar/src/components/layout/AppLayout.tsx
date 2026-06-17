import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bell, Settings, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { navItems } from './navItems'
import { cn } from '@/lib/utils'

function SidebarLink({ to, label, icon: Icon, badge }: (typeof navItems)[number]) {
  return (
    <NavLink to={to} end={to === '/app'}>
      {({ isActive }) => (
        <span
          className={cn(
            'group relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
            isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5',
          )}
        >
          {isActive && (
            <motion.span
              layoutId="sidebar-active"
              className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-brand-400/18 to-iris-500/18 ring-1 ring-white/12"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <Icon
            className={cn('h-[18px] w-[18px] shrink-0', isActive && 'text-brand-300')}
            strokeWidth={2.2}
          />
          <span className="flex-1">{label}</span>
          {badge && (
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                badge === 'AI'
                  ? 'bg-gradient-to-r from-grape-400 to-coral-400 text-ink-950'
                  : 'bg-white/10 text-slate-200',
              )}
            >
              {badge}
            </span>
          )}
        </span>
      )}
    </NavLink>
  )
}

export function AppLayout() {
  const location = useLocation()
  const current = navItems.find(
    (n) => n.to === location.pathname || (n.to !== '/app' && location.pathname.startsWith(n.to)),
  )

  return (
    <div className="min-h-dvh">
      <AuroraBackground />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col p-4 lg:flex">
        <div className="glass flex h-full flex-col rounded-3xl p-4">
          <Link to="/" className="px-2 py-2">
            <Logo />
          </Link>

          <nav className="mt-4 flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <SidebarLink key={item.to} {...item} />
            ))}
          </nav>

          {/* upgrade card */}
          <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-iris-600/40 via-grape-500/30 to-brand-500/30 p-4 ring-1 ring-white/15">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-400/40 blur-2xl" />
            <p className="text-sm font-semibold text-white">TripRadar Pro</p>
            <p className="mt-1 text-xs text-slate-200/80">
              Unlimited alerts, fare prediction & concierge.
            </p>
            <button className="mt-3 inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-ink-950 transition-transform hover:scale-[1.03]">
              Upgrade <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl p-2">
            <img
              src="https://i.pravatar.cc/80?img=68"
              alt="You"
              className="h-9 w-9 rounded-full ring-2 ring-white/15"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">Alex Rivera</p>
              <p className="truncate text-xs text-slate-400">Pro member</p>
            </div>
            <Settings className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 px-4 pt-4">
          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="lg:hidden">
              <Logo compact />
            </div>
            <div>
              <h1 className="font-display text-base font-bold text-white sm:text-lg">
                {current?.label ?? 'Dashboard'}
              </h1>
              <p className="hidden text-xs text-slate-400 sm:block">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="ml-auto hidden items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10 md:flex md:w-72 lg:w-80">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Search cities, hotels, flights…"
                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-400">⌘K</kbd>
            </div>

            <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:text-white">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-coral-400 ring-2 ring-ink-900" />
            </button>
            <img
              src="https://i.pravatar.cc/80?img=68"
              alt="You"
              className="h-10 w-10 rounded-xl ring-2 ring-white/15 lg:hidden"
            />
          </div>
        </header>

        <main className="px-4 pb-28 pt-4 lg:pb-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:hidden">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-2 py-2">
          {navItems.slice(0, 5).map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/app'} className="flex-1">
              {({ isActive }) => (
                <span
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition-colors',
                    isActive ? 'text-brand-300' : 'text-slate-400',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                  {label.split(' ')[0]}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
