import { useParams } from 'react-router'
import { Catalog } from '../components/Catalog'
import { Img } from '../components/Img'
import { Breadcrumbs } from '../components/ui'
import { categoryBySlug } from '../data/categories'
import { editBySlug } from '../data/collections'
import { products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { CategorySlug, EditSlug } from '../types'
import NotFound from './NotFound'

export default function CollectionDetail() {
  const { collection = '' } = useParams()
  const category = categoryBySlug.get(collection as CategorySlug)
  const edit = editBySlug.get(collection as EditSlug)
  const entry = category ?? edit

  useDocumentMeta(entry?.name ?? 'Page not found', entry?.description ?? 'This page could not be found.')
  if (!entry) return <NotFound />

  const items = category ? products.filter((p) => p.category === category.slug) : products.filter((p) => p.collections.includes(edit!.slug))

  return (
    <>
      <header className="relative isolate overflow-hidden">
        <div className="container-page grid items-end gap-8 pt-8 pb-10 md:grid-cols-[1.2fr_1fr] md:pt-12 md:pb-14">
          <div>
            <Breadcrumbs items={[{ label: 'Collections', to: '/collections' }, { label: entry.name }]} />
            <p className="eyebrow mt-8 text-rose">{category ? 'Category' : 'Edit'}</p>
            <h1 className="mt-3 text-[3rem] leading-none sm:text-[4rem] lg:text-[4.6rem]">{entry.name}</h1>
            <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-muted">{entry.description}</p>
          </div>
          <div className="hidden aspect-[16/10] overflow-hidden bg-sand md:block">
            <Img image={entry.image} sizes="40vw" priority alt="" className="size-full object-cover object-[center_25%]" />
          </div>
        </div>
      </header>
      <Catalog
        key={collection}
        products={items}
        hide={category ? ['category'] : ['edit']}
        searchLabel={`Search ${entry.name.toLowerCase()}`}
        emptyAction={{ label: 'Shop everything', to: '/shop' }}
      />
    </>
  )
}
