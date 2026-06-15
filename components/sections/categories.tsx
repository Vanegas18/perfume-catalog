'use client'

import { User, Flower2, Crown, Flame } from 'lucide-react'

const CATEGORIES = [
  {
    label: 'Hombre',
    href: '#hombre',
    icon: User,
    desc: 'Aromas intensos y masculinos',
  },
  {
    label: 'Mujer',
    href: '#mujer',
    icon: Flower2,
    desc: 'Notas florales y elegantes',
  },
  {
    label: 'Premium',
    href: '#premium',
    icon: Crown,
    desc: 'Ediciones de lujo exclusivas',
  },
  {
    label: 'Más vendidos',
    href: '#mas-vendidos',
    icon: Flame,
    desc: 'Los favoritos de siempre',
  },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Explora por categoría
        </h2>
        <p className="mt-3 text-muted-foreground">
          Encuentra la fragancia perfecta para cada momento
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_40px_-12px] hover:shadow-gold/30"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
              <cat.icon className="size-6" />
            </span>
            <span className="font-serif text-lg font-semibold text-foreground">
              {cat.label}
            </span>
            <span className="text-sm text-muted-foreground">{cat.desc}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
