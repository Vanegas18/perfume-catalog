import { cn } from '@/lib/utils'

// Logotipo tipográfico: minúsculas + el punto rojo como "gota"
export function Wordmark({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('text-2xl leading-none font-bold tracking-[-0.04em]', tone === 'dark' ? 'text-hueso' : 'text-tinta', className)}>
      gota<span className="text-rojo">.</span>
    </span>
  )
}
