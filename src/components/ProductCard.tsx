import { Eye, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { useShop } from '../context/shopContext'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'
import { Img } from './Img'
import { SwatchDots } from './ui'

interface ProductCardProps {
  product: Product
  sizes?: string
  priority?: boolean
}

export function ProductCard({ product, sizes = '(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw', priority }: ProductCardProps) {
  const { isWishlisted, toggleWishlist, openQuickView } = useShop()
  const saved = isWishlisted(product.slug)
  const [primary, hover] = product.images
  const href = `/product/${product.slug}`

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link to={href} className="block size-full" aria-label={product.name} tabIndex={-1}>
          <Img
            image={primary}
            sizes={sizes}
            priority={priority}
            alt=""
            className="size-full object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
          />
          {hover && (
            <Img
              image={hover}
              sizes={sizes}
              alt=""
              className="absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        {product.badge && (
          <span className="pointer-events-none absolute top-3 left-3 bg-ivory/95 px-2 py-1 text-[0.62rem] font-medium tracking-[0.16em] text-ink uppercase">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-2 right-2 grid size-10 place-items-center rounded-full bg-ivory/85 text-ink backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <Heart className={`size-[1.05rem] ${saved ? 'fill-burgundy text-burgundy' : ''}`} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product.slug)}
          className="absolute inset-x-3 bottom-3 hidden min-h-10 translate-y-2 items-center justify-center gap-2 bg-ivory/95 text-[0.7rem] font-medium tracking-[0.16em] uppercase opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ivory md:flex"
        >
          <Eye className="size-3.5" aria-hidden="true" />
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-[0.9rem] leading-snug font-normal">
            <Link to={href} className="hover:text-burgundy">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="mt-1 text-[0.9rem] tabular-nums text-ink/80">{formatPrice(product.price)}</p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <SwatchDots colors={product.colors} />
          <Link
            to={href}
            className="text-[0.66rem] font-medium tracking-[0.16em] text-muted uppercase underline-offset-4 hover:text-ink hover:underline"
            aria-label={`View ${product.name}`}
          >
            View
          </Link>
        </div>
        <button
          type="button"
          onClick={() => openQuickView(product.slug)}
          className="mt-2 self-start text-[0.66rem] font-medium tracking-[0.16em] text-muted uppercase underline underline-offset-4 md:hidden"
        >
          Quick View
        </button>
      </div>
    </article>
  )
}
