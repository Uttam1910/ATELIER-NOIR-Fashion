import type { Service } from '../types'

export const services: Service[] = [
  {
    slug: 'personal-styling',
    name: 'Personal Styling',
    summary: 'One-on-one styling guidance.',
    description:
      'Sit down with a stylist in the studio for an unhurried hour. Bring your occasion, your references and your questions — we will pull pieces, pair jewellery and drape sarees with you.',
    image: 'studio-lounge',
    points: ['60-minute session', 'Draping and fit guidance', 'A shortlist sent after your visit'],
    cta: { label: 'Book a Session', to: '/styling' },
  },
  {
    slug: 'custom-orders',
    name: 'Custom Orders',
    summary: 'Made-to-request options for selected pieces.',
    description:
      'Selected lehengas, blouses and occasion pieces can be adapted — a different sleeve, a longer dupatta, a colour from another season. We will confirm what is possible before anything is made.',
    image: 'craft-gold-fabrics',
    points: ['Available on selected styles', 'Colour and length adjustments', 'Timelines confirmed up front'],
    cta: { label: 'Ask About Custom Orders', to: '/contact' },
  },
  {
    slug: 'gift-packaging',
    name: 'Gift Packaging',
    summary: 'Premium presentation for special moments.',
    description:
      'Choose gift packaging at checkout and your order arrives in a keepsake box with tissue, ribbon and a handwritten note — prices hidden.',
    image: 'craft-gift',
    points: ['Keepsake box and ribbon', 'Handwritten note', 'Price-free gift receipt'],
    cta: { label: 'Shop Gifts', to: '/collections/accessories' },
  },
  {
    slug: 'virtual-shopping',
    name: 'Virtual Shopping',
    summary: 'Shop from home with a styling consultation.',
    description:
      'A video appointment with a stylist who will show pieces up close, drape on a form and answer fit questions — wherever you are.',
    image: 'service-virtual',
    points: ['30 or 60 minutes on video', 'Close-up fabric walkthroughs', 'Shortlist shared by email'],
    cta: { label: 'Book a Virtual Session', to: '/styling?type=virtual' },
  },
]
