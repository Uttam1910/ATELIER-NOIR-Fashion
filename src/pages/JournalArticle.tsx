import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Img } from '../components/Img'
import { ProductCard } from '../components/ProductCard'
import { Breadcrumbs, DemoNotice, SectionHeading } from '../components/ui'
import { articleBySlug, articles } from '../data/journal'
import { getProducts } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../utils/format'
import NotFound from './NotFound'

export default function JournalArticle() {
  const { slug = '' } = useParams()
  const article = articleBySlug.get(slug)
  useDocumentMeta(article ? `${article.title} — Journal` : 'Page not found', article?.excerpt ?? 'This page could not be found.')
  if (!article) return <NotFound />

  const related = articles.filter((a) => a.slug !== article.slug).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 3)
  const products = getProducts(article.productSlugs)

  return (
    <article>
      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs items={[{ label: 'Journal', to: '/journal' }, { label: article.title }]} />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="eyebrow text-rose">{article.category}</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.02] sm:text-[3.6rem] lg:text-[4.2rem]">{article.title}</h1>
          <p className="mt-5 text-[0.85rem] tracking-[0.06em] text-muted">
            By {article.author} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readMinutes} min read
          </p>
        </div>
        <div className="mt-10 aspect-[4/5] overflow-hidden bg-sand sm:aspect-[16/9] md:mt-14">
          <Img image={article.image} sizes="(min-width: 1320px) 1240px, 100vw" priority className="size-full object-cover object-[center_30%]" />
        </div>
      </header>

      <div className="container-page">
        <div className="prose-editorial mx-auto max-w-[680px] py-12 md:py-16">
          <p className="!text-[1.25rem] !leading-relaxed font-serif !text-ink">{article.excerpt}</p>
          {article.body.map((block, i) => {
            switch (block.type) {
              case 'p':
                return <p key={i}>{block.text}</p>
              case 'h2':
                return <h2 key={i}>{block.text}</h2>
              case 'list':
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              case 'quote':
                return (
                  <blockquote key={i} className="my-10 border-l-2 border-burgundy pl-6 font-serif text-[1.7rem] leading-snug text-burgundy">
                    {block.text}
                  </blockquote>
                )
              case 'image':
                return (
                  <figure key={i} className="my-10 md:-mx-16">
                    <Img image={block.image} sizes="(min-width: 768px) 812px, 100vw" className="max-h-[80vh] w-full bg-sand object-cover" />
                    {block.caption && <figcaption className="mt-3 text-center text-[0.85rem] text-muted">{block.caption}</figcaption>}
                  </figure>
                )
              default:
                return null
            }
          })}
          <DemoNotice className="mt-10 border-t border-line pt-6">Fictional editorial content written for this website demo.</DemoNotice>
          <Link to="/journal" className="link-underline mt-8">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to Journal
          </Link>
        </div>
      </div>

      {products.length > 0 && (
        <section aria-labelledby="article-products" className="border-t border-line bg-ivory-deep py-16 md:py-20">
          <div className="container-page">
            <SectionHeading id="article-products" title="Shop the Story" />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="related-articles" className="container-page py-16 md:py-20">
        <SectionHeading id="related-articles" title="Keep Reading" action={{ label: 'All Articles', to: '/journal' }} />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {related.map((a) => (
            <li key={a.slug}>
              <Link to={`/journal/${a.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-sand">
                  <Img image={a.image} sizes="(min-width: 768px) 31vw, 100vw" alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="eyebrow mt-4 text-rose">{a.category}</p>
                <h3 className="mt-2 text-[1.6rem] leading-tight group-hover:text-burgundy">{a.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
