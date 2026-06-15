export type Category = 'hombre' | 'mujer' | 'premium'
export type Tag = 'best_seller' | 'premium'

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: Category
  tags: Tag[]
}

export const CATEGORY_LABELS: Record<Category, string> = {
  hombre: 'Hombre',
  mujer: 'Mujer',
  premium: 'Premium',
}

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Noir Intense',
    price: 189,
    description:
      'Un aroma profundo y misterioso de cuero, tabaco y especias que perdura todo el día.',
    image: '/products/noir-intense.png',
    category: 'hombre',
    tags: ['best_seller'],
  },
  {
    id: 'p2',
    name: 'Rose Éternelle',
    price: 165,
    description:
      'Pétalos de rosa de Damasco envueltos en almizcle suave para una elegancia inolvidable.',
    image: '/products/rose-eternelle.png',
    category: 'mujer',
    tags: ['best_seller'],
  },
  {
    id: 'p3',
    name: 'Gold Oud',
    price: 320,
    description:
      'Oud puro y ámbar dorado, una fragancia opulenta para quienes no pasan desapercibidos.',
    image: '/products/gold-oud.png',
    category: 'premium',
    tags: ['premium', 'best_seller'],
  },
  {
    id: 'p4',
    name: 'Azure Homme',
    price: 145,
    description:
      'Frescura marina con notas cítricas y maderas suaves. Energía pura en cada gota.',
    image: '/products/azure-homme.png',
    category: 'hombre',
    tags: [],
  },
  {
    id: 'p5',
    name: 'Blanc Floral',
    price: 158,
    description:
      'Jazmín, peonía y vainilla blanca. Una caricia floral delicada y luminosa.',
    image: '/products/blanc-mujer.png',
    category: 'mujer',
    tags: [],
  },
  {
    id: 'p6',
    name: 'Impérial Privé',
    price: 420,
    description:
      'Edición limitada de azafrán, sándalo y resinas raras. El lujo en su máxima expresión.',
    image: '/products/imperial-premium.png',
    category: 'premium',
    tags: ['premium'],
  },
]
