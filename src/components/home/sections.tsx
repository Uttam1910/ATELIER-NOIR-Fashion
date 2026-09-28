import { ArrowRight, Clock, Feather, Flower2, MapPin, Phone, Shirt, Sprout } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { fashion } from '../../config/fashion'
import { categories } from '../../data/categories'
import { edits } from '../../data/collections'
import { craftCards, socialImages, trustPoints } from '../../data/home'
import { articles } from '../../data/journal'
import { lookbookIntro } from '../../data/lookbook'
import { formatDate } from '../../utils/format'
import { Img } from '../Img'
import { Lightbox } from '../Lightbox'
import { SocialIcon } from '../SocialIcon'
import { DemoNotice, SectionHeading } from '../ui'

const trustIcons = { feather: Feather, flower: Flower2, sprout: Sprout, hanger: Shirt }

export function TrustStrip() {
  return (
    <section aria-label="Why Atelier Noir" className="border-b border-line bg-ivory">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-7 py-8 md:py-10 lg:grid-cols-4">
        {trustPoints.map((point) => {
          const Icon = trustIcons[point.icon]
          return (
            <li key={point.title} className="flex items-start gap-3.5 lg:justify-center">
              <Icon className="mt-0.5 size-6 shrink-0 text-rose" strokeWidth={1.2} aria-hidden="true" />
              <div>
                <p className="text-[0.7rem] font-medium tracking-[0.18em] uppercase">{point.title}</p>
                <p className="mt-1 text-[0.85rem] leading-snug text-muted">
                  {point.title === 'Personal Styling' ? (
                    <Link to="/styling" className="underline-offset-4 hover:text-ink hover:underline">
                      {point.copy}
                    </Link>
                  ) : (
                    point.copy
                  )}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function CraftSection() {
  return (
    <section aria-labelledby="craft-heading" className="bg-ivory-deep">
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <Img image="craft-embroidery" sizes="(min-width: 1024px) 58vw, 100vw" alt="" className="absolute inset-0 size-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-deep from-25% via-ivory-deep/75 via-55% to-ivory-deep/0" />
          <div className="relative flex h-full max-w-lg flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
            <p className="eyebrow text-rose">The Craft</p>
            <h2 id="craft-heading" className="mt-4 text-[2.5rem] leading-[1.02] sm:text-[3.2rem]">
              Crafted for
              <br />
              Real Moments
            </h2>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ink/80">
              From intricate embroidery to fluid fabrics, every piece is designed to become part of your story.
            </p>
            <Link to="/our-story" className="btn-primary mt-8 self-start">
              Our Story <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-[560px] overflow-hidden lg:block">
          <Img image="studio-courtyard" sizes="42vw" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-espresso/25" />
          <p className="absolute right-10 bottom-14 max-w-[14ch] rotate-[-6deg] text-right font-script text-[4.6rem] leading-[0.9] text-ivory">
            Wear your story
          </p>
        </div>
      </div>
      <div className="container-page py-14 md:py-20">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {craftCards.map((card) => (
            <li key={card.title}>
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <Img image={card.image} sizes="(min-width: 1024px) 23vw, 46vw" className="size-full object-cover" />
              </div>
              <h3 className="mt-4 text-[1.5rem] leading-tight">{card.title}</h3>
              <p className="mt-1 text-[0.88rem] leading-snug text-muted">{card.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CategoryShowcase() {
  return (
    <section aria-labelledby="category-heading" className="container-page py-16 md:py-24">
      <SectionHeading id="category-heading" title="Shop by Category" copy="Six ways into the collection." action={{ label: 'View All', to: '/collections' }} />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link to={`/collections/${cat.slug}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-sand md:aspect-[4/5]">
                <Img
                  image={cat.image}
                  sizes="(min-width: 768px) 31vw, 46vw"
                  alt=""
                  className="size-full object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3.5 flex items-center justify-between gap-3 border-b border-line pb-3">
                <h3 className="text-[1.45rem] leading-none sm:text-[1.7rem]">{cat.name}</h3>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function LookbookBanner() {
  return (
    <section aria-labelledby="lookbook-banner-heading" className="on-dark relative isolate overflow-hidden bg-espresso text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-28">
          <p className="eyebrow text-champagne">Lookbook</p>
          <h2 id="lookbook-banner-heading" className="mt-4 text-[3rem] leading-[0.98] sm:text-[4rem] lg:text-[4.6rem]">
            Modern
            <br />
            Tradition
          </h2>
          <p className="mt-6 max-w-sm text-[1rem] leading-relaxed text-ivory/75">{lookbookIntro.copy}</p>
          <Link to="/lookbook" className="btn-light mt-9 self-start">
            View Lookbook <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative min-h-[460px] lg:min-h-[620px]">
          <Img image={lookbookIntro.image} sizes="(min-width: 1024px) 50vw, 100vw" alt="" className="absolute inset-0 size-full object-cover object-[center_40%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso via-transparent to-transparent lg:bg-gradient-to-r" />
          <p aria-hidden="true" className="absolute top-8 right-6 rotate-[-8deg] text-right font-script text-[3.2rem] leading-[0.9] text-ivory/90 sm:text-[4rem] lg:top-14 lg:right-12">
            Tradition
            <br />
            in a new light
          </p>
        </div>
      </div>
    </section>
  )
}

export function EditsSection() {
  return (
    <section aria-labelledby="edits-heading" className="container-page py-16 md:py-24">
      <SectionHeading id="edits-heading" kicker="Collections" title="The Edits" copy="Curated stories across the season." action={{ label: 'All Collections', to: '/collections' }} />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-6">
        {edits.map((edit) => (
          <li key={edit.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <Link to={`/collections/${edit.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-sand">
              <Img image={edit.image} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 78vw" alt="" className="size-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6">
                <h3 className="text-[1.9rem] leading-none">{edit.name}</h3>
                <p className="mt-2 text-[0.88rem] text-ivory/80">{edit.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.18em] uppercase">
                  Explore Collection <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function FestiveBanner() {
  return (
    <section aria-labelledby="festive-heading" className="on-dark relative isolate overflow-hidden bg-burgundy-deep text-ivory">
      <Img image="fabric-noir-zari" sizes="100vw" alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-deep via-burgundy-deep/80 to-burgundy-deep/30" />
      <div className="container-page py-20 md:py-28">
        <p className="eyebrow text-champagne">Season of Celebration</p>
        <h2 id="festive-heading" className="mt-4 text-[2.8rem] leading-none sm:text-[3.6rem]">
          The Festive Edit
        </h2>
        <p className="mt-4 max-w-md text-[1rem] text-ivory/80">Celebrate in style — rich colours, embroidery and pieces made for lamplit evenings.</p>
        <Link to="/collections/festive-edit" className="btn-light mt-8">
          Shop Now <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function JournalTeaser() {
  const latest = articles.slice(0, 3)
  return (
    <section aria-labelledby="journal-heading" className="container-page py-16 md:py-24">
      <SectionHeading id="journal-heading" kicker="Journal" title="Notes on Style" action={{ label: 'Read the Journal', to: '/journal' }} />
      <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
        {latest.map((a) => (
          <li key={a.slug}>
            <Link to={`/journal/${a.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-sand">
                <Img image={a.image} sizes="(min-width: 768px) 31vw, 100vw" alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <p className="eyebrow mt-4 text-rose">
                {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
              </p>
              <h3 className="mt-2 text-[1.65rem] leading-tight group-hover:text-burgundy">{a.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SocialGallery() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="social" aria-labelledby="social-heading" className="scroll-mt-20 bg-ivory-deep py-16 md:py-24">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="social-heading" className="text-[2.1rem] leading-none sm:text-[2.6rem] lg:text-[3rem]">
              Follow Our Journey
            </h2>
            <p className="mt-3 flex items-center gap-2 text-[0.95rem] text-muted">
              <SocialIcon network="instagram" className="size-4" />
              {fashion.instagram}
              <span className="text-[0.75rem]">(demo handle)</span>
            </p>
          </div>
          <p className="max-w-xs text-[0.85rem] text-muted">Moments from the studio, shoots and fittings. Tap an image to view it larger.</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {socialImages.map((item, i) => (
            <li key={item.image}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block size-full overflow-hidden bg-sand"
                aria-label={`View image: ${item.caption}`}
              >
                <Img
                  image={item.image}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-espresso/0 transition-colors group-hover:bg-espresso/20" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={socialImages} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} label="Follow Our Journey gallery" />
    </section>
  )
}

export function StudioSection() {
  return (
    <section aria-labelledby="studio-heading" className="on-dark bg-espresso text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <Img image="studio-arch-room" sizes="(min-width: 1024px) 50vw, 100vw" alt="" className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <p className="eyebrow text-champagne">The Studio</p>
          <h2 id="studio-heading" className="mt-4 text-[2.6rem] leading-none sm:text-[3.2rem]">
            Visit Our Studio
          </h2>
          <address className="mt-7 flex gap-3 text-[0.98rem] leading-relaxed text-ivory/85 not-italic">
            <MapPin className="mt-1 size-4 shrink-0 text-champagne" aria-hidden="true" />
            <span>
              {fashion.address.line1}, {fashion.address.line2}
              <br />
              {fashion.address.city}, {fashion.address.region} (demo address)
            </span>
          </address>
          <dl className="mt-6 grid max-w-xs grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.92rem]">
            {fashion.hours.map((h) => (
              <div key={h.days} className="contents">
                <dt className="flex items-center gap-3 text-ivory/70">
                  <Clock className="size-4 text-champagne" aria-hidden="true" />
                  {h.days}
                </dt>
                <dd className="tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex items-center gap-3 text-[0.92rem]">
            <Phone className="size-4 text-champagne" aria-hidden="true" />
            <a href={fashion.phoneHref} className="hover:underline">
              {fashion.phone}
            </a>
            <span className="text-ivory/60">(demo)</span>
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-light">
              Get Directions
            </Link>
            <Link to="/styling" className="btn-primary">
              Book a Visit
            </Link>
          </div>
          <DemoNotice className="mt-8 text-ivory/60">
            This studio is fictional. Address, phone and hours are shown for demonstration only.
          </DemoNotice>
        </div>
      </div>
    </section>
  )
}
