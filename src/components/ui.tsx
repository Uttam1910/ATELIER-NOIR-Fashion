import { ChevronDown, Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { fashion } from '../config/fashion'
import type { ColorOption } from '../types'

export function SectionHeading({
  title,
  kicker,
  copy,
  action,
  as: Tag = 'h2',
  align = 'left',
  id,
}: {
  id?: string
  title: string
  kicker?: string
  copy?: string
  action?: { label: string; to: string }
  as?: 'h1' | 'h2'
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 md:mb-10 ${
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-xl'}>
        {kicker && <p className="eyebrow mb-3 text-rose">{kicker}</p>}
        <Tag id={id} className="text-[2.1rem] leading-[1.05] sm:text-[2.6rem] lg:text-[3rem]">{title}</Tag>
        {copy && <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{copy}</p>}
      </div>
      {action && (
        <Link to={action.to} className="link-underline shrink-0 self-start md:self-auto">
          {action.label}
        </Link>
      )}
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.75rem] tracking-[0.08em] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link to={item.to} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function DemoNotice({ className = '', children }: { className?: string; children?: ReactNode }) {
  return (
    <p className={`text-[0.78rem] leading-relaxed text-muted ${className}`}>
      <span className="mr-1.5 inline-block border border-current px-1.5 py-px text-[0.62rem] font-medium tracking-[0.14em] uppercase">
        Demo
      </span>
      {children ?? fashion.demoNotice}
    </p>
  )
}

export function PageHeader({
  title,
  kicker,
  copy,
  breadcrumbs,
}: {
  title: string
  kicker?: string
  copy?: string
  breadcrumbs?: { label: string; to?: string }[]
}) {
  return (
    <header className="container-page pt-8 pb-10 md:pt-12 md:pb-14">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="mt-6 max-w-3xl md:mt-8">
        {kicker && <p className="eyebrow mb-3 text-rose">{kicker}</p>}
        <h1 className="text-[2.6rem] leading-[1.02] sm:text-[3.4rem] lg:text-[4rem]">{title}</h1>
        {copy && <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">{copy}</p>}
      </div>
    </header>
  )
}

export function Accordion({ items, defaultOpen }: { items: { title: string; content: ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null)
  const baseId = useId()
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        return (
          <div key={item.title} className="border-b border-line">
            <h3 className="font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-[0.82rem] font-medium tracking-[0.12em] uppercase"
              >
                {item.title}
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={panelId} role="region" hidden={!isOpen} className="pb-5 text-[0.95rem] leading-relaxed text-ink/80">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function QuantityStepper({
  value,
  onChange,
  label,
  size = 'md',
}: {
  value: number
  onChange: (value: number) => void
  label: string
  size?: 'sm' | 'md'
}) {
  const box = size === 'sm' ? 'size-9' : 'size-11'
  return (
    <div className="inline-flex items-center border border-line" role="group" aria-label={label}>
      <button
        type="button"
        className={`${box} grid place-items-center transition-colors hover:bg-sand/60 disabled:opacity-40`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <output className="w-9 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={`${box} grid place-items-center transition-colors hover:bg-sand/60 disabled:opacity-40`}
        onClick={() => onChange(value + 1)}
        disabled={value >= 10}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}

/** Read-only swatch dots used on product cards. */
export function SwatchDots({ colors }: { colors: ColorOption[] }) {
  return (
    <ul className="flex items-center gap-1.5" aria-label={`Available in ${colors.map((c) => c.name).join(', ')}`}>
      {colors.map((c) => (
        <li
          key={c.name}
          className="size-3 rounded-full ring-1 ring-ink/15 ring-offset-1 ring-offset-ivory"
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </ul>
  )
}
