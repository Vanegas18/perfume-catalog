import { formatCOP, type Fragrance, type Presentation } from './products'

// Formato internacional sin "+": indicativo Colombia (57) + número
export const WHATSAPP_NUMBER = '573006764605'
export const BRAND = 'Gota'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function orderLink(fragrance: Fragrance, size: Presentation) {
  return whatsappLink(
    `Hola ${BRAND}, quiero pedir Nº ${fragrance.code} ${fragrance.name} en ${size.ml} ml (${formatCOP(size.price)}). ¿Me confirman disponibilidad y el costo del envío?`,
  )
}

export function restockLink(fragrance: Fragrance, size: Presentation) {
  return whatsappLink(
    `Hola ${BRAND}, me interesa Nº ${fragrance.code} ${fragrance.name} en ${size.ml} ml. ¿Me avisan cuando vuelva a estar disponible?`,
  )
}

export const GENERAL_INQUIRY = whatsappLink(
  `Hola ${BRAND}, quiero asesoría para elegir una fragancia. Me gustan los aromas…`,
)

export function cartLink(lines: { fragrance: Fragrance; size: Presentation; qty: number; total: number }[], subtotal: number) {
  const detail = lines
    .map((l) => `• ${l.qty} × Nº ${l.fragrance.code} ${l.fragrance.name} ${l.size.ml} ml — ${formatCOP(l.total)}`)
    .join('\n')
  return whatsappLink(
    `Hola ${BRAND}, quiero hacer este pedido:\n${detail}\nSubtotal: ${formatCOP(subtotal)}\n¿Me confirman disponibilidad y el costo del envío?`,
  )
}
