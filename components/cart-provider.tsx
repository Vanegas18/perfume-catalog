'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useStore } from '@/components/store-provider'
import type { Fragrance, Presentation, SizeMl } from '@/lib/products'

/*
  Bolsa de pedido (demo): no hay pago en línea. Junta productos y los envía
  en un solo mensaje de WhatsApp. Precio y stock se leen siempre del catálogo
  actual, así que si el dueño cambia un precio la bolsa se actualiza sola.
*/

const STORAGE_KEY = 'gota:bolsa:v1'

interface StoredItem {
  id: string
  ml: SizeMl
  qty: number
}

export interface CartLine {
  key: string
  fragrance: Fragrance
  size: Presentation
  qty: number
  total: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (open: boolean) => void
  add: (id: string, ml: SizeMl) => void
  setQty: (id: string, ml: SizeMl, qty: number) => void
  remove: (id: string, ml: SizeMl) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { fragrances } = useStore()
  const [items, setItems] = useState<StoredItem[]>([])
  const [open, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((it) => {
        const fragrance = fragrances.find((f) => f.id === it.id)
        const size = fragrance?.sizes.find((s) => s.ml === it.ml)
        if (!fragrance || !size || size.stock <= 0) return []
        const qty = Math.min(it.qty, size.stock)
        return [{ key: `${it.id}-${it.ml}`, fragrance, size, qty, total: qty * size.price }]
      }),
    [items, fragrances],
  )

  const stockOf = useCallback(
    (id: string, ml: SizeMl) => fragrances.find((f) => f.id === id)?.sizes.find((s) => s.ml === ml)?.stock ?? 0,
    [fragrances],
  )

  const setQty = useCallback(
    (id: string, ml: SizeMl, qty: number) => {
      const max = stockOf(id, ml)
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => !(i.id === id && i.ml === ml))
          : prev.map((i) => (i.id === id && i.ml === ml ? { ...i, qty: Math.min(qty, max) } : i)),
      )
    },
    [stockOf],
  )

  const add = useCallback(
    (id: string, ml: SizeMl) => {
      const max = stockOf(id, ml)
      setItems((prev) => {
        const found = prev.find((i) => i.id === id && i.ml === ml)
        if (found) return prev.map((i) => (i === found ? { ...i, qty: Math.min(i.qty + 1, max) } : i))
        return [...prev, { id, ml, qty: 1 }]
      })
    },
    [stockOf],
  )

  const value: CartContextValue = {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.total, 0),
    open,
    setOpen,
    add,
    setQty,
    remove: (id, ml) => setItems((prev) => prev.filter((i) => !(i.id === id && i.ml === ml))),
    clear: () => setItems([]),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
