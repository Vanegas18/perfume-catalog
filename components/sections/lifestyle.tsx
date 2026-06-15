'use client'

import Image from 'next/image'

const TESTIMONIALS = [
  {
    quote:
      'La fragancia dura todo el día y recibo cumplidos constantemente. Atención impecable.',
    name: 'Carolina M.',
  },
  {
    quote:
      'Productos 100% originales y un envío rapidísimo. Volveré a comprar sin duda.',
    name: 'Andrés R.',
  },
]

export function Lifestyle() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70">
          <Image
            src="/lifestyle.png"
            alt="Persona elegante aplicando perfume de lujo"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Más que un aroma, una experiencia
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Cada fragancia de Maison Noir está pensada para acompañarte en los
            momentos que importan. Descubre lo que dicen quienes ya encontraron
            su esencia.
          </p>

          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border/70 bg-card p-5"
              >
                <blockquote className="text-pretty leading-relaxed text-foreground">
                  {'"'}
                  {t.quote}
                  {'"'}
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium text-gold">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
