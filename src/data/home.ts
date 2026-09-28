import type { ImageKey } from '../types'

export const heroSlides: {
  title: string
  copy: string
  image: ImageKey
  alt: string
  primary: { label: string; to: string }
  secondary: { label: string; to: string }
}[] = [
  {
    title: 'Timeless Style, Modern You',
    copy: "Thoughtfully designed pieces for every occasion, inspired by India's rich visual heritage and made for the modern wardrobe.",
    image: 'saree-noir-banarasi',
    alt: 'Model in an antique gold tissue saree photographed in warm candlelight',
    primary: { label: 'Shop New Arrivals', to: '/shop?sort=newest' },
    secondary: { label: 'Explore Collections', to: '/collections' },
  },
  {
    title: 'Tradition, Reimagined',
    copy: 'Heirloom textiles and time-honoured techniques, cut for the way you dress now.',
    image: 'ed-red-velvet-arch',
    alt: 'Model in a red velvet saree with a gold border looking back over her shoulder in an arched hall',
    primary: { label: 'View the Lookbook', to: '/lookbook' },
    secondary: { label: 'Shop Heritage', to: '/collections/heritage' },
  },
  {
    title: 'Made for Your Moments',
    copy: 'From sangeet nights to slow Sunday lunches — pieces that become part of your story.',
    image: 'saree-emerald-silk-2',
    alt: 'Model seated in an emerald silk saree with golden sunlight across her face',
    primary: { label: 'Shop Occasion Wear', to: '/collections/occasion-wear' },
    secondary: { label: 'Book Styling', to: '/styling' },
  },
]

export const trustPoints = [
  { title: 'Thoughtful Designs', copy: 'Modern silhouettes rooted in tradition.', icon: 'feather' },
  { title: 'Premium Fabrics', copy: 'Quality you can feel.', icon: 'flower' },
  { title: 'Made in India', copy: 'Designed and crafted with care.', icon: 'sprout' },
  { title: 'Personal Styling', copy: 'Book a one-on-one session.', icon: 'hanger' },
] as const

export const craftCards: { title: string; copy: string; image: ImageKey }[] = [
  { title: 'Embroidery', copy: 'Thread, zari and sequin work placed by hand.', image: 'saree-zari-organza-detail' },
  { title: 'Fabric', copy: 'Organza, tissue, silk and handloom cottons.', image: 'saree-banarasi-weave' },
  { title: 'Tailoring', copy: 'Blouses and lehengas finished to measure.', image: 'craft-hand-sewing' },
  { title: 'Packaging', copy: 'Keepsake boxes, tissue and a handwritten note.', image: 'craft-gift' },
]

export const socialImages: { image: ImageKey; caption: string }[] = [
  { image: 'ed-profile', caption: 'Lamplight portraits from the festive shoot.' },
  { image: 'craft-mehendi-silk', caption: 'Mehendi, bangles and an ivory silk border.' },
  { image: 'ed-pink-choker', caption: 'Pink elephants and oxidised silver.' },
  { image: 'fabric-noir-zari', caption: 'Black and gold, woven.' },
  { image: 'ed-forest-light', caption: 'Forest light on a printed drape.' },
  { image: 'acc-jhumka-silver', caption: 'The two-tone jhumka.' },
  { image: 'craft-gold-fabrics', caption: 'Rose gold on the rail.' },
  { image: 'ed-black-saree-pots', caption: 'Market morning.' },
]
