'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { initialFragrances, type Fragrance } from '@/lib/products'

/*
  Demo sin backend: el catálogo vive en el navegador de cada visitante.
  Cada prospecto puede editar sin afectar a otros, y "Restaurar" vuelve al original.
  En un proyecto real este contexto se reemplaza por una API (misma interfaz).
*/

const STORAGE_KEY = 'gota:catalogo:v1'

interface StoreContextValue {
  fragrances: Fragrance[]
  isOwner: boolean
  enterOwnerMode: () => void
  exitOwnerMode: () => void
  upsertFragrance: (data: Fragrance) => void
  deleteFragrance: (id: string) => void
  resetCatalog: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function readStored(): Fragrance[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Fragrance[]) : null
  } catch {
    return null
  }
}

function writeStored(value: Fragrance[] | null) {
  try {
    if (value === null) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // almacenamiento bloqueado (modo privado): el demo sigue funcionando en memoria
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [fragrances, setFragrances] = useState<Fragrance[]>(initialFragrances)
  const [isOwner, setIsOwner] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStored()
    if (stored) setFragrances(stored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeStored(fragrances)
  }, [fragrances, hydrated])

  const upsertFragrance = useCallback((data: Fragrance) => {
    setFragrances((prev) =>
      prev.some((f) => f.id === data.id) ? prev.map((f) => (f.id === data.id ? data : f)) : [data, ...prev],
    )
  }, [])

  const deleteFragrance = useCallback((id: string) => {
    setFragrances((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const resetCatalog = useCallback(() => {
    writeStored(null)
    setFragrances(initialFragrances)
  }, [])

  return (
    <StoreContext.Provider
      value={{
        fragrances,
        isOwner,
        enterOwnerMode: () => setIsOwner(true),
        exitOwnerMode: () => setIsOwner(false),
        upsertFragrance,
        deleteFragrance,
        resetCatalog,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de StoreProvider')
  return ctx
}
