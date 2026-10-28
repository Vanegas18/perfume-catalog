'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { FragranceCard } from '@/components/fragrance-card'
import { Scale } from '@/components/gota/scale'
import { FAMILY_LABELS, type Family, type Fragrance } from '@/lib/products'
import { cn } from '@/lib/utils'

const FragranceForm = dynamic(() => import('@/components/fragrance-form').then((m) => m.FragranceForm))
const DeleteDialog = dynamic(() => import('@/components/delete-dialog').then((m) => m.DeleteDialog))

type Filter = 'todas' | Family

export function Catalog() {
  const { fragrances, isOwner, resetCatalog } = useStore()
  const [filter, setFilter] = useState<Filter>('todas')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Fragrance | null>(null)
  const [deleting, setDeleting] = useState<Fragrance | null>(null)

  // Solo se muestran familias que existen en el catálogo actual
  const families = useMemo(
    () => (Object.keys(FAMILY_LABELS) as Family[]).filter((f) => fragrances.some((x) => x.family === f)),
    [fragrances],
  )
  const list = useMemo(
    () => [...fragrances].filter((f) => filter === 'todas' || f.family === filter).sort((a, b) => a.code.localeCompare(b.code)),
    [fragrances, filter],
  )

  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className={cn('border-t border-tinta', isOwner ? 'scroll-mt-32' : 'scroll-mt-16')}>
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-5">
            <p className="num text-xs tracking-[0.12em] text-grafito uppercase">{fragrances.length} fórmulas · 3 tamaños</p>
            <h2 id="catalogo-title" className="mt-2 text-4xl font-bold tracking-[-0.03em] lg:text-6xl">
              El catálogo
            </h2>
          </div>
          <p className="mt-3 max-w-md text-grafito lg:col-span-5 lg:col-start-8 lg:mt-0">
            Elija el tamaño, agregue a la bolsa y envíe todo el pedido en un solo mensaje de WhatsApp.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filtrar por familia" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {(['todas', ...families] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'h-11 shrink-0 cursor-pointer rounded-full border px-4 text-[15px] transition-colors',
                  filter === f ? 'border-tinta bg-tinta text-hueso' : 'border-tinta/30 hover:border-tinta',
                )}
              >
                {f === 'todas' ? 'Todas' : FAMILY_LABELS[f]}
              </button>
            ))}
          </div>
          {isOwner && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditing(null)
                setFormOpen(true)
              }}
            >
              <Plus className="size-4" /> Agregar fragancia
            </Button>
          )}
        </div>

        {isOwner && (
          <p className="mt-5 border-l-2 border-rojo pl-3 text-sm text-grafito">
            Esto es lo que ve el dueño: cambia precios y stock desde el celular, sin programador.{' '}
            <a
              href="https://www.vanegassolutions.com/?utm_source=demo&utm_medium=referral&utm_campaign=gota&utm_content=panel"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center font-medium text-tinta underline underline-offset-4"
            >
              Quiero uno para mi negocio
            </a>
          </p>
        )}

        <Scale className="mt-6 hidden sm:block" />

        {list.length ? (
          <div className="mt-6 grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((f) => (
              <FragranceCard
                key={f.id}
                fragrance={f}
                onEdit={(x) => {
                  setEditing(x)
                  setFormOpen(true)
                }}
                onDelete={setDeleting}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 border border-dashed border-tinta/40 p-8 text-center">
            <p className="text-lg font-bold">No hay fragancias en esta familia</p>
            <p className="mt-1 text-grafito">
              {fragrances.length ? 'Pruebe con otra familia.' : 'Se quitaron todas. Restaure el catálogo para volver al inicio.'}
            </p>
            {!fragrances.length && (
              <Button variant="outline" className="mt-4" onClick={resetCatalog}>Restaurar catálogo</Button>
            )}
          </div>
        )}
      </div>

      {isOwner && <FragranceForm open={formOpen} onOpenChange={setFormOpen} fragrance={editing} />}
      {isOwner && <DeleteDialog fragrance={deleting} onClose={() => setDeleting(null)} />}
    </section>
  )
}
