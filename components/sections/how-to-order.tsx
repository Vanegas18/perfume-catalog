import { Scale } from '@/components/gota/scale'
import { formatCOP } from '@/lib/products'

const STEPS = [
  {
    n: '01',
    title: 'Elija fragancia y tamaño',
    body: 'Si nunca la ha olido, empiece por 5 ml. Si ya es su favorita, el frasco de 100 ml sale más barato por mililitro.',
  },
  {
    n: '02',
    title: 'Envíe su bolsa por WhatsApp',
    body: 'Junte varias fragancias y tamaños. WhatsApp se abre con el pedido escrito y el subtotal. Solo agregue su dirección.',
  },
  {
    n: '03',
    title: 'Pague y reciba',
    body: 'Transferencia o pago contra entrega en Medellín. Pidiendo antes de las 3 p. m., le llega el mismo día.',
  },
]

const GUIDE = [
  { ml: 5, use: 'Para probar', time: 'unas 2 semanas' },
  { ml: 30, use: 'Uso diario', time: 'unos 3 meses' },
  { ml: 100, use: 'Su fragancia de siempre', time: 'unos 9 meses' },
]

export function HowToOrder() {
  return (
    <section id="como-pedir" aria-labelledby="como-pedir-title" className="scroll-mt-16 border-t border-tinta">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-24">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="num text-xs tracking-[0.12em] text-grafito uppercase">Sin registro, sin pasarela de pago</p>
            <h2 id="como-pedir-title" className="mt-2 text-4xl font-bold tracking-[-0.03em] lg:text-6xl">
              Cómo pedir
            </h2>

            {/* Vista previa del mensaje: muestra el flujo real antes de tocarlo */}
            <figure className="mt-8 max-w-sm">
              <figcaption className="num mb-2 text-xs text-grafito">Así llega su pedido</figcaption>
              <div className="relative rounded-sm rounded-tr-none bg-tinta p-4 text-[15px] leading-snug text-hueso">
                Hola Gota, quiero hacer este pedido:
                <br />• 1 × Nº 07 Tabaco 30 ml — {formatCOP(119000)}
                <br />• 2 × Nº 03 Aguacero 5 ml — {formatCOP(54000)}
                <br />Subtotal: {formatCOP(173000)}
                <br />¿Me confirman disponibilidad y el costo del envío?
                <span className="num mt-2 block text-right text-[11px] text-niebla">10:24 a. m.</span>
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <ol>
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-tinta py-6 first:border-t-0 first:pt-0 sm:grid-cols-[6rem_1fr] lg:py-8">
                <span className="num text-3xl leading-none text-rojo-hondo sm:text-5xl" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-prose text-grafito">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 bg-papel p-5 sm:p-6">
            <h3 className="text-lg font-bold">¿Qué tamaño le conviene?</h3>
            <Scale className="mt-4" labels />
            <dl className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
              {GUIDE.map((g) => (
                <div key={g.ml} className="border-l border-tinta pl-2.5 sm:pl-3">
                  <dt className="num text-lg sm:text-2xl">{g.ml} ml</dt>
                  <dd className="mt-1 text-[13px] leading-snug sm:text-sm">
                    {g.use}
                    <span className="block text-grafito">Rinde {g.time}*</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="num mt-4 text-xs text-grafito">* Aproximado, con 3 o 4 atomizaciones al día.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
