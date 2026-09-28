import { CalendarCheck } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Field } from '../components/Field'
import { Img } from '../components/Img'
import { ServiceCards } from '../components/Services'
import { DemoNotice, SectionHeading } from '../components/ui'
import { useToast } from '../context/toastContext'
import { testimonials } from '../data/testimonials'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { EMAIL_PATTERN, PHONE_PATTERN, focusFirstError } from '../utils/forms'
import { demoReference, formatDate } from '../utils/format'

const appointmentTypes = [
  { value: 'in-studio', label: 'In Studio' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'wedding', label: 'Wedding Styling' },
  { value: 'occasion', label: 'Occasion Styling' },
]
const times = ['11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM']
const occasions = ['Wedding (my own)', 'Wedding guest', 'Festive / Diwali', 'Party or reception', 'Everyday wardrobe', 'Something else']

type Form = { name: string; email: string; phone: string; date: string; time: string; type: string; occasion: string; notes: string }

const today = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function Styling() {
  useDocumentMeta('Book a Styling Session', 'Book a personal, virtual, wedding or occasion styling session with ATELIER NOIR (demo booking form).')
  const [params] = useSearchParams()
  const initialType = appointmentTypes.some((t) => t.value === params.get('type')) ? params.get('type')! : 'in-studio'
  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', date: '', time: '', type: initialType, occasion: '', notes: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [confirmation, setConfirmation] = useState<{ ref: string; form: Form } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { notify } = useToast()

  const set = (key: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = (f: Form) => {
    const e: Partial<Record<keyof Form, string>> = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!EMAIL_PATTERN.test(f.email.trim())) e.email = 'Please enter a valid email address.'
    if (!PHONE_PATTERN.test(f.phone.trim())) e.phone = 'Please enter a valid 10-digit Indian mobile number.'
    if (!f.date) e.date = 'Please choose a date.'
    else if (f.date < today()) e.date = 'Please choose a date from today onwards.'
    if (!f.time) e.time = 'Please choose a time.'
    if (!f.occasion) e.occasion = 'Please tell us the occasion.'
    return e
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      focusFirstError(formRef.current)
      return
    }
    setConfirmation({ ref: demoReference('AN-STY'), form })
    notify('Appointment submitted', 'Your styling request has been received.')
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-16 lg:py-20">
          <p className="eyebrow text-rose">Styling Services</p>
          <h1 className="mt-4 text-[2.8rem] leading-[1.02] sm:text-[3.8rem]">Book a Styling Session</h1>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
            Get personalised recommendations from our style experts — for a wedding, a festive season or a wardrobe that works harder.
          </p>
          <a href="#book" className="btn-primary mt-8 self-start">
            Request an Appointment
          </a>
        </div>
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Img image="studio-lounge" sizes="(min-width: 1024px) 50vw, 100vw" priority className="absolute inset-0 size-full object-cover" />
        </div>
      </header>

      <section aria-labelledby="services-heading" className="container-page py-16 md:py-24">
        <SectionHeading id="services-heading" title="How We Can Help" copy="Choose a service to see what's included." />
        <ServiceCards />
      </section>

      <section id="book" aria-labelledby="book-heading" className="scroll-mt-20 border-t border-line bg-ivory-deep py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="book-heading" className="text-[2.4rem] leading-tight sm:text-[3rem]">
              Request an appointment
            </h2>
            <p className="mt-4 max-w-sm text-muted">Tell us a little about what you’re looking for and when suits you. We’ll hold the time for you.</p>
            <ul className="mt-10 space-y-6">
              {testimonials.map((t) => (
                <li key={t.quote} className="border-l border-rose pl-5">
                  <p className="font-serif text-[1.3rem] leading-snug">“{t.quote}”</p>
                  <p className="mt-2 text-[0.78rem] tracking-[0.08em] text-muted">
                    {t.name} · {t.context}
                  </p>
                </li>
              ))}
            </ul>
            <DemoNotice className="mt-6">Illustrative notes, not real customer reviews.</DemoNotice>
          </div>

          {confirmation ? (
            <div role="status" className="self-start border border-line bg-ivory p-6 sm:p-10">
              <CalendarCheck className="size-8 text-burgundy" strokeWidth={1.3} aria-hidden="true" />
              <p className="mt-5 font-serif text-[2.1rem] leading-tight">Your styling request has been received.</p>
              <p className="mt-3 text-muted">
                Reference <strong className="font-medium text-ink tabular-nums">{confirmation.ref}</strong>
              </p>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.92rem]">
                <dt className="text-muted">Name</dt>
                <dd>{confirmation.form.name}</dd>
                <dt className="text-muted">Type</dt>
                <dd>{appointmentTypes.find((t) => t.value === confirmation.form.type)?.label}</dd>
                <dt className="text-muted">When</dt>
                <dd>
                  {formatDate(confirmation.form.date)}, {confirmation.form.time}
                </dd>
                <dt className="text-muted">Occasion</dt>
                <dd>{confirmation.form.occasion}</dd>
              </dl>
              <DemoNotice className="mt-6">No appointment has been booked and nobody will contact you — this is a demo form.</DemoNotice>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setConfirmation(null)
                    setForm({ name: '', email: '', phone: '', date: '', time: '', type: 'in-studio', occasion: '', notes: '' })
                  }}
                >
                  Make another request
                </button>
                <Link to="/shop" className="btn-primary">
                  Browse the Shop
                </Link>
              </div>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="field-label">Appointment type</legend>
                <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {appointmentTypes.map((t) => (
                    <label key={t.value} className="cursor-pointer">
                      <input type="radio" name="type" value={t.value} checked={form.type === t.value} onChange={set('type')} className="peer sr-only" />
                      <span className="flex min-h-12 items-center justify-center border border-line bg-white/50 px-2 text-center text-[0.85rem] peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy">
                        {t.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="st-name" label="Full name" error={errors.name}>
                <input className="field" autoComplete="name" value={form.name} onChange={set('name')} />
              </Field>
              <Field id="st-email" label="Email" error={errors.email}>
                <input className="field" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
              </Field>
              <Field id="st-phone" label="Phone" error={errors.phone} hint="10-digit mobile number">
                <input className="field" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} />
              </Field>
              <Field id="st-occasion" label="Occasion" error={errors.occasion}>
                <select className="field" value={form.occasion} onChange={set('occasion')}>
                  <option value="">Select an occasion</option>
                  {occasions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field id="st-date" label="Preferred date" error={errors.date}>
                <input className="field" type="date" min={today()} value={form.date} onChange={set('date')} />
              </Field>
              <Field id="st-time" label="Preferred time" error={errors.time}>
                <select className="field" value={form.time} onChange={set('time')}>
                  <option value="">Select a time</option>
                  {times.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="st-notes" label="Notes" optional className="sm:col-span-2">
                <textarea className="field min-h-28 resize-y" value={form.notes} onChange={set('notes')} placeholder="Colours you love, pieces you already own, anything we should know." />
              </Field>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Book a Session
                </button>
                <DemoNotice className="mt-4">Demo form — your details stay in this browser tab and are not sent anywhere.</DemoNotice>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
