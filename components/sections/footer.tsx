import { Wordmark } from '@/components/gota/wordmark'
import { Scale } from '@/components/gota/scale'
import { GENERAL_INQUIRY } from '@/lib/whatsapp'

const VS_URL = 'https://www.vanegassolutions.com/?utm_source=demo&utm_medium=referral&utm_campaign=gota'

export function Footer() {
  return (
    <footer id="visitenos" className="on-tinta bg-tinta text-hueso">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-10">
        <Scale tone="dark" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark tone="dark" className="text-4xl" />
            <p className="mt-4 max-w-xs text-niebla">Fragancias propias por mililitro. Formuladas y envasadas en Medellín.</p>
          </div>
          <dl className="grid gap-6 text-sm sm:grid-cols-3 md:col-span-7">
            <div>
              <dt className="num text-xs tracking-widest text-niebla uppercase">Tienda</dt>
              <dd className="mt-2 leading-relaxed">El Poblado, Medellín<br />Lun a sáb · 10:00–20:00<br />Dom · 11:00–17:00</dd>
            </div>
            <div>
              <dt className="num text-xs tracking-widest text-niebla uppercase">Envíos</dt>
              <dd className="mt-2 leading-relaxed">Mismo día en el Valle de Aburrá pidiendo antes de las 3 p. m.<br />Resto del país: 2 a 4 días.</dd>
            </div>
            <div>
              <dt className="num text-xs tracking-widest text-niebla uppercase">Pedidos</dt>
              <dd className="mt-2">
                <a href={GENERAL_INQUIRY} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">
                  WhatsApp 300 676 4605
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hueso/15 pt-6 text-xs text-niebla sm:flex-row sm:items-center sm:justify-between">
          <p>Gota es una marca ficticia creada como demostración. Precios y productos de ejemplo.</p>
          <a href={VS_URL} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-hueso">
            Demo diseñado por <span className="ml-1 underline underline-offset-4">Vanegas Solutions</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
