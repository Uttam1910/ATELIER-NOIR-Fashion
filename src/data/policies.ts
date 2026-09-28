export interface PolicySection {
  heading: string
  paragraphs: string[]
}

export interface Policy {
  slug: 'privacy' | 'terms' | 'shipping' | 'returns' | 'care'
  title: string
  intro: string
  sections: PolicySection[]
}

const DEMO_NOTE =
  'This is a sample policy written for a fictional brand. It is not legal advice and does not describe a real business.'

export const policies: Record<Policy['slug'], Policy> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro: DEMO_NOTE,
    sections: [
      {
        heading: 'What this demo stores',
        paragraphs: [
          'Your bag and wishlist are saved in your own browser using localStorage so they survive a page refresh. Nothing is sent to a server.',
          'Forms (newsletter, contact, styling and checkout) are validated in the browser and never transmitted.',
        ],
      },
      {
        heading: 'Third parties',
        paragraphs: [
          'Web fonts are loaded from Google Fonts. Photographs are served from this site and credited on the Credits page.',
        ],
      },
      {
        heading: 'Clearing your data',
        paragraphs: ['Clear your browser storage for this site to remove your saved bag and wishlist.'],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms & Conditions',
    intro: DEMO_NOTE,
    sections: [
      {
        heading: 'Demo only',
        paragraphs: [
          'ATELIER NOIR is a fictional label. Products, prices, reviews and business details are illustrative. No contract of sale is formed by using this website.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'Prices are shown in Indian Rupees. GST is shown as a flat 5% estimate for demonstration; real GST rates on apparel vary by item value.',
        ],
      },
      {
        heading: 'Imagery',
        paragraphs: [
          'Photographs are licensed from Unsplash and belong to their photographers. The people pictured are not associated with this demo.',
        ],
      },
    ],
  },
  shipping: {
    slug: 'shipping',
    title: 'Shipping Policy',
    intro: DEMO_NOTE,
    sections: [
      {
        heading: 'Dispatch',
        paragraphs: [
          'In-stock pieces would typically dispatch within 2–4 working days. Made-to-order pieces show their own sample timeline on the product page.',
        ],
      },
      {
        heading: 'Shipping charges',
        paragraphs: ['The demo applies free shipping above ₹2,999 and a ₹150 fee below that.'],
      },
      {
        heading: 'International orders',
        paragraphs: ['This demo does not simulate international shipping.'],
      },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Returns Policy',
    intro: DEMO_NOTE,
    sections: [
      {
        heading: 'Return window',
        paragraphs: [
          'A sample 7-day return window applies to unworn, unwashed pieces with tags attached.',
        ],
      },
      {
        heading: 'Exclusions',
        paragraphs: [
          'Stitched-to-size blouses, altered lehengas, custom orders and earrings would not be returnable for hygiene and fit reasons.',
        ],
      },
      {
        heading: 'Exchanges',
        paragraphs: ['Size exchanges would be offered subject to availability.'],
      },
    ],
  },
  care: {
    slug: 'care',
    title: 'Care Guide',
    intro: 'General guidance for the fabrics used across the collection. Always check the care notes on each product.',
    sections: [
      {
        heading: 'Silks & zari',
        paragraphs: [
          'Dry clean only. Store folded in muslin, away from light, and refold every few months so the zari does not crease permanently along the same lines.',
        ],
      },
      {
        heading: 'Cottons & linens',
        paragraphs: [
          'Hand wash in cold water with a mild detergent, dry in shade and iron on the reverse while slightly damp.',
        ],
      },
      {
        heading: 'Embellished pieces',
        paragraphs: [
          'Store flat or on padded hangers. Keep perfume, deodorant and moisture away from sequins and thread work.',
        ],
      },
      {
        heading: 'Jewellery',
        paragraphs: ['Wipe with a soft dry cloth after wear and store in the pouch provided. Avoid water and perfume.'],
      },
    ],
  },
}
