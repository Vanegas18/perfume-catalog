'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/components/store-provider'
import { FAMILY_LABELS, SIZES_ML, type Family, type Fragrance } from '@/lib/products'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  fragrance: Fragrance | null // null = nueva
}

type Draft = {
  code: string
  name: string
  family: Family
  notes: [string, string, string]
  description: string
  sizes: { ml: (typeof SIZES_ML)[number]; price: string; stock: string }[]
}

function toDraft(f: Fragrance | null, nextCode: string): Draft {
  return {
    code: f?.code ?? nextCode,
    name: f?.name ?? '',
    family: f?.family ?? 'amaderada',
    notes: f?.notes ?? ['', '', ''],
    description: f?.description ?? '',
    sizes: SIZES_ML.map((ml) => {
      const s = f?.sizes.find((x) => x.ml === ml)
      return { ml, price: s ? String(s.price) : '', stock: s ? String(s.stock) : '0' }
    }),
  }
}

const digits = (v: string) => v.replace(/\D/g, '')
const thousands = (v: string) => (v ? Number(v).toLocaleString('es-CO') : '')

export function FragranceForm({ open, onOpenChange, fragrance }: Props) {
  const { fragrances, upsertFragrance } = useStore()
  const nextCode = String(Math.max(0, ...fragrances.map((f) => Number(f.code) || 0)) + 1).padStart(2, '0')
  const [draft, setDraft] = useState<Draft>(() => toDraft(fragrance, nextCode))
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setDraft(toDraft(fragrance, nextCode))
      setErrors({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fragrance])

  function setSize(i: number, key: 'price' | 'stock', value: string) {
    setDraft((d) => ({ ...d, sizes: d.sizes.map((s, j) => (j === i ? { ...s, [key]: digits(value) } : s)) }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!draft.name.trim()) next.name = 'Escriba el nombre de la fragancia.'
    if (draft.notes.some((n) => !n.trim())) next.notes = 'Complete las tres notas.'
    draft.sizes.forEach((s, i) => {
      if (!s.price || Number(s.price) < 1000) next[`price${i}`] = 'Precio mínimo $ 1.000.'
    })
    setErrors(next)
    if (Object.keys(next).length) return

    upsertFragrance({
      id: fragrance?.id ?? `f${Date.now()}`,
      code: draft.code.padStart(2, '0'),
      name: draft.name.trim(),
      family: draft.family,
      notes: draft.notes.map((n) => n.trim()) as [string, string, string],
      description: draft.description.trim(),
      sizes: draft.sizes.map((s) => ({ ml: s.ml, price: Number(s.price), stock: Number(s.stock || 0) })),
      featured: fragrance?.featured,
    })
    toast(fragrance ? `Nº ${draft.code} ${draft.name} actualizada` : `Nº ${draft.code} ${draft.name} agregada al catálogo`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{fragrance ? `Editar Nº ${fragrance.code} ${fragrance.name}` : 'Nueva fragancia'}</DialogTitle>
          <DialogDescription>Los cambios se ven al instante en el catálogo y en el mensaje de WhatsApp.</DialogDescription>
        </DialogHeader>

        <form id="fragrance-form" onSubmit={submit} noValidate className="grid gap-4">
          <div className="grid grid-cols-[5rem_1fr] gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="ff-code">Nº</Label>
              <Input id="ff-code" inputMode="numeric" maxLength={3} value={draft.code} onChange={(e) => setDraft({ ...draft, code: digits(e.target.value) })} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ff-name">Nombre</Label>
              <Input
                id="ff-name"
                value={draft.name}
                placeholder="Café de Altura"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'ff-name-error' : undefined}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            {errors.name && <p id="ff-name-error" className="col-span-2 -mt-2 text-sm text-rojo-hondo">{errors.name}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="ff-family">Familia</Label>
            <select
              id="ff-family"
              value={draft.family}
              onChange={(e) => setDraft({ ...draft, family: e.target.value as Family })}
              className="h-11 w-full rounded-sm border border-tinta/30 bg-hueso px-3 text-base hover:border-tinta focus-visible:border-tinta"
            >
              {Object.entries(FAMILY_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>

          <fieldset className="grid gap-1.5">
            <legend className="mb-1.5 text-sm font-medium">Notas: salida, corazón y fondo</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(['Salida', 'Corazón', 'Fondo'] as const).map((l, i) => (
                <Input
                  key={l}
                  aria-label={`Nota de ${l.toLowerCase()}`}
                  placeholder={l}
                  value={draft.notes[i]}
                  aria-invalid={!!errors.notes && !draft.notes[i].trim()}
                  onChange={(e) => {
                    const notes = [...draft.notes] as Draft['notes']
                    notes[i] = e.target.value
                    setDraft({ ...draft, notes })
                  }}
                />
              ))}
            </div>
            {errors.notes && <p className="text-sm text-rojo-hondo">{errors.notes}</p>}
          </fieldset>

          <div className="grid gap-1.5">
            <Label htmlFor="ff-desc">Descripción</Label>
            <Textarea id="ff-desc" rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">Precio y stock por tamaño</legend>
            <div className="grid gap-2">
              <div aria-hidden="true" className="num grid grid-cols-[3.5rem_1fr_5.5rem] gap-2 text-xs text-grafito">
                <span>Tamaño</span>
                <span>Precio (COP)</span>
                <span>Unidades</span>
              </div>
              {draft.sizes.map((s, i) => (
                <div key={s.ml} className="grid grid-cols-[3.5rem_1fr_5.5rem] items-start gap-2">
                  <span className="num flex h-11 items-center text-sm">{s.ml} ml</span>
                  <div>
                    <div className="relative">
                      <span className="num pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-grafito">$</span>
                      <Input
                        aria-label={`Precio ${s.ml} ml en pesos`}
                        inputMode="numeric"
                        className="num pl-7"
                        value={thousands(s.price)}
                        aria-invalid={!!errors[`price${i}`]}
                        onChange={(e) => setSize(i, 'price', e.target.value)}
                      />
                    </div>
                    {errors[`price${i}`] && <p className="mt-1 text-xs text-rojo-hondo">{errors[`price${i}`]}</p>}
                  </div>
                  <Input
                    aria-label={`Unidades en stock de ${s.ml} ml`}
                    inputMode="numeric"
                    className="num"
                    value={s.stock}
                    onChange={(e) => setSize(i, 'stock', e.target.value)}
                  />
                </div>
              ))}
              <p className="num text-xs text-grafito">Stock 0 = se muestra como agotado y el botón cambia a “Avisarme”.</p>
            </div>
          </fieldset>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="submit" form="fragrance-form" variant="ink">
            {fragrance ? 'Guardar cambios' : 'Agregar al catálogo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
