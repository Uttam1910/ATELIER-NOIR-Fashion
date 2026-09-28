import { Link } from 'react-router'
import { Img } from '../components/Img'
import { DemoNotice } from '../components/ui'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { ImageKey } from '../types'

const principles: { title: string; copy: string; image: ImageKey }[] = [
  {
    title: 'Indian craft, carried forward',
    copy: 'Zari, block prints, chikankari-style thread work and handloom weaves are the vocabulary we design with — interpreted, never imitated for effect.',
    image: 'craft-embroidery',
  },
  {
    title: 'Contemporary silhouettes',
    copy: 'Straight kurtas with room to move, capes instead of dupattas, co-ords that split into separates. Familiar forms, cut for how women dress now.',
    image: 'coord-mulberry',
  },
  {
    title: 'Thoughtful fabrics',
    copy: 'Organza that floats, cottons that breathe, silks that last. Fabric is chosen first; the design follows what it wants to do.',
    image: 'craft-block-print',
  },
  {
    title: 'Versatility over volume',
    copy: 'A good saree should see a wedding, a dinner and an office Diwali party. We design fewer pieces and style them many ways.',
    image: 'saree-grey-handloom',
  },
]

export default function OurStory() {
  useDocumentMeta('Our Story', 'Rooted in India. Designed for today. The fictional story and philosophy behind ATELIER NOIR.')

  return (
    <>
      <header className="container-page grid items-end gap-10 pt-10 pb-14 md:grid-cols-[1fr_1fr] md:pt-16 md:pb-20">
        <div>
          <p className="eyebrow text-rose">Our Story</p>
          <h1 className="mt-4 text-[3rem] leading-[0.98] sm:text-[4.2rem] lg:text-[5rem]">
            Rooted in India.
            <br />
            <em className="text-burgundy">Designed for Today.</em>
          </h1>
        </div>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-muted md:justify-self-end">
          ATELIER NOIR imagines a contemporary Indian label for women who love their heritage and live very modern lives — pieces that move easily between a
          sangeet, a boardroom and a Sunday lunch.
        </p>
      </header>

      <div className="container-page grid gap-4 pb-16 md:grid-cols-[2fr_1fr] md:pb-24">
        <div className="aspect-[4/3] overflow-hidden bg-sand md:aspect-auto md:h-[640px]">
          <Img image="studio-courtyard" sizes="(min-width: 768px) 64vw, 100vw" priority className="size-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <div className="aspect-square overflow-hidden bg-sand md:aspect-auto md:h-[312px]">
            <Img image="craft-mehendi-silk" sizes="(min-width: 768px) 30vw, 50vw" className="size-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden bg-sand md:aspect-auto md:h-[312px]">
            <Img image="saree-temple-border-detail" sizes="(min-width: 768px) 30vw, 50vw" className="size-full object-cover" />
          </div>
        </div>
      </div>

      <section aria-label="Philosophy" className="on-dark bg-espresso py-16 text-ivory md:py-24">
        <div className="container-page max-w-4xl text-center">
          <p className="font-script text-[3rem] leading-none text-champagne sm:text-[4rem]">our philosophy</p>
          <blockquote className="mt-6 font-serif text-[1.9rem] leading-snug sm:text-[2.5rem]">
            “We don’t design for one day of the year. We design for the many days you’ll want to feel like yourself — only more so.”
          </blockquote>
          <p className="mt-6 text-[0.85rem] tracking-[0.14em] text-ivory/60 uppercase">A fictional founder’s note · demo content</p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="container-page py-16 md:py-24">
        <h2 id="principles-heading" className="sr-only">
          What we believe
        </h2>
        <div className="space-y-16 md:space-y-24">
          {principles.map((p, i) => (
            <article key={p.title} className={`grid items-center gap-8 md:grid-cols-2 lg:gap-20 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
                <Img image={p.image} sizes="(min-width: 768px) 46vw, 100vw" className="size-full object-cover object-top" />
              </div>
              <div className="max-w-md">
                <p className="font-serif text-[3.4rem] leading-none text-rose/60">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-[2.2rem] leading-tight sm:text-[2.6rem]">{p.title}</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{p.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="makers-heading" className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <div className="container-page grid items-center gap-10 md:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden bg-sand">
              <Img image="craft-hand-knotting" sizes="(min-width: 768px) 22vw, 46vw" className="size-full object-cover" />
            </div>
            <div className="mt-10 aspect-[3/4] overflow-hidden bg-sand">
              <Img image="craft-hand-sewing" sizes="(min-width: 768px) 22vw, 46vw" className="size-full object-cover" />
            </div>
          </div>
          <div className="max-w-lg">
            <p className="eyebrow text-rose">Supporting skilled makers</p>
            <h2 id="makers-heading" className="mt-4 text-[2.4rem] leading-tight sm:text-[3rem]">
              Made by hands, valued by name.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
              A label like this one would depend on tailors, embroiderers and weavers. Our aspiration is to work with them as partners: fair timelines, repeat
              work across seasons and credit for the craft.
            </p>
            <DemoNotice className="mt-6">
              ATELIER NOIR is fictional. This page describes a design philosophy, not real production partners, communities or facilities.
            </DemoNotice>
            <Link to="/lookbook" className="btn-primary mt-8">
              See the Lookbook
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
