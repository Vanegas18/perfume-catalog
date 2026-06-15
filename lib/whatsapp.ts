import type { Product } from './products'

// Número de WhatsApp del negocio (formato internacional sin + ni espacios)
export const WHATSAPP_NUMBER = '3006764605'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function productInquiryLink(product: Product) {
  return whatsappLink(
    `Hola Maison Noir, me interesa la fragancia *${product.name}* ($${product.price}). ¿Está disponible?`,
  )
}

export const GENERAL_INQUIRY = whatsappLink(
  'Hola Maison Noir, me gustaría recibir asesoría para encontrar mi fragancia ideal.',
)
