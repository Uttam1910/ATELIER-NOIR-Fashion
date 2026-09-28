import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useShop } from '../context/shopContext'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { useDialog } from '../hooks/useDialog'
import { searchProducts } from '../utils/catalog'
import { formatPrice } from '../utils/format'
import { Img } from './Img'

export function SearchOverlay() {
  const { panel, closePanel } = useShop()
  const open = panel === 'search'
  const ref = useDialog<HTMLDivElement>(open, closePanel)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  if (!open) return null
  const results = query.trim() ? searchProducts(products, query).slice(0, 6) : []

  const submit = () => {
    closePanel()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-espresso/45" onClick={closePanel} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative max-h-[100dvh] animate-fade-up overflow-y-auto bg-ivory shadow-xl"
      >
        <div className="container-page py-5 md:py-8">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            className="flex items-center gap-3 border-b border-ink pb-2"
          >
            <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              data-autofocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, lehengas, colours…"
              autoComplete="off"
              className="min-h-12 w-full min-w-0 bg-transparent font-serif text-[1.6rem] placeholder:text-muted/60 focus:outline-none md:text-[2rem]"
            />
            <button type="button" onClick={closePanel} className="grid size-11 shrink-0 place-items-center" aria-label="Close search">
              <X className="size-5" aria-hidden="true" />
            </button>
          </form>

          {query.trim() === '' ? (
            <div className="mt-6">
              <p className="eyebrow text-muted">Popular</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/collections/${c.slug}`}
                      onClick={closePanel}
                      className="inline-flex min-h-10 items-center border border-line px-4 text-[0.85rem] hover:border-ink"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6" aria-live="polite">
              {results.length === 0 ? (
                <p className="text-muted">No pieces match “{query}”. Try a colour or category.</p>
              ) : (
                <>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {results.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/product/${p.slug}`} onClick={closePanel} className="group block">
                          <Img image={p.images[0]} sizes="(min-width: 1024px) 180px, 45vw" alt="" className="aspect-[3/4] w-full bg-sand object-cover object-top" />
                          <p className="mt-2 text-[0.85rem] leading-snug group-hover:text-burgundy">{p.name}</p>
                          <p className="text-[0.82rem] text-muted">{formatPrice(p.price)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={submit} className="link-underline mt-6">
                    See all results <ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
