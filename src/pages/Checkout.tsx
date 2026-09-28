import { Check, Lock, ShoppingBag, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { Field } from '../components/Field'
import { Img } from '../components/Img'
import { DemoNotice, QuantityStepper } from '../components/ui'
import { useShop } from '../context/shopContext'
import type { BagLine } from '../context/shopContext'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { EMAIL_PATTERN, PHONE_PATTERN, focusFirstError } from '../utils/forms'
import { demoReference, formatPrice, formatShortDate } from '../utils/format'
import { computeTotals, describeSelections } from '../utils/pricing'
import type { Totals } from '../utils/pricing'

const STEPS = ['Bag', 'Details', 'Delivery', 'Payment', 'Confirmation'] as const
const STATES = ['Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other']
const EXPRESS_FEE = 250
const GIFT_FEE = 200

interface CheckoutData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pin: string
  method: 'standard' | 'express'
  gift: boolean
  payment: 'card' | 'upi' | 'cod'
  acknowledged: boolean
}

interface PlacedOrder {
  number: string
  lines: BagLine[]
  totals: Totals
  data: CheckoutData
  dispatch: Date
  extras: number
}

type Errors = Partial<Record<keyof CheckoutData, string>>

const addWorkingDays = (days: number) => {
  const d = new Date()
  let added = 0
  while (added < days) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) added++
  }
  return d
}

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-1 text-[0.7rem] tracking-[0.12em] uppercase sm:gap-3" aria-label="Checkout progress">
      {STEPS.map((label, i) => {
        const done = i < step
        const current = i === step
        const content = (
          <>
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full border text-[0.7rem] tabular-nums ${
                current ? 'border-espresso bg-espresso text-ivory' : done ? 'border-olive bg-olive text-ivory' : 'border-line text-muted'
              }`}
            >
              {done ? <Check className="size-3.5" aria-hidden="true" /> : String(i + 1).padStart(2, '0')}
            </span>
            <span className={`${current ? 'text-ink' : 'text-muted'} ${current ? '' : 'max-sm:sr-only'}`}>{label}</span>
          </>
        )
        return (
          <li key={label} className="flex shrink-0 items-center gap-1 sm:gap-3" aria-current={current ? 'step' : undefined}>
            {done && step < 4 ? (
              <button type="button" onClick={() => onJump(i)} className="flex min-h-11 items-center gap-2 hover:opacity-70" aria-label={`Back to ${label}`}>
                {content}
              </button>
            ) : (
              <span className="flex min-h-11 items-center gap-2">{content}</span>
            )}
            {i < STEPS.length - 1 && <span className="h-px w-4 bg-line sm:w-8" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}

function Summary({ lines, totals, extras, children }: { lines: BagLine[]; totals: Totals; extras: { label: string; amount: number }[]; children?: ReactNode }) {
  const extrasTotal = extras.reduce((s, e) => s + e.amount, 0)
  return (
    <div className="bg-ivory-deep p-5 sm:p-7">
      <h2 className="font-serif text-[1.6rem]">Order Summary</h2>
      <ul className="mt-5 space-y-4">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-3">
            <div className="relative w-14 shrink-0">
              <Img image={line.product.images[0]} sizes="56px" alt="" className="aspect-[3/4] w-full bg-sand object-cover object-top" />
              <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-espresso text-[0.65rem] text-ivory tabular-nums">{line.quantity}</span>
            </div>
            <div className="min-w-0 flex-1 text-[0.85rem]">
              <p className="leading-snug">{line.product.name}</p>
              <p className="text-[0.78rem] text-muted">{describeSelections(line.product, line)}</p>
            </div>
            <p className="text-[0.85rem] tabular-nums">{formatPrice(line.price * line.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[0.9rem]">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="tabular-nums">{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</dd>
        </div>
        {extras.map((e) => (
          <div key={e.label} className="flex justify-between">
            <dt className="text-muted">{e.label}</dt>
            <dd className="tabular-nums">{formatPrice(e.amount)}</dd>
          </div>
        ))}
        <div className="flex justify-between">
          <dt className="text-muted">GST (5%, estimate)</dt>
          <dd className="tabular-nums">{formatPrice(totals.gst)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 font-serif text-[1.5rem]">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(totals.total + extrasTotal)}</dd>
        </div>
      </dl>
      {children}
    </div>
  )
}

export default function Checkout() {
  useDocumentMeta('Checkout', 'Demo checkout for ATELIER NOIR. No real payment is processed.')
  const { bagLines, totals, setQuantity, removeFromBag, clearBag } = useShop()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [data, setData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pin: '',
    method: 'standard',
    gift: false,
    payment: 'card',
    acknowledged: false,
  })
  const formRef = useRef<HTMLFormElement>(null)
  const set = <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => setData((d) => ({ ...d, [key]: value }))
  const text = (key: keyof CheckoutData) => (e: { target: { value: string } }) => set(key, e.target.value as never)

  const extras = [
    ...(data.method === 'express' ? [{ label: 'Express delivery', amount: EXPRESS_FEE }] : []),
    ...(data.gift ? [{ label: 'Gift packaging', amount: GIFT_FEE }] : []),
  ]
  const hasMadeToOrder = bagLines.some((l) => l.product.availability === 'made-to-order')
  const dispatchDate = addWorkingDays(hasMadeToOrder ? 20 : data.method === 'express' ? 1 : 3)

  const go = (next: number) => {
    setErrors({})
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (step === 1) {
      if (data.name.trim().length < 2) e.name = 'Please enter your full name.'
      if (!EMAIL_PATTERN.test(data.email.trim())) e.email = 'Please enter a valid email address.'
      if (!PHONE_PATTERN.test(data.phone.trim())) e.phone = 'Please enter a valid 10-digit Indian mobile number.'
    }
    if (step === 2) {
      if (data.address.trim().length < 6) e.address = 'Please enter your street address.'
      if (data.city.trim().length < 2) e.city = 'Please enter your city.'
      if (!/^[1-9]\d{5}$/.test(data.pin.trim())) e.pin = 'Please enter a valid 6-digit PIN code.'
    }
    if (step === 3 && !data.acknowledged) e.acknowledged = 'Please confirm you understand this is a demo order.'
    return e
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) {
      focusFirstError(formRef.current)
      return
    }
    if (step < 3) {
      go(step + 1)
      return
    }
    setOrder({
      number: demoReference('AN'),
      lines: bagLines,
      totals: computeTotals(bagLines),
      data,
      dispatch: dispatchDate,
      extras: extras.reduce((s, x) => s + x.amount, 0),
    })
    clearBag()
    go(4)
  }

  if (order) {
    return (
      <div className="container-page py-10 md:py-16">
        <Stepper step={4} onJump={() => undefined} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <span className="grid size-14 place-items-center rounded-full bg-olive text-ivory">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-[2.6rem] leading-tight sm:text-[3.4rem]">Order placed successfully</h1>
            <p className="mt-3 text-[1.02rem] text-muted">
              Thank you, {order.data.name.split(' ')[0]}. Your order number is{' '}
              <strong className="font-medium text-ink tabular-nums">{order.number}</strong>.
            </p>
            <div className="mt-6 border-l-2 border-burgundy bg-rose-soft/40 px-5 py-4 text-[0.95rem]" role="note">
              <strong className="font-medium">Demo order — no real payment has been processed.</strong> Nothing will be shipped and no email will be sent.
            </div>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-muted">Delivering to</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed">
                  {order.data.name}
                  <br />
                  {order.data.address}
                  <br />
                  {order.data.city}, {order.data.state} {order.data.pin}
                  <br />
                  {order.data.phone}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Estimated dispatch</dt>
                <dd className="mt-2 text-[0.95rem]">
                  {formatShortDate(order.dispatch)} · {order.data.method === 'express' ? 'Express' : 'Standard'} delivery
                  {order.data.gift && <span className="block text-muted">With gift packaging</span>}
                </dd>
                <dt className="eyebrow mt-5 text-muted">Payment</dt>
                <dd className="mt-2 text-[0.95rem]">Simulated — {order.data.payment === 'card' ? 'Card' : order.data.payment === 'upi' ? 'UPI' : 'Cash on delivery'}</dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
          <Summary
            lines={order.lines}
            totals={order.totals}
            extras={[
              ...(order.data.method === 'express' ? [{ label: 'Express delivery', amount: EXPRESS_FEE }] : []),
              ...(order.data.gift ? [{ label: 'Gift packaging', amount: GIFT_FEE }] : []),
            ]}
          />
        </div>
      </div>
    )
  }

  if (bagLines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <ShoppingBag className="size-10 text-rose" strokeWidth={1.2} aria-hidden="true" />
        <h1 className="mt-6 text-[2.6rem] leading-tight">Your bag is waiting.</h1>
        <p className="mt-3 max-w-sm text-muted">Add a piece or two to try the demo checkout.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const radioCard = (checked: boolean) =>
    `flex cursor-pointer items-start gap-3 border p-4 transition-colors ${checked ? 'border-espresso bg-white/70' : 'border-line hover:border-ink/50'}`

  return (
    <div className="container-page py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-[2.4rem] leading-none sm:text-[3rem]">Checkout</h1>
        <p className="inline-flex items-center gap-2 text-[0.8rem] text-muted">
          <Lock className="size-3.5" aria-hidden="true" /> Demo checkout · no payment taken
        </p>
      </div>
      <div className="mt-6">
        <Stepper step={step} onJump={go} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <form ref={formRef} noValidate onSubmit={submit} className="min-w-0">
          <h2 className="mb-6 font-serif text-[1.9rem]">
            <span className="text-rose">{String(step + 1).padStart(2, '0')}</span> {STEPS[step]}
          </h2>

          {step === 0 && (
            <ul className="divide-y divide-line border-y border-line">
              {bagLines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <Img image={line.product.images[0]} sizes="96px" alt="" className="aspect-[3/4] w-20 shrink-0 bg-sand object-cover object-top sm:w-24" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link to={`/product/${line.slug}`} className="leading-snug hover:text-burgundy">
                        {line.product.name}
                      </Link>
                      <p className="tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                    <p className="mt-1 text-[0.82rem] text-muted">{describeSelections(line.product, line)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper size="sm" value={line.quantity} onChange={(q) => setQuantity(line.key, q)} label={`Quantity for ${line.product.name}`} />
                      <button
                        type="button"
                        onClick={() => removeFromBag(line.key)}
                        className="inline-flex min-h-10 items-center gap-1.5 text-[0.8rem] text-muted hover:text-burgundy"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="co-name" label="Full name" error={errors.name} className="sm:col-span-2">
                <input className="field" autoComplete="name" value={data.name} onChange={text('name')} />
              </Field>
              <Field id="co-email" label="Email" error={errors.email}>
                <input className="field" type="email" autoComplete="email" value={data.email} onChange={text('email')} />
              </Field>
              <Field id="co-phone" label="Mobile" error={errors.phone} hint="10-digit mobile number">
                <input className="field" type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={text('phone')} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="co-address" label="Street address" error={errors.address} className="sm:col-span-2">
                <input className="field" autoComplete="street-address" value={data.address} onChange={text('address')} />
              </Field>
              <Field id="co-city" label="City" error={errors.city}>
                <input className="field" autoComplete="address-level2" value={data.city} onChange={text('city')} />
              </Field>
              <Field id="co-state" label="State">
                <select className="field" value={data.state} onChange={text('state')}>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field id="co-pin" label="PIN code" error={errors.pin}>
                <input className="field" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={data.pin} onChange={text('pin')} />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="field-label">Delivery method</legend>
                <div className="mt-1 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      { value: 'standard', label: 'Standard', note: totals.shipping === 0 ? 'Free · dispatch in 2–4 working days' : `${formatPrice(totals.shipping)} · dispatch in 2–4 working days` },
                      { value: 'express', label: 'Express', note: `+${formatPrice(EXPRESS_FEE)} · dispatch next working day` },
                    ] as const
                  ).map((m) => (
                    <label key={m.value} className={radioCard(data.method === m.value)}>
                      <input type="radio" name="method" value={m.value} checked={data.method === m.value} onChange={() => set('method', m.value)} className="mt-1 accent-burgundy" />
                      <span>
                        <span className="block text-[0.95rem]">{m.label}</span>
                        <span className="block text-[0.82rem] text-muted">{m.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={`sm:col-span-2 ${radioCard(data.gift)}`}>
                <input type="checkbox" checked={data.gift} onChange={(e) => set('gift', e.target.checked)} className="mt-1 accent-burgundy" />
                <span>
                  <span className="block text-[0.95rem]">Add gift packaging (+{formatPrice(GIFT_FEE)})</span>
                  <span className="block text-[0.82rem] text-muted">Keepsake box, ribbon and a handwritten note. Prices hidden.</span>
                </span>
              </label>
              <p className="text-[0.85rem] text-muted sm:col-span-2">
                Estimated dispatch: <strong className="font-medium text-ink">{formatShortDate(dispatchDate)}</strong>
                {hasMadeToOrder && ' (includes made-to-order pieces)'} — sample estimate only.
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="border border-dashed border-burgundy/50 bg-rose-soft/25 p-5">
                <p className="font-serif text-[1.5rem]">Demo Checkout</p>
                <p className="mt-1 text-[0.9rem] text-ink/80">Payment is simulated. The fields below are disabled and no card or UPI details are collected.</p>
              </div>
              <fieldset className="mt-6">
                <legend className="field-label">Payment method</legend>
                <div className="mt-1 grid gap-3">
                  {(
                    [
                      { value: 'card', label: 'Credit / Debit Card' },
                      { value: 'upi', label: 'UPI' },
                      { value: 'cod', label: 'Cash on Delivery' },
                    ] as const
                  ).map((p) => (
                    <label key={p.value} className={radioCard(data.payment === p.value)}>
                      <input type="radio" name="payment" value={p.value} checked={data.payment === p.value} onChange={() => set('payment', p.value)} className="mt-1 accent-burgundy" />
                      <span className="text-[0.95rem]">{p.label} (simulated)</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {data.payment === 'card' && (
                <div className="mt-5 grid grid-cols-2 gap-4" aria-label="Card fields (disabled in demo)">
                  <div className="col-span-2">
                    <label htmlFor="co-card" className="field-label">
                      Card number
                    </label>
                    <input id="co-card" className="field cursor-not-allowed opacity-60" disabled value="•••• •••• •••• 4242 (demo)" readOnly />
                  </div>
                  <div>
                    <label htmlFor="co-exp" className="field-label">
                      Expiry
                    </label>
                    <input id="co-exp" className="field cursor-not-allowed opacity-60" disabled value="12 / 30" readOnly />
                  </div>
                  <div>
                    <label htmlFor="co-cvc" className="field-label">
                      CVC
                    </label>
                    <input id="co-cvc" className="field cursor-not-allowed opacity-60" disabled value="•••" readOnly />
                  </div>
                </div>
              )}
              {data.payment === 'upi' && (
                <div className="mt-5">
                  <label htmlFor="co-upi" className="field-label">
                    UPI ID
                  </label>
                  <input id="co-upi" className="field cursor-not-allowed opacity-60" disabled value="demo@upi (disabled)" readOnly />
                </div>
              )}
              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-[0.92rem]">
                  <input
                    id="co-ack"
                    type="checkbox"
                    checked={data.acknowledged}
                    onChange={(e) => set('acknowledged', e.target.checked)}
                    aria-invalid={Boolean(errors.acknowledged)}
                    aria-describedby={errors.acknowledged ? 'co-ack-error' : undefined}
                    className="mt-1 accent-burgundy"
                  />
                  I understand this is a demo order and no real payment will be processed.
                </label>
                {errors.acknowledged && (
                  <p id="co-ack-error" className="field-error">
                    {errors.acknowledged}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="btn-outline">
                Back
              </button>
            ) : (
              <Link to="/shop" className="btn-outline">
                Continue Shopping
              </Link>
            )}
            <button type="submit" className="btn-primary sm:min-w-56">
              {step === 3 ? `Place Demo Order · ${formatPrice(totals.total + extras.reduce((s, x) => s + x.amount, 0))}` : `Continue to ${STEPS[step + 1]}`}
            </button>
          </div>
        </form>

        <aside aria-label="Order summary" className="lg:sticky lg:top-24 lg:self-start">
          <Summary lines={bagLines} totals={totals} extras={extras}>
            <DemoNotice className="mt-5">This is a demo store. No real payment will be processed.</DemoNotice>
          </Summary>
        </aside>
      </div>
    </div>
  )
}
