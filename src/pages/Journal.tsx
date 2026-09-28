import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Img } from '../components/Img'
import { PageHeader } from '../components/ui'
import { articles } from '../data/journal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../utils/format'

export default function Journal() {
  useDocumentMeta('Journal', 'Styling notes, wedding guest guides and stories from the (fictional) ATELIER NOIR studio.')
  const topics = ['All', ...new Set(articles.map((a) => a.category))]
  const [topic, setTopic] = useState('All')
  const list = topic === 'All' ? articles : articles.filter((a) => a.category === topic)
  const [lead, ...rest] = list

  return (
    <>
      <PageHeader title="The Journal" kicker="Stories & Styling" copy="Notes on dressing, colour and craft — written for this demo." breadcrumbs={[{ label: 'Journal' }]} />

      <div className="container-page pb-20">
        <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by topic">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`min-h-10 shrink-0 border px-4 text-[0.78rem] tracking-[0.08em] transition-colors ${
                topic === t ? 'border-espresso bg-espresso text-ivory' : 'border-line hover:border-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {lead && (
          <Link to={`/journal/${lead.slug}`} className="group grid gap-6 border-b border-line pb-14 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <Img image={lead.image} sizes="(min-width: 768px) 56vw, 100vw" priority alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div>
              <p className="eyebrow text-rose">
                {lead.category} · <time dateTime={lead.date}>{formatDate(lead.date)}</time>
              </p>
              <h2 className="mt-3 text-[2.4rem] leading-[1.05] group-hover:text-burgundy sm:text-[3rem]">{lead.title}</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-muted">{lead.excerpt}</p>
              <span className="link-underline mt-6">
                Read Article <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug}>
              <article className="group relative">
                <div className="aspect-[4/3] overflow-hidden bg-sand">
                  <Img image={a.image} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="eyebrow mt-4 text-rose">
                  {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
                </p>
                <h2 className="mt-2 text-[1.75rem] leading-tight">
                  <Link to={`/journal/${a.slug}`} className="after:absolute after:inset-0 group-hover:text-burgundy">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.16em] uppercase" aria-hidden="true">
                  Read Article <ArrowRight className="size-3" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
