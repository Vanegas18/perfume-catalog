'use client'

import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import type { Fragrance } from '@/lib/products'

export function DeleteDialog({ fragrance, onClose }: { fragrance: Fragrance | null; onClose: () => void }) {
  const { deleteFragrance } = useStore()
  return (
    <Dialog open={!!fragrance} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Quitar Nº {fragrance?.code} {fragrance?.name}?</DialogTitle>
          <DialogDescription>Deja de aparecer en el catálogo. Puede recuperarla con “Restaurar”.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            variant="primary"
            onClick={() => {
              if (fragrance) {
                deleteFragrance(fragrance.id)
                toast(`${fragrance.name} quitada del catálogo`)
              }
              onClose()
            }}
          >
            Quitar del catálogo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
