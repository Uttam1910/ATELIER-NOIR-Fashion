/**
 * Central brand configuration. Rebrand the site by editing this file
 * (and the content in src/data).
 */
export const fashion = {
  brandName: 'ATELIER NOIR',
  brandShort: 'Atelier Noir',
  descriptor: 'Indian Contemporary Fashion',
  tagline: 'Timeless Style, Modern You',
  positioning:
    'Thoughtfully designed pieces for every occasion and every version of you.',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'hello@ateliernoir.in',
  address: {
    line1: 'Studio 4, Linking Road',
    line2: 'Bandra West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postcode: '400050',
    country: 'India',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bandra+West+Mumbai',
  hours: [
    { days: 'Mon – Sat', time: '11:00 AM – 8:00 PM' },
    { days: 'Sun', time: '11:00 AM – 6:00 PM' },
  ],
  instagram: '@ateliernoir',
  /** Social links intentionally point nowhere real — this is a demo brand. */
  socialLinks: [
    { label: 'Instagram', network: 'instagram', href: '/#social' },
    { label: 'Facebook', network: 'facebook', href: '/#social' },
    { label: 'Pinterest', network: 'pinterest', href: '/#social' },
    { label: 'YouTube', network: 'youtube', href: '/#social' },
  ],
  currency: 'INR',
  locale: 'en-IN',
  gstRate: 0.05,
  freeShippingThreshold: 2999,
  shippingFee: 150,
  demoMode: true,
  demoNotice:
    'Website demo concept — business details shown for demonstration purposes.',
} as const

export const pageTitle = (title?: string) =>
  title ? `${fashion.brandName} — ${title}` : `${fashion.brandName} — ${fashion.descriptor}`
