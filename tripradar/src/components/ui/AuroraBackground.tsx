import { cn } from '@/lib/utils'

/**
 * Ambient animated aurora gradient blobs + subtle grid.
 * Sits behind page content (fixed, pointer-events-none).
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-ink-950" />
      {/* aurora blobs */}
      <div className="animate-aurora absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-iris-500/25 blur-[120px]" />
      <div className="animate-aurora absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-brand-500/20 blur-[120px] [animation-delay:-4s]" />
      <div className="animate-aurora absolute -bottom-48 left-1/4 h-[40rem] w-[40rem] rounded-full bg-grape-500/20 blur-[130px] [animation-delay:-8s]" />
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      {/* noise vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(6,7,13,0.9)_100%)]" />
    </div>
  )
}
