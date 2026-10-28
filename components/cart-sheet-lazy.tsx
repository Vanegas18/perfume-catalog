'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/cart-provider'

const Sheet = dynamic(() => import('@/components/cart-sheet').then((m) => m.CartSheet))

// El panel de la bolsa (y su JS) se carga la primera vez que se abre
export function CartSheet() {
  const { open } = useCart()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (open) setMounted(true)
  }, [open])
  return mounted ? <Sheet /> : null
}
