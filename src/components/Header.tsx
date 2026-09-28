import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'
import { fashion } from '../config/fashion'
import { useShop } from '../context/shopContext'
import { useScrolled } from '../hooks/useScrolled'
import { categories } from '../data/categories'
import { primaryNav } from './nav'
import { Drawer } from './Overlay'
import { SocialIcon } from './SocialIcon'

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[0.6rem] leading-none text-ivory tabular-nums">
      {count}
    </span>
  )
}

export function Header() {
  const { openPanel, panel, closePanel, totals, wishlist } = useShop()
  const scrolled = useScrolled()
  const { pathname } = useLocation()
  // The home page opens with a dark hero, so the header starts transparent there.
  const overlay = pathname === '/' && !scrolled

  const iconBtn = 'relative grid size-11 place-items-center transition-opacity hover:opacity-70'

  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[70] -translate-y-20 bg-espresso px-4 py-2 text-sm text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 transition-colors duration-500 ${
          overlay ? 'on-dark -mb-16 bg-transparent text-ivory lg:-mb-[4.5rem]' : 'border-b border-line/80 bg-ivory/95 text-ink backdrop-blur'
        }`}
      >
        <div className="container-page flex h-16 items-center gap-2 lg:h-[4.5rem]">
          <button type="button" onClick={() => openPanel('menu')} className={`${iconBtn} -ml-2.5 lg:hidden`} aria-label="Open menu">
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <Link
            to="/"
            className="font-serif text-[1.18rem] tracking-[0.1em] whitespace-nowrap sm:text-[1.5rem] sm:tracking-[0.12em] lg:mr-8"
            aria-label={`${fashion.brandName} — home`}
          >
            {fashion.brandName}
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative py-2 text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-opacity hover:opacity-70 ${
                        isActive ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current' : ''
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center">
            <button type="button" onClick={() => openPanel('search')} className={iconBtn} aria-label="Search">
              <Search className="size-[1.15rem]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => openPanel('wishlist')}
              className={iconBtn}
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <Heart className="size-[1.15rem]" aria-hidden="true" />
              <CountBadge count={wishlist.length} />
            </button>
            <button
              type="button"
              onClick={() => openPanel('bag')}
              className={`${iconBtn} -mr-2.5 lg:mr-0`}
              aria-label={`Bag, ${totals.count} items`}
            >
              <ShoppingBag className="size-[1.15rem]" aria-hidden="true" />
              <CountBadge count={totals.count} />
            </button>
            <Link
              to="/styling"
              className={`ml-3 hidden min-h-10 items-center border px-4 text-[0.68rem] font-medium tracking-[0.16em] uppercase transition-colors xl:inline-flex ${
                overlay ? 'border-ivory/70 hover:bg-ivory hover:text-espresso' : 'border-burgundy bg-burgundy text-ivory hover:bg-burgundy-deep'
              }`}
            >
              Book Styling
            </Link>
          </div>
        </div>
      </header>

      <Drawer open={panel === 'menu'} onClose={closePanel} title="Menu" side="left">
        <nav aria-label="Mobile" className="px-5 py-4">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closePanel}
                  className={({ isActive }) => `flex min-h-14 items-center font-serif text-[1.65rem] ${isActive ? 'text-burgundy' : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8 mb-3 text-muted">Shop by category</p>
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/collections/${c.slug}`}
                  onClick={closePanel}
                  className="flex min-h-11 items-center border border-line px-3 text-[0.85rem] hover:border-ink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/styling" onClick={closePanel} className="btn-primary mt-8 w-full">
            Book a Styling Session
          </Link>
          <div className="mt-8 flex gap-1">
            {fashion.socialLinks.map((s) => (
              <Link key={s.network} to={s.href} className="grid size-11 place-items-center text-muted hover:text-ink" aria-label={`${s.label} (demo link)`}>
                <SocialIcon network={s.network} className="size-5" />
              </Link>
            ))}
          </div>
        </nav>
      </Drawer>
    </>
  )
}
