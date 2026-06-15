'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/components/store-provider'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminLoginDialog({ open, onOpenChange }: Props) {
  const { login } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login(username, password)) {
      toast.success('Bienvenido al modo administrador')
      onOpenChange(false)
      setUsername('')
      setPassword('')
      setError('')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-gold/15">
            <ShieldCheck className="size-6 text-gold" />
          </div>
          <DialogTitle className="font-serif text-xl">
            Acceso administrador
          </DialogTitle>
          <DialogDescription>
            Ingresa tus credenciales para gestionar el catálogo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gold text-gold-foreground hover:bg-gold/90"
          >
            Iniciar sesión
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Demo: usuario <span className="text-gold">admin</span> · contraseña{' '}
            <span className="text-gold">admin123</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
