'use client'

import Image from 'next/image'
import { MessageCircle, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { GENERAL_INQUIRY } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border/60"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -left-40 top-0 size-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-gold/5 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold">
            <Sparkles className="size-3.5" />
            Fragancias exclusivas
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Fragancias que dejan{' '}
            <span className="text-gold">huella</span>
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Descubre tu estilo con nuestras fragancias exclusivas. Aromas
            duraderos, originales y seleccionados para cada ocasión.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GENERAL_INQUIRY}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gold text-gold-foreground hover:bg-gold/90',
              )}
            >
              <MessageCircle className="size-5" />
              Consultar por WhatsApp
            </a>
            <a
              href="#catalogo"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-border bg-transparent',
              )}
            >
              Ver catálogo
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/70">
            <Image
              src="/hero-perfume.png"
              alt="Frasco de perfume de lujo con detalles dorados"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
