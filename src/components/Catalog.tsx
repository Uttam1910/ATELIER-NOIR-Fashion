import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useShop } from '../context/shopContext'
import { categories } from '../data/categories'
import { edits } from '../data/collections'
import type { Product } from '../types'
import {
  activeFilterCount,
  applyFilters,
  colorFamilies,
  priceBands,
  productColorFamilies,
  readFilters,
  sortOptions,
} from '../utils/catalog'
import type { FilterKey } from '../utils/catalog'
import { Drawer } from './Overlay'
import { ProductCard } from './ProductCard'

interface CatalogProps {
  products: Product[]
  /** Filter groups that don't make sense on this page (e.g. category on /collections/sarees) */
  hide?: FilterKey[]
  searchLabel?: string
  emptyAction?: { label: string; to: string }
}

interface Group {
  key: FilterKey
  title: string
  options: { value: string; label: string; swatch?: string }[]
}

export function Catalog({ products, hide = [], searchLabel = 'Search the collection', emptyAction }: CatalogProps) {
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)
  const { panel, openPanel, closePanel } = useShop()

  const results = useMemo(() => applyFilters([...products], readFilters(params)), [products, params])

  const groups = useMemo<Group[]>(() => {
    const presentCategories = new Set(products.map((p) => p.category))
    const presentEdits = new Set(products.flatMap((p) => p.collections))
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const sizes = [...new Set(products.flatMap((p) => p.sizes))].filter((s) => sizeOrder.includes(s)).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    const families = new Set(products.flatMap(productColorFamilies))
    const all: Group[] = [
      { key: 'category', title: 'Category', options: categories.filter((c) => presentCategories.has(c.slug)).map((c) => ({ value: c.slug, label: c.name })) },
      { key: 'edit', title: 'Collection', options: edits.filter((e) => presentEdits.has(e.slug)).map((e) => ({ value: e.slug, label: e.name })) },
      { key: 'size', title: 'Size', options: sizes.map((s) => ({ value: s, label: s })) },
      { key: 'color', title: 'Colour', options: colorFamilies.filter((f) => families.has(f.value)).map((f) => ({ value: f.value, label: f.label, swatch: f.hex })) },
      { key: 'price', title: 'Price', options: priceBands.map((b) => ({ value: b.value, label: b.label })) },
      {
        key: 'availability',
        title: 'Availability',
        options: [
          { value: 'in-stock', label: 'Ready to ship' },
          { value: 'made-to-order', label: 'Made to order' },
        ],
      },
    ]
    return all.filter((g) => !hide.includes(g.key) && g.options.length > 1)
  }, [products, hide])

  const update = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params)
    mutate(next)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const toggle = (key: FilterKey, value: string) =>
    update((next) => {
      const current = next.get(key)?.split(',').filter(Boolean) ?? []
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      if (updated.length) next.set(key, updated.join(','))
      else next.delete(key)
    })

  const clearAll = () =>
    update((next) => {
      for (const g of groups) next.delete(g.key)
      next.delete('q')
    })

  const selected = (key: FilterKey) => params.get(key)?.split(',').filter(Boolean) ?? []
  const activeCount = activeFilterCount(filters)
  const chips = groups.flatMap((g) =>
    selected(g.key).flatMap((value) => {
      const opt = g.options.find((o) => o.value === value)
      return opt ? [{ key: g.key, value, label: opt.label }] : []
    }),
  )

  const filterPanel = (idPrefix: string) => (
    <div className="space-y-8">
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend className="eyebrow mb-3 text-ink">{group.title}</legend>
          <ul className={group.key === 'size' ? 'flex flex-wrap gap-2' : 'space-y-1'}>
            {group.options.map((opt) => {
              const id = `${idPrefix}-${group.key}-${opt.value}`
              const checked = selected(group.key).includes(opt.value)
              return (
                <li key={opt.value}>
                  <input id={id} type="checkbox" checked={checked} onChange={() => toggle(group.key, opt.value)} className="peer sr-only" />
                  {group.key === 'size' ? (
                    <label
                      htmlFor={id}
                      className="flex min-h-10 min-w-11 cursor-pointer items-center justify-center border border-line px-2 text-[0.82rem] peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy hover:border-ink"
                    >
                      {opt.label}
                    </label>
                  ) : (
                    <label
                      htmlFor={id}
                      className="group flex min-h-9 cursor-pointer items-center gap-3 text-[0.9rem] text-ink/80 peer-focus-visible:outline-2 peer-focus-visible:outline-burgundy hover:text-ink"
                    >
                      <span
                        className={`grid size-4 shrink-0 place-items-center border ${checked ? 'border-espresso bg-espresso' : 'border-ink/35'}`}
                        aria-hidden="true"
                      >
                        {checked && <span className="size-1.5 bg-ivory" />}
                      </span>
                      {opt.swatch && <span className="size-3.5 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: opt.swatch }} aria-hidden="true" />}
                      {opt.label}
                    </label>
                  )}
                </li>
              )
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  )

  return (
    <div className="container-page pb-20">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-y border-line py-4 md:flex-row md:items-center md:justify-between">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="catalog-search" className="sr-only">
            {searchLabel}
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder={searchLabel}
            value={filters.q}
            onChange={(e) =>
              update((next) => {
                if (e.target.value) next.set('q', e.target.value)
                else next.delete('q')
              })
            }
            className="field pl-9"
          />
        </form>
        <div className="flex items-center justify-between gap-3 md:justify-end md:gap-6">
          <p className="text-[0.85rem] text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openPanel('filters')}
              className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-[0.72rem] font-medium tracking-[0.14em] uppercase lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
            <label htmlFor="catalog-sort" className="sr-only">
              Sort by
            </label>
            <select
              id="catalog-sort"
              value={filters.sort}
              onChange={(e) =>
                update((next) => {
                  if (e.target.value === 'featured') next.delete('sort')
                  else next.set('sort', e.target.value)
                })
              }
              className="min-h-11 max-w-[11.5rem] border border-line bg-transparent px-3 text-[0.85rem] focus:border-ink focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.value === 'featured' ? 'Sort: Featured' : o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {chips.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => toggle(chip.key, chip.value)}
              className="inline-flex min-h-9 items-center gap-1.5 bg-sand/70 px-3 text-[0.8rem] hover:bg-sand"
              aria-label={`Remove filter ${chip.label}`}
            >
              {chip.label}
              <X className="size-3" aria-hidden="true" />
            </button>
          ))}
          <button type="button" onClick={clearAll} className="ml-1 text-[0.8rem] underline underline-offset-4">
            Clear all
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr] xl:gap-14">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-24">{filterPanel('desktop')}</div>
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-[1.8rem]">No pieces match these filters.</p>
              <p className="mt-2 text-muted">Try removing a filter or searching for something broader.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clearAll} className="btn-outline">
                  Clear filters
                </button>
                {emptyAction && (
                  <Link to={emptyAction.to} className="btn-primary">
                    {emptyAction.label}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3">
              {results.map((product, i) => (
                <li key={product.slug}>
                  <ProductCard product={product} priority={i < 3} sizes="(min-width: 1280px) 330px, (min-width: 768px) 30vw, 48vw" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Drawer
        open={panel === 'filters'}
        onClose={closePanel}
        title="Filters"
        side="left"
        footer={
          <div className="flex gap-3">
            <button type="button" onClick={clearAll} className="btn-outline flex-1">
              Clear
            </button>
            <button type="button" onClick={closePanel} className="btn-primary flex-[2]">
              Show {results.length}
            </button>
          </div>
        }
      >
        <div className="px-5 py-6">{filterPanel('mobile')}</div>
      </Drawer>
    </div>
  )
}
