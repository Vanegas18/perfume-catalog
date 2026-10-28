'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { Wordmark } from '@/components/gota/wordmark'
import { WhatsappIcon } from '@/components/gota/whatsapp-icon'
import { GENERAL_INQUIRY } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Cómo pedir', href: '#como-pedir' },
  { label: 'Visítenos', href: '#visitenos' },
]

export function Navbar() {
  const { isOwner, enterOwnerMode } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-hueso">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="#inicio" aria-label="Gota, inicio" className="flex min-h-11 items-center">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex min-h-11 items-center text-[15px] underline-offset-[6px] hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          {!isOwner && (
            <Button variant="outline" size="sm" onClick={enterOwnerMode} className="hidden sm:inline-flex">
              Probar el panel
            </Button>
          )}
          <a
            href={GENERAL_INQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir a Gota por WhatsApp"
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <WhatsappIcon className="size-5" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <div id="menu-movil" hidden={!open} className="border-t border-linea md:hidden">
        <ul className="flex flex-col px-4 py-2">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-linea text-lg">
                {l.label}
              </a>
            </li>
          ))}
          {!isOwner && (
            <li className="py-3">
              <Button
                variant="outline"
                className={cn('w-full')}
                onClick={() => {
                  enterOwnerMode()
                  setOpen(false)
                }}
              >
                Probar el panel del dueño
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}
