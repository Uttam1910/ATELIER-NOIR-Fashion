import { Heart, LayoutGrid, ShoppingBag, Store } from 'lucide-react'
import { NavLink } from 'react-router'
import { useShop } from '../context/shopContext'

/** Mobile shopping bar. The layout adds matching bottom padding so it never covers content. */
export function BottomNav() {
  const { openPanel, panel, totals, wishlist } = useShop()
  const item = 'relative flex flex-1 flex-col items-center justify-center gap-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase'
  const count = (n: number) =>
    n > 0 && (
      <span className="absolute top-1 left-1/2 ml-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[0.58rem] text-ivory tabular-nums">
        {n}
      </span>
    )

  return (
    <nav
      aria-label="Shopping"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="flex h-16">
        <li className="flex flex-1">
          <NavLink to="/shop" className={({ isActive }) => `${item} ${isActive ? 'text-burgundy' : ''}`}>
            <Store className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Shop
          </NavLink>
        </li>
        <li className="flex flex-1">
          <NavLink to="/collections" className={({ isActive }) => `${item} ${isActive ? 'text-burgundy' : ''}`}>
            <LayoutGrid className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Collections
          </NavLink>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={() => openPanel('wishlist')} className={`${item} ${panel === 'wishlist' ? 'text-burgundy' : ''}`} aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Wishlist
            {count(wishlist.length)}
          </button>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={() => openPanel('bag')} className={`${item} ${panel === 'bag' ? 'text-burgundy' : ''}`} aria-label={`Bag, ${totals.count} items`}>
            <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Bag
            {count(totals.count)}
          </button>
        </li>
      </ul>
    </nav>
  )
}
