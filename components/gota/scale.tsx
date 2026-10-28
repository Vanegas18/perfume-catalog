import { cn } from '@/lib/utils'

/*
  Recurso gráfico de Gota: la escala graduada de una probeta.
  Se usa como divisor, como lectura de tamaño (5/30/100 ml) y como medidor de stock.
  La barra solo anima transform (scaleX), nunca width.
*/

interface ScaleProps {
  value?: number // ml marcados; sin value es solo divisor
  max?: number
  tone?: 'light' | 'dark'
  labels?: boolean
  className?: string
}

const TICKS = Array.from({ length: 21 }, (_, i) => i * 5) // 0..100 cada 5 ml

export function Scale({ value, max = 100, tone = 'light', labels = false, className }: ScaleProps) {
  const ink = tone === 'dark' ? 'bg-hueso' : 'bg-tinta'
  const text = tone === 'dark' ? 'text-hueso/75' : 'text-grafito'
  const track = tone === 'dark' ? 'bg-hueso/20' : 'bg-tinta/12'
  const ratio = value === undefined ? 0 : Math.min(value / max, 1)

  return (
    <div className={cn('w-full', className)} aria-hidden="true">
      <div className="flex h-3.5 items-end justify-between">
        {TICKS.map((t) => (
          <span
            key={t}
            className={cn('block w-px', ink, t % 50 === 0 ? 'h-3.5' : t % 10 === 0 ? 'h-2.5' : 'h-1.5')}
          />
        ))}
      </div>
      {value !== undefined && (
        <div className={cn('mt-1 h-1 w-full overflow-hidden', track)}>
          <div
            className="h-full w-full origin-left bg-rojo transition-transform duration-500 ease-(--ease-dosis)"
            style={{ transform: `scaleX(${ratio})` }}
          />
        </div>
      )}
      {labels && (
        <div className={cn('num mt-1.5 flex justify-between text-[11px] leading-none', text)}>
          <span>0</span>
          <span>50</span>
          <span>100 ml</span>
        </div>
      )}
    </div>
  )
}
