import {
  LayoutDashboard,
  Plane,
  BedDouble,
  Sparkles,
  Eye,
  BellRing,
  Compass,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
}

export const navItems: NavItem[] = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/flights', label: 'Flights', icon: Plane },
  { to: '/app/hotels', label: 'Hotels', icon: BedDouble },
  { to: '/app/assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
  { to: '/app/watchlist', label: 'Watchlist', icon: Eye, badge: '4' },
  { to: '/app/alerts', label: 'Price Alerts', icon: BellRing, badge: '2' },
  { to: '/app/destinations', label: 'Dream Trips', icon: Compass },
]
