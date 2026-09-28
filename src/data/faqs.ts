import type { FaqGroup } from '../types'

export const faqGroups: FaqGroup[] = [
  {
    title: 'Orders',
    items: [
      {
        question: 'Is this a real store?',
        answer:
          'No. ATELIER NOIR is a fictional brand created as a website demo. You can browse, add to bag and complete a demo checkout, but no order is placed and no payment is taken.',
      },
      {
        question: 'Can I change my order after placing it?',
        answer:
          'In this demo, orders are not processed. On a live store, the studio team would typically be able to amend size or blouse options within a few hours of ordering.',
      },
      {
        question: 'How do made-to-order pieces work?',
        answer:
          'Pieces marked "Made to order" would be cut after you order. The product page shows an indicative timeline — these are sample timelines for demonstration only.',
      },
    ],
  },
  {
    title: 'Sizing & Fit',
    items: [
      {
        question: 'How do I choose a blouse size for a saree?',
        answer:
          'Measure around the fullest part of your bust and choose the nearest blouse size (32–42). If you prefer, select the unstitched blouse piece and have it tailored locally.',
      },
      {
        question: 'Do your kurtas run true to size?',
        answer:
          'Our kurta sets are cut with a relaxed straight fit. If you are between sizes, the demo size guide suggests sizing down for a closer fit.',
      },
      {
        question: 'Can I get a lehenga adjusted?',
        answer:
          'Custom adjustments are offered as a sample service on selected lehengas. See Custom Orders on the Styling page.',
      },
    ],
  },
  {
    title: 'Shipping & Returns',
    items: [
      {
        question: 'How long does delivery take?',
        answer:
          'The demo shows estimated dispatch dates only. No shipping takes place. See the sample Shipping Policy for how a live store might describe it.',
      },
      {
        question: 'What is your returns window?',
        answer:
          'The sample Returns Policy describes a 7-day window for unworn, unaltered pieces. It is illustrative and not a real commitment.',
      },
    ],
  },
  {
    title: 'Styling Appointments',
    items: [
      {
        question: 'Are styling sessions free?',
        answer:
          'In this demo, appointment requests are stored only in your browser session and nobody will contact you. A live studio would confirm pricing when booking.',
      },
      {
        question: 'Can I book a virtual appointment?',
        answer: 'Yes — choose "Virtual" as the appointment type on the Styling page to see how it works.',
      },
    ],
  },
]
