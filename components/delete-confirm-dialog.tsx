'use client'

import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { type Product } from '@/lib/products'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export function DeleteConfirmDialog({ open, onOpenChange, product }: Props) {
  const { deleteProduct } = useStore()

  function handleDelete() {
    if (product) {
      deleteProduct(product.id)
      toast.success('Producto eliminado')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/15">
            <Trash2 className="size-6 text-destructive" />
          </div>
          <DialogTitle className="font-serif text-xl">
            Eliminar producto
          </DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar{' '}
            <span className="font-medium text-foreground">
              {product?.name}
            </span>
            ? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
