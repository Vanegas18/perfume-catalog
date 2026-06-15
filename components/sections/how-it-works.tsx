'use client'

const STEPS = [
  {
    num: '01',
    title: 'Elige tu fragancia',
    desc: 'Explora nuestro catálogo y descubre el aroma que mejor te representa.',
  },
  {
    num: '02',
    title: 'Escríbenos por WhatsApp',
    desc: 'Consulta disponibilidad y precios directamente con nuestro equipo.',
  },
  {
    num: '03',
    title: 'Recibe tu pedido',
    desc: 'Te enviamos tu fragancia favorita de forma rápida y segura.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Comprar tu fragancia ideal es muy sencillo
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <span className="mb-4 font-serif text-5xl font-bold text-gold/30">
                {step.num}
              </span>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs text-pretty leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
