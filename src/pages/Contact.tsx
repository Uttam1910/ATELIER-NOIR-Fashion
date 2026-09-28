import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Field } from '../components/Field'
import { Img } from '../components/Img'
import { DemoNotice, PageHeader } from '../components/ui'
import { fashion } from '../config/fashion'
import { useToast } from '../context/toastContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { EMAIL_PATTERN, focusFirstError } from '../utils/forms'
import { demoReference } from '../utils/format'

const topics = ['Product question', 'Sizing & fit', 'Custom order', 'Styling appointment', 'Press & collaborations', 'Something else']
type Form = { name: string; email: string; topic: string; message: string }

export default function Contact() {
  useDocumentMeta('Contact', 'Visit the ATELIER NOIR studio in Bandra West, Mumbai (demo details), or send us a message.')
  const [form, setForm] = useState<Form>({ name: '', email: '', topic: topics[0], message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sent, setSent] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { notify } = useToast()
  const set = (key: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found: Partial<Record<keyof Form, string>> = {}
    if (form.name.trim().length < 2) found.name = 'Please enter your name.'
    if (!EMAIL_PATTERN.test(form.email.trim())) found.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) found.message = 'Please write a message of at least 10 characters.'
    setErrors(found)
    if (Object.keys(found).length) {
      focusFirstError(formRef.current)
      return
    }
    setSent(demoReference('AN-MSG'))
    notify('Message received', 'Demo only — nothing was sent.')
  }

  const { address } = fashion

  return (
    <>
      <PageHeader title="Contact" kicker="We’d love to hear from you" copy="Questions about a piece, sizing or a custom order — write to us or visit the studio." breadcrumbs={[{ label: 'Contact' }]} />

      <section aria-labelledby="studio-heading" className="container-page grid gap-10 pb-16 md:grid-cols-2 md:gap-14 md:pb-24">
        <div className="aspect-[4/3] overflow-hidden bg-sand md:aspect-auto md:min-h-[520px]">
          <Img image="studio-arch-room" sizes="(min-width: 768px) 48vw, 100vw" priority className="size-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 id="studio-heading" className="text-[2.4rem] leading-tight sm:text-[3rem]">
            Visit Our Studio
          </h2>
          <ul className="mt-8 space-y-5 text-[0.98rem]">
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-rose" strokeWidth={1.4} aria-hidden="true" />
              <address className="not-italic">
                {address.line1}, {address.line2}
                <br />
                {address.city}, {address.region} {address.postcode}
              </address>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-rose" strokeWidth={1.4} aria-hidden="true" />
              <a href={fashion.phoneHref} className="hover:underline">
                {fashion.phone}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-rose" strokeWidth={1.4} aria-hidden="true" />
              <a href={`mailto:${fashion.email}`} className="hover:underline">
                {fashion.email}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-rose" strokeWidth={1.4} aria-hidden="true" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                {fashion.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-muted">{h.days}</dt>
                    <dd className="tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
          <a href={fashion.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-9 self-start">
            Get Directions <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
          <DemoNotice className="mt-8">
            Business details are fictional and shown for demonstration purposes. There is no real studio at this address; the directions link opens a general map of Bandra West.
          </DemoNotice>
        </div>
      </section>

      <section aria-labelledby="message-heading" className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="message-heading" className="text-[2.4rem] leading-tight sm:text-[3rem]">
              Send a message
            </h2>
            <p className="mt-4 max-w-sm text-muted">We aim to reply within two working days (sample response time).</p>
          </div>
          {sent ? (
            <div role="status" className="self-start border border-line bg-ivory p-6 sm:p-10">
              <p className="font-serif text-[2rem] leading-tight">Thank you — your message has been received.</p>
              <p className="mt-3 text-muted">
                Reference <strong className="font-medium text-ink">{sent}</strong>
              </p>
              <DemoNotice className="mt-5">Demo form — nothing was sent and nobody will reply.</DemoNotice>
              <button
                type="button"
                className="btn-outline mt-7"
                onClick={() => {
                  setSent(null)
                  setForm({ name: '', email: '', topic: topics[0], message: '' })
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <Field id="ct-name" label="Full name" error={errors.name}>
                <input className="field" autoComplete="name" value={form.name} onChange={set('name')} />
              </Field>
              <Field id="ct-email" label="Email" error={errors.email}>
                <input className="field" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
              </Field>
              <Field id="ct-topic" label="Topic" className="sm:col-span-2">
                <select className="field" value={form.topic} onChange={set('topic')}>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="ct-message" label="Message" error={errors.message} className="sm:col-span-2">
                <textarea className="field min-h-36 resize-y" value={form.message} onChange={set('message')} />
              </Field>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
