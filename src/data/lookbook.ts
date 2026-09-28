import type { Look } from '../types'

export const lookbookIntro = {
  title: 'Modern Tradition',
  kicker: 'Lookbook · Autumn / Festive 2026',
  copy: "A celebration of India's rich heritage, reimagined through a contemporary lens.",
  image: 'ed-red-velvet-arch',
} as const

export const looks: Look[] = [
  {
    id: 'look-01',
    title: 'The Gilded Hour',
    caption: 'Antique gold tissue, worn low and unhurried. Temple gold at the throat, nothing else.',
    image: 'saree-noir-banarasi',
    productSlugs: ['antique-gold-tissue-saree', 'temple-necklace-set', 'antique-gold-bangles'],
    layout: 'full',
  },
  {
    id: 'look-02',
    title: 'Doorways',
    caption: 'Heirloom volume in a weathered frame — the lehenga as architecture.',
    image: 'ed-bridal-doorway',
    productSlugs: ['maroon-velvet-lehenga', 'kundan-drop-earrings'],
    layout: 'left',
  },
  {
    id: 'look-03',
    title: 'Forest Light',
    caption: 'Printed black drape against shafts of late sun. A saree for walking in.',
    image: 'ed-forest-light',
    productSlugs: ['grey-handloom-cotton-saree', 'two-tone-jhumkas'],
    layout: 'right',
  },
  {
    id: 'look-04',
    title: 'Cream & Crimson',
    caption: 'Ivory drape, a red blouse and a single flower. Restraint, then one bright note.',
    image: 'ed-cream-curtain',
    productSlugs: ['ivory-floral-organza-saree', 'temple-border-silk-saree'],
    layout: 'full',
  },
  {
    id: 'look-05',
    title: 'Pink Elephants',
    caption: 'Playful print, serious silver. Statement jewellery with an everyday drape.',
    image: 'ed-pink-choker',
    productSlugs: ['embroidered-chiffon-saree', 'filigree-cuff-pair', 'two-tone-jhumkas'],
    layout: 'left',
  },
  {
    id: 'look-06',
    title: 'Market Morning',
    caption: 'A dark floral drape among terracotta and baskets — tradition in its natural setting.',
    image: 'ed-black-saree-pots',
    productSlugs: ['black-print-kurta-set', 'indigo-block-print-co-ord'],
    layout: 'right',
  },
  {
    id: 'look-07',
    title: 'Golden Field',
    caption: 'Swinging skirts and bare feet. The lehenga, off duty.',
    image: 'ed-walking-field',
    productSlugs: ['bottle-green-lehenga', 'embroidered-dupatta'],
    layout: 'full',
  },
]
