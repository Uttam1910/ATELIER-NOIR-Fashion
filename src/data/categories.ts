import type { Category } from '../types'

export const categories: Category[] = [
  {
    slug: 'sarees',
    name: 'Sarees',
    description: "Contemporary interpretations of one of India's most timeless silhouettes.",
    image: 'saree-zari-organza',
  },
  {
    slug: 'lehengas',
    name: 'Lehengas',
    description: 'Volume, craft and colour — lehengas cut for sangeets, receptions and everything between.',
    image: 'lehenga-bottle-green',
  },
  {
    slug: 'kurtas-sets',
    name: 'Kurtas & Sets',
    description: 'Easy three-piece sets and anarkalis in breathable fabrics, from weekday to festive.',
    image: 'kurta-ivory-chikankari',
  },
  {
    slug: 'co-ords',
    name: 'Co-ords',
    description: 'Printed and linen co-ords with Indian soul and a modern, relaxed cut.',
    image: 'coord-ikat',
  },
  {
    slug: 'occasion-wear',
    name: 'Occasion Wear',
    description: 'Gowns, anarkalis and cape sets for receptions, cocktails and wedding weekends.',
    image: 'occasion-ice-blue-gown',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Jhumkas, bangles, dupattas and temple-style jewellery to finish the look.',
    image: 'acc-jhumka-silver',
  },
]

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))
