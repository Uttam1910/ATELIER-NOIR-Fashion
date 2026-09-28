import { Link } from 'react-router'
import { Accordion, DemoNotice, PageHeader } from '../components/ui'
import { faqGroups } from '../data/faqs'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Faq() {
  useDocumentMeta('FAQ', 'Frequently asked questions about orders, sizing, shipping, returns and styling at ATELIER NOIR (demo).')
  return (
    <>
      <PageHeader title="Frequently Asked Questions" kicker="Support" breadcrumbs={[{ label: 'FAQ' }]} />
      <div className="container-page grid gap-12 pb-20 lg:grid-cols-[220px_1fr] lg:gap-20">
        <nav aria-label="FAQ sections" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2 text-[0.92rem]">
            {faqGroups.map((g) => (
              <li key={g.title}>
                <a href={`#faq-${g.title.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="text-muted hover:text-ink">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-3xl space-y-14">
          {faqGroups.map((g) => (
            <section key={g.title} id={`faq-${g.title.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="scroll-mt-24" aria-labelledby={`faq-h-${g.title}`}>
              <h2 id={`faq-h-${g.title}`} className="mb-4 text-[2rem]">
                {g.title}
              </h2>
              <Accordion items={g.items.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
            </section>
          ))}
          <div className="bg-ivory-deep p-6">
            <p className="font-serif text-[1.4rem]">Still have a question?</p>
            <p className="mt-1 text-muted">
              <Link to="/contact" className="underline underline-offset-4">
                Contact the studio
              </Link>{' '}
              or{' '}
              <Link to="/styling" className="underline underline-offset-4">
                book a styling session
              </Link>
              .
            </p>
            <DemoNotice className="mt-4" />
          </div>
        </div>
      </div>
    </>
  )
}
