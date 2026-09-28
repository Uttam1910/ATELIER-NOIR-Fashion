import type { Edit } from '../types'

/** Curated edits, shown on /collections alongside the category collections. */
export const edits: Edit[] = [
  {
    slug: 'festive-edit',
    name: 'Festive Edit',
    description: 'Rich colours, embroidery and celebration dressing.',
    image: 'saree-noir-banarasi',
  },
  {
    slug: 'everyday-edit',
    name: 'Everyday Edit',
    description: 'Relaxed contemporary Indian silhouettes.',
    image: 'coord-black-print',
  },
  {
    slug: 'heritage',
    name: 'Heritage',
    description: 'Traditional techniques interpreted for today.',
    image: 'saree-temple-border',
  },
  {
    slug: 'modern-occasion',
    name: 'Modern Occasion',
    description: 'Contemporary pieces for weddings and special events.',
    image: 'lehenga-ivory-gota',
  },
  {
    slug: 'soft-neutrals',
    name: 'Soft Neutrals',
    description: 'Minimal palettes and understated silhouettes.',
    image: 'saree-ivory-organza',
  },
  {
    slug: 'statement',
    name: 'Statement',
    description: 'Bold prints, textures and dramatic pieces.',
    image: 'occasion-noir-anarkali',
  },
]

export const editBySlug = new Map(edits.map((e) => [e.slug, e]))
