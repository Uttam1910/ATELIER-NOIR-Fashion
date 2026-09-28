import type { Availability, Product } from '../types'

export type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export const priceBands = [
  { value: 'under-3000', label: 'Under ₹3,000', min: 0, max: 2999 },
  { value: '3000-7500', label: '₹3,000 – ₹7,500', min: 3000, max: 7500 },
  { value: '7500-15000', label: '₹7,500 – ₹15,000', min: 7501, max: 15000 },
  { value: 'over-15000', label: 'Over ₹15,000', min: 15001, max: Number.POSITIVE_INFINITY },
] as const

export const availabilityLabels: Record<Availability, string> = {
  'in-stock': 'In stock',
  'low-stock': 'Only a few left',
  'made-to-order': 'Made to order',
}

export interface CatalogFilters {
  q: string
  categories: string[]
  edits: string[]
  sizes: string[]
  colors: string[]
  prices: string[]
  availability: string[]
  sort: SortKey
}

const list = (params: URLSearchParams, key: string) =>
  params.get(key)?.split(',').filter(Boolean) ?? []

export const readFilters = (params: URLSearchParams): CatalogFilters => {
  const sort = params.get('sort') as SortKey | null
  return {
    q: params.get('q') ?? '',
    categories: list(params, 'category'),
    edits: list(params, 'edit'),
    sizes: list(params, 'size'),
    colors: list(params, 'color'),
    prices: list(params, 'price'),
    availability: list(params, 'availability'),
    sort: sort && sortOptions.some((o) => o.value === sort) ? sort : 'featured',
  }
}

export const filterKeys = ['category', 'edit', 'size', 'color', 'price', 'availability'] as const
export type FilterKey = (typeof filterKeys)[number]

/** Groups a colour name into a broad family used by the colour filter. */
export const colorFamilies: { value: string; label: string; hex: string; match: RegExp }[] = [
  { value: 'ivory', label: 'Ivory & Neutrals', hex: '#efe6d6', match: /ivory|champagne|beige|dove|grey|silver|charcoal/i },
  { value: 'red', label: 'Reds & Maroons', hex: '#8a1c2b', match: /red|crimson|maroon|garnet|rust|wine/i },
  { value: 'pink', label: 'Pinks & Blush', hex: '#d9a7a0', match: /pink|blush|rose|coral|magenta|mulberry/i },
  { value: 'green', label: 'Greens', hex: '#4f6b54', match: /green|sage|emerald|olive|mint|teal/i },
  { value: 'blue', label: 'Blues', hex: '#3d5a80', match: /blue|indigo|midnight|sky/i },
  { value: 'gold', label: 'Golds', hex: '#c6a15b', match: /gold/i },
  { value: 'black', label: 'Black', hex: '#1e1a18', match: /black|noir/i },
]

export const productColorFamilies = (product: Product) =>
  colorFamilies.filter((f) => product.colors.some((c) => f.match.test(c.name))).map((f) => f.value)

const matchesSearch = (product: Product, q: string) => {
  if (!q.trim()) return true
  const haystack = [product.name, product.category, product.description, product.fabric, ...product.colors.map((c) => c.name)]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

export const searchProducts = (products: Product[], q: string) => products.filter((p) => matchesSearch(p, q))

export const applyFilters = (products: Product[], f: CatalogFilters) => {
  const filtered = products.filter((p) => {
    if (!matchesSearch(p, f.q)) return false
    if (f.categories.length && !f.categories.includes(p.category)) return false
    if (f.edits.length && !p.collections.some((c) => f.edits.includes(c))) return false
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false
    if (f.colors.length && !productColorFamilies(p).some((c) => f.colors.includes(c))) return false
    if (f.availability.length) {
      const bucket = p.availability === 'made-to-order' ? 'made-to-order' : 'in-stock'
      if (!f.availability.includes(bucket)) return false
    }
    if (f.prices.length) {
      const bands = priceBands.filter((b) => f.prices.includes(b.value))
      if (!bands.some((b) => p.price >= b.min && p.price <= b.max)) return false
    }
    return true
  })

  const featuredScore = (p: Product) => Number(p.featured) * 4 + Number(p.bestseller) * 2 + Number(p.newArrival)
  switch (f.sort) {
    case 'newest':
      return filtered.sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    case 'price-asc':
      return filtered.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return filtered.sort((a, b) => b.price - a.price)
    default:
      return filtered.sort((a, b) => featuredScore(b) - featuredScore(a))
  }
}

export const activeFilterCount = (f: CatalogFilters) =>
  f.categories.length + f.edits.length + f.sizes.length + f.colors.length + f.prices.length + f.availability.length
