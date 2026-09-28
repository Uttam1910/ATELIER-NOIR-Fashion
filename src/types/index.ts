import type { ImageKey } from '../data/images'

export type { ImageKey }

export interface ImageAsset {
  alt: string
  /** width / height of the source photograph */
  ratio: number
  widths: readonly number[]
  credit: { author: string; username: string; url: string }
}

export type CategorySlug =
  | 'sarees'
  | 'lehengas'
  | 'kurtas-sets'
  | 'co-ords'
  | 'occasion-wear'
  | 'accessories'

export type EditSlug =
  | 'festive-edit'
  | 'everyday-edit'
  | 'heritage'
  | 'modern-occasion'
  | 'soft-neutrals'
  | 'statement'

export type Badge = 'New' | 'Bestseller' | 'Limited'

export type Availability = 'in-stock' | 'low-stock' | 'made-to-order'

export interface ColorOption {
  name: string
  hex: string
}

export interface OptionChoice {
  value: string
  label: string
  /** Added to the base price when selected */
  priceDelta?: number
}

export interface ProductOption {
  id: string
  label: string
  choices: OptionChoice[]
  /** Only shown when another option has one of the given values */
  showWhen?: { optionId: string; values: string[] }
  /** Displayed as a size grid instead of pills */
  kind?: 'size' | 'choice'
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategorySlug
  collections: EditSlug[]
  description: string
  price: number
  images: ImageKey[]
  colors: ColorOption[]
  /** Sizes used for filtering; empty for one-size pieces */
  sizes: string[]
  options: ProductOption[]
  fabric: string
  care: string[]
  details: string[]
  featured: boolean
  newArrival: boolean
  bestseller: boolean
  badge?: Badge
  availability: Availability
  /** ISO date used for "Newest" sorting */
  addedAt: string
  /** Demo-only review figures, labelled as such in the UI */
  demoReviews: { rating: number; count: number }
}

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  image: ImageKey
}

export interface Edit {
  slug: EditSlug
  name: string
  description: string
  image: ImageKey
}

export interface Look {
  id: string
  title: string
  caption: string
  image: ImageKey
  productSlugs: string[]
  layout: 'full' | 'left' | 'right'
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; image: ImageKey; caption?: string }
  | { type: 'list'; items: string[] }

export interface Article {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  author: string
  readMinutes: number
  image: ImageKey
  body: ArticleBlock[]
  productSlugs: string[]
}

export interface Service {
  slug: string
  name: string
  summary: string
  description: string
  image: ImageKey
  points: string[]
  cta: { label: string; to: string }
}

export interface Faq {
  question: string
  answer: string
}

export interface FaqGroup {
  title: string
  items: Faq[]
}

export interface Testimonial {
  quote: string
  name: string
  context: string
}

export interface BagItem {
  key: string
  slug: string
  quantity: number
  color?: string
  selections: Record<string, string>
}
