import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'glass' | 'ghost' | 'gold'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-400 to-iris-500 text-ink-950 font-semibold shadow-lg shadow-iris-500/25 hover:shadow-iris-500/40 hover:brightness-110',
  gold: 'bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-semibold shadow-lg shadow-gold-500/25 hover:brightness-110',
  glass: 'glass text-slate-100 hover:bg-white/10',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/8',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-xl gap-1.5',
  md: 'h-11 px-5 text-sm rounded-xl gap-2',
  lg: 'h-13 px-7 text-base rounded-2xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
}
