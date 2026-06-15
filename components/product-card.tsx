'use client'

import Image from 'next/image'
import { MessageCircle, Pencil, Trash2, Flame, Gem } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { productInquiryLink } from '@/lib/whatsapp'
import { type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

interface Props {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductCard({ product, onEdit, onDelete }: Props) {
  const { isAdmin } = useStore()

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_-12px] hover:shadow-gold/30">
      {/* Tags */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {product.tags.includes('best_seller') && (
          <span className="flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-gold-foreground">
            <Flame className="size-3" />
            Más vendido
          </span>
        )}
        {product.tags.includes('premium') && (
          <span className="flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-xs font-semibold text-background">
            <Gem className="size-3" />
            Premium
          </span>
        )}
      </div>

      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute right-3 top-3 z-10 flex gap-1.5">
          <Button
            size="icon"
            variant="secondary"
            className="size-8 bg-background/80 backdrop-blur"
            onClick={() => onEdit(product)}
            aria-label={`Editar ${product.name}`}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="size-8 bg-background/80 text-destructive backdrop-blur hover:text-destructive"
            onClick={() => onDelete(product)}
            aria-label={`Eliminar ${product.name}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-secondary to-background">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {product.name}
          </h3>
          <span className="whitespace-nowrap font-semibold text-gold">
            ${product.price}
          </span>
        </div>
        <p className="flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <a
          href={productInquiryLink(product)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants(),
            'mt-1 w-full bg-gold text-gold-foreground hover:bg-gold/90',
          )}
        >
          <MessageCircle className="size-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}
