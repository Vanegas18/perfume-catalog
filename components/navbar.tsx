'use client'

import { useState } from 'react'
import { MessageCircle, Menu, X, ShieldCheck, LogOut } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/components/store-provider'
import { AdminLoginDialog } from '@/components/admin-login-dialog'
import { GENERAL_INQUIRY } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Más vendidos', href: '#mas-vendidos' },
  { label: 'Hombre', href: '#hombre' },
  { label: 'Mujer', href: '#mujer' },
  { label: 'Premium', href: '#premium' },
]

export function Navbar() {
  const { isAdmin, logout } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Maison <span className="text-gold">Noir</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Badge className="hidden items-center gap-1 bg-gold/15 text-gold sm:flex">
              <ShieldCheck className="size-3" />
              Admin
            </Badge>
          )}

          <a
            href={GENERAL_INQUIRY}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className={cn(
              buttonVariants({ size: 'icon', variant: 'ghost' }),
              'text-muted-foreground hover:text-gold',
            )}
          >
            <MessageCircle className="size-5" />
          </a>

          {isAdmin ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={logout}
              aria-label="Cerrar sesión de administrador"
              className="text-muted-foreground hover:text-gold"
            >
              <LogOut className="size-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLoginOpen(true)}
              aria-label="Acceso administrador"
              className="text-muted-foreground hover:text-gold"
            >
              <ShieldCheck className="size-5" />
            </Button>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 transition-[max-height] duration-300 lg:hidden',
          mobileOpen ? 'max-h-96' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <AdminLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  )
}
