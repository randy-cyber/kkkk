import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  /** gradient shown while loading and if the image fails */
  fallback?: string
}

/**
 * Image with a graceful gradient fallback + fade-in. Keeps the UI looking
 * premium even when an Unsplash url is offline or rate-limited.
 */
export function SmartImage({
  src,
  alt,
  className,
  fallback = 'from-ink-700 via-ink-800 to-ink-900',
}: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={cn('relative overflow-hidden bg-ink-800', className)}>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br transition-opacity duration-700',
          fallback,
          status === 'loaded' ? 'opacity-0' : 'opacity-100',
        )}
      />
      {status === 'loading' && <div className="absolute inset-0 shimmer" />}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-all duration-700 will-change-transform',
            status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
          )}
        />
      )}
    </div>
  )
}
