'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { ProductCard } from '@/components/product-card'
import { ProductForm } from '@/components/product-form'
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog'
import { CATEGORY_LABELS, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

type Filter = 'todos' | 'mas-vendidos' | 'hombre' | 'mujer' | 'premium'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'mas-vendidos', label: 'Más vendidos' },
  { value: 'hombre', label: CATEGORY_LABELS.hombre },
  { value: 'mujer', label: CATEGORY_LABELS.mujer },
  { value: 'premium', label: CATEGORY_LABELS.premium },
]

export function Catalog() {
  const { products, isAdmin } = useStore()
  const [filter, setFilter] = useState<Filter>('todos')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [toDelete, setToDelete] = useState<Product | null>(null)

  // Sincroniza el filtro con los enlaces del navbar (hash)
  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace('#', '')
      if (['mas-vendidos', 'hombre', 'mujer', 'premium'].includes(hash)) {
        setFilter(hash as Filter)
      } else if (hash === 'catalogo') {
        setFilter('todos')
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'todos') return products
    if (filter === 'mas-vendidos')
      return products.filter((p) => p.tags.includes('best_seller'))
    return products.filter((p) => p.category === filter)
  }, [products, filter])

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }
  function openEdit(product: Product) {
    setEditing(product)
    setFormOpen(true)
  }
  function openDelete(product: Product) {
    setToDelete(product)
    setDeleteOpen(true)
  }

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 border-y border-border/60 bg-secondary/30"
    >
      {/* Anchors para el navbar */}
      <span id="mas-vendidos" className="block scroll-mt-20" />
      <span id="hombre" className="block scroll-mt-20" />
      <span id="mujer" className="block scroll-mt-20" />
      <span id="premium" className="block scroll-mt-20" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nuestra colección
          </h2>
          <p className="mt-3 text-muted-foreground">
            Selecciona tu favorito y consúltanos por WhatsApp
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === f.value
                  ? 'border-gold bg-gold text-gold-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-gold/40 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            No hay productos en esta categoría todavía.
          </p>
        )}
      </div>

      {/* Botón flotante de admin: añadir producto */}
      {isAdmin && (
        <Button
          onClick={openCreate}
          size="icon"
          className="fixed bottom-24 right-6 z-40 size-14 rounded-full bg-gold text-gold-foreground shadow-lg shadow-gold/30 hover:bg-gold/90"
          aria-label="Añadir producto"
        >
          <Plus className="size-6" />
        </Button>
      )}

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editing}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={toDelete}
      />
    </section>
  )
}
