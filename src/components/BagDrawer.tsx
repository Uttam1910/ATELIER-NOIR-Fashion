import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { fashion } from '../config/fashion'
import { useShop } from '../context/shopContext'
import { formatPrice } from '../utils/format'
import { describeSelections } from '../utils/pricing'
import { Img } from './Img'
import { Drawer } from './Overlay'
import { DemoNotice, QuantityStepper } from './ui'

export function OrderSummary({ className = '' }: { className?: string }) {
  const { totals } = useShop()
  const remaining = fashion.freeShippingThreshold - totals.subtotal
  return (
    <dl className={`space-y-2 text-[0.92rem] ${className}`}>
      <div className="flex justify-between">
        <dt className="text-muted">Subtotal</dt>
        <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted">Shipping</dt>
        <dd className="tabular-nums">{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted">GST (5%, estimate)</dt>
        <dd className="tabular-nums">{formatPrice(totals.gst)}</dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3 font-serif text-[1.45rem]">
        <dt>Total</dt>
        <dd className="tabular-nums">{formatPrice(totals.total)}</dd>
      </div>
      {remaining > 0 && totals.subtotal > 0 && (
        <p className="pt-1 text-[0.8rem] text-muted">Add {formatPrice(remaining)} more for free shipping.</p>
      )}
    </dl>
  )
}

export function BagDrawer() {
  const { panel, closePanel, bagLines, totals, setQuantity, removeFromBag, moveToWishlist } = useShop()
  const navigate = useNavigate()
  const empty = bagLines.length === 0

  return (
    <Drawer
      open={panel === 'bag'}
      onClose={closePanel}
      title={empty ? 'Your Bag' : `Your Bag (${totals.count})`}
      footer={
        empty ? undefined : (
          <>
            <OrderSummary />
            <button
              type="button"
              className="btn-primary mt-4 w-full"
              onClick={() => {
                closePanel()
                navigate('/checkout')
              }}
            >
              Proceed to Checkout
            </button>
            <DemoNotice className="mt-3 text-center">This is a demo store. No real payment will be processed.</DemoNotice>
          </>
        )
      }
    >
      {empty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <ShoppingBag className="size-9 text-rose" strokeWidth={1.2} aria-hidden="true" />
          <p className="mt-5 font-serif text-[1.9rem]">Your bag is waiting.</p>
          <p className="mt-2 max-w-xs text-[0.92rem] text-muted">Discover new arrivals, festive pieces and everyday favourites.</p>
          <Link to="/shop" onClick={closePanel} className="btn-primary mt-7">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line px-5">
          {bagLines.map((line) => (
            <li key={line.key} className="flex gap-4 py-5">
              <Link to={`/product/${line.slug}`} onClick={closePanel} className="w-[84px] shrink-0">
                <Img image={line.product.images[0]} sizes="84px" alt="" className="aspect-[3/4] w-full bg-sand object-cover object-top" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/product/${line.slug}`} onClick={closePanel} className="text-[0.92rem] leading-snug hover:text-burgundy">
                    {line.product.name}
                  </Link>
                  <p className="shrink-0 text-[0.92rem] tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                </div>
                <p className="mt-1 text-[0.8rem] text-muted">{describeSelections(line.product, line)}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                  <QuantityStepper
                    size="sm"
                    value={line.quantity}
                    onChange={(q) => setQuantity(line.key, q)}
                    label={`Quantity for ${line.product.name}`}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => moveToWishlist(line.key)}
                      className="grid size-9 place-items-center text-muted hover:text-ink"
                      aria-label={`Move ${line.product.name} to wishlist`}
                      title="Move to wishlist"
                    >
                      <Heart className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromBag(line.key)}
                      className="grid size-9 place-items-center text-muted hover:text-burgundy"
                      aria-label={`Remove ${line.product.name} from bag`}
                      title="Remove"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
