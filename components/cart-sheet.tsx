'use client'

import { Minus, Plus, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'
import { WhatsappIcon } from '@/components/gota/whatsapp-icon'
import { formatCOP } from '@/lib/products'
import { cartLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function CartSheet() {
  const { lines, count, subtotal, open, setOpen, setQty, remove } = useCart()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="top-0 right-0 left-auto flex h-dvh max-h-dvh w-full max-w-full translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 border-l border-tinta p-0 sm:max-w-md sm:p-0 data-open:slide-in-from-right-8 data-open:slide-in-from-bottom-0"
      >
        <DialogHeader className="border-b border-linea px-5 pt-5 pb-4">
          <DialogTitle>Su bolsa</DialogTitle>
          <DialogDescription>
            {count ? `${count} ${count === 1 ? 'producto' : 'productos'}. Se envía como un solo mensaje por WhatsApp.` : 'Todavía está vacía.'}
          </DialogDescription>
        </DialogHeader>

        {lines.length ? (
          <>
            <ul className="flex-1 overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 border-b border-linea py-4">
                  <div>
                    <p className="font-bold leading-tight">
                      Nº {l.fragrance.code} {l.fragrance.name}
                    </p>
                    <p className="num mt-1 text-xs text-grafito">
                      {l.size.ml} ml · {formatCOP(l.size.price)} c/u
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(l.fragrance.id, l.size.ml)}
                    aria-label={`Quitar ${l.fragrance.name} ${l.size.ml} ml`}
                    className="-mt-2 -mr-2 flex size-11 cursor-pointer items-center justify-center text-grafito hover:text-tinta"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="flex items-center" role="group" aria-label={`Cantidad de ${l.fragrance.name} ${l.size.ml} ml`}>
                    <Button variant="outline" size="icon" aria-label="Quitar uno" onClick={() => setQty(l.fragrance.id, l.size.ml, l.qty - 1)}>
                      <Minus className="size-4" />
                    </Button>
                    <span className="num w-10 text-center" aria-live="polite">{l.qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Agregar uno"
                      disabled={l.qty >= l.size.stock}
                      onClick={() => setQty(l.fragrance.id, l.size.ml, l.qty + 1)}
                    >
                      <Plus className="size-4" />
                    </Button>
                    {l.qty >= l.size.stock && <span className="num ml-3 text-xs text-rojo-hondo">Máx. {l.size.stock}</span>}
                  </div>
                  <span className="num self-center text-right">{formatCOP(l.total)}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-tinta px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <p className="flex items-baseline justify-between">
                <span>Subtotal</span>
                <span className="num text-2xl">{formatCOP(subtotal)}</span>
              </p>
              <p className="mt-1 text-sm text-grafito">El envío y el pago se confirman por WhatsApp.</p>
              <a
                href={cartLink(lines, subtotal)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'primary' }), 'mt-4 w-full')}
              >
                <WhatsappIcon className="size-5" /> Enviar pedido por WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-start justify-center px-5">
            <p className="text-2xl font-bold tracking-tight">Empiece por una muestra de 5 ml</p>
            <p className="mt-2 text-grafito">Agregue fragancias desde el catálogo y envíe todo en un solo mensaje.</p>
            <a href="#catalogo" onClick={() => setOpen(false)} className={cn(buttonVariants({ variant: 'ink' }), 'mt-6')}>
              Ver el catálogo
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
