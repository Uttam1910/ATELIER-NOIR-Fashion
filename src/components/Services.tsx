import { ArrowRight, Gift, Scissors, UserRound, Video, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { services } from '../data/services'
import type { Service } from '../types'
import { Img } from './Img'
import { Modal } from './Overlay'

const icons = {
  'personal-styling': UserRound,
  'custom-orders': Scissors,
  'gift-packaging': Gift,
  'virtual-shopping': Video,
} as const

export function ServiceIcon({ slug, className = 'size-5' }: { slug: string; className?: string }) {
  const Icon = icons[slug as keyof typeof icons] ?? UserRound
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />
}

export function ServiceCards({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const [active, setActive] = useState<Service | null>(null)
  const Heading = headingLevel

  return (
    <>
      <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.slug} id={service.slug} className="scroll-mt-24">
            <button type="button" onClick={() => setActive(service)} className="group block w-full text-left" aria-haspopup="dialog">
              <div className="aspect-[4/3] overflow-hidden bg-sand">
                <Img
                  image={service.image}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                  alt=""
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <ServiceIcon slug={service.slug} className="mt-0.5 size-5 shrink-0 text-rose" />
                <div>
                  <Heading className="font-sans text-[0.78rem] font-medium tracking-[0.16em] uppercase">{service.name}</Heading>
                  <p className="mt-1 text-[0.9rem] text-muted">{service.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.16em] uppercase underline-offset-4 group-hover:underline">
                    Learn more <ArrowRight className="size-3" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={active !== null} onClose={() => setActive(null)} label={active?.name ?? 'Service'} className="bg-ivory sm:max-w-3xl">
        {active && (
          <div className="grid sm:grid-cols-2">
            <div className="aspect-[4/3] bg-sand sm:aspect-auto">
              <Img image={active.image} sizes="(min-width: 640px) 380px, 100vw" className="size-full object-cover" />
            </div>
            <div className="relative p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 grid size-11 place-items-center"
                aria-label="Close"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <ServiceIcon slug={active.slug} className="size-6 text-rose" />
              <h2 className="mt-3 text-[2.1rem] leading-tight">{active.name}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{active.description}</p>
              <ul className="mt-5 space-y-2 text-[0.9rem]">
                {active.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to={active.cta.to} onClick={() => setActive(null)} className="btn-primary mt-7">
                {active.cta.label}
              </Link>
              <p className="mt-4 text-[0.78rem] text-muted">Demo service — no appointment is created.</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
