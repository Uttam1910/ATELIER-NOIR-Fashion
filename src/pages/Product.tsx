import { Gem, RotateCcw, ShieldCheck, Star } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ProductCard } from '../components/ProductCard'
import { ProductGallery } from '../components/ProductGallery'
import { ProductPurchase } from '../components/ProductPurchase'
import { Accordion, Breadcrumbs, SectionHeading } from '../components/ui'
import { fashion } from '../config/fashion'
import { categoryBySlug } from '../data/categories'
import { getProduct, products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatPrice } from '../utils/format'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  useDocumentMeta(product?.name ?? 'Page not found', product?.description ?? 'This page could not be found.')
  if (!product) return <NotFound />

  const category = categoryBySlug.get(product.category)!
  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.collections.some((c) => product.collections.includes(c))))
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4)

  return (
    <div>
      <div className="container-page pt-6 pb-16 md:pt-10 md:pb-24">
        <Breadcrumbs items={[{ label: 'Shop', to: '/shop' }, { label: category.name, to: `/collections/${category.slug}` }, { label: product.name }]} />

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <ProductGallery key={product.slug} images={product.images} name={product.name} />

          <div className="md:sticky md:top-24 md:self-start">
            {product.badge && <p className="eyebrow text-rose">{product.badge}</p>}
            <h1 className="mt-2 text-[2.4rem] leading-[1.02] sm:text-[3rem]">{product.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-[0.82rem] text-muted">
              <span className="flex text-burgundy" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`size-3.5 ${i < Math.round(product.demoReviews.rating) ? 'fill-current' : ''}`} />
                ))}
              </span>
              <span>
                {product.demoReviews.rating.toFixed(1)} · {product.demoReviews.count} demo reviews
              </span>
            </p>
            <p className="mt-5 text-[1rem] leading-relaxed text-ink/80">{product.description}</p>

            <div className="mt-7">
              <ProductPurchase key={product.slug} product={product} stickyMobile />
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-5 text-center text-[0.72rem] text-muted">
              <li className="flex flex-col items-center gap-2">
                <Gem className="size-5 text-rose" strokeWidth={1.3} aria-hidden="true" />
                Premium fabrics
              </li>
              <li className="flex flex-col items-center gap-2">
                <RotateCcw className="size-5 text-rose" strokeWidth={1.3} aria-hidden="true" />
                7-day returns (sample)
              </li>
              <li className="flex flex-col items-center gap-2">
                <ShieldCheck className="size-5 text-rose" strokeWidth={1.3} aria-hidden="true" />
                Demo checkout
              </li>
            </ul>

            <div className="mt-6">
              <Accordion
                defaultOpen={0}
                items={[
                  {
                    title: 'Details',
                    content: (
                      <ul className="space-y-1.5">
                        {product.details.map((d) => (
                          <li key={d} className="flex gap-2.5">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: 'Fabric & Care',
                    content: (
                      <>
                        <p>{product.fabric}</p>
                        <ul className="mt-3 space-y-1.5">
                          {product.care.map((c) => (
                            <li key={c}>— {c}</li>
                          ))}
                        </ul>
                        <Link to="/care" className="mt-3 inline-block underline underline-offset-4">
                          Read the care guide
                        </Link>
                      </>
                    ),
                  },
                  {
                    title: 'Shipping & Returns',
                    content: (
                      <>
                        <p>
                          Free shipping above {formatPrice(fashion.freeShippingThreshold)} (demo). In-stock pieces show an estimated dispatch of 2–4 working days at checkout.
                        </p>
                        <p className="mt-2">
                          See the sample <Link to="/shipping" className="underline underline-offset-4">Shipping</Link> and{' '}
                          <Link to="/returns" className="underline underline-offset-4">Returns</Link> policies.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <div className="mt-6 bg-ivory-deep p-5">
              <p className="font-serif text-[1.3rem]">Need help choosing?</p>
              <p className="mt-1 text-[0.88rem] text-muted">Book a styling session in the studio or on video.</p>
              <Link to="/styling" className="link-underline mt-3">
                Book Styling
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line bg-ivory-deep py-16 md:py-20">
          <div className="container-page">
            <SectionHeading id="related-heading" title="You May Also Like" action={{ label: `More ${category.name}`, to: `/collections/${category.slug}` }} />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
