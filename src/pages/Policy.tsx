import { Link } from 'react-router'
import { DemoNotice, PageHeader } from '../components/ui'
import { policies } from '../data/policies'
import type { Policy } from '../data/policies'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const related: { slug: Policy['slug']; label: string }[] = [
  { slug: 'shipping', label: 'Shipping' },
  { slug: 'returns', label: 'Returns' },
  { slug: 'care', label: 'Care Guide' },
  { slug: 'privacy', label: 'Privacy' },
  { slug: 'terms', label: 'Terms' },
]

export default function PolicyPage({ slug }: { slug: Policy['slug'] }) {
  const policy = policies[slug]
  useDocumentMeta(policy.title, `${policy.title} for ATELIER NOIR — a sample policy for a fictional brand.`)

  return (
    <>
      <PageHeader title={policy.title} kicker={slug === 'care' ? 'Guide' : 'Sample policy'} breadcrumbs={[{ label: policy.title }]} />
      <div className="container-page grid gap-12 pb-20 lg:grid-cols-[1fr_240px] lg:gap-20">
        <div className="max-w-3xl">
          <DemoNotice className="mb-10 border-y border-line py-4 text-[0.88rem]">{policy.intro}</DemoNotice>
          <div className="prose-editorial">
            {policy.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
          <p className="mt-10 text-[0.85rem] text-muted">Last updated: 28 September 2026 (demo).</p>
        </div>
        <nav aria-label="Other policies" className="lg:pt-2">
          <p className="eyebrow mb-4 text-muted">More information</p>
          <ul className="space-y-2">
            {related
              .filter((r) => r.slug !== slug)
              .map((r) => (
                <li key={r.slug}>
                  <Link to={`/${r.slug}`} className="text-[0.95rem] hover:text-burgundy">
                    {r.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link to="/faq" className="text-[0.95rem] hover:text-burgundy">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
