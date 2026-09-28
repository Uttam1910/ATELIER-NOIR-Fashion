# ATELIER NOIR — Indian Contemporary Fashion (website demo)

A frontend-only demo for a fictional contemporary Indian fashion label. It has no backend or accounts and takes no real payments. The bag, wishlist, checkout and forms all run in the browser.

## Stack
React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · Lucide React

## Scripts
```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Where things live
- `src/config/fashion.ts`: brand name, contact details, hours, social links, GST and shipping settings. Rebrand the site from here.
- `src/data/`: products (41), categories, edits, lookbook, journal, services, FAQs, policies, and the image registry (`images.ts`: alt text, aspect ratios, credits).
- `src/pages/`: one file per route. Every route is lazy-loaded except Home.
- `src/components/`: shared UI (catalogue and filters, product card and purchase panel, drawers, lightbox, header and footer).
- `src/context/`: bag, wishlist and panel state (saved to localStorage) and toasts.
- `public/images/`: 73 Unsplash photographs as WebP at 640/1200px, with 1600px for editorial images. Credits are in `public/images/CREDITS.md` and on `/credits`.

## Deployment note
This is a single-page app. Configure the host to serve `index.html` for unknown paths so deep links like `/product/zari-organza-saree` work.
# ATELIER-NOIR-Fashion
