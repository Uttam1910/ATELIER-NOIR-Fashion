import { Heart, X } from 'lucide-react'
import { Link } from 'react-router'
import { useShop } from '../context/shopContext'
import { formatPrice } from '../utils/format'
import { needsChoice } from '../utils/pricing'
import { Img } from './Img'
import { Drawer } from './Overlay'

export function WishlistDrawer() {
  const { panel, closePanel, wishlist, removeFromWishlist, moveToBag } = useShop()

  return (
    <Drawer open={panel === 'wishlist'} onClose={closePanel} title={`Wishlist${wishlist.length ? ` (${wishlist.length})` : ''}`}>
      {wishlist.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <Heart className="size-9 text-rose" strokeWidth={1.2} aria-hidden="true" />
          <p className="mt-5 font-serif text-[1.9rem]">Nothing saved yet.</p>
          <p className="mt-2 max-w-xs text-[0.92rem] text-muted">Tap the heart on any piece to keep it here — saved on this device only.</p>
          <Link to="/shop" onClick={closePanel} className="btn-primary mt-7">
            Explore the Shop
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line px-5">
          {wishlist.map((product) => (
            <li key={product.slug} className="flex gap-4 py-5">
              <Link to={`/product/${product.slug}`} onClick={closePanel} className="w-[84px] shrink-0">
                <Img image={product.images[0]} sizes="84px" alt="" className="aspect-[3/4] w-full bg-sand object-cover object-top" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/product/${product.slug}`} onClick={closePanel} className="text-[0.92rem] leading-snug hover:text-burgundy">
                    {product.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.slug)}
                    className="-mt-2 -mr-2 grid size-9 shrink-0 place-items-center text-muted hover:text-burgundy"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-1 text-[0.9rem] tabular-nums">{formatPrice(product.price)}</p>
                <button type="button" onClick={() => moveToBag(product.slug)} className="btn-outline mt-auto min-h-10 self-start px-4 text-[0.7rem]">
                  {needsChoice(product) ? 'Choose Size' : 'Move to Bag'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
