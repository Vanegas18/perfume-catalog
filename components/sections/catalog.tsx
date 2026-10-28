'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { FragranceCard } from '@/components/fragrance-card'
import { FragranceForm } from '@/components/fragrance-form'
import { DeleteDialog } from '@/components/delete-dialog'
import { Scale } from '@/components/gota/scale'
import { FAMILY_LABELS, type Family, type Fragrance } from '@/lib/products'
import { cn } from '@/lib/utils'

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
            Elija el tamaño en cada ficha y el pedido llega a WhatsApp con la fragancia, los mililitros y el precio.
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

      <FragranceForm open={formOpen} onOpenChange={setFormOpen} fragrance={editing} />
      <DeleteDialog fragrance={deleting} onClose={() => setDeleting(null)} />
    </section>
  )
}
