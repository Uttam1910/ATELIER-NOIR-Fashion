import { Link } from 'react-router'
import { fashion } from '../config/fashion'
import { services } from '../data/services'
import { NewsletterForm } from './Newsletter'
import { SocialIcon } from './SocialIcon'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop All', to: '/shop' },
      { label: 'Sarees', to: '/collections/sarees' },
      { label: 'Lehengas', to: '/collections/lehengas' },
      { label: 'Kurtas & Sets', to: '/collections/kurtas-sets' },
      { label: 'Co-ords', to: '/collections/co-ords' },
      { label: 'Accessories', to: '/collections/accessories' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Collections', to: '/collections' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Our Story', to: '/our-story' },
      { label: 'Journal', to: '/journal' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Shipping', to: '/shipping' },
      { label: 'Returns', to: '/returns' },
      { label: 'Care Guide', to: '/care' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.name, to: `/styling#${s.slug}` })),
  },
]

export function Footer() {
  return (
    <footer className="on-dark bg-espresso text-ivory">
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
        <div>
          <Link to="/" className="font-serif text-[2rem] leading-none tracking-[0.12em]">
            ATELIER
            <br />
            NOIR
          </Link>
          <p className="eyebrow mt-4 text-champagne">{fashion.descriptor}</p>
          <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-ivory/70">{fashion.positioning}</p>
          <div className="mt-8 max-w-sm">
            <p className="mb-3 font-serif text-[1.35rem]">The Atelier Letter</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-4 text-champagne">{col.title}</p>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="inline-flex min-h-9 items-center text-[0.9rem] text-ivory/75 transition-colors hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col gap-5 py-6 text-[0.8rem] text-ivory/60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1">
            {fashion.socialLinks.map((s) => (
              <Link key={s.network} to={s.href} className="grid size-10 place-items-center text-ivory/70 hover:text-ivory" aria-label={`${s.label} (demo link)`}>
                <SocialIcon network={s.network} className="size-[1.1rem]" />
              </Link>
            ))}
          </div>
          <p className="md:text-center">
            © 2026 {fashion.brandName}. {fashion.demoNotice}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link to="/privacy" className="hover:text-ivory">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-ivory">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/credits" className="hover:text-ivory">
                Image Credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
