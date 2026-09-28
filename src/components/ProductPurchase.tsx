import { Heart } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useShop } from '../context/shopContext'
import type { Product, ProductOption } from '../types'
import { availabilityLabels } from '../utils/catalog'
import { formatPrice } from '../utils/format'
import { defaultSelections, missingSelections, unitPrice, visibleOptions } from '../utils/pricing'
import { QuantityStepper } from './ui'

interface ProductPurchaseProps {
  product: Product
  /** Called after a successful add, e.g. to close quick view */
  onAdded?: () => void
  compact?: boolean
  /** Renders a sticky Add to Bag bar on small screens (product page only). */
  stickyMobile?: boolean
}

export function ProductPurchase({ product, onAdded, compact = false, stickyMobile = false }: ProductPurchaseProps) {
  const { addToBag, isWishlisted, toggleWishlist } = useShop()
  const [color, setColor] = useState(product.colors[0]?.name)
  const [selections, setSelections] = useState<Record<string, string>>(() => defaultSelections(product))
  const [quantity, setQuantity] = useState(1)
  const [showErrors, setShowErrors] = useState(false)
  const uid = useId()
  const addRef = useRef<HTMLDivElement>(null)
  const [addVisible, setAddVisible] = useState(true)

  useEffect(() => {
    if (!stickyMobile || !addRef.current) return
    // Reserve space at the bottom of the page for the sticky bar on small screens.
    document.body.dataset.stickyBar = ''
    const observer = new IntersectionObserver(([entry]) => setAddVisible(entry.isIntersecting))
    observer.observe(addRef.current)
    return () => {
      observer.disconnect()
      delete document.body.dataset.stickyBar
    }
  }, [stickyMobile])

  const options = visibleOptions(product.options, selections)
  const missing = missingSelections(product, selections)
  const price = unitPrice(product, selections)
  const saved = isWishlisted(product.slug)

  const choose = (option: ProductOption, value: string) =>
    setSelections((current) => {
      const next = { ...current, [option.id]: value }
      // Drop selections for options that are no longer visible (e.g. blouse size for unstitched).
      for (const o of product.options) {
        if (o.showWhen?.optionId === option.id && !o.showWhen.values.includes(value)) delete next[o.id]
      }
      return next
    })

  const handleAdd = () => {
    if (missing.length > 0) {
      setShowErrors(true)
      document.getElementById(`${uid}-${missing[0].id}`)?.focus()
      return
    }
    setShowErrors(false)
    const kept = Object.fromEntries(Object.entries(selections).filter(([k]) => options.some((o) => o.id === k)))
    addToBag(product.slug, { color, selections: kept, quantity })
    setQuantity(1)
    onAdded?.()
  }

  return (
    <div className={compact ? 'space-y-5' : 'space-y-7'}>
      <div className="flex items-baseline gap-3">
        <p className="text-[1.35rem] tabular-nums" aria-live="polite">
          {formatPrice(price)}
        </p>
        {price !== product.price && (
          <p className="text-[0.8rem] text-muted">includes options · base {formatPrice(product.price)}</p>
        )}
      </div>

      {product.colors.length > 0 && (
        <fieldset>
          <legend className="field-label">
            Colour: <span className="font-normal tracking-normal text-ink normal-case">{color}</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <label key={c.name} className="relative cursor-pointer" title={c.name}>
                <input
                  type="radio"
                  name={`${uid}-color`}
                  value={c.name}
                  checked={color === c.name}
                  onChange={() => setColor(c.name)}
                  className="peer sr-only"
                />
                <span
                  className="block size-9 rounded-full ring-1 ring-ink/15 ring-offset-2 ring-offset-ivory transition-shadow peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-burgundy"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {options.map((option) => {
        const error = showErrors && !selections[option.id]
        const isSize = option.kind === 'size'
        return (
          <fieldset key={option.id} aria-describedby={error ? `${uid}-${option.id}-error` : undefined}>
            <legend className="field-label">
              {option.label}
              {isSize && selections[option.id] && (
                <span className="ml-1 font-normal tracking-normal text-ink normal-case">: {selections[option.id]}</span>
              )}
            </legend>
            <div className={`mt-2 flex flex-wrap gap-2 ${isSize ? '' : 'flex-col sm:flex-row'}`}>
              {option.choices.map((choice, i) => (
                <label key={choice.value} className="cursor-pointer">
                  <input
                    type="radio"
                    id={i === 0 ? `${uid}-${option.id}` : undefined}
                    name={`${uid}-${option.id}`}
                    value={choice.value}
                    checked={selections[option.id] === choice.value}
                    onChange={() => choose(option, choice.value)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex min-h-11 items-center justify-center border px-3.5 text-[0.85rem] transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy hover:border-ink ${
                      isSize ? 'min-w-12' : ''
                    } ${error ? 'border-burgundy' : 'border-line'}`}
                  >
                    {choice.label}
                    {choice.priceDelta ? <span className="ml-1.5 opacity-70">+{formatPrice(choice.priceDelta)}</span> : null}
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p id={`${uid}-${option.id}-error`} className="field-error">
                Please choose a {option.label.toLowerCase()}.
              </p>
            )}
          </fieldset>
        )
      })}

      <div>
        <p className="field-label">Quantity</p>
        <QuantityStepper value={quantity} onChange={(q) => setQuantity(Math.max(1, Math.min(10, q)))} label="Quantity" />
      </div>

      <div ref={addRef} className="flex gap-3">
        <button type="button" onClick={handleAdd} className="btn-primary flex-1">
          Add to Bag · {formatPrice(price * quantity)}
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className="grid size-11 shrink-0 place-items-center border border-line transition-colors hover:border-ink"
        >
          <Heart className={`size-[1.1rem] ${saved ? 'fill-burgundy text-burgundy' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <p className="text-[0.82rem] text-muted">
        <span
          className={`mr-2 inline-block size-1.5 rounded-full align-middle ${
            product.availability === 'made-to-order' ? 'bg-champagne' : product.availability === 'low-stock' ? 'bg-rose' : 'bg-olive'
          }`}
          aria-hidden="true"
        />
        {availabilityLabels[product.availability]}
        {product.availability === 'made-to-order' && ' · sample timeline 3–4 weeks'}
      </p>

      {stickyMobile && !addVisible && (
        <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 flex animate-fade-in items-center gap-3 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.82rem]">{product.name}</p>
            <p className="text-[0.9rem] tabular-nums">{formatPrice(price * quantity)}</p>
          </div>
          <button type="button" onClick={handleAdd} className="btn-primary px-5">
            Add to Bag
          </button>
        </div>
      )}
    </div>
  )
}
