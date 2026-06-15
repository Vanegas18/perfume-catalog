'use client'

import { Clock, BadgeCheck, Truck, Headphones } from 'lucide-react'

const BENEFITS = [
  {
    icon: Clock,
    title: 'Fragancias duraderas',
    desc: 'Aromas que permanecen contigo durante horas.',
  },
  {
    icon: BadgeCheck,
    title: 'Productos originales',
    desc: '100% auténticos y garantizados.',
  },
  {
    icon: Truck,
    title: 'Envíos rápidos',
    desc: 'Recibe tu pedido en tiempo récord.',
  },
  {
    icon: Headphones,
    title: 'Atención personalizada',
    desc: 'Te ayudamos a elegir tu fragancia ideal.',
  },
]

export function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <b.icon className="size-5" />
            </span>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {b.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
