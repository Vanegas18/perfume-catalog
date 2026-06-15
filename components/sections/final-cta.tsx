'use client'

import { MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { GENERAL_INQUIRY } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-secondary/30">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Encuentra tu fragancia ideal hoy
        </h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Nuestro equipo está listo para asesorarte y ayudarte a elegir el aroma
          perfecto para ti.
        </p>
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
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  )
}
