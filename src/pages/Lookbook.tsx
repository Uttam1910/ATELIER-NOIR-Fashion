import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Img } from '../components/Img'
import { useShop } from '../context/shopContext'
import { lookbookIntro, looks } from '../data/lookbook'
import { getProducts } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Look } from '../types'
import { formatPrice } from '../utils/format'

function ShopTheLook({ look, tone }: { look: Look; tone: 'light' | 'dark' }) {
  const { openQuickView } = useShop()
  const items = getProducts(look.productSlugs)
  return (
    <div>
      <p className={`eyebrow mb-3 ${tone === 'dark' ? 'text-champagne' : 'text-rose'}`}>Shop the Look</p>
      <ul className={`divide-y ${tone === 'dark' ? 'divide-ivory/15 border-y border-ivory/15' : 'divide-line border-y border-line'}`}>
        {items.map((p) => (
          <li key={p.slug} className="flex items-center gap-3 py-3">
            <Link to={`/product/${p.slug}`} className="w-12 shrink-0">
              <Img image={p.images[0]} sizes="48px" alt="" className="aspect-[3/4] w-full object-cover object-top" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link to={`/product/${p.slug}`} className="block truncate text-[0.9rem] hover:underline">
                {p.name}
              </Link>
              <p className={`text-[0.82rem] ${tone === 'dark' ? 'text-ivory/65' : 'text-muted'}`}>{formatPrice(p.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => openQuickView(p.slug)}
              className={`min-h-10 shrink-0 border px-3 text-[0.64rem] font-medium tracking-[0.16em] uppercase transition-colors ${
                tone === 'dark' ? 'border-ivory/40 hover:bg-ivory hover:text-espresso' : 'border-ink/40 hover:bg-ink hover:text-ivory'
              }`}
              aria-label={`Quick shop ${p.name}`}
            >
              Quick Shop
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Lookbook() {
  useDocumentMeta('Lookbook', "Modern Tradition — the ATELIER NOIR lookbook. A celebration of India's rich heritage, reimagined through a contemporary lens.")

  return (
    <>
      <header className="on-dark relative isolate flex min-h-[min(88svh,780px)] items-end overflow-hidden bg-espresso text-ivory">
        <Img image={lookbookIntro.image} sizes="100vw" priority alt="" className="absolute inset-0 -z-10 size-full object-cover object-[center_22%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/5" />
        <div className="container-page pt-32 pb-14 md:pb-20">
          <p className="eyebrow text-champagne">{lookbookIntro.kicker}</p>
          <h1 className="mt-4 text-[3.4rem] leading-[0.95] sm:text-[5rem] lg:text-[6.4rem]">{lookbookIntro.title}</h1>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ivory/80">{lookbookIntro.copy}</p>
          <p aria-hidden="true" className="mt-6 font-script text-[2.6rem] leading-none text-champagne sm:text-[3.4rem]">
            seven looks, one story
          </p>
        </div>
      </header>

      <div className="py-12 md:py-20">
        {looks.map((look, i) => {
          const number = String(i + 1).padStart(2, '0')
          if (look.layout === 'full') {
            return (
              <section key={look.id} aria-labelledby={`${look.id}-title`} className="on-dark relative mb-12 bg-espresso text-ivory md:mb-20">
                <div className="grid lg:grid-cols-[1.6fr_1fr]">
                  <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[720px]">
                    <Img image={look.image} sizes="(min-width: 1024px) 62vw, 100vw" className="absolute inset-0 size-full object-cover object-[center_25%]" />
                  </div>
                  <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
                    <p className="font-serif text-[4rem] leading-none text-champagne/60">{number}</p>
                    <h2 id={`${look.id}-title`} className="mt-2 text-[2.6rem] leading-none sm:text-[3.2rem]">
                      {look.title}
                    </h2>
                    <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-ivory/75">{look.caption}</p>
                    <div className="mt-8 max-w-md">
                      <ShopTheLook look={look} tone="dark" />
                    </div>
                  </div>
                </div>
              </section>
            )
          }
          const reverse = look.layout === 'right'
          return (
            <section key={look.id} aria-labelledby={`${look.id}-title`} className="container-page mb-12 md:mb-20">
              <div className={`grid items-center gap-8 md:grid-cols-2 lg:gap-16 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden bg-sand">
                  <Img image={look.image} sizes="(min-width: 768px) 48vw, 100vw" className="size-full object-cover object-top" />
                </div>
                <div className="max-w-md">
                  <p className="font-serif text-[4rem] leading-none text-rose/60">{number}</p>
                  <h2 id={`${look.id}-title`} className="mt-2 text-[2.6rem] leading-none sm:text-[3.2rem]">
                    {look.title}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-relaxed text-muted">{look.caption}</p>
                  <div className="mt-8">
                    <ShopTheLook look={look} tone="light" />
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <section className="border-t border-line bg-ivory-deep py-16 text-center md:py-24">
        <div className="container-page">
          <h2 className="text-[2.4rem] leading-tight sm:text-[3rem]">Find your own tradition.</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Our stylists can build a look around a piece you love — in the studio or on video.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/styling" className="btn-primary">
              Book Styling
            </Link>
            <Link to="/shop" className="btn-outline">
              Shop the Collection <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
