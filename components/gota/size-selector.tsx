'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Presentation, SizeMl } from '@/lib/products'

interface SizeSelectorProps {
  sizes: Presentation[]
  value: SizeMl
  onChange: (ml: SizeMl) => void
  tone?: 'light' | 'dark'
  label: string
}

// radiogroup accesible: flechas para moverse, tamaños agotados siguen enfocables y se anuncian
export function SizeSelector({ sizes, value, onChange, tone = 'light', label }: SizeSelectorProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const dark = tone === 'dark'

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (index + dir + sizes.length) % sizes.length
    onChange(sizes[next].ml)
    refs.current[next]?.focus()
  }

  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1.5">
      {sizes.map((s, i) => {
        const selected = s.ml === value
        const soldOut = s.stock <= 0
        return (
          <button
            key={s.ml}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(s.ml)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'num relative flex h-11 min-w-14 cursor-pointer items-center justify-center rounded-sm border px-3 text-sm transition-colors duration-200',
              selected
                ? 'border-rojo bg-rojo text-white'
                : dark
                  ? 'border-hueso/40 text-hueso hover:border-hueso'
                  : 'border-tinta/30 text-tinta hover:border-tinta',
              soldOut && !selected && 'line-through decoration-1 opacity-60',
            )}
          >
            {s.ml} ml
            {soldOut && <span className="sr-only"> (agotado)</span>}
          </button>
        )
      })}
    </div>
  )
}
