import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Img } from '../components/Img'
import { PageHeader, SectionHeading } from '../components/ui'
import { categories } from '../data/categories'
import { edits } from '../data/collections'
import { products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Collections() {
  useDocumentMeta('Collections', 'Explore the ATELIER NOIR edits — Festive, Everyday, Heritage, Modern Occasion, Soft Neutrals and Statement — plus every category.')

  return (
    <>
      <PageHeader
        title="Our Collections"
        kicker="Contemporary silhouettes. Rooted in tradition."
        copy="Six edits that tell the season's stories, and six categories to browse by what you want to wear."
        breadcrumbs={[{ label: 'Collections' }]}
      />

      <section aria-label="Edits" className="container-page pb-16 md:pb-24">
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {edits.map((edit, i) => {
            const count = products.filter((p) => p.collections.includes(edit.slug)).length
            return (
              <li key={edit.slug} className={i % 2 === 1 ? 'md:mt-24' : ''}>
                <Link to={`/collections/${edit.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <Img
                      image={edit.image}
                      sizes="(min-width: 768px) 48vw, 100vw"
                      priority={i < 2}
                      alt=""
                      className="size-full object-cover object-top transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="eyebrow text-rose">{String(i + 1).padStart(2, '0')} · {count} pieces</p>
                      <h2 className="mt-2 text-[2.3rem] leading-none sm:text-[2.8rem]">{edit.name}</h2>
                      <p className="mt-2 text-muted">{edit.description}</p>
                    </div>
                  </div>
                  <span className="link-underline mt-5">
                    Explore Collection <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="by-category" className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="by-category" title="Shop by Category" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/collections/${cat.slug}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-sand">
                    <Img image={cat.image} sizes="(min-width: 1024px) 16vw, (min-width: 768px) 31vw, 46vw" alt="" className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="mt-3 text-[1.4rem] leading-none group-hover:text-burgundy">{cat.name}</h3>
                  <p className="mt-1 text-[0.8rem] text-muted">{products.filter((p) => p.category === cat.slug).length} pieces</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
