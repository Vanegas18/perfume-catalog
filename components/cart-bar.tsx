'use client'

import { useCart } from '@/components/cart-provider'
import { formatCOP } from '@/lib/products'

// Barra inferior en móvil: la bolsa siempre a un toque mientras se recorre el catálogo
export function CartBar() {
  const { count, subtotal, open, setOpen } = useCart()
  if (!count || open) return null

  return (
    <>
    <div aria-hidden="true" className="h-20 md:hidden" />
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-tinta bg-hueso px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="reveal flex h-12 w-full cursor-pointer items-center justify-between bg-tinta px-4 text-hueso"
      >
        <span>
          Ver bolsa <span className="num">({count})</span>
        </span>
        <span className="num">{formatCOP(subtotal)}</span>
      </button>
    </div>
    </>
  )
}
