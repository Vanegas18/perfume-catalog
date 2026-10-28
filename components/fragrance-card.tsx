'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { FragranceLabel } from '@/components/gota/fragrance-label'
import { SizeSelector } from '@/components/gota/size-selector'
import { WhatsappIcon } from '@/components/gota/whatsapp-icon'
import { FAMILY_LABELS, firstAvailable, formatCOP, pricePerMl, type Fragrance, type SizeMl } from '@/lib/products'
import { orderLink, restockLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface Props {
  fragrance: Fragrance
  onEdit: (f: Fragrance) => void
  onDelete: (f: Fragrance) => void
}

export function FragranceCard({ fragrance, onEdit, onDelete }: Props) {
  const { isOwner } = useStore()
  const [ml, setMl] = useState<SizeMl>(() => firstAvailable(fragrance).ml)
  const size = fragrance.sizes.find((s) => s.ml === ml) ?? fragrance.sizes[0]
  const soldOut = size.stock <= 0
  const low = !soldOut && size.stock <= 3
  const titleId = `frag-${fragrance.id}`

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'grid grid-cols-[minmax(0,38%)_minmax(0,1fr)] gap-4 border-t border-tinta py-5 sm:flex sm:flex-col sm:gap-0 sm:border sm:border-linea sm:bg-papel sm:p-0',
        isOwner && 'sm:border-tinta',
      )}
    >
      <div className="self-start sm:border-b sm:border-linea">
        <FragranceLabel fragrance={fragrance} ml={ml} />
      </div>

      <div className="min-w-0 sm:flex-1 sm:px-5 sm:pt-5">
        <p className="num text-[11px] tracking-widest text-grafito uppercase">{FAMILY_LABELS[fragrance.family]}</p>
        <h3 id={titleId} className="mt-1 text-xl leading-tight font-bold tracking-tight">
          Nº {fragrance.code} {fragrance.name}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-snug text-grafito sm:line-clamp-none">{fragrance.description}</p>
      </div>

      <div className="col-span-2 sm:px-5 sm:pt-5 sm:pb-5">
          <SizeSelector label={`Tamaño de ${fragrance.name}`} sizes={fragrance.sizes} value={ml} onChange={setMl} />
          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3" aria-live="polite">
            <span className="num text-xl">{formatCOP(size.price)}</span>
            <span className={cn('num text-xs', soldOut || low ? 'text-rojo-hondo' : 'text-grafito')}>
              {soldOut ? 'Agotado' : low ? `Quedan ${size.stock}` : `${formatCOP(pricePerMl(size))}/ml`}
            </span>
          </p>

          {isOwner ? (
            <div className="mt-3 border-t border-dashed border-tinta/40 pt-3">
              <p className="num text-xs text-grafito">
                Stock: {fragrance.sizes.map((s) => `${s.ml} ml · ${s.stock}`).join(' | ')}
              </p>
              <div className="mt-2 flex gap-2">
                <Button variant="ink" size="sm" className="flex-1" onClick={() => onEdit(fragrance)}>
                  <Pencil className="size-4" /> Editar
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  aria-label={`Eliminar ${fragrance.name}`}
                  onClick={() => onDelete(fragrance)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <a
              href={soldOut ? restockLink(fragrance, size) : orderLink(fragrance, size)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: soldOut ? 'outline' : 'ink', size: 'sm' }), 'mt-3 w-full')}
            >
              <WhatsappIcon className="size-4" />
              {soldOut ? 'Avisarme' : `Pedir ${size.ml} ml`}
              <span className="sr-only"> de {fragrance.name} por WhatsApp</span>
            </a>
          )}
      </div>
    </article>
  )
}
