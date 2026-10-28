'use client'

import { useMemo, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { Scale } from '@/components/gota/scale'
import { SizeSelector } from '@/components/gota/size-selector'
import { FragranceLabel } from '@/components/gota/fragrance-label'
import { WhatsappIcon } from '@/components/gota/whatsapp-icon'
import { firstAvailable, formatCOP, pricePerMl, type SizeMl } from '@/lib/products'
import { orderLink, restockLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function Hero() {
  const { fragrances, enterOwnerMode } = useStore()
  const featured = useMemo(() => fragrances.find((f) => f.featured) ?? fragrances[0], [fragrances])
  const [ml, setMl] = useState<SizeMl>(() => (featured ? firstAvailable(featured).ml : 30))

  if (!featured) return null
  const size = featured.sizes.find((s) => s.ml === ml) ?? featured.sizes[0]
  const soldOut = size.stock <= 0

  return (
    <section id="inicio" aria-labelledby="hero-title" className="mx-auto max-w-7xl px-4 pt-5 pb-10 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10 lg:pt-16 lg:pb-24">
      <div className="reveal lg:col-span-6 lg:pt-6">
        <p className="num mb-3 text-xs tracking-[0.12em] text-grafito uppercase lg:mb-6">Casa de fragancias · El Poblado</p>
        <h1 id="hero-title" className="text-[2.6rem] leading-[0.95] font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[5rem]">
          Pruébela en 5&nbsp;ml. Enamórese en&nbsp;100.
        </h1>
        <p className="mt-4 max-w-md text-base leading-snug text-grafito lg:mt-6 lg:text-lg">
          {fragrances.length} fragancias propias en tres tamaños. Pida por WhatsApp y la recibe hoy en Medellín.
        </p>
        <div className="mt-8 hidden flex-wrap items-center gap-4 lg:flex">
          <a href="#catalogo" className={buttonVariants({ variant: 'ink' })}>
            Ver el catálogo
          </a>
          <button type="button" onClick={enterOwnerMode} className={buttonVariants({ variant: 'link' })}>
            Probar el panel del dueño
          </button>
        </div>
        <Scale className="mt-14 hidden max-w-md lg:block" labels />
      </div>

      {/* Ficha destacada: demuestra el servicio en la primera pantalla */}
      <div className="reveal mt-5 [animation-delay:120ms] lg:col-span-6 lg:mt-0">
        <article aria-label={`Destacada: Nº ${featured.code} ${featured.name}`} className="on-tinta bg-tinta text-hueso lg:grid lg:grid-cols-2">
          <div className="hidden lg:block">
            <FragranceLabel fragrance={featured} ml={ml} />
          </div>
          <div className="flex flex-col p-4 sm:p-6">
            <p className="num text-[11px] tracking-widest text-niebla uppercase">Destacada de la casa</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight lg:text-2xl">
              Nº {featured.code} {featured.name}
            </h2>
            <p className="num mt-1 text-xs text-niebla">{featured.notes.join(' · ')}</p>
            <p className="mt-3 hidden text-sm leading-snug text-hueso/85 lg:block">{featured.description}</p>

            <div className="mt-4 lg:mt-auto lg:pt-6">
              <SizeSelector tone="dark" label="Tamaño" sizes={featured.sizes} value={ml} onChange={setMl} />
              <Scale tone="dark" value={ml} className="mt-4" />
              <p className="mt-3 flex items-baseline justify-between" aria-live="polite">
                <span className="num text-2xl">{formatCOP(size.price)}</span>
                <span className="num text-xs text-niebla">
                  {soldOut ? 'Agotado' : `${formatCOP(pricePerMl(size))}/ml`}
                </span>
              </p>
            </div>
          </div>
        </article>

        <a
          href={soldOut ? restockLink(featured, size) : orderLink(featured, size)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'primary' }), 'mt-3 w-full text-[17px] lg:h-14')}
        >
          <WhatsappIcon className="size-5" />
          {soldOut ? `Avisarme cuando llegue ${size.ml} ml` : `Pedir ${size.ml} ml por WhatsApp`}
        </a>
        <button
          type="button"
          onClick={enterOwnerMode}
          className={cn(buttonVariants({ variant: 'link', size: 'sm' }), 'mx-auto mt-1 flex text-grafito lg:hidden')}
        >
          Probar el panel del dueño
        </button>
      </div>
    </section>
  )
}
