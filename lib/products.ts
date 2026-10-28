export const SIZES_ML = [5, 30, 100] as const
export type SizeMl = (typeof SIZES_ML)[number]

export type Family = 'amaderada' | 'floral' | 'citrica' | 'gourmand' | 'fresca'

export const FAMILY_LABELS: Record<Family, string> = {
  amaderada: 'Amaderada',
  floral: 'Floral',
  citrica: 'Cítrica',
  gourmand: 'Gourmand',
  fresca: 'Fresca',
}

export interface Presentation {
  ml: SizeMl
  price: number // COP
  stock: number // unidades disponibles
}

export interface Fragrance {
  id: string
  code: string // "07" — número de fórmula de la casa
  name: string
  family: Family
  notes: [string, string, string] // salida · corazón · fondo
  description: string
  sizes: Presentation[]
  featured?: boolean
  image?: string // opcional: si el dueño sube foto, reemplaza la etiqueta
}

const p = (price5: number, price30: number, price100: number, stock: [number, number, number]): Presentation[] => [
  { ml: 5, price: price5, stock: stock[0] },
  { ml: 30, price: price30, stock: stock[1] },
  { ml: 100, price: price100, stock: stock[2] },
]

export const initialFragrances: Fragrance[] = [
  {
    id: 'f07',
    code: '07',
    name: 'Tabaco',
    family: 'amaderada',
    notes: ['pimienta negra', 'hoja de tabaco', 'cuero y vainilla'],
    description: 'Seco al principio, cálido al final. Para la noche y para quien prefiere que lo recuerden de cerca.',
    sizes: p(32000, 119000, 289000, [14, 6, 0]),
    featured: true,
  },
  {
    id: 'f01',
    code: '01',
    name: 'Café de Altura',
    family: 'gourmand',
    notes: ['cardamomo', 'café tostado', 'cedro'],
    description: 'El primer tinto de la mañana, sin el azúcar. Tostado, especiado y con fondo de madera.',
    sizes: p(29000, 109000, 259000, [20, 9, 4]),
  },
  {
    id: 'f02',
    code: '02',
    name: 'Azahar',
    family: 'floral',
    notes: ['neroli', 'flor de azahar', 'almizcle blanco'],
    description: 'Flor blanca limpia, de piel recién bañada. Funciona igual para la oficina que para un domingo.',
    sizes: p(29000, 109000, 259000, [18, 11, 5]),
  },
  {
    id: 'f03',
    code: '03',
    name: 'Aguacero',
    family: 'fresca',
    notes: ['hojas verdes', 'tierra mojada', 'vetiver'],
    description: 'Lo que huele la calle cuando empieza a llover a las cuatro de la tarde. Verde y mineral.',
    sizes: p(27000, 99000, 239000, [25, 12, 7]),
  },
  {
    id: 'f04',
    code: '04',
    name: 'Guayaba Rosa',
    family: 'floral',
    notes: ['pimienta rosa', 'guayaba', 'rosa y musgo'],
    description: 'Fruta madura con una rosa detrás. Dulce sin empalagar, alegre sin ser infantil.',
    sizes: p(29000, 109000, 259000, [16, 3, 2]),
  },
  {
    id: 'f05',
    code: '05',
    name: 'Palo Santo',
    family: 'amaderada',
    notes: ['incienso', 'palo santo', 'sándalo'],
    description: 'Humo suave y madera clara. Tranquilo, envolvente y de larga duración en la piel.',
    sizes: p(34000, 129000, 309000, [10, 5, 3]),
  },
  {
    id: 'f06',
    code: '06',
    name: 'Cacao Negro',
    family: 'gourmand',
    notes: ['naranja amarga', 'cacao', 'haba tonka'],
    description: 'Chocolate amargo y un toque de naranja. Cálido, con presencia, ideal para clima frío.',
    sizes: p(32000, 119000, 289000, [12, 7, 4]),
  },
  {
    id: 'f08',
    code: '08',
    name: 'Mandarina',
    family: 'citrica',
    notes: ['bergamota', 'mandarina', 'vetiver'],
    description: 'Cítrico brillante que no se va a la media hora gracias a un fondo de vetiver.',
    sizes: p(27000, 99000, 239000, [22, 14, 8]),
  },
]

export const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatCOP(value: number) {
  return copFormatter.format(value)
}

export function pricePerMl(p: Presentation) {
  return Math.round(p.price / p.ml)
}

export function firstAvailable(f: Fragrance): Presentation {
  return f.sizes.find((s) => s.ml === 30 && s.stock > 0) ?? f.sizes.find((s) => s.stock > 0) ?? f.sizes[0]
}
