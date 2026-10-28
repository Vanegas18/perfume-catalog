'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'

// Barra visible solo en modo dueño: deja claro que es un demo y cómo volver atrás
export function OwnerBar() {
  const { isOwner, exitOwnerMode, resetCatalog } = useStore()
  if (!isOwner) return null

  return (
    <div role="region" aria-label="Panel del dueño" className="on-tinta sticky top-16 z-30 bg-tinta text-hueso">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6 lg:px-10">
        <p className="text-sm">
          <span className="font-semibold">Modo dueño.</span>{' '}
          <span className="text-niebla">Edite precios y stock en el catálogo. Los cambios quedan en este navegador.</span>
        </p>
        <div className="flex gap-1">
          <Button
            variant="link"
            size="sm"
            className="text-hueso"
            onClick={() => {
              resetCatalog()
              toast('Catálogo restaurado')
            }}
          >
            Restaurar
          </Button>
          <Button variant="outline-light" size="sm" onClick={exitOwnerMode}>
            Salir
          </Button>
        </div>
      </div>
    </div>
  )
}
