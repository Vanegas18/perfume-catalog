'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore } from '@/components/store-provider'
import {
  CATEGORY_LABELS,
  type Category,
  type Product,
  type Tag,
} from '@/lib/products'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Producto a editar; si es null estamos creando */
  product: Product | null
}

const EMPTY = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: 'hombre' as Category,
  bestSeller: false,
  premium: false,
}

export function ProductForm({ open, onOpenChange, product }: Props) {
  const { addProduct, updateProduct } = useStore()
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        description: product.description,
        image: product.image,
        category: product.category,
        bestSeller: product.tags.includes('best_seller'),
        premium: product.tags.includes('premium'),
      })
    } else {
      setForm(EMPTY)
    }
  }, [product, open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.price) {
      toast.error('Nombre y precio son obligatorios')
      return
    }

    const tags: Tag[] = []
    if (form.bestSeller) tags.push('best_seller')
    if (form.premium) tags.push('premium')

    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      image: form.image.trim() || '/placeholder.svg',
      category: form.category,
      tags,
    }

    if (product) {
      updateProduct(product.id, data)
      toast.success('Producto actualizado')
    } else {
      addProduct(data)
      toast.success('Producto añadido')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {product ? 'Editar producto' : 'Añadir producto'}
          </DialogTitle>
          <DialogDescription>
            Completa los datos de la fragancia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ej. Noir Intense"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Precio ($)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="189"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Describe el aroma..."
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm({ ...form, category: v as Category })
              }
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Imagen (URL)</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/products/mi-perfume.png"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Etiquetas</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.bestSeller}
                  onChange={(e) =>
                    setForm({ ...form, bestSeller: e.target.checked })
                  }
                  className="size-4 accent-[var(--gold)]"
                />
                Más vendido
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.premium}
                  onChange={(e) =>
                    setForm({ ...form, premium: e.target.checked })
                  }
                  className="size-4 accent-[var(--gold)]"
                />
                Premium
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
